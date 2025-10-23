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
  
  // Form validation states
  const [errors, setErrors] = useState<{[key: string]: string}>({})
  const [touched, setTouched] = useState<{[key: string]: boolean}>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitSuccess, setSubmitSuccess] = useState(false)
  
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

  // Validation functions
  const validateField = (field: string, value: string) => {
    switch (field) {
      case 'payer':
        return value.trim().length < 2 ? 'Payer name must be at least 2 characters' : ''
      case 'bank':
        return !value ? 'Please select a bank' : ''
      case 'referenceNo':
        return value.trim().length < 3 ? 'Reference number must be at least 3 characters' : ''
      case 'amount':
        const numAmount = parseFloat(value)
        if (!value) return 'Amount is required'
        if (isNaN(numAmount) || numAmount <= 0) return 'Please enter a valid amount'
        if (numAmount > totalSelected) return 'Amount cannot exceed total selected'
        return ''
      default:
        return ''
    }
  }

  const handleFieldChange = (field: string, value: string) => {
    // Update the field value
    switch (field) {
      case 'payer':
        setPayer(value)
        break
      case 'bank':
        setBank(value)
        break
      case 'referenceNo':
        setReferenceNo(value)
        break
      case 'amount':
        setAmount(value)
        break
    }

    // Mark field as touched
    setTouched(prev => ({ ...prev, [field]: true }))

    // Validate field
    const error = validateField(field, value)
    setErrors(prev => ({ ...prev, [field]: error }))
  }

  const validateForm = () => {
    const newErrors: {[key: string]: string} = {}
    
    if (selectedIds.length === 0) {
      newErrors.invoices = 'Please select at least one invoice to pay'
    }
    
    newErrors.payer = validateField('payer', payer)
    newErrors.bank = validateField('bank', bank)
    newErrors.referenceNo = validateField('referenceNo', referenceNo)
    newErrors.amount = validateField('amount', amount)

    setErrors(newErrors)
    setTouched({
      invoices: true,
      payer: true,
      bank: true,
      referenceNo: true,
      amount: true
    })

    return Object.values(newErrors).every(error => !error)
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
            <div className="flex items-center space-x-2 sm:space-x-4">
              <Link 
                href="/payments" 
                className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100 transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                <span className="text-sm font-medium hidden sm:inline">Back to Payments</span>
                <span className="text-sm font-medium sm:hidden">Back</span>
              </Link>
              <div className="h-6 w-px bg-gray-300 dark:bg-gray-600" />
              <div className="flex items-center space-x-2">
                <Building2 className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600 dark:text-blue-400" />
                <span className="font-semibold text-sm sm:text-base text-gray-900 dark:text-gray-100">CLA Logistics</span>
              </div>
            </div>
            
            {/* Security Indicators - Mobile Optimized */}
            <div className="flex items-center space-x-2 sm:space-x-4">
              <div className="hidden sm:flex items-center space-x-2 text-green-600 dark:text-green-400">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <Lock className="w-4 h-4" />
                <span className="text-xs font-medium">SSL Secured</span>
              </div>
              <div className="flex items-center space-x-1 sm:space-x-2 px-2 sm:px-3 py-1 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-700 rounded-full">
                <Shield className="w-3 h-3 sm:w-4 sm:h-4 text-green-600 dark:text-green-400" />
                <span className="text-xs font-bold text-green-700 dark:text-green-300">
                  <span className="hidden sm:inline">SECURE PAYMENT</span>
                  <span className="sm:hidden">SECURE</span>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-4 sm:space-y-8">
            {/* Hero Section */}
            <div className="text-center space-y-3 sm:space-y-4">
              <div className="inline-flex items-center space-x-2 bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 px-3 sm:px-4 py-2 rounded-full text-xs sm:text-sm font-medium">
                <Star className="w-3 h-3 sm:w-4 sm:h-4" />
                <span>Premium Payment Experience</span>
              </div>
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 dark:text-gray-100">
                Secure Payment Portal
              </h1>
              <p className="text-sm sm:text-base lg:text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto px-4">
                Complete your payment with Malaysia's most trusted logistics payment system. 
                Fast, secure, and reliable.
              </p>
            </div>

            {/* Enhanced Premium Invoice Selection */}
            <Card className="p-4 sm:p-6 lg:p-8 shadow-2xl border-0 bg-white/80 backdrop-blur-md dark:bg-gray-800/80 dark:border-gray-700/50 rounded-xl sm:rounded-2xl">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 sm:mb-8 space-y-4 sm:space-y-0">
                <div className="flex items-center space-x-3 sm:space-x-4">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center shadow-lg">
                    <FileText className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                  </div>
                  <div>
                    <h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-gray-100">Outstanding Invoices</h2>
                    <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400">Select invoices to include in this payment</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2 sm:space-x-3">
                  <Badge variant="outline" className="bg-gradient-to-r from-orange-50 to-red-50 border-orange-200 text-orange-700 dark:from-orange-900/20 dark:to-red-900/20 dark:border-orange-700 dark:text-orange-300 px-3 sm:px-4 py-1 sm:py-2 text-xs sm:text-sm font-semibold">
                    {outstandingInvoices.length} Outstanding
                  </Badge>
                  <Badge variant="outline" className="bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200 text-blue-700 dark:from-blue-900/20 dark:to-indigo-900/20 dark:border-blue-700 dark:text-blue-300 px-3 sm:px-4 py-1 sm:py-2 text-xs sm:text-sm font-semibold">
                    {selectedIds.length} Selected
                  </Badge>
                </div>
              </div>

              <div className="space-y-4 sm:space-y-6">
                {outstandingInvoices.map((inv, index) => (
                  <div 
                    key={inv.invoice_id} 
                    className={`group relative rounded-2xl border-2 transition-all duration-500 hover:shadow-2xl hover:scale-[1.02] transform cursor-pointer animate-fade-in ${
                      selectedIds.includes(inv.invoice_id)
                        ? 'border-blue-300 bg-gradient-to-br from-blue-50/80 to-indigo-50/60 dark:border-blue-600 dark:from-blue-900/30 dark:to-indigo-900/20 shadow-xl shadow-blue-100/50 dark:shadow-blue-900/20'
                        : 'border-gray-200 bg-gradient-to-br from-white to-gray-50/50 dark:border-gray-700 dark:from-gray-800/60 dark:to-gray-900/40 hover:border-gray-300 dark:hover:border-gray-600 hover:shadow-lg'
                    }`}
                    onClick={() => handleToggleInvoice(inv.invoice_id)}
                    style={{ 
                      animationDelay: `${index * 150}ms`,
                      animationFillMode: 'both'
                    }}
                  >
                    {/* Premium Selection Indicator */}
                    {selectedIds.includes(inv.invoice_id) && (
                      <div className="absolute -top-2 -right-2 z-10 animate-bounce">
                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 text-white flex items-center justify-center shadow-lg animate-pulse">
                          <Check className="w-4 h-4" />
                        </div>
                      </div>
                    )}

                    <div className="p-4 sm:p-6 lg:p-8">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between space-y-4 sm:space-y-0">
                        <div className="flex items-start sm:items-center space-x-4 sm:space-x-6">
                          <div className="relative mt-1 sm:mt-0">
                            <Checkbox
                              checked={selectedIds.includes(inv.invoice_id)}
                              onCheckedChange={() => handleToggleInvoice(inv.invoice_id)}
                              id={`chk-${inv.invoice_id}`}
                              className="w-5 h-5 sm:w-6 sm:h-6 border-2 data-[state=checked]:bg-gradient-to-br data-[state=checked]:from-blue-500 data-[state=checked]:to-blue-600 data-[state=checked]:border-blue-500"
                            />
                          </div>
                          <div className="space-y-2 sm:space-y-3 flex-1">
                            <div className="flex flex-col sm:flex-row sm:items-center space-y-2 sm:space-y-0 sm:space-x-4">
                              <Label 
                                htmlFor={`chk-${inv.invoice_id}`} 
                                className="text-lg sm:text-xl font-bold text-gray-900 dark:text-gray-100 cursor-pointer hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                              >
                                {inv.invoice_id}
                              </Label>
                              <Badge 
                                variant="outline" 
                                className={`px-2 sm:px-3 py-1 text-xs sm:text-sm font-semibold self-start ${
                                  inv.status === "Overdue" 
                                    ? "border-red-300 bg-gradient-to-r from-red-50 to-red-100 text-red-700 dark:border-red-600 dark:from-red-900/30 dark:to-red-800/20 dark:text-red-300"
                                    : "border-yellow-300 bg-gradient-to-r from-yellow-50 to-yellow-100 text-yellow-700 dark:border-yellow-600 dark:from-yellow-900/30 dark:to-yellow-800/20 dark:text-yellow-300"
                                }`}
                              >
                                {inv.status}
                              </Badge>
                            </div>
                            <p className="text-base sm:text-lg font-semibold text-gray-700 dark:text-gray-300">{inv.customer}</p>
                            <div className="flex flex-col sm:flex-row sm:items-center space-y-2 sm:space-y-0 sm:space-x-6 text-xs sm:text-sm text-gray-600 dark:text-gray-400">
                              <div className="flex items-center space-x-2 bg-gray-100 dark:bg-gray-700 px-2 sm:px-3 py-1 rounded-full">
                                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                                <span className="font-medium">{inv.type}</span>
                              </div>
                              <div className="flex items-center space-x-2">
                                <Clock className="w-4 h-4 text-orange-500" />
                                <span className="font-medium">Due: {inv.date}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="text-right space-y-3">
                          <p className="text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 dark:from-gray-100 dark:to-gray-300 bg-clip-text text-transparent">
                            RM {inv.amount.toLocaleString()}
                          </p>
                          <Badge
                            variant="outline"
                            className={`px-4 py-2 font-bold text-sm ${
                              inv.method === "FPX"
                                ? "border-blue-300 bg-gradient-to-r from-blue-50 to-blue-100 text-blue-700 dark:border-blue-600 dark:from-blue-900/30 dark:to-blue-800/20 dark:text-blue-300"
                                : inv.method === "IBG"
                                ? "border-purple-300 bg-gradient-to-r from-purple-50 to-purple-100 text-purple-700 dark:border-purple-600 dark:from-purple-900/30 dark:to-purple-800/20 dark:text-purple-300"
                                : "border-green-300 bg-gradient-to-r from-green-50 to-green-100 text-green-700 dark:border-green-600 dark:from-green-900/30 dark:to-green-800/20 dark:text-green-300"
                            }`}
                          >
                            {inv.method}
                          </Badge>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
                
                {outstandingInvoices.length === 0 && (
                  <div className="text-center py-16">
                    <div className="w-20 h-20 rounded-full bg-gradient-to-br from-green-100 to-green-200 dark:from-green-900/30 dark:to-green-800/20 flex items-center justify-center mx-auto mb-6">
                      <CheckCircle2 className="w-10 h-10 text-green-600 dark:text-green-400" />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-3">All Caught Up!</h3>
                    <p className="text-gray-600 dark:text-gray-400 text-lg">No outstanding invoices at this time.</p>
                  </div>
                )}
              </div>
            </Card>

            {/* Premium Payment Methods */}
            <Card className="p-4 sm:p-6 lg:p-8 shadow-xl border-0 bg-white/70 backdrop-blur-sm dark:bg-gray-800/70 dark:border-gray-700/50">
              <div className="flex items-center space-x-3 mb-4 sm:mb-6">
                <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
                  <CreditCard className="w-4 h-4 sm:w-5 sm:h-5 text-green-600 dark:text-green-400" />
                </div>
                <div>
                  <h2 className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-gray-100">Payment Methods</h2>
                  <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">Choose your preferred payment option</p>
                </div>
              </div>

              <Tabs value={tab} onValueChange={setTab} className="w-full">
                <TabsList className="grid w-full grid-cols-3 bg-gray-100 dark:bg-gray-800 p-1 rounded-xl">
                  <TabsTrigger value="IBG" className="flex flex-col sm:flex-row items-center gap-1 sm:gap-2 h-12 sm:h-12 rounded-lg transition-all duration-300 data-[state=active]:bg-white data-[state=active]:shadow-lg data-[state=active]:scale-105 dark:data-[state=active]:bg-gray-700 hover:bg-white/50 dark:hover:bg-gray-700/50 px-2">
                    <CreditCard className="w-3 h-3 sm:w-4 sm:h-4" />
                    <div className="text-center sm:text-left">
                      <div className="font-medium text-xs sm:text-sm">IBG</div>
                      <div className="text-xs text-gray-500 hidden sm:block">Bank Transfer</div>
                    </div>
                  </TabsTrigger>
                  <TabsTrigger value="FPX" className="flex flex-col sm:flex-row items-center gap-1 sm:gap-2 h-12 sm:h-12 rounded-lg transition-all duration-300 data-[state=active]:bg-white data-[state=active]:shadow-lg data-[state=active]:scale-105 dark:data-[state=active]:bg-gray-700 hover:bg-white/50 dark:hover:bg-gray-700/50 px-2">
                    <Banknote className="w-3 h-3 sm:w-4 sm:h-4" />
                    <div className="text-center sm:text-left">
                      <div className="font-medium text-xs sm:text-sm">FPX</div>
                      <div className="text-xs text-gray-500 hidden sm:block">Online Banking</div>
                    </div>
                  </TabsTrigger>
                  <TabsTrigger value="Others" className="flex flex-col sm:flex-row items-center gap-1 sm:gap-2 h-12 sm:h-12 rounded-lg transition-all duration-300 data-[state=active]:bg-white data-[state=active]:shadow-lg data-[state=active]:scale-105 dark:data-[state=active]:bg-gray-700 hover:bg-white/50 dark:hover:bg-gray-700/50 px-2">
                    <Calculator className="w-3 h-3 sm:w-4 sm:h-4" />
                    <div className="text-center sm:text-left">
                      <div className="font-medium text-xs sm:text-sm">Others</div>
                      <div className="text-xs text-gray-500 hidden sm:block">Contra • Balance</div>
                    </div>
                  </TabsTrigger>
                </TabsList>

                {/* IBG Form */}
                <TabsContent value="IBG" className="mt-4 sm:mt-6 space-y-4 sm:space-y-6">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
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
                          placeholder="Enter payer name"
                          value={payer}
                          onChange={(e) => handleFieldChange('payer', e.target.value)}
                          className={`h-12 transition-all duration-200 ${
                            touched.payer && errors.payer 
                              ? 'border-red-400 bg-red-50 dark:bg-red-900/20 dark:border-red-600' 
                              : touched.payer && !errors.payer
                              ? 'border-green-400 bg-green-50 dark:bg-green-900/20 dark:border-green-600'
                              : ''
                          }`}
                        />
                        {touched.payer && errors.payer && (
                          <p className="text-sm text-red-600 dark:text-red-400 flex items-center space-x-1">
                            <span className="w-4 h-4 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center text-xs">!</span>
                            <span>{errors.payer}</span>
                          </p>
                        )}
                        {touched.payer && !errors.payer && payer && (
                          <p className="text-sm text-green-600 dark:text-green-400 flex items-center space-x-1">
                            <CheckCircle2 className="w-4 h-4" />
                            <span>Looks good!</span>
                          </p>
                        )}
                      </div>

                      <div className="space-y-2">
                        <Label className="text-sm font-medium">Bank</Label>
                        <Select value={bank} onValueChange={(value) => handleFieldChange('bank', value)}>
                          <SelectTrigger className={`h-12 transition-all duration-200 ${
                            touched.bank && errors.bank 
                              ? 'border-red-400 bg-red-50 dark:bg-red-900/20 dark:border-red-600' 
                              : touched.bank && !errors.bank
                              ? 'border-green-400 bg-green-50 dark:bg-green-900/20 dark:border-green-600'
                              : ''
                          }`}>
                            <SelectValue placeholder="Select your bank" />
                          </SelectTrigger>
                          <SelectContent>
                            {MalaysianBanks.map((b) => (
                              <SelectItem key={b} value={b}>{b}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        {touched.bank && errors.bank && (
                          <p className="text-sm text-red-600 dark:text-red-400 flex items-center space-x-1">
                            <span className="w-4 h-4 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center text-xs">!</span>
                            <span>{errors.bank}</span>
                          </p>
                        )}
                        {touched.bank && !errors.bank && bank && (
                          <p className="text-sm text-green-600 dark:text-green-400 flex items-center space-x-1">
                            <CheckCircle2 className="w-4 h-4" />
                            <span>Bank selected!</span>
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label className="text-sm font-medium">Reference No</Label>
                        <Input
                          placeholder="Enter reference number"
                          value={referenceNo}
                          onChange={(e) => handleFieldChange('referenceNo', e.target.value)}
                          className={`h-12 transition-all duration-200 ${
                            touched.referenceNo && errors.referenceNo 
                              ? 'border-red-400 bg-red-50 dark:bg-red-900/20 dark:border-red-600' 
                              : touched.referenceNo && !errors.referenceNo
                              ? 'border-green-400 bg-green-50 dark:bg-green-900/20 dark:border-green-600'
                              : ''
                          }`}
                        />
                        {touched.referenceNo && errors.referenceNo && (
                          <p className="text-sm text-red-600 dark:text-red-400 flex items-center space-x-1">
                            <span className="w-4 h-4 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center text-xs">!</span>
                            <span>{errors.referenceNo}</span>
                          </p>
                        )}
                        {touched.referenceNo && !errors.referenceNo && referenceNo && (
                          <p className="text-sm text-green-600 dark:text-green-400 flex items-center space-x-1">
                            <CheckCircle2 className="w-4 h-4" />
                            <span>Reference number valid!</span>
                          </p>
                        )}
                      </div>

                      <div className="space-y-2">
                        <Label className="text-sm font-medium">Paid To</Label>
                        <Select value={paidTo} onValueChange={setPaidTo}>
                          <SelectTrigger className="h-12">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="CLA Logistics">CLA Logistics</SelectItem>
                            <SelectItem value="CLA Freight">CLA Freight</SelectItem>
                            <SelectItem value="CLA Express">CLA Express</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label className="text-sm font-medium">Upload Payment Slip</Label>
                        <Input
                          type="file"
                          accept=".jpg,.jpeg,.png,.pdf"
                          onChange={handleUploadSlip}
                          className="h-12"
                        />
                        {slipFileName && (
                          <p className="text-sm text-green-600 dark:text-green-400">
                            {slipFileName}
                          </p>
                        )}
                        <p className="text-xs text-gray-500 dark:text-gray-400">Accepted: JPG, PNG, PDF (Max 5MB)</p>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label className="text-sm font-medium">Remarks (Optional)</Label>
                    <Textarea
                      placeholder="Add any additional notes..."
                      value={remarks}
                      onChange={(e) => setRemarks(e.target.value)}
                      rows={3}
                    />
                  </div>

                  <div className="flex justify-end pt-4">
                    <Button 
                      onClick={handleSubmitIBG} 
                      size="lg" 
                      disabled={isSubmitting || !validateForm()}
                      className={`h-12 px-8 transition-all duration-200 ${
                        isSubmitting 
                          ? 'bg-gray-400 cursor-not-allowed' 
                          : submitSuccess
                          ? 'bg-green-600 hover:bg-green-700'
                          : 'bg-blue-600 hover:bg-blue-700'
                      }`}
                    >
                      {isSubmitting ? (
                        <>
                          <div className="w-4 h-4 mr-2 border-2 border-white border-t-transparent rounded-full animate-spin" />
                          Processing...
                        </>
                      ) : submitSuccess ? (
                        <>
                          <CheckCircle2 className="w-4 h-4 mr-2" />
                          Payment Submitted!
                        </>
                      ) : (
                        <>
                          <ArrowRight className="w-4 h-4 mr-2" />
                          Submit Payment
                        </>
                      )}
                    </Button>
                  </div>
                </TabsContent>

                {/* FPX */}
                <TabsContent value="FPX" className="mt-6 space-y-6">
                  <div className="space-y-4">
                    <Label className="text-sm font-medium">Select Your Bank</Label>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                      {MalaysianBanks.map((b) => (
                        <div key={b} className="rounded-lg border-2 border-gray-200 dark:border-gray-700 p-4 text-center hover:border-blue-300 dark:hover:border-blue-600 cursor-pointer transition-colors">
                          <div className="font-medium text-gray-900 dark:text-gray-100">{b}</div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="flex justify-end pt-4">
                    <Button onClick={handleProceedFPX} size="lg" className="bg-blue-600 hover:bg-blue-700 h-12 px-8">
                      <ArrowRight className="w-4 h-4 mr-2" />
                      Proceed to FPX
                    </Button>
                  </div>
                </TabsContent>

                {/* Others */}
                <TabsContent value="Others" className="mt-6 space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label className="text-sm font-medium">Settlement Type</Label>
                        <Select>
                          <SelectTrigger className="h-12">
                            <SelectValue placeholder="Select settlement type" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="contra">Contra</SelectItem>
                            <SelectItem value="balance">Balance Adjustment</SelectItem>
                            <SelectItem value="credit">Credit Note</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label className="text-sm font-medium">Amount (RM)</Label>
                        <Input
                          type="number"
                          placeholder="0.00"
                          className="h-12"
                        />
                      </div>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </Card>
          </div>

          {/* Enhanced Premium Payment Summary Sidebar */}
          <div className="lg:col-span-1 order-first lg:order-last">
            <div className="sticky top-24 space-y-4 sm:space-y-6">
              {/* Enhanced Payment Summary with Real-time Calculations */}
              <Card className="p-4 sm:p-6 shadow-2xl border-0 bg-gradient-to-br from-white via-blue-50/30 to-indigo-50/20 dark:from-gray-800 dark:via-gray-800/80 dark:to-gray-900/60 backdrop-blur-md rounded-xl sm:rounded-2xl relative overflow-hidden animate-slide-in-right">
                {/* Animated Background Pattern */}
                <div className="absolute inset-0 opacity-5">
                  <div className="absolute top-0 left-0 w-24 h-24 sm:w-32 sm:h-32 bg-gradient-to-br from-blue-400 to-indigo-500 rounded-full blur-3xl animate-pulse"></div>
                  <div className="absolute bottom-0 right-0 w-16 h-16 sm:w-24 sm:h-24 bg-gradient-to-br from-purple-400 to-pink-500 rounded-full blur-2xl animate-pulse" style={{ animationDelay: '1s' }}></div>
                </div>

                <div className="relative z-10">
                  <div className="flex items-center justify-between mb-4 sm:mb-6">
                    <h3 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-gray-100">Payment Summary</h3>
                    {selectedIds.length > 0 && (
                      <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                    )}
                  </div>

                  {/* Invoice Selection Stats */}
                  <div className="grid grid-cols-2 gap-3 sm:gap-4 mb-4 sm:mb-6">
                    <div className="bg-white/60 dark:bg-gray-700/40 rounded-lg sm:rounded-xl p-3 sm:p-4 text-center backdrop-blur-sm">
                      <div className="text-xl sm:text-2xl font-bold text-blue-600 dark:text-blue-400">
                        {selectedIds.length}
                      </div>
                      <div className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">Selected</div>
                    </div>
                    <div className="bg-white/60 dark:bg-gray-700/40 rounded-lg sm:rounded-xl p-3 sm:p-4 text-center backdrop-blur-sm">
                      <div className="text-xl sm:text-2xl font-bold text-orange-600 dark:text-orange-400">
                        {outstandingInvoices.length - selectedIds.length}
                      </div>
                      <div className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">Remaining</div>
                    </div>
                  </div>

                  <Separator className="my-4 sm:my-6 bg-gradient-to-r from-transparent via-gray-300 dark:via-gray-600 to-transparent" />

                  {/* Amount Breakdown */}
                  <div className="space-y-3 sm:space-y-4 mb-4 sm:mb-6">
                    <div className="flex justify-between items-center">
                      <span className="text-sm sm:text-base text-gray-600 dark:text-gray-400">Selected Invoices</span>
                      <div className="font-bold text-gray-900 dark:text-gray-100">{selectedIds.length}</div>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600 dark:text-gray-400">Total Amount</span>
                      <div className="text-xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400 bg-clip-text text-transparent">
                        RM {totalSelected.toLocaleString()}
                      </div>
                    </div>
                  </div>

                  <Separator className="my-6 bg-gradient-to-r from-transparent via-gray-300 dark:via-gray-600 to-transparent" />

                  {/* Payment Amount Input with Visual Feedback */}
                  <div className="space-y-3 mb-6">
                    <Label className="text-sm font-bold text-gray-900 dark:text-gray-100">Payment Amount (RM)</Label>
                    <div className="relative">
                      <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500 dark:text-gray-400 font-bold text-xl">RM</div>
                      <Input
                        type="number"
                        placeholder="0.00"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        className={`h-14 text-xl font-bold pl-12 pr-4 border-2 transition-all duration-300 ${
                          amount && Number(amount) > 0
                            ? Number(amount) === totalSelected
                              ? 'border-green-400 bg-green-50 dark:bg-green-900/20 dark:border-green-600'
                              : Number(amount) > totalSelected
                              ? 'border-orange-400 bg-orange-50 dark:bg-orange-900/20 dark:border-orange-600'
                              : 'border-blue-400 bg-blue-50 dark:bg-blue-900/20 dark:border-blue-600'
                            : 'border-gray-300 dark:border-gray-600'
                        }`}
                      />
                      {amount && Number(amount) > 0 && (
                        <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
                          {Number(amount) === totalSelected ? (
                            <CheckCircle2 className="w-5 h-5 text-green-500" />
                          ) : Number(amount) > totalSelected ? (
                            <TrendingUp className="w-5 h-5 text-orange-500" />
                          ) : (
                            <Clock className="w-5 h-5 text-blue-500" />
                          )}
                        </div>
                      )}
                    </div>

                    {/* Dynamic Payment Status */}
                    {amount && Number(amount) > 0 && (
                      <div className={`p-3 rounded-lg border text-sm font-medium ${
                        Number(amount) === totalSelected
                          ? 'border-green-200 bg-green-50 text-green-700 dark:border-green-700 dark:bg-green-900/20 dark:text-green-300'
                          : Number(amount) > totalSelected
                          ? 'border-orange-200 bg-orange-50 text-orange-700 dark:border-orange-700 dark:bg-orange-900/20 dark:text-orange-300'
                          : 'border-blue-200 bg-blue-50 text-blue-700 dark:border-blue-700 dark:bg-blue-900/20 dark:text-blue-300'
                      }`}>
                        {Number(amount) === totalSelected ? (
                          <div className="flex items-center space-x-2">
                            <CheckCircle2 className="w-4 h-4" />
                            <span>Perfect! Full payment amount</span>
                          </div>
                        ) : Number(amount) > totalSelected ? (
                          <div className="space-y-1">
                            <div className="flex items-center space-x-2">
                              <TrendingUp className="w-4 h-4" />
                              <span>Overpayment - Excess: RM {(Number(amount) - totalSelected).toLocaleString()}</span>
                            </div>
                          </div>
                        ) : (
                          <div className="space-y-1">
                            <div className="flex items-center space-x-2">
                              <Clock className="w-4 h-4" />
                              <span>Partial payment - Remaining: RM {(totalSelected - Number(amount)).toLocaleString()}</span>
                            </div>
                          </div>
                        )}
                      </div>
                    )}
                  </div>

                  <Separator className="my-6 bg-gradient-to-r from-transparent via-gray-300 dark:via-gray-600 to-transparent" />

                  {/* Quick Pay Suggestions */}
                  {totalSelected > 0 && (
                    <div className="space-y-3 mb-6">
                      <Label className="text-sm font-bold text-gray-900 dark:text-gray-100">Quick Pay</Label>
                      <div className="space-y-2">
                        <Button
                          variant="outline"
                          size="sm"
                          className="w-full justify-between h-10 bg-white/60 dark:bg-gray-700/40 backdrop-blur-sm hover:bg-white dark:hover:bg-gray-700 border-gray-200 dark:border-gray-600"
                          onClick={() => setAmount(totalSelected.toString())}
                        >
                          <span>Pay Full Amount</span>
                          <span className="font-bold">RM {totalSelected.toLocaleString()}</span>
                        </Button>
                        {totalSelected > 1000 && (
                          <Button
                            variant="outline"
                            size="sm"
                            className="w-full justify-between h-10 bg-white/60 dark:bg-gray-700/40 backdrop-blur-sm hover:bg-white dark:hover:bg-gray-700 border-gray-200 dark:border-gray-600"
                            onClick={() => setAmount((Math.ceil(totalSelected / 2 / 100) * 100).toString())}
                          >
                            <span>Pay Half (Rounded)</span>
                            <span className="font-bold">RM {(Math.ceil(totalSelected / 2 / 100) * 100).toLocaleString()}</span>
                          </Button>
                        )}
                      </div>
                    </div>
                  )}

                  <Separator className="my-6 bg-gradient-to-r from-transparent via-gray-300 dark:via-gray-600 to-transparent" />

                  {/* Enhanced Security & Trust */}
                  <div className="space-y-4">
                    <h4 className="font-semibold text-gray-900 dark:text-gray-100 flex items-center space-x-2">
                      <Shield className="w-4 h-4 text-green-500" />
                      <span>Security & Trust</span>
                    </h4>
                    <div className="space-y-3 text-sm">
                      <div className="flex items-center space-x-3 text-green-600 dark:text-green-400">
                        <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                        <span>256-bit SSL Encryption</span>
                        <div className="ml-auto">
                          <div className="w-6 h-6 rounded bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
                            <Lock className="w-3 h-3 text-green-600 dark:text-green-400" />
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3 text-green-600 dark:text-green-400">
                        <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                        <span>PCI DSS Compliant</span>
                        <div className="ml-auto">
                          <div className="w-6 h-6 rounded bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
                            <Shield className="w-3 h-3 text-green-600 dark:text-green-400" />
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3 text-green-600 dark:text-green-400">
                        <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                        <span>Bank-Grade Security</span>
                        <div className="ml-auto">
                          <div className="w-6 h-6 rounded bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
                            <Building2 className="w-3 h-3 text-green-600 dark:text-green-400" />
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3 text-green-600 dark:text-green-400">
                        <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                        <span>Fraud Protection</span>
                        <div className="ml-auto">
                          <div className="w-6 h-6 rounded bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
                            <CheckCircle2 className="w-3 h-3 text-green-600 dark:text-green-400" />
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    {/* Trust Badges */}
                    <div className="grid grid-cols-2 gap-2 mt-4">
                      <div className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 border border-green-200 dark:border-green-700 rounded-lg p-2 text-center">
                        <div className="text-xs font-bold text-green-700 dark:text-green-300">SSL</div>
                        <div className="text-xs text-green-600 dark:text-green-400">SECURED</div>
                      </div>
                      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 border border-blue-200 dark:border-blue-700 rounded-lg p-2 text-center">
                        <div className="text-xs font-bold text-blue-700 dark:text-blue-300">PCI</div>
                        <div className="text-xs text-blue-600 dark:text-blue-400">COMPLIANT</div>
                      </div>
                    </div>
                  </div>

                  <Separator className="my-6 bg-gradient-to-r from-transparent via-gray-300 dark:via-gray-600 to-transparent" />

                  {/* Enhanced Support */}
                  <div className="space-y-4">
                    <h4 className="font-semibold text-gray-900 dark:text-gray-100 flex items-center space-x-2">
                      <Smartphone className="w-4 h-4 text-blue-500" />
                      <span>Need Help?</span>
                    </h4>
                    <div className="space-y-3">
                      <Button variant="outline" size="sm" className="w-full justify-start h-10 bg-white/60 dark:bg-gray-700/40 backdrop-blur-sm">
                        <div className="flex items-center space-x-3">
                          <div className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
                            <span className="text-xs font-bold text-blue-600 dark:text-blue-400">?</span>
                          </div>
                          <div className="text-left">
                            <div className="font-medium text-gray-900 dark:text-gray-100">Payment Guide</div>
                            <div className="text-xs text-gray-500 dark:text-gray-400">Step-by-step help</div>
                          </div>
                        </div>
                      </Button>
                      <Button variant="outline" size="sm" className="w-full justify-start h-10 bg-white/60 dark:bg-gray-700/40 backdrop-blur-sm">
                        <div className="flex items-center space-x-3">
                          <div className="w-8 h-8 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
                            <span className="text-xs font-bold text-green-600 dark:text-green-400">24/7</span>
                          </div>
                          <div className="text-left">
                            <div className="font-medium text-gray-900 dark:text-gray-100">Live Support</div>
                            <div className="text-xs text-gray-500 dark:text-gray-400">Chat with us now</div>
                          </div>
                        </div>
                      </Button>
                    </div>
                  </div>
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