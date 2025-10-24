"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { FileText, Download, Calendar, TrendingUp, DollarSign, FileSpreadsheet } from "lucide-react"

export default function ReportsPage() {
  const [selectedReport, setSelectedReport] = useState("monthly")
  const [selectedPeriod, setSelectedPeriod] = useState("this-month")

  const reports = [
    { id: "monthly", name: "Monthly Summary", icon: Calendar, description: "Monthly financial summary" },
    { id: "revenue", name: "Revenue Report", icon: DollarSign, description: "Detailed revenue breakdown" },
    { id: "invoices", name: "Invoice Report", icon: FileText, description: "All invoices and their status" },
    { id: "payments", name: "Payment Report", icon: TrendingUp, description: "Payment history and trends" },
    { id: "custom", name: "Custom Report", icon: FileSpreadsheet, description: "Create custom reports" },
  ]

  const handleGenerateReport = () => {
    alert(`Generating ${reports.find(r => r.id === selectedReport)?.name} for ${selectedPeriod}`)
  }

  return (
    <div className="space-y-6 bg-white min-h-screen -m-4 lg:-m-8 p-4 lg:p-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Reports</h1>
        <p className="text-gray-500 mt-1">Generate and download detailed reports</p>
      </div>

      {/* Report Types */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {reports.map((report) => {
          const Icon = report.icon
          return (
            <Card
              key={report.id}
              className={`p-6 cursor-pointer transition-all border border-gray-200 ${
                selectedReport === report.id ? "shadow-lg" : "hover:shadow-md"
              }`}
              style={selectedReport === report.id ? { borderColor: '#0096FF', backgroundColor: '#EFF6FF' } : {}}
              onClick={() => setSelectedReport(report.id)}
            >
              <div className="flex items-start gap-4">
                <div className={`p-3 rounded-lg ${selectedReport === report.id ? "bg-blue-100" : "bg-gray-100"}`}>
                  <Icon className="w-6 h-6" style={selectedReport === report.id ? { color: '#0096FF' } : { color: '#6B7280' }} />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900">{report.name}</h3>
                  <p className="text-sm text-gray-500 mt-1">{report.description}</p>
                </div>
              </div>
            </Card>
          )
        })}
      </div>

      {/* Report Configuration */}
      <Card className="p-6 bg-white border border-gray-200">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Report Configuration</h2>
        <div className="space-y-4">
          <div>
            <label className="text-sm font-medium text-gray-700 mb-2 block">Period</label>
            <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
              <SelectTrigger className="bg-white border-gray-300">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="this-month">This Month</SelectItem>
                <SelectItem value="last-month">Last Month</SelectItem>
                <SelectItem value="this-quarter">This Quarter</SelectItem>
                <SelectItem value="last-quarter">Last Quarter</SelectItem>
                <SelectItem value="this-year">This Year</SelectItem>
                <SelectItem value="last-year">Last Year</SelectItem>
                <SelectItem value="custom">Custom Range</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex gap-3">
            <Button onClick={handleGenerateReport} className="flex-1" style={{ backgroundColor: '#0096FF' }}>
              <FileText className="w-4 h-4 mr-2" />
              Generate Report
            </Button>
            <Button variant="outline" className="border-gray-300">
              <Download className="w-4 h-4 mr-2" />
              Download
            </Button>
          </div>
        </div>
      </Card>

      {/* Recent Reports */}
      <Card className="p-6 bg-white border border-gray-200">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Recent Reports</h2>
        <div className="space-y-3">
          {[1, 2, 3].map((i) => (
            <div key={i} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50">
              <div className="flex items-center gap-3">
                <FileText className="w-5 h-5" style={{ color: '#0096FF' }} />
                <div>
                  <p className="font-medium text-gray-900">Monthly Report - October 2025</p>
                  <p className="text-sm text-gray-500">Generated on Oct {20 + i}, 2025</p>
                </div>
              </div>
              <Button variant="outline" size="sm" className="border-gray-300">
                <Download className="w-4 h-4" />
              </Button>
            </div>
          ))}
        </div>
      </Card>
    </div>
  )
}
