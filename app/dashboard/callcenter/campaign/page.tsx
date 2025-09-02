'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Plus, Play, Pause, Square, Edit, Trash2, Search, Filter, Target, Users, Phone, Clock, BarChart3 } from 'lucide-react'
import DataTable from '../../../../components/ui/DataTable'
import Modal from '../../../../components/ui/Modal'
import Form from '../../../../components/ui/Form'

interface Campaign {
  id: string
  name: string
  type: 'outbound' | 'inbound' | 'survey' | 'reminder'
  status: 'draft' | 'active' | 'paused' | 'completed' | 'stopped'
  targetList: string
  totalContacts: number
  contacted: number
  successful: number
  failed: number
  startDate: string
  endDate: string
  createdBy: string
  createdAt: string
  description: string
  priority: 'low' | 'medium' | 'high'
}

export default function CampaignPage() {
  const [isDarkMode, setIsDarkMode] = useState(true)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingCampaign, setEditingCampaign] = useState<Campaign | null>(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [filterStatus, setFilterStatus] = useState('all')
  const [filterType, setFilterType] = useState('all')

  const mockData: Campaign[] = [
    {
      id: '1',
      name: 'Q1 Sales Outreach',
      type: 'outbound',
      status: 'active',
      targetList: 'Enterprise Prospects',
      totalContacts: 500,
      contacted: 150,
      successful: 45,
      failed: 105,
      startDate: '2024-01-15',
      endDate: '2024-03-31',
      createdBy: 'John Smith',
      createdAt: '2024-01-10 10:30:00',
      description: 'Q1 sales campaign targeting enterprise prospects',
      priority: 'high'
    },
    {
      id: '2',
      name: 'Customer Satisfaction Survey',
      type: 'survey',
      status: 'paused',
      targetList: 'Existing Customers',
      totalContacts: 200,
      contacted: 80,
      successful: 60,
      failed: 20,
      startDate: '2024-01-20',
      endDate: '2024-02-20',
      createdBy: 'Sarah Johnson',
      createdAt: '2024-01-15 14:20:00',
      description: 'Customer satisfaction survey for existing customers',
      priority: 'medium'
    },
    {
      id: '3',
      name: 'Payment Reminder',
      type: 'reminder',
      status: 'completed',
      targetList: 'Overdue Accounts',
      totalContacts: 100,
      contacted: 100,
      successful: 75,
      failed: 25,
      startDate: '2024-01-01',
      endDate: '2024-01-31',
      createdBy: 'Mike Chen',
      createdAt: '2023-12-28 09:15:00',
      description: 'Payment reminder campaign for overdue accounts',
      priority: 'high'
    },
    {
      id: '4',
      name: 'Product Demo Follow-up',
      type: 'outbound',
      status: 'draft',
      targetList: 'Demo Attendees',
      totalContacts: 50,
      contacted: 0,
      successful: 0,
      failed: 0,
      startDate: '2024-02-01',
      endDate: '2024-02-28',
      createdBy: 'Emily Davis',
      createdAt: '2024-01-25 16:45:00',
      description: 'Follow-up calls for product demo attendees',
      priority: 'medium'
    },
    {
      id: '5',
      name: 'Support Ticket Follow-up',
      type: 'inbound',
      status: 'stopped',
      targetList: 'Support Tickets',
      totalContacts: 75,
      contacted: 30,
      successful: 25,
      failed: 5,
      startDate: '2024-01-05',
      endDate: '2024-01-25',
      createdBy: 'David Wilson',
      createdAt: '2024-01-03 11:30:00',
      description: 'Follow-up calls for support ticket resolution',
      priority: 'low'
    }
  ]

  const filteredData = mockData.filter(campaign => {
    const matchesSearch = campaign.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         campaign.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         campaign.targetList.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = filterStatus === 'all' || campaign.status === filterStatus
    const matchesType = filterType === 'all' || campaign.type === filterType
    return matchesSearch && matchesStatus && matchesType
  })

  const columns = [
    { key: 'name', label: 'Campaign Name', sortable: true },
    { key: 'type', label: 'Type', sortable: true },
    { key: 'status', label: 'Status', sortable: true },
    { key: 'targetList', label: 'Target List', sortable: true },
    { key: 'totalContacts', label: 'Total', sortable: true },
    { key: 'contacted', label: 'Contacted', sortable: true },
    { key: 'successful', label: 'Successful', sortable: true },
    { key: 'startDate', label: 'Start Date', sortable: true },
    { key: 'actions', label: 'Actions', sortable: false }
  ]

  const handleEdit = (campaign: Campaign) => {
    setEditingCampaign(campaign)
    setIsModalOpen(true)
  }

  const handleDelete = (id: string) => {
    console.log('Delete campaign:', id)
  }

  const handleStart = (id: string) => {
    console.log('Start campaign:', id)
  }

  const handlePause = (id: string) => {
    console.log('Pause campaign:', id)
  }

  const handleSquare = (id: string) => {
    console.log('Square campaign:', id)
  }

  const getSuccessRate = (successful: number, contacted: number) => {
    if (contacted === 0) return 0
    return Math.round((successful / contacted) * 100)
  }

  const renderCell = (key: string, value: any, row: Campaign) => {
    if (key === 'status') {
      const statusColors = {
        draft: 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200',
        active: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
        paused: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200',
        completed: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
        stopped: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
      }
      return (
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusColors[row.status]}`}>
          {value}
        </span>
      )
    }

    if (key === 'type') {
      const typeColors = {
        outbound: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
        inbound: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
        survey: 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200',
        reminder: 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200'
      }
      return (
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${typeColors[row.type]}`}>
          {value}
        </span>
      )
    }

    if (key === 'totalContacts') {
      return (
        <div className="flex items-center space-x-2">
          <Users className={`w-4 h-4 ${isDarkMode ? 'text-white/60' : 'text-gray-500'}`} />
          <span>{value}</span>
        </div>
      )
    }

    if (key === 'contacted') {
      const successRate = getSuccessRate(row.successful, row.contacted)
      return (
        <div className="flex items-center space-x-2">
          <Phone className={`w-4 h-4 ${isDarkMode ? 'text-white/60' : 'text-gray-500'}`} />
          <div>
            <div>{value}</div>
            <div className="text-xs text-gray-500">{successRate}% success</div>
          </div>
        </div>
      )
    }

    if (key === 'successful') {
      return (
        <div className="flex items-center space-x-2">
          <BarChart3 className={`w-4 h-4 ${isDarkMode ? 'text-white/60' : 'text-gray-500'}`} />
          <span className="text-green-600 dark:text-green-400">{value}</span>
        </div>
      )
    }

    if (key === 'startDate') {
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
          {row.status === 'draft' && (
            <button
              onClick={() => handleStart(row.id)}
              className={`p-1 rounded hover:bg-gray-100 dark:hover:bg-gray-700 ${
                isDarkMode ? 'text-white' : 'text-gray-600'
              }`}
              title="Start Campaign"
            >
              <Play className="w-4 h-4" />
            </button>
          )}
          {row.status === 'active' && (
            <button
              onClick={() => handlePause(row.id)}
              className={`p-1 rounded hover:bg-gray-100 dark:hover:bg-gray-700 ${
                isDarkMode ? 'text-white' : 'text-gray-600'
              }`}
              title="Pause Campaign"
            >
              <Pause className="w-4 h-4" />
            </button>
          )}
          {(row.status === 'active' || row.status === 'paused') && (
            <button
              onClick={() => handleSquare(row.id)}
              className={`p-1 rounded hover:bg-gray-100 dark:hover:bg-gray-700 ${
                isDarkMode ? 'text-white' : 'text-gray-600'
              }`}
              title="Square Campaign"
            >
              <Square className="w-4 h-4" />
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
      label: 'Campaign Name',
      type: 'text',
      required: true,
      value: editingCampaign?.name || ''
    },
    {
      name: 'type',
      label: 'Campaign Type',
      type: 'select',
      required: true,
      value: editingCampaign?.type || 'outbound',
      options: [
        { value: 'outbound', label: 'Outbound' },
        { value: 'inbound', label: 'Inbound' },
        { value: 'survey', label: 'Survey' },
        { value: 'reminder', label: 'Reminder' }
      ]
    },
    {
      name: 'targetList',
      label: 'Target List',
      type: 'text',
      required: true,
      value: editingCampaign?.targetList || ''
    },
    {
      name: 'totalContacts',
      label: 'Total Contacts',
      type: 'number',
      required: true,
      value: editingCampaign?.totalContacts || 0
    },
    {
      name: 'startDate',
      label: 'Start Date',
      type: 'date',
      required: true,
      value: editingCampaign?.startDate || ''
    },
    {
      name: 'endDate',
      label: 'End Date',
      type: 'date',
      required: true,
      value: editingCampaign?.endDate || ''
    },
    {
      name: 'priority',
      label: 'Priority',
      type: 'select',
      required: true,
      value: editingCampaign?.priority || 'medium',
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
      value: editingCampaign?.status || 'draft',
      options: [
        { value: 'draft', label: 'Draft' },
        { value: 'active', label: 'Active' },
        { value: 'paused', label: 'Paused' },
        { value: 'completed', label: 'Completed' },
        { value: 'stopped', label: 'Squareped' }
      ]
    },
    {
      name: 'description',
      label: 'Description',
      type: 'textarea',
      required: false,
      value: editingCampaign?.description || ''
    }
  ]

  return (
    <div className={`min-h-screen transition-all duration-500 ${isDarkMode ? 'dark' : 'light'}`}>
      <div className="p-6">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-black'}`}>
              Campaigns
            </h1>
            <p className={`mt-1 ${isDarkMode ? 'text-white/70' : 'text-gray-600'}`}>
              Manage outbound campaigns, surveys, and automated calling sequences
            </p>
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="btn-primary flex items-center space-x-2"
            onClick={() => {
              setEditingCampaign(null)
              setIsModalOpen(true)
            }}
          >
            <Plus className="w-4 h-4" />
            <span>Create Campaign</span>
          </motion.button>
        </div>

        {/* Campaign Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className={`rounded-xl border p-4 ${
            isDarkMode ? 'bg-white/5 border-white/10' : 'bg-white border-gray-200'
          }`}>
            <div className="flex items-center space-x-3">
              <Target className={`w-8 h-8 ${isDarkMode ? 'text-blue-400' : 'text-blue-600'}`} />
              <div>
                <p className={`text-sm ${isDarkMode ? 'text-white/70' : 'text-gray-600'}`}>Total Campaigns</p>
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
              <Play className={`w-8 h-8 ${isDarkMode ? 'text-green-400' : 'text-green-600'}`} />
              <div>
                <p className={`text-sm ${isDarkMode ? 'text-white/70' : 'text-gray-600'}`}>Active</p>
                <p className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-black'}`}>
                  {mockData.filter(c => c.status === 'active').length}
                </p>
              </div>
            </div>
          </div>
          <div className={`rounded-xl border p-4 ${
            isDarkMode ? 'bg-white/5 border-white/10' : 'bg-white border-gray-200'
          }`}>
            <div className="flex items-center space-x-3">
              <Users className={`w-8 h-8 ${isDarkMode ? 'text-purple-400' : 'text-purple-600'}`} />
              <div>
                <p className={`text-sm ${isDarkMode ? 'text-white/70' : 'text-gray-600'}`}>Total Contacts</p>
                <p className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-black'}`}>
                  {mockData.reduce((sum, c) => sum + c.totalContacts, 0)}
                </p>
              </div>
            </div>
          </div>
          <div className={`rounded-xl border p-4 ${
            isDarkMode ? 'bg-white/5 border-white/10' : 'bg-white border-gray-200'
          }`}>
            <div className="flex items-center space-x-3">
              <BarChart3 className={`w-8 h-8 ${isDarkMode ? 'text-orange-400' : 'text-orange-600'}`} />
              <div>
                <p className={`text-sm ${isDarkMode ? 'text-white/70' : 'text-gray-600'}`}>Success Rate</p>
                <p className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-black'}`}>
                  {Math.round(mockData.reduce((sum, c) => sum + getSuccessRate(c.successful, c.contacted), 0) / mockData.length)}%
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
                placeholder="Search campaigns..."
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
              <option value="draft">Draft</option>
              <option value="active">Active</option>
              <option value="paused">Paused</option>
              <option value="completed">Completed</option>
              <option value="stopped">Squareped</option>
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
              <option value="survey">Survey</option>
              <option value="reminder">Reminder</option>
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
          title={editingCampaign ? 'Edit Campaign' : 'Create Campaign'}
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
