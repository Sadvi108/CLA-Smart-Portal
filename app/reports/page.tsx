"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Download, Search, FileText, DollarSign, RefreshCw, Wallet, MessageSquare, Receipt, CreditCard, Settings, BarChart3, FileX, FilePlus, Building2 } from "lucide-react"

// Mock data for eFeedback History
const eFeedbackData = [
  {
    submissionDate: "15/7/2022 1:47:27 PM",
    ticketNo: "600689",
    reason: "Deposit",
    remarks: "PAYMENT DEPOSITED TODAY 15/7/2022 FOR INVOICE KMTC1221073275",
    actionStatus: "Pending",
  },
  {
    submissionDate: "15/7/2022 1:50:31 PM", 
    ticketNo: "600690",
    reason: "Deposit",
    remarks: "PAYMENT FOR INVOICE KMTC1221073275",
    actionStatus: "Pending",
  },
  {
    submissionDate: "12/7/2022 2:15:45 PM",
    ticketNo: "600688",
    reason: "Refund Request",
    remarks: "REQUEST REFUND FOR OVERPAYMENT ON INVOICE KMTC1221073200",
    actionStatus: "Completed",
  },
  {
    submissionDate: "10/7/2022 9:30:12 AM",
    ticketNo: "600687",
    reason: "Payment Issue",
    remarks: "UNABLE TO PROCESS PAYMENT FOR INVOICE KMTC1221073150",
    actionStatus: "In Progress",
  },
]

// Mock data for other reports
const invoicesData = [
  {
    id: "INV-2025-001",
    customer: "ABC Logistics",
    amount: 15200,
    status: "Paid",
    method: "FPX",
    date: "2025-01-15",
  },
  {
    id: "INV-2025-002",
    customer: "XYZ Shipping",
    amount: 8500,
    status: "Outstanding",
    method: "IBG",
    date: "2025-01-18",
  },
  {
    id: "INV-2025-003",
    customer: "Global Transport",
    amount: 12400,
    status: "Overdue",
    method: "FPX",
    date: "2024-12-28",
  },
  {
    id: "INV-2025-004",
    customer: "Fast Cargo",
    amount: 9800,
    status: "Paid",
    method: "Contra",
    date: "2025-01-20",
  },
  {
    id: "INV-2025-005",
    customer: "Ocean Freight",
    amount: 18600,
    status: "Outstanding",
    method: "FPX",
    date: "2025-01-22",
  },
]

const paymentsData = [
  { id: "PAY-2025-001", invoice: "INV-2025-001", amount: 15200, method: "FPX", date: "2025-01-16" },
  { id: "PAY-2025-002", invoice: "INV-2024-089", amount: 7300, method: "IBG", date: "2025-01-17" },
  { id: "PAY-2025-003", invoice: "INV-2025-004", amount: 9800, method: "Contra", date: "2025-01-21" },
  { id: "PAY-2025-004", invoice: "INV-2024-095", amount: 11500, method: "FPX", date: "2025-01-23" },
]

const receiptData = [
  { id: "RCP-2025-001", invoice: "INV-2025-001", amount: 15200, method: "FPX", date: "2025-01-16" },
  { id: "RCP-2025-002", invoice: "INV-2024-089", amount: 7300, method: "IBG", date: "2025-01-17" },
  { id: "RCP-2025-003", invoice: "INV-2025-004", amount: 9800, method: "Contra", date: "2025-01-21" },
]

const soaData = [
  { period: "Jan 2025", customer: "ABC Logistics", totalInvoices: 5, totalAmount: 45600, outstanding: 12400, date: "2025-01-31" },
  { period: "Dec 2024", customer: "XYZ Shipping", totalInvoices: 3, totalAmount: 28900, outstanding: 8500, date: "2024-12-31" },
  { period: "Nov 2024", customer: "Global Transport", totalInvoices: 7, totalAmount: 67200, outstanding: 0, date: "2024-11-30" },
]

const cnReportData = [
  { id: "CN-2025-001", invoice: "INV-2024-089", amount: 2300, reason: "Damaged goods", status: "Approved", date: "2025-01-10" },
  { id: "CN-2025-002", invoice: "INV-2024-095", amount: 1500, reason: "Service issue", status: "Pending", date: "2025-01-15" },
  { id: "CN-2025-003", invoice: "INV-2025-001", amount: 800, reason: "Billing error", status: "Rejected", date: "2025-01-20" },
]

