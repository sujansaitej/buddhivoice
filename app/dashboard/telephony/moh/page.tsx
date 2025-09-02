'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Plus, Music, Play, Pause, Edit, Trash2, Search, Filter } from 'lucide-react'
import DataTable from '../../../../components/ui/DataTable'
import Modal from '../../../../components/ui/Modal'
import Form from '../../../../components/ui/Form'

interface MOH {
  id: string
  name: string
  type: string
  duration: string
  status: 'active' | 'inactive'
  description: string
  createdBy: string
  createdAt: string
  fileSize: string
}

export default function MOHPage() {
  const [isDarkMode, setIsDarkMode] = useState(true)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingMOH, setEditingMOH] = useState<MOH | null>(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [filterStatus, setFilterStatus] = useState('all')

  const mockData: MOH[] = [
    {
      id: '1',
      name: 'Classical Music',
      type: 'MP3',
      duration: '5:30',
      status: 'active',
      description: 'Classical music for hold',
      createdBy: 'John Smith',
      createdAt: '2024-01-15 10:30:00',
      fileSize: '8.2 MB'
    },
    {
      id: '2',
      name: 'Jazz Collection',
      type: 'WAV',
      duration: '12:45',
      status: 'active',
      description: 'Smooth jazz for professional calls',
      createdBy: 'Sarah Johnson',
      createdAt: '2024-01-14 14:20:00',
      fileSize: '15.6 MB'
    },
    {
      id: '3',
      name: 'Ambient Sounds',
      type: 'MP3',
      duration: '8:20',
      status: 'inactive',
      description: 'Relaxing ambient sounds',
      createdBy: 'Mike Chen',
      createdAt: '2024-01-13 09:15:00',
      fileSize: '11.3 MB'
    },
    {
      id: '4',
      name: 'Corporate Music',
      type: 'WAV',
      duration: '6:15',
      status: 'active',
      description: 'Professional corporate music',
      createdBy: 'Emily Davis',
      createdAt: '2024-01-12 16:45:00',
      fileSize: '9.8 MB'
    },
    {
      id: '5',
      name: 'Nature Sounds',
      type: 'MP3',
      duration: '10:00',
      status: 'active',
      description: 'Peaceful nature sounds',
      createdBy: 'David Wilson',
      createdAt: '2024-01-11 11:30:00',
      fileSize: '13.2 MB'
    }
  ]

  const filteredData = mockData.filter(moh => {
    const matchesSearch = moh.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         moh.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesFilter = filterStatus === 'all' || moh.status === filterStatus
    return matchesSearch && matchesFilter
  })

  const columns = [
    { key: 'name', label: 'Name', sortable: true },
    { key: 'type', label: 'Type', sortable: true },
    { key: 'duration', label: 'Duration', sortable: true },
    { key: 'fileSize', label: 'File Size', sortable: true },
    { key: 'status', label: 'Status', sortable: true },
    { key: 'createdBy', label: 'Created By', sortable: true },
    { key: 'createdAt', label: 'Created At', sortable: true },
    { key: 'actions', label: 'Actions', sortable: false }
  ]

  const handleEdit = (moh: MOH) => {
    setEditingMOH(moh)
    setIsModalOpen(true)
  }

  const handleDelete = (id: string) => {
    console.log('Delete MOH:', id)
  }

  const handlePlay = (id: string) => {
    console.log('Play MOH:', id)
  }

  const renderCell = (key: string, value: any, row: MOH) => {
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

    if (key === 'actions') {
      return (
        <div className="flex items-center space-x-2">
          <button
            onClick={() => handlePlay(row.id)}
            className={`p-1 rounded hover:bg-gray-100 dark:hover:bg-gray-700 ${
              isDarkMode ? 'text-white' : 'text-gray-600'
            }`}
            title="Play"
          >
            <Play className="w-4 h-4" />
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
      label: 'MOH Name',
      type: 'text',
      required: true,
      value: editingMOH?.name || ''
    },
    {
      name: 'description',
      label: 'Description',
      type: 'textarea',
      required: false,
      value: editingMOH?.description || ''
    },
    {
      name: 'type',
      label: 'File Type',
      type: 'select',
      required: true,
      value: editingMOH?.type || 'MP3',
      options: [
        { value: 'MP3', label: 'MP3' },
        { value: 'WAV', label: 'WAV' },
        { value: 'OGG', label: 'OGG' }
      ]
    },
    {
      name: 'status',
      label: 'Status',
      type: 'select',
      required: true,
      value: editingMOH?.status || 'active',
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
              Music on Hold (MOH)
            </h1>
            <p className={`mt-1 ${isDarkMode ? 'text-white/70' : 'text-gray-600'}`}>
              Manage music and audio files played while callers are on hold
            </p>
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="btn-primary flex items-center space-x-2"
            onClick={() => {
              setEditingMOH(null)
              setIsModalOpen(true)
            }}
          >
            <Plus className="w-4 h-4" />
            <span>Add MOH</span>
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
                placeholder="Search MOH files..."
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
          title={editingMOH ? 'Edit MOH' : 'Add MOH'}
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
