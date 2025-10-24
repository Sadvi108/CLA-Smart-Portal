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
import { ThemeToggle } from "@/components/theme-toggle"

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
    <div className="min-h-screen bg-white dark:bg-gray-900">
      {/* Mobile sidebar backdrop */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 dark:bg-black/70 z-40 lg:hidden" 
          onClick={() => setSidebarOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed top-0 left-0 z-50 h-full w-64 bg-white dark:from-gray-800 dark:to-gray-900 border-r border-gray-200 dark:border-gray-700 shadow-sm transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:z-50",
          sidebarOpen ? "translate-x-0" : "-translate-x-full",
        )}
      >
        <div className="flex flex-col h-full">
          {/* Logo and close button */}
          <div className="flex items-center justify-between px-6 py-5 border-b border-gray-200 dark:border-gray-700" style={{backgroundColor: '#007BFF'}}>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-white/20 dark:bg-white/10 rounded-lg flex items-center justify-center">
                <Building2 className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="font-bold text-lg text-white">CLA Portal</h1>
                <p className="text-xs text-blue-100 dark:text-gray-300">D&D Control</p>
              </div>
            </div>
            {/* Close button for mobile */}
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden text-white hover:bg-white/10 dark:hover:bg-white/5"
              onClick={() => setSidebarOpen(false)}
            >
              <X className="w-5 h-5" />
            </Button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-4 py-6 space-y-1 overflow-y-auto bg-white dark:bg-gray-800">
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
                      ? "text-white shadow-sm transform scale-105" 
                      : "text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 hover:scale-105",
                  )}
                  style={isActive ? {backgroundColor: '#007BFF'} : {}}
                >
                  <item.icon className={cn(
                    "w-5 h-5 transition-all duration-200",
                    isActive ? "text-white" : "text-gray-500 dark:text-gray-400"
                  )} 
                  style={!isActive ? {color: '#007BFF'} : {}}
                  />
                  {item.name}
                </Link>
              )
            })}
          </nav>

          {/* User info & logout */}
          <div className="p-4 border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
            <div className="flex items-center gap-3 px-4 py-3 mb-2 bg-white dark:bg-gray-800/80 rounded-lg border border-gray-200 dark:border-gray-600/50">
              <div className="w-8 h-8 rounded-full flex items-center justify-center" style={{backgroundColor: '#007BFF'}}>
                <User className="w-4 h-4 text-white" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 dark:text-gray-100 truncate">{user?.email}</p>
                <p className="text-xs capitalize font-medium" style={{color: '#007BFF'}}>{user?.role}</p>
              </div>
            </div>
            <Button 
              variant="outline" 
              className="w-full justify-start gap-2 bg-white dark:bg-gray-800/80 border-gray-200 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-all duration-200" 
              onClick={logout}
              style={{'--hover-color': '#007BFF'} as React.CSSProperties}
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
        <header className="sticky top-0 z-40 border-b border-gray-200 dark:border-gray-700/50 shadow-sm lg:z-40" style={{backgroundColor: '#007BFF'}}>
          <div className="flex items-center justify-between px-4 py-4 lg:px-8">
            <div className="flex items-center gap-4">
              <Button 
                variant="ghost" 
                size="icon" 
                className="lg:hidden text-white hover:bg-white/10 dark:hover:bg-white/5 hover:text-white" 
                onClick={() => setSidebarOpen(true)}
              >
                <Menu className="w-6 h-6" />
              </Button>
              <h2 className="text-xl font-semibold text-white">
                {navigation.find((item) => item.href === pathname)?.name || "Dashboard"}
              </h2>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-sm text-blue-100 dark:text-gray-300 hidden sm:block">
                {typeof window !== 'undefined' && new Date().toLocaleDateString("en-US", {
                  weekday: "short",
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                })}
              </div>
              <div className="flex items-center gap-3">
                <ThemeToggle variant="header" />
                <div className="w-8 h-8 bg-white/10 dark:bg-white/5 rounded-full flex items-center justify-center">
                  <User className="w-4 h-4 text-white" />
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="p-4 lg:p-8 min-h-[calc(100vh-73px)] bg-white dark:bg-gray-900">{children}</main>
      </div>
    </div>
  )
}
