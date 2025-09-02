'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  Plug, 
  Plus, 
  Settings, 
  CheckCircle, 
  AlertCircle, 
  ExternalLink,
  Code,
  Database,
  Globe,
  Smartphone,
  Mail,
  MessageSquare
} from 'lucide-react'

interface Integration {
  id: string
  name: string
  type: 'API' | 'Webhook' | 'Database' | 'Third-party'
  status: 'Connected' | 'Disconnected' | 'Error' | 'Pending'
  description: string
  lastSync: string
  icon: any
}

const mockIntegrations: Integration[] = [
  {
    id: '1',
    name: 'Salesforce CRM',
    type: 'Third-party',
    status: 'Connected',
    description: 'Sync leads and contacts with Salesforce CRM',
    lastSync: '2024-01-22 14:30:15',
    icon: Database
  },
  {
    id: '2',
    name: 'WhatsApp Business API',
    type: 'API',
    status: 'Connected',
    description: 'Send and receive WhatsApp messages',
    lastSync: '2024-01-22 14:25:30',
    icon: MessageSquare
  },
  {
    id: '3',
    name: 'Email Service',
    type: 'API',
    status: 'Connected',
    description: 'Send automated emails and notifications',
    lastSync: '2024-01-22 14:20:45',
    icon: Mail
  },
  {
    id: '4',
    name: 'SMS Gateway',
    type: 'API',
    status: 'Error',
    description: 'Send SMS notifications and alerts',
    lastSync: '2024-01-22 10:15:20',
    icon: Smartphone
  },
  {
    id: '5',
    name: 'Webhook Endpoint',
    type: 'Webhook',
    status: 'Connected',
    description: 'Receive real-time notifications',
    lastSync: '2024-01-22 14:35:10',
    icon: Globe
  },
  {
    id: '6',
    name: 'MySQL Database',
    type: 'Database',
    status: 'Connected',
    description: 'Primary database connection',
    lastSync: '2024-01-22 14:30:00',
    icon: Database
  }
]

