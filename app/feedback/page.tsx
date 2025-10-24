"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { MessageSquare, ThumbsUp, ThumbsDown, Meh, TrendingUp, Star } from "lucide-react"
import { Pie, PieChart, Cell, ResponsiveContainer, Tooltip, Bar, BarChart, XAxis, YAxis, CartesianGrid } from "recharts"

// Mock feedback data
const feedbackData = [
  {
    id: "FB-001",
    customer: "ABC Logistics",
    rating: 5,
    sentiment: "Positive",
    category: "Service Quality",
    message: "Excellent service! The team was very responsive and handled our container efficiently.",
    date: "2025-01-20",
    status: "Reviewed",
  },
  {
    id: "FB-002",
    customer: "XYZ Shipping",
    rating: 3,
    sentiment: "Neutral",
    category: "Pricing",
    message: "Service is good but pricing could be more competitive.",
    date: "2025-01-19",
    status: "Pending",
  },
  {
    id: "FB-003",
    customer: "Global Transport",
    rating: 2,
    sentiment: "Negative",
    category: "Response Time",
    message: "Took too long to process our refund request. Need faster turnaround.",
    date: "2025-01-18",
    status: "Pending",
  },
  {
    id: "FB-004",
    customer: "Fast Cargo",
    rating: 5,
    sentiment: "Positive",
    category: "Portal Usability",
    message: "The new portal is very user-friendly. Easy to track invoices and payments.",
    date: "2025-01-17",
    status: "Reviewed",
  },
  {
    id: "FB-005",
    customer: "Ocean Freight",
    rating: 4,
    sentiment: "Positive",
    category: "Service Quality",
    message: "Good overall experience. Minor delays but nothing major.",
    date: "2025-01-16",
    status: "Reviewed",
  },
]

const sentimentDistribution = [
  { name: "Positive", value: 60, color: "#10b981" },
  { name: "Neutral", value: 25, color: "#f59e0b" },
  { name: "Negative", value: 15, color: "#ef4444" },
]

const categoryBreakdown = [
  { category: "Service Quality", count: 45 },
  { category: "Pricing", count: 28 },
  { category: "Response Time", count: 22 },
  { category: "Portal Usability", count: 18 },
  { category: "Documentation", count: 12 },
]

