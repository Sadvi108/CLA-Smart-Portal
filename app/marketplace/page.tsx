"use client"

import React, { useState } from 'react'
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { 
  ShoppingBag, 
  Shield, 
  Container, 
  Upload, 
  FileText, 
  TrendingUp, 
  Settings, 
  Truck, 
  CreditCard, 
  Star, 
  ArrowRight, 
  Search,
  Filter,
  Grid3X3,
  List,
  Zap,
  Award,
  Users,
  Globe
} from 'lucide-react'

// Service categories data based on the original portal
const serviceCategories = [
  {
    id: 'e-assure',
    title: 'e-Assure',
    subtitle: 'CLA Response',
    description: 'Comprehensive cargo insurance and assurance services',
    icon: Shield,
    color: 'from-purple-500 to-purple-600',
    bgColor: 'bg-purple-50 dark:bg-purple-900/20',
    borderColor: 'border-purple-200 dark:border-purple-800',
    features: ['Cargo Protection', 'Risk Assessment', 'Claims Processing'],
    rating: 4.9,
    users: '2.5k+'
  },
  {
    id: 'container-logistics',
    title: 'Container Logistics Ecosystem',
    subtitle: '(CLE)',
    description: 'Complete container management and logistics solutions',
    icon: Container,
    color: 'from-red-500 to-red-600',
    bgColor: 'bg-red-50 dark:bg-red-900/20',
    borderColor: 'border-red-200 dark:border-red-800',
    features: ['Container Tracking', 'Route Optimization', 'Fleet Management'],
    rating: 4.8,
    users: '3.2k+'
  },
  {
    id: 'upload-invoices',
    title: 'Upload Invoices',
    subtitle: 'Upload your local & customs invoices',
    description: 'Streamlined invoice management and processing system',
    icon: Upload,
    color: 'from-blue-500 to-blue-600',
    bgColor: 'bg-blue-50 dark:bg-blue-900/20',
    borderColor: 'border-blue-200 dark:border-blue-800',
    features: ['Bulk Upload', 'Auto Processing', 'Digital Archive'],
    rating: 4.7,
    users: '1.8k+'
  },
  {
    id: 'doc',
    title: 'DOC',
    subtitle: 'Complete DOC',
    description: 'Document management and compliance solutions',
    icon: FileText,
    color: 'from-teal-500 to-teal-600',
    bgColor: 'bg-teal-50 dark:bg-teal-900/20',
    borderColor: 'border-teal-200 dark:border-teal-800',
    features: ['Document Storage', 'Compliance Check', 'Digital Signatures'],
    rating: 4.6,
    users: '2.1k+'
  },
  {
    id: 'tds',
    title: 'TDS',
    subtitle: 'Trailer Operation Services',
    description: 'Advanced trailer and transport management services',
    icon: Truck,
    color: 'from-blue-400 to-blue-500',
    bgColor: 'bg-blue-50 dark:bg-blue-900/20',
    borderColor: 'border-blue-200 dark:border-blue-800',
    features: ['Fleet Tracking', 'Maintenance Alerts', 'Route Planning'],
    rating: 4.5,
    users: '1.5k+'
  },
  {
    id: 'cpc-repair',
    title: 'CPC REPAIR',
    subtitle: 'Repair Coverage',
    description: 'Comprehensive repair and maintenance coverage',
    icon: Settings,
    color: 'from-teal-400 to-teal-500',
    bgColor: 'bg-teal-50 dark:bg-teal-900/20',
    borderColor: 'border-teal-200 dark:border-teal-800',
    features: ['Emergency Repairs', '24/7 Support', 'Parts Coverage'],
    rating: 4.4,
    users: '980+'
  },
  {
    id: 'ddm',
    title: 'DDM',
    subtitle: 'Damage Assessment',
    description: 'Digital damage management and assessment tools',
    icon: TrendingUp,
    color: 'from-cyan-400 to-cyan-500',
    bgColor: 'bg-cyan-50 dark:bg-cyan-900/20',
    borderColor: 'border-cyan-200 dark:border-cyan-800',
    features: ['AI Assessment', 'Photo Analysis', 'Report Generation'],
    rating: 4.3,
    users: '750+'
  },
  {
    id: 'cla-premium',
    title: 'CLA PREMIUM',
    subtitle: 'Unlimited Container Release Access',
    description: 'Premium access to all container release services',
    icon: Star,
    color: 'from-purple-600 to-purple-700',
    bgColor: 'bg-purple-50 dark:bg-purple-900/20',
    borderColor: 'border-purple-200 dark:border-purple-800',
    features: ['Priority Access', 'Unlimited Releases', 'Premium Support'],
    rating: 4.9,
    users: '5.2k+'
  },
  {
    id: 'cla-cpc-tor',
    title: 'CLA-CPC-TOR',
    subtitle: 'Transport Operations',
    description: 'Integrated transport and operations management',
    icon: Truck,
    color: 'from-red-400 to-red-500',
    bgColor: 'bg-red-50 dark:bg-red-900/20',
    borderColor: 'border-red-200 dark:border-red-800',
    features: ['Operations Control', 'Real-time Tracking', 'Performance Analytics'],
    rating: 4.6,
    users: '1.9k+'
  },
  {
    id: 'cla-cs-tor',
    title: 'CLA-CS-TOR',
    subtitle: 'Customer Service Operations',
    description: 'Enhanced customer service and support solutions',
    icon: Users,
    color: 'from-blue-500 to-blue-600',
    bgColor: 'bg-blue-50 dark:bg-blue-900/20',
    borderColor: 'border-blue-200 dark:border-blue-800',
    features: ['24/7 Support', 'Multi-channel Service', 'Customer Analytics'],
    rating: 4.7,
    users: '2.8k+'
  },
  {
    id: 'lpkc-cla-tor',
    title: 'LPKC-CLA-TOR',
    subtitle: 'Logistics Partnership',
    description: 'Strategic logistics partnership and collaboration tools',
    icon: Globe,
    color: 'from-teal-500 to-teal-600',
    bgColor: 'bg-teal-50 dark:bg-teal-900/20',
    borderColor: 'border-teal-200 dark:border-teal-800',
    features: ['Partner Network', 'Collaboration Tools', 'Shared Resources'],
    rating: 4.5,
    users: '1.3k+'
  },
  {
    id: 'icargo-plus',
    title: 'iCargo+',
    subtitle: 'Buy cargo insurance coverage',
    description: 'Advanced cargo insurance with comprehensive coverage',
    icon: Shield,
    color: 'from-blue-600 to-blue-700',
    bgColor: 'bg-blue-50 dark:bg-blue-900/20',
    borderColor: 'border-blue-200 dark:border-blue-800',
    features: ['Full Coverage', 'Instant Claims', 'Global Protection'],
    rating: 4.8,
    users: '4.1k+'
  }
]

