"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { 
  Building2, 
  Eye, 
  EyeOff, 
  User, 
  Lock, 
  ArrowRight, 
  Shield, 
  Truck, 
  Globe, 
  BarChart3, 
  Loader2,
  Moon,
  Sun,
  Search,
  Check,
  ChevronsUpDown,
  UserPlus,
  Sparkles
} from "lucide-react"

const branches = [
  { value: "hq", label: "Headquarters" },
  { value: "north", label: "Northern Branch" },
  { value: "south", label: "Southern Branch" },
  { value: "east", label: "Eastern Branch" },
  { value: "west", label: "Western Branch" },
  { value: "central", label: "Central Branch" },
  { value: "coastal", label: "Coastal Branch" },
]

export default function LoginPage() {
  const router = useRouter()
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [branch, setBranch] = useState("")
  const [error, setError] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [rememberMe, setRememberMe] = useState(false)
  const [isLoaded, setIsLoaded] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [leftPanelLoaded, setLeftPanelLoaded] = useState(false)
  const [rightPanelLoaded, setRightPanelLoaded] = useState(false)
  const [isDarkMode, setIsDarkMode] = useState(false)
  const [branchOpen, setBranchOpen] = useState(false)
  const [showFooter, setShowFooter] = useState(false)

  const [showMembershipForm, setShowMembershipForm] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY
      const windowHeight = window.innerHeight
      const documentHeight = document.documentElement.scrollHeight
      
      // Show footer when user scrolls down 20px or if page is short, show after delay
      if (scrollPosition > 20 || documentHeight <= windowHeight + 100) {
        setShowFooter(true)
      } else {
        setShowFooter(false)
      }
    }

    // Initial check and show footer after a delay for short pages
    const timer = setTimeout(() => {
      handleScroll()
      // If page is not scrollable, show footer anyway
      if (document.documentElement.scrollHeight <= window.innerHeight + 100) {
        setShowFooter(true)
      }
    }, 2000)
    
    window.addEventListener('scroll', handleScroll)
    return () => {
      window.removeEventListener('scroll', handleScroll)
      clearTimeout(timer)
    }
  }, [])

  useEffect(() => {
    // Check for saved dark mode preference
    const savedDarkMode = localStorage.getItem('darkMode') === 'true'
    setIsDarkMode(savedDarkMode)
    if (savedDarkMode) {
      document.documentElement.classList.add('dark')
    }

    // Staggered loading animation
    const timer1 = setTimeout(() => setLeftPanelLoaded(true), 200)
    const timer2 = setTimeout(() => setRightPanelLoaded(true), 400)
    const timer3 = setTimeout(() => setIsLoaded(true), 600)
    
    return () => {
      clearTimeout(timer1)
      clearTimeout(timer2)
      clearTimeout(timer3)
    }
  }, [])

  const toggleDarkMode = () => {
    const newDarkMode = !isDarkMode
    setIsDarkMode(newDarkMode)
    localStorage.setItem('darkMode', newDarkMode.toString())
    
    if (newDarkMode) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setIsLoading(true)

    // Simulate loading delay for smooth animation
    await new Promise(resolve => setTimeout(resolve, 1500))

    // Simple authentication - only admin@dnd.com with admin123
    if (username === "admin@dnd.com" && password === "admin123") {
      const user = { email: "admin@dnd.com", password: "admin123", role: "admin" }
      
      // Store user data in localStorage (only on client side)
      if (typeof window !== 'undefined') {
        localStorage.setItem("user", JSON.stringify(user))
      }
      // Add a small delay before navigation for smooth transition
      setTimeout(() => {
        router.push("/dashboard")
      }, 300)
    } else {
      setError("Invalid username or password")
      setIsLoading(false)
    }
  }

  return (
    <TooltipProvider>
      <div className="min-h-screen flex overflow-hidden bg-gradient-to-br from-sky-50 to-white dark:bg-gray-900 transition-colors duration-300 pb-24 md:pb-28">
        {/* Dark Mode Toggle */}
        <div className="absolute top-6 right-6 z-50">
          <Button
            variant="outline"
            size="sm"
            onClick={toggleDarkMode}
            className="w-10 h-10 p-0 rounded-full border-gray-300 dark:border-gray-600 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm hover:scale-110 transition-all duration-300 shadow-lg"
          >
            {isDarkMode ? (
              <Sun className="h-4 w-4 text-yellow-500" />
            ) : (
              <Moon className="h-4 w-4 text-gray-600" />
            )}
          </Button>
        </div>

        {/* Left Half - Login Form with Blue Gradient */}
        <div className={`w-1/2 bg-gradient-to-br from-sky-400 via-sky-500 to-sky-600 dark:from-sky-600 dark:via-sky-700 dark:to-sky-800 flex items-center justify-center p-8 relative transition-all duration-1000 ease-out ${leftPanelLoaded ? 'translate-x-0 opacity-100' : '-translate-x-full opacity-0'}`}>
          {/* Animated background elements */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute -top-40 -left-40 w-80 h-80 bg-sky-300/20 rounded-full blur-3xl animate-pulse"></div>
            <div className="absolute -bottom-40 -right-40 w-80 h-80 bg-indigo-400/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
          </div>
          
          <Card className={`w-full max-w-md border-0 shadow-2xl bg-white/95 dark:bg-gray-800/95 backdrop-blur-md transition-all duration-1000 hover:shadow-3xl hover:scale-[1.02] relative z-10 ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            <CardContent className="p-8">
              <div className="space-y-6">
                <div className="text-center">
                  {/* Company Logo */}
                  <div className={`transition-all duration-700 delay-600 ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}>
                    <div className="mb-6">
                      <div className="w-20 h-20 mx-auto bg-white dark:bg-white rounded-lg p-2 shadow-sm border border-gray-100 dark:border-gray-200">
                        <img 
                          src="https://i.ibb.co/60c8Rgrt/Screenshot-2025-10-09-150209.png" 
                          alt="Company Logo" 
                          className="w-full h-full object-contain transition-all duration-300 hover:scale-110"
                        />
                      </div>
                    </div>
                  </div>
                  <div className={`transition-all duration-700 delay-700 ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}>
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2 leading-tight">USER LOGIN</h2>
                  </div>
                </div>

                <form onSubmit={handleLogin} className="space-y-5">
                  {/* Username Field */}
                  <div className={`space-y-2 transition-all duration-500 delay-800 ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}>
                    <Label htmlFor="username" className="text-sm font-semibold text-gray-700 dark:text-gray-300 leading-relaxed">
                      Username
                    </Label>
                    <div className="relative group">
                      <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 transition-colors duration-200 group-focus-within:text-sky-500" />
                      <Input
                        id="username"
                        type="text"
                        placeholder="Username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        className="pl-10 h-12 border-gray-300 dark:border-gray-600 focus:border-sky-500 focus:ring-sky-500 rounded-lg transition-all duration-300 hover:border-sky-400 focus:scale-[1.01] bg-white dark:bg-gray-700 text-gray-900 dark:text-white leading-relaxed"
                        required
                        disabled={isLoading}
                      />
                    </div>
                  </div>

                  {/* Password Field */}
                  <div className={`space-y-2 transition-all duration-500 delay-900 ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}>
                    <Label htmlFor="password" className="text-sm font-semibold text-gray-700 dark:text-gray-300 leading-relaxed">
                      Password
                    </Label>
                    <div className="relative group">
                      <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 transition-colors duration-200 group-focus-within:text-sky-500" />
                      <Input
                        id="password"
                        type={showPassword ? "text" : "password"}
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="pl-10 pr-10 h-12 border-gray-300 dark:border-gray-600 focus:border-sky-500 focus:ring-sky-500 rounded-lg transition-all duration-300 hover:border-sky-400 focus:scale-[1.01] bg-white dark:bg-gray-700 text-gray-900 dark:text-white leading-relaxed"
                        required
                        disabled={isLoading}
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-all duration-200 hover:scale-110"
                        disabled={isLoading}
                      >
                        {showPassword ? (
                          <EyeOff className="w-4 h-4 transition-transform duration-200" />
                        ) : (
                          <Eye className="w-4 h-4 transition-transform duration-200" />
                        )}
                      </button>
                    </div>
                  </div>

                  {/* Branch Selection - Searchable */}
                  <div className={`space-y-2 transition-all duration-500 delay-1000 ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}>
                    <Label htmlFor="branch" className="text-sm font-semibold text-gray-700 dark:text-gray-300 leading-relaxed">
                      Branch
                    </Label>
                    <Popover open={branchOpen} onOpenChange={setBranchOpen}>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          role="combobox"
                          aria-expanded={branchOpen}
                          className="w-full h-12 justify-between border-gray-300 dark:border-gray-600 hover:border-sky-400 focus:border-sky-500 focus:ring-sky-500 rounded-lg transition-all duration-300 hover:scale-[1.01] bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                          disabled={isLoading}
                        >
                          <div className="flex items-center">
                            <Building2 className="w-4 h-4 mr-2 text-gray-400" />
                            {branch
                              ? branches.find((b) => b.value === branch)?.label
                              : "Select Branch"}
                          </div>
                          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-full p-0 bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600">
                        <Command>
                          <CommandInput 
                            placeholder="Search branch..." 
                            className="h-9 border-0 focus:ring-0 bg-transparent text-gray-900 dark:text-white"
                          />
                          <CommandList>
                            <CommandEmpty>No branch found.</CommandEmpty>
                            <CommandGroup>
                              {branches.map((b) => (
                                <CommandItem
                                  key={b.value}
                                  value={b.value}
                                  onSelect={(currentValue) => {
                                    setBranch(currentValue === branch ? "" : currentValue)
                                    setBranchOpen(false)
                                  }}
                                  className="text-gray-900 dark:text-white hover:bg-sky-50 dark:hover:bg-gray-700"
                                >
                                  <Check
                                    className={`mr-2 h-4 w-4 ${
                                      branch === b.value ? "opacity-100" : "opacity-0"
                                    }`}
                                  />
                                  {b.label}
                                </CommandItem>
                              ))}
                            </CommandGroup>
                          </CommandList>
                        </Command>
                      </PopoverContent>
                    </Popover>
                  </div>

                  {/* Remember Me & Forgot Password */}
                  <div className={`flex items-center justify-between transition-all duration-500 delay-1100 ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}>
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="remember"
                        checked={rememberMe}
                        onCheckedChange={(checked) => setRememberMe(checked as boolean)}
                        className="border-gray-300 dark:border-gray-600 transition-all duration-200 hover:scale-110"
                        disabled={isLoading}
                      />
                      <Label htmlFor="remember" className="text-sm text-gray-600 dark:text-gray-400 cursor-pointer transition-colors duration-200 hover:text-gray-800 dark:hover:text-gray-200 leading-relaxed">
                        Remember me
                      </Label>
                    </div>
                    <Button
                      type="button"
                      variant="link"
                      className="text-sm text-sky-600 dark:text-sky-400 hover:text-sky-800 dark:hover:text-sky-300 p-0 h-auto font-medium transition-colors duration-200"
                      disabled={isLoading}
                    >
                      Forgot Password?
                    </Button>
                  </div>

                  {/* Error Message */}
                  {error && (
                    <div className="text-red-600 dark:text-red-400 text-sm text-center bg-red-50 dark:bg-red-900/20 p-3 rounded-lg border border-red-200 dark:border-red-800 animate-shake transition-all duration-300">
                      {error}
                    </div>
                  )}

                  {/* Login Button */}
                  <div className={`transition-all duration-500 delay-1200 ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}>
                    <Button
                      type="submit"
                      className="w-full h-12 bg-gradient-to-r from-sky-500 to-sky-600 hover:from-sky-600 hover:to-sky-700 text-white font-semibold rounded-lg transition-all duration-300 hover:scale-[1.02] hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed relative overflow-hidden group"
                      disabled={isLoading}
                    >
                      {isLoading ? (
                        <>
                          <div className="absolute inset-0 bg-gradient-to-r from-sky-600 to-sky-700 animate-pulse"></div>
                          <div className="relative flex items-center justify-center">
                            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                            Signing In...
                          </div>
                        </>
                      ) : (
                        <>
                          Sign In
                          <ArrowRight className="w-4 h-4 ml-2 transition-transform duration-200 group-hover:translate-x-1" />
                        </>
                      )}
                    </Button>
                  </div>
                </form>

                {/* Membership Button */}
                <div className={`transition-all duration-500 delay-1300 ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}>
                  <Button
                    type="button"
                    onClick={() => setShowMembershipForm(true)}
                    className="w-full h-12 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white font-semibold rounded-lg transition-all duration-300 hover:scale-[1.02] hover:shadow-lg relative overflow-hidden group mb-12"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-emerald-600 to-teal-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <div className="relative flex items-center justify-center">
                      <UserPlus className="w-5 h-5 mr-2 transition-transform duration-200 group-hover:scale-110" />
                      Click HERE to become a CLA Member
                      <Sparkles className="w-4 h-4 ml-2 transition-transform duration-200 group-hover:rotate-12" />
                    </div>
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Half - Explore Content with Background Image */}
        <div 
          className={`w-1/2 relative flex items-center justify-center transition-all duration-1000 ease-out group ${rightPanelLoaded ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'}`}
          style={{
            backgroundImage: `url('https://i.ibb.co/d4m80Bbd/timelab-yx20mp-Dyr2-I-unsplash.jpg')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat'
          }}
        >
          {/* Enhanced overlay for better text readability */}
          <div className="absolute inset-0 bg-black/50 dark:bg-black/60 transition-all duration-1000 group-hover:bg-black/40 dark:group-hover:bg-black/50"></div>
          
          {/* Floating particles animation */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-white/20 rounded-full animate-bounce delay-0"></div>
            <div className="absolute top-1/3 right-1/3 w-1 h-1 bg-sky-300/30 rounded-full animate-bounce delay-500"></div>
            <div className="absolute bottom-1/4 left-1/3 w-1.5 h-1.5 bg-white/15 rounded-full animate-bounce delay-1000"></div>
            <div className="absolute bottom-1/3 right-1/4 w-1 h-1 bg-sky-200/25 rounded-full animate-bounce delay-1500"></div>
          </div>
          
          {/* Content */}
          <div className="relative z-10 text-center text-white p-12 max-w-lg">
            <div className="mb-8">
              <div className={`transition-all duration-700 delay-500 group-hover:scale-110 ${rightPanelLoaded ? 'translate-y-0 opacity-100 scale-100' : 'translate-y-8 opacity-0 scale-95'}`}>
                <Building2 className="w-16 h-16 mx-auto mb-4 text-white animate-pulse" />
              </div>
              <div className={`transition-all duration-700 delay-700 ${rightPanelLoaded ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}>
                <h1 className="text-4xl font-bold mb-4 leading-tight">CLA Portal</h1>
              </div>
              <div className={`transition-all duration-700 delay-900 ${rightPanelLoaded ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}>
                <p className="text-xl text-white/90 mb-8 leading-relaxed">
                  Streamline your cargo and logistics operations with our comprehensive management platform
                </p>
              </div>
            </div>

            {/* Feature Icons with Tooltips */}
            <div className="grid grid-cols-2 gap-6 mb-8">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <div className={`text-center transition-all duration-500 delay-1100 hover:scale-110 cursor-pointer ${rightPanelLoaded ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}>
                      <Truck className="w-8 h-8 mx-auto mb-2 text-sky-300 transition-all duration-300 hover:text-sky-200" />
                      <p className="text-sm text-white/80 leading-relaxed">Fleet Management</p>
                    </div>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Manage your entire fleet with real-time tracking and maintenance scheduling</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>

              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <div className={`text-center transition-all duration-500 delay-1200 hover:scale-110 cursor-pointer ${rightPanelLoaded ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}>
                      <Globe className="w-8 h-8 mx-auto mb-2 text-sky-300 transition-all duration-300 hover:text-sky-200" />
                      <p className="text-sm text-white/80 leading-relaxed">Global Tracking</p>
                    </div>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Track shipments worldwide with GPS precision and delivery updates</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>

              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <div className={`text-center transition-all duration-500 delay-1300 hover:scale-110 cursor-pointer ${rightPanelLoaded ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}>
                      <BarChart3 className="w-8 h-8 mx-auto mb-2 text-sky-300 transition-all duration-300 hover:text-sky-200" />
                      <p className="text-sm text-white/80 leading-relaxed">Analytics</p>
                    </div>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Advanced analytics and reporting for data-driven decision making</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>

              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <div className={`text-center transition-all duration-500 delay-1400 hover:scale-110 cursor-pointer ${rightPanelLoaded ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}>
                      <Shield className="w-8 h-8 mx-auto mb-2 text-sky-300 transition-all duration-300 hover:text-sky-200" />
                      <p className="text-sm text-white/80 leading-relaxed">Secure Platform</p>
                    </div>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Enterprise-grade security with encrypted data and secure access controls</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>

            {/* Call to Action */}
            <div className={`space-y-4 transition-all duration-500 delay-1500 ${rightPanelLoaded ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}>
              <Button 
                variant="outline" 
                className="bg-white/10 border-white/30 text-white hover:bg-white/20 backdrop-blur-sm transition-all duration-300 hover:scale-105 hover:shadow-lg group"
              >
                Explore Features
                <ArrowRight className="w-4 h-4 ml-2 transition-transform duration-200 group-hover:translate-x-1" />
              </Button>
              <div className={`transition-all duration-500 delay-1600 ${rightPanelLoaded ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}>
                <p className="text-sm text-white/70 leading-relaxed">
                  Trusted by logistics companies worldwide
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Creative Footer */}
      <div className={`fixed bottom-0 left-0 right-0 z-40 transition-all duration-700 ease-in-out ${
        showFooter ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2 pointer-events-none'
      }`}>
        {/* Statistics Bar */}
        <div className="bg-gradient-to-r from-gray-900/95 via-gray-800/95 to-gray-900/95 dark:from-gray-950/95 dark:via-gray-900/95 dark:to-gray-950/95 backdrop-blur-md border-t border-white/10 dark:border-gray-700/30">
          <div className="max-w-7xl mx-auto px-6 py-2">
            <div className="flex items-center justify-between">
              {/* Left Side - Statistics */}
              <div className="flex items-center space-x-6">
                <div className="text-center group cursor-pointer">
                  <div className="text-lg font-bold text-white dark:text-gray-100 group-hover:text-sky-400 dark:group-hover:text-sky-300 transition-colors duration-300">
                    6,169
                  </div>
                  <div className="text-xs text-gray-400 uppercase tracking-wider">
                    Active Companies
                  </div>
                </div>
                <div className="w-px h-6 bg-gray-600 dark:bg-gray-700"></div>
                <div className="text-center group cursor-pointer">
                  <div className="text-lg font-bold text-white dark:text-gray-100 group-hover:text-sky-400 dark:group-hover:text-sky-300 transition-colors duration-300">
                    11,246
                  </div>
                  <div className="text-xs text-gray-400 uppercase tracking-wider">
                    Active Users
                  </div>
                </div>
              </div>

              {/* Center - eFeedback Button */}
              <div className="flex-1 flex justify-center">
                <Button 
                  className="bg-gradient-to-r from-sky-500 to-sky-600 dark:from-sky-600 dark:to-sky-700 hover:from-sky-600 hover:to-sky-700 dark:hover:from-sky-700 dark:hover:to-sky-800 text-white px-6 py-1 text-sm rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 font-semibold"
                >
                  eFeedback
                </Button>
              </div>

              {/* Right Side - Version Info */}
              <div className="text-right">
                <div className="text-xs text-gray-400">
                  Version: 23.11.16-01
                </div>
                <div className="text-xs text-gray-500 mt-1 max-w-xs">
                  CLAP.MY is best viewed using latest versions of Chrome, Firefox, Microsoft Edge
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation Bar */}
        <div className="bg-gradient-to-r from-sky-600 via-sky-700 to-sky-800 dark:from-gray-800 dark:via-gray-900 dark:to-gray-950 shadow-lg">
          <div className="max-w-7xl mx-auto px-6">
            <div className="flex items-center justify-between py-2">
              {/* Left Navigation */}
              <div className="flex items-center space-x-6">
                <div className="flex items-center space-x-1 text-white dark:text-gray-300 hover:text-sky-200 dark:hover:text-sky-400 cursor-pointer transition-colors duration-300 group">
                  <Building2 className="w-3 h-3 group-hover:scale-110 transition-transform duration-300" />
                  <span className="text-xs font-medium">CLA Members</span>
                </div>
                <div className="flex items-center space-x-1 text-white dark:text-gray-300 hover:text-sky-200 dark:hover:text-sky-400 cursor-pointer transition-colors duration-300 group">
                  <Globe className="w-3 h-3 group-hover:scale-110 transition-transform duration-300" />
                  <span className="text-xs font-medium">CLA Release</span>
                </div>
                <div className="flex items-center space-x-1 text-white dark:text-gray-300 hover:text-sky-200 dark:hover:text-sky-400 cursor-pointer transition-colors duration-300 group">
                  <BarChart3 className="w-3 h-3 group-hover:scale-110 transition-transform duration-300" />
                  <span className="text-xs font-medium">News</span>
                </div>
              </div>

              {/* Center - Copyright */}
              <div className="flex-1 text-center">
                <span className="text-white/80 dark:text-gray-400 text-xs font-medium">
                  2025 © Clap.my
                </span>
              </div>

              {/* Right Navigation */}
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-1 text-white dark:text-gray-300 hover:text-sky-200 dark:hover:text-sky-400 cursor-pointer transition-colors duration-300 group">
                  <User className="w-3 h-3 group-hover:scale-110 transition-transform duration-300" />
                  <span className="text-xs font-medium">User Manual</span>
                </div>
                <div className="flex items-center space-x-1 text-white dark:text-gray-300 hover:text-sky-200 dark:hover:text-sky-400 cursor-pointer transition-colors duration-300 group">
                  <Shield className="w-3 h-3 group-hover:scale-110 transition-transform duration-300" />
                  <span className="text-xs font-medium">About Us</span>
                </div>
                <div className="flex items-center space-x-1 text-white dark:text-gray-300 hover:text-sky-200 dark:hover:text-sky-400 cursor-pointer transition-colors duration-300 group">
                  <Search className="w-3 h-3 group-hover:scale-110 transition-transform duration-300" />
                  <span className="text-xs font-medium">FAQ</span>
                </div>
                <div className="flex items-center space-x-1 text-white dark:text-gray-300 hover:text-sky-200 dark:hover:text-sky-400 cursor-pointer transition-colors duration-300 group">
                  <Lock className="w-3 h-3 group-hover:scale-110 transition-transform duration-300" />
                  <span className="text-xs font-medium">Terms & Conditions</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Membership Registration Modal */}
      {showMembershipForm && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <MembershipForm onClose={() => setShowMembershipForm(false)} />
          </div>
        </div>
      )}
    </TooltipProvider>
  )
}

// Membership Registration Form Component
function MembershipForm({ onClose }: { onClose: () => void }) {
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState({
    // Personal Information
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    dateOfBirth: "",
    
    // Company Information
    companyName: "",
    companyType: "",
    registrationNo: "",
    businessType: "",
    monthlyContainers: "",
    
    // Address Information
    address: "",
    city: "",
    state: "",
    zipCode: "",
    country: "",
    
    // Additional Information
    referralSource: "",
    specialRequirements: "",
    agreeToTerms: false
  })

  const totalSteps = 4

  const updateFormData = (field: string, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const nextStep = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1)
    }
  }

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleSubmit = () => {
    // Handle form submission
    console.log("Membership form submitted:", formData)
    onClose()
  }

  return (
    <div className="p-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Join CLA Membership
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            Unlock exclusive benefits and streamline your logistics operations
          </p>
        </div>
        <Button
          onClick={onClose}
          variant="ghost"
          size="sm"
          className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
        >
          ✕
        </Button>
      </div>

      {/* Progress Indicator */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          {[1, 2, 3, 4].map((step) => (
            <div key={step} className="flex items-center">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold transition-all duration-300 ${
                  step <= currentStep
                    ? 'bg-emerald-500 text-white shadow-lg'
                    : 'bg-gray-200 dark:bg-gray-700 text-gray-500 dark:text-gray-400'
                }`}
              >
                {step < currentStep ? <Check className="w-5 h-5" /> : step}
              </div>
              {step < 4 && (
                <div
                  className={`h-1 w-20 mx-2 transition-all duration-300 ${
                    step < currentStep ? 'bg-emerald-500' : 'bg-gray-200 dark:bg-gray-700'
                  }`}
                />
              )}
            </div>
          ))}
        </div>
        <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400">
          <span>Personal Info</span>
          <span>Company Details</span>
          <span>Address</span>
          <span>Review</span>
        </div>
      </div>

      {/* Form Steps */}
      <div className="min-h-[400px]">
        {currentStep === 1 && (
          <div className="space-y-6 animate-in slide-in-from-right-5 duration-300">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
              Personal Information
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <Label htmlFor="firstName" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  First Name *
                </Label>
                <Input
                  id="firstName"
                  value={formData.firstName}
                  onChange={(e) => updateFormData('firstName', e.target.value)}
                  className="mt-1 h-12"
                  placeholder="Enter your first name"
                />
              </div>
              <div>
                <Label htmlFor="lastName" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Last Name *
                </Label>
                <Input
                  id="lastName"
                  value={formData.lastName}
                  onChange={(e) => updateFormData('lastName', e.target.value)}
                  className="mt-1 h-12"
                  placeholder="Enter your last name"
                />
              </div>
              <div>
                <Label htmlFor="email" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Email Address *
                </Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => updateFormData('email', e.target.value)}
                  className="mt-1 h-12"
                  placeholder="Enter your email address"
                />
              </div>
              <div>
                <Label htmlFor="phone" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Phone Number *
                </Label>
                <Input
                  id="phone"
                  value={formData.phone}
                  onChange={(e) => updateFormData('phone', e.target.value)}
                  className="mt-1 h-12"
                  placeholder="Enter your phone number"
                />
              </div>
              <div className="md:col-span-2">
                <Label htmlFor="dateOfBirth" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Date of Birth
                </Label>
                <Input
                  id="dateOfBirth"
                  type="date"
                  value={formData.dateOfBirth}
                  onChange={(e) => updateFormData('dateOfBirth', e.target.value)}
                  className="mt-1 h-12"
                />
              </div>
            </div>
          </div>
        )}

        {currentStep === 2 && (
          <div className="space-y-6 animate-in slide-in-from-right-5 duration-300">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
              Company Information
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <Label htmlFor="companyName" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Company Name *
                </Label>
                <Input
                  id="companyName"
                  value={formData.companyName}
                  onChange={(e) => updateFormData('companyName', e.target.value)}
                  className="mt-1 h-12"
                  placeholder="Enter your company name"
                />
              </div>
              <div>
                <Label htmlFor="companyType" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Company Type *
                </Label>
                <Select value={formData.companyType} onValueChange={(value) => updateFormData('companyType', value)}>
                  <SelectTrigger className="mt-1 h-12">
                    <SelectValue placeholder="Select company type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="logistics">Logistics Company</SelectItem>
                    <SelectItem value="shipping">Shipping Company</SelectItem>
                    <SelectItem value="freight">Freight Forwarder</SelectItem>
                    <SelectItem value="warehouse">Warehouse Operator</SelectItem>
                    <SelectItem value="manufacturer">Manufacturer</SelectItem>
                    <SelectItem value="retailer">Retailer</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="registrationNo" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Registration Number
                </Label>
                <Input
                  id="registrationNo"
                  value={formData.registrationNo}
                  onChange={(e) => updateFormData('registrationNo', e.target.value)}
                  className="mt-1 h-12"
                  placeholder="Enter registration number"
                />
              </div>
              <div>
                <Label htmlFor="businessType" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Business Type *
                </Label>
                <Select value={formData.businessType} onValueChange={(value) => updateFormData('businessType', value)}>
                  <SelectTrigger className="mt-1 h-12">
                    <SelectValue placeholder="Select business type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="import">Import</SelectItem>
                    <SelectItem value="export">Export</SelectItem>
                    <SelectItem value="both">Import & Export</SelectItem>
                    <SelectItem value="domestic">Domestic Only</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="md:col-span-2">
                <Label htmlFor="monthlyContainers" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Estimated Monthly Containers
                </Label>
                <Select value={formData.monthlyContainers} onValueChange={(value) => updateFormData('monthlyContainers', value)}>
                  <SelectTrigger className="mt-1 h-12">
                    <SelectValue placeholder="Select monthly container volume" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1-10">1-10 containers</SelectItem>
                    <SelectItem value="11-50">11-50 containers</SelectItem>
                    <SelectItem value="51-100">51-100 containers</SelectItem>
                    <SelectItem value="101-500">101-500 containers</SelectItem>
                    <SelectItem value="500+">500+ containers</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        )}

        {currentStep === 3 && (
          <div className="space-y-6 animate-in slide-in-from-right-5 duration-300">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
              Address Information
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="md:col-span-2">
                <Label htmlFor="address" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Street Address *
                </Label>
                <Input
                  id="address"
                  value={formData.address}
                  onChange={(e) => updateFormData('address', e.target.value)}
                  className="mt-1 h-12"
                  placeholder="Enter your street address"
                />
              </div>
              <div>
                <Label htmlFor="city" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  City *
                </Label>
                <Input
                  id="city"
                  value={formData.city}
                  onChange={(e) => updateFormData('city', e.target.value)}
                  className="mt-1 h-12"
                  placeholder="Enter your city"
                />
              </div>
              <div>
                <Label htmlFor="state" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  State/Province *
                </Label>
                <Input
                  id="state"
                  value={formData.state}
                  onChange={(e) => updateFormData('state', e.target.value)}
                  className="mt-1 h-12"
                  placeholder="Enter your state/province"
                />
              </div>
              <div>
                <Label htmlFor="zipCode" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  ZIP/Postal Code *
                </Label>
                <Input
                  id="zipCode"
                  value={formData.zipCode}
                  onChange={(e) => updateFormData('zipCode', e.target.value)}
                  className="mt-1 h-12"
                  placeholder="Enter your ZIP/postal code"
                />
              </div>
              <div>
                <Label htmlFor="country" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Country *
                </Label>
                <Input
                  id="country"
                  value={formData.country}
                  onChange={(e) => updateFormData('country', e.target.value)}
                  className="mt-1 h-12"
                  placeholder="Enter your country"
                />
              </div>
            </div>
          </div>
        )}

        {currentStep === 4 && (
          <div className="space-y-6 animate-in slide-in-from-right-5 duration-300">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
              Review & Submit
            </h3>
            <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-6 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="font-medium text-gray-700 dark:text-gray-300">Name:</span>
                  <span className="ml-2 text-gray-900 dark:text-white">
                    {formData.firstName} {formData.lastName}
                  </span>
                </div>
                <div>
                  <span className="font-medium text-gray-700 dark:text-gray-300">Email:</span>
                  <span className="ml-2 text-gray-900 dark:text-white">{formData.email}</span>
                </div>
                <div>
                  <span className="font-medium text-gray-700 dark:text-gray-300">Company:</span>
                  <span className="ml-2 text-gray-900 dark:text-white">{formData.companyName}</span>
                </div>
                <div>
                  <span className="font-medium text-gray-700 dark:text-gray-300">Phone:</span>
                  <span className="ml-2 text-gray-900 dark:text-white">{formData.phone}</span>
                </div>
              </div>
            </div>
            
            <div className="space-y-4">
              <div>
                <Label htmlFor="referralSource" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  How did you hear about us?
                </Label>
                <Select value={formData.referralSource} onValueChange={(value) => updateFormData('referralSource', value)}>
                  <SelectTrigger className="mt-1 h-12">
                    <SelectValue placeholder="Select referral source" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="search">Search Engine</SelectItem>
                    <SelectItem value="social">Social Media</SelectItem>
                    <SelectItem value="referral">Referral</SelectItem>
                    <SelectItem value="advertisement">Advertisement</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <Label htmlFor="specialRequirements" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Special Requirements (Optional)
                </Label>
                <textarea
                  id="specialRequirements"
                  value={formData.specialRequirements}
                  onChange={(e) => updateFormData('specialRequirements', e.target.value)}
                  className="mt-1 w-full h-24 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white resize-none"
                  placeholder="Any special requirements or comments..."
                />
              </div>
              
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="agreeToTerms"
                  checked={formData.agreeToTerms}
                  onCheckedChange={(checked) => updateFormData('agreeToTerms', checked as boolean)}
                />
                <Label htmlFor="agreeToTerms" className="text-sm text-gray-700 dark:text-gray-300">
                  I agree to the <span className="text-emerald-600 hover:underline cursor-pointer">Terms of Service</span> and <span className="text-emerald-600 hover:underline cursor-pointer">Privacy Policy</span>
                </Label>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Navigation Buttons */}
      <div className="flex justify-between mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
        <Button
          onClick={prevStep}
          variant="outline"
          disabled={currentStep === 1}
          className="px-6 py-2 h-12"
        >
          Previous
        </Button>
        
        <div className="flex space-x-3">
          <Button
            onClick={onClose}
            variant="ghost"
            className="px-6 py-2 h-12"
          >
            Cancel
          </Button>
          
          {currentStep < totalSteps ? (
            <Button
              onClick={nextStep}
              className="px-6 py-2 h-12 bg-emerald-500 hover:bg-emerald-600"
            >
              Next Step
            </Button>
          ) : (
            <Button
              onClick={handleSubmit}
              disabled={!formData.agreeToTerms}
              className="px-6 py-2 h-12 bg-emerald-500 hover:bg-emerald-600 disabled:opacity-50"
            >
              Submit Application
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}
