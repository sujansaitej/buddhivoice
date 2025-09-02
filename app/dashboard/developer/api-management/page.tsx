'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  Code, 
  Globe, 
  Settings, 
  Activity, 
  TrendingUp, 
  Clock, 
  CheckCircle, 
  AlertCircle,
  RefreshCw,
  Download,
  Filter,
  Search
} from 'lucide-react'

interface APIEndpoint {
  id: string
  name: string
  method: 'GET' | 'POST' | 'PUT' | 'DELETE'
  endpoint: string
  description: string
  status: 'Active' | 'Deprecated' | 'Beta'
  requests: number
  avgResponseTime: number
  lastUsed: string
}

const mockEndpoints: APIEndpoint[] = [
  {
    id: '1',
    name: 'Get Call Logs',
    method: 'GET',
    endpoint: '/api/v1/calls',
    description: 'Retrieve call logs with filtering and pagination',
    status: 'Active',
    requests: 15420,
    avgResponseTime: 245,
    lastUsed: '2024-01-22 14:30:15'
  },
  {
    id: '2',
    name: 'Create Lead',
    method: 'POST',
    endpoint: '/api/v1/leads',
    description: 'Create a new lead in the CRM system',
    status: 'Active',
    requests: 8920,
    avgResponseTime: 180,
    lastUsed: '2024-01-22 14:25:30'
  },
  {
    id: '3',
    name: 'Update User',
    method: 'PUT',
    endpoint: '/api/v1/users/{id}',
    description: 'Update user information',
    status: 'Active',
    requests: 3240,
    avgResponseTime: 320,
    lastUsed: '2024-01-22 14:20:45'
  },
  {
    id: '4',
    name: 'Delete Campaign',
    method: 'DELETE',
    endpoint: '/api/v1/campaigns/{id}',
    description: 'Delete a campaign and all associated data',
    status: 'Deprecated',
    requests: 120,
    avgResponseTime: 450,
    lastUsed: '2024-01-20 10:15:20'
  },
  {
    id: '5',
    name: 'Webhook Events',
    method: 'POST',
    endpoint: '/api/v1/webhooks',
    description: 'Send webhook events for real-time notifications',
    status: 'Beta',
    requests: 560,
    avgResponseTime: 95,
    lastUsed: '2024-01-22 14:35:10'
  }
]

