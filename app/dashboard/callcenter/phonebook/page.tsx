'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Plus, Phone, Mail, MapPin, Edit, Trash2, Search, Filter, User, Building, Star } from 'lucide-react'
import DataTable from '../../../../components/ui/DataTable'
import Modal from '../../../../components/ui/Modal'
import Form from '../../../../components/ui/Form'

interface PhonebookEntry {
  id: string
  name: string
  phone: string
  email: string
  company: string
  department: string
  position: string
  category: string
  priority: 'low' | 'medium' | 'high'
  status: 'active' | 'inactive'
  notes: string
  lastContact: string
  createdAt: string
  isFavorite: boolean
}

export default function PhonebookPage() {
  const [isDarkMode, setIsDarkMode] = useState(true)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingEntry, setEditingEntry] = useState<PhonebookEntry | null>(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [filterStatus, setFilterStatus] = useState('all')
  const [filterCategory, setFilterCategory] = useState('all')
  const [filterPriority, setFilterPriority] = useState('all')

  const mockData: PhonebookEntry[] = [
    {
      id: '1',
      name: 'John Smith',
      phone: '+91 98765 43210',
      email: 'john.smith@company.com',
      company: 'TechCorp',
      department: 'Sales',
      position: 'Sales Manager',
      category: 'Customer',
      priority: 'high',
      status: 'active',
      notes: 'Primary contact for enterprise sales',
      lastContact: '2024-01-20 14:15:00',
      createdAt: '2024-01-15 10:30:00',
      isFavorite: true
    },
    {
      id: '2',
      name: 'Sarah Johnson',
      phone: '+91 99999 99999',
      email: 'sarah.johnson@company.com',
      company: 'FinServe',
      department: 'Support',
      position: 'Support Lead',
      category: 'Customer',
      priority: 'medium',
      status: 'active',
      notes: 'Technical support contact',
      lastContact: '2024-01-19 09:30:00',
      createdAt: '2024-01-14 14:20:00',
      isFavorite: false
    },
    {
      id: '3',
      name: 'Mike Chen',
      phone: '+91 88888 88888',
      email: 'mike.chen@company.com',
      company: 'HealthPlus',
      department: 'IT',
      position: 'IT Director',
      category: 'Prospect',
      priority: 'high',
      status: 'active',
      notes: 'IT infrastructure contact',
      lastContact: '2024-01-18 16:45:00',
      createdAt: '2024-01-13 09:15:00',
      isFavorite: true
    },
    {
      id: '4',
      name: 'Emily Davis',
      phone: '+91 77777 77777',
      email: 'emily.davis@company.com',
      company: 'RetailCorp',
      department: 'Marketing',
      position: 'Marketing Manager',
      category: 'Lead',
      priority: 'low',
      status: 'inactive',
      notes: 'Marketing campaign contact',
      lastContact: '2024-01-17 11:20:00',
      createdAt: '2024-01-12 16:45:00',
      isFavorite: false
    },
    {
      id: '5',
      name: 'David Wilson',
      phone: '+91 66666 66666',
      email: 'david.wilson@company.com',
      company: 'Manufacturing Inc',
      department: 'Operations',
      position: 'Operations Manager',
      category: 'Customer',
      priority: 'medium',
      status: 'active',
      notes: 'Operations and logistics contact',
      lastContact: '2024-01-16 13:10:00',
      createdAt: '2024-01-11 11:30:00',
      isFavorite: false
    }
  ]

  const filteredData = mockData.filter(entry => {
    const matchesSearch = entry.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         entry.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         entry.phone.includes(searchTerm) ||
                         entry.company.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = filterStatus === 'all' || entry.status === filterStatus
    const matchesCategory = filterCategory === 'all' || entry.category === filterCategory
    const matchesPriority = filterPriority === 'all' || entry.priority === filterPriority
    return matchesSearch && matchesStatus && matchesCategory && matchesPriority
  })

  const columns = [
    { key: 'name', label: 'Name', sortable: true },
    { key: 'phone', label: 'Phone', sortable: true },
    { key: 'email', label: 'Email', sortable: true },
    { key: 'company', label: 'Company', sortable: true },
    { key: 'category', label: 'Category', sortable: true },
    { key: 'priority', label: 'Priority', sortable: true },
    { key: 'status', label: 'Status', sortable: true },
    { key: 'actions', label: 'Actions', sortable: false }
  ]

  const handleEdit = (entry: PhonebookEntry) => {
    setEditingEntry(entry)
    setIsModalOpen(true)
  }

  const handleDelete = (id: string) => {
    console.log('Delete phonebook entry:', id)
  }

  const handleCall = (phone: string) => {
    console.log('Call contact:', phone)
  }

  const handleEmail = (email: string) => {
    console.log('Email contact:', email)
  }

  const handleToggleFavorite = (id: string) => {
    console.log('Toggle favorite:', id)
  }

  const renderCell = (key: string, value: any, row: PhonebookEntry) => {
    if (key === 'status') {
      return (
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
          value === 'active' 
            ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' 
            : 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200'
        }`}>
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

    if (key === 'category') {
      const categoryColors = {
        Customer: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
        Prospect: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
        Lead: 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200',
        Vendor: 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200'
      }
      return (
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${categoryColors[row.category as keyof typeof categoryColors] || 'bg-gray-100 text-gray-800'}`}>
          {value}
        </span>
      )
    }

    if (key === 'phone') {
      return (
        <div className="flex items-center space-x-2">
          <Phone className={`w-4 h-4 ${isDarkMode ? 'text-white/60' : 'text-gray-500'}`} />
          <span className="font-mono">{value}</span>
        </div>
      )
    }

    if (key === 'email') {
      return (
        <div className="flex items-center space-x-2">
          <Mail className={`w-4 h-4 ${isDarkMode ? 'text-white/60' : 'text-gray-500'}`} />
          <span>{value}</span>
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

    if (key === 'name') {
      return (
        <div className="flex items-center space-x-2">
          <User className={`w-4 h-4 ${isDarkMode ? 'text-white/60' : 'text-gray-500'}`} />
          <span className="font-medium">{value}</span>
          {row.isFavorite && (
            <Star className="w-4 h-4 text-yellow-500 fill-current" />
          )}
        </div>
      )
    }

    if (key === 'actions') {
      return (
        <div className="flex items-center space-x-2">
          <button
            onClick={() => handleToggleFavorite(row.id)}
            className={`p-1 rounded hover:bg-gray-100 dark:hover:bg-gray-700 ${
              isDarkMode ? 'text-white' : 'text-gray-600'
            }`}
            title={row.isFavorite ? "Remove from favorites" : "Add to favorites"}
          >
            <Star className={`w-4 h-4 ${row.isFavorite ? 'text-yellow-500 fill-current' : ''}`} />
          </button>
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

  const formFields = [
    {
      name: 'name',
      label: 'Full Name',
      type: 'text',
      required: true,
      value: editingEntry?.name || ''
    },
    {
      name: 'phone',
      label: 'Phone Number',
      type: 'text',
      required: true,
      value: editingEntry?.phone || '',
      placeholder: '+91 98765 43210'
    },
    {
      name: 'email',
      label: 'Email Address',
      type: 'email',
      required: true,
      value: editingEntry?.email || ''
    },
    {
      name: 'company',
      label: 'Company',
      type: 'text',
      required: true,
      value: editingEntry?.company || ''
    },
    {
      name: 'department',
      label: 'Department',
      type: 'select',
      required: true,
      value: editingEntry?.department || '',
      options: [
        { value: 'Sales', label: 'Sales' },
        { value: 'Support', label: 'Support' },
        { value: 'IT', label: 'IT' },
        { value: 'Marketing', label: 'Marketing' },
        { value: 'Operations', label: 'Operations' },
        { value: 'Finance', label: 'Finance' },
        { value: 'HR', label: 'HR' }
      ]
    },
    {
      name: 'position',
      label: 'Position',
      type: 'text',
      required: true,
      value: editingEntry?.position || ''
    },
    {
      name: 'category',
      label: 'Category',
      type: 'select',
      required: true,
      value: editingEntry?.category || 'Customer',
      options: [
        { value: 'Customer', label: 'Customer' },
        { value: 'Prospect', label: 'Prospect' },
        { value: 'Lead', label: 'Lead' },
        { value: 'Vendor', label: 'Vendor' }
      ]
    },
    {
      name: 'priority',
      label: 'Priority',
      type: 'select',
      required: true,
      value: editingEntry?.priority || 'medium',
      options: [
        { value: 'low', label: 'Low' },
        { value: 'medium', label: 'Medium' },
        { value: 'high', label: 'High' }
      ]
    },
    {
      name: 'status',
      label: 'Status',
      type: 'select',
      required: true,
      value: editingEntry?.status || 'active',
      options: [
        { value: 'active', label: 'Active' },
        { value: 'inactive', label: 'Inactive' }
      ]
    },
    {
      name: 'notes',
      label: 'Notes',
      type: 'textarea',
      required: false,
      value: editingEntry?.notes || ''
    }
  ]

  return (
    <div className={`min-h-screen transition-all duration-500 ${isDarkMode ? 'dark' : 'light'}`}>
      <div className="p-6">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-black'}`}>
              Phonebook
            </h1>
            <p className={`mt-1 ${isDarkMode ? 'text-white/70' : 'text-gray-600'}`}>
              Manage your call center contact database with advanced filtering and organization
            </p>
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="btn-primary flex items-center space-x-2"
            onClick={() => {
              setEditingEntry(null)
              setIsModalOpen(true)
            }}
          >
            <Plus className="w-4 h-4" />
            <span>Add Contact</span>
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
                placeholder="Search phonebook..."
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
              <option value="inactive">Inactive</option>
            </select>
            <select
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
              className={`px-3 py-2 rounded-lg border transition-colors ${
                isDarkMode 
                  ? 'bg-white/10 border-white/20 text-white' 
                  : 'bg-white border-gray-300 text-gray-900'
              }`}
            >
              <option value="all">All Categories</option>
              <option value="Customer">Customer</option>
              <option value="Prospect">Prospect</option>
              <option value="Lead">Lead</option>
              <option value="Vendor">Vendor</option>
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
          title={editingEntry ? 'Edit Phonebook Entry' : 'Add Phonebook Entry'}
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
