'use client'

import { motion } from 'framer-motion'
import { Brain, MessageCircle, Zap, Settings, Mic, Volume2, Play, Pause, RotateCcw } from 'lucide-react'

export default function AIIVRSection() {
  const features = [
    {
      icon: Brain,
      title: 'Natural Language Processing',
      description: 'Advanced AI that understands natural speech, accents, and conversational language for seamless customer interactions.',
      benefits: ['Multi-language support', 'Accent recognition', 'Context awareness', 'Intent understanding']
    },
    {
      icon: MessageCircle,
      title: 'Conversational AI',
      description: 'Human-like conversations that can handle complex queries, provide personalized responses, and escalate when needed.',
      benefits: ['Personalized responses', 'Query understanding', 'Smart escalation', 'Learning capabilities']
    },
    {
      icon: Zap,
      title: 'Predictive Routing',
      description: 'AI-powered call routing that predicts customer needs and connects them to the most appropriate agent or solution.',
      benefits: ['Predictive analytics', 'Smart routing', 'Reduced wait times', 'Improved satisfaction']
    }
  ]

  const ivrFlow = [
    { step: 1, action: 'AI Greeting', description: 'Personalized welcome based on caller history' },
    { step: 2, action: 'Intent Recognition', description: 'AI understands customer needs automatically' },
    { step: 3, action: 'Smart Routing', description: 'Directs to best solution or agent' },
    { step: 4, action: 'Resolution', description: 'Handles request or transfers seamlessly' }
  ]

  return (
    <section id="ai-ivr" className="py-20 relative overflow-hidden">
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
            AI-Powered <span className="gradient-text">Intelligent IVR</span>
          </h2>
          <p className="text-xl text-white/80 max-w-3xl mx-auto">
            Transform customer interactions with conversational AI that understands, 
            learns, and provides personalized experiences 24/7.
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

        {/* AI IVR Demo */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <div className="glassmorphism p-8 rounded-2xl">
            <h3 className="text-3xl font-bold text-white mb-8 text-center">
              AI IVR Interactive Demo
            </h3>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              {/* AI Flow Steps */}
              <div className="space-y-6">
                {ivrFlow.map((step, index) => (
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

              {/* AI IVR Interface */}
              <div className="relative">
                <div className="bg-gradient-to-br from-red-500/20 to-red-700/20 rounded-2xl p-8 border border-red-500/30">
                  <div className="text-center mb-6">
                    <Brain className="w-12 h-12 text-red-400 mx-auto mb-4" />
                    <h4 className="text-white font-semibold text-lg">AI IVR System</h4>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="bg-white/10 rounded-xl p-4">
                      <div className="flex items-center space-x-2 mb-2">
                        <Mic className="w-4 h-4 text-red-400" />
                        <span className="text-white/90 text-sm font-medium">Listening...</span>
                      </div>
                      <div className="text-white/60 text-xs">"I need help with my billing"</div>
                    </div>
                    
                    <div className="bg-white/10 rounded-xl p-4">
                      <div className="flex items-center space-x-2 mb-2">
                        <Brain className="w-4 h-4 text-green-400" />
                        <span className="text-white/90 text-sm font-medium">AI Processing</span>
                      </div>
                      <div className="text-white/60 text-xs">Intent: Billing Support</div>
                    </div>
                    
                    <div className="bg-white/10 rounded-xl p-4">
                      <div className="flex items-center space-x-2 mb-2">
                        <Volume2 className="w-4 h-4 text-blue-400" />
                        <span className="text-white/90 text-sm font-medium">Response</span>
                      </div>
                      <div className="text-white/60 text-xs">"I'll connect you to billing"</div>
                    </div>
                  </div>
                  
                  {/* Demo Controls */}
                  <div className="flex justify-center space-x-4 mt-6">
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      className="w-10 h-10 bg-red-500 rounded-full flex items-center justify-center text-white"
                    >
                      <Play className="w-4 h-4" />
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center text-white"
                    >
                      <Pause className="w-4 h-4" />
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center text-white"
                    >
                      <RotateCcw className="w-4 h-4" />
                    </motion.button>
                  </div>
                </div>
                
                {/* AI Processing Animation */}
                <motion.div
                  animate={{ 
                    scale: [1, 1.2, 1],
                    opacity: [0.5, 1, 0.5]
                  }}
                  transition={{ 
                    duration: 2, 
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                  className="absolute -top-2 -right-2 w-4 h-4 bg-blue-400 rounded-full"
                />
              </div>
            </div>
          </div>
        </motion.div>

        {/* AI Capabilities */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16"
        >
          {[
            { label: 'Languages Supported', value: '50+', icon: MessageCircle },
            { label: 'Accuracy Rate', value: '98.5%', icon: Brain },
            { label: 'Response Time', value: '< 1s', icon: Zap },
            { label: 'Learning Models', value: '24/7', icon: Settings }
          ].map((stat, index) => (
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
          transition={{ duration: 0.8, delay: 1.0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <div className="glassmorphism p-8 rounded-2xl">
            <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
              Experience the Future of Customer Service
            </h3>
            <p className="text-white/80 mb-6 max-w-2xl mx-auto">
              Join forward-thinking companies that have reduced call handling 
              times by 60% with our AI-powered IVR solutions.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="btn-primary text-lg px-8 py-4"
              >
                Try AI IVR Demo
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="btn-secondary text-lg px-8 py-4"
              >
                Learn More
              </motion.button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
