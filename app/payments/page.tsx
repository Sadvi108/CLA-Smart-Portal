"use client"

import Link from "next/link"
import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { CreditCard, Building2, Wallet, Plus, Search, Download, CheckCircle2, Clock, XCircle } from "lucide-react"
import { payments, invoices } from "@/lib/mock-data"

export default function PaymentsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [filterMethod, setFilterMethod] = useState<string>("all")
  // Navigation to checkout page on Make Payment

  // Filter payments
  const filteredPayments = payments.filter((payment) => {
    const matchesSearch =
      payment.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
      payment.payment_id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      payment.invoice_id.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesMethod = filterMethod === "all" || payment.method === filterMethod
    return matchesSearch && matchesMethod
  })

  // Get outstanding invoices for payment
  const outstandingInvoices = invoices.filter((inv) => inv.status === "Outstanding" || inv.status === "Overdue")

  // Calculate stats
  const totalPaid = payments.reduce((sum, payment) => sum + payment.amount, 0)
  const paymentsThisMonth = typeof window !== 'undefined' ? payments.filter((p) => {
    const paymentDate = new Date(p.date)
    const now = new Date()
    return paymentDate.getMonth() === now.getMonth() && paymentDate.getFullYear() === now.getFullYear()
  }).length : 0

  // Removed dialog-based payment in favour of dedicated checkout page

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Payments</h1>
          <p className="text-gray-500 dark:text-gray-400 mt-1">Manage and track all your payments</p>
        </div>
        <Link href="/payments/checkout">
          <Button className="bg-blue-600 hover:bg-blue-700">
            <Plus className="w-4 h-4 mr-2" />
            Make Payment
          </Button>
        </Link>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <Card className="p-6 bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 border-blue-200 dark:border-blue-700 hover:shadow-lg transition-all duration-300">
          <div className="flex items-center justify-between">
            <div className="space-y-2">
              <p className="text-sm font-medium text-blue-700 dark:text-blue-300">Total Paid</p>
              <p className="text-2xl font-bold text-blue-900 dark:text-blue-100">RM {totalPaid.toLocaleString()}</p>
            </div>
            <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center">
              <CreditCard className="w-6 h-6 text-white" />
            </div>
          </div>
        </Card>

        <Card className="p-6 bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 border-green-200 dark:border-green-700 hover:shadow-lg transition-all duration-300">
          <div className="flex items-center justify-between">
            <div className="space-y-2">
              <p className="text-sm font-medium text-green-700 dark:text-green-300">This Month</p>
              <p className="text-2xl font-bold text-green-900 dark:text-green-100">{paymentsThisMonth}</p>
            </div>
            <div className="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center">
              <CheckCircle2 className="w-6 h-6 text-white" />
            </div>
          </div>
        </Card>

        <Card className="p-6 bg-gradient-to-br from-orange-50 to-orange-100 dark:from-orange-900/20 dark:to-orange-800/20 border-orange-200 dark:border-orange-700 hover:shadow-lg transition-all duration-300">
          <div className="flex items-center justify-between">
            <div className="space-y-2">
              <p className="text-sm font-medium text-orange-700 dark:text-orange-300">Pending</p>
              <p className="text-2xl font-bold text-orange-900 dark:text-orange-100">{outstandingInvoices.length}</p>
            </div>
            <div className="w-12 h-12 bg-orange-600 rounded-full flex items-center justify-center">
              <Clock className="w-6 h-6 text-white" />
            </div>
          </div>
        </Card>

        <Card className="p-6 bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20 border-purple-200 dark:border-purple-700 hover:shadow-lg transition-all duration-300">
          <div className="flex items-center justify-between">
            <div className="space-y-2">
              <p className="text-sm font-medium text-purple-700 dark:text-purple-300">Contra</p>
              <p className="text-xs text-purple-600 dark:text-purple-400">Account Offset</p>
            </div>
            <div className="w-12 h-12 bg-purple-600 rounded-full flex items-center justify-center">
              <Wallet className="w-6 h-6 text-white" />
            </div>
          </div>
        </Card>
      </div>

      {/* Payment History */}
      <Card className="p-4 sm:p-6 dark:bg-gray-800 dark:border-gray-700">
        <div className="flex flex-col gap-4 mb-6 md:flex-row md:items-center md:justify-between">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">Payment History</h2>
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <div className="relative flex-1 sm:w-64">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 dark:text-gray-500" />
              <Input
                placeholder="Search payments..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 h-10 sm:h-auto"
              />
            </div>
            <div className="flex gap-2 sm:gap-3">
              <Select value={filterMethod} onValueChange={setFilterMethod}>
                <SelectTrigger className="w-full sm:w-40">
                  <SelectValue placeholder="Method" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Methods</SelectItem>
                  <SelectItem value="FPX">FPX</SelectItem>
                  <SelectItem value="IBG">IBG</SelectItem>
                  <SelectItem value="Contra">Contra</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="outline" className="gap-2 bg-transparent whitespace-nowrap">
                <Download className="w-4 h-4" />
                <span className="hidden sm:inline">Export</span>
              </Button>
            </div>
          </div>
        </div>

        {/* Mobile Card View */}
        <div className="block sm:hidden space-y-4">
          {filteredPayments.map((payment) => (
            <Card key={payment.payment_id} className="p-4 border border-gray-200 dark:border-gray-600 dark:bg-gray-700">
              <div className="space-y-3">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="font-medium text-gray-900 dark:text-gray-100 text-sm">{payment.payment_id}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">{payment.invoice_id}</p>
                  </div>
                  <Badge
                    variant="outline"
                    className={`text-xs ${
                      payment.method === "FPX"
                        ? "border-blue-200 bg-blue-50 text-blue-700 dark:border-blue-700 dark:bg-blue-900/20 dark:text-blue-300"
                        : payment.method === "IBG"
                          ? "border-purple-200 bg-purple-50 text-purple-700 dark:border-purple-700 dark:bg-purple-900/20 dark:text-purple-300"
                          : "border-green-200 bg-green-50 text-green-700 dark:border-green-700 dark:bg-green-900/20 dark:text-green-300"
                    }`}
                  >
                    {payment.method}
                  </Badge>
                </div>
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-300">{payment.customer}</p>
                    <p className="text-xs text-gray-400 dark:text-gray-500">{new Date(payment.date).toLocaleDateString()}</p>
                  </div>
                  <p className="font-semibold text-gray-900 dark:text-gray-100">RM {payment.amount.toLocaleString()}</p>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Desktop Table View */}
        <div className="hidden sm:block">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="dark:text-gray-300">Payment ID</TableHead>
                <TableHead className="dark:text-gray-300">Invoice ID</TableHead>
                <TableHead className="dark:text-gray-300">Customer</TableHead>
                <TableHead className="dark:text-gray-300">Amount</TableHead>
                <TableHead className="dark:text-gray-300">Method</TableHead>
                <TableHead className="dark:text-gray-300">Date</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredPayments.map((payment) => (
                <TableRow key={payment.payment_id} className="dark:border-gray-700">
                  <TableCell className="font-medium dark:text-gray-100">{payment.payment_id}</TableCell>
                  <TableCell className="dark:text-gray-300">{payment.invoice_id}</TableCell>
                  <TableCell className="dark:text-gray-300">{payment.customer}</TableCell>
                  <TableCell className="font-semibold dark:text-gray-100">RM {payment.amount.toLocaleString()}</TableCell>
                  <TableCell>
                    <Badge
                      variant="outline"
                      className={`${
                        payment.method === "FPX"
                          ? "border-blue-200 bg-blue-50 text-blue-700 dark:border-blue-700 dark:bg-blue-900/20 dark:text-blue-300"
                          : payment.method === "IBG"
                            ? "border-purple-200 bg-purple-50 text-purple-700 dark:border-purple-700 dark:bg-purple-900/20 dark:text-purple-300"
                            : "border-green-200 bg-green-50 text-green-700 dark:border-green-700 dark:bg-green-900/20 dark:text-green-300"
                      }`}
                    >
                      {payment.method}
                    </Badge>
                  </TableCell>
                  <TableCell className="dark:text-gray-300">{new Date(payment.date).toLocaleDateString()}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          {filteredPayments.length === 0 && (
            <div className="text-center py-8">
              <p className="text-gray-500 dark:text-gray-400">No payments found matching your criteria.</p>
            </div>
          )}
        </div>

        {filteredPayments.length === 0 && (
          <div className="text-center py-12">
            <XCircle className="w-12 h-12 text-gray-400 mx-auto mb-3" />
            <p className="text-gray-500">No payments found</p>
          </div>
        )}
      </Card>
    </div>
  )
}
