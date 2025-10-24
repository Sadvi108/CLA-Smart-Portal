"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { 
  DollarSign, 
  FileText, 
  Wallet, 
  RefreshCw, 
  AlertCircle, 
  Clock, 
  CreditCard, 
  TrendingUp, 
  AlertTriangle,
  Search,
  Filter,
  Download,
  Eye,
  MoreHorizontal,
  ArrowUpRight,
  ArrowDownRight,
  Users,
  Calendar,
  Bell,
  Settings
} from "lucide-react"
import {
  Line,
  LineChart,
  Pie,
  PieChart,
  Bar,
  BarChart,
  Area,
  AreaChart,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Cell,
} from "recharts"
import { invoices, payments } from "@/lib/mock-data"

// Enhanced mock data for charts
const monthlyTrends = [
  { month: "Jan", invoices: 45, payments: 42, refunds: 3, revenue: 125000 },
  { month: "Feb", invoices: 52, payments: 48, refunds: 4, revenue: 142000 },
  { month: "Mar", invoices: 48, payments: 50, refunds: 2, revenue: 138000 },
  { month: "Apr", invoices: 61, payments: 55, refunds: 6, revenue: 165000 },
  { month: "May", invoices: 55, payments: 58, refunds: 3, revenue: 158000 },
  { month: "Jun", invoices: 67, payments: 62, refunds: 5, revenue: 182000 },
]

const paymentMethods = [
  { name: "FPX", value: 45, color: "#007BFF", amount: 125000 },
  { name: "IBG", value: 30, color: "#0056CC", amount: 85000 },
  { name: "Contra", value: 25, color: "#003D99", amount: 65000 },
]

const invoiceTypes = [
  { type: "Container", count: 120, revenue: 85000, growth: 12 },
  { type: "Storage", count: 85, revenue: 65000, growth: -5 },
  { type: "Handling", count: 65, revenue: 45000, growth: 8 },
  { type: "Transport", count: 45, revenue: 35000, growth: 15 },
]

const recentActivity = [
  { 
    id: 1,
    type: 'payment', 
    title: 'Payment Received', 
    description: 'INV-2025-001 - RM 15,200', 
    time: '2 hours ago',
    amount: 15200,
    status: 'success'
  },
  { 
    id: 2,
    type: 'invoice', 
    title: 'New Invoice Created', 
    description: 'INV-2025-045 - RM 8,500', 
    time: '5 hours ago',
    amount: 8500,
    status: 'info'
  },
  { 
    id: 3,
    type: 'payment', 
    title: 'Payment Processed', 
    description: 'INV-2025-032 - RM 12,300', 
    time: '1 day ago',
    amount: 12300,
    status: 'success'
  },
  { 
    id: 4,
    type: 'overdue', 
    title: 'Invoice Overdue', 
    description: 'INV-2025-023 - RM 12,400', 
    time: '2 days ago',
    amount: 12400,
    status: 'error'
  },
]

