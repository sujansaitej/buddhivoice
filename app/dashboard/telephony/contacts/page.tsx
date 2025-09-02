'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Plus, Phone, Mail, MapPin, Edit, Trash2, Search, Filter, User, Building } from 'lucide-react'
import DataTable from '../../../../components/ui/DataTable'
import Modal from '../../../../components/ui/Modal'
import Form from '../../../../components/ui/Form'

interface Contact {
  id: string
  name: string
  phone: string
  email: string
  company: string
  department: string
  position: string
  status: 'active' | 'inactive'
  createdAt: string
  lastContact: string
  notes: string
}

export default function ContactsPage() {
  const [isDarkMode, setIsDarkMode] = useState(true)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingContact, setEditingContact] = useState<Contact | null>(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [filterStatus, setFilterStatus] = useState('all')
  const [filterDepartment, setFilterDepartment] = useState('all')

  const mockData: Contact[] = [
    {
      id: '1',
      name: 'John Smith',
      phone: '+91 98765 43210',
      email: 'john.smith@company.com',
      company: 'TechCorp',
      department: 'Sales',
      position: 'Sales Manager',
      status: 'active',
      createdAt: '2024-01-15 10:30:00',
      lastContact: '2024-01-20 14:15:00',
      notes: 'Primary contact for enterprise sales'
    },
    {
      id: '2',
      name: 'Sarah Johnson',
      phone: '+91 99999 99999',
      email: 'sarah.johnson@company.com',
      company: 'FinServe',
      department: 'Support',
      position: 'Support Lead',
      status: 'active',
      createdAt: '2024-01-14 14:20:00',
      lastContact: '2024-01-19 09:30:00',
      notes: 'Technical support contact'
    },
    {
      id: '3',
      name: 'Mike Chen',
      phone: '+91 88888 88888',
      email: 'mike.chen@company.com',
      company: 'HealthPlus',
      department: 'IT',
      position: 'IT Director',
      status: 'active',
      createdAt: '2024-01-13 09:15:00',
      lastContact: '2024-01-18 16:45:00',
      notes: 'IT infrastructure contact'
    },
    {
      id: '4',
      name: 'Emily Davis',
      phone: '+91 77777 77777',
      email: 'emily.davis@company.com',
      company: 'RetailCorp',
      department: 'Marketing',
      position: 'Marketing Manager',
      status: 'inactive',
      createdAt: '2024-01-12 16:45:00',
      lastContact: '2024-01-17 11:20:00',
      notes: 'Marketing campaign contact'
    },
    {
      id: '5',
      name: 'David Wilson',
      phone: '+91 66666 66666',
      email: 'david.wilson@company.com',
      company: 'Manufacturing Inc',
      department: 'Operations',
      position: 'Operations Manager',
      status: 'active',
      createdAt: '2024-01-11 11:30:00',
      lastContact: '2024-01-16 13:10:00',
      notes: 'Operations and logistics contact'
    }
  ]

  const filteredData = mockData.filter(contact => {
    const matchesSearch = contact.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         contact.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         contact.phone.includes(searchTerm) ||
                         contact.company.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = filterStatus === 'all' || contact.status === filterStatus
    const matchesDepartment = filterDepartment === 'all' || contact.department === filterDepartment
    return matchesSearch && matchesStatus && matchesDepartment
  })

  const columns = [
    { key: 'name', label: 'Name', sortable: true },
    { key: 'phone', label: 'Phone', sortable: true },
    { key: 'email', label: 'Email', sortable: true },
    { key: 'company', label: 'Company', sortable: true },
    { key: 'department', label: 'Department', sortable: true },
    { key: 'position', label: 'Position', sortable: true },
    { key: 'status', label: 'Status', sortable: true },
    { key: 'actions', label: 'Actions', sortable: false }
  ]

  const handleEdit = (contact: Contact) => {
    setEditingContact(contact)
    setIsModalOpen(true)
  }

  const handleDelete = (id: string) => {
    console.log('Delete contact:', id)
  }

  const handleCall = (phone: string) => {
    console.log('Call contact:', phone)
  }

  const handleEmail = (email: string) => {
    console.log('Email contact:', email)
  }

  const renderCell = (key: string, value: any, row: Contact) => {
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
    type: 'text' | 'email' | 'password' | 'number' | 'select' | 'textarea' | 'checkbox' | 'date'
    required: boolean
    value: any
    options?: Array<{ value: string; label: string }>
  }> = [
    {
      name: 'name',
      label: 'Full Name',
      type: 'text',
      required: true,
      value: editingContact?.name || ''
    },
    {
      name: 'phone',
      label: 'Phone Number',
      type: 'text',
      required: true,
      value: editingContact?.phone || '',
      placeholder: '+91 98765 43210'
    },
    {
      name: 'email',
      label: 'Email Address',
      type: 'email',
      required: true,
      value: editingContact?.email || ''
    },
    {
      name: 'company',
      label: 'Company',
      type: 'text',
      required: true,
      value: editingContact?.company || ''
    },
    {
      name: 'department',
      label: 'Department',
      type: 'select',
      required: true,
      value: editingContact?.department || '',
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
      value: editingContact?.position || ''
    },
    {
      name: 'status',
      label: 'Status',
      type: 'select',
      required: true,
      value: editingContact?.status || 'active',
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
      value: editingContact?.notes || ''
    }
  ]

  return (
    <div className={`min-h-screen transition-all duration-500 ${isDarkMode ? 'dark' : 'light'}`}>
      <div className="p-6">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-black'}`}>
              Contacts
            </h1>
            <p className={`mt-1 ${isDarkMode ? 'text-white/70' : 'text-gray-600'}`}>
              Manage your contact database for calls and communications
            </p>
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="btn-primary flex items-center space-x-2"
            onClick={() => {
              setEditingContact(null)
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
                placeholder="Search contacts..."
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
              value={filterDepartment}
              onChange={(e) => setFilterDepartment(e.target.value)}
              className={`px-3 py-2 rounded-lg border transition-colors ${
                isDarkMode 
                  ? 'bg-white/10 border-white/20 text-white' 
                  : 'bg-white border-gray-300 text-gray-900'
              }`}
            >
              <option value="all">All Departments</option>
              <option value="Sales">Sales</option>
              <option value="Support">Support</option>
              <option value="IT">IT</option>
              <option value="Marketing">Marketing</option>
              <option value="Operations">Operations</option>
              <option value="Finance">Finance</option>
              <option value="HR">HR</option>
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
          title={editingContact ? 'Edit Contact' : 'Add Contact'}
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
