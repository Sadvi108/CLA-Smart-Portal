// Mock data for the CLA Dashboard System

export interface Invoice {
  invoice_id: string
  customer: string
  amount: number
  status: "Paid" | "Outstanding" | "Overdue"
  method: "FPX" | "IBG" | "Contra"
  date: string
  type?: string
}

export interface Payment {
  payment_id: string
  invoice_id: string
  customer: string
  amount: number
  method: "FPX" | "IBG" | "Contra"
  date: string
}

export interface Refund {
  refund_id: string
  invoice_id: string
  customer: string
  amount: number
  status: "Approved" | "Pending" | "Rejected"
  date: string
  reason?: string
}

export interface Feedback {
  feedback_id: string
  customer: string
  rating: number
  sentiment: "Positive" | "Neutral" | "Negative"
  category: string
  message: string
  date: string
  status: "Reviewed" | "Pending"
}

export const invoices: Invoice[] = [
  {
    invoice_id: "INV-2025-001",
    customer: "ABC Logistics",
    amount: 15200,
    status: "Paid",
    method: "FPX",
    date: "2025-01-15",
    type: "Container",
  },
  {
    invoice_id: "INV-2025-002",
    customer: "XYZ Shipping",
    amount: 8500,
    status: "Outstanding",
    method: "IBG",
    date: "2025-01-18",
    type: "Storage",
  },
  {
    invoice_id: "INV-2025-003",
    customer: "Global Transport",
    amount: 12400,
    status: "Overdue",
    method: "FPX",
    date: "2024-12-28",
    type: "Handling",
  },
  {
    invoice_id: "INV-2025-004",
    customer: "Fast Cargo",
    amount: 9800,
    status: "Paid",
    method: "Contra",
    date: "2025-01-20",
    type: "Transport",
  },
  {
    invoice_id: "INV-2025-005",
    customer: "Ocean Freight",
    amount: 18600,
    status: "Outstanding",
    method: "FPX",
    date: "2025-01-22",
    type: "Container",
  },
  {
    invoice_id: "INV-2025-006",
    customer: "Swift Logistics",
    amount: 7300,
    status: "Paid",
    method: "IBG",
    date: "2025-01-10",
    type: "Storage",
  },
  {
    invoice_id: "INV-2025-007",
    customer: "Prime Shipping",
    amount: 11500,
    status: "Outstanding",
    method: "FPX",
    date: "2025-01-25",
    type: "Container",
  },
]

export const payments: Payment[] = [
  {
    payment_id: "PAY-2025-001",
    invoice_id: "INV-2025-001",
    customer: "ABC Logistics",
    amount: 15200,
    method: "FPX",
    date: "2025-01-16",
  },
  {
    payment_id: "PAY-2025-002",
    invoice_id: "INV-2024-089",
    customer: "Swift Logistics",
    amount: 7300,
    method: "IBG",
    date: "2025-01-17",
  },
  {
    payment_id: "PAY-2025-003",
    invoice_id: "INV-2025-004",
    customer: "Fast Cargo",
    amount: 9800,
    method: "Contra",
    date: "2025-01-21",
  },
  {
    payment_id: "PAY-2025-004",
    invoice_id: "INV-2024-095",
    customer: "Prime Shipping",
    amount: 11500,
    method: "FPX",
    date: "2025-01-23",
  },
]

export const refunds: Refund[] = [
  {
    refund_id: "REF-2025-001",
    invoice_id: "INV-2024-078",
    customer: "Global Transport",
    amount: 2300,
    status: "Approved",
    date: "2025-01-10",
    reason: "Service not provided",
  },
  {
    refund_id: "REF-2025-002",
    invoice_id: "INV-2024-082",
    customer: "Ocean Freight",
    amount: 1500,
    status: "Pending",
    date: "2025-01-19",
    reason: "Duplicate charge",
  },
  {
    refund_id: "REF-2025-003",
    invoice_id: "INV-2025-001",
    customer: "ABC Logistics",
    amount: 800,
    status: "Rejected",
    date: "2025-01-21",
    reason: "Service already completed",
  },
]

export const feedback: Feedback[] = [
  {
    feedback_id: "FB-001",
    customer: "ABC Logistics",
    rating: 5,
    sentiment: "Positive",
    category: "Service Quality",
    message: "Excellent service! The team was very responsive and handled our container efficiently.",
    date: "2025-01-20",
    status: "Reviewed",
  },
  {
    feedback_id: "FB-002",
    customer: "XYZ Shipping",
    rating: 3,
    sentiment: "Neutral",
    category: "Pricing",
    message: "Service is good but pricing could be more competitive.",
    date: "2025-01-19",
    status: "Pending",
  },
  {
    feedback_id: "FB-003",
    customer: "Global Transport",
    rating: 2,
    sentiment: "Negative",
    category: "Response Time",
    message: "Took too long to process our refund request. Need faster turnaround.",
    date: "2025-01-18",
    status: "Pending",
  },
  {
    feedback_id: "FB-004",
    customer: "Fast Cargo",
    rating: 5,
    sentiment: "Positive",
    category: "Portal Usability",
    message: "The new portal is very user-friendly. Easy to track invoices and payments.",
    date: "2025-01-17",
    status: "Reviewed",
  },
  {
    feedback_id: "FB-005",
    customer: "Ocean Freight",
    rating: 4,
    sentiment: "Positive",
    category: "Service Quality",
    message: "Good overall experience. Minor delays but nothing major.",
    date: "2025-01-16",
    status: "Reviewed",
  },
]

// Helper functions
export const getTotalOutstanding = () => {
  return invoices.filter((inv) => inv.status === "Outstanding").reduce((sum, inv) => sum + inv.amount, 0)
}

export const getTotalPaid = () => {
  return invoices.filter((inv) => inv.status === "Paid").reduce((sum, inv) => sum + inv.amount, 0)
}

export const getTotalOverdue = () => {
  return invoices.filter((inv) => inv.status === "Overdue").reduce((sum, inv) => sum + inv.amount, 0)
}

export const getPendingRefunds = () => {
  return refunds.filter((ref) => ref.status === "Pending").reduce((sum, ref) => sum + ref.amount, 0)
}

export const getCurrentCLABalance = () => {
  return 87650 // Mock current balance
}
