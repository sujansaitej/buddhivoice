'use client'

import { motion } from 'framer-motion'
import { Phone, Route, Wifi, Settings, Headphones, Clock, Shield, Zap } from 'lucide-react'

export default function TelephonySection() {
  const features = [
    {
      icon: Phone,
      title: 'Multi-Level IVR',
      description: 'Create sophisticated call flows with unlimited menu levels, custom greetings, and intelligent routing based on caller input.',
      benefits: ['Unlimited menu levels', 'Custom voice prompts', 'Smart routing logic', 'Multi-language support']
    },
    {
      icon: Route,
      title: 'Smart Call Routing',
      description: 'Intelligent call distribution based on agent skills, availability, and business rules for optimal customer experience.',
      benefits: ['Skill-based routing', 'Load balancing', 'Priority queuing', 'Geographic routing']
    },
    {
      icon: Wifi,
      title: 'Seamless Connectivity',
      description: 'High-quality voice calls with 99.9% uptime, global coverage, and seamless integration with existing infrastructure.',
      benefits: ['99.9% uptime guarantee', 'Global coverage', 'HD voice quality', 'Easy integration']
    }
  ]

  const ivrDemo = [
    { step: 1, action: 'Welcome Message', description: 'Professional greeting with company branding' },
    { step: 2, action: 'Main Menu', description: 'Press 1 for Sales, 2 for Support, 3 for Billing' },
    { step: 3, action: 'Sub-menu Options', description: 'Detailed options for each department' },
    { step: 4, action: 'Agent Transfer', description: 'Seamless connection to available agent' }
  ]

  const stats = [
    { label: 'Call Quality Score', value: '99.2%', icon: Headphones },
    { label: 'Average Setup Time', value: '< 5 min', icon: Clock },
    { label: 'Security Compliance', value: '100%', icon: Shield },
    { label: 'Integration APIs', value: '50+', icon: Zap }
  ]

  return (
    <section id="telephony" className="py-20 relative overflow-hidden">
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
            Advanced <span className="gradient-text">Telephony</span> Solutions
          </h2>
          <p className="text-xl text-white/80 max-w-3xl mx-auto">
            Transform your voice communication with AI-powered IVR systems, 
            intelligent call routing, and enterprise-grade connectivity.
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

        {/* IVR Demo Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <div className="glassmorphism p-8 rounded-2xl">
            <h3 className="text-3xl font-bold text-white mb-8 text-center">
              Interactive IVR Demo
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              {/* IVR Flow Steps */}
              <div className="space-y-6">
                {ivrDemo.map((step, index) => (
                  <motion.div
                    key={step.step}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.8 + index * 0.1 }}
                    viewport={{ once: true }}
                    className="flex items-start space-x-4"
                  >
                    <div className="w-8 h-8 bg-gradient-to-br from-red-500 to-red-700 rounded-full flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                      {step.step}
                    </div>
                    <div>
                      <h4 className="text-white font-semibold mb-1">{step.action}</h4>
                      <p className="text-white/70 text-sm">{step.description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* IVR Visual Demo */}
              <div className="relative">
                <div className="bg-gradient-to-br from-red-500/20 to-red-700/20 rounded-2xl p-8 border border-red-500/30">
                  <div className="text-center mb-6">
                    <Phone className="w-12 h-12 text-red-400 mx-auto mb-4" />
                    <h4 className="text-white font-semibold text-lg">IVR System</h4>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="bg-white/10 rounded-xl p-4 text-center">
                      <div className="text-white/90 font-medium">Welcome to BuddhiVoice</div>
                      <div className="text-white/60 text-sm mt-1">Press 1 for Sales</div>
                    </div>
                    
                    <div className="bg-white/10 rounded-xl p-4 text-center">
                      <div className="text-white/90 font-medium">Press 2 for Support</div>
                      <div className="text-white/60 text-sm mt-1">Press 3 for Billing</div>
                    </div>
                    
                    <div className="bg-white/10 rounded-xl p-4 text-center">
                      <div className="text-white/90 font-medium">Press 0 for Operator</div>
                      <div className="text-white/60 text-sm mt-1">Stay on the line</div>
                    </div>
                  </div>
                </div>
                
                {/* Animated Call Flow */}
                <motion.div
                  animate={{ 
                    scale: [1, 1.1, 1],
                    opacity: [0.5, 1, 0.5]
                  }}
                  transition={{ 
                    duration: 2, 
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                  className="absolute -top-2 -right-2 w-4 h-4 bg-green-400 rounded-full"
                />
              </div>
            </div>
          </div>
        </motion.div>

        {/* Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 1.0 + index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -5 }}
              className="glassmorphism p-6 rounded-2xl text-center card-hover"
            >
              <stat.icon className="w-8 h-8 text-red-400 mx-auto mb-4" />
              <div className="text-2xl font-bold text-white mb-2">{stat.value}</div>
              <div className="text-white/70 text-sm">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.2 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <div className="glassmorphism p-8 rounded-2xl">
            <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
              Ready to Upgrade Your Telephony System?
            </h3>
            <p className="text-white/80 mb-6 max-w-2xl mx-auto">
              Experience the future of business communication with our advanced 
              telephony solutions. Get started with a free consultation today.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.a
                href="/login"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="btn-primary text-lg px-8 py-4"
              >
                Schedule Demo
              </motion.a>
              <motion.a
                href="/login"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="btn-secondary text-lg px-8 py-4"
              >
                View Documentation
              </motion.a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
