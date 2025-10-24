"use client"

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import {
  TrendingUp,
  TrendingDown,
  AlertTriangle,
  Lightbulb,
  DollarSign,
  Calendar,
  Users,
  Activity,
  ArrowUpRight,
} from "lucide-react"
import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"

// Mock predictive data
const reloadPrediction = [
  { month: "Jan", actual: 50000, predicted: 52000 },
  { month: "Feb", actual: 48000, predicted: 50000 },
  { month: "Mar", actual: 55000, predicted: 54000 },
  { month: "Apr", actual: 52000, predicted: 56000 },
  { month: "May", actual: 58000, predicted: 58000 },
  { month: "Jun", actual: null, predicted: 62000 },
  { month: "Jul", actual: null, predicted: 65000 },
]

const paymentForecast = [
  { day: "Mon", amount: 15000 },
  { day: "Tue", amount: 18000 },
  { day: "Wed", amount: 22000 },
  { day: "Thu", amount: 19000 },
  { day: "Fri", amount: 25000 },
  { day: "Sat", amount: 12000 },
  { day: "Sun", amount: 8000 },
]

export default function InsightsPage() {
  return (
    <div className="space-y-8 bg-white  min-h-screen -m-4 lg:-m-8 p-4 lg:p-8">
      {/* AI Insights Header */}
      <div className="flex items-start gap-3">
        <div className="inline-flex items-center justify-center h-9 w-9 rounded-lg bg-blue-50 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400">
          <Lightbulb className="h-5 w-5" />
        </div>
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-gray-900 ">AI-Powered Insights</h1>
          <p className="mt-1 text-sm text-gray-600 ">Smart forecasts and recommendations to help you plan and act with confidence.</p>
        </div>
      </div>

      {/* Key Predictions */}
      <div className="grid gap-5 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        <Card className="p-5 sm:p-6 rounded-xl border border-gray-200 bg-white shadow-sm hover:shadow-md transition-all duration-300  ">
          <CardHeader className="p-0 pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm sm:text-base font-medium text-gray-900 ">Next Reload Prediction</CardTitle>
              <TrendingUp className="h-4 w-4 sm:h-5 sm:w-5 text-blue-600 dark:text-blue-400" />
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <div className="text-2xl sm:text-3xl font-semibold tracking-tight text-blue-700 dark:text-blue-400">RM 62,000</div>
            <p className="text-xs sm:text-sm text-muted-foreground  mt-1">Expected in June 2025</p>
            <div className="mt-3 inline-flex items-center gap-2 rounded-md bg-green-50 px-2 py-1 text-green-700 dark:bg-green-900/20 dark:text-green-400">
              <ArrowUpRight className="h-3 w-3 sm:h-4 sm:w-4" />
              <span className="text-xs sm:text-sm">+6.9% from last month</span>
            </div>
          </CardContent>
        </Card>

        <Card className="p-5 sm:p-6 rounded-xl border border-gray-200 bg-white shadow-sm hover:shadow-md transition-all duration-300  ">
          <CardHeader className="p-0 pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm sm:text-base font-medium text-gray-900 ">Payment Forecast (7 Days)</CardTitle>
              <Calendar className="h-4 w-4 sm:h-5 sm:w-5 text-green-600 dark:text-green-400" />
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <div className="text-2xl sm:text-3xl font-semibold tracking-tight text-green-700 dark:text-green-400">RM 119,000</div>
            <p className="text-xs sm:text-sm text-muted-foreground  mt-1">Expected by Oct 14, 2025</p>
            <div className="mt-3">
              <Progress value={68} className="h-2" />
              <p className="text-xs sm:text-sm text-muted-foreground  mt-1">68% confidence level</p>
            </div>
          </CardContent>
        </Card>

        <Card className="p-5 sm:p-6 rounded-xl border bg-white/80 backdrop-blur-sm shadow-sm hover:shadow-md transition-all duration-300 md:col-span-2 lg:col-span-1  ">
          <CardHeader className="p-0 pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm sm:text-base font-medium text-gray-900 ">Cash Flow Trend</CardTitle>
              <Activity className="h-4 w-4 sm:h-5 sm:w-5 text-orange-600 dark:text-orange-400" />
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <div className="text-2xl sm:text-3xl font-semibold tracking-tight text-orange-700 dark:text-orange-400">Stable</div>
            <p className="text-xs sm:text-sm text-muted-foreground  mt-1">Positive trend detected</p>
            <div className="mt-3 inline-flex items-center gap-2 rounded-md bg-green-50 px-2 py-1 text-green-700 dark:bg-green-900/20 dark:text-green-400">
              <ArrowUpRight className="h-3 w-3 sm:h-4 sm:w-4" />
              <span className="text-xs sm:text-sm">+12.3% growth rate</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts Section */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Reload Prediction Chart */}
        <Card className="p-5 sm:p-6 rounded-xl border bg-white/80 backdrop-blur-sm shadow-sm hover:shadow-md transition-all duration-300  ">
          <CardHeader className="p-0 pb-4">
            <CardTitle className="text-lg font-semibold text-gray-900 ">Reload Prediction vs Actual</CardTitle>
            <CardDescription className="text-sm text-muted-foreground ">
              AI-powered predictions compared to actual reload amounts
            </CardDescription>
          </CardHeader>
          <CardContent className="p-0">
            <div className="h-64 sm:h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={reloadPrediction}>
                  <XAxis dataKey="month" stroke="#9ca3af" tick={{ fontSize: 12 }} />
                  <YAxis stroke="#9ca3af" tick={{ fontSize: 12 }} />
                  <Tooltip contentStyle={{ backgroundColor: 'white', border: '1px solid #e5e7eb', borderRadius: 8 }} />
                  <Line
                    type="monotone"
                    dataKey="actual"
                    stroke="#3b82f6"
                    strokeWidth={2}
                    name="Actual"
                    connectNulls={false}
                  />
                  <Line
                    type="monotone"
                    dataKey="predicted"
                    stroke="#10b981"
                    strokeWidth={2}
                    strokeDasharray="5 5"
                    name="Predicted"
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Payment Forecast Chart */}
        <Card className="p-5 sm:p-6 rounded-xl border bg-white/80 backdrop-blur-sm shadow-sm hover:shadow-md transition-all duration-300  ">
          <CardHeader className="p-0 pb-4">
            <CardTitle className="text-lg font-semibold text-gray-900 ">7-Day Payment Forecast</CardTitle>
            <CardDescription className="text-sm text-muted-foreground ">
              Expected payment amounts for the next week
            </CardDescription>
          </CardHeader>
          <CardContent className="p-0">
            <div className="h-64 sm:h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={paymentForecast}>
                  <XAxis dataKey="day" stroke="#9ca3af" tick={{ fontSize: 12 }} />
                  <YAxis stroke="#9ca3af" tick={{ fontSize: 12 }} />
                  <Tooltip contentStyle={{ backgroundColor: 'white', border: '1px solid #e5e7eb', borderRadius: 8 }} />
                  <Line
                    type="monotone"
                    dataKey="amount"
                    stroke="#f59e0b"
                    strokeWidth={2}
                    name="Forecast"
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* AI Recommendations */}
      <div className="grid gap-5 sm:grid-cols-1 lg:grid-cols-2">
        <Card className="p-5 sm:p-6 rounded-xl border bg-white/80 backdrop-blur-sm shadow-sm hover:shadow-md transition-all duration-300  ">
          <CardHeader className="p-0 pb-4">
            <div className="flex items-center gap-2">
              <Lightbulb className="h-5 w-5 text-blue-600 dark:text-blue-400" />
              <CardTitle className="text-lg font-semibold text-gray-900 ">Smart Recommendations</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <div className="space-y-4">
              <div className="flex gap-3 p-3 sm:p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg transition-colors duration-300 hover:bg-blue-100/70 dark:hover:bg-blue-900/30">
                <TrendingUp className="h-5 w-5 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" />
                <div className="min-w-0 flex-1">
                  <h4 className="font-medium text-blue-900 dark:text-blue-100 text-sm sm:text-base">Optimize Payment Timing</h4>
                  <p className="text-xs sm:text-sm text-blue-700 dark:text-blue-300 mt-1">
                    Consider scheduling bulk payments on Fridays for better cash flow management.
                  </p>
                </div>
              </div>
              
              <div className="flex gap-3 p-3 sm:p-4 bg-green-50 dark:bg-green-900/20 rounded-lg transition-colors duration-300 hover:bg-green-100/70 dark:hover:bg-green-900/30">
                <DollarSign className="h-5 w-5 text-green-600 dark:text-green-400 flex-shrink-0 mt-0.5" />
                <div className="min-w-0 flex-1">
                  <h4 className="font-medium text-green-900 dark:text-green-100 text-sm sm:text-base">Revenue Opportunity</h4>
                  <p className="text-xs sm:text-sm text-green-700 dark:text-green-300 mt-1">
                    Increase reload frequency by 15% to boost monthly revenue by RM 8,500.
                  </p>
                </div>
              </div>
              
              <div className="flex gap-3 p-3 sm:p-4 bg-orange-50 dark:bg-orange-900/20 rounded-lg transition-colors duration-300 hover:bg-orange-100/70 dark:hover:bg-orange-900/30">
                <AlertTriangle className="h-5 w-5 text-orange-600 dark:text-orange-400 flex-shrink-0 mt-0.5" />
                <div className="min-w-0 flex-1">
                  <h4 className="font-medium text-orange-900 dark:text-orange-100 text-sm sm:text-base">Risk Alert</h4>
                  <p className="text-xs sm:text-sm text-orange-700 dark:text-orange-300 mt-1">
                    3 customers showing declining payment patterns. Consider proactive outreach.
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="p-5 sm:p-6 rounded-xl border bg-white/80 backdrop-blur-sm shadow-sm hover:shadow-md transition-all duration-300  ">
          <CardHeader className="p-0 pb-4">
            <div className="flex items-center gap-2">
              <Users className="h-5 w-5 text-purple-600 dark:text-purple-400" />
              <CardTitle className="text-lg font-semibold text-gray-900 ">Customer Insights</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <div className="space-y-4">
              <div className="flex flex-col gap-2 p-3 sm:p-4 border border-gray-200   rounded-lg sm:flex-row sm:items-center sm:justify-between transition-all duration-300 hover:bg-white dark:hover:bg-gray-700/70">
                <div className="min-w-0 flex-1">
                  <p className="font-medium text-gray-900  text-sm sm:text-base">Top Performing Customer</p>
                  <p className="text-xs sm:text-sm text-gray-600 ">Evergreen Shipping Ltd.</p>
                </div>
                <Badge variant="outline" className="bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-300 border-green-200 dark:border-green-700 self-start sm:self-auto">
                  +24% Growth
                </Badge>
              </div>
              
              <div className="flex flex-col gap-2 p-3 sm:p-4 border border-gray-200   rounded-lg sm:flex-row sm:items-center sm:justify-between transition-all duration-300 hover:bg-white dark:hover:bg-gray-700/70">
                <div className="min-w-0 flex-1">
                  <p className="font-medium text-gray-900  text-sm sm:text-base">Most Frequent Payer</p>
                  <p className="text-xs sm:text-sm text-gray-600 ">Ocean Logistics Co.</p>
                </div>
                <Badge variant="outline" className="bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 border-blue-200 dark:border-blue-700 self-start sm:self-auto">
                  Weekly
                </Badge>
              </div>
              
              <div className="flex flex-col gap-2 p-3 sm:p-4 border border-gray-200   rounded-lg sm:flex-row sm:items-center sm:justify-between transition-all duration-300 hover:bg-white dark:hover:bg-gray-700/70">
                <div className="min-w-0 flex-1">
                  <p className="font-medium text-gray-900  text-sm sm:text-base">Needs Attention</p>
                  <p className="text-xs sm:text-sm text-gray-600 ">Maritime Express Inc.</p>
                </div>
                <Badge variant="outline" className="bg-orange-50 dark:bg-orange-900/20 text-orange-700 dark:text-orange-300 border-orange-200 dark:border-orange-700 self-start sm:self-auto">
                  -15% Decline
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Anomaly Detection */}
      <Card className="rounded-xl border bg-white/80 backdrop-blur-sm shadow-sm hover:shadow-md transition-all duration-300  ">
        <CardHeader>
          <div className="flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-orange-600 dark:text-orange-400" />
            <CardTitle className="text-gray-900 ">Anomaly Detection</CardTitle>
          </div>
          <CardDescription className="text-muted-foreground ">Unusual patterns detected in your account activity</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-start gap-4 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg transition-colors duration-300 hover:bg-red-100/70 dark:hover:bg-red-900/30">
            <AlertTriangle className="h-5 w-5 text-red-600 dark:text-red-400 mt-0.5" />
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <h4 className="font-semibold text-sm dark:text-red-100">High Refund Frequency Detected</h4>
                <Badge variant="destructive">Critical</Badge>
              </div>
              <p className="text-sm text-gray-700 dark:text-red-200">
                Customer "Global Transport" has requested 3 refunds in the past 2 weeks, which is 200% above their
                average.
              </p>
              <div className="mt-2 flex items-center gap-4 text-xs text-gray-600 dark:text-red-300">
                <span>Detected: 2 hours ago</span>
                <span>Confidence: 94%</span>
              </div>
            </div>
          </div>

          <div className="flex items-start gap-4 p-4 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg transition-colors duration-300 hover:bg-yellow-100/70 dark:hover:bg-yellow-900/30">
            <AlertTriangle className="h-5 w-5 text-yellow-600 dark:text-yellow-400 mt-0.5" />
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <h4 className="font-semibold text-sm dark:text-yellow-100">Unusual Payment Pattern</h4>
                <Badge variant="secondary">Warning</Badge>
              </div>
              <p className="text-sm text-gray-700 dark:text-yellow-200">
                Payment volume on Fridays is 45% higher than other weekdays. Consider adjusting resource allocation.
              </p>
              <div className="mt-2 flex items-center gap-4 text-xs text-gray-600 dark:text-yellow-300">
                <span>Detected: 1 day ago</span>
                <span>Confidence: 87%</span>
              </div>
            </div>
          </div>

          <div className="flex items-start gap-4 p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg transition-colors duration-300 hover:bg-blue-100/70 dark:hover:bg-blue-900/30">
            <Lightbulb className="h-5 w-5 text-blue-600 dark:text-blue-400 mt-0.5" />
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <h4 className="font-semibold text-sm dark:text-blue-100">Positive Trend Identified</h4>
                <Badge>Info</Badge>
              </div>
              <p className="text-sm text-gray-700 dark:text-blue-200">
                Customer "ABC Logistics" has increased their transaction volume by 35% this quarter. Consider offering
                premium services.
              </p>
              <div className="mt-2 flex items-center gap-4 text-xs text-gray-600 dark:text-blue-300">
                <span>Detected: 3 days ago</span>
                <span>Confidence: 91%</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Predictive Charts */}
      <div className="grid gap-5 md:grid-cols-2">
        <Card className="rounded-xl border bg-white/80 backdrop-blur-sm shadow-sm hover:shadow-md transition-all duration-300  ">
          <CardHeader>
            <CardTitle className="text-gray-900 ">Reload Amount Prediction</CardTitle>
            <CardDescription className="text-muted-foreground ">Historical vs predicted reload amounts</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={reloadPrediction}>
                <XAxis dataKey="month" stroke="#9ca3af" tick={{ fontSize: 12 }} />
                <YAxis stroke="#9ca3af" tick={{ fontSize: 12 }} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "white",
                    border: "1px solid #e5e7eb",
                    borderRadius: "8px",
                  }}
                />
                <Line type="monotone" dataKey="actual" stroke="#3b82f6" strokeWidth={2} name="Actual" dot />
                <Line
                  type="monotone"
                  dataKey="predicted"
                  stroke="#f59e0b"
                  strokeWidth={2}
                  strokeDasharray="5 5"
                  name="Predicted"
                  dot
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="rounded-xl border bg-white/80 backdrop-blur-sm shadow-sm hover:shadow-md transition-all duration-300  ">
          <CardHeader>
            <CardTitle className="text-gray-900 ">7-Day Payment Forecast</CardTitle>
            <CardDescription className="text-muted-foreground ">Expected payment amounts for the next week</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={paymentForecast}>
                <XAxis dataKey="day" stroke="#9ca3af" tick={{ fontSize: 12 }} />
                <YAxis stroke="#9ca3af" tick={{ fontSize: 12 }} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "white",
                    border: "1px solid #e5e7eb",
                    borderRadius: "8px",
                  }}
                />
                <Line type="monotone" dataKey="amount" stroke="#10b981" strokeWidth={2} name="Forecast" dot />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Smart Recommendations */}
      <Card className="rounded-xl border bg-white/80 backdrop-blur-sm shadow-sm hover:shadow-md transition-all duration-300  ">
        <CardHeader>
          <div className="flex items-center gap-2">
            <Lightbulb className="h-5 w-5 text-blue-600 dark:text-blue-400" />
            <CardTitle className="text-gray-900 ">Smart Recommendations</CardTitle>
          </div>
          <CardDescription className="text-muted-foreground ">AI-generated suggestions to optimize your operations</CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          {[
            {
              icon: DollarSign,
              title: "Optimize Payment Collection",
              description:
                "Based on payment patterns, sending reminders on Wednesdays increases collection rate by 23%.",
              impact: "High Impact",
              color: "text-green-600 dark:text-green-400",
              bgColor: "bg-green-50 dark:bg-green-900/20",
            },
            {
              icon: Users,
              title: "Customer Segmentation Opportunity",
              description:
                "5 customers account for 60% of revenue. Consider implementing a VIP program to retain them.",
              impact: "Medium Impact",
              color: "text-blue-600 dark:text-blue-400",
              bgColor: "bg-blue-50 dark:bg-blue-900/20",
            },
            {
              icon: TrendingDown,
              title: "Reduce Overdue Invoices",
              description: "Implementing automated follow-ups could reduce overdue invoices by an estimated 18%.",
              impact: "High Impact",
              color: "text-orange-600 dark:text-orange-400",
              bgColor: "bg-orange-50 dark:bg-orange-900/20",
            },
            {
              icon: Calendar,
              title: "Reload Timing Optimization",
              description:
                "Historical data suggests reloading on the 1st and 15th of each month minimizes cash flow gaps.",
              impact: "Medium Impact",
              color: "text-purple-600 dark:text-purple-400",
              bgColor: "bg-purple-50 dark:bg-purple-900/20",
            },
          ].map((recommendation, index) => (
            <div key={index} className={`flex items-start gap-4 p-4 ${recommendation.bgColor} rounded-lg transition-colors duration-300 hover:bg-opacity-80`}>
              <recommendation.icon className={`h-5 w-5 ${recommendation.color} mt-0.5`} />
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <h4 className="font-semibold text-sm ">{recommendation.title}</h4>
                  <Badge variant="outline" className="text-xs">
                    {recommendation.impact}
                  </Badge>
                </div>
                <p className="text-sm text-gray-700 ">{recommendation.description}</p>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  )
}
