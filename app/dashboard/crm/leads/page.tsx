'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Plus, User, Phone, Mail, Building, Edit, Trash2, Search, Filter, Star, TrendingUp, DollarSign } from 'lucide-react'
import DataTable from '../../../../components/ui/DataTable'
import Modal from '../../../../components/ui/Modal'
import Form from '../../../../components/ui/Form'

interface Lead {
  id: string
  name: string
  email: string
  phone: string
  company: string
  position: string
  source: 'website' | 'referral' | 'cold-call' | 'social-media' | 'email' | 'other'
  status: 'new' | 'contacted' | 'qualified' | 'proposal' | 'negotiation' | 'closed-won' | 'closed-lost'
  priority: 'low' | 'medium' | 'high'
  estimatedValue: number
  assignedTo: string
  createdAt: string
  lastContact: string
  notes: string
  tags: string[]
}

export default function LeadsPage() {
  const [isDarkMode, setIsDarkMode] = useState(true)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingLead, setEditingLead] = useState<Lead | null>(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [filterStatus, setFilterStatus] = useState('all')
  const [filterSource, setFilterSource] = useState('all')
  const [filterPriority, setFilterPriority] = useState('all')

  const mockData: Lead[] = [
    {
      id: 'LEAD-001',
      name: 'Alice Johnson',
      email: 'alice.johnson@techcorp.com',
      phone: '+91 98765 43210',
      company: 'TechCorp Solutions',
      position: 'CTO',
      source: 'website',
      status: 'qualified',
      priority: 'high',
      estimatedValue: 50000,
      assignedTo: 'John Smith',
      createdAt: '2024-01-20 10:30:00',
      lastContact: '2024-01-21 14:15:00',
      notes: 'Interested in enterprise solution, budget approved',
      tags: ['enterprise', 'high-value', 'qualified']
    },
    {
      id: 'LEAD-002',
      name: 'Bob Wilson',
      email: 'bob.wilson@startup.io',
      phone: '+91 99999 99999',
      company: 'StartupIO',
      position: 'Founder',
      source: 'referral',
      status: 'contacted',
      priority: 'medium',
      estimatedValue: 15000,
      assignedTo: 'Sarah Johnson',
      createdAt: '2024-01-19 14:20:00',
      lastContact: '2024-01-20 09:30:00',
      notes: 'Early stage startup, needs basic package',
      tags: ['startup', 'referral', 'basic']
    },
    {
      id: 'LEAD-003',
      name: 'Carol Brown',
      email: 'carol.brown@enterprise.com',
      phone: '+91 88888 88888',
      company: 'Enterprise Corp',
      position: 'IT Director',
      source: 'cold-call',
      status: 'proposal',
      priority: 'high',
      estimatedValue: 75000,
      assignedTo: 'Mike Chen',
      createdAt: '2024-01-18 09:15:00',
      lastContact: '2024-01-19 16:45:00',
      notes: 'Large enterprise, proposal sent, waiting for response',
      tags: ['enterprise', 'large-deal', 'proposal']
    },
    {
      id: 'LEAD-004',
      name: 'David Miller',
      email: 'david.miller@smallbiz.com',
      phone: '+91 77777 77777',
      company: 'SmallBiz Inc',
      position: 'Owner',
      source: 'social-media',
      status: 'new',
      priority: 'low',
      estimatedValue: 5000,
      assignedTo: 'Emily Davis',
      createdAt: '2024-01-17 16:45:00',
      lastContact: '2024-01-17 16:45:00',
      notes: 'Small business owner, just started conversation',
      tags: ['small-business', 'social-media', 'new']
    },
    {
      id: 'LEAD-005',
      name: 'Eva Garcia',
      email: 'eva.garcia@midcorp.com',
      phone: '+91 66666 66666',
      company: 'MidCorp Ltd',
      position: 'Operations Manager',
      source: 'email',
      status: 'negotiation',
      priority: 'medium',
      estimatedValue: 25000,
      assignedTo: 'David Wilson',
      createdAt: '2024-01-16 11:30:00',
      lastContact: '2024-01-18 13:10:00',
      notes: 'Mid-size company, negotiating pricing and terms',
      tags: ['mid-size', 'negotiation', 'pricing']
    }
  ]

  const filteredData = mockData.filter(lead => {
    const matchesSearch = lead.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         lead.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         lead.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         lead.id.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = filterStatus === 'all' || lead.status === filterStatus
    const matchesSource = filterSource === 'all' || lead.source === filterSource
    const matchesPriority = filterPriority === 'all' || lead.priority === filterPriority
    return matchesSearch && matchesStatus && matchesSource && matchesPriority
  })

  const columns = [
    { key: 'id', label: 'Lead ID', sortable: true },
    { key: 'name', label: 'Name', sortable: true },
    { key: 'company', label: 'Company', sortable: true },
    { key: 'source', label: 'Source', sortable: true },
    { key: 'status', label: 'Status', sortable: true },
    { key: 'priority', label: 'Priority', sortable: true },
    { key: 'estimatedValue', label: 'Value', sortable: true },
    { key: 'assignedTo', label: 'Assigned To', sortable: true },
    { key: 'actions', label: 'Actions', sortable: false }
  ]

  const handleEdit = (lead: Lead) => {
    setEditingLead(lead)
    setIsModalOpen(true)
  }

  const handleDelete = (id: string) => {
    console.log('Delete lead:', id)
  }

  const handleCall = (phone: string) => {
    console.log('Call lead:', phone)
  }

  const handleEmail = (email: string) => {
    console.log('Email lead:', email)
  }

  const renderCell = (key: string, value: any, row: Lead) => {
    if (key === 'status') {
      const statusColors = {
        new: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
        contacted: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200',
        qualified: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
        proposal: 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200',
        negotiation: 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200',
        'closed-won': 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
        'closed-lost': 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
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
        high: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
      }
      return (
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${priorityColors[row.priority]}`}>
          {value}
        </span>
      )
    }

    if (key === 'source') {
      const sourceColors = {
        website: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
        referral: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
        'cold-call': 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200',
        'social-media': 'bg-pink-100 text-pink-800 dark:bg-pink-900 dark:text-pink-200',
        email: 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200',
        other: 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200'
      }
      return (
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${sourceColors[row.source]}`}>
          {value}
        </span>
      )
    }

    if (key === 'estimatedValue') {
      return (
        <div className="flex items-center space-x-2">
          <DollarSign className={`w-4 h-4 ${isDarkMode ? 'text-white/60' : 'text-gray-500'}`} />
          <span className="font-medium">₹{value.toLocaleString()}</span>
        </div>
      )
    }

    if (key === 'name') {
      return (
        <div className="flex items-center space-x-2">
          <User className={`w-4 h-4 ${isDarkMode ? 'text-white/60' : 'text-gray-500'}`} />
          <span className="font-medium">{value}</span>
        </div>
      )
    }

    if (key === 'company') {
      return (
        <div className="flex items-center space-x-2">
          <Building className={`w-4 h-4 ${isDarkMode ? 'text-white/60' : 'text-gray-500'}`} />
          <span>{value}</span>
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

    if (key === 'actions') {
      return (
        <div className="flex items-center space-x-2">
          <button
            onClick={() => handleCall(row.phone)}
            className={`p-1 rounded hover:bg-gray-100 dark:hover:bg-gray-700 ${
              isDarkMode ? 'text-white' : 'text-gray-600'
            }`}
            title="Call"
          >
            <Phone className="w-4 h-4" />
          </button>
          <button
            onClick={() => handleEmail(row.email)}
            className={`p-1 rounded hover:bg-gray-100 dark:hover:bg-gray-700 ${
              isDarkMode ? 'text-white' : 'text-gray-600'
            }`}
            title="Email"
          >
            <Mail className="w-4 h-4" />
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
    type: 'text' | 'email' | 'password' | 'number' | 'select' | 'textarea' | 'checkbox' | 'date' | 'time' | 'tel' | 'datetime-local'
    required?: boolean
    placeholder?: string
    value?: any
    options?: Array<{ value: string; label: string }>
    rows?: number
    validation?: (value: string) => string | null
  }> = [
    {
      name: 'name',
      label: 'Full Name',
      type: 'text',
      required: true,
      value: editingLead?.name || ''
    },
    {
      name: 'email',
      label: 'Email Address',
      type: 'email',
      required: true,
      value: editingLead?.email || ''
    },
    {
      name: 'phone',
      label: 'Phone Number',
      type: 'text',
      required: true,
      value: editingLead?.phone || '',
      placeholder: '+91 98765 43210'
    },
    {
      name: 'company',
      label: 'Company',
      type: 'text',
      required: true,
      value: editingLead?.company || ''
    },
    {
      name: 'position',
      label: 'Position',
      type: 'text',
      required: true,
      value: editingLead?.position || ''
    },
    {
      name: 'source',
      label: 'Lead Source',
      type: 'select',
      required: true,
      value: editingLead?.source || 'website',
      options: [
        { value: 'website', label: 'Website' },
        { value: 'referral', label: 'Referral' },
        { value: 'cold-call', label: 'Cold Call' },
        { value: 'social-media', label: 'Social Media' },
        { value: 'email', label: 'Email' },
        { value: 'other', label: 'Other' }
      ]
    },
    {
      name: 'status',
      label: 'Status',
      type: 'select',
      required: true,
      value: editingLead?.status || 'new',
      options: [
        { value: 'new', label: 'New' },
        { value: 'contacted', label: 'Contacted' },
        { value: 'qualified', label: 'Qualified' },
        { value: 'proposal', label: 'Proposal' },
        { value: 'negotiation', label: 'Negotiation' },
        { value: 'closed-won', label: 'Closed Won' },
        { value: 'closed-lost', label: 'Closed Lost' }
      ]
    },
    {
      name: 'priority',
      label: 'Priority',
      type: 'select',
      required: true,
      value: editingLead?.priority || 'medium',
      options: [
        { value: 'low', label: 'Low' },
        { value: 'medium', label: 'Medium' },
        { value: 'high', label: 'High' }
      ]
    },
    {
      name: 'estimatedValue',
      label: 'Estimated Value (₹)',
      type: 'number',
      required: true,
      value: editingLead?.estimatedValue || 0
    },
    {
      name: 'assignedTo',
      label: 'Assigned To',
      type: 'text',
      required: true,
      value: editingLead?.assignedTo || ''
    },
    {
      name: 'notes',
      label: 'Notes',
      type: 'textarea',
      required: false,
      value: editingLead?.notes || ''
    }
  ]

  return (
    <div className={`min-h-screen transition-all duration-500 ${isDarkMode ? 'dark' : 'light'}`}>
      <div className="p-6">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-black'}`}>
              Leads
            </h1>
            <p className={`mt-1 ${isDarkMode ? 'text-white/70' : 'text-gray-600'}`}>
              Manage sales leads, track progress, and convert prospects to customers
            </p>
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="btn-primary flex items-center space-x-2"
            onClick={() => {
              setEditingLead(null)
              setIsModalOpen(true)
            }}
          >
            <Plus className="w-4 h-4" />
            <span>Add Lead</span>
          </motion.button>
        </div>

        {/* Lead Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className={`rounded-xl border p-4 ${
            isDarkMode ? 'bg-white/5 border-white/10' : 'bg-white border-gray-200'
          }`}>
            <div className="flex items-center space-x-3">
              <User className={`w-8 h-8 ${isDarkMode ? 'text-blue-400' : 'text-blue-600'}`} />
              <div>
                <p className={`text-sm ${isDarkMode ? 'text-white/70' : 'text-gray-600'}`}>Total Leads</p>
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
              <TrendingUp className={`w-8 h-8 ${isDarkMode ? 'text-green-400' : 'text-green-600'}`} />
              <div>
                <p className={`text-sm ${isDarkMode ? 'text-white/70' : 'text-gray-600'}`}>Qualified</p>
                <p className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-black'}`}>
                  {mockData.filter(l => l.status === 'qualified').length}
                </p>
              </div>
            </div>
          </div>
          <div className={`rounded-xl border p-4 ${
            isDarkMode ? 'bg-white/5 border-white/10' : 'bg-white border-gray-200'
          }`}>
            <div className="flex items-center space-x-3">
              <DollarSign className={`w-8 h-8 ${isDarkMode ? 'text-purple-400' : 'text-purple-600'}`} />
              <div>
                <p className={`text-sm ${isDarkMode ? 'text-white/70' : 'text-gray-600'}`}>Total Value</p>
                <p className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-black'}`}>
                  ₹{mockData.reduce((sum, l) => sum + l.estimatedValue, 0).toLocaleString()}
                </p>
              </div>
            </div>
          </div>
          <div className={`rounded-xl border p-4 ${
            isDarkMode ? 'bg-white/5 border-white/10' : 'bg-white border-gray-200'
          }`}>
            <div className="flex items-center space-x-3">
              <Star className={`w-8 h-8 ${isDarkMode ? 'text-orange-400' : 'text-orange-600'}`} />
              <div>
                <p className={`text-sm ${isDarkMode ? 'text-white/70' : 'text-gray-600'}`}>High Priority</p>
                <p className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-black'}`}>
                  {mockData.filter(l => l.priority === 'high').length}
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
                placeholder="Search leads..."
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
              <option value="new">New</option>
              <option value="contacted">Contacted</option>
              <option value="qualified">Qualified</option>
              <option value="proposal">Proposal</option>
              <option value="negotiation">Negotiation</option>
              <option value="closed-won">Closed Won</option>
              <option value="closed-lost">Closed Lost</option>
            </select>
            <select
              value={filterSource}
              onChange={(e) => setFilterSource(e.target.value)}
              className={`px-3 py-2 rounded-lg border transition-colors ${
                isDarkMode 
                  ? 'bg-white/10 border-white/20 text-white' 
                  : 'bg-white border-gray-300 text-gray-900'
              }`}
            >
              <option value="all">All Sources</option>
              <option value="website">Website</option>
              <option value="referral">Referral</option>
              <option value="cold-call">Cold Call</option>
              <option value="social-media">Social Media</option>
              <option value="email">Email</option>
              <option value="other">Other</option>
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
          title={editingLead ? 'Edit Lead' : 'Add Lead'}
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
