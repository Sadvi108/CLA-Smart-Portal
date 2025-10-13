"use client"

import { useMemo, useState } from "react"
import Link from "next/link"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { invoices } from "@/lib/mock-data"
import { 
  CreditCard, 
  Banknote, 
  UploadCloud, 
  ArrowRight, 
  CheckCircle2, 
  Shield, 
  Lock, 
  Clock,
  FileText,
  Building2,
  Smartphone,
  Star,
  TrendingUp,
  ArrowLeft,
  Check,
  Calculator,
  Zap
} from "lucide-react"

export default function PaymentCheckoutPage() {
  // Select outstanding/overdue invoices to pay
  const outstandingInvoices = useMemo(
    () => invoices.filter((inv) => inv.status === "Outstanding" || inv.status === "Overdue"),
    []
  )

  const [selectedIds, setSelectedIds] = useState<string[]>([])
  const [tab, setTab] = useState<string>("IBG")
  const [paymentMode, setPaymentMode] = useState<string>("IBG")
  const [payer, setPayer] = useState("")
  const [bank, setBank] = useState("")
  const [referenceNo, setReferenceNo] = useState("")
  const [paidTo, setPaidTo] = useState("CLA Logistics")
  const [amount, setAmount] = useState<string>("")
  const [remarks, setRemarks] = useState("")
  const [slipFileName, setSlipFileName] = useState<string>("")

  const totalSelected = useMemo(() => {
    const total = outstandingInvoices
      .filter((inv) => selectedIds.includes(inv.invoice_id))
      .reduce((sum, inv) => sum + inv.amount, 0)
    return total
  }, [selectedIds, outstandingInvoices])

  const handleToggleInvoice = (id: string) => {
    setSelectedIds((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]))
  }

  const handleUploadSlip = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    setSlipFileName(file ? file.name : "")
  }

  const handleSubmitIBG = () => {
    // Basic client-side validation
    if (selectedIds.length === 0) {
      alert("Please select at least one invoice to pay.")
      return
    }
    if (!amount) {
      alert("Please enter payment amount in RM.")
      return
    }
    alert(
      `Bank transfer submitted for ${selectedIds.length} invoice(s).\nAmount: RM ${Number(amount).toLocaleString()}\nReference: ${referenceNo || "-"}`
    )
  }

  const handleProceedFPX = () => {
    if (selectedIds.length === 0) {
      alert("Please select at least one invoice to pay via FPX.")
      return
    }
    alert("Redirecting to FPX payment gateway (mock).")
  }

  const MalaysianBanks = [
    "Maybank",
    "CIMB",
    "Public Bank",
    "RHB",
    "Hong Leong",
    "Bank Islam",
    "AmBank",
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/20 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {/* Premium Header */}
      <div className="bg-white/80 backdrop-blur-sm border-b border-gray-200/50 dark:bg-gray-900/80 dark:border-gray-700/50 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <Link 
                href="/payments" 
                className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100 transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                <span className="text-sm font-medium">Back to Payments</span>
              </Link>
              <div className="h-6 w-px bg-gray-300 dark:bg-gray-600" />
              <div className="flex items-center space-x-2">
                <Building2 className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                <span className="font-semibold text-gray-900 dark:text-gray-100">CLA Logistics</span>
              </div>
            </div>
            
            {/* Security Indicators */}
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2 text-green-600 dark:text-green-400">
                <Shield className="w-4 h-4" />
                <span className="text-xs font-medium">SSL Secured</span>
              </div>
              <div className="flex items-center space-x-2 text-blue-600 dark:text-blue-400">
                <Lock className="w-4 h-4" />
                <span className="text-xs font-medium">Bank Grade Security</span>
              </div>
            </div>
          </div>
          
          {/* Progress Indicator */}
          <div className="pb-4">
            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center space-x-2 text-blue-600 dark:text-blue-400">
                <div className="w-6 h-6 rounded-full bg-blue-600 text-white flex items-center justify-center text-xs font-medium">1</div>
                <span className="font-medium">Select Invoices</span>
              </div>
              <div className="flex-1 h-px bg-gray-200 dark:bg-gray-700 mx-4" />
              <div className="flex items-center space-x-2 text-gray-400 dark:text-gray-500">
                <div className="w-6 h-6 rounded-full border-2 border-gray-300 dark:border-gray-600 flex items-center justify-center text-xs font-medium">2</div>
                <span>Payment Method</span>
              </div>
              <div className="flex-1 h-px bg-gray-200 dark:bg-gray-700 mx-4" />
              <div className="flex items-center space-x-2 text-gray-400 dark:text-gray-500">
                <div className="w-6 h-6 rounded-full border-2 border-gray-300 dark:border-gray-600 flex items-center justify-center text-xs font-medium">3</div>
                <span>Confirmation</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Hero Section */}
            <div className="text-center space-y-4">
              <div className="inline-flex items-center space-x-2 bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 px-4 py-2 rounded-full text-sm font-medium">
                <Star className="w-4 h-4" />
                <span>Premium Payment Experience</span>
              </div>
              <h1 className="text-4xl font-bold text-gray-900 dark:text-gray-100">
                Secure Payment Portal
              </h1>
              <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                Complete your payment with Malaysia's most trusted logistics payment system. 
                Fast, secure, and reliable.
              </p>
            </div>

            {/* Enhanced Invoice Selection */}
            <Card className="p-8 shadow-xl border-0 bg-white/70 backdrop-blur-sm dark:bg-gray-800/70 dark:border-gray-700/50">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-lg bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
                    <FileText className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                  </div>
                  <div>
                    <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">Outstanding Invoices</h2>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Select invoices to include in this payment</p>
                  </div>
                </div>
                <Badge variant="outline" className="bg-orange-50 border-orange-200 text-orange-700 dark:bg-orange-900/20 dark:border-orange-700 dark:text-orange-300">
                  {outstandingInvoices.length} Outstanding
                </Badge>
              </div>

              <div className="space-y-4">
                {outstandingInvoices.map((inv, index) => (
                  <div 
                    key={inv.invoice_id} 
                    className={`group relative rounded-xl border-2 transition-all duration-200 hover:shadow-lg ${
                      selectedIds.includes(inv.invoice_id)
                        ? 'border-blue-200 bg-blue-50/50 dark:border-blue-700 dark:bg-blue-900/20'
                        : 'border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-800/50 hover:border-gray-300 dark:hover:border-gray-600'
                    }`}
                  >
                    <div className="p-6">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          <Checkbox
                            checked={selectedIds.includes(inv.invoice_id)}
                            onCheckedChange={() => handleToggleInvoice(inv.invoice_id)}
                            id={`chk-${inv.invoice_id}`}
                            className="w-5 h-5"
                          />
                          <div className="space-y-1">
                            <div className="flex items-center space-x-3">
                              <Label 
                                htmlFor={`chk-${inv.invoice_id}`} 
                                className="text-lg font-semibold text-gray-900 dark:text-gray-100 cursor-pointer"
                              >
                                {inv.invoice_id}
                              </Label>
                              <Badge 
                                variant="outline" 
                                className={
                                  inv.status === "Overdue" 
                                    ? "border-red-200 bg-red-50 text-red-700 dark:border-red-700 dark:bg-red-900/20 dark:text-red-300"
                                    : "border-yellow-200 bg-yellow-50 text-yellow-700 dark:border-yellow-700 dark:bg-yellow-900/20 dark:text-yellow-300"
                                }
                              >
                                {inv.status}
                              </Badge>
                            </div>
                            <p className="text-gray-600 dark:text-gray-400 font-medium">{inv.customer}</p>
                            <div className="flex items-center space-x-4 text-sm text-gray-500 dark:text-gray-400">
                              <span>{inv.type}</span>
                              <span>•</span>
                              <span className="flex items-center space-x-1">
                                <Clock className="w-3 h-3" />
                                <span>Due: {inv.date}</span>
                              </span>
                            </div>
                          </div>
                        </div>
                        <div className="text-right space-y-2">
                          <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                            RM {inv.amount.toLocaleString()}
                          </p>
                          <Badge
                            variant="outline"
                            className={
                              inv.method === "FPX"
                                ? "border-blue-200 bg-blue-50 text-blue-700 dark:border-blue-700 dark:bg-blue-900/20 dark:text-blue-300"
                                : inv.method === "IBG"
                                ? "border-purple-200 bg-purple-50 text-purple-700 dark:border-purple-700 dark:bg-purple-900/20 dark:text-purple-300"
                                : "border-green-200 bg-green-50 text-green-700 dark:border-green-700 dark:bg-green-900/20 dark:text-green-300"
                            }
                          >
                            {inv.method}
                          </Badge>
                        </div>
                      </div>
                    </div>
                    {selectedIds.includes(inv.invoice_id) && (
                      <div className="absolute top-4 right-4">
                        <div className="w-6 h-6 rounded-full bg-blue-600 text-white flex items-center justify-center">
                          <Check className="w-3 h-3" />
                        </div>
                      </div>
                    )}
                  </div>
                ))}
                
                {outstandingInvoices.length === 0 && (
                  <div className="text-center py-12">
                    <CheckCircle2 className="w-16 h-16 text-green-500 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">All Caught Up!</h3>
                    <p className="text-gray-500 dark:text-gray-400">No outstanding invoices at this time.</p>
                  </div>
                )}
              </div>
            </Card>

            {/* Premium Payment Methods */}
            <Card className="p-8 shadow-xl border-0 bg-white/70 backdrop-blur-sm dark:bg-gray-800/70 dark:border-gray-700/50">
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-10 h-10 rounded-lg bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
                  <CreditCard className="w-5 h-5 text-green-600 dark:text-green-400" />
                </div>
                <div>
                  <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">Payment Methods</h2>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Choose your preferred payment option</p>
                </div>
              </div>

              <Tabs value={tab} onValueChange={setTab} className="w-full">
                <TabsList className="grid grid-cols-3 w-full h-14 bg-gray-100 dark:bg-gray-800 p-1 rounded-xl">
                  <TabsTrigger value="IBG" className="flex items-center gap-2 h-12 rounded-lg data-[state=active]:bg-white data-[state=active]:shadow-sm dark:data-[state=active]:bg-gray-700">
                    <Banknote className="w-4 h-4" /> 
                    <div className="text-left">
                      <div className="font-medium">Bank Transfer</div>
                      <div className="text-xs text-gray-500">IBG • Instant</div>
                    </div>
                  </TabsTrigger>
                  <TabsTrigger value="FPX" className="flex items-center gap-2 h-12 rounded-lg data-[state=active]:bg-white data-[state=active]:shadow-sm dark:data-[state=active]:bg-gray-700">
                    <Zap className="w-4 h-4" /> 
                    <div className="text-left">
                      <div className="font-medium">FPX</div>
                      <div className="text-xs text-gray-500">Online Banking</div>
                    </div>
                  </TabsTrigger>
                  <TabsTrigger value="Others" className="flex items-center gap-2 h-12 rounded-lg data-[state=active]:bg-white data-[state=active]:shadow-sm dark:data-[state=active]:bg-gray-700">
                    <Calculator className="w-4 h-4" />
                    <div className="text-left">
                      <div className="font-medium">Others</div>
                      <div className="text-xs text-gray-500">Contra • Balance</div>
                    </div>
                  </TabsTrigger>
                </TabsList>

                {/* IBG Form */}
                <TabsContent value="IBG" className="mt-6 space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label className="text-sm font-medium">Payment Mode</Label>
                        <Select value={paymentMode} onValueChange={setPaymentMode}>
                          <SelectTrigger className="h-12">
                            <SelectValue placeholder="Select payment mode" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="IBG">IBG (Interbank GIRO)</SelectItem>
                            <SelectItem value="DuitNow">Instant Transfer (DuitNow)</SelectItem>
                            <SelectItem value="CashDeposit">Cash Deposit</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label className="text-sm font-medium">Payer Name</Label>
                        <Input 
                          placeholder="Company or individual name" 
                          value={payer} 
                          onChange={(e) => setPayer(e.target.value)}
                          className="h-12"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label className="text-sm font-medium">Bank</Label>
                        <Select value={bank} onValueChange={setBank}>
                          <SelectTrigger className="h-12">
                            <SelectValue placeholder="Select your bank" />
                          </SelectTrigger>
                          <SelectContent>
                            {MalaysianBanks.map((b) => (
                              <SelectItem key={b} value={b}>{b}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label className="text-sm font-medium">Reference Number</Label>
                        <Input 
                          placeholder="e.g. IBG123456" 
                          value={referenceNo} 
                          onChange={(e) => setReferenceNo(e.target.value)}
                          className="h-12"
                        />
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label className="text-sm font-medium">Paid To</Label>
                        <Select value={paidTo} onValueChange={setPaidTo}>
                          <SelectTrigger className="h-12">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="CLA Logistics">CLA Logistics</SelectItem>
                            <SelectItem value="Depot Partner">Depot Partner</SelectItem>
                            <SelectItem value="Terminal Operator">Terminal Operator</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label className="text-sm font-medium">Upload Bank Slip</Label>
                        <div className="relative">
                          <Input 
                            type="file" 
                            accept="image/*,.pdf" 
                            onChange={handleUploadSlip}
                            className="h-12"
                          />
                          {slipFileName && (
                            <Badge variant="outline" className="absolute top-3 right-3 bg-green-50 border-green-200 text-green-700">
                              {slipFileName}
                            </Badge>
                          )}
                        </div>
                        <p className="text-xs text-gray-500 dark:text-gray-400">Accepted: JPG, PNG, PDF (Max 5MB)</p>
                      </div>

                      <div className="space-y-2">
                        <Label className="text-sm font-medium">Remarks (Optional)</Label>
                        <Textarea 
                          placeholder="Additional notes or instructions" 
                          value={remarks} 
                          onChange={(e) => setRemarks(e.target.value)}
                          className="min-h-[80px]"
                        />
                      </div>
                    </div>
                  </div>

                  <Separator className="my-6" />
                  <div className="flex justify-end">
                    <Button onClick={handleSubmitIBG} size="lg" className="bg-blue-600 hover:bg-blue-700 h-12 px-8">
                      <CheckCircle2 className="w-4 h-4 mr-2" /> 
                      Submit Bank Transfer
                    </Button>
                  </div>
                </TabsContent>

                {/* FPX */}
                <TabsContent value="FPX" className="mt-6 space-y-6">
                  <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4 border border-blue-200 dark:border-blue-800">
                    <div className="flex items-center space-x-2 text-blue-700 dark:text-blue-300 mb-2">
                      <Zap className="w-4 h-4" />
                      <span className="font-medium">Instant Payment</span>
                    </div>
                    <p className="text-sm text-blue-600 dark:text-blue-400">
                      Pay securely via FPX with participating Malaysian banks. You will be redirected to your bank's secure gateway.
                    </p>
                  </div>
                  
                  <div>
                    <Label className="text-sm font-medium mb-3 block">Select Your Bank</Label>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                      {MalaysianBanks.map((b) => (
                        <div key={b} className="rounded-lg border-2 border-gray-200 dark:border-gray-700 p-4 text-center hover:border-blue-300 dark:hover:border-blue-600 cursor-pointer transition-colors">
                          <div className="font-medium text-gray-900 dark:text-gray-100">{b}</div>
                          <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">Online Banking</div>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div className="flex justify-end">
                    <Button onClick={handleProceedFPX} size="lg" className="bg-blue-600 hover:bg-blue-700 h-12 px-8">
                      Proceed with FPX 
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </div>
                </TabsContent>

                {/* Others */}
                <TabsContent value="Others" className="mt-6 space-y-6">
                  <div className="bg-gray-50 dark:bg-gray-800/50 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      Alternative settlement options for existing account holders.
                    </p>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label className="text-sm font-medium">Settlement Type</Label>
                      <Select defaultValue="Contra">
                        <SelectTrigger className="h-12">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Contra">Contra Settlement</SelectItem>
                          <SelectItem value="CashBalance">Use Cash Balance</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label className="text-sm font-medium">Amount (RM)</Label>
                      <Input type="number" placeholder="0.00" className="h-12" />
                    </div>
                  </div>
                  
                  <div className="flex justify-end">
                    <Button size="lg" className="bg-blue-600 hover:bg-blue-700 h-12 px-8">
                      <CheckCircle2 className="w-4 h-4 mr-2" /> 
                      Submit Settlement
                    </Button>
                  </div>
                </TabsContent>
              </Tabs>
            </Card>
          </div>

          {/* Premium Payment Summary Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 space-y-6">
              {/* Payment Summary */}
              <Card className="p-6 shadow-xl border-0 bg-white/70 backdrop-blur-sm dark:bg-gray-800/70 dark:border-gray-700/50">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-8 h-8 rounded-lg bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center">
                    <Calculator className="w-4 h-4 text-purple-600 dark:text-purple-400" />
                  </div>
                  <h3 className="font-semibold text-gray-900 dark:text-gray-100">Payment Summary</h3>
                </div>
                
                <div className="space-y-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600 dark:text-gray-400">Selected Invoices</span>
                    <span className="font-medium">{selectedIds.length}</span>
                  </div>
                  
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600 dark:text-gray-400">Total Amount</span>
                    <span className="font-medium">RM {totalSelected.toLocaleString()}</span>
                  </div>
                  
                  <Separator />
                  
                  <div className="space-y-2">
                    <Label className="text-sm font-medium">Payment Amount (RM)</Label>
                    <Input
                      type="number"
                      placeholder="0.00"
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                      className="h-12 text-lg font-semibold"
                    />
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      You may pay the full amount or make a partial payment.
                    </p>
                  </div>
                  
                  <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-3 border border-blue-200 dark:border-blue-800">
                    <div className="flex items-center space-x-2 text-blue-700 dark:text-blue-300 text-sm">
                      <TrendingUp className="w-4 h-4" />
                      <span className="font-medium">Quick Pay Suggestion</span>
                    </div>
                    <p className="text-xs text-blue-600 dark:text-blue-400 mt-1">
                      Pay RM {totalSelected.toLocaleString()} to clear all selected invoices
                    </p>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="mt-2 w-full border-blue-200 text-blue-700 hover:bg-blue-100 dark:border-blue-700 dark:text-blue-300"
                      onClick={() => setAmount(totalSelected.toString())}
                    >
                      Use Full Amount
                    </Button>
                  </div>
                </div>
              </Card>

              {/* Security & Trust */}
              <Card className="p-6 shadow-xl border-0 bg-white/70 backdrop-blur-sm dark:bg-gray-800/70 dark:border-gray-700/50">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-8 h-8 rounded-lg bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
                    <Shield className="w-4 h-4 text-green-600 dark:text-green-400" />
                  </div>
                  <h3 className="font-semibold text-gray-900 dark:text-gray-100">Security & Trust</h3>
                </div>
                
                <div className="space-y-3">
                  <div className="flex items-center space-x-2 text-sm">
                    <CheckCircle2 className="w-4 h-4 text-green-500" />
                    <span className="text-gray-600 dark:text-gray-400">256-bit SSL Encryption</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm">
                    <CheckCircle2 className="w-4 h-4 text-green-500" />
                    <span className="text-gray-600 dark:text-gray-400">PCI DSS Compliant</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm">
                    <CheckCircle2 className="w-4 h-4 text-green-500" />
                    <span className="text-gray-600 dark:text-gray-400">Bank Grade Security</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm">
                    <CheckCircle2 className="w-4 h-4 text-green-500" />
                    <span className="text-gray-600 dark:text-gray-400">Real-time Notifications</span>
                  </div>
                </div>
              </Card>

              {/* Support */}
              <Card className="p-6 shadow-xl border-0 bg-white/70 backdrop-blur-sm dark:bg-gray-800/70 dark:border-gray-700/50">
                <div className="text-center space-y-3">
                  <Smartphone className="w-8 h-8 text-blue-600 dark:text-blue-400 mx-auto" />
                  <h3 className="font-semibold text-gray-900 dark:text-gray-100">Need Help?</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Our payment support team is available 24/7 to assist you.
                  </p>
                  <Button variant="outline" size="sm" className="w-full">
                    Contact Support
                  </Button>
                </div>
              </Card>
            </div>
          </div>
        </div>

        {/* Footer Notice */}
        <div className="mt-12 text-center">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Upon successful submission, a confirmation email will be sent to your registered email address.
            All transactions are processed securely and monitored for fraud protection.
          </p>
        </div>
      </div>
    </div>
  )
}