const dnReportData = [
  { id: "DN-2025-001", invoice: "INV-2024-078", amount: 500, reason: "Late payment fee", status: "Issued", date: "2025-01-12" },
  { id: "DN-2025-002", invoice: "INV-2024-082", amount: 300, reason: "Additional charges", status: "Pending", date: "2025-01-18" },
]

const claStatements = [
  { date: "2025-01-15", type: "Reload", description: "Account Reload", debit: 50000, credit: 0, balance: 87650 },
  { date: "2025-01-16", type: "Payment", description: "INV-2025-001", debit: 0, credit: 15200, balance: 72450 },
  { date: "2025-01-20", type: "Payment", description: "INV-2025-004", debit: 0, credit: 9800, balance: 62650 },
  { date: "2025-01-23", type: "Reload", description: "Account Reload", debit: 25000, credit: 0, balance: 87650 },
]

export default function ReportsPage() {
  const [activeTab, setActiveTab] = useState("efeedback")
  const [searchTerm, setSearchTerm] = useState("")
  const [entriesPerPage, setEntriesPerPage] = useState("10")

  const handleDownload = (format: string, reportType: string) => {
    alert(`Downloading ${reportType} report as ${format.toUpperCase()}...`)
  }

  const getStatusBadge = (status: string) => {
    const variants: Record<string, "default" | "secondary" | "destructive" | "outline"> = {
      Paid: "default",
      Outstanding: "secondary", 
      Overdue: "destructive",
      Approved: "default",
      Pending: "secondary",
      Rejected: "destructive",
      Completed: "default",
      "In Progress": "secondary",
      Issued: "default",
    }
    return <Badge variant={variants[status] || "outline"}>{status}</Badge>
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-50/30 via-white to-sky-50/20 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 p-4 lg:p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Page Header */}
        <div className="text-center space-y-4">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-sky-500 to-sky-600 rounded-2xl shadow-lg mb-4">
            <FileText className="h-8 w-8 text-white" />
          </div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-sky-600 to-sky-800 bg-clip-text text-transparent">
            Reports & Analytics
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Comprehensive reporting dashboard with detailed transaction history, financial statements, and feedback management
          </p>
        </div>

        {/* Enhanced Sub-Navigation Tabs */}
        <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl shadow-xl border border-sky-100 dark:border-gray-700 p-2">
          <div className="flex flex-wrap gap-2 justify-center lg:justify-start">
            {[
              { id: 'efeedback', label: 'eFeedback', icon: MessageSquare, description: 'Customer feedback & reviews' },
              { id: 'payment-history', label: 'Payment History', icon: CreditCard, description: 'Transaction records' },
              { id: 'invoice-report', label: 'Invoice Report', icon: FileText, description: 'Billing documents' },
              { id: 'receipt-report', label: 'Receipt Report', icon: Receipt, description: 'Payment receipts' },
              { id: 'soa', label: 'SOA', icon: FileText, description: 'Statement of accounts' },
              { id: 'cn-report', label: 'CN Report', icon: RefreshCw, description: 'Credit notes' },
              { id: 'dn-report', label: 'DN Report', icon: CreditCard, description: 'Debit notes' },
              { id: 'cla-statement', label: 'CLA Statement', icon: Wallet, description: 'CLA statements' }
            ].map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`group relative flex items-center gap-3 px-6 py-4 rounded-xl font-medium transition-all duration-300 ${
                    isActive
                      ? 'bg-gradient-to-r from-sky-500 to-sky-600 text-white shadow-lg shadow-sky-500/25 scale-105'
                      : 'bg-gray-50 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-sky-50 dark:hover:bg-gray-600 hover:text-sky-600 dark:hover:text-sky-400 hover:scale-102'
                  }`}
                >
                  <Icon className={`h-5 w-5 transition-transform duration-300 ${isActive ? 'scale-110' : 'group-hover:scale-110'}`} />
                  <div className="text-left">
                    <div className="text-sm font-semibold">{tab.label}</div>
                    <div className={`text-xs opacity-75 ${isActive ? 'text-sky-100' : 'text-gray-500 dark:text-gray-400'}`}>
                      {tab.description}
                    </div>
                  </div>
                  {isActive && (
                    <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-sky-400/20 to-sky-600/20 animate-pulse" />
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Content Sections */}
        <div className="space-y-6">
          {/* eFeedback History Section */}
          {activeTab === 'efeedback' && (
            <Card className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm shadow-xl border border-sky-100 dark:border-gray-700">
              <CardHeader className="border-b border-gray-200 dark:border-gray-700">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <div className="p-3 bg-gradient-to-br from-sky-500 to-sky-600 rounded-xl shadow-lg">
                      <MessageSquare className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <CardTitle className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                        eFeedback History
                      </CardTitle>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                        View your eFeedback history with PIC action status
                      </p>
                    </div>
                  </div>
                  <Button 
                    variant="outline" 
                    className="border-sky-600 text-sky-600 hover:bg-sky-50 dark:hover:bg-sky-900/20"
                  >
                    <Settings className="mr-2 h-4 w-4" />
                    Tools
                  </Button>
                </div>
              </CardHeader>
              
              <CardContent className="p-6">
                {/* Controls */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
                  <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                    <span>Show</span>
                    <Select value={entriesPerPage} onValueChange={setEntriesPerPage}>
                      <SelectTrigger className="w-20">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="5">5</SelectItem>
                        <SelectItem value="10">10</SelectItem>
                        <SelectItem value="25">25</SelectItem>
                        <SelectItem value="50">50</SelectItem>
                      </SelectContent>
                    </Select>
                    <span>entries</span>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <Label htmlFor="search" className="text-sm text-gray-600 dark:text-gray-400">Search:</Label>
                    <Input
                      id="search"
                      placeholder=""
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-48"
                    />
                  </div>
                </div>

                {/* Desktop Table */}
                <div className="hidden sm:block overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow className="bg-sky-500 hover:bg-sky-500">
                        <TableHead className="text-white font-semibold text-center">SUBMISSION DATE</TableHead>
                        <TableHead className="text-white font-semibold text-center">TICKET NO</TableHead>
                        <TableHead className="text-white font-semibold text-center">REASON</TableHead>
                        <TableHead className="text-white font-semibold text-center">REMARKS</TableHead>
                        <TableHead className="text-white font-semibold text-center">ACTION STATUS</TableHead>
                        <TableHead className="text-white font-semibold text-center">ACTION</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {eFeedbackData.map((item, index) => (
                        <TableRow key={index} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                          <TableCell className="text-center text-sm">{item.submissionDate}</TableCell>
                          <TableCell className="text-center text-sm font-medium text-sky-600">{item.ticketNo}</TableCell>
                          <TableCell className="text-center text-sm">{item.reason}</TableCell>
                          <TableCell className="text-left text-sm max-w-xs">
                            <div className="truncate" title={item.remarks}>
                              {item.remarks}
                            </div>
                          </TableCell>
                          <TableCell className="text-center">
                            {getStatusBadge(item.actionStatus)}
                          </TableCell>
                          <TableCell className="text-center">
                            <Button variant="outline" size="sm" className="text-xs">
                              View
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>

                {/* Mobile Card View */}
                <div className="block sm:hidden space-y-4">
                  {eFeedbackData.map((item, index) => (
                    <Card key={index} className="border border-gray-200 dark:border-gray-700">
                      <CardContent className="p-4">
                        <div className="space-y-3">
                          <div className="flex justify-between items-start">
                            <div>
                              <p className="text-sm font-medium text-sky-600">Ticket #{item.ticketNo}</p>
                              <p className="text-xs text-gray-500">{item.submissionDate}</p>
                            </div>
                            {getStatusBadge(item.actionStatus)}
                          </div>
                          <div>
                            <p className="text-sm font-medium text-gray-900 dark:text-gray-100">{item.reason}</p>
                            <p className="text-xs text-gray-600 dark:text-gray-400 mt-1 line-clamp-2">{item.remarks}</p>
                          </div>
                          <Button variant="outline" size="sm" className="w-full">
                            View Details
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Payment History Section */}
          {activeTab === 'payment-history' && (
            <Card className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm shadow-xl border border-sky-100 dark:border-gray-700">
              <CardHeader className="border-b border-gray-200 dark:border-gray-700">
                <div className="flex items-center gap-3">
                  <div className="p-3 bg-gradient-to-br from-sky-500 to-sky-600 rounded-xl shadow-lg">
                    <DollarSign className="h-6 w-6 text-white" />
                  </div>
                  <CardTitle className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                    Payment History
                  </CardTitle>
                </div>
              </CardHeader>
              <CardContent className="p-6">
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Payment ID</TableHead>
                        <TableHead>Invoice</TableHead>
                        <TableHead>Amount</TableHead>
                        <TableHead>Method</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead>Action</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {paymentsData.map((payment) => (
                        <TableRow key={payment.id}>
                          <TableCell className="font-medium">{payment.id}</TableCell>
                          <TableCell>{payment.invoice}</TableCell>
                          <TableCell>RM {payment.amount.toLocaleString()}</TableCell>
                          <TableCell>{payment.method}</TableCell>
                          <TableCell>{payment.date}</TableCell>
                          <TableCell>
                            <Button variant="outline" size="sm" onClick={() => handleDownload("pdf", "payment")}>
                              <Download className="mr-1 h-3 w-3" />
                              Download
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Invoice Report Section */}
          {activeTab === 'invoice-report' && (
            <Card className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm shadow-xl border border-sky-100 dark:border-gray-700">
              <CardHeader className="border-b border-gray-200 dark:border-gray-700">
                <div className="flex items-center gap-3">
                  <div className="p-3 bg-gradient-to-br from-sky-500 to-sky-600 rounded-xl shadow-lg">
                    <FileText className="h-6 w-6 text-white" />
                  </div>
                  <CardTitle className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                    Invoice Report
                  </CardTitle>
                </div>
              </CardHeader>
              <CardContent className="p-6">
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Invoice ID</TableHead>
                        <TableHead>Customer</TableHead>
                        <TableHead>Amount</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Method</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead>Action</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {invoicesData.map((invoice) => (
                        <TableRow key={invoice.id}>
                          <TableCell className="font-medium">{invoice.id}</TableCell>
                          <TableCell>{invoice.customer}</TableCell>
                          <TableCell>RM {invoice.amount.toLocaleString()}</TableCell>
                          <TableCell>{getStatusBadge(invoice.status)}</TableCell>
                          <TableCell>{invoice.method}</TableCell>
                          <TableCell>{invoice.date}</TableCell>
                          <TableCell>
                            <Button variant="outline" size="sm" onClick={() => handleDownload("pdf", "invoice")}>
                              <Download className="mr-1 h-3 w-3" />
                              Download
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Receipt Report Section */}
          {activeTab === 'receipt-report' && (
            <Card className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm shadow-xl border border-sky-100 dark:border-gray-700">
              <CardHeader className="border-b border-gray-200 dark:border-gray-700">
                <div className="flex items-center gap-3">
                  <div className="p-3 bg-gradient-to-br from-sky-500 to-sky-600 rounded-xl shadow-lg">
                    <Receipt className="h-6 w-6 text-white" />
                  </div>
                  <CardTitle className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                    Receipt Report
                  </CardTitle>
                </div>
              </CardHeader>
              <CardContent className="p-6">
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Receipt ID</TableHead>
                        <TableHead>Invoice</TableHead>
                        <TableHead>Amount</TableHead>
                        <TableHead>Method</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead>Action</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {receiptData.map((receipt) => (
                        <TableRow key={receipt.id}>
                          <TableCell className="font-medium">{receipt.id}</TableCell>
                          <TableCell>{receipt.invoice}</TableCell>
                          <TableCell>RM {receipt.amount.toLocaleString()}</TableCell>
                          <TableCell>{receipt.method}</TableCell>
                          <TableCell>{receipt.date}</TableCell>
                          <TableCell>
                            <Button variant="outline" size="sm" onClick={() => handleDownload("pdf", "receipt")}>
                              <Download className="mr-1 h-3 w-3" />
                              Download
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          )}

          {/* SOA Section */}
          {activeTab === 'soa' && (
            <Card className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm shadow-xl border border-sky-100 dark:border-gray-700">
              <CardHeader className="border-b border-gray-200 dark:border-gray-700">
                <div className="flex items-center gap-3">
                  <div className="p-3 bg-gradient-to-br from-sky-500 to-sky-600 rounded-xl shadow-lg">
                    <FileText className="h-6 w-6 text-white" />
                  </div>
                  <CardTitle className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                    Statement of Account (SOA)
                  </CardTitle>
                </div>
              </CardHeader>
              <CardContent className="p-6">
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Period</TableHead>
                        <TableHead>Customer</TableHead>
                        <TableHead>Total Invoices</TableHead>
                        <TableHead>Total Amount</TableHead>
                        <TableHead>Outstanding</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead>Action</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {soaData.map((soa, index) => (
                        <TableRow key={index}>
                          <TableCell className="font-medium">{soa.period}</TableCell>
                          <TableCell>{soa.customer}</TableCell>
                          <TableCell>{soa.totalInvoices}</TableCell>
                          <TableCell>RM {soa.totalAmount.toLocaleString()}</TableCell>
                          <TableCell>RM {soa.outstanding.toLocaleString()}</TableCell>
                          <TableCell>{soa.date}</TableCell>
                          <TableCell>
                            <Button variant="outline" size="sm" onClick={() => handleDownload("pdf", "soa")}>
                              <Download className="mr-1 h-3 w-3" />
                              Download
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          )}

          {/* CN Report Section */}
          {activeTab === 'cn-report' && (
            <Card className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm shadow-xl border border-sky-100 dark:border-gray-700">
              <CardHeader className="border-b border-gray-200 dark:border-gray-700">
                <div className="flex items-center gap-3">
                  <div className="p-3 bg-gradient-to-br from-sky-500 to-sky-600 rounded-xl shadow-lg">
                    <RefreshCw className="h-6 w-6 text-white" />
                  </div>
                  <CardTitle className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                    Credit Note Report
                  </CardTitle>
                </div>
              </CardHeader>
              <CardContent className="p-6">
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>CN ID</TableHead>
                        <TableHead>Invoice</TableHead>
                        <TableHead>Amount</TableHead>
                        <TableHead>Reason</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead>Action</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {cnReportData.map((cn) => (
                        <TableRow key={cn.id}>
                          <TableCell className="font-medium">{cn.id}</TableCell>
                          <TableCell>{cn.invoice}</TableCell>
                          <TableCell>RM {cn.amount.toLocaleString()}</TableCell>
                          <TableCell>{cn.reason}</TableCell>
                          <TableCell>{getStatusBadge(cn.status)}</TableCell>
                          <TableCell>{cn.date}</TableCell>
                          <TableCell>
                            <Button variant="outline" size="sm" onClick={() => handleDownload("pdf", "credit-note")}>
                              <Download className="mr-1 h-3 w-3" />
                              Download
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          )}

          {/* DN Report Section */}
          {activeTab === 'dn-report' && (
            <Card className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm shadow-xl border border-sky-100 dark:border-gray-700">
              <CardHeader className="border-b border-gray-200 dark:border-gray-700">
                <div className="flex items-center gap-3">
                  <div className="p-3 bg-gradient-to-br from-sky-500 to-sky-600 rounded-xl shadow-lg">
                    <CreditCard className="h-6 w-6 text-white" />
                  </div>
                  <CardTitle className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                    Debit Note Report
                  </CardTitle>
                </div>
              </CardHeader>
              <CardContent className="p-6">
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>DN ID</TableHead>
                        <TableHead>Invoice</TableHead>
                        <TableHead>Amount</TableHead>
                        <TableHead>Reason</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead>Action</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {dnReportData.map((dn) => (
                        <TableRow key={dn.id}>
                          <TableCell className="font-medium">{dn.id}</TableCell>
                          <TableCell>{dn.invoice}</TableCell>
                          <TableCell>RM {dn.amount.toLocaleString()}</TableCell>
                          <TableCell>{dn.reason}</TableCell>
                          <TableCell>{getStatusBadge(dn.status)}</TableCell>
                          <TableCell>{dn.date}</TableCell>
                          <TableCell>
                            <Button variant="outline" size="sm" onClick={() => handleDownload("pdf", "debit-note")}>
                              <Download className="mr-1 h-3 w-3" />
                              Download
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          )}

          {/* CLA Statement Section */}
          {activeTab === 'cla-statement' && (
            <Card className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm shadow-xl border border-sky-100 dark:border-gray-700">
              <CardHeader className="border-b border-gray-200 dark:border-gray-700">
                <div className="flex items-center gap-3">
                  <div className="p-3 bg-gradient-to-br from-sky-500 to-sky-600 rounded-xl shadow-lg">
                    <Wallet className="h-6 w-6 text-white" />
                  </div>
                  <CardTitle className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                    CLA Statement
                  </CardTitle>
                </div>
              </CardHeader>
              <CardContent className="p-6">
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Date</TableHead>
                        <TableHead>Type</TableHead>
                        <TableHead>Description</TableHead>
                        <TableHead>Debit (RM)</TableHead>
                        <TableHead>Credit (RM)</TableHead>
                        <TableHead>Balance (RM)</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {claStatements.map((statement, index) => (
                        <TableRow key={index}>
                          <TableCell>{statement.date}</TableCell>
                          <TableCell>
                            <Badge variant={statement.type === "Reload" ? "default" : "secondary"}>
                              {statement.type}
                            </Badge>
                          </TableCell>
                          <TableCell>{statement.description}</TableCell>
                          <TableCell className="text-red-600">
                            {statement.debit > 0 ? statement.debit.toLocaleString() : "-"}
                          </TableCell>
                          <TableCell className="text-green-600">
                            {statement.credit > 0 ? statement.credit.toLocaleString() : "-"}
                          </TableCell>
                          <TableCell className="font-medium">
                            {statement.balance.toLocaleString()}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}
