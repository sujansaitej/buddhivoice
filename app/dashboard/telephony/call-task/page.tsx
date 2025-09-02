'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Plus, Phone, Clock, User, Edit, Trash2, Search, Filter, Play, Pause } from 'lucide-react'
import DataTable from '../../../../components/ui/DataTable'
import Modal from '../../../../components/ui/Modal'
import Form from '../../../../components/ui/Form'

interface CallTask {
  id: string
  name: string
  type: 'outbound' | 'inbound' | 'callback'
  status: 'active' | 'paused' | 'completed' | 'failed'
  targetNumber: string
  assignedTo: string
  priority: 'low' | 'medium' | 'high'
  scheduledAt: string
  createdAt: string
  description: string
  attempts: number
}

export default function CallTaskPage() {
  const [isDarkMode, setIsDarkMode] = useState(true)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingTask, setEditingTask] = useState<CallTask | null>(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [filterStatus, setFilterStatus] = useState('all')
  const [filterType, setFilterType] = useState('all')

  const mockData: CallTask[] = [
    {
      id: '1',
      name: 'Follow-up Call - Customer A',
      type: 'outbound',
      status: 'active',
      targetNumber: '+91 98765 43210',
      assignedTo: 'John Smith',
      priority: 'high',
      scheduledAt: '2024-01-20 14:00:00',
      createdAt: '2024-01-15 10:30:00',
      description: 'Follow-up call for product demo',
      attempts: 2
    },
    {
      id: '2',
      name: 'Callback Request',
      type: 'callback',
      status: 'paused',
      targetNumber: '+91 99999 99999',
      assignedTo: 'Sarah Johnson',
      priority: 'medium',
      scheduledAt: '2024-01-21 10:00:00',
      createdAt: '2024-01-14 14:20:00',
      description: 'Customer requested callback',
      attempts: 1
    },
    {
      id: '3',
      name: 'Sales Call - Lead B',
      type: 'outbound',
      status: 'completed',
      targetNumber: '+91 88888 88888',
      assignedTo: 'Mike Chen',
      priority: 'medium',
      scheduledAt: '2024-01-19 16:00:00',
      createdAt: '2024-01-13 09:15:00',
      description: 'Initial sales call',
      attempts: 1
    },
    {
      id: '4',
      name: 'Support Call',
      type: 'inbound',
      status: 'failed',
      targetNumber: '+91 77777 77777',
      assignedTo: 'Emily Davis',
      priority: 'low',
      scheduledAt: '2024-01-18 11:30:00',
      createdAt: '2024-01-12 16:45:00',
      description: 'Technical support call',
      attempts: 3
    },
    {
      id: '5',
      name: 'Urgent Callback',
      type: 'callback',
      status: 'active',
      targetNumber: '+91 66666 66666',
      assignedTo: 'David Wilson',
      priority: 'high',
      scheduledAt: '2024-01-20 09:00:00',
      createdAt: '2024-01-11 11:30:00',
      description: 'Urgent customer callback',
      attempts: 0
    }
  ]

  const filteredData = mockData.filter(task => {
    const matchesSearch = task.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         task.targetNumber.includes(searchTerm) ||
                         task.assignedTo.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = filterStatus === 'all' || task.status === filterStatus
    const matchesType = filterType === 'all' || task.type === filterType
    return matchesSearch && matchesStatus && matchesType
  })

  const columns = [
    { key: 'name', label: 'Task Name', sortable: true },
    { key: 'type', label: 'Type', sortable: true },
    { key: 'targetNumber', label: 'Target Number', sortable: true },
    { key: 'assignedTo', label: 'Assigned To', sortable: true },
    { key: 'priority', label: 'Priority', sortable: true },
    { key: 'status', label: 'Status', sortable: true },
    { key: 'scheduledAt', label: 'Scheduled At', sortable: true },
    { key: 'actions', label: 'Actions', sortable: false }
  ]

  const handleEdit = (task: CallTask) => {
    setEditingTask(task)
    setIsModalOpen(true)
  }

  const handleDelete = (id: string) => {
    console.log('Delete call task:', id)
  }

  const handlePlay = (id: string) => {
    console.log('Start call task:', id)
  }

  const handlePause = (id: string) => {
    console.log('Pause call task:', id)
  }

  const renderCell = (key: string, value: any, row: CallTask) => {
    if (key === 'status') {
      const statusColors = {
        active: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
        paused: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200',
        completed: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
        failed: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
      }
      return (
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusColors[row.status]}`}>
          {value}
        </span>
      )
    }

    if (key === 'priority') {
      const priorityColors = {
        low: 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200',
        medium: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200',
        high: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
      }
      return (
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${priorityColors[row.priority]}`}>
          {value}
        </span>
      )
    }

    if (key === 'type') {
      return (
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
          value === 'outbound' 
            ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
            : value === 'inbound'
            ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
            : 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200'
        }`}>
          {value}
        </span>
      )
    }

    if (key === 'targetNumber') {
      return (
        <div className="flex items-center space-x-2">
          <Phone className={`w-4 h-4 ${isDarkMode ? 'text-white/60' : 'text-gray-500'}`} />
          <span className="font-mono">{value}</span>
        </div>
      )
    }

    if (key === 'assignedTo') {
      return (
        <div className="flex items-center space-x-2">
          <User className={`w-4 h-4 ${isDarkMode ? 'text-white/60' : 'text-gray-500'}`} />
          <span>{value}</span>
        </div>
      )
    }

    if (key === 'scheduledAt') {
      return (
        <div className="flex items-center space-x-2">
          <Clock className={`w-4 h-4 ${isDarkMode ? 'text-white/60' : 'text-gray-500'}`} />
          <span>{new Date(value).toLocaleString()}</span>
        </div>
      )
    }

    if (key === 'actions') {
      return (
        <div className="flex items-center space-x-2">
          {row.status === 'active' ? (
            <button
              onClick={() => handlePause(row.id)}
              className={`p-1 rounded hover:bg-gray-100 dark:hover:bg-gray-700 ${
                isDarkMode ? 'text-white' : 'text-gray-600'
              }`}
              title="Pause"
            >
              <Pause className="w-4 h-4" />
            </button>
          ) : (
            <button
              onClick={() => handlePlay(row.id)}
              className={`p-1 rounded hover:bg-gray-100 dark:hover:bg-gray-700 ${
                isDarkMode ? 'text-white' : 'text-gray-600'
              }`}
              title="Start"
            >
              <Play className="w-4 h-4" />
            </button>
          )}
          <button
            onClick={() => handleEdit(row)}
            className={`p-1 rounded hover:bg-gray-100 dark:hover:bg-gray-700 ${
              isDarkMode ? 'text-white' : 'text-gray-600'
            }`}
            title="Edit"
          >
            <Edit className="w-4 h-4" />
          </button>
          <button
            onClick={() => handleDelete(row.id)}
            className={`p-1 rounded hover:bg-gray-100 dark:hover:bg-gray-700 ${
              isDarkMode ? 'text-white' : 'text-gray-600'
            }`}
            title="Delete"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      )
    }

    return value
  }

  const formFields: Array<{n    name: stringn    label: stringn    type: 'text' | 'email' | 'password' | 'number' | 'select' | 'textarea' | 'checkbox' | 'date'n    required: booleann    value: anyn    options?: Array<{ value: string; label: string }>n  }> = [
    {
      name: 'name',
      label: 'Task Name',
      type: 'text',
      required: true,
      value: editingTask?.name || ''
    },
    {
      name: 'type',
      label: 'Task Type',
      type: 'select',
      required: true,
      value: editingTask?.type || 'outbound',
      options: [
        { value: 'outbound', label: 'Outbound Call' },
        { value: 'inbound', label: 'Inbound Call' },
        { value: 'callback', label: 'Callback' }
      ]
    },
    {
      name: 'targetNumber',
      label: 'Target Number',
      type: 'text',
      required: true,
      value: editingTask?.targetNumber || '',
      placeholder: 'Enter phone number'
    },
    {
      name: 'assignedTo',
      label: 'Assigned To',
      type: 'text',
      required: true,
      value: editingTask?.assignedTo || ''
    },
    {
      name: 'priority',
      label: 'Priority',
      type: 'select',
      required: true,
      value: editingTask?.priority || 'medium',
      options: [
        { value: 'low', label: 'Low' },
        { value: 'medium', label: 'Medium' },
        { value: 'high', label: 'High' }
      ]
    },
    {
      name: 'scheduledAt',
      label: 'Scheduled At',
      type: 'datetime-local',
      required: true,
      value: editingTask?.scheduledAt ? new Date(editingTask.scheduledAt).toISOString().slice(0, 16) : ''
    },
    {
      name: 'description',
      label: 'Description',
      type: 'textarea',
      required: false,
      value: editingTask?.description || ''
    },
    {
      name: 'status',
      label: 'Status',
      type: 'select',
      required: true,
      value: editingTask?.status || 'active',
      options: [
        { value: 'active', label: 'Active' },
        { value: 'paused', label: 'Paused' },
        { value: 'completed', label: 'Completed' },
        { value: 'failed', label: 'Failed' }
      ]
    }
  ]

  return (
    <div className={`min-h-screen transition-all duration-500 ${isDarkMode ? 'dark' : 'light'}`}>
      <div className="p-6">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-black'}`}>
              Call Tasks
            </h1>
            <p className={`mt-1 ${isDarkMode ? 'text-white/70' : 'text-gray-600'}`}>
              Manage outbound calls, callbacks, and scheduled call tasks
            </p>
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="btn-primary flex items-center space-x-2"
            onClick={() => {
              setEditingTask(null)
              setIsModalOpen(true)
            }}
          >
            <Plus className="w-4 h-4" />
            <span>Add Task</span>
          </motion.button>
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="flex-1">
            <div className="relative">
              <Search className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 ${
                isDarkMode ? 'text-white/40' : 'text-gray-400'
              }`} />
              <input
                type="text"
                placeholder="Search call tasks..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className={`w-full pl-10 pr-4 py-2 rounded-lg border transition-colors ${
                  isDarkMode 
                    ? 'bg-white/10 border-white/20 text-white placeholder-white/40' 
                    : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                }`}
              />
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Filter className={`w-4 h-4 ${isDarkMode ? 'text-white/40' : 'text-gray-400'}`} />
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className={`px-3 py-2 rounded-lg border transition-colors ${
                isDarkMode 
                  ? 'bg-white/10 border-white/20 text-white' 
                  : 'bg-white border-gray-300 text-gray-900'
              }`}
            >
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="paused">Paused</option>
              <option value="completed">Completed</option>
              <option value="failed">Failed</option>
            </select>
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className={`px-3 py-2 rounded-lg border transition-colors ${
                isDarkMode 
                  ? 'bg-white/10 border-white/20 text-white' 
                  : 'bg-white border-gray-300 text-gray-900'
              }`}
            >
              <option value="all">All Types</option>
              <option value="outbound">Outbound</option>
              <option value="inbound">Inbound</option>
              <option value="callback">Callback</option>
            </select>
          </div>
        </div>

        {/* Data Table */}
        <div className={`rounded-xl border ${
          isDarkMode ? 'bg-white/5 border-white/10' : 'bg-white border-gray-200'
        }`}>
          <DataTable
            data={filteredData}
            columns={columns}
            renderCell={renderCell}
            isDarkMode={isDarkMode}
          />
        </div>

        {/* Modal */}
        <Modal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          title={editingTask ? 'Edit Call Task' : 'Add Call Task'}
          isDarkMode={isDarkMode}
        >
          <Form
            fields={formFields}
            onSubmit={(data) => {
              console.log('Form submitted:', data)
              setIsModalOpen(false)
            }}
            onCancel={() => setIsModalOpen(false)}
            isDarkMode={isDarkMode}
          />
        </Modal>
      </div>
    </div>
  )
}