export default function IntegrationPage() {
  const [isDarkMode, setIsDarkMode] = useState(true)
  const [integrations, setIntegrations] = useState<Integration[]>(mockIntegrations)
  const [selectedType, setSelectedType] = useState('all')
  const [selectedStatus, setSelectedStatus] = useState('all')

  const filteredIntegrations = integrations.filter(integration => {
    const matchesType = selectedType === 'all' || integration.type === selectedType
    const matchesStatus = selectedStatus === 'all' || integration.status === selectedStatus
    return matchesType && matchesStatus
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Connected': return 'bg-green-100 text-green-800'
      case 'Disconnected': return 'bg-gray-100 text-gray-800'
      case 'Error': return 'bg-red-100 text-red-800'
      case 'Pending': return 'bg-yellow-100 text-yellow-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Connected': return <CheckCircle className="w-4 h-4 text-green-500" />
      case 'Disconnected': return <AlertCircle className="w-4 h-4 text-gray-500" />
      case 'Error': return <AlertCircle className="w-4 h-4 text-red-500" />
      case 'Pending': return <AlertCircle className="w-4 h-4 text-yellow-500" />
      default: return <AlertCircle className="w-4 h-4 text-gray-500" />
    }
  }

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'API': return <Code className="w-5 h-5" />
      case 'Webhook': return <Globe className="w-5 h-5" />
      case 'Database': return <Database className="w-5 h-5" />
      case 'Third-party': return <ExternalLink className="w-5 h-5" />
      default: return <Plug className="w-5 h-5" />
    }
  }

  const connectedCount = integrations.filter(i => i.status === 'Connected').length
  const errorCount = integrations.filter(i => i.status === 'Error').length

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Integrations</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            Manage your third-party integrations and API connections
          </p>
        </div>
        <button className="btn-primary flex items-center space-x-2">
          <Plus className="w-5 h-5" />
          <span>Add Integration</span>
        </button>
      </div>

      {/* Integration Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[
          { label: 'Total Integrations', value: integrations.length.toString(), icon: Plug, color: 'text-blue-500' },
          { label: 'Connected', value: connectedCount.toString(), icon: CheckCircle, color: 'text-green-500' },
          { label: 'Errors', value: errorCount.toString(), icon: AlertCircle, color: 'text-red-500' },
          { label: 'Types', value: Array.from(new Set(integrations.map(i => i.type))).length.toString(), icon: Settings, color: 'text-purple-500' }
        ].map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
            className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'} rounded-lg p-6 border ${isDarkMode ? 'border-gray-700' : 'border-gray-200'}`}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className={`text-sm font-medium ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  {stat.label}
                </p>
                <p className={`text-2xl font-bold ${stat.color} mt-1`}>
                  {stat.value}
                </p>
              </div>
              <stat.icon className={`w-8 h-8 ${stat.color}`} />
            </div>
          </motion.div>
        ))}
      </div>

      {/* Filters */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.2 }}
        className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'} rounded-lg p-6 border ${isDarkMode ? 'border-gray-700' : 'border-gray-200'}`}
      >
        <div className="flex items-center space-x-4">
          <span className={`font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Filters:</span>
          
          <select
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)}
            className={`px-3 py-2 border rounded-lg text-sm ${
              isDarkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-700'
            }`}
          >
            <option value="all">All Types</option>
            <option value="API">API</option>
            <option value="Webhook">Webhook</option>
            <option value="Database">Database</option>
            <option value="Third-party">Third-party</option>
          </select>

          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className={`px-3 py-2 border rounded-lg text-sm ${
              isDarkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-700'
            }`}
          >
            <option value="all">All Status</option>
            <option value="Connected">Connected</option>
            <option value="Disconnected">Disconnected</option>
            <option value="Error">Error</option>
            <option value="Pending">Pending</option>
          </select>
        </div>
      </motion.div>

      {/* Integrations Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredIntegrations.map((integration, index) => (
          <motion.div
            key={integration.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
            className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'} rounded-lg p-6 border ${isDarkMode ? 'border-gray-700' : 'border-gray-200'} hover:shadow-lg transition-shadow`}
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className={`p-2 rounded-lg ${isDarkMode ? 'bg-gray-700' : 'bg-gray-100'}`}>
                  <integration.icon className={`w-6 h-6 ${isDarkMode ? 'text-white' : 'text-gray-600'}`} />
                </div>
                <div>
                  <h3 className={`font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                    {integration.name}
                  </h3>
                  <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                    {integration.type}
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                {getStatusIcon(integration.status)}
                <span className={`px-2 py-1 rounded-full text-xs ${getStatusColor(integration.status)}`}>
                  {integration.status}
                </span>
              </div>
            </div>

            <p className={`text-sm mb-4 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
              {integration.description}
            </p>

            <div className="space-y-2 mb-4">
              <div className="flex justify-between text-sm">
                <span className={`${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>Last Sync:</span>
                <span className={`${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{integration.lastSync}</span>
              </div>
            </div>

            <div className="flex space-x-2">
              <button className="btn-secondary flex-1 flex items-center justify-center space-x-2">
                <Settings className="w-4 h-4" />
                <span>Configure</span>
              </button>
              <button className="btn-primary flex-1 flex items-center justify-center space-x-2">
                <ExternalLink className="w-4 h-4" />
                <span>View</span>
              </button>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Integration Categories */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.6 }}
        className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'} rounded-lg p-6 border ${isDarkMode ? 'border-gray-700' : 'border-gray-200'}`}
      >
        <h3 className={`text-lg font-semibold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
          Popular Integrations
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { name: 'Slack', description: 'Team communication', icon: MessageSquare, available: true },
            { name: 'Zapier', description: 'Workflow automation', icon: Plug, available: true },
            { name: 'HubSpot', description: 'Marketing automation', icon: Database, available: false },
            { name: 'Google Sheets', description: 'Data management', icon: Code, available: true }
          ].map((integration, index) => (
            <div
              key={integration.name}
              className={`p-4 rounded-lg border ${isDarkMode ? 'border-gray-700' : 'border-gray-200'} ${
                integration.available ? 'hover:shadow-md transition-shadow cursor-pointer' : 'opacity-50'
              }`}
            >
              <div className="flex items-center space-x-3 mb-2">
                <integration.icon className={`w-5 h-5 ${isDarkMode ? 'text-white' : 'text-gray-600'}`} />
                <h4 className={`font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                  {integration.name}
                </h4>
              </div>
              <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                {integration.description}
              </p>
              {integration.available ? (
                <button className="mt-3 text-sm text-red-500 hover:text-red-600 font-medium">
                  Connect
                </button>
              ) : (
                <span className="mt-3 text-sm text-gray-500">Coming Soon</span>
              )}
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  )
}
