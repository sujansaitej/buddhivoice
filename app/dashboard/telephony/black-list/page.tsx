'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Plus, Ban, Phone, Edit, Trash2, Search, Filter, Shield } from 'lucide-react'
import DataTable from '../../../../components/ui/DataTable'
import Modal from '../../../../components/ui/Modal'
import Form from '../../../../components/ui/Form'

interface BlacklistEntry {
  id: string
  number: string
  type: 'phone' | 'ip' | 'range'
  reason: string
  status: 'active' | 'inactive'
  addedBy: string
  addedAt: string
  lastModified: string
  description: string
}

export default function BlackListPage() {
  const [isDarkMode, setIsDarkMode] = useState(true)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingEntry, setEditingEntry] = useState<BlacklistEntry | null>(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [filterStatus, setFilterStatus] = useState('all')
  const [filterType, setFilterType] = useState('all')

  const mockData: BlacklistEntry[] = [
    {
      id: '1',
      number: '+91 98765 43210',
      type: 'phone',
      reason: 'Spam calls',
      status: 'active',
      addedBy: 'John Smith',
      addedAt: '2024-01-15 10:30:00',
      lastModified: '2024-01-20 14:15:00',
      description: 'Frequent spam caller'
    },
    {
      id: '2',
      number: '192.168.1.100',
      type: 'ip',
      reason: 'Suspicious activity',
      status: 'active',
      addedBy: 'Sarah Johnson',
      addedAt: '2024-01-14 14:20:00',
      lastModified: '2024-01-19 09:30:00',
      description: 'IP address with suspicious call patterns'
    },
    {
      id: '3',
      number: '+91 99999 99999',
      type: 'phone',
      reason: 'Harassment',
      status: 'active',
      addedBy: 'Mike Chen',
      addedAt: '2024-01-13 09:15:00',
      lastModified: '2024-01-18 16:45:00',
      description: 'Harassment complaints'
    },
    {
      id: '4',
      number: '10.0.0.0/8',
      type: 'range',
      reason: 'Blocked network',
      status: 'inactive',
      addedBy: 'Emily Davis',
      addedAt: '2024-01-12 16:45:00',
      lastModified: '2024-01-17 11:20:00',
      description: 'Private network range'
    },
    {
      id: '5',
      number: '+91 88888 88888',
      type: 'phone',
      reason: 'Fraudulent calls',
      status: 'active',
      addedBy: 'David Wilson',
      addedAt: '2024-01-11 11:30:00',
      lastModified: '2024-01-16 13:10:00',
      description: 'Known fraud number'
    }
  ]

  const filteredData = mockData.filter(entry => {
    const matchesSearch = entry.number.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         entry.reason.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         entry.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = filterStatus === 'all' || entry.status === filterStatus
    const matchesType = filterType === 'all' || entry.type === filterType
    return matchesSearch && matchesStatus && matchesType
  })

  const columns = [
    { key: 'number', label: 'Number/IP', sortable: true },
    { key: 'type', label: 'Type', sortable: true },
    { key: 'reason', label: 'Reason', sortable: true },
    { key: 'status', label: 'Status', sortable: true },
    { key: 'addedBy', label: 'Added By', sortable: true },
    { key: 'addedAt', label: 'Added At', sortable: true },
    { key: 'actions', label: 'Actions', sortable: false }
  ]

  const handleEdit = (entry: BlacklistEntry) => {
    setEditingEntry(entry)
    setIsModalOpen(true)
  }

  const handleDelete = (id: string) => {
    console.log('Delete blacklist entry:', id)
  }

  const renderCell = (key: string, value: any, row: BlacklistEntry) => {
    if (key === 'status') {
      return (
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
          value === 'active' 
            ? 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200' 
            : 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200'
        }`}>
          {value}
        </span>
      )
    }

    if (key === 'type') {
      return (
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
          value === 'phone' 
            ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
            : value === 'ip'
            ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
            : 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200'
        }`}>
          {value.toUpperCase()}
        </span>
      )
    }

    if (key === 'number') {
      return (
        <div className="flex items-center space-x-2">
          {row.type === 'phone' ? (
            <Phone className={`w-4 h-4 ${isDarkMode ? 'text-white/60' : 'text-gray-500'}`} />
          ) : (
            <Shield className={`w-4 h-4 ${isDarkMode ? 'text-white/60' : 'text-gray-500'}`} />
          )}
          <span className="font-mono">{value}</span>
        </div>
      )
    }

    if (key === 'actions') {
      return (
        <div className="flex items-center space-x-2">
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
      name: 'number',
      label: 'Number/IP Address',
      type: 'text',
      required: true,
      value: editingEntry?.number || '',
      placeholder: 'Enter phone number, IP address, or range'
    },
    {
      name: 'type',
      label: 'Type',
      type: 'select',
      required: true,
      value: editingEntry?.type || 'phone',
      options: [
        { value: 'phone', label: 'Phone Number' },
        { value: 'ip', label: 'IP Address' },
        { value: 'range', label: 'IP Range' }
      ]
    },
    {
      name: 'reason',
      label: 'Reason',
      type: 'select',
      required: true,
      value: editingEntry?.reason || '',
      options: [
        { value: 'Spam calls', label: 'Spam calls' },
        { value: 'Suspicious activity', label: 'Suspicious activity' },
        { value: 'Harassment', label: 'Harassment' },
        { value: 'Fraudulent calls', label: 'Fraudulent calls' },
        { value: 'Blocked network', label: 'Blocked network' },
        { value: 'Other', label: 'Other' }
      ]
    },
    {
      name: 'description',
      label: 'Description',
      type: 'textarea',
      required: false,
      value: editingEntry?.description || ''
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
    }
  ]

  return (
    <div className={`min-h-screen transition-all duration-500 ${isDarkMode ? 'dark' : 'light'}`}>
      <div className="p-6">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-black'}`}>
              Black List
            </h1>
            <p className={`mt-1 ${isDarkMode ? 'text-white/70' : 'text-gray-600'}`}>
              Manage blocked phone numbers, IP addresses, and network ranges
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
            <span>Add Entry</span>
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
                placeholder="Search blacklist entries..."
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
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className={`px-3 py-2 rounded-lg border transition-colors ${
                isDarkMode 
                  ? 'bg-white/10 border-white/20 text-white' 
                  : 'bg-white border-gray-300 text-gray-900'
              }`}
            >
              <option value="all">All Types</option>
              <option value="phone">Phone</option>
              <option value="ip">IP Address</option>
              <option value="range">IP Range</option>
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
          title={editingEntry ? 'Edit Blacklist Entry' : 'Add Blacklist Entry'}
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
