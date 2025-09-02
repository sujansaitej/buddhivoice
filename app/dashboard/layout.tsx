'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  LayoutDashboard, 
  Users, 
  UserCheck, 
  Building2, 
  Phone, 
  PhoneCall, 
  FileAudio, 
  Music, 
  Users2, 
  Ban, 
  ClipboardList, 
  Contact, 
  Settings, 
  BookOpen, 
  Megaphone, 
  Bell, 
  Ticket, 
  UserPlus, 
  Database, 
  FileText, 
  BarChart3, 
  PhoneMissed, 
  PhoneIncoming, 
  PhoneOutgoing, 
  Building, 
  User, 
  MessageSquare, 
  ArrowRightLeft, 
  ArrowRight,
  LogIn, 
  Clock, 
  Monitor, 
  Activity, 
  Key, 
  Code, 
  Puzzle, 
  Store, 
  PhoneForwarded,
  Menu,
  X,
  LogOut,
  Sun,
  Moon
} from 'lucide-react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'

interface DashboardLayoutProps {
  children: React.ReactNode
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const [isDarkMode, setIsDarkMode] = useState(true)
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('')
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const pathname = usePathname()
  const router = useRouter()

  useEffect(() => {
    const body = document.body
    body.className = isDarkMode ? 'dark' : 'light'
    
    // Check authentication
    const authStatus = localStorage.getItem('isAuthenticated')
    if (authStatus !== 'true') {
      router.push('/login')
    } else {
      setIsAuthenticated(true)
    }
  }, [isDarkMode, router])

  const sidebarItems = [
    {
      title: 'Dashboard',
      icon: LayoutDashboard,
      href: '/dashboard',
      children: []
    },
    {
      title: 'Management',
      icon: Users,
      children: [
        { title: 'Sub Admin', href: '/dashboard/management/sub-admin' },
        { title: 'Department', href: '/dashboard/management/department' },
        { title: 'User', href: '/dashboard/management/user' }
      ]
    },
    {
      title: 'Telephony',
      icon: Phone,
      children: [
        { title: 'DID Numbers', href: '/dashboard/telephony/did-numbers' },
        { title: 'Call Flow', href: '/dashboard/telephony/call-flow' },
        { title: 'Audio files', href: '/dashboard/telephony/audio-files' },
        { title: 'MOH', href: '/dashboard/telephony/moh' },
        { title: 'Smart group', href: '/dashboard/telephony/smart-group' },
        { title: 'Black List', href: '/dashboard/telephony/black-list' },
        { title: 'Call Task', href: '/dashboard/telephony/call-task' },
        { title: 'Contacts', href: '/dashboard/telephony/contacts' },
        { title: 'Settings', href: '/dashboard/telephony/settings' }
      ]
    },
    {
      title: 'Callcenter',
      icon: PhoneCall,
      children: [
        { title: 'Phonebook', href: '/dashboard/callcenter/phonebook' },
        { title: 'Campaign', href: '/dashboard/callcenter/campaign' },
        { title: 'Reminder', href: '/dashboard/callcenter/reminder' }
      ]
    },
    {
      title: 'CRM',
      icon: BookOpen,
      children: [
        { title: 'Tickets', href: '/dashboard/crm/tickets' },
        { title: 'Leads', href: '/dashboard/crm/leads' },
        { title: 'Customers', href: '/dashboard/crm/customers' },
        { title: 'Data Forms', href: '/dashboard/crm/data-forms' },
        { title: 'Settings', href: '/dashboard/crm/settings' }
      ]
    },
    {
      title: 'Reports',
      icon: BarChart3,
      children: [
        { title: 'Live Call Report', href: '/dashboard/reports/live-call-report' },
        { title: 'Missed Call Report', href: '/dashboard/reports/missed-call-report' },
        { title: 'Unique Missed Calls', href: '/dashboard/reports/unique-missed-calls' },
        { title: 'Incoming Call Report', href: '/dashboard/reports/incoming-call-report' },
        { title: 'Outgoing Call Report', href: '/dashboard/reports/outgoing-call-report' },
        { title: 'Department Summary', href: '/dashboard/reports/department-summary' },
        { title: 'User Summary', href: '/dashboard/reports/user-summary' },
        { title: 'SMS Report', href: '/dashboard/reports/sms-report' },
        { title: 'Transfer Report', href: '/dashboard/reports/transfer-report' },
        { title: 'Login-Logout Report', href: '/dashboard/reports/login-logout-report' },
        { title: 'Missed Call Summary', href: '/dashboard/reports/missed-call-summary' },
        { title: 'Hourly Call Report', href: '/dashboard/reports/hourly-call-report' },
        { title: 'User Monitoring', href: '/dashboard/reports/user-monitoring' },
        { title: 'User Activities', href: '/dashboard/reports/user-activities' }
      ]
    },
    {
      title: 'Developer',
      icon: Code,
      children: [
        { title: 'Token', href: '/dashboard/developer/token' },
        { title: 'API Management', href: '/dashboard/developer/api-management' },
        { title: 'Integration', href: '/dashboard/developer/integration' },
        { title: 'Market Place', href: '/dashboard/developer/market-place' },
        { title: 'Click to Call', href: '/dashboard/developer/click-to-call' }
      ]
    }
  ]

  const handleLogout = () => {
    // Handle logout logic here
    console.log('Logging out...')
    localStorage.removeItem('isAuthenticated')
    window.location.href = '/'
  }

