"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Calendar, Download, Filter, Search, TrendingUp, TrendingDown, BarChart3, PieChart, FileText, DollarSign, Users, Activity } from "lucide-react"
import { cn } from "@/lib/utils"

// Mock data for reports
const reportData = [
  { ticketNo: "TKT001", date: "2024-01-15", amount: "RM 1,250.00", status: "Paid", customer: "ABC Corp", type: "Invoice" },
  { ticketNo: "TKT002", date: "2024-01-14", amount: "RM 850.00", status: "Pending", customer: "XYZ Ltd", type: "Quote" },
  { ticketNo: "TKT003", date: "2024-01-13", amount: "RM 2,100.00", status: "Paid", customer: "Tech Solutions", type: "Invoice" },
  { ticketNo: "TKT004", date: "2024-01-12", amount: "RM 750.00", status: "Overdue", customer: "StartUp Inc", type: "Invoice" },
  { ticketNo: "TKT005", date: "2024-01-11", amount: "RM 1,500.00", status: "Paid", customer: "Global Systems", type: "Invoice" },
]

const summaryStats = [
  { title: "Total Revenue", value: "RM 182,500", change: "+12.5%", trend: "up", icon: DollarSign },
  { title: "Total Invoices", value: "1,247", change: "+8.2%", trend: "up", icon: FileText },
  { title: "Active Customers", value: "89", change: "-2.1%", trend: "down", icon: Users },
  { title: "Conversion Rate", value: "94.2%", change: "+1.8%", trend: "up", icon: TrendingUp },
]

