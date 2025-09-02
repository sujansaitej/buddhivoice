'use client'

import { motion } from 'framer-motion'
import { Phone, Mail, MapPin, Facebook, Twitter, Linkedin, Instagram, ArrowUp } from 'lucide-react'

interface FooterProps {
  isDarkMode: boolean
}

export default function Footer({ isDarkMode }: FooterProps) {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const footerLinks = {
    product: [
      'Telephony Solutions',
      'Call Center Management',
      'Lead Management',
      'AI IVR',
      'WhatsApp Integration',
      'Virtual Numbers'
    ],
    company: [
      'About Us',
      'Careers',
      'Press',
      'Partners',
      'Contact',
      'Support'
    ],
    resources: [
      'Documentation',
      'API Reference',
      'Developer Tools',
      'Blog',
      'Webinars',
      'Case Studies'
    ],
    legal: [
      'Privacy Policy',
      'Terms of Service',
      'Cookie Policy',
      'GDPR Compliance',
      'Security',
      'Compliance'
    ]
  }

  const socialLinks = [
    { icon: Facebook, href: '#', label: 'Facebook' },
    { icon: Twitter, href: '#', label: 'Twitter' },
    { icon: Linkedin, href: '#', label: 'LinkedIn' },
    { icon: Instagram, href: '#', label: 'Instagram' }
  ]

  return (
    <footer className={`relative border-t ${isDarkMode ? 'bg-black/50 border-white/10' : 'bg-gray-50/50 border-gray-200'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-12">
          {/* Company Info */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <div className="flex items-center space-x-2 mb-6">
                <div className="w-10 h-10 bg-gradient-to-br from-red-500 to-red-700 rounded-xl flex items-center justify-center">
                  <Phone className="w-6 h-6 text-white" />
                </div>
                <span className="text-2xl font-bold gradient-text">BuddhiVoice</span>
              </div>
              
              <p className={`mb-6 leading-relaxed max-w-md ${isDarkMode ? 'text-white/70' : 'text-gray-600'}`}>
                Transform your business communication with AI-powered solutions. 
                Experience the future of telephony, call centers, and customer engagement.
              </p>
              
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <Phone className="w-5 h-5 text-red-400" />
                  <span className={`${isDarkMode ? 'text-white/70' : 'text-gray-600'}`}>+91 93618 60665</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Mail className="w-5 h-5 text-red-400" />
                  <span className={`${isDarkMode ? 'text-white/70' : 'text-gray-600'}`}>sales@buddhiai.io</span>
                </div>
                <div className="flex items-center space-x-3">
                  <MapPin className="w-5 h-5 text-red-400" />
                  <span className={`${isDarkMode ? 'text-white/70' : 'text-gray-600'}`}>Indranagar, Bangalore, India</span>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Footer Links */}
          {Object.entries(footerLinks).map(([category, links], index) => (
            <motion.div
              key={category}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <h3 className={`font-semibold text-lg mb-4 capitalize ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
                {category}
              </h3>
              <ul className="space-y-3">
                {links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    <a
                      href="#"
                      className={`transition-colors duration-200 text-sm ${isDarkMode ? 'text-white/70 hover:text-white' : 'text-gray-600 hover:text-gray-800'}`}
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* Bottom Footer */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className={`border-t pt-8 ${isDarkMode ? 'border-white/10' : 'border-gray-200'}`}
        >
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className={`text-sm ${isDarkMode ? 'text-white/60' : 'text-gray-500'}`}>
              © 2024 BuddhiVoice. All rights reserved.
            </div>
            
            <div className="flex items-center space-x-6">
              {/* Social Links */}
              <div className="flex items-center space-x-4">
                {socialLinks.map((social, index) => (
                  <motion.a
                    key={social.label}
                    href={social.href}
                    whileHover={{ scale: 1.1, y: -2 }}
                    whileTap={{ scale: 0.9 }}
                    className={`w-8 h-8 rounded-full flex items-center justify-center transition-all duration-200 ${
                      isDarkMode 
                        ? 'bg-white/10 hover:bg-red-500 text-white/70 hover:text-white' 
                        : 'bg-gray-200 hover:bg-red-500 text-gray-600 hover:text-white'
                    }`}
                  >
                    <social.icon className="w-4 h-4" />
                  </motion.a>
                ))}
              </div>
              
              {/* Scroll to Top */}
              <motion.button
                onClick={scrollToTop}
                whileHover={{ scale: 1.1, y: -2 }}
                whileTap={{ scale: 0.9 }}
                className="w-8 h-8 bg-red-500 hover:bg-red-600 rounded-full flex items-center justify-center text-white transition-all duration-200"
              >
                <ArrowUp className="w-4 h-4" />
              </motion.button>
            </div>
          </div>
        </motion.div>
      </div>
      
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-gradient-to-t from-red-500/5 to-transparent pointer-events-none"></div>
    </footer>
  )
}
