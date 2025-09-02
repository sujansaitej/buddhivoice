'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Eye, EyeOff, Phone, Mail, Lock, ArrowRight } from 'lucide-react'
import Link from 'next/link'

export default function LoginPage() {
  const [isDarkMode, setIsDarkMode] = useState(true)
  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false
  })
  const [errors, setErrors] = useState<{ [key: string]: string }>({})

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!validateForm()) return

    localStorage.setItem('isAuthenticated', 'true')
    if (formData.rememberMe) {
      localStorage.setItem('rememberMe', 'true')
    }
    window.location.href = '/dashboard'
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target
    setFormData({ ...formData, [name]: type === 'checkbox' ? checked : value })

    if (errors[name]) {
      setErrors({ ...errors, [name]: '' })
    }
  }

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {}
    if (!formData.email) {
      newErrors.email = 'Email is required'
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid'
    }
    if (!formData.password) {
      newErrors.password = 'Password is required'
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters'
    }
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  return (
    <div className={`min-h-screen relative ${isDarkMode ? 'bg-black text-white' : 'bg-gray-50 text-black'}`}>
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          animate={{ backgroundPosition: ['0% 0%', '100% 100%'] }}
          transition={{ duration: 20, repeat: Infinity, repeatType: 'reverse' }}
          className={`absolute inset-0 ${
            isDarkMode
              ? 'bg-gradient-to-br from-red-500/10 via-purple-500/10 to-red-700/10'
              : 'bg-gradient-to-br from-red-200 via-pink-200 to-red-300'
          }`}
          style={{ backgroundSize: '400% 400%' }}
        />
      </div>

      {/* Centered Card */}
      <div className="relative z-10 min-h-screen flex items-center justify-center px-4">
        <div className="max-w-md w-full space-y-8">
          {/* Header */}
          <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="text-center">
            <div className="flex justify-center items-center space-x-3 mb-6">
              <div className="w-12 h-12 bg-gradient-to-br from-red-500 to-red-700 rounded-xl flex items-center justify-center shadow-lg shadow-red-500/30">
                <Phone className="w-7 h-7 text-white" />
              </div>
              <span className="text-3xl font-extrabold bg-gradient-to-r from-red-400 to-red-600 bg-clip-text text-transparent">
                BuddhiVoice
              </span>
            </div>
            <h2 className="text-3xl font-bold">Welcome Back</h2>
            <p className="mt-2 text-white/60">Sign in to your account to continue</p>
          </motion.div>

          {/* Login Form */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="p-8 rounded-2xl backdrop-blur-lg bg-white/5 border border-white/10 shadow-xl">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Email */}
              <div>
                <label htmlFor="email" className="block text-sm font-medium mb-2 text-white/80">Email Address</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3.5 h-5 w-5 text-white/40" />
                  <input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className={`w-full pl-10 pr-3 py-3 rounded-xl bg-white/10 border ${
                      errors.email ? 'border-red-500' : 'border-white/20'
                    } text-white placeholder-white/40 focus:ring-2 focus:ring-red-500 outline-none`}
                    placeholder="Enter your email"
                  />
                </div>
                {errors.email && <p className="mt-1 text-sm text-red-500">{errors.email}</p>}
              </div>

              {/* Password */}
              <div>
                <label htmlFor="password" className="block text-sm font-medium mb-2 text-white/80">Password</label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3.5 h-5 w-5 text-white/40" />
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? 'text' : 'password'}
                    value={formData.password}
                    onChange={handleInputChange}
                    className={`w-full pl-10 pr-12 py-3 rounded-xl bg-white/10 border ${
                      errors.password ? 'border-red-500' : 'border-white/20'
                    } text-white placeholder-white/40 focus:ring-2 focus:ring-red-500 outline-none`}
                    placeholder="Enter your password"
                  />
                  <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute inset-y-0 right-3 flex items-center text-white/40 hover:text-white/70">
                    {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                </div>
                {errors.password && <p className="mt-1 text-sm text-red-500">{errors.password}</p>}
              </div>

              {/* Remember Me & Forgot Password */}
              <div className="flex items-center justify-between text-sm">
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    name="rememberMe"
                    checked={formData.rememberMe}
                    onChange={handleInputChange}
                    className="h-4 w-4 rounded bg-white/10 border-white/20 text-red-500 focus:ring-red-500"
                  />
                  <span className="text-white/70">Remember me</span>
                </label>
                <Link href="/forgot-password" className="text-red-400 hover:text-red-300 transition-colors">
                  Forgot password?
                </Link>
              </div>

              {/* Submit */}
              <motion.button
                type="submit"
                whileHover={{ scale: 1.03, boxShadow: '0 0 20px rgba(239, 68, 68, 0.5)' }}
                whileTap={{ scale: 0.97 }}
                className="w-full flex items-center justify-center py-3 rounded-xl bg-gradient-to-r from-red-500 to-red-700 text-white font-semibold shadow-md shadow-red-500/30"
              >
                Sign In <ArrowRight className="ml-2 w-5 h-5" />
              </motion.button>
            </form>

            {/* Divider */}
            <div className="my-6 relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-white/20" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-black/70 text-white/60">Or continue with</span>
              </div>
            </div>

            {/* Social Logins */}
            <div className="grid grid-cols-2 gap-3">
              <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }} className="flex items-center justify-center py-2 px-4 rounded-xl bg-white/10 border border-white/20 text-white hover:bg-white/20">
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92..."/></svg>
                <span className="ml-2">Google</span>
              </motion.button>
              <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }} className="flex items-center justify-center py-2 px-4 rounded-xl bg-white/10 border border-white/20 text-white hover:bg-white/20">
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor"><path d="M24 12.073c0-6.627-5.373-12-12-12..."/></svg>
                <span className="ml-2">Facebook</span>
              </motion.button>
            </div>
          </motion.div>

          {/* Signup Link */}
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center text-white/70">
            Don&apos;t have an account?{' '}
            <Link href="/register" className="text-red-400 hover:text-red-300 font-medium">Sign up here</Link>
          </motion.div>

          {/* Theme Toggle */}
          <motion.button
            onClick={() => setIsDarkMode(!isDarkMode)}
            whileHover={{ scale: 1.1 }}
            className="fixed top-4 right-4 p-3 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-md shadow-md"
          >
            {isDarkMode ? (
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1..." />
              </svg>
            ) : (
              <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354..." />
              </svg>
            )}
          </motion.button>
        </div>
      </div>
    </div>
  )
}
