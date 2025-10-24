"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import {
  Bell,
  AlertCircle,
  CheckCircle,
  Info,
  DollarSign,
  FileText,
  RefreshCw,
  Wallet,
  Settings,
  X,
} from "lucide-react"

// Mock notifications data
const notificationsData = [
  {
    id: "NOT-001",
    type: "warning",
    category: "Balance",
    title: "Low CLA Balance Alert",
    message: "Your CLA balance has dropped below RM 10,000. Consider reloading to avoid service interruption.",
    timestamp: "2 hours ago",
    read: false,
  },
  {
    id: "NOT-002",
    type: "error",
    category: "Payment",
    title: "Payment Overdue",
    message: "Invoice INV-2025-023 (RM 12,400) is now 5 days overdue. Immediate action required.",
    timestamp: "5 hours ago",
    read: false,
  },
  {
    id: "NOT-003",
    type: "success",
    category: "Refund",
    title: "Refund Approved",
    message: "Your refund request REF-2025-012 for RM 2,300 has been approved and processed.",
    timestamp: "1 day ago",
    read: true,
  },
  {
    id: "NOT-004",
    type: "info",
    category: "Invoice",
    title: "New Invoice Generated",
    message: "Invoice INV-2025-045 for RM 8,500 has been generated and sent to your email.",
    timestamp: "1 day ago",
    read: true,
  },
  {
    id: "NOT-005",
    type: "success",
    category: "Payment",
    title: "Payment Received",
    message: "Payment of RM 15,200 for Invoice INV-2025-001 has been successfully received.",
    timestamp: "2 days ago",
    read: true,
  },
  {
    id: "NOT-006",
    type: "warning",
    category: "Payment",
    title: "Payment Due Soon",
    message: "Invoice INV-2025-038 (RM 9,800) is due in 3 days. Please arrange payment to avoid late fees.",
    timestamp: "2 days ago",
    read: true,
  },
  {
    id: "NOT-007",
    type: "error",
    category: "Refund",
    title: "Refund Request Rejected",
    message: "Your refund request REF-2025-010 has been rejected. Please contact support for details.",
    timestamp: "3 days ago",
    read: true,
  },
  {
    id: "NOT-008",
    type: "info",
    category: "System",
    title: "System Maintenance Scheduled",
    message: "The CLA Portal will undergo maintenance on Jan 25, 2025 from 2:00 AM to 4:00 AM.",
    timestamp: "4 days ago",
    read: true,
  },
]

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState(notificationsData)
  const [showUnreadOnly, setShowUnreadOnly] = useState(false)

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case "success":
        return <CheckCircle className="h-5 w-5 text-green-600 dark:text-green-400" />
      case "error":
        return <AlertCircle className="h-5 w-5 text-red-600 dark:text-red-400" />
      case "warning":
        return <AlertCircle className="h-5 w-5 text-yellow-600 dark:text-yellow-400" />
      default:
        return <Info className="h-5 w-5 text-blue-600 dark:text-blue-400" />
    }
  }

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "Payment":
        return <DollarSign className="h-4 w-4" />
      case "Invoice":
        return <FileText className="h-4 w-4" />
      case "Refund":
        return <RefreshCw className="h-4 w-4" />
      case "Balance":
        return <Wallet className="h-4 w-4" />
      default:
        return <Bell className="h-4 w-4" />
    }
  }

  const getNotificationBgColor = (type: string) => {
    switch (type) {
      case "success":
        return "bg-green-50 border-green-200 dark:bg-green-900/20 dark:border-green-700"
      case "error":
        return "bg-red-50 border-red-200 dark:bg-red-900/20 dark:border-red-700"
      case "warning":
        return "bg-yellow-50 border-yellow-200 dark:bg-yellow-900/20 dark:border-yellow-700"
      default:
        return "bg-blue-50 border-blue-200 dark:bg-blue-900/20 dark:border-blue-700"
    }
  }

  const markAsRead = (id: string) => {
    setNotifications(notifications.map((n) => (n.id === id ? { ...n, read: true } : n)))
  }

  const markAllAsRead = () => {
    setNotifications(notifications.map((n) => ({ ...n, read: true })))
  }

  const deleteNotification = (id: string) => {
    setNotifications(notifications.filter((n) => n.id !== id))
  }

  const filteredNotifications = showUnreadOnly ? notifications.filter((n) => !n.read) : notifications

  const unreadCount = notifications.filter((n) => !n.read).length

  return (
    <div className="space-y-6 bg-white  min-h-screen -m-4 lg:-m-8 p-4 lg:p-8">
      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card className=" ">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium ">Total Notifications</CardTitle>
            <Bell className="h-4 w-4 text-muted-foreground " />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold ">{notifications.length}</div>
            <p className="text-xs text-muted-foreground ">All time</p>
          </CardContent>
        </Card>

        <Card className=" ">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium ">Unread</CardTitle>
            <AlertCircle className="h-4 w-4 text-blue-600 dark:text-blue-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">{unreadCount}</div>
            <p className="text-xs text-muted-foreground ">Requires attention</p>
          </CardContent>
        </Card>

        <Card className=" ">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium ">Critical</CardTitle>
            <AlertCircle className="h-4 w-4 text-red-600 dark:text-red-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600 dark:text-red-400">
              {notifications.filter((n) => n.type === "error").length}
            </div>
            <p className="text-xs text-muted-foreground ">Urgent action needed</p>
          </CardContent>
        </Card>

        <Card className=" ">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium ">Warnings</CardTitle>
            <AlertCircle className="h-4 w-4 text-yellow-600 dark:text-yellow-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-600 dark:text-yellow-400">
              {notifications.filter((n) => n.type === "warning").length}
            </div>
            <p className="text-xs text-muted-foreground ">Review recommended</p>
          </CardContent>
        </Card>
      </div>

      {/* Notification Settings */}
      <Card className=" ">
        <CardHeader>
          <div className="flex items-center gap-2">
            <Settings className="h-5 w-5 text-blue-600 dark:text-blue-400" />
            <CardTitle className="">Notification Preferences</CardTitle>
          </div>
          <CardDescription className="">Configure which notifications you want to receive</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="low-balance" className="">Low Balance Alerts</Label>
              <p className="text-sm text-muted-foreground ">Get notified when CLA balance is low</p>
            </div>
            <Switch id="low-balance" defaultChecked />
          </div>
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="overdue" className="">Overdue Payment Alerts</Label>
              <p className="text-sm text-muted-foreground ">Get notified about overdue invoices</p>
            </div>
            <Switch id="overdue" defaultChecked />
          </div>
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="refund" className="">Refund Status Updates</Label>
              <p className="text-sm text-muted-foreground ">Get notified about refund approvals/rejections</p>
            </div>
            <Switch id="refund" defaultChecked />
          </div>
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="invoice" className="">New Invoice Notifications</Label>
              <p className="text-sm text-muted-foreground ">Get notified when new invoices are generated</p>
            </div>
            <Switch id="invoice" defaultChecked />
          </div>
        </CardContent>
      </Card>

      {/* Notifications List */}
      <Card className=" ">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="">Recent Notifications</CardTitle>
              <CardDescription className="">Stay updated with your account activity</CardDescription>
            </div>
            <div className="flex gap-2">
              <div className="flex items-center gap-2">
                <Switch id="unread-only" checked={showUnreadOnly} onCheckedChange={setShowUnreadOnly} />
                <Label htmlFor="unread-only" className="text-sm cursor-pointer ">
                  Unread only
                </Label>
              </div>
              {unreadCount > 0 && (
                <Button variant="outline" size="sm" onClick={markAllAsRead}>
                  Mark all as read
                </Button>
              )}
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-3">
          {filteredNotifications.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground ">
              <Bell className="h-12 w-12 mx-auto mb-2 opacity-50" />
              <p>No notifications to display</p>
            </div>
          ) : (
            filteredNotifications.map((notification) => (
              <div
                key={notification.id}
                className={`p-4 border rounded-lg ${getNotificationBgColor(notification.type)} ${
                  !notification.read ? "ring-2 ring-blue-600 dark:ring-blue-400" : ""
                }`}
              >
                <div className="flex items-start gap-3">
                  {getNotificationIcon(notification.type)}
                  <div className="flex-1 space-y-1">
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex items-center gap-2">
                        <h4 className="font-semibold text-sm ">{notification.title}</h4>
                        {!notification.read && <Badge className="text-xs">New</Badge>}
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-6 w-6"
                        onClick={() => deleteNotification(notification.id)}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                    <p className="text-sm text-gray-700 ">{notification.message}</p>
                    <div className="flex items-center gap-3 pt-2">
                      <div className="flex items-center gap-1 text-xs text-muted-foreground ">
                        {getCategoryIcon(notification.category)}
                        <span>{notification.category}</span>
                      </div>
                      <span className="text-xs text-muted-foreground ">{notification.timestamp}</span>
                      {!notification.read && (
                        <Button
                          variant="link"
                          size="sm"
                          className="h-auto p-0 text-xs"
                          onClick={() => markAsRead(notification.id)}
                        >
                          Mark as read
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </CardContent>
      </Card>
    </div>
  )
}