export default function MarketplacePage() {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')

  const filteredServices = serviceCategories.filter(service => 
    service.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    service.description.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-50/30 via-white to-sky-50/20 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 p-4 lg:p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Hero Section */}
        <div className="text-center space-y-6">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-sky-500 to-sky-600 rounded-3xl shadow-2xl mb-6">
            <ShoppingBag className="h-10 w-10 text-white" />
          </div>
          <div className="space-y-4">
            <h1 className="text-5xl font-bold bg-gradient-to-r from-sky-600 via-sky-700 to-sky-800 bg-clip-text text-transparent">
              Marketplace
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto leading-relaxed">
              Discover premium industry solutions designed to streamline your logistics operations. 
              From cargo insurance to container management, find the perfect tools for your business.
            </p>
          </div>
          
          {/* Stats */}
          <div className="flex flex-wrap justify-center gap-8 mt-8">
            <div className="text-center">
              <div className="text-3xl font-bold text-sky-600 dark:text-sky-400">12+</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Services</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-sky-600 dark:text-sky-400">25k+</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Active Users</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-sky-600 dark:text-sky-400">4.7</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Avg Rating</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-sky-600 dark:text-sky-400">99.9%</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Uptime</div>
            </div>
          </div>
        </div>

        {/* Search and Filter Bar */}
        <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl shadow-xl border border-sky-100 dark:border-gray-700 p-6">
          <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
            <div className="flex-1 relative max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search services..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-sky-500 focus:border-transparent transition-all duration-300"
              />
            </div>
            
            <div className="flex items-center gap-3">
              <Button
                variant="outline"
                size="sm"
                className="flex items-center gap-2"
              >
                <Filter className="h-4 w-4" />
                Filter
              </Button>
              
              <div className="flex items-center bg-gray-100 dark:bg-gray-700 rounded-lg p-1">
                <Button
                  variant={viewMode === 'grid' ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setViewMode('grid')}
                  className="p-2"
                >
                  <Grid3X3 className="h-4 w-4" />
                </Button>
                <Button
                  variant={viewMode === 'list' ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setViewMode('list')}
                  className="p-2"
                >
                  <List className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Services Grid */}
        <div className={`grid gap-6 ${viewMode === 'grid' ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4' : 'grid-cols-1'}`}>
          {filteredServices.map((service, index) => {
            const Icon = service.icon
            return (
              <Card 
                key={service.id}
                className={`group relative overflow-hidden ${service.bgColor} ${service.borderColor} border-2 hover:shadow-2xl hover:shadow-sky-500/10 transition-all duration-500 hover:scale-105 hover:-translate-y-2 cursor-pointer`}
                style={{
                  animationDelay: `${index * 100}ms`
                }}
              >
                <CardContent className="p-6 space-y-4">
                  {/* Header */}
                  <div className="flex items-start justify-between">
                    <div className={`p-3 rounded-xl bg-gradient-to-br ${service.color} shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                      <Icon className="h-6 w-6 text-white" />
                    </div>
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 text-yellow-400 fill-current" />
                      <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                        {service.rating}
                      </span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="space-y-2">
                    <div>
                      <h3 className="text-lg font-bold text-gray-900 dark:text-white group-hover:text-sky-600 dark:group-hover:text-sky-400 transition-colors duration-300">
                        {service.title}
                      </h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400 font-medium">
                        {service.subtitle}
                      </p>
                    </div>
                    <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
                      {service.description}
                    </p>
                  </div>

                  {/* Features */}
                  <div className="space-y-2">
                    {service.features.map((feature, idx) => (
                      <div key={idx} className="flex items-center gap-2">
                        <Zap className="h-3 w-3 text-sky-500" />
                        <span className="text-xs text-gray-600 dark:text-gray-400">{feature}</span>
                      </div>
                    ))}
                  </div>

                  {/* Footer */}
                  <div className="flex items-center justify-between pt-4 border-t border-gray-200 dark:border-gray-700">
                    <div className="flex items-center gap-2">
                      <Users className="h-4 w-4 text-gray-500" />
                      <span className="text-sm text-gray-600 dark:text-gray-400">{service.users} users</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant="secondary" className="text-xs bg-sky-100 dark:bg-sky-900/30 text-sky-700 dark:text-sky-300 border-sky-200 dark:border-sky-800">
                        Available
                      </Badge>
                      <div className={`w-2 h-2 rounded-full bg-gradient-to-r ${service.color} animate-pulse`} />
                    </div>
                  </div>

                  {/* Hover Effect Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-br from-sky-500/5 to-sky-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                </CardContent>
              </Card>
            )
          })}
        </div>

        {/* Call to Action */}
        <div className="text-center space-y-6 py-12">
          <div className="space-y-4">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
              Ready to Transform Your Operations?
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Join thousands of businesses already using our premium marketplace solutions to streamline their logistics operations.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-gradient-to-r from-sky-500 to-sky-600 text-white hover:from-sky-600 hover:to-sky-700 shadow-lg hover:shadow-xl transition-all duration-300">
              <Award className="h-5 w-5 mr-2" />
              Get Premium Access
            </Button>
            <Button size="lg" variant="outline" className="border-sky-200 dark:border-sky-800 hover:bg-sky-50 dark:hover:bg-sky-900/20">
              Learn More
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}