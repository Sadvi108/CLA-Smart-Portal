import Link from "next/link"
import { Button } from "@/components/ui/button"

export function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-sky-200/40 bg-gradient-to-r from-sky-600/90 via-sky-700/90 to-sky-800/90 backdrop-blur-lg shadow-lg">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/20 shadow-md">
              <svg className="h-5 w-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <span className="text-xl font-bold text-white">StreamLine</span>
          </div>

          <nav className="hidden items-center gap-8 md:flex">
            <Link href="#features" className="text-sm text-sky-100 transition-colors hover:text-white">
              Features
            </Link>
            <Link
              href="#testimonials"
              className="text-sm text-sky-100 transition-colors hover:text-white"
            >
              Testimonials
            </Link>
            <Link href="#pricing" className="text-sm text-sky-100 transition-colors hover:text-white">
              Pricing
            </Link>
            <Link href="#" className="text-sm text-sky-100 transition-colors hover:text-white">
              Docs
            </Link>
          </nav>

          <div className="flex items-center gap-4">
            <Button variant="ghost" size="sm" className="hidden sm:inline-flex text-white hover:bg-white/10 hover:text-white">
              Sign In
            </Button>
            <Button size="sm" className="bg-white text-sky-700 hover:bg-sky-50 hover:text-sky-800 shadow-md">Get Started</Button>
          </div>
        </div>
      </div>
    </header>
  )
}
