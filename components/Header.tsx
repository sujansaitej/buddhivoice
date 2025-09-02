'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, Sun, Moon, Phone, MessageCircle, Users, BarChart3 } from 'lucide-react'

interface HeaderProps {
  isDarkMode: boolean
  setIsDarkMode: (value: boolean) => void
}

export default function Header({ isDarkMode, setIsDarkMode }: HeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navItems = [
    { name: 'Telephony', href: '#telephony', icon: Phone },
    { name: 'Call Center', href: '#call-center', icon: Users },
    { name: 'Lead Management', href: '#lead-management', icon: BarChart3 },
    { name: 'AI IVR', href: '#ai-ivr', icon: MessageCircle },
    { name: 'Contact', href: '#contact', icon: Phone },
  ]

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? (isDarkMode ? 'glassmorphism-dark' : 'bg-white/90 backdrop-blur-md border-b border-gray-200') 
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="flex items-center space-x-2"
          >
            <div className="w-10 h-10 bg-gradient-to-br from-red-500 to-red-700 rounded-xl flex items-center justify-center">
              <Phone className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-bold gradient-text">BuddhiVoice</span>
          </motion.div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <motion.a
                key={item.name}
                href={item.href}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`flex items-center space-x-2 transition-colors duration-200 ${
                  isDarkMode ? 'text-white/80 hover:text-white' : 'text-gray-700 hover:text-gray-900'
                }`}
              >
                <item.icon className="w-4 h-4" />
                <span>{item.name}</span>
              </motion.a>
            ))}
          </nav>

          {/* Right side buttons */}
          <div className="flex items-center space-x-4">
            {/* Dark mode toggle */}
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setIsDarkMode(!isDarkMode)}
              className={`p-2 rounded-lg transition-colors duration-200 ${
                isDarkMode ? 'bg-white/10 hover:bg-white/20' : 'bg-gray-200 hover:bg-gray-300'
              }`}
            >
              {isDarkMode ? <Sun className={`w-5 h-5 ${isDarkMode ? 'text-white' : 'text-gray-700'}`} /> : <Moon className={`w-5 h-5 ${isDarkMode ? 'text-white' : 'text-gray-700'}`} />}
            </motion.button>

            {/* CTA Buttons */}
            <div className="hidden md:flex items-center space-x-3">
              <motion.a
                href="/login"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  isDarkMode 
                    ? 'text-white/80 hover:text-white hover:bg-white/10' 
                    : 'text-gray-700 hover:text-gray-900 hover:bg-gray-100'
                }`}
              >
                Login
              </motion.a>
              <motion.a
                href="/login"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="btn-primary"
              >
                Get Started
              </motion.a>
            </div>

            {/* Mobile menu button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={`md:hidden p-2 rounded-lg transition-colors duration-200 ${
                isDarkMode ? 'bg-white/10 hover:bg-white/20' : 'bg-gray-200 hover:bg-gray-300'
              }`}
            >
              {isMobileMenuOpen ? <X className={`w-5 h-5 ${isDarkMode ? 'text-white' : 'text-gray-700'}`} /> : <Menu className={`w-5 h-5 ${isDarkMode ? 'text-white' : 'text-gray-700'}`} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className={`md:hidden ${isDarkMode ? 'glassmorphism-dark border-t border-white/10' : 'bg-white/90 border-t border-gray-200'} backdrop-blur-md rounded-2xl`}
          >
            <div className="px-4 py-6 space-y-4">
              {navItems.map((item) => (
                <motion.a
                  key={item.name}
                  href={item.href}
                  whileHover={{ x: 10 }}
                  className={`flex items-center space-x-3 transition-colors duration-200 py-2 ${
                    isDarkMode ? 'text-white/80 hover:text-white' : 'text-gray-700 hover:text-gray-900'
                  }`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <item.icon className="w-5 h-5" />
                  <span className="text-lg">{item.name}</span>
                </motion.a>
              ))}
              <div className="flex flex-col space-y-3 mt-4">
                <motion.a
                  href="/login"
                  whileHover={{ scale: 1.02 }}
                  className={`w-full text-center py-2 px-4 rounded-lg font-medium transition-colors ${
                    isDarkMode 
                      ? 'text-white/80 hover:text-white hover:bg-white/10' 
                      : 'text-gray-700 hover:text-gray-900 hover:bg-gray-100'
                  }`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Login
                </motion.a>
                <motion.a
                  href="/login"
                  whileHover={{ scale: 1.02 }}
                  className="btn-primary w-full"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Get Started
                </motion.a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  )
}
