"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useAuth } from "@/contexts/auth-context"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import {
  LayoutDashboard,
  FileText,
  TrendingUp,
  MessageSquare,
  Bell,
  User,
  LogOut,
  Menu,
  Building2,
  CreditCard,
  Wallet,
  X,
  ShoppingBag,
} from "lucide-react"

const navigation = [
  { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { name: "Payments", href: "/payments", icon: CreditCard },
  { name: "Reload", href: "/reload", icon: Wallet },
  { name: "Reports", href: "/reports", icon: FileText },
  { name: "Marketplace", href: "/marketplace", icon: ShoppingBag },
  { name: "Insights", href: "/insights", icon: TrendingUp },
  { name: "Feedback", href: "/feedback", icon: MessageSquare },
  { name: "Notifications", href: "/notifications", icon: Bell },
  { name: "Profile", href: "/profile", icon: User },
]

export function DashboardLayout({ children }: { children: React.ReactNode }) {
  const { user, logout } = useAuth()
  const pathname = usePathname()
  const [sidebarOpen, setSidebarOpen] = useState(false)

  // Close sidebar when route changes on mobile
  useEffect(() => {
    setSidebarOpen(false)
  }, [pathname])

  // Prevent body scroll when sidebar is open on mobile
  useEffect(() => {
    if (sidebarOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [sidebarOpen])

  return (
    <div className="min-h-screen bg-white">
      {/* Mobile sidebar backdrop */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden" 
          onClick={() => setSidebarOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed top-0 left-0 z-50 h-full w-64 bg-white border-r border-gray-200 shadow-sm transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:z-50",
          sidebarOpen ? "translate-x-0" : "-translate-x-full",
        )}
      >
        <div className="flex flex-col h-full">
          {/* Logo and close button */}
          <div className="flex items-center justify-between px-6 py-5 border-b border-gray-200 bg-white">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center">
                <Building2 className="w-6 h-6" style={{ color: '#0096FF' }} />
              </div>
              <div>
                <h1 className="font-bold text-lg text-gray-900">CLA Portal</h1>
                <p className="text-xs" style={{ color: '#0096FF' }}>D&D Control</p>
              </div>
            </div>
            {/* Close button for mobile */}
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden text-gray-700 hover:bg-gray-100"
              onClick={() => setSidebarOpen(false)}
            >
              <X className="w-5 h-5" />
            </Button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-4 py-6 space-y-1 overflow-y-auto bg-white">
            {navigation.map((item) => {
              const isActive = pathname === item.href
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => setSidebarOpen(false)}
                  className={cn(
                    "flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200 group",
                    isActive 
                      ? "text-white shadow-sm" 
                      : "text-gray-700 hover:bg-blue-50",
                  )}
                  style={isActive ? { backgroundColor: '#0096FF' } : {}}
                >
                  <item.icon className={cn(
                    "w-5 h-5 transition-all duration-200",
                    isActive ? "text-white" : ""
                  )}
                  style={!isActive ? { color: '#0096FF' } : {}}
                  />
                  {item.name}
                </Link>
              )
            })}
          </nav>

          {/* User info & logout */}
          <div className="p-4 border-t border-gray-200 bg-white">
            <div className="flex items-center gap-3 px-4 py-3 mb-2 bg-blue-50 rounded-lg border border-blue-100">
              <div className="w-8 h-8 rounded-full flex items-center justify-center" style={{ backgroundColor: '#0096FF' }}>
                <User className="w-4 h-4 text-white" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 truncate">{user?.email}</p>
                <p className="text-xs capitalize font-medium" style={{ color: '#0096FF' }}>{user?.role}</p>
              </div>
            </div>
            <Button 
              variant="outline" 
              className="w-full justify-start gap-2 bg-white border-gray-200 text-gray-700 hover:bg-blue-50 transition-all duration-200" 
              onClick={logout}
            >
              <LogOut className="w-4 h-4" />
              Logout
            </Button>
          </div>
        </div>
      </aside>

      {/* Main content */}
      <div className="lg:pl-64">
        {/* Top bar */}
        <header className="sticky top-0 z-40 border-b shadow-sm lg:z-40" style={{ backgroundColor: '#0096FF', borderColor: '#0080E0' }}>
          <div className="flex items-center justify-between px-4 py-4 lg:px-8">
            <div className="flex items-center gap-4">
              <Button 
                variant="ghost" 
                size="icon" 
                className="lg:hidden text-white hover:bg-white/10 hover:text-white" 
                onClick={() => setSidebarOpen(true)}
              >
                <Menu className="w-6 h-6" />
              </Button>
              <h2 className="text-xl font-semibold text-white">
                {navigation.find((item) => item.href === pathname)?.name || "Dashboard"}
              </h2>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-sm text-blue-100 hidden sm:block">
                {typeof window !== 'undefined' && new Date().toLocaleDateString("en-US", {
                  weekday: "short",
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                })}
              </div>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-white/10 rounded-full flex items-center justify-center">
                  <User className="w-4 h-4 text-white" />
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="p-4 lg:p-8 min-h-[calc(100vh-73px)] bg-white">{children}</main>
      </div>
    </div>
  )
}
