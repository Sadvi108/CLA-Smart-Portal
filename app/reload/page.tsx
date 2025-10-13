"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArrowLeft, Wallet, CreditCard, Smartphone, Building2, CheckCircle } from "lucide-react"
import { useRouter } from "next/navigation"

export default function ReloadPage() {
  const router = useRouter()
  const [reloadAmount, setReloadAmount] = useState("")
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  // Mock current balance
  const currentBalance = 5000.00

  const quickSelectAmounts = [500, 1000, 2500, 5000]

  const paymentMethods = [
    { id: "fpx", name: "FPX Online Banking", icon: Building2, description: "Pay via your bank account" },
    { id: "credit_card", name: "Credit/Debit Card", icon: CreditCard, description: "Visa, Mastercard, etc." },
    { id: "grabpay", name: "GrabPay", icon: Smartphone, description: "Pay with GrabPay wallet" },
    { id: "tng", name: "Touch 'n Go eWallet", icon: Smartphone, description: "Pay with TnG eWallet" },
    { id: "boost", name: "Boost", icon: Smartphone, description: "Pay with Boost wallet" },
    { id: "shopeepay", name: "ShopeePay", icon: Smartphone, description: "Pay with ShopeePay wallet" },
  ]

  const handleQuickSelect = (amount: number) => {
    setReloadAmount(amount.toString())
  }

  const handleReload = async () => {
    if (!reloadAmount || !selectedPaymentMethod) return

    setIsLoading(true)
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000))
    setIsLoading(false)
    
    // Show success message or redirect
    alert(`Successfully initiated reload of RM ${reloadAmount} via ${paymentMethods.find(m => m.id === selectedPaymentMethod)?.name}`)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-50 via-white to-sky-50/20 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 p-4">
      <div className="max-w-2xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center gap-4 mb-6">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => router.back()}
            className="hover:bg-sky-100 dark:hover:bg-sky-900/20"
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Reload Account</h1>
        </div>

        {/* Current Balance Card */}
        <Card className="bg-gradient-to-r from-sky-600 to-sky-700 dark:from-sky-600 dark:to-sky-700 border-0 text-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sky-100 text-sm mb-1">Current Balance</p>
                <p className="text-3xl font-bold">RM {currentBalance.toFixed(2)}</p>
              </div>
              <div className="bg-white/20 p-3 rounded-full">
                <Wallet className="h-8 w-8" />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Reload Amount Section */}
        <Card className="dark:bg-gray-800 dark:border-gray-700">
          <CardContent className="p-6 space-y-6">
            {/* Amount Input */}
            <div className="space-y-2">
              <Label htmlFor="amount" className="text-base font-medium dark:text-gray-200">
                Reload Amount (RM)
              </Label>
              <Input
                id="amount"
                type="number"
                placeholder="0.00"
                value={reloadAmount}
                onChange={(e) => setReloadAmount(e.target.value)}
                className="text-lg h-12 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100"
              />
            </div>

            {/* Quick Select Buttons */}
            <div className="space-y-3">
              <Label className="text-base font-medium dark:text-gray-200">Quick Select</Label>
              <div className="grid grid-cols-2 gap-3">
                {quickSelectAmounts.map((amount) => (
                  <Button
                    key={amount}
                    variant="outline"
                    onClick={() => handleQuickSelect(amount)}
                    className="h-12 text-base border-gray-200 dark:border-gray-600 dark:text-gray-200 hover:bg-sky-50 dark:hover:bg-sky-900/20 hover:border-sky-300 dark:hover:border-sky-600"
                  >
                    RM {amount.toLocaleString()}
                  </Button>
                ))}
              </div>
            </div>

            {/* Payment Method Selection */}
            <div className="space-y-3">
              <Label className="text-base font-medium dark:text-gray-200">Payment Method</Label>
              <div className="space-y-2">
                {paymentMethods.map((method) => {
                  const IconComponent = method.icon
                  return (
                    <div
                      key={method.id}
                      className={`p-4 border rounded-lg cursor-pointer transition-all ${
                        selectedPaymentMethod === method.id
                          ? "border-sky-500 bg-sky-50 dark:bg-sky-900/20 dark:border-sky-400"
                          : "border-gray-200 dark:border-gray-600 hover:border-gray-300 dark:hover:border-gray-500"
                      }`}
                      onClick={() => setSelectedPaymentMethod(method.id)}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className={`p-2 rounded-full ${
                            selectedPaymentMethod === method.id
                              ? "bg-sky-100 dark:bg-sky-800"
                              : "bg-gray-100 dark:bg-gray-700"
                          }`}>
                            <IconComponent className={`h-5 w-5 ${
                              selectedPaymentMethod === method.id
                                ? "text-sky-600 dark:text-sky-400"
                                : "text-gray-600 dark:text-gray-400"
                            }`} />
                          </div>
                          <div>
                            <p className="font-medium text-gray-900 dark:text-gray-100">{method.name}</p>
                            <p className="text-sm text-gray-500 dark:text-gray-400">{method.description}</p>
                          </div>
                        </div>
                        {selectedPaymentMethod === method.id && (
                          <CheckCircle className="h-5 w-5 text-sky-600 dark:text-sky-400" />
                        )}
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>

            {/* Confirm Button */}
            <Button
              onClick={handleReload}
              disabled={!reloadAmount || !selectedPaymentMethod || isLoading}
              className="w-full h-12 text-base bg-gradient-to-r from-sky-600 to-sky-700 dark:from-sky-600 dark:to-sky-700 hover:from-sky-700 hover:to-sky-800 dark:hover:from-sky-700 dark:hover:to-sky-800 disabled:opacity-50"
            >
              {isLoading ? "Processing..." : "Confirm Reload"}
            </Button>
          </CardContent>
        </Card>

        {/* Security Notice */}
        <Card className="bg-yellow-50 dark:bg-yellow-900/20 border-yellow-200 dark:border-yellow-800">
          <CardContent className="p-4">
            <p className="text-sm text-yellow-800 dark:text-yellow-200">
              <strong>Security Notice:</strong> Your payment information is encrypted and secure. 
              You will be redirected to your selected payment provider to complete the transaction.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}