export default function ReportsPage() {
  const [selectedPeriod, setSelectedPeriod] = useState("monthly")
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [isLoading, setIsLoading] = useState(false)

  const filteredData = reportData.filter(item => {
    const matchesSearch = item.ticketNo.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.customer.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || item.status.toLowerCase() === statusFilter.toLowerCase()
    return matchesSearch && matchesStatus
  })

  const handleExport = () => {
    setIsLoading(true)
    // Simulate export process
    setTimeout(() => {
      setIsLoading(false)
      // In a real app, this would trigger a file download
      console.log("Exporting report data...")
    }, 2000)
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white">Reports</h1>
          <p className="text-gray-600 dark:text-gray-300">
            Comprehensive analytics and reporting dashboard
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" size="sm" className="gap-2">
            <Filter className="w-4 h-4" />
            Filter
          </Button>
          <Button 
            size="sm" 
            onClick={handleExport}
            disabled={isLoading}
            className="gap-2 bg-blue-600 hover:bg-blue-700"
          >
            <Download className="w-4 h-4" />
            {isLoading ? "Exporting..." : "Export"}
          </Button>
        </div>
      </div>

      {/* Summary Stats */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {summaryStats.map((stat, index) => {
          const Icon = stat.icon
          return (
            <Card key={index} className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600 dark:text-gray-300">{stat.title}</p>
                    <p className="text-2xl font-bold text-gray-900 dark:text-white">{stat.value}</p>
                    <div className={`flex items-center gap-1 mt-1 text-sm ${
                      stat.trend === 'up' ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'
                    }`}>
                      {stat.trend === 'up' ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
                      {stat.change}
                    </div>
                  </div>
                  <div className="w-12 h-12 bg-blue-50 dark:bg-blue-900/20 rounded-lg flex items-center justify-center">
                    <Icon className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                  </div>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Main Content */}
      <div className="grid gap-8 lg:grid-cols-3">
        {/* Reports Table */}
        <div className="lg:col-span-2">
          <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-gray-900 dark:text-white">Transaction Reports</CardTitle>
                  <CardDescription>Recent transactions and their status</CardDescription>
                </div>
                <div className="flex items-center gap-2">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <Input
                      placeholder="Search tickets..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10 w-64"
                    />
                  </div>
                  <Select value={statusFilter} onValueChange={setStatusFilter}>
                    <SelectTrigger className="w-32">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Status</SelectItem>
                      <SelectItem value="paid">Paid</SelectItem>
                      <SelectItem value="pending">Pending</SelectItem>
                      <SelectItem value="overdue">Overdue</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="rounded-lg border border-gray-200 dark:border-gray-700">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-gray-50 dark:bg-gray-800">
                      <TableHead className="text-center font-semibold">Ticket No</TableHead>
                      <TableHead className="font-semibold">Date</TableHead>
                      <TableHead className="font-semibold">Customer</TableHead>
                      <TableHead className="font-semibold">Amount</TableHead>
                      <TableHead className="font-semibold">Status</TableHead>
                      <TableHead className="font-semibold">Type</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredData.map((item, index) => (
                      <TableRow key={index} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                        <TableCell className="text-center">
                          <p className="text-sm font-medium text-blue-600">{item.ticketNo}</p>
                        </TableCell>
                        <TableCell className="text-sm text-gray-600 dark:text-gray-300">{item.date}</TableCell>
                        <TableCell className="text-sm font-medium text-gray-900 dark:text-gray-100">{item.customer}</TableCell>
                        <TableCell className="text-sm font-semibold text-gray-900 dark:text-gray-100">{item.amount}</TableCell>
                        <TableCell>
                          <Badge 
                            variant={item.status === 'Paid' ? 'default' : item.status === 'Pending' ? 'secondary' : 'destructive'}
                            className="text-xs"
                          >
                            {item.status}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-sm text-gray-600 dark:text-gray-300">{item.type}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Analytics Cards */}
        <div className="space-y-6">
          {/* Period Selector */}
          <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
            <CardHeader>
              <CardTitle className="text-gray-900 dark:text-white">Time Period</CardTitle>
            </CardHeader>
            <CardContent>
              <Tabs value={selectedPeriod} onValueChange={setSelectedPeriod} className="w-full">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger 
                    value="weekly"
                    className={cn(
                      "text-xs transition-all duration-200",
                      selectedPeriod === "weekly" 
                        ? "bg-blue-600 text-white" 
                        : "bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-600"
                    )}
                  >
                    Weekly
                  </TabsTrigger>
                  <TabsTrigger 
                    value="monthly"
                    className={cn(
                      "text-xs transition-all duration-200",
                      selectedPeriod === "monthly" 
                        ? "bg-blue-600 text-white" 
                        : "bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-600"
                    )}
                  >
                    Monthly
                  </TabsTrigger>
                  <TabsTrigger 
                    value="yearly"
                    className={cn(
                      "text-xs transition-all duration-200",
                      selectedPeriod === "yearly" 
                        ? "bg-blue-600 text-white" 
                        : "bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-600"
                    )}
                  >
                    Yearly
                  </TabsTrigger>
                </TabsList>
              </Tabs>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
            <CardHeader>
              <CardTitle className="text-gray-900 dark:text-white">Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button variant="outline" className="w-full justify-start gap-2">
                <BarChart3 className="w-4 h-4" />
                Generate Chart
              </Button>
              <Button variant="outline" className="w-full justify-start gap-2">
                <PieChart className="w-4 h-4" />
                View Analytics
              </Button>
              <Button variant="outline" className="w-full justify-start gap-2">
                <Calendar className="w-4 h-4" />
                Schedule Report
              </Button>
            </CardContent>
          </Card>

          {/* Recent Activity */}
          <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
            <CardHeader>
              <CardTitle className="text-gray-900 dark:text-white">Recent Activity</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {reportData.slice(0, 3).map((item, index) => (
                  <div key={index} className="flex items-center gap-3 p-3 rounded-lg border border-gray-200 dark:border-gray-600">
                    <div className="w-8 h-8 bg-blue-50 dark:bg-blue-900/20 rounded-full flex items-center justify-center">
                      <Activity className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-blue-600">Ticket #{item.ticketNo}</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">{item.customer}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-semibold text-gray-900 dark:text-gray-100">{item.amount}</p>
                      <Badge 
                        variant={item.status === 'Paid' ? 'default' : 'secondary'}
                        className="text-xs"
                      >
                        {item.status}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
