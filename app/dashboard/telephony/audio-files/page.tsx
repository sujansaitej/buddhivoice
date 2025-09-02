'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Plus, Upload, Play, Pause, Download, Trash2, Edit, Search, Filter } from 'lucide-react'
import DataTable from '../../../../components/ui/DataTable'
import Modal from '../../../../components/ui/Modal'
import Form from '../../../../components/ui/Form'

interface AudioFile {
  id: string
  name: string
  type: string
  size: string
  duration: string
  status: 'active' | 'inactive'
  uploadedBy: string
  uploadedAt: string
  description: string
}

export default function AudioFilesPage() {
  const [isDarkMode, setIsDarkMode] = useState(true)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingFile, setEditingFile] = useState<AudioFile | null>(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [filterStatus, setFilterStatus] = useState('all')

  const mockData: AudioFile[] = [
    {
      id: '1',
      name: 'Welcome Message',
      type: 'MP3',
      size: '2.4 MB',
      duration: '0:15',
      status: 'active',
      uploadedBy: 'John Smith',
      uploadedAt: '2024-01-15 10:30:00',
      description: 'Welcome message for incoming calls'
    },
    {
      id: '2',
      name: 'Hold Music',
      type: 'WAV',
      size: '5.8 MB',
      duration: '2:30',
      status: 'active',
      uploadedBy: 'Sarah Johnson',
      uploadedAt: '2024-01-14 14:20:00',
      description: 'Background music for call hold'
    },
    {
      id: '3',
      name: 'Error Message',
      type: 'MP3',
      size: '1.2 MB',
      duration: '0:08',
      status: 'inactive',
      uploadedBy: 'Mike Chen',
      uploadedAt: '2024-01-13 09:15:00',
      description: 'Error notification message'
    },
    {
      id: '4',
      name: 'Business Hours',
      type: 'WAV',
      size: '3.1 MB',
      duration: '0:45',
      status: 'active',
      uploadedBy: 'Emily Davis',
      uploadedAt: '2024-01-12 16:45:00',
      description: 'Business hours announcement'
    },
    {
      id: '5',
      name: 'Queue Position',
      type: 'MP3',
      size: '1.8 MB',
      duration: '0:12',
      status: 'active',
      uploadedBy: 'David Wilson',
      uploadedAt: '2024-01-11 11:30:00',
      description: 'Queue position notification'
    }
  ]

  const filteredData = mockData.filter(file => {
    const matchesSearch = file.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         file.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesFilter = filterStatus === 'all' || file.status === filterStatus
    return matchesSearch && matchesFilter
  })

  const columns = [
    { key: 'name', label: 'Name', sortable: true },
    { key: 'type', label: 'Type', sortable: true },
    { key: 'size', label: 'Size', sortable: true },
    { key: 'duration', label: 'Duration', sortable: true },
    { key: 'status', label: 'Status', sortable: true },
    { key: 'uploadedBy', label: 'Uploaded By', sortable: true },
    { key: 'uploadedAt', label: 'Uploaded At', sortable: true },
    { key: 'actions', label: 'Actions', sortable: false }
  ]

  const handleEdit = (file: AudioFile) => {
    setEditingFile(file)
    setIsModalOpen(true)
  }

  const handleDelete = (id: string) => {
    console.log('Delete file:', id)
  }

  const handlePlay = (id: string) => {
    console.log('Play file:', id)
  }

  const handleDownload = (id: string) => {
    console.log('Download file:', id)
  }

  const renderCell = (key: string, value: any, row: AudioFile) => {
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
            onClick={() => handleDownload(row.id)}
            className={`p-1 rounded hover:bg-gray-100 dark:hover:bg-gray-700 ${
              isDarkMode ? 'text-white' : 'text-gray-600'
            }`}
            title="Download"
          >
            <Download className="w-4 h-4" />
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
      name: 'name',
      label: 'File Name',
      type: 'text',
      required: true,
      value: editingFile?.name || ''
    },
    {
      name: 'description',
      label: 'Description',
      type: 'textarea',
      required: false,
      value: editingFile?.description || ''
    },
    {
      name: 'status',
      label: 'Status',
      type: 'select',
      required: true,
      value: editingFile?.status || 'active',
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
              Audio Files
            </h1>
            <p className={`mt-1 ${isDarkMode ? 'text-white/70' : 'text-gray-600'}`}>
              Manage audio files for IVR, hold music, and announcements
            </p>
          </div>
          <div className="flex items-center space-x-3">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="btn-primary flex items-center space-x-2"
              onClick={() => {
                setEditingFile(null)
                setIsModalOpen(true)
              }}
            >
              <Upload className="w-4 h-4" />
              <span>Upload File</span>
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="btn-primary flex items-center space-x-2"
              onClick={() => {
                setEditingFile(null)
                setIsModalOpen(true)
              }}
            >
              <Plus className="w-4 h-4" />
              <span>Add File</span>
            </motion.button>
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
                placeholder="Search audio files..."
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
          title={editingFile ? 'Edit Audio File' : 'Add Audio File'}
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
