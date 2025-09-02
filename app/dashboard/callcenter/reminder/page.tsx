'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Plus, Bell, Clock, User, Edit, Trash2, Search, Filter, CheckCircle, AlertCircle, Calendar } from 'lucide-react'
import DataTable from '../../../../components/ui/DataTable'
import Modal from '../../../../components/ui/Modal'
import Form from '../../../../components/ui/Form'

interface Reminder {
  id: string
  title: string
  description: string
  type: 'call' | 'follow-up' | 'meeting' | 'payment' | 'appointment'
  priority: 'low' | 'medium' | 'high' | 'urgent'
  status: 'pending' | 'completed' | 'overdue' | 'cancelled'
  assignedTo: string
  contactName: string
  contactPhone: string
  scheduledDate: string
  scheduledTime: string
  createdAt: string
  completedAt: string
  notes: string
  recurring: boolean
  recurringType: 'none' | 'daily' | 'weekly' | 'monthly'
}

export default function ReminderPage() {
  const [isDarkMode, setIsDarkMode] = useState(true)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingReminder, setEditingReminder] = useState<Reminder | null>(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [filterStatus, setFilterStatus] = useState('all')
  const [filterType, setFilterType] = useState('all')
  const [filterPriority, setFilterPriority] = useState('all')

  const mockData: Reminder[] = [
    {
      id: '1',
      title: 'Follow-up Call - Customer A',
      description: 'Follow up on product demo and pricing discussion',
      type: 'follow-up',
      priority: 'high',
      status: 'pending',
      assignedTo: 'John Smith',
      contactName: 'Alice Johnson',
      contactPhone: '+91 98765 43210',
      scheduledDate: '2024-01-22',
      scheduledTime: '14:00',
      createdAt: '2024-01-20 10:30:00',
      completedAt: '',
      notes: 'Customer showed interest in premium package',
      recurring: false,
      recurringType: 'none'
    },
    {
      id: '2',
      title: 'Payment Reminder',
      description: 'Remind customer about overdue payment',
      type: 'payment',
      priority: 'urgent',
      status: 'overdue',
      assignedTo: 'Sarah Johnson',
      contactName: 'Bob Wilson',
      contactPhone: '+91 99999 99999',
      scheduledDate: '2024-01-20',
      scheduledTime: '10:00',
      createdAt: '2024-01-18 14:20:00',
      completedAt: '',
      notes: 'Payment overdue by 5 days',
      recurring: false,
      recurringType: 'none'
    },
    {
      id: '3',
      title: 'Weekly Team Meeting',
      description: 'Weekly sales team meeting',
      type: 'meeting',
      priority: 'medium',
      status: 'completed',
      assignedTo: 'Mike Chen',
      contactName: 'Team Members',
      contactPhone: 'N/A',
      scheduledDate: '2024-01-19',
      scheduledTime: '09:00',
      createdAt: '2024-01-15 09:15:00',
      completedAt: '2024-01-19 09:30:00',
      notes: 'Discussed Q1 targets and strategies',
      recurring: true,
      recurringType: 'weekly'
    },
    {
      id: '4',
      title: 'Product Demo Call',
      description: 'Schedule product demo for new prospect',
      type: 'call',
      priority: 'high',
      status: 'pending',
      assignedTo: 'Emily Davis',
      contactName: 'Carol Brown',
      contactPhone: '+91 88888 88888',
      scheduledDate: '2024-01-23',
      scheduledTime: '15:30',
      createdAt: '2024-01-21 16:45:00',
      completedAt: '',
      notes: 'Prospect interested in enterprise solution',
      recurring: false,
      recurringType: 'none'
    },
    {
      id: '5',
      title: 'Appointment Reminder',
      description: 'Remind customer about scheduled appointment',
      type: 'appointment',
      priority: 'medium',
      status: 'pending',
      assignedTo: 'David Wilson',
      contactName: 'Diana Miller',
      contactPhone: '+91 77777 77777',
      scheduledDate: '2024-01-24',
      scheduledTime: '11:00',
      createdAt: '2024-01-22 11:30:00',
      completedAt: '',
      notes: 'On-site installation appointment',
      recurring: false,
      recurringType: 'none'
    }
  ]

  const filteredData = mockData.filter(reminder => {
    const matchesSearch = reminder.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         reminder.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         reminder.contactName.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = filterStatus === 'all' || reminder.status === filterStatus
    const matchesType = filterType === 'all' || reminder.type === filterType
    const matchesPriority = filterPriority === 'all' || reminder.priority === filterPriority
    return matchesSearch && matchesStatus && matchesType && matchesPriority
  })

  const columns = [
    { key: 'title', label: 'Title', sortable: true },
    { key: 'type', label: 'Type', sortable: true },
    { key: 'priority', label: 'Priority', sortable: true },
    { key: 'status', label: 'Status', sortable: true },
    { key: 'contactName', label: 'Contact', sortable: true },
    { key: 'assignedTo', label: 'Assigned To', sortable: true },
    { key: 'scheduledDate', label: 'Scheduled Date', sortable: true },
    { key: 'actions', label: 'Actions', sortable: false }
  ]

  const handleEdit = (reminder: Reminder) => {
    setEditingReminder(reminder)
    setIsModalOpen(true)
  }

  const handleDelete = (id: string) => {
    console.log('Delete reminder:', id)
  }

  const handleComplete = (id: string) => {
    console.log('Complete reminder:', id)
  }

  const handleCall = (phone: string) => {
    console.log('Call contact:', phone)
  }

  const renderCell = (key: string, value: any, row: Reminder) => {
    if (key === 'status') {
      const statusColors = {
        pending: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200',
        completed: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
        overdue: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200',
        cancelled: 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200'
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
        medium: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
        high: 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200',
        urgent: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
      }
      return (
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${priorityColors[row.priority]}`}>
          {value}
        </span>
      )
    }

    if (key === 'type') {
      const typeColors = {
        call: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
        'follow-up': 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
        meeting: 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200',
        payment: 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200',
        appointment: 'bg-pink-100 text-pink-800 dark:bg-pink-900 dark:text-pink-200'
      }
      return (
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${typeColors[row.type]}`}>
          {value}
        </span>
      )
    }

    if (key === 'contactName') {
      return (
        <div className="flex items-center space-x-2">
          <User className={`w-4 h-4 ${isDarkMode ? 'text-white/60' : 'text-gray-500'}`} />
          <span className="font-medium">{value}</span>
          {row.contactPhone !== 'N/A' && (
            <button
              onClick={() => handleCall(row.contactPhone)}
              className="text-blue-500 hover:text-blue-700"
              title="Call"
            >
              📞
            </button>
          )}
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

    if (key === 'scheduledDate') {
      const isOverdue = new Date(row.scheduledDate + ' ' + row.scheduledTime) < new Date() && row.status === 'pending'
      return (
        <div className="flex items-center space-x-2">
          <Calendar className={`w-4 h-4 ${isOverdue ? 'text-red-500' : isDarkMode ? 'text-white/60' : 'text-gray-500'}`} />
          <div>
            <div className={isOverdue ? 'text-red-600 dark:text-red-400' : ''}>
              {new Date(value).toLocaleDateString()}
            </div>
            <div className="text-xs text-gray-500">{row.scheduledTime}</div>
          </div>
        </div>
      )
    }

    if (key === 'actions') {
      return (
        <div className="flex items-center space-x-2">
          {row.status === 'pending' && (
            <button
              onClick={() => handleComplete(row.id)}
              className={`p-1 rounded hover:bg-gray-100 dark:hover:bg-gray-700 ${
                isDarkMode ? 'text-white' : 'text-gray-600'
              }`}
              title="Mark as Complete"
            >
              <CheckCircle className="w-4 h-4" />
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

  const formFields = [
    {
      name: 'title',
      label: 'Reminder Title',
      type: 'text',
      required: true,
      value: editingReminder?.title || ''
    },
    {
      name: 'description',
      label: 'Description',
      type: 'textarea',
      required: true,
      value: editingReminder?.description || ''
    },
    {
      name: 'type',
      label: 'Type',
      type: 'select',
      required: true,
      value: editingReminder?.type || 'call',
      options: [
        { value: 'call', label: 'Call' },
        { value: 'follow-up', label: 'Follow-up' },
        { value: 'meeting', label: 'Meeting' },
        { value: 'payment', label: 'Payment' },
        { value: 'appointment', label: 'Appointment' }
      ]
    },
    {
      name: 'priority',
      label: 'Priority',
      type: 'select',
      required: true,
      value: editingReminder?.priority || 'medium',
      options: [
        { value: 'low', label: 'Low' },
        { value: 'medium', label: 'Medium' },
        { value: 'high', label: 'High' },
        { value: 'urgent', label: 'Urgent' }
      ]
    },
    {
      name: 'assignedTo',
      label: 'Assigned To',
      type: 'text',
      required: true,
      value: editingReminder?.assignedTo || ''
    },
    {
      name: 'contactName',
      label: 'Contact Name',
      type: 'text',
      required: true,
      value: editingReminder?.contactName || ''
    },
    {
      name: 'contactPhone',
      label: 'Contact Phone',
      type: 'text',
      required: false,
      value: editingReminder?.contactPhone || '',
      placeholder: '+91 98765 43210'
    },
    {
      name: 'scheduledDate',
      label: 'Scheduled Date',
      type: 'date',
      required: true,
      value: editingReminder?.scheduledDate || ''
    },
    {
      name: 'scheduledTime',
      label: 'Scheduled Time',
      type: 'time',
      required: true,
      value: editingReminder?.scheduledTime || ''
    },
    {
      name: 'recurring',
      label: 'Recurring',
      type: 'checkbox',
      required: false,
      value: editingReminder?.recurring || false
    },
    {
      name: 'recurringType',
      label: 'Recurring Type',
      type: 'select',
      required: false,
      value: editingReminder?.recurringType || 'none',
      options: [
        { value: 'none', label: 'None' },
        { value: 'daily', label: 'Daily' },
        { value: 'weekly', label: 'Weekly' },
        { value: 'monthly', label: 'Monthly' }
      ]
    },
    {
      name: 'status',
      label: 'Status',
      type: 'select',
      required: true,
      value: editingReminder?.status || 'pending',
      options: [
        { value: 'pending', label: 'Pending' },
        { value: 'completed', label: 'Completed' },
        { value: 'overdue', label: 'Overdue' },
        { value: 'cancelled', label: 'Cancelled' }
      ]
    },
    {
      name: 'notes',
      label: 'Notes',
      type: 'textarea',
      required: false,
      value: editingReminder?.notes || ''
    }
  ]

  return (
    <div className={`min-h-screen transition-all duration-500 ${isDarkMode ? 'dark' : 'light'}`}>
      <div className="p-6">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-black'}`}>
              Reminders
            </h1>
            <p className={`mt-1 ${isDarkMode ? 'text-white/70' : 'text-gray-600'}`}>
              Manage call reminders, follow-ups, and scheduled tasks
            </p>
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="btn-primary flex items-center space-x-2"
            onClick={() => {
              setEditingReminder(null)
              setIsModalOpen(true)
            }}
          >
            <Plus className="w-4 h-4" />
            <span>Add Reminder</span>
          </motion.button>
        </div>

        {/* Reminder Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className={`rounded-xl border p-4 ${
            isDarkMode ? 'bg-white/5 border-white/10' : 'bg-white border-gray-200'
          }`}>
            <div className="flex items-center space-x-3">
              <Bell className={`w-8 h-8 ${isDarkMode ? 'text-blue-400' : 'text-blue-600'}`} />
              <div>
                <p className={`text-sm ${isDarkMode ? 'text-white/70' : 'text-gray-600'}`}>Total Reminders</p>
                <p className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-black'}`}>
                  {mockData.length}
                </p>
              </div>
            </div>
          </div>
          <div className={`rounded-xl border p-4 ${
            isDarkMode ? 'bg-white/5 border-white/10' : 'bg-white border-gray-200'
          }`}>
            <div className="flex items-center space-x-3">
              <Clock className={`w-8 h-8 ${isDarkMode ? 'text-yellow-400' : 'text-yellow-600'}`} />
              <div>
                <p className={`text-sm ${isDarkMode ? 'text-white/70' : 'text-gray-600'}`}>Pending</p>
                <p className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-black'}`}>
                  {mockData.filter(r => r.status === 'pending').length}
                </p>
              </div>
            </div>
          </div>
          <div className={`rounded-xl border p-4 ${
            isDarkMode ? 'bg-white/5 border-white/10' : 'bg-white border-gray-200'
          }`}>
            <div className="flex items-center space-x-3">
              <AlertCircle className={`w-8 h-8 ${isDarkMode ? 'text-red-400' : 'text-red-600'}`} />
              <div>
                <p className={`text-sm ${isDarkMode ? 'text-white/70' : 'text-gray-600'}`}>Overdue</p>
                <p className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-black'}`}>
                  {mockData.filter(r => r.status === 'overdue').length}
                </p>
              </div>
            </div>
          </div>
          <div className={`rounded-xl border p-4 ${
            isDarkMode ? 'bg-white/5 border-white/10' : 'bg-white border-gray-200'
          }`}>
            <div className="flex items-center space-x-3">
              <CheckCircle className={`w-8 h-8 ${isDarkMode ? 'text-green-400' : 'text-green-600'}`} />
              <div>
                <p className={`text-sm ${isDarkMode ? 'text-white/70' : 'text-gray-600'}`}>Completed</p>
                <p className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-black'}`}>
                  {mockData.filter(r => r.status === 'completed').length}
                </p>
              </div>
            </div>
          </div>
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
                placeholder="Search reminders..."
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
              <option value="pending">Pending</option>
              <option value="completed">Completed</option>
              <option value="overdue">Overdue</option>
              <option value="cancelled">Cancelled</option>
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
              <option value="call">Call</option>
              <option value="follow-up">Follow-up</option>
              <option value="meeting">Meeting</option>
              <option value="payment">Payment</option>
              <option value="appointment">Appointment</option>
            </select>
            <select
              value={filterPriority}
              onChange={(e) => setFilterPriority(e.target.value)}
              className={`px-3 py-2 rounded-lg border transition-colors ${
                isDarkMode 
                  ? 'bg-white/10 border-white/20 text-white' 
                  : 'bg-white border-gray-300 text-gray-900'
              }`}
            >
              <option value="all">All Priorities</option>
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
              <option value="urgent">Urgent</option>
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
          title={editingReminder ? 'Edit Reminder' : 'Add Reminder'}
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
