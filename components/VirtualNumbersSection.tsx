'use client'

import { motion } from 'framer-motion'
import { Phone, Globe, Shield, Settings, MapPin, Clock, CheckCircle, Zap } from 'lucide-react'

export default function VirtualNumbersSection() {
  const features = [
    {
      icon: Phone,
      title: 'Virtual Phone Numbers',
      description: 'Get local, toll-free, and international numbers that work anywhere with advanced call management.',
      benefits: ['Local presence', 'Toll-free options', 'International numbers', 'Instant activation']
    },
    {
      icon: Globe,
      title: 'Global Coverage',
      description: 'Numbers from 100+ countries to establish local presence and improve customer trust worldwide.',
      benefits: ['100+ countries', 'Local presence', 'Customer trust', 'Global expansion']
    },
    {
      icon: Shield,
      title: 'Advanced Security',
      description: 'Enterprise-grade security with call encryption, fraud protection, and compliance features.',
      benefits: ['Call encryption', 'Fraud protection', 'Compliance ready', 'Audit trails']
    }
  ]

  const numberTypes = [
    { type: 'Local Numbers', description: 'Establish local presence in any city', icon: MapPin },
    { type: 'Toll-Free Numbers', description: 'Professional 800, 888, 877 numbers', icon: Phone },
    { type: 'International Numbers', description: 'Numbers from 100+ countries', icon: Globe },
    { type: 'Vanity Numbers', description: 'Memorable custom number sequences', icon: Settings }
  ]

  return (
    <section id="virtual-numbers" className="py-20 relative overflow-hidden">
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
            <span className="gradient-text">Virtual Numbers</span> & Global Reach
          </h2>
          <p className="text-xl text-white/80 max-w-3xl mx-auto">
            Establish local presence worldwide with virtual phone numbers that 
            work anywhere, anytime, with enterprise-grade features.
          </p>
        </motion.div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
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

        {/* Number Types */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <div className="glassmorphism p-8 rounded-2xl">
            <h3 className="text-3xl font-bold text-white mb-8 text-center">
              Number Types Available
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {numberTypes.map((numberType, index) => (
                <motion.div
                  key={numberType.type}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.8 + index * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -5 }}
                  className="text-center p-6 bg-white/5 rounded-xl"
                >
                  <numberType.icon className="w-12 h-12 text-red-400 mx-auto mb-4" />
                  <h4 className="text-white font-semibold text-lg mb-2">{numberType.type}</h4>
                  <p className="text-white/70 text-sm">{numberType.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <div className="glassmorphism p-8 rounded-2xl">
            <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
              Get Your Virtual Numbers Today
            </h3>
            <p className="text-white/80 mb-6 max-w-2xl mx-auto">
              Establish global presence with virtual numbers that work anywhere 
              and provide enterprise-grade communication capabilities.
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="btn-primary text-lg px-8 py-4"
            >
              Get Started
            </motion.button>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
