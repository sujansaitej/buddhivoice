'use client'

import { motion } from 'framer-motion'
import { MessageCircle, Zap, Shield, BarChart3, Send, CheckCircle, Clock, Users } from 'lucide-react'

export default function WhatsAppSection() {
  const features = [
    {
      icon: MessageCircle,
      title: 'WhatsApp Business API',
      description: 'Official WhatsApp Business API integration for enterprise-grade messaging with advanced features.',
      benefits: ['Official API access', 'High message limits', 'Rich media support', 'Global reach']
    },
    {
      icon: Zap,
      title: 'Automated Responses',
      description: 'Smart chatbots and automated workflows that handle customer queries 24/7 with instant responses.',
      benefits: ['24/7 availability', 'Instant responses', 'Smart routing', 'Multi-language support']
    },
    {
      icon: Shield,
      title: 'Enterprise Security',
      description: 'Bank-grade security with end-to-end encryption, compliance, and enterprise-grade data protection.',
      benefits: ['End-to-end encryption', 'GDPR compliance', 'Data protection', 'Audit trails']
    }
  ]

  const useCases = [
    { icon: Users, title: 'Customer Support', description: '24/7 automated support with human escalation' },
    { icon: Send, title: 'Order Updates', description: 'Real-time order status and delivery notifications' },
    { icon: CheckCircle, title: 'Appointments', description: 'Automated booking and reminder system' },
    { icon: BarChart3, title: 'Marketing', description: 'Targeted campaigns and promotional messages' }
  ]

  return (
    <section id="whatsapp" className="py-20 relative overflow-hidden">
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
            <span className="gradient-text">WhatsApp Business</span> Integration
          </h2>
          <p className="text-xl text-white/80 max-w-3xl mx-auto">
            Connect with your customers on the world's most popular messaging 
            platform with enterprise-grade features and automation.
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

        {/* Use Cases */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <div className="glassmorphism p-8 rounded-2xl">
            <h3 className="text-3xl font-bold text-white mb-8 text-center">
              Business Use Cases
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {useCases.map((useCase, index) => (
                <motion.div
                  key={useCase.title}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.8 + index * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -5 }}
                  className="text-center p-6 bg-white/5 rounded-xl"
                >
                  <useCase.icon className="w-12 h-12 text-red-400 mx-auto mb-4" />
                  <h4 className="text-white font-semibold text-lg mb-2">{useCase.title}</h4>
                  <p className="text-white/70 text-sm">{useCase.description}</p>
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
              Start Using WhatsApp Business Today
            </h3>
            <p className="text-white/80 mb-6 max-w-2xl mx-auto">
              Join thousands of businesses that have transformed their customer 
              communication with WhatsApp Business integration.
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
