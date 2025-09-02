'use client'

import { motion } from 'framer-motion'
import { Smartphone, Laptop, Tablet, Monitor, Zap, Shield, Settings, Globe } from 'lucide-react'

export default function BYOTSection() {
  const devices = [
    { icon: Smartphone, name: 'Smartphones', description: 'iOS and Android devices' },
    { icon: Laptop, name: 'Laptops', description: 'Windows, macOS, and Linux' },
    { icon: Tablet, name: 'Tablets', description: 'iPad and Android tablets' },
    { icon: Monitor, name: 'Desktop PCs', description: 'Windows and macOS workstations' }
  ]

  const features = [
    {
      icon: Zap,
      title: 'Seamless Integration',
      description: 'Connect any device to our platform with zero configuration and instant access to all features.',
      benefits: ['Zero setup time', 'Cross-platform support', 'Instant access', 'Unified experience']
    },
    {
      icon: Shield,
      title: 'Enterprise Security',
      description: 'Bank-grade security protocols ensure your data and communications remain protected on any device.',
      benefits: ['End-to-end encryption', 'Multi-factor authentication', 'Device management', 'Compliance ready']
    },
    {
      icon: Settings,
      title: 'Custom Configuration',
      description: 'Personalize your experience with customizable settings, themes, and workflow preferences.',
      benefits: ['Personal themes', 'Custom workflows', 'User preferences', 'Brand integration']
    }
  ]

  return (
    <section id="byot" className="py-20 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            <span className="gradient-text">Bring Your Own Technology</span>
          </h2>
          <p className="text-xl text-white/80 max-w-3xl mx-auto">
            Use any device, anywhere, anytime. Our platform works seamlessly 
            across all your existing technology investments.
          </p>
        </motion.div>

        {/* Device Support */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <div className="glassmorphism p-8 rounded-2xl">
            <h3 className="text-3xl font-bold text-white mb-8 text-center">
              Universal Device Support
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {devices.map((device, index) => (
                <motion.div
                  key={device.name}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -5 }}
                  className="text-center p-6 bg-white/5 rounded-xl"
                >
                  <device.icon className="w-16 h-16 text-red-400 mx-auto mb-4" />
                  <h4 className="text-white font-semibold text-lg mb-2">{device.name}</h4>
                  <p className="text-white/70 text-sm">{device.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 + index * 0.2 }}
              viewport={{ once: true }}
              whileHover={{ y: -10 }}
              className="glassmorphism p-8 rounded-2xl card-hover"
            >
              <div className="w-16 h-16 bg-gradient-to-br from-red-500 to-red-700 rounded-2xl flex items-center justify-center mb-6">
                <feature.icon className="w-8 h-8 text-white" />
              </div>
              
              <h3 className="text-2xl font-bold text-white mb-4">{feature.title}</h3>
              <p className="text-white/80 mb-6 leading-relaxed">{feature.description}</p>
              
              <ul className="space-y-3">
                {feature.benefits.map((benefit, idx) => (
                  <li key={idx} className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-red-400 rounded-full"></div>
                    <span className="text-white/70 text-sm">{benefit}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <div className="glassmorphism p-8 rounded-2xl">
            <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
              Start Using Your Devices Today
            </h3>
            <p className="text-white/80 mb-6 max-w-2xl mx-auto">
              No new hardware required. Access our platform from any device 
              and transform your business communication instantly.
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="btn-primary text-lg px-8 py-4"
            >
              Get Started Now
            </motion.button>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
