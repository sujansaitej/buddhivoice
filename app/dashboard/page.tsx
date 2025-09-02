'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { 
  Phone, 
  PhoneCall, 
  PhoneOff, 
  Megaphone, 
  RefreshCw, 
  Filter,
  Users,
  Clock,
  CheckCircle,
  XCircle,
  AlertCircle,
  TrendingUp,
  TrendingDown,
  Activity
} from 'lucide-react'

export default function DashboardPage() {
  const [isDarkMode, setIsDarkMode] = useState(true)
  const [currentTime, setCurrentTime] = useState(new Date())

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date())
    }, 1000)
    return () => clearInterval(timer)
  }, [])

  const callStatusCards = [
    {
      title: 'Live Calls',
      icon: Phone,
      gradient: 'from-blue-500 to-blue-600',
      incoming: 12,
      outgoing: 8,
      type: 'live'
    },
    {
      title: 'Connected Calls',
      icon: PhoneCall,
      gradient: 'from-green-500 to-green-600',
      incoming: 45,
      outgoing: 32,
      type: 'connected'
    },
    {
      title: 'Failed Calls',
      icon: PhoneOff,
      gradient: 'from-red-500 to-red-600',
      incoming: 3,
      outgoing: 2,
      type: 'failed'
    },
    {
      title: 'Campaign Calls',
      icon: Megaphone,
      gradient: 'from-cyan-500 to-cyan-600',
      answered: 156,
      notAnswered: 23,
      type: 'campaign'
    },
    {
      title: 'Total Calls',
      icon: Phone,
      gradient: 'from-purple-500 to-purple-600',
      incoming: 89,
      outgoing: 67,
      type: 'total'
    }
  ]

  const agentStatuses = [
    { label: 'On Call', count: 15, color: 'text-blue-500' },
    { label: 'W/A + On Break', count: 8, color: 'text-yellow-500' },
    { label: 'On Hold', count: 3, color: 'text-orange-500' },
    { label: 'Available', count: 12, color: 'text-green-500' },
    { label: 'On Popup', count: 2, color: 'text-purple-500' },
    { label: 'Total Login', count: 40, color: 'text-gray-500' }
  ]

  const summaryStats = [
    { label: 'Total Connected', value: '77', color: 'text-green-500' },
    { label: 'Total Failed', value: '5', color: 'text-red-500' },
    { label: 'Total Service Count', value: '94%', color: 'text-blue-500' },
    { label: 'Average ACD', value: '03:45:22', color: 'text-purple-500' }
  ]

  return (
    <div className="space-y-6">
      {/* Current Call Status Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl p-6 border ${isDarkMode ? 'border-gray-700' : 'border-gray-200'}`}
      >
        {/* Section Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
                         <h2 className={`text-xl font-semibold ${isDarkMode ? 'text-white' : 'text-black'}`}>
               Current Call Status
             </h2>
            <button className={`p-2 rounded-lg transition-colors ${isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'}`}>
              <RefreshCw className={`w-4 h-4 ${isDarkMode ? 'text-white' : 'text-gray-600'}`} />
            </button>
          </div>
          
          {/* Filters */}
          <div className="flex items-center space-x-3">
            <select className={`px-3 py-2 rounded-lg text-sm border ${isDarkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-700'}`}>
              <option>Select Department</option>
            </select>
            <select className={`px-3 py-2 rounded-lg text-sm border ${isDarkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-700'}`}>
              <option>Select DID</option>
            </select>
            <select className={`px-3 py-2 rounded-lg text-sm border ${isDarkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-700'}`}>
              <option>Today</option>
            </select>
          </div>
        </div>

        {/* Call Status Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          {callStatusCards.map((card, index) => (
            <motion.div
              key={card.title}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className={`bg-gradient-to-br ${card.gradient} rounded-xl p-4 text-white`}
            >
              <div className="flex items-center justify-between mb-3">
                <card.icon className="w-6 h-6" />
                <span className="text-sm opacity-90">{card.title}</span>
              </div>
              
              {card.type === 'campaign' ? (
                <div className="space-y-1">
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="w-4 h-4" />
                    <span className="text-sm">Answered {card.answered}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <XCircle className="w-4 h-4" />
                    <span className="text-sm">Not Answered {card.notAnswered}</span>
                  </div>
                </div>
              ) : (
                <div className="space-y-1">
                  <div className="flex items-center space-x-2">
                    <TrendingUp className="w-4 h-4" />
                    <span className="text-sm">Incoming {card.incoming}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <TrendingDown className="w-4 h-4" />
                    <span className="text-sm">Outgoing {card.outgoing}</span>
                  </div>
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* User Activity Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl p-6 border ${isDarkMode ? 'border-gray-700' : 'border-gray-200'}`}
      >
        {/* Section Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
                         <h2 className={`text-xl font-semibold ${isDarkMode ? 'text-white' : 'text-black'}`}>
               User Activity
             </h2>
            <button className={`p-2 rounded-lg transition-colors ${isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'}`}>
              <RefreshCw className={`w-4 h-4 ${isDarkMode ? 'text-white' : 'text-gray-600'}`} />
            </button>
          </div>
          
          {/* Filters */}
          <div className="flex items-center space-x-3">
            <select className={`px-3 py-2 rounded-lg text-sm border ${isDarkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-700'}`}>
              <option>Available</option>
            </select>
            <select className={`px-3 py-2 rounded-lg text-sm border ${isDarkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-700'}`}>
              <option>Select department</option>
            </select>
            <select className={`px-3 py-2 rounded-lg text-sm border ${isDarkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-700'}`}>
              <option>All Calls</option>
            </select>
          </div>
        </div>

        {/* Agent Status Indicators */}
        <div className="flex flex-wrap gap-4 mb-6">
          {agentStatuses.map((status, index) => (
            <motion.div
              key={status.label}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className={`px-4 py-2 rounded-lg ${isDarkMode ? 'bg-gray-700' : 'bg-gray-100'}`}
            >
              <span className={`text-sm font-medium ${status.color}`}>
                {status.label} {status.count}
              </span>
            </motion.div>
          ))}
        </div>

        {/* User Activity Data */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[
            { name: 'John Smith', status: 'On Call', duration: '05:23', department: 'Sales' },
            { name: 'Sarah Johnson', status: 'Available', duration: '00:00', department: 'Support' },
            { name: 'Mike Chen', status: 'On Break', duration: '12:45', department: 'Sales' },
            { name: 'Emily Davis', status: 'On Call', duration: '02:15', department: 'Support' },
            { name: 'David Wilson', status: 'Available', duration: '00:00', department: 'Sales' },
            { name: 'Lisa Brown', status: 'On Hold', duration: '01:30', department: 'Support' }
          ].map((user, index) => (
            <motion.div
              key={user.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className={`p-4 rounded-lg border ${isDarkMode ? 'bg-gray-700 border-gray-600' : 'bg-gray-50 border-gray-200'}`}
            >
              <div className="flex items-center justify-between mb-2">
                <h4 className={`font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{user.name}</h4>
                <span className={`text-xs px-2 py-1 rounded-full ${
                  user.status === 'On Call' ? 'bg-blue-100 text-blue-800' :
                  user.status === 'Available' ? 'bg-green-100 text-green-800' :
                  user.status === 'On Break' ? 'bg-yellow-100 text-yellow-800' :
                  'bg-orange-100 text-orange-800'
                }`}>
                  {user.status}
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className={`${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  Duration: {user.duration}
                </span>
                <span className={`${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  {user.department}
                </span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Summary Statistics */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6 pt-6 border-t border-gray-600">
          {summaryStats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="text-center"
            >
              <div className={`text-2xl font-bold ${stat.color} mb-1`}>
                {stat.value}
              </div>
                             <div className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-700'}`}>
                 {stat.label}
               </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Outgoing Call Status Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl p-6 border ${isDarkMode ? 'border-gray-700' : 'border-gray-200'}`}
      >
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
                         <h2 className={`text-xl font-semibold ${isDarkMode ? 'text-white' : 'text-black'}`}>
               Outgoing Call Status
             </h2>
            <button className={`p-2 rounded-lg transition-colors ${isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'}`}>
              <RefreshCw className={`w-4 h-4 ${isDarkMode ? 'text-white' : 'text-gray-600'}`} />
            </button>
          </div>
          
          <div className="flex items-center space-x-3">
            <select className={`px-3 py-2 rounded-lg text-sm border ${isDarkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-700'}`}>
              <option>Select DID</option>
            </select>
            <select className={`px-3 py-2 rounded-lg text-sm border ${isDarkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-700'}`}>
              <option>Today</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { label: 'Total Outgoing', value: '67', color: 'text-blue-500' },
            { label: 'Connected', value: '62', color: 'text-green-500' },
            { label: 'Failed', value: '5', color: 'text-red-500' },
            { label: 'Success Rate', value: '92.5%', color: 'text-purple-500' }
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className={`p-4 rounded-lg border ${isDarkMode ? 'bg-gray-700 border-gray-600' : 'bg-gray-50 border-gray-200'} text-center`}
            >
              <div className={`text-2xl font-bold ${stat.color} mb-1`}>
                {stat.value}
              </div>
              <div className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                {stat.label}
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Outgoing Call Report Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.6 }}
        className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl p-6 border ${isDarkMode ? 'border-gray-700' : 'border-gray-200'}`}
      >
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
                         <h2 className={`text-xl font-semibold ${isDarkMode ? 'text-white' : 'text-black'}`}>
               Outgoing Call Report
             </h2>
            <button className={`p-2 rounded-lg transition-colors ${isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'}`}>
              <RefreshCw className={`w-4 h-4 ${isDarkMode ? 'text-white' : 'text-gray-600'}`} />
            </button>
          </div>
          
          <div className="flex items-center space-x-3">
            <select className={`px-3 py-2 rounded-lg text-sm border ${isDarkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-700'}`}>
              <option>Select DID</option>
            </select>
            <select className={`px-3 py-2 rounded-lg text-sm border ${isDarkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-700'}`}>
              <option>Select department</option>
            </select>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className={`w-full ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
            <thead>
              <tr className={`border-b ${isDarkMode ? 'border-gray-600' : 'border-gray-200'}`}>
                <th className="text-left py-3 px-4 font-medium">Time</th>
                <th className="text-left py-3 px-4 font-medium">Number</th>
                <th className="text-left py-3 px-4 font-medium">Duration</th>
                <th className="text-left py-3 px-4 font-medium">Status</th>
                <th className="text-left py-3 px-4 font-medium">Agent</th>
              </tr>
            </thead>
            <tbody>
              {[
                { time: '14:30:15', number: '+91 98765 43210', duration: '02:45', status: 'Connected', agent: 'John Smith' },
                { time: '14:28:42', number: '+91 87654 32109', duration: '00:00', status: 'Failed', agent: 'Sarah Johnson' },
                { time: '14:25:18', number: '+91 76543 21098', duration: '01:23', status: 'Connected', agent: 'Mike Chen' },
                { time: '14:22:55', number: '+91 65432 10987', duration: '03:12', status: 'Connected', agent: 'Emily Davis' },
                { time: '14:20:33', number: '+91 54321 09876', duration: '00:00', status: 'Failed', agent: 'David Wilson' },
                { time: '14:18:07', number: '+91 43210 98765', duration: '02:18', status: 'Connected', agent: 'Lisa Brown' }
              ].map((call, index) => (
                <motion.tr
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  className={`border-b ${isDarkMode ? 'border-gray-700 hover:bg-gray-700' : 'border-gray-200 hover:bg-gray-50'}`}
                >
                  <td className="py-3 px-4">{call.time}</td>
                  <td className="py-3 px-4">{call.number}</td>
                  <td className="py-3 px-4">{call.duration}</td>
                  <td className="py-3 px-4">
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      call.status === 'Connected' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                    }`}>
                      {call.status}
                    </span>
                  </td>
                  <td className="py-3 px-4">{call.agent}</td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>
    </div>
  )
}
