'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Target, Activity, Bell, Plus, User, Phone, Mail, Calendar, CheckCircle, Clock, AlertCircle } from 'lucide-react'

interface Lead {
  id: string
  name: string
  company: string
  email: string
  phone: string
  status: 'new' | 'contacted' | 'qualified' | 'proposal' | 'closed'
  priority: 'low' | 'medium' | 'high'
  lastContact: string
  nextFollowUp: string
  value: number
}

export default function LeadManagementSection() {
  const [leads, setLeads] = useState<Lead[]>([
    {
      id: '1',
      name: 'John Smith',
      company: 'TechCorp Solutions',
      email: 'john@techcorp.com',
      phone: '+1-555-0123',
      status: 'new',
      priority: 'high',
      lastContact: 'Never',
      nextFollowUp: 'Today',
      value: 50000
    },
    {
      id: '2',
      name: 'Sarah Johnson',
      company: 'Innovate Inc',
      email: 'sarah@innovate.com',
      phone: '+1-555-0124',
      status: 'contacted',
      priority: 'medium',
      lastContact: '2 days ago',
      nextFollowUp: 'Tomorrow',
      value: 75000
    },
    {
      id: '3',
      name: 'Mike Chen',
      company: 'Global Systems',
      email: 'mike@global.com',
      phone: '+1-555-0125',
      status: 'qualified',
      priority: 'high',
      lastContact: '1 week ago',
      nextFollowUp: 'Next week',
      value: 100000
    },
    {
      id: '4',
      name: 'Emma Davis',
      company: 'Future Tech',
      email: 'emma@future.com',
      phone: '+1-555-0126',
      status: 'proposal',
      priority: 'high',
      lastContact: '3 days ago',
      nextFollowUp: 'Today',
      value: 150000
    }
  ])

  const [showAddLead, setShowAddLead] = useState(false)

  const statusConfig = {
    new: { label: 'New Leads', color: 'bg-blue-500', bg: 'bg-blue-500/20', border: 'border-blue-500/30' },
    contacted: { label: 'Contacted', color: 'bg-yellow-500', bg: 'bg-yellow-500/20', border: 'border-yellow-500/30' },
    qualified: { label: 'Qualified', color: 'bg-purple-500', bg: 'bg-purple-500/20', border: 'border-purple-500/30' },
    proposal: { label: 'Proposal', color: 'bg-orange-500', bg: 'bg-orange-500/20', border: 'border-orange-500/30' },
    closed: { label: 'Closed', color: 'bg-green-500', bg: 'bg-green-500/20', border: 'border-green-500/30' }
  }

  const priorityConfig = {
    low: { color: 'text-green-400', bg: 'bg-green-500/20' },
    medium: { color: 'text-yellow-400', bg: 'bg-yellow-500/20' },
    high: { color: 'text-red-400', bg: 'bg-red-500/20' }
  }

  const getStatusLeads = (status: Lead['status']) => {
    return leads.filter(lead => lead.status === status)
  }

  const moveLead = (leadId: string, newStatus: Lead['status']) => {
    setLeads(prev => prev.map(lead => 
      lead.id === leadId ? { ...lead, status: newStatus } : lead
    ))
  }

  const features = [
    {
      icon: Target,
      title: 'Smart Tracking',
      description: 'Automated lead scoring and qualification based on behavior, engagement, and business criteria.',
      benefits: ['Behavioral scoring', 'Engagement tracking', 'Qualification automation', 'ROI prediction']
    },
    {
      icon: Activity,
      title: 'Activity Log',
      description: 'Comprehensive tracking of all interactions, emails, calls, and touchpoints with detailed timestamps.',
      benefits: ['Interaction history', 'Email tracking', 'Call logs', 'Touchpoint analytics']
    },
    {
      icon: Bell,
      title: 'Smart Reminders',
      description: 'Intelligent follow-up scheduling with automated reminders and escalation for high-priority leads.',
      benefits: ['Automated reminders', 'Follow-up scheduling', 'Priority escalation', 'Calendar integration']
    }
  ]

  return (
    <section id="lead-management" className="py-20 relative overflow-hidden">
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
            Intelligent <span className="gradient-text">Lead Management</span>
          </h2>
          <p className="text-xl text-white/80 max-w-3xl mx-auto">
            Streamline your sales process with AI-powered lead tracking, 
            automated follow-ups, and comprehensive activity monitoring.
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

        {/* Kanban Board */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <div className="glassmorphism p-8 rounded-2xl">
            <div className="flex items-center justify-between mb-8">
              <h3 className="text-3xl font-bold text-white">Lead Pipeline</h3>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setShowAddLead(true)}
                className="btn-primary flex items-center space-x-2"
              >
                <Plus className="w-5 h-5" />
                <span>Add Lead</span>
              </motion.button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
              {Object.entries(statusConfig).map(([status, config]) => (
                <div key={status} className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h4 className="text-white font-semibold">{config.label}</h4>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${config.bg} ${config.border} text-white`}>
                      {getStatusLeads(status as Lead['status']).length}
                    </span>
                  </div>
                  
                  <div className="space-y-3">
                    {getStatusLeads(status as Lead['status']).map((lead) => (
                      <motion.div
                        key={lead.id}
                        layout
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        whileHover={{ y: -2 }}
                        className={`${config.bg} ${config.border} border rounded-xl p-4 cursor-pointer`}
                        draggable
                        onDragEnd={(e) => {
                          // Simple drag and drop logic
                          const target = e.target as HTMLElement
                          const rect = target.getBoundingClientRect()
                          const x = (e as MouseEvent).clientX - rect.left
                          const columnWidth = rect.width
                          const columnIndex = Math.floor(x / columnWidth)
                          const statuses = Object.keys(statusConfig)
                          const newStatus = statuses[columnIndex] as Lead['status']
                          if (newStatus && newStatus !== lead.status) {
                            moveLead(lead.id, newStatus)
                          }
                        }}
                      >
                        <div className="flex items-start justify-between mb-3">
                          <div className="w-8 h-8 bg-gradient-to-br from-red-500 to-red-700 rounded-full flex items-center justify-center text-white font-bold text-sm">
                            {lead.name.charAt(0)}
                          </div>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${priorityConfig[lead.priority].bg} ${priorityConfig[lead.priority].color}`}>
                            {lead.priority}
                          </span>
                        </div>
                        
                        <div className="space-y-2">
                          <div className="text-white font-semibold text-sm">{lead.name}</div>
                          <div className="text-white/70 text-xs">{lead.company}</div>
                          <div className="flex items-center space-x-2 text-white/60 text-xs">
                            <Mail className="w-3 h-3" />
                            <span>{lead.email}</span>
                          </div>
                          <div className="flex items-center space-x-2 text-white/60 text-xs">
                            <Phone className="w-3 h-3" />
                            <span>{lead.phone}</span>
                          </div>
                          <div className="flex items-center space-x-2 text-white/60 text-xs">
                            <Calendar className="w-3 h-3" />
                            <span>Next: {lead.nextFollowUp}</span>
                          </div>
                          <div className="text-white font-semibold text-sm">
                            ${lead.value.toLocaleString()}
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Lead Statistics */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-16"
        >
          {[
            { label: 'Total Leads', value: leads.length, icon: Target, change: '+12%', color: 'text-blue-400' },
            { label: 'Conversion Rate', value: '24.5%', icon: CheckCircle, change: '+3.2%', color: 'text-green-400' },
            { label: 'Avg Lead Value', value: '$68,750', icon: Calendar, change: '+8.1%', color: 'text-yellow-400' },
            { label: 'Follow-ups Today', value: '8', icon: Bell, change: '+2', color: 'text-purple-400' }
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
              Ready to Transform Your Lead Management?
            </h3>
            <p className="text-white/80 mb-6 max-w-2xl mx-auto">
              Join sales teams that have increased their conversion rates by 40% 
              with our intelligent lead management platform.
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
                Schedule Demo
              </motion.a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
