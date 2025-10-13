"use client"

import React from "react"
import Link from "next/link"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Progress } from "@/components/ui/progress"
import { ScrollArea } from "@/components/ui/scroll-area"
import { CreditCard, FileText, AlertTriangle, MapPin } from "lucide-react"
import { invoices, payments, refunds } from "@/lib/mock-data"

type ActivityItem = {
  id: string
  title: string
  description: string
  time: string
  amount?: number
  status?: "success" | "error" | "processing"
  type: "payment" | "invoice" | "refund"
}

function randomActivity(): ActivityItem {
  const pick = Math.floor(Math.random() * 3)
  const now = new Date().toLocaleTimeString()
  if (pick === 0) {
    const p = payments[Math.floor(Math.random() * payments.length)]
    return {
      id: `p-${p.payment_id}-${now}`,
      title: `Payment received from ${p.customer}`,
      description: `RM ${p.amount.toLocaleString()} via ${p.method}.`,
      time: now,
      amount: p.amount,
      status: "success",
      type: "payment",
    }
  } else if (pick === 1) {
    const inv = invoices[Math.floor(Math.random() * invoices.length)]
    return {
      id: `i-${inv.invoice_id}-${now}`,
      title: `Invoice ${inv.invoice_id} updated`,
      description: `${inv.customer} • ${inv.status} • ${inv.type ?? "General"}`,
      time: now,
      amount: inv.amount,
      status: inv.status === "Paid" ? "success" : inv.status === "Overdue" ? "error" : "processing",
      type: "invoice",
    }
  } else {
    const r = refunds[Math.floor(Math.random() * refunds.length)]
    return {
      id: `r-${r.refund_id}-${now}`,
      title: `Refund ${r.status}`,
      description: `${r.customer} • RM ${r.amount.toLocaleString()}`,
      time: now,
      amount: r.amount,
      status: r.status === "Approved" ? "success" : r.status === "Rejected" ? "error" : "processing",
      type: "refund",
    }
  }
}

export default function LiveActivityPage() {
  const [events, setEvents] = React.useState<ActivityItem[]>([])
  const [progress, setProgress] = React.useState(35)
  const [delayed, setDelayed] = React.useState(false)

  React.useEffect(() => {
    // Seed some initial items
    setEvents([randomActivity(), randomActivity(), randomActivity()])

    // Stream new items every 3s
    const id = setInterval(() => {
      setEvents((prev) => {
        const next = randomActivity()
        return [next, ...prev].slice(0, 30)
      })
    }, 3000)

    return () => clearInterval(id)
  }, [])

  React.useEffect(() => {
    // Simulate container release progress
    const id = setInterval(() => {
      setProgress((p) => {
        const inc = delayed ? 1 : 3
        const next = Math.min(100, p + inc)
        return next
      })
      // Randomly toggle delay state
      if (Math.random() < 0.1) {
        setDelayed((d) => !d)
      }
    }, 2500)
    return () => clearInterval(id)
  }, [delayed])

  const stageLabels = [
    { pct: 10, label: "Queued" },
    { pct: 30, label: "Processing" },
    { pct: 55, label: "Customs" },
    { pct: 80, label: "Ready" },
    { pct: 100, label: "Released" },
  ]

  return (
    <div className="space-y-6 p-4 md:p-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Live Activity</h1>
        <Link href="/dashboard">
          <Button variant="secondary">Back to Dashboard</Button>
        </Link>
      </div>

      {/* Tracking status */}
      <Card className="border-0 bg-gradient-to-br from-white to-gray-50/50 dark:from-gray-800 dark:to-gray-700/50">
        <CardHeader>
          <CardTitle>Container Release Tracking</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Badge variant={delayed ? "destructive" : "default"}>
                  {delayed ? "Delayed" : progress >= 100 ? "Released" : "In progress"}
                </Badge>
                <span className="text-sm text-muted-foreground">Progress: {progress}%</span>
              </div>
              <Button size="sm" variant="outline" onClick={() => { setProgress(0); setDelayed(false) }}>Reset</Button>
            </div>
            <Progress value={progress} className="h-2" />
            <div className="flex justify-between text-xs text-muted-foreground">
              {stageLabels.map((s) => (
                <span key={s.pct} className={`${progress >= s.pct ? "text-foreground" : ""}`}>{s.label}</span>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Tracking map */}
      <Card className="border-0">
        <CardHeader>
          <CardTitle>Tracking Map</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="relative overflow-hidden rounded-xl border bg-muted/30 dark:bg-muted/20">
            {/* Simple SVG path to simulate movement */}
            <svg viewBox="0 0 800 300" className="w-full h-[220px]">
              <defs>
                <linearGradient id="route" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="#38bdf8" />
                  <stop offset="100%" stopColor="#0ea5e9" />
                </linearGradient>
              </defs>
              {/* background */}
              <rect x="0" y="0" width="800" height="300" fill="url(#bg)" className="fill-transparent" />
              {/* route line */}
              <path d="M40 220 C 200 160, 400 120, 760 80" stroke="url(#route)" strokeWidth="4" fill="none" />
              {/* ports */}
              <circle cx="40" cy="220" r="6" className="fill-sky-500" />
              <circle cx="760" cy="80" r="6" className="fill-sky-500" />
              {/* moving dot */}
              <circle cx={40 + (progress/100) * (760-40)} cy={220 - (progress/100) * (220-80)} r="7" className="fill-sky-400" />
            </svg>
            <div className="absolute left-2 bottom-2 flex items-center gap-2 text-xs text-muted-foreground">
              <MapPin className="w-3 h-3" />
              <span>Origin Port</span>
              <span className="mx-2">→</span>
              <MapPin className="w-3 h-3" />
              <span>Destination Port</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Live event stream */}
      <Card className="border-0 bg-gradient-to-br from-white to-gray-50/50 dark:from-gray-800 dark:to-gray-700/50">
        <CardHeader>
          <CardTitle>Live Event Stream</CardTitle>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-[320px] pr-4">
            <div className="space-y-3">
              {events.map((activity) => (
                <div key={activity.id} className="group flex gap-4 p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${
                    activity.type === 'payment' ? 'bg-green-100 dark:bg-green-900/30' :
                    activity.type === 'invoice' ? 'bg-blue-100 dark:bg-blue-900/30' :
                    'bg-red-100 dark:bg-red-900/30'
                  }`}>
                    {activity.type === 'payment' ? (
                      <CreditCard className="w-5 h-5 text-green-600 dark:text-green-400" />
                    ) : activity.type === 'invoice' ? (
                      <FileText className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                    ) : (
                      <AlertTriangle className="w-5 h-5 text-red-600 dark:text-red-400" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <p className="font-medium text-sm">{activity.title}</p>
                      <span className="text-xs text-muted-foreground">{activity.time}</span>
                    </div>
                    <p className="text-sm text-muted-foreground mb-1">{activity.description}</p>
                    <div className="flex items-center gap-2">
                      {activity.amount ? (
                        <Badge variant="outline" className="text-xs">RM {activity.amount.toLocaleString()}</Badge>
                      ) : null}
                      <Badge variant={activity.status === 'success' ? 'default' : activity.status === 'error' ? 'destructive' : 'secondary'} className="text-xs capitalize">
                        {activity.status}
                      </Badge>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>
          <Separator className="my-4" />
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Streaming mock events every few seconds</span>
            <Button size="sm" variant="outline" onClick={() => setEvents([])}>Clear</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}