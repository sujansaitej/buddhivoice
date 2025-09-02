'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Header from '../components/Header'
import Hero from '../components/Hero'
import ClientCarousel from '../components/ClientCarousel'
import ContactForm from '../components/ContactForm'
import Dashboard from '../components/Dashboard'
import TelephonySection from '../components/TelephonySection'
import CallCenterSection from '../components/CallCenterSection'
import LeadManagementSection from '../components/LeadManagementSection'
import AIIVRSection from '../components/AIIVRSection'
import BYOTSection from '../components/BYOTSection'
import WhatsAppSection from '../components/WhatsAppSection'
import VirtualNumbersSection from '../components/VirtualNumbersSection'
import Footer from '../components/Footer'

export default function Home() {
  const [isDarkMode, setIsDarkMode] = useState(true)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const router = useRouter()

  useEffect(() => {
    // Apply theme to body element
    const body = document.body
    body.className = isDarkMode ? 'dark' : 'light'
    
    // Check if user is authenticated
    const authStatus = localStorage.getItem('isAuthenticated')
    setIsAuthenticated(authStatus === 'true')
  }, [isDarkMode])

  // If authenticated, show a message or redirect to dashboard
  if (isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">You are already logged in</h1>
          <button
            onClick={() => router.push('/dashboard')}
            className="btn-primary"
          >
            Go to Dashboard
          </button>
          <button
            onClick={() => {
              localStorage.removeItem('isAuthenticated')
              setIsAuthenticated(false)
            }}
            className="ml-4 px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600"
          >
            Logout
          </button>
        </div>
      </div>
    )
  }

  return (
    <main className="min-h-screen">
      <Header isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} />
      <Hero isDarkMode={isDarkMode} />
      <ClientCarousel isDarkMode={isDarkMode} />
      <ContactForm />
      <Dashboard />
      <TelephonySection />
      <CallCenterSection />
      <LeadManagementSection />
      <AIIVRSection />
      <BYOTSection />
      <WhatsAppSection />
      <VirtualNumbersSection />
      <Footer isDarkMode={isDarkMode} />
    </main>
  )
}