  // Show loading or redirect if not authenticated
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    )
  }

  return (
    <div className={`min-h-screen transition-all duration-500 ${isDarkMode ? 'dark' : 'light'}`}>
      {/* Sidebar */}
      <div className={`fixed inset-y-0 left-0 z-50 w-64 transition-transform duration-300 ${
        sidebarOpen ? 'translate-x-0' : '-translate-x-full'
      } lg:translate-x-0`}>
        <div className={`h-full ${isDarkMode ? 'bg-gray-900' : 'bg-white'} border-r ${isDarkMode ? 'border-gray-700' : 'border-gray-200'}`}>
          {/* Sidebar Header */}
          <div className={`flex items-center justify-between h-16 px-6 border-b ${isDarkMode ? 'border-gray-700' : 'border-gray-200'}`}>
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-br from-red-500 to-red-700 rounded-lg flex items-center justify-center">
                <Phone className="w-5 h-5 text-white" />
              </div>
              <span className={`text-xl font-bold ${isDarkMode ? 'text-white' : 'text-black'}`}>
                BuddhiVoice
              </span>
            </div>
            <button
              onClick={() => setSidebarOpen(false)}
              className="lg:hidden p-1 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700"
              title="Close sidebar"
            >
              <X className={`w-5 h-5 ${isDarkMode ? 'text-white' : 'text-gray-600'}`} />
            </button>
          </div>

          {/* Sidebar Navigation */}
          <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto">
            {sidebarItems.map((item, index) => (
              <div key={item.title}>
                {item.href ? (
                  <Link
                    href={item.href}
                    className={`w-full flex items-center space-x-3 px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                      pathname === item.href
                        ? `${isDarkMode ? 'bg-red-600 text-white' : 'bg-red-100 text-red-700'}`
                        : `${isDarkMode ? 'text-gray-300 hover:bg-gray-700 hover:text-white' : 'text-gray-700 hover:bg-gray-100 hover:text-black'}`
                    }`}
                  >
                    <item.icon className="w-5 h-5" />
                    <span>{item.title}</span>
                  </Link>
                ) : (
                  <button
                    onClick={() => setActiveSection(activeSection === item.title ? '' : item.title)}
                    className={`w-full flex items-center justify-between px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                      activeSection === item.title
                        ? `${isDarkMode ? 'bg-red-600 text-white' : 'bg-red-100 text-red-700'}`
                        : `${isDarkMode ? 'text-gray-300 hover:bg-gray-700 hover:text-white' : 'text-gray-700 hover:bg-gray-100 hover:text-black'}`
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <item.icon className="w-5 h-5" />
                      <span>{item.title}</span>
                    </div>
                    {item.children.length > 0 && (
                      <motion.div
                        animate={{ rotate: activeSection === item.title ? 90 : 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        <ArrowRight className="w-4 h-4" />
                      </motion.div>
                    )}
                  </button>
                )}

                {/* Submenu */}
                <AnimatePresence>
                  {activeSection === item.title && item.children.length > 0 && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.2 }}
                      className="ml-6 mt-2 space-y-1"
                    >
                      {item.children.map((child) => (
                        <Link
                          key={child.href}
                          href={child.href}
                          className={`block px-3 py-2 text-sm rounded-lg transition-colors ${
                            pathname === child.href
                              ? `${isDarkMode ? 'bg-red-600/20 text-red-400' : 'bg-red-50 text-red-600'}`
                              : `${isDarkMode ? 'text-gray-400 hover:bg-gray-700 hover:text-white' : 'text-gray-600 hover:bg-gray-100 hover:text-black'}`
                          }`}
                        >
                          {child.title}
                        </Link>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </nav>

          {/* Sidebar Footer */}
          <div className={`p-4 border-t ${isDarkMode ? 'border-gray-700' : 'border-gray-200'}`}>
            <button
              onClick={handleLogout}
              className={`w-full flex items-center space-x-3 px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                isDarkMode ? 'text-gray-300 hover:bg-gray-700 hover:text-white' : 'text-gray-700 hover:bg-gray-100 hover:text-black'
              }`}
            >
              <LogOut className="w-5 h-5" />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="lg:ml-64">
        {/* Top Bar */}
        <header className={`h-16 border-b ${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} flex items-center justify-between px-6`}>
          <div className="flex items-center space-x-4">
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700"
              title="Open sidebar"
            >
              <Menu className={`w-5 h-5 ${isDarkMode ? 'text-white' : 'text-gray-600'}`} />
            </button>
            <h1 className={`text-xl font-semibold ${isDarkMode ? 'text-white' : 'text-black'}`}>
              Dashboard
            </h1>
          </div>

          <div className="flex items-center space-x-4">
            {/* Back to Home Button */}
            <Link
              href="/"
              className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                isDarkMode 
                  ? 'bg-white/10 hover:bg-white/20 text-white' 
                  : 'bg-gray-200 hover:bg-gray-300 text-gray-700'
              }`}
            >
              Back to Home
            </Link>

            {/* Theme Toggle */}
            <button
              onClick={() => setIsDarkMode(!isDarkMode)}
              className={`p-2 rounded-lg transition-colors ${
                isDarkMode ? 'bg-white/10 hover:bg-white/20' : 'bg-gray-200 hover:bg-gray-300'
              }`}
            >
              {isDarkMode ? (
                <Sun className="w-5 h-5 text-white" />
              ) : (
                <Moon className="w-5 h-5 text-gray-700" />
              )}
            </button>

            {/* User Profile */}
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-red-500 rounded-full flex items-center justify-center">
                <span className="text-white text-sm font-medium">A</span>
              </div>
              <span className={`text-sm font-medium ${isDarkMode ? 'text-white' : 'text-black'}`}>
                Admin User
              </span>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="p-6">
          {children}
        </main>
      </div>

      {/* Mobile Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black bg-opacity-50 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  )
}