export default function APIManagementPage() {
  const [isDarkMode, setIsDarkMode] = useState(true)
  const [endpoints, setEndpoints] = useState<APIEndpoint[]>(mockEndpoints)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedStatus, setSelectedStatus] = useState('all')
  const [selectedMethod, setSelectedMethod] = useState('all')

  const filteredEndpoints = endpoints.filter(endpoint => {
    const matchesSearch = endpoint.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         endpoint.endpoint.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         endpoint.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = selectedStatus === 'all' || endpoint.status === selectedStatus
    const matchesMethod = selectedMethod === 'all' || endpoint.method === selectedMethod
    
    return matchesSearch && matchesStatus && matchesMethod
  })

  const getMethodColor = (method: string) => {
    switch (method) {
      case 'GET': return 'bg-green-100 text-green-800'
      case 'POST': return 'bg-blue-100 text-blue-800'
      case 'PUT': return 'bg-yellow-100 text-yellow-800'
      case 'DELETE': return 'bg-red-100 text-red-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active': return 'bg-green-100 text-green-800'
      case 'Deprecated': return 'bg-yellow-100 text-yellow-800'
      case 'Beta': return 'bg-blue-100 text-blue-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Active': return <CheckCircle className="w-4 h-4 text-green-500" />
      case 'Deprecated': return <AlertCircle className="w-4 h-4 text-yellow-500" />
      case 'Beta': return <AlertCircle className="w-4 h-4 text-blue-500" />
      default: return <AlertCircle className="w-4 h-4 text-gray-500" />
    }
  }

  const totalRequests = endpoints.reduce((sum, endpoint) => sum + endpoint.requests, 0)
  const avgResponseTime = endpoints.reduce((sum, endpoint) => sum + endpoint.avgResponseTime, 0) / endpoints.length

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">API Management</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            Monitor and manage your API endpoints, usage, and performance
          </p>
        </div>
        <div className="flex space-x-3">
          <button className="btn-secondary flex items-center space-x-2">
            <RefreshCw className="w-4 h-4" />
            <span>Refresh</span>
          </button>
          <button className="btn-secondary flex items-center space-x-2">
            <Download className="w-4 h-4" />
            <span>Export</span>
          </button>
        </div>
      </div>

      {/* API Overview Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[
          { label: 'Total Endpoints', value: endpoints.length.toString(), icon: Code, color: 'text-blue-500' },
          { label: 'Total Requests', value: totalRequests.toLocaleString(), icon: Activity, color: 'text-green-500' },
          { label: 'Avg Response Time', value: `${Math.round(avgResponseTime)}ms`, icon: Clock, color: 'text-yellow-500' },
          { label: 'Active Endpoints', value: endpoints.filter(e => e.status === 'Active').length.toString(), icon: CheckCircle, color: 'text-purple-500' }
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
          <div className="flex items-center space-x-2">
            <Filter className={`w-5 h-5 ${isDarkMode ? 'text-white' : 'text-gray-600'}`} />
            <span className={`font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Filters:</span>
          </div>
          
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search endpoints..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className={`w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent ${
                isDarkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'
              }`}
            />
          </div>

          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className={`px-3 py-2 border rounded-lg text-sm ${
              isDarkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-700'
            }`}
          >
            <option value="all">All Status</option>
            <option value="Active">Active</option>
            <option value="Deprecated">Deprecated</option>
            <option value="Beta">Beta</option>
          </select>

          <select
            value={selectedMethod}
            onChange={(e) => setSelectedMethod(e.target.value)}
            className={`px-3 py-2 border rounded-lg text-sm ${
              isDarkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-700'
            }`}
          >
            <option value="all">All Methods</option>
            <option value="GET">GET</option>
            <option value="POST">POST</option>
            <option value="PUT">PUT</option>
            <option value="DELETE">DELETE</option>
          </select>
        </div>
      </motion.div>

      {/* API Endpoints Table */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.4 }}
        className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'} rounded-lg border ${isDarkMode ? 'border-gray-700' : 'border-gray-200'}`}
      >
        <div className="p-6 border-b border-gray-200 dark:border-gray-700">
          <h3 className={`text-lg font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
            API Endpoints ({filteredEndpoints.length})
          </h3>
        </div>
        
        <div className="overflow-x-auto">
          <table className={`w-full ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
            <thead>
              <tr className={`border-b ${isDarkMode ? 'border-gray-700' : 'border-gray-200'}`}>
                <th className="text-left py-3 px-4 font-medium">Method</th>
                <th className="text-left py-3 px-4 font-medium">Endpoint</th>
                <th className="text-left py-3 px-4 font-medium">Description</th>
                <th className="text-left py-3 px-4 font-medium">Status</th>
                <th className="text-left py-3 px-4 font-medium">Requests</th>
                <th className="text-left py-3 px-4 font-medium">Avg Response</th>
                <th className="text-left py-3 px-4 font-medium">Last Used</th>
              </tr>
            </thead>
            <tbody>
              {filteredEndpoints.map((endpoint, index) => (
                <motion.tr
                  key={endpoint.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  className={`border-b ${isDarkMode ? 'border-gray-700 hover:bg-gray-700' : 'border-gray-200 hover:bg-gray-50'}`}
                >
                  <td className="py-3 px-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getMethodColor(endpoint.method)}`}>
                      {endpoint.method}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <code className={`px-2 py-1 rounded text-sm ${isDarkMode ? 'bg-gray-700' : 'bg-gray-100'}`}>
                      {endpoint.endpoint}
                    </code>
                  </td>
                  <td className="py-3 px-4 max-w-xs">
                    <p className="truncate">{endpoint.description}</p>
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex items-center space-x-2">
                      {getStatusIcon(endpoint.status)}
                      <span className={`px-2 py-1 rounded-full text-xs ${getStatusColor(endpoint.status)}`}>
                        {endpoint.status}
                      </span>
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <span className="font-mono">{endpoint.requests.toLocaleString()}</span>
                  </td>
                  <td className="py-3 px-4">
                    <span className="font-mono">{endpoint.avgResponseTime}ms</span>
                  </td>
                  <td className="py-3 px-4">
                    <span className="text-sm">{endpoint.lastUsed}</span>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>

      {/* API Documentation Link */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.6 }}
        className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'} rounded-lg p-6 border ${isDarkMode ? 'border-gray-700' : 'border-gray-200'}`}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Globe className={`w-6 h-6 ${isDarkMode ? 'text-white' : 'text-gray-600'}`} />
            <div>
              <h3 className={`font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                API Documentation
              </h3>
              <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                Access comprehensive API documentation and examples
              </p>
            </div>
          </div>
          <button className="btn-primary">
            View Documentation
          </button>
        </div>
      </motion.div>
    </div>
  )
}