export default function DashboardPage() {
  const [isLoading, setIsLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedTimeframe, setSelectedTimeframe] = useState("month")
  const [selectedPeriod, setSelectedPeriod] = useState('7d')
  const [isRefreshing, setIsRefreshing] = useState(false)

  // Simulate loading state
  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1500)
    return () => clearTimeout(timer)
  }, [])

  // Calculate enhanced stats
  const outstandingInvoices = invoices.filter(inv => inv.status === "Outstanding" || inv.status === "Overdue")
  const totalRevenue = invoices.reduce((sum, inv) => sum + inv.amount, 0)
  const monthlyRevenue = 182000 // Current month
  const revenueGrowth = 12.5 // Percentage growth
  const recentInvoices = invoices.slice(0, 5)

  const handleRefresh = async () => {
    setIsRefreshing(true)
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000))
    setIsRefreshing(false)
  }

  const StatCard = ({ title, value, subtitle, icon: Icon, color, trend, trendValue, isLoading }: any) => (
    <Card className="group relative overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-2 border-0 bg-white dark:from-gray-800 dark:via-gray-700/50 dark:to-gray-800 shadow-md">
      <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000" style={{background: 'linear-gradient(to right, rgba(0, 123, 255, 0.05), rgba(0, 123, 255, 0.1), rgba(0, 123, 255, 0.05))'}} />
      <CardContent className="p-6">
        {isLoading ? (
          <div className="animate-pulse">
            <div className="flex items-center justify-between mb-4">
              <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-24"></div>
              <div className="w-12 h-12 bg-gray-100 dark:bg-gray-800 rounded-xl"></div>
            </div>
            <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-16 mb-2"></div>
            <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-20"></div>
          </div>
        ) : (
          <>
            <div className="flex items-center justify-between mb-4">
              <p className="text-sm font-medium text-gray-600 dark:text-gray-300">{title}</p>
              <div className="w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-300 group-hover:scale-110 group-hover:shadow-lg" style={{backgroundColor: '#007BFF', opacity: 0.1}}>
                <Icon className="w-6 h-6" style={{color: '#007BFF'}} />
              </div>
            </div>
            <div className="space-y-2">
              <p className="text-3xl font-bold text-gray-900 dark:text-gray-100">{value}</p>
              <div className="flex items-center gap-2">
                <p className="text-sm text-gray-500 dark:text-gray-400">{subtitle}</p>
                {trend && (
                  <div className={`flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${
                    trend === 'up' ? 'text-white' : 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300'
                  }`}
                  style={trend === 'up' ? {backgroundColor: '#007BFF'} : {}}
                  >
                    {trend === 'up' ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
                    {trendValue}%
                  </div>
                )}
              </div>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  )

  return (
    <div className="space-y-8 p-6 bg-white dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 min-h-screen">
      {/* Header Section */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">Dashboard</h1>
          <p className="text-gray-600 dark:text-gray-300 mt-1">Welcome back! Here's what's happening with your business.</p>
        </div>
        <div className="flex items-center gap-3">
          <Button 
            variant="outline" 
            size="sm" 
            onClick={handleRefresh}
            disabled={isRefreshing}
            className="transition-all hover:scale-105 border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-900/20"
            style={{'--hover-border-color': '#007BFF'} as React.CSSProperties}
          >
            <RefreshCw className={`w-4 h-4 mr-2 ${isRefreshing ? 'animate-spin' : ''}`} />
            {isRefreshing ? 'Refreshing...' : 'Refresh'}
          </Button>
          <Button size="sm" className="text-white transition-all hover:scale-105 shadow-lg" style={{backgroundColor: '#007BFF'}}>
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>
        </div>
      </div>

      {/* Enhanced Stats Cards */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Total Invoices"
          value={invoices.length}
          subtitle="All time"
          icon={FileText}
          color="blue"
          trend="up"
          trendValue="8.2"
          isLoading={isLoading}
        />
        <StatCard
          title="Outstanding"
          value={outstandingInvoices.length}
          subtitle="Awaiting payment"
          icon={Clock}
          color="orange"
          trend="down"
          trendValue="3.1"
          isLoading={isLoading}
        />
        <StatCard
          title="Monthly Revenue"
          value={`RM ${monthlyRevenue.toLocaleString()}`}
          subtitle="This month"
          icon={DollarSign}
          color="green"
          trend="up"
          trendValue={revenueGrowth}
          isLoading={isLoading}
        />
        <StatCard
          title="Active Clients"
          value="24"
          subtitle="This month"
          icon={Users}
          color="purple"
          trend="up"
          trendValue="12.5"
          isLoading={isLoading}
        />
      </div>

      {/* Interactive Charts Section */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Enhanced Revenue Trends */}
        <Card className="lg:col-span-2 transition-all duration-300 hover:shadow-lg border-0 bg-gradient-to-br from-white to-gray-50/50 dark:from-gray-800 dark:to-gray-700/50">
          <CardHeader className="pb-4">
            <div className="flex items-center justify-between">
              <CardTitle className="text-xl font-semibold text-gray-900 dark:text-gray-100">Revenue Trends</CardTitle>
              <Tabs value={selectedTimeframe} onValueChange={setSelectedTimeframe} className="w-auto">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="week">Week</TabsTrigger>
                  <TabsTrigger value="month">Month</TabsTrigger>
                  <TabsTrigger value="year">Year</TabsTrigger>
                </TabsList>
              </Tabs>
            </div>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={monthlyTrends}>
                  <defs>
                    <linearGradient id="revenueGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#0ea5e9" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#0ea5e9" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" className="dark:stroke-gray-600" />
                  <XAxis dataKey="month" stroke="#64748b" className="dark:stroke-gray-400" />
                  <YAxis stroke="#64748b" className="dark:stroke-gray-400" />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'white', 
                      border: 'none', 
                      borderRadius: '12px', 
                      boxShadow: '0 10px 25px rgba(0,0,0,0.1)' 
                    }} 
                  />
                  <Area 
                    type="monotone" 
                    dataKey="revenue" 
                    stroke="#0ea5e9" 
                    strokeWidth={3}
                    fill="url(#revenueGradient)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Enhanced Payment Methods */}
        <Card className="transition-all duration-300 hover:shadow-lg border-0 bg-gradient-to-br from-white to-gray-50/50 dark:from-gray-800 dark:to-gray-700/50">
          <CardHeader className="pb-4">
            <CardTitle className="text-xl font-semibold text-gray-900 dark:text-gray-100">Payment Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64 mb-4">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={paymentMethods}
                    cx="50%"
                    cy="50%"
                    innerRadius={40}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {paymentMethods.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip 
                    formatter={(value, name, props) => [
                      `${value}% (RM ${props.payload.amount.toLocaleString()})`, 
                      name
                    ]}
                    contentStyle={{ 
                      backgroundColor: 'white', 
                      border: 'none', 
                      borderRadius: '12px', 
                      boxShadow: '0 10px 25px rgba(0,0,0,0.1)' 
                    }} 
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="space-y-3">
              {paymentMethods.map((method, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div 
                      className="w-3 h-3 rounded-full" 
                      style={{ backgroundColor: method.color }}
                    />
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{method.name}</span>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-semibold text-gray-900 dark:text-gray-100">{method.value}%</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">RM {method.amount.toLocaleString()}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Enhanced Bottom Section */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Interactive Recent Invoices */}
        <Card className="lg:col-span-2 transition-all duration-300 hover:shadow-lg border-0 bg-white dark:from-gray-800 dark:to-gray-700/50">
          <CardHeader className="pb-4">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <CardTitle className="text-xl font-semibold text-gray-900 dark:text-gray-100">Recent Invoices</CardTitle>
              <div className="flex items-center gap-3">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500 w-4 h-4" />
                  <Input
                    placeholder="Search invoices..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 w-48 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100"
                  />
                </div>
                <Button variant="outline" size="sm" className="transition-all hover:scale-105 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-700">
                  <Eye className="w-4 h-4 mr-2" />
                  View All
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {recentInvoices
                .filter(invoice => 
                  invoice.invoice_id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                  invoice.customer.toLowerCase().includes(searchTerm.toLowerCase())
                )
                .map((invoice) => (
                <div 
                  key={invoice.invoice_id} 
                  className="group flex items-center justify-between p-4 border border-gray-100 dark:border-gray-700 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-900/20 transition-all duration-200 cursor-pointer"
                  style={{'--hover-border-color': '#007BFF'} as React.CSSProperties}
                >
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{backgroundColor: '#007BFF', opacity: 0.1}}>
                      <FileText className="w-5 h-5" style={{color: '#007BFF'}} />
                    </div>
                    <div>
                      <div className="flex items-center gap-3 mb-1">
                        <p className="font-semibold text-gray-900 dark:text-gray-100">{invoice.invoice_id}</p>
                        <Badge
                          variant="outline"
                          className={`text-xs ${
                            invoice.status === "Paid"
                              ? "border-green-200 bg-green-50 text-green-700 dark:border-green-700 dark:bg-green-900/30 dark:text-green-300"
                              : invoice.status === "Outstanding"
                                ? "border-yellow-200 bg-yellow-50 text-yellow-700 dark:border-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-300"
                                : "border-red-200 bg-red-50 text-red-700 dark:border-red-700 dark:bg-red-900/30 dark:text-red-300"
                          }`}
                        >
                          {invoice.status}
                        </Badge>
                      </div>
                      <p className="text-sm text-gray-600 dark:text-gray-300">{invoice.customer}</p>
                      <p className="text-xs text-gray-400 dark:text-gray-500">{new Date(invoice.date).toLocaleDateString()}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="text-right">
                      <p className="font-bold text-gray-900 dark:text-gray-100">RM {invoice.amount.toLocaleString()}</p>
                    </div>
                    <Button variant="ghost" size="sm" className="opacity-0 group-hover:opacity-100 transition-opacity dark:hover:bg-gray-700">
                      <MoreHorizontal className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Enhanced Activity Feed */}
        <Card className="transition-all duration-300 hover:shadow-lg border-0 bg-gradient-to-br from-white to-gray-50/50 dark:from-gray-800 dark:to-gray-700/50">
          <CardHeader className="pb-4">
            <div className="flex items-center justify-between">
              <CardTitle className="text-xl font-semibold text-gray-900 dark:text-gray-100">Live Activity</CardTitle>
              <Button variant="ghost" size="sm" className="dark:hover:bg-gray-700">
                <Bell className="w-4 h-4" />
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivity.map((activity) => (
                <div key={activity.id} className="group flex gap-4 p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${
                    activity.type === 'payment' ? 'bg-green-100 dark:bg-green-900/30' :
                    activity.type === 'invoice' ? 'dark:bg-blue-900/30' :
                    'bg-red-100'
                  }`}
                  style={activity.type === 'invoice' ? {backgroundColor: '#007BFF', opacity: 0.1} : {}}
                  >
                    {activity.type === 'payment' ? (
                      <CreditCard className="w-5 h-5 text-green-600 dark:text-green-400" />
                    ) : activity.type === 'invoice' ? (
                      <FileText className="w-5 h-5" style={{color: '#007BFF'}} />
                    ) : (
                      <AlertTriangle className="w-5 h-5 text-red-600 dark:text-red-400" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <p className="font-medium text-gray-900 dark:text-gray-100 text-sm">{activity.title}</p>
                      <span className="text-xs text-gray-400 dark:text-gray-500">{activity.time}</span>
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-300 mb-1">{activity.description}</p>
                    <div className="flex items-center justify-between">
                      <Badge 
                        variant="outline" 
                        className={`text-xs ${
                          activity.status === 'success' ? 'border-green-200 bg-green-50 text-green-700 dark:border-green-700 dark:bg-green-900/30 dark:text-green-300' :
                          activity.status === 'error' ? 'border-red-200 bg-red-50 text-red-700 dark:border-red-700 dark:bg-red-900/30 dark:text-red-300' :
                          'text-white dark:border-blue-700 dark:bg-blue-900/30 dark:text-blue-300'
                        }`}
                        style={activity.status === 'info' ? {backgroundColor: '#007BFF', borderColor: '#007BFF'} : {}}
                      >
                        RM {activity.amount.toLocaleString()}
                      </Badge>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <Link href="/dashboard/live" className="block w-full">
              <Button variant="outline" className="w-full mt-4 transition-all hover:scale-105 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-700">
                View All Activity
              </Button>
            </Link>
         </CardContent>
       </Card>
      </div>

      {/* Service Performance Section */}
      <Card className="transition-all duration-300 hover:shadow-lg border-0 bg-white dark:from-gray-800 dark:to-gray-700/50">
        <CardHeader className="pb-4">
          <CardTitle className="text-xl font-semibold text-gray-900 dark:text-gray-100">Service Performance</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {invoiceTypes.map((type, index) => (
              <div key={index} className="group p-4 border border-gray-100 dark:border-gray-700 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-900/20 transition-all duration-200"
              style={{'--hover-border-color': '#007BFF'} as React.CSSProperties}>
                <div className="flex items-center justify-between mb-3">
                  <h4 className="font-semibold text-gray-900 dark:text-gray-100">{type.type}</h4>
                  <div className={`flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${
                    type.growth > 0 ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300' : 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300'
                  }`}>
                    {type.growth > 0 ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
                    {Math.abs(type.growth)}%
                  </div>
                </div>
                <div className="space-y-2">
                  <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">{type.count}</p>
                  <p className="text-sm text-gray-600 dark:text-gray-300">RM {type.revenue.toLocaleString()}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
