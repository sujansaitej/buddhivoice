'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Plus, Ticket, User, Clock, Edit, Trash2, Search, Filter, MessageSquare, AlertCircle, CheckCircle, XCircle } from 'lucide-react'
import DataTable from '../../../../components/ui/DataTable'
import Modal from '../../../../components/ui/Modal'
import Form from '../../../../components/ui/Form'

interface Ticket {
  id: string
  title: string
  description: string
  type: 'support' | 'bug' | 'feature' | 'billing' | 'general'
  priority: 'low' | 'medium' | 'high' | 'urgent'
  status: 'open' | 'in-progress' | 'resolved' | 'closed' | 'cancelled'
  assignedTo: string
  createdBy: string
  customerName: string
  customerEmail: string
  createdAt: string
  updatedAt: string
  resolvedAt: string
  tags: string[]
  attachments: number
}

export default function TicketsPage() {
  const [isDarkMode, setIsDarkMode] = useState(true)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingTicket, setEditingTicket] = useState<Ticket | null>(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [filterStatus, setFilterStatus] = useState('all')
  const [filterType, setFilterType] = useState('all')
  const [filterPriority, setFilterPriority] = useState('all')

  const mockData: Ticket[] = [
    {
      id: 'TKT-001',
      title: 'Login issues with mobile app',
      description: 'Customer unable to login to mobile application, getting authentication error',
      type: 'support',
      priority: 'high',
      status: 'in-progress',
      assignedTo: 'John Smith',
      createdBy: 'Alice Johnson',
      customerName: 'Alice Johnson',
      customerEmail: 'alice.johnson@company.com',
      createdAt: '2024-01-20 10:30:00',
      updatedAt: '2024-01-21 14:15:00',
      resolvedAt: '',
      tags: ['mobile', 'authentication', 'login'],
      attachments: 2
    },
    {
      id: 'TKT-002',
      title: 'Feature request: Dark mode',
      description: 'Customer requesting dark mode theme for the web application',
      type: 'feature',
      priority: 'medium',
      status: 'open',
      assignedTo: 'Sarah Johnson',
      createdBy: 'Bob Wilson',
      customerName: 'Bob Wilson',
      customerEmail: 'bob.wilson@company.com',
      createdAt: '2024-01-19 14:20:00',
      updatedAt: '2024-01-19 14:20:00',
      resolvedAt: '',
      tags: ['ui', 'theme', 'feature-request'],
      attachments: 0
    },
    {
      id: 'TKT-003',
      title: 'Payment processing error',
      description: 'Payment gateway integration not working properly, transactions failing',
      type: 'bug',
      priority: 'urgent',
      status: 'resolved',
      assignedTo: 'Mike Chen',
      createdBy: 'Carol Brown',
      customerName: 'Carol Brown',
      customerEmail: 'carol.brown@company.com',
      createdAt: '2024-01-18 09:15:00',
      updatedAt: '2024-01-19 16:45:00',
      resolvedAt: '2024-01-19 16:45:00',
      tags: ['payment', 'gateway', 'critical'],
      attachments: 1
    },
    {
      id: 'TKT-004',
      title: 'Billing inquiry',
      description: 'Customer has questions about their monthly subscription charges',
      type: 'billing',
      priority: 'low',
      status: 'closed',
      assignedTo: 'Emily Davis',
      createdBy: 'David Miller',
      customerName: 'David Miller',
      customerEmail: 'david.miller@company.com',
      createdAt: '2024-01-17 16:45:00',
      updatedAt: '2024-01-18 11:20:00',
      resolvedAt: '2024-01-18 11:20:00',
      tags: ['billing', 'subscription'],
      attachments: 0
    },
    {
      id: 'TKT-005',
      title: 'General inquiry about API',
      description: 'Customer wants to know about API documentation and integration',
      type: 'general',
      priority: 'medium',
      status: 'open',
      assignedTo: 'David Wilson',
      createdBy: 'Eva Garcia',
      customerName: 'Eva Garcia',
      customerEmail: 'eva.garcia@company.com',
      createdAt: '2024-01-16 11:30:00',
      updatedAt: '2024-01-16 11:30:00',
      resolvedAt: '',
      tags: ['api', 'documentation', 'integration'],
      attachments: 0
    }
  ]

  const filteredData = mockData.filter(ticket => {
    const matchesSearch = ticket.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         ticket.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         ticket.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         ticket.id.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = filterStatus === 'all' || ticket.status === filterStatus
    const matchesType = filterType === 'all' || ticket.type === filterType
    const matchesPriority = filterPriority === 'all' || ticket.priority === filterPriority
    return matchesSearch && matchesStatus && matchesType && matchesPriority
  })

  const columns = [
    { key: 'id', label: 'Ticket ID', sortable: true },
    { key: 'title', label: 'Title', sortable: true },
    { key: 'type', label: 'Type', sortable: true },
    { key: 'priority', label: 'Priority', sortable: true },
    { key: 'status', label: 'Status', sortable: true },
    { key: 'customerName', label: 'Customer', sortable: true },
    { key: 'assignedTo', label: 'Assigned To', sortable: true },
    { key: 'createdAt', label: 'Created', sortable: true },
    { key: 'actions', label: 'Actions', sortable: false }
  ]

  const handleEdit = (ticket: Ticket) => {
    setEditingTicket(ticket)
    setIsModalOpen(true)
  }

  const handleDelete = (id: string) => {
    console.log('Delete ticket:', id)
  }

  const handleView = (id: string) => {
    console.log('View ticket:', id)
  }

  const renderCell = (key: string, value: any, row: Ticket) => {
    if (key === 'status') {
      const statusColors = {
        open: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
        'in-progress': 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200',
        resolved: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
        closed: 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200',
        cancelled: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
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
        support: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
        bug: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200',
        feature: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
        billing: 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200',
        general: 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200'
      }
      return (
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${typeColors[row.type]}`}>
          {value}
        </span>
      )
    }

    if (key === 'id') {
      return (
        <div className="flex items-center space-x-2">
          <Ticket className={`w-4 h-4 ${isDarkMode ? 'text-white/60' : 'text-gray-500'}`} />
          <span className="font-mono font-medium">{value}</span>
        </div>
      )
    }

    if (key === 'customerName') {
      return (
        <div className="flex items-center space-x-2">
          <User className={`w-4 h-4 ${isDarkMode ? 'text-white/60' : 'text-gray-500'}`} />
          <span className="font-medium">{value}</span>
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

    if (key === 'createdAt') {
      return (
        <div className="flex items-center space-x-2">
          <Clock className={`w-4 h-4 ${isDarkMode ? 'text-white/60' : 'text-gray-500'}`} />
          <span>{new Date(value).toLocaleDateString()}</span>
        </div>
      )
    }

    if (key === 'actions') {
      return (
        <div className="flex items-center space-x-2">
          <button
            onClick={() => handleView(row.id)}
            className={`p-1 rounded hover:bg-gray-100 dark:hover:bg-gray-700 ${
              isDarkMode ? 'text-white' : 'text-gray-600'
            }`}
            title="View Details"
          >
            <MessageSquare className="w-4 h-4" />
          </button>
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

  const formFields: Array<{
    name: string
    label: string
    type: 'text' | 'email' | 'password' | 'number' | 'select' | 'textarea' | 'checkbox' | 'date'
    required?: boolean
    placeholder?: string
    value?: any
    options?: Array<{ value: string; label: string }>
    rows?: number
  }> = [
    {
      name: 'title',
      label: 'Ticket Title',
      type: 'text',
      required: true,
      value: editingTicket?.title || ''
    },
    {
      name: 'description',
      label: 'Description',
      type: 'textarea',
      required: true,
      value: editingTicket?.description || ''
    },
    {
      name: 'type',
      label: 'Type',
      type: 'select',
      required: true,
      value: editingTicket?.type || 'support',
      options: [
        { value: 'support', label: 'Support' },
        { value: 'bug', label: 'Bug' },
        { value: 'feature', label: 'Feature Request' },
        { value: 'billing', label: 'Billing' },
        { value: 'general', label: 'General' }
      ]
    },
    {
      name: 'priority',
      label: 'Priority',
      type: 'select',
      required: true,
      value: editingTicket?.priority || 'medium',
      options: [
        { value: 'low', label: 'Low' },
        { value: 'medium', label: 'Medium' },
        { value: 'high', label: 'High' },
        { value: 'urgent', label: 'Urgent' }
      ]
    },
    {
      name: 'status',
      label: 'Status',
      type: 'select',
      required: true,
      value: editingTicket?.status || 'open',
      options: [
        { value: 'open', label: 'Open' },
        { value: 'in-progress', label: 'In Progress' },
        { value: 'resolved', label: 'Resolved' },
        { value: 'closed', label: 'Closed' },
        { value: 'cancelled', label: 'Cancelled' }
      ]
    },
    {
      name: 'assignedTo',
      label: 'Assigned To',
      type: 'text',
      required: true,
      value: editingTicket?.assignedTo || ''
    },
    {
      name: 'customerName',
      label: 'Customer Name',
      type: 'text',
      required: true,
      value: editingTicket?.customerName || ''
    },
    {
      name: 'customerEmail',
      label: 'Customer Email',
      type: 'email',
      required: true,
      value: editingTicket?.customerEmail || ''
    }
  ]

  return (
    <div className={`min-h-screen transition-all duration-500 ${isDarkMode ? 'dark' : 'light'}`}>
      <div className="p-6">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-black'}`}>
              Support Tickets
            </h1>
            <p className={`mt-1 ${isDarkMode ? 'text-white/70' : 'text-gray-600'}`}>
              Manage customer support tickets, bugs, and feature requests
            </p>
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="btn-primary flex items-center space-x-2"
            onClick={() => {
              setEditingTicket(null)
              setIsModalOpen(true)
            }}
          >
            <Plus className="w-4 h-4" />
            <span>Create Ticket</span>
          </motion.button>
        </div>

        {/* Ticket Stats */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-6">
          <div className={`rounded-xl border p-4 ${
            isDarkMode ? 'bg-white/5 border-white/10' : 'bg-white border-gray-200'
          }`}>
            <div className="flex items-center space-x-3">
              <Ticket className={`w-8 h-8 ${isDarkMode ? 'text-blue-400' : 'text-blue-600'}`} />
              <div>
                <p className={`text-sm ${isDarkMode ? 'text-white/70' : 'text-gray-600'}`}>Total</p>
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
              <AlertCircle className={`w-8 h-8 ${isDarkMode ? 'text-blue-400' : 'text-blue-600'}`} />
              <div>
                <p className={`text-sm ${isDarkMode ? 'text-white/70' : 'text-gray-600'}`}>Open</p>
                <p className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-black'}`}>
                  {mockData.filter(t => t.status === 'open').length}
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
                <p className={`text-sm ${isDarkMode ? 'text-white/70' : 'text-gray-600'}`}>In Progress</p>
                <p className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-black'}`}>
                  {mockData.filter(t => t.status === 'in-progress').length}
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
                <p className={`text-sm ${isDarkMode ? 'text-white/70' : 'text-gray-600'}`}>Resolved</p>
                <p className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-black'}`}>
                  {mockData.filter(t => t.status === 'resolved').length}
                </p>
              </div>
            </div>
          </div>
          <div className={`rounded-xl border p-4 ${
            isDarkMode ? 'bg-white/5 border-white/10' : 'bg-white border-gray-200'
          }`}>
            <div className="flex items-center space-x-3">
              <XCircle className={`w-8 h-8 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`} />
              <div>
                <p className={`text-sm ${isDarkMode ? 'text-white/70' : 'text-gray-600'}`}>Closed</p>
                <p className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-black'}`}>
                  {mockData.filter(t => t.status === 'closed').length}
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
                placeholder="Search tickets..."
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
              <option value="open">Open</option>
              <option value="in-progress">In Progress</option>
              <option value="resolved">Resolved</option>
              <option value="closed">Closed</option>
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
              <option value="support">Support</option>
              <option value="bug">Bug</option>
              <option value="feature">Feature</option>
              <option value="billing">Billing</option>
              <option value="general">General</option>
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
          title={editingTicket ? 'Edit Ticket' : 'Create Ticket'}
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
