import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'BuddhiVoice - AI-Powered Omni-Channel Platform for Business Communication',
  description: 'Transform your business communication with AI-powered telephony, call center solutions, lead management, and seamless integrations.',
  keywords: 'AI, Business Communication, Telephony, Call Center, Lead Management, IVR, WhatsApp Integration',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className="antialiased">
        {children}
      </body>
    </html>
  )
}
