'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Plus, Users, Phone, Edit, Trash2, Search, Filter, Settings } from 'lucide-react'
import DataTable from '../../../../components/ui/DataTable'
import Modal from '../../../../components/ui/Modal'
import Form from '../../../../components/ui/Form'

interface SmartGroup {
  id: string
  name: string
  type: string
  members: number
  status: 'active' | 'inactive'
  description: string
  createdBy: string
  createdAt: string
  lastModified: string
}

export default function SmartGroupPage() {
  const [isDarkMode, setIsDarkMode] = useState(true)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingGroup, setEditingGroup] = useState<SmartGroup | null>(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [filterStatus, setFilterStatus] = useState('all')

  const mockData: SmartGroup[] = [
    {
      id: '1',
      name: 'Sales Team',
      type: 'Ring Group',
      members: 5,
      status: 'active',
      description: 'Primary sales team for customer inquiries',
      createdBy: 'John Smith',
      createdAt: '2024-01-15 10:30:00',
      lastModified: '2024-01-20 14:15:00'
    },
    {
      id: '2',
      name: 'Support Team',
      type: 'Queue',
      members: 8,
      status: 'active',
      description: 'Technical support queue',
      createdBy: 'Sarah Johnson',
      createdAt: '2024-01-14 14:20:00',
      lastModified: '2024-01-19 09:30:00'
    },
    {
      id: '3',
      name: 'Emergency Team',
      type: 'Ring Group',
      members: 3,
      status: 'active',
      description: 'Emergency response team',
      createdBy: 'Mike Chen',
      createdAt: '2024-01-13 09:15:00',
      lastModified: '2024-01-18 16:45:00'
    },
    {
      id: '4',
      name: 'After Hours',
      type: 'Queue',
      members: 2,
      status: 'inactive',
      description: 'After hours support queue',
      createdBy: 'Emily Davis',
      createdAt: '2024-01-12 16:45:00',
      lastModified: '2024-01-17 11:20:00'
    },
    {
      id: '5',
      name: 'Management Team',
      type: 'Ring Group',
      members: 4,
      status: 'active',
      description: 'Management and executive team',
      createdBy: 'David Wilson',
      createdAt: '2024-01-11 11:30:00',
      lastModified: '2024-01-16 13:10:00'
    }
  ]

  const filteredData = mockData.filter(group => {
    const matchesSearch = group.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         group.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesFilter = filterStatus === 'all' || group.status === filterStatus
    return matchesSearch && matchesFilter
  })

  const columns = [
    { key: 'name', label: 'Name', sortable: true },
    { key: 'type', label: 'Type', sortable: true },
    { key: 'members', label: 'Members', sortable: true },
    { key: 'status', label: 'Status', sortable: true },
    { key: 'createdBy', label: 'Created By', sortable: true },
    { key: 'createdAt', label: 'Created At', sortable: true },
    { key: 'actions', label: 'Actions', sortable: false }
  ]

  const handleEdit = (group: SmartGroup) => {
    setEditingGroup(group)
    setIsModalOpen(true)
  }

  const handleDelete = (id: string) => {
    console.log('Delete group:', id)
  }

  const handleSettings = (id: string) => {
    console.log('Configure group:', id)
  }

  const renderCell = (key: string, value: any, row: SmartGroup) => {
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

    if (key === 'members') {
      return (
        <div className="flex items-center space-x-2">
          <Users className={`w-4 h-4 ${isDarkMode ? 'text-white/60' : 'text-gray-500'}`} />
          <span>{value}</span>
        </div>
      )
    }

    if (key === 'actions') {
      return (
        <div className="flex items-center space-x-2">
          <button
            onClick={() => handleSettings(row.id)}
            className={`p-1 rounded hover:bg-gray-100 dark:hover:bg-gray-700 ${
              isDarkMode ? 'text-white' : 'text-gray-600'
            }`}
            title="Settings"
          >
            <Settings className="w-4 h-4" />
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
      label: 'Group Name',
      type: 'text',
      required: true,
      value: editingGroup?.name || ''
    },
    {
      name: 'type',
      label: 'Group Type',
      type: 'select',
      required: true,
      value: editingGroup?.type || 'Ring Group',
      options: [
        { value: 'Ring Group', label: 'Ring Group' },
        { value: 'Queue', label: 'Queue' },
        { value: 'Hunt Group', label: 'Hunt Group' }
      ]
    },
    {
      name: 'description',
      label: 'Description',
      type: 'textarea',
      required: false,
      value: editingGroup?.description || ''
    },
    {
      name: 'status',
      label: 'Status',
      type: 'select',
      required: true,
      value: editingGroup?.status || 'active',
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
              Smart Groups
            </h1>
            <p className={`mt-1 ${isDarkMode ? 'text-white/70' : 'text-gray-600'}`}>
              Manage ring groups, queues, and hunt groups for call routing
            </p>
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="btn-primary flex items-center space-x-2"
            onClick={() => {
              setEditingGroup(null)
              setIsModalOpen(true)
            }}
          >
            <Plus className="w-4 h-4" />
            <span>Add Group</span>
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
                placeholder="Search groups..."
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
          title={editingGroup ? 'Edit Smart Group' : 'Add Smart Group'}
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