export default function FeedbackPage() {
  const [filterStatus, setFilterStatus] = useState("all")
  const [filterSentiment, setFilterSentiment] = useState("all")

  const getSentimentIcon = (sentiment: string) => {
    switch (sentiment) {
      case "Positive":
        return <ThumbsUp className="h-4 w-4 text-green-600 dark:text-green-400" />
      case "Negative":
        return <ThumbsDown className="h-4 w-4 text-red-600 dark:text-red-400" />
      default:
        return <Meh className="h-4 w-4 text-yellow-600 dark:text-yellow-400" />
    }
  }

  const getSentimentBadge = (sentiment: string) => {
    const variants: Record<string, "default" | "secondary" | "destructive"> = {
      Positive: "default",
      Neutral: "secondary",
      Negative: "destructive",
    }
    return <Badge variant={variants[sentiment]}>{sentiment}</Badge>
  }

  const getStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star key={i} className={`h-4 w-4 ${i < rating ? "fill-yellow-400 text-yellow-400 dark:fill-yellow-300 dark:text-yellow-300" : "text-gray-300 dark:text-gray-600"}`} />
    ))
  }

  return (
    <div className="space-y-6">
      {/* Stats Overview */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card className="dark:bg-gray-800 dark:border-gray-700">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium dark:text-gray-100">Total Feedback</CardTitle>
            <MessageSquare className="h-4 w-4 text-muted-foreground dark:text-gray-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold dark:text-gray-100">{feedbackData.length}</div>
            <p className="text-xs text-muted-foreground dark:text-gray-400">This month</p>
          </CardContent>
        </Card>

        <Card className="dark:bg-gray-800 dark:border-gray-700">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium dark:text-gray-100">Positive</CardTitle>
            <ThumbsUp className="h-4 w-4 text-green-600 dark:text-green-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600 dark:text-green-400">60%</div>
            <p className="text-xs text-muted-foreground dark:text-gray-400">+5% from last month</p>
          </CardContent>
        </Card>

        <Card className="dark:bg-gray-800 dark:border-gray-700">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium dark:text-gray-100">Neutral</CardTitle>
            <Meh className="h-4 w-4 text-yellow-600 dark:text-yellow-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-600 dark:text-yellow-400">25%</div>
            <p className="text-xs text-muted-foreground dark:text-gray-400">-2% from last month</p>
          </CardContent>
        </Card>

        <Card className="dark:bg-gray-800 dark:border-gray-700">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium dark:text-gray-100">Negative</CardTitle>
            <ThumbsDown className="h-4 w-4 text-red-600 dark:text-red-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600 dark:text-red-400">15%</div>
            <p className="text-xs text-muted-foreground dark:text-gray-400">-3% from last month</p>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid gap-4 md:grid-cols-2">
        <Card className="dark:bg-gray-800 dark:border-gray-700">
          <CardHeader>
            <CardTitle className="dark:text-gray-100">Sentiment Distribution</CardTitle>
            <CardDescription className="dark:text-gray-400">Overall customer sentiment analysis</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={sentimentDistribution}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }: any) => `${name} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {sentimentDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: "white",
                    border: "1px solid #e5e7eb",
                    borderRadius: "8px",
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="dark:bg-gray-800 dark:border-gray-700">
          <CardHeader>
            <CardTitle className="dark:text-gray-100">Feedback by Category</CardTitle>
            <CardDescription className="dark:text-gray-400">Most common feedback topics</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={categoryBreakdown}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" className="dark:stroke-gray-600" />
                <XAxis dataKey="category" stroke="#6b7280" className="dark:stroke-gray-400" angle={-45} textAnchor="end" height={80} fontSize={12} />
                <YAxis stroke="#6b7280" className="dark:stroke-gray-400" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "white",
                    border: "1px solid #e5e7eb",
                    borderRadius: "8px",
                  }}
                />
                <Bar dataKey="count" fill="#3b82f6" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Feedback List */}
      <Card className="dark:bg-gray-800 dark:border-gray-700">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="dark:text-gray-100">Customer Feedback</CardTitle>
              <CardDescription className="dark:text-gray-400">Recent feedback from customers</CardDescription>
            </div>
            <div className="flex gap-2">
              <Select value={filterStatus} onValueChange={setFilterStatus}>
                <SelectTrigger className="w-[140px]">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="reviewed">Reviewed</SelectItem>
                </SelectContent>
              </Select>
              <Select value={filterSentiment} onValueChange={setFilterSentiment}>
                <SelectTrigger className="w-[140px]">
                  <SelectValue placeholder="Sentiment" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Sentiment</SelectItem>
                  <SelectItem value="positive">Positive</SelectItem>
                  <SelectItem value="neutral">Neutral</SelectItem>
                  <SelectItem value="negative">Negative</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {feedbackData.map((feedback) => (
            <div key={feedback.id} className="p-4 border border-gray-200 dark:border-gray-600 dark:bg-gray-700 rounded-lg space-y-3">
              <div className="flex items-start justify-between">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-sm dark:text-gray-100">{feedback.customer}</span>
                    <Badge variant="outline" className="text-xs">
                      {feedback.id}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="flex">{getStars(feedback.rating)}</div>
                    <span className="text-xs text-muted-foreground dark:text-gray-400">{feedback.rating}/5</span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {getSentimentIcon(feedback.sentiment)}
                  {getSentimentBadge(feedback.sentiment)}
                </div>
              </div>

              <p className="text-sm text-gray-700 dark:text-gray-300">{feedback.message}</p>

              <div className="flex items-center justify-between pt-2 border-t dark:border-gray-600">
                <div className="flex items-center gap-4 text-xs text-muted-foreground dark:text-gray-400">
                  <span>Category: {feedback.category}</span>
                  <span>Date: {feedback.date}</span>
                  <Badge variant={feedback.status === "Reviewed" ? "default" : "secondary"} className="text-xs">
                    {feedback.status}
                  </Badge>
                </div>
                {feedback.status === "Pending" && (
                  <Button size="sm" variant="outline">
                    Mark as Reviewed
                  </Button>
                )}
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* AI Sentiment Insights */}
      <Card className="dark:bg-gray-800 dark:border-gray-700">
        <CardHeader>
          <div className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-blue-600 dark:text-blue-400" />
            <CardTitle className="dark:text-gray-100">AI Sentiment Insights</CardTitle>
          </div>
          <CardDescription className="dark:text-gray-400">Automated analysis of customer feedback trends</CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg">
            <h4 className="font-semibold text-sm mb-2 text-green-900 dark:text-green-300">Positive Trend Detected</h4>
            <p className="text-sm text-gray-700 dark:text-gray-300">
              Customer satisfaction has improved by 8% this month. "Service Quality" and "Portal Usability" are the most
              praised aspects.
            </p>
          </div>
          <div className="p-4 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg">
            <h4 className="font-semibold text-sm mb-2 text-yellow-900 dark:text-yellow-300">Area for Improvement</h4>
            <p className="text-sm text-gray-700 dark:text-gray-300">
              "Response Time" received the most negative feedback. Consider implementing faster processing workflows to
              address this concern.
            </p>
          </div>
          <div className="p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg">
            <h4 className="font-semibold text-sm mb-2 text-blue-900 dark:text-blue-300">Recommendation</h4>
            <p className="text-sm text-gray-700 dark:text-gray-300">
              Customers who rate 5 stars are 3x more likely to provide detailed feedback. Consider incentivizing
              detailed reviews to gather more insights.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
