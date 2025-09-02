'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  Phone, 
  PhoneCall, 
  PhoneOff, 
  Clock, 
  Users, 
  TrendingUp, 
  TrendingDown,
  Filter,
  Download,
  RefreshCw,
  Eye
} from 'lucide-react'

export default function LiveCallReportPage() {
  const [isDarkMode, setIsDarkMode] = useState(true)
  const [selectedDate, setSelectedDate] = useState('today')
  const [selectedDepartment, setSelectedDepartment] = useState('all')

  const liveCalls = [
    {
      id: '1',
      callerId: '+91 98765 43210',
      agent: 'John Smith',
      department: 'Sales',
      status: 'Connected',
      duration: '02:45',
      startTime: '14:30:15',
      callType: 'Incoming',
      queue: 'Sales Queue'
    },
    {
      id: '2',
      callerId: '+91 87654 32109',
      agent: 'Sarah Johnson',
      department: 'Support',
      status: 'Ringing',
      duration: '00:00',
      startTime: '14:32:20',
      callType: 'Incoming',
      queue: 'Support Queue'
    },
    {
      id: '3',
      callerId: '+91 76543 21098',
      agent: 'Mike Chen',
      department: 'Sales',
      status: 'Connected',
      duration: '01:23',
      startTime: '14:25:18',
      callType: 'Outgoing',
      queue: 'Sales Queue'
    },
    {
      id: '4',
      callerId: '+91 65432 10987',
      agent: 'Emily Davis',
      department: 'Support',
      status: 'On Hold',
      duration: '03:12',
      startTime: '14:22:55',
      callType: 'Incoming',
      queue: 'Support Queue'
    },
    {
      id: '5',
      callerId: '+91 54321 09876',
      agent: 'David Wilson',
      department: 'Sales',
      status: 'Connected',
      duration: '00:45',
      startTime: '14:35:10',
      callType: 'Outgoing',
      queue: 'Sales Queue'
    }
  ]

  const summaryStats = [
    { label: 'Total Live Calls', value: '5', icon: Phone, color: 'text-blue-500' },
    { label: 'Connected', value: '3', icon: PhoneCall, color: 'text-green-500' },
    { label: 'Ringing', value: '1', icon: Phone, color: 'text-yellow-500' },
    { label: 'On Hold', value: '1', icon: Clock, color: 'text-orange-500' }
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Connected': return 'bg-green-100 text-green-800'
      case 'Ringing': return 'bg-yellow-100 text-yellow-800'
      case 'On Hold': return 'bg-orange-100 text-orange-800'
      case 'Failed': return 'bg-red-100 text-red-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getCallTypeColor = (type: string) => {
    return type === 'Incoming' ? 'text-blue-500' : 'text-purple-500'
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Live Call Report</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            Real-time monitoring of active calls and call center performance
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

      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {summaryStats.map((stat, index) => (
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
          <select
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            className={`px-3 py-2 border rounded-lg text-sm ${
              isDarkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-700'
            }`}
          >
            <option value="today">Today</option>
            <option value="yesterday">Yesterday</option>
            <option value="thisWeek">This Week</option>
            <option value="thisMonth">This Month</option>
            <option value="custom">Custom Range</option>
          </select>
          <select
            value={selectedDepartment}
            onChange={(e) => setSelectedDepartment(e.target.value)}
            className={`px-3 py-2 border rounded-lg text-sm ${
              isDarkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-700'
            }`}
          >
            <option value="all">All Departments</option>
            <option value="sales">Sales</option>
            <option value="support">Support</option>
            <option value="billing">Billing</option>
          </select>
        </div>
      </motion.div>

      {/* Live Calls Table */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.4 }}
        className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'} rounded-lg border ${isDarkMode ? 'border-gray-700' : 'border-gray-200'}`}
      >
        <div className="p-6 border-b border-gray-200 dark:border-gray-700">
          <h3 className={`text-lg font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
            Active Calls
          </h3>
        </div>
        
        <div className="overflow-x-auto">
          <table className={`w-full ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
            <thead>
              <tr className={`border-b ${isDarkMode ? 'border-gray-700' : 'border-gray-200'}`}>
                <th className="text-left py-3 px-4 font-medium">Caller ID</th>
                <th className="text-left py-3 px-4 font-medium">Agent</th>
                <th className="text-left py-3 px-4 font-medium">Department</th>
                <th className="text-left py-3 px-4 font-medium">Status</th>
                <th className="text-left py-3 px-4 font-medium">Duration</th>
                <th className="text-left py-3 px-4 font-medium">Start Time</th>
                <th className="text-left py-3 px-4 font-medium">Type</th>
                <th className="text-left py-3 px-4 font-medium">Queue</th>
                <th className="text-left py-3 px-4 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {liveCalls.map((call, index) => (
                <motion.tr
                  key={call.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  className={`border-b ${isDarkMode ? 'border-gray-700 hover:bg-gray-700' : 'border-gray-200 hover:bg-gray-50'}`}
                >
                  <td className="py-3 px-4 font-medium">{call.callerId}</td>
                  <td className="py-3 px-4">{call.agent}</td>
                  <td className="py-3 px-4">
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      call.department === 'Sales' ? 'bg-blue-100 text-blue-800' : 'bg-green-100 text-green-800'
                    }`}>
                      {call.department}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <span className={`px-2 py-1 rounded-full text-xs ${getStatusColor(call.status)}`}>
                      {call.status}
                    </span>
                  </td>
                  <td className="py-3 px-4 font-mono">{call.duration}</td>
                  <td className="py-3 px-4 font-mono">{call.startTime}</td>
                  <td className="py-3 px-4">
                    <span className={`font-medium ${getCallTypeColor(call.callType)}`}>
                      {call.callType}
                    </span>
                  </td>
                  <td className="py-3 px-4">{call.queue}</td>
                  <td className="py-3 px-4">
                    <button className={`p-1 rounded hover:bg-gray-200 dark:hover:bg-gray-600 ${
                      isDarkMode ? 'text-white' : 'text-gray-600'
                    }`}>
                      <Eye className="w-4 h-4" />
                    </button>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>

      {/* Real-time Updates Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4, delay: 0.6 }}
        className="flex items-center justify-center space-x-2 text-sm text-gray-500"
      >
        <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
        <span>Live updates enabled</span>
      </motion.div>
    </div>
  )
}
