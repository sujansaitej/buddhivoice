'use client'

import { motion } from 'framer-motion'
import { Users, BarChart3, Monitor, Headphones, Clock, TrendingUp, CheckCircle, AlertCircle } from 'lucide-react'

export default function CallCenterSection() {
  const features = [
    {
      icon: Users,
      title: 'Automated Routing',
      description: 'Intelligent call distribution that matches customers with the most qualified agents based on skills, availability, and priority.',
      benefits: ['Skill-based matching', 'Load balancing', 'Priority queuing', 'Geographic routing']
    },
    {
      icon: BarChart3,
      title: 'Real-Time Analytics',
      description: 'Live dashboards and comprehensive reporting to monitor call center performance, agent productivity, and customer satisfaction.',
      benefits: ['Live metrics', 'Custom reports', 'Performance tracking', 'KPI monitoring']
    },
    {
      icon: Monitor,
      title: 'Agent Monitoring',
      description: 'Comprehensive agent management with real-time status tracking, performance metrics, and quality assurance tools.',
      benefits: ['Live status updates', 'Performance metrics', 'Quality monitoring', 'Training insights']
    }
  ]

  const agentStatuses = [
    { name: 'Sarah Johnson', status: 'Available', calls: 12, rating: 4.8, avatar: 'SJ' },
    { name: 'Mike Chen', status: 'On Call', calls: 8, rating: 4.9, avatar: 'MC' },
    { name: 'Emma Davis', status: 'Break', calls: 15, rating: 4.7, avatar: 'ED' },
    { name: 'Alex Rodriguez', status: 'Training', calls: 5, rating: 4.6, avatar: 'AR' },
    { name: 'Lisa Wang', status: 'Available', calls: 20, rating: 4.9, avatar: 'LW' }
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Available': return 'text-green-400'
      case 'On Call': return 'text-blue-400'
      case 'Break': return 'text-yellow-400'
      case 'Training': return 'text-purple-400'
      default: return 'text-gray-400'
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Available': return <CheckCircle className="w-4 h-4" />
      case 'On Call': return <Headphones className="w-4 h-4" />
      case 'Break': return <Clock className="w-4 h-4" />
      case 'Training': return <AlertCircle className="w-4 h-4" />
      default: return <CheckCircle className="w-4 h-4" />
    }
  }

  const queueStats = [
    { label: 'Calls in Queue', value: '8', change: '+2', color: 'text-yellow-400' },
    { label: 'Avg Wait Time', value: '2m 15s', change: '-30s', color: 'text-green-400' },
    { label: 'Active Agents', value: '18/24', change: '+3', color: 'text-blue-400' },
    { label: 'SLA Compliance', value: '96.8%', change: '+1.2%', color: 'text-green-400' }
  ]

  return (
    <section id="call-center" className="py-20 relative overflow-hidden">
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
            Intelligent <span className="gradient-text">Call Center</span> Management
          </h2>
          <p className="text-xl text-white/80 max-w-3xl mx-auto">
            Optimize your call center operations with AI-powered routing, 
            real-time analytics, and comprehensive agent monitoring.
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

        {/* Live Agent Monitoring */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <div className="glassmorphism p-8 rounded-2xl">
            <h3 className="text-3xl font-bold text-white mb-8 text-center">
              Live Agent Monitoring
            </h3>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Agent Status List */}
              <div>
                <h4 className="text-xl font-semibold text-white mb-6">Agent Status</h4>
                <div className="space-y-4">
                  {agentStatuses.map((agent, index) => (
                    <motion.div
                      key={agent.name}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, delay: 0.8 + index * 0.1 }}
                      viewport={{ once: true }}
                      className="flex items-center justify-between p-4 bg-white/5 rounded-xl"
                    >
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-gradient-to-br from-red-500 to-red-700 rounded-full flex items-center justify-center text-white font-bold">
                          {agent.avatar}
                        </div>
                        <div>
                          <div className="text-white font-semibold">{agent.name}</div>
                          <div className="flex items-center space-x-2">
                            {getStatusIcon(agent.status)}
                            <span className={`text-sm ${getStatusColor(agent.status)}`}>
                              {agent.status}
                            </span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="text-right">
                        <div className="text-white font-semibold">{agent.calls} calls</div>
                        <div className="text-white/70 text-sm">⭐ {agent.rating}</div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Queue Statistics */}
              <div>
                <h4 className="text-xl font-semibold text-white mb-6">Queue Overview</h4>
                <div className="grid grid-cols-2 gap-4">
                  {queueStats.map((stat, index) => (
                    <motion.div
                      key={stat.label}
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.5, delay: 1.0 + index * 0.1 }}
                      viewport={{ once: true }}
                      className="bg-white/5 rounded-xl p-4 text-center"
                    >
                      <div className="text-2xl font-bold text-white mb-1">{stat.value}</div>
                      <div className="text-white/70 text-sm mb-2">{stat.label}</div>
                      <div className={`text-sm font-medium ${stat.color}`}>
                        {stat.change}
                      </div>
                    </motion.div>
                  ))}
                </div>
                
                {/* Call Flow Visualization */}
                <div className="mt-6 bg-gradient-to-br from-red-500/20 to-red-700/20 rounded-xl p-6 border border-red-500/30">
                  <h5 className="text-white font-semibold mb-4 text-center">Call Flow</h5>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-white/80 text-sm">Incoming Calls</span>
                      <div className="flex items-center space-x-2">
                        <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                        <span className="text-white font-semibold">24</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-white/80 text-sm">In Queue</span>
                      <div className="flex items-center space-x-2">
                        <div className="w-3 h-3 bg-yellow-400 rounded-full animate-pulse"></div>
                        <span className="text-white font-semibold">8</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-white/80 text-sm">Being Handled</span>
                      <div className="flex items-center space-x-2">
                        <div className="w-3 h-3 bg-blue-400 rounded-full animate-pulse"></div>
                        <span className="text-white font-semibold">16</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Performance Metrics */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16"
        >
          {queueStats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 1.2 + index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -5 }}
              className="glassmorphism p-6 rounded-2xl text-center card-hover"
            >
              <div className="text-3xl font-bold text-white mb-2">{stat.value}</div>
              <div className="text-white/70 text-sm mb-2">{stat.label}</div>
              <div className={`text-sm font-medium ${stat.color}`}>
                {stat.change}
              </div>
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
              Transform Your Call Center Today
            </h3>
            <p className="text-white/80 mb-6 max-w-2xl mx-auto">
              Join leading companies that have revolutionized their customer 
              service operations with our intelligent call center solutions.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.a
                href="/login"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="btn-primary text-lg px-8 py-4"
              >
                Start Free Trial
              </motion.a>
              <motion.a
                href="/login"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="btn-secondary text-lg px-8 py-4"
              >
                Watch Demo
              </motion.a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
