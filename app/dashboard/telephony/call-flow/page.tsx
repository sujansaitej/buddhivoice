'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { GitBranch, Play, Pause, Settings, Calendar, CheckCircle, XCircle, Clock } from 'lucide-react'
import DataTable from '../../../../components/ui/DataTable'
import Modal from '../../../../components/ui/Modal'
import Form from '../../../../components/ui/Form'

interface CallFlow {
  id: string
  name: string
  description: string
  trigger: string
  status: 'active' | 'inactive' | 'draft'
  priority: 'high' | 'medium' | 'low'
  steps: number
  createdAt: string
  lastModified: string
  createdBy: string
  assignedTo: string
  callsProcessed: number
}

export default function CallFlowPage() {
  const [isDarkMode, setIsDarkMode] = useState(true)
  const [callFlows, setCallFlows] = useState<CallFlow[]>([])
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
  const [selectedFlow, setSelectedFlow] = useState<CallFlow | null>(null)
  const [isEditMode, setIsEditMode] = useState(false)
  const [loading, setLoading] = useState(false)

  // Mock data
  useEffect(() => {
    const mockData: CallFlow[] = [
      {
        id: '1',
        name: 'Sales Inbound Flow',
        description: 'Handles incoming sales calls with IVR menu and routing',
        trigger: 'Incoming Call',
        status: 'active',
        priority: 'high',
        steps: 8,
        createdAt: '2024-01-01',
        lastModified: '2024-01-15',
        createdBy: 'John Smith',
        assignedTo: 'Sales Department',
        callsProcessed: 1250
      },
      {
        id: '2',
        name: 'Support Queue Flow',
        description: 'Routes support calls to available agents with hold music',
        trigger: 'Support Number',
        status: 'active',
        priority: 'high',
        steps: 5,
        createdAt: '2024-01-02',
        lastModified: '2024-01-14',
        createdBy: 'Sarah Johnson',
        assignedTo: 'Support Department',
        callsProcessed: 2100
      },
      {
        id: '3',
        name: 'After Hours Flow',
        description: 'Handles calls outside business hours with voicemail',
        trigger: 'Time-based',
        status: 'active',
        priority: 'medium',
        steps: 3,
        createdAt: '2024-01-03',
        lastModified: '2024-01-10',
        createdBy: 'Mike Chen',
        assignedTo: 'Customer Service',
        callsProcessed: 450
      },
      {
        id: '4',
        name: 'VIP Customer Flow',
        description: 'Special routing for VIP customers with priority handling',
        trigger: 'VIP Number',
        status: 'active',
        priority: 'high',
        steps: 6,
        createdAt: '2024-01-04',
        lastModified: '2024-01-12',
        createdBy: 'Emily Davis',
        assignedTo: 'VIP Support',
        callsProcessed: 180
      },
      {
        id: '5',
        name: 'Emergency Flow',
        description: 'Emergency contact flow for urgent situations',
        trigger: 'Emergency Number',
        status: 'inactive',
        priority: 'high',
        steps: 4,
        createdAt: '2024-01-05',
        lastModified: '2024-01-08',
        createdBy: 'David Wilson',
        assignedTo: 'Emergency Team',
        callsProcessed: 25
      },
      {
        id: '6',
        name: 'Marketing Campaign Flow',
        description: 'Outbound campaign flow for marketing calls',
        trigger: 'Campaign Trigger',
        status: 'draft',
        priority: 'low',
        steps: 7,
        createdAt: '2024-01-15',
        lastModified: '2024-01-15',
        createdBy: 'Lisa Anderson',
        assignedTo: 'Marketing Department',
        callsProcessed: 0
      }
    ]
    setCallFlows(mockData)
  }, [])

  const columns = [
    {
      key: 'name',
      label: 'Call Flow',
      sortable: true,
      render: (value: string, row: CallFlow) => (
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-purple-700 rounded-lg flex items-center justify-center">
            <GitBranch className="w-5 h-5 text-white" />
          </div>
          <div>
            <div className={`font-medium ${isDarkMode ? 'text-white' : 'text-black'}`}>
              {value}
            </div>
            <div className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              {row.steps} steps
            </div>
          </div>
        </div>
      )
    },
    {
      key: 'description',
      label: 'Description',
      render: (value: string) => (
        <div className={`max-w-xs truncate ${isDarkMode ? 'text-white' : 'text-black'}`}>
          {value}
        </div>
      )
    },
    {
      key: 'trigger',
      label: 'Trigger',
      sortable: true,
      render: (value: string) => (
        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
          value === 'Incoming Call' ? 'bg-blue-100 text-blue-800' :
          value === 'Support Number' ? 'bg-green-100 text-green-800' :
          value === 'Time-based' ? 'bg-yellow-100 text-yellow-800' :
          value === 'VIP Number' ? 'bg-purple-100 text-purple-800' :
          value === 'Emergency Number' ? 'bg-red-100 text-red-800' :
          value === 'Campaign Trigger' ? 'bg-pink-100 text-pink-800' :
          'bg-gray-100 text-gray-800'
        }`}>
          {value}
        </span>
      )
    },
    {
      key: 'priority',
      label: 'Priority',
      sortable: true,
      render: (value: string) => (
        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
          value === 'high' 
            ? 'bg-red-100 text-red-800' 
            : value === 'medium'
            ? 'bg-yellow-100 text-yellow-800'
            : 'bg-green-100 text-green-800'
        }`}>
          {value.charAt(0).toUpperCase() + value.slice(1)}
        </span>
      )
    },
    {
      key: 'assignedTo',
      label: 'Assigned To',
      sortable: true,
      render: (value: string) => (
        <span className={isDarkMode ? 'text-white' : 'text-black'}>{value}</span>
      )
    },
    {
      key: 'callsProcessed',
      label: 'Calls Processed',
      sortable: true,
      render: (value: number) => (
        <span className={`font-medium ${isDarkMode ? 'text-white' : 'text-black'}`}>
          {value.toLocaleString()}
        </span>
      )
    },
    {
      key: 'status',
      label: 'Status',
      sortable: true,
      render: (value: string) => (
        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
          value === 'active' 
            ? 'bg-green-100 text-green-800' 
            : value === 'inactive'
            ? 'bg-red-100 text-red-800'
            : 'bg-gray-100 text-gray-800'
        }`}>
          {value === 'active' ? (
            <Play className="w-3 h-3 mr-1" />
          ) : value === 'inactive' ? (
            <Pause className="w-3 h-3 mr-1" />
          ) : (
            <Settings className="w-3 h-3 mr-1" />
          )}
          {value.charAt(0).toUpperCase() + value.slice(1)}
        </span>
      )
    },
    {
      key: 'lastModified',
      label: 'Last Modified',
      sortable: true,
      render: (value: string) => (
        <div className="flex items-center space-x-2">
          <Calendar className={`w-4 h-4 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`} />
          <span className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            {new Date(value).toLocaleDateString()}
          </span>
        </div>
      )
    }
  ]

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
      label: 'Call Flow Name',
      type: 'text' as const,
      placeholder: 'Enter call flow name',
      required: true,
      validation: (value: string) => {
        if (value.length < 3) return 'Name must be at least 3 characters'
        return null
      }
    },
    {
      name: 'description',
      label: 'Description',
      type: 'textarea' as const,
      placeholder: 'Enter call flow description',
      required: true,
      validation: (value: string) => {
        if (value.length < 10) return 'Description must be at least 10 characters'
        return null
      }
    },
    {
      name: 'trigger',
      label: 'Trigger',
      type: 'select' as const,
      required: true,
      options: [
        { value: 'Incoming Call', label: 'Incoming Call' },
        { value: 'Support Number', label: 'Support Number' },
        { value: 'Time-based', label: 'Time-based' },
        { value: 'VIP Number', label: 'VIP Number' },
        { value: 'Emergency Number', label: 'Emergency Number' },
        { value: 'Campaign Trigger', label: 'Campaign Trigger' }
      ]
    },
    {
      name: 'priority',
      label: 'Priority',
      type: 'select' as const,
      required: true,
      options: [
        { value: 'high', label: 'High' },
        { value: 'medium', label: 'Medium' },
        { value: 'low', label: 'Low' }
      ]
    },
    {
      name: 'assignedTo',
      label: 'Assigned To',
      type: 'select' as const,
      required: true,
      options: [
        { value: 'Sales Department', label: 'Sales Department' },
        { value: 'Support Department', label: 'Support Department' },
        { value: 'Customer Service', label: 'Customer Service' },
        { value: 'VIP Support', label: 'VIP Support' },
        { value: 'Emergency Team', label: 'Emergency Team' },
        { value: 'Marketing Department', label: 'Marketing Department' }
      ]
    },
    {
      name: 'status',
      label: 'Status',
      type: 'select' as const,
      required: true,
      options: [
        { value: 'active', label: 'Active' },
        { value: 'inactive', label: 'Inactive' },
        { value: 'draft', label: 'Draft' }
      ]
    }
  ]

  const handleAdd = () => {
    setSelectedFlow(null)
    setIsEditMode(false)
    setIsModalOpen(true)
  }

  const handleEdit = (flow: CallFlow) => {
    setSelectedFlow(flow)
    setIsEditMode(true)
    setIsModalOpen(true)
  }

  const handleDelete = (flow: CallFlow) => {
    setSelectedFlow(flow)
    setIsDeleteModalOpen(true)
  }

  const handleView = (flow: CallFlow) => {
    setSelectedFlow(flow)
    setIsEditMode(false)
    setIsModalOpen(true)
  }

  const handleSubmit = async (data: Record<string, string>) => {
    setLoading(true)
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    if (isEditMode && selectedFlow) {
      // Update existing flow
      setCallFlows(prev => prev.map(flow => 
        flow.id === selectedFlow.id 
          ? { 
              ...flow, 
              ...data, 
              lastModified: new Date().toISOString().split('T')[0],
              createdAt: flow.createdAt,
              createdBy: flow.createdBy,
              steps: flow.steps,
              callsProcessed: flow.callsProcessed
            }
          : flow
      ))
    } else {
      // Add new flow
      const newFlow: CallFlow = {
        id: Date.now().toString(),
        ...data,
        steps: 0,
        createdAt: new Date().toISOString().split('T')[0],
        lastModified: new Date().toISOString().split('T')[0],
        createdBy: 'Current User',
        callsProcessed: 0
      }
      setCallFlows(prev => [...prev, newFlow])
    }
    
    setLoading(false)
    setIsModalOpen(false)
    setSelectedFlow(null)
  }

  const handleDeleteConfirm = async () => {
    if (!selectedFlow) return
    
    setLoading(true)
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    setCallFlows(prev => prev.filter(flow => flow.id !== selectedFlow.id))
    
    setLoading(false)
    setIsDeleteModalOpen(false)
    setSelectedFlow(null)
  }

  const getInitialData = () => {
    if (selectedFlow && isEditMode) {
      return {
        name: selectedFlow.name,
        description: selectedFlow.description,
        trigger: selectedFlow.trigger,
        priority: selectedFlow.priority,
        assignedTo: selectedFlow.assignedTo,
        status: selectedFlow.status
      }
    }
    return {}
  }

  const activeFlows = callFlows.filter(f => f.status === 'active').length
  const totalCallsProcessed = callFlows.reduce((sum, f) => sum + f.callsProcessed, 0)
  const draftFlows = callFlows.filter(f => f.status === 'draft').length

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl p-6 border ${isDarkMode ? 'border-gray-700' : 'border-gray-200'}`}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-700 rounded-xl flex items-center justify-center">
              <GitBranch className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-black'}`}>
                Call Flow Management
              </h1>
              <p className={`${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                Design and manage automated call routing flows
              </p>
            </div>
          </div>
          
          <div className="flex items-center space-x-6">
            <div className="text-right">
              <div className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-black'}`}>
                {callFlows.length}
              </div>
              <div className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                Total Flows
              </div>
            </div>
            <div className="text-right">
              <div className={`text-2xl font-bold text-green-500`}>
                {activeFlows}
              </div>
              <div className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                Active
              </div>
            </div>
            <div className="text-right">
              <div className={`text-2xl font-bold text-blue-500`}>
                {totalCallsProcessed.toLocaleString()}
              </div>
              <div className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                Calls Processed
              </div>
            </div>
            <div className="text-right">
              <div className={`text-2xl font-bold text-yellow-500`}>
                {draftFlows}
              </div>
              <div className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                Drafts
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Data Table */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <DataTable
          data={callFlows}
          columns={columns}
          isDarkMode={isDarkMode}
          onAdd={handleAdd}
          onEdit={handleEdit}
          onDelete={handleDelete}
          onView={handleView}
          title="Call Flows"
          addButtonText="Create Call Flow"
        />
      </motion.div>

      {/* Add/Edit Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false)
          setSelectedFlow(null)
        }}
        title={isEditMode ? 'Edit Call Flow' : selectedFlow ? 'View Call Flow' : 'Create Call Flow'}
        isDarkMode={isDarkMode}
        size="lg"
      >
        {selectedFlow && !isEditMode ? (
          // View Mode
          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-white' : 'text-gray-700'}`}>
                  Call Flow Name
                </label>
                <div className={`p-3 rounded-lg ${isDarkMode ? 'bg-gray-700 text-white' : 'bg-gray-100 text-black'}`}>
                  {selectedFlow.name}
                </div>
              </div>
              <div>
                <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-white' : 'text-gray-700'}`}>
                  Status
                </label>
                <div className={`p-3 rounded-lg ${isDarkMode ? 'bg-gray-700 text-white' : 'bg-gray-100 text-black'}`}>
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    selectedFlow.status === 'active' 
                      ? 'bg-green-100 text-green-800' 
                      : selectedFlow.status === 'inactive'
                      ? 'bg-red-100 text-red-800'
                      : 'bg-gray-100 text-gray-800'
                  }`}>
                    {selectedFlow.status === 'active' ? (
                      <Play className="w-3 h-3 mr-1" />
                    ) : selectedFlow.status === 'inactive' ? (
                      <Pause className="w-3 h-3 mr-1" />
                    ) : (
                      <Settings className="w-3 h-3 mr-1" />
                    )}
                    {selectedFlow.status.charAt(0).toUpperCase() + selectedFlow.status.slice(1)}
                  </span>
                </div>
              </div>
              <div>
                <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-white' : 'text-gray-700'}`}>
                  Trigger
                </label>
                <div className={`p-3 rounded-lg ${isDarkMode ? 'bg-gray-700 text-white' : 'bg-gray-100 text-black'}`}>
                  {selectedFlow.trigger}
                </div>
              </div>
              <div>
                <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-white' : 'text-gray-700'}`}>
                  Priority
                </label>
                <div className={`p-3 rounded-lg ${isDarkMode ? 'bg-gray-700 text-white' : 'bg-gray-100 text-black'}`}>
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    selectedFlow.priority === 'high' 
                      ? 'bg-red-100 text-red-800' 
                      : selectedFlow.priority === 'medium'
                      ? 'bg-yellow-100 text-yellow-800'
                      : 'bg-green-100 text-green-800'
                  }`}>
                    {selectedFlow.priority.charAt(0).toUpperCase() + selectedFlow.priority.slice(1)}
                  </span>
                </div>
              </div>
              <div>
                <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-white' : 'text-gray-700'}`}>
                  Assigned To
                </label>
                <div className={`p-3 rounded-lg ${isDarkMode ? 'bg-gray-700 text-white' : 'bg-gray-100 text-black'}`}>
                  {selectedFlow.assignedTo}
                </div>
              </div>
              <div>
                <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-white' : 'text-gray-700'}`}>
                  Steps
                </label>
                <div className={`p-3 rounded-lg ${isDarkMode ? 'bg-gray-700 text-white' : 'bg-gray-100 text-black'}`}>
                  {selectedFlow.steps}
                </div>
              </div>
              <div>
                <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-white' : 'text-gray-700'}`}>
                  Calls Processed
                </label>
                <div className={`p-3 rounded-lg ${isDarkMode ? 'bg-gray-700 text-white' : 'bg-gray-100 text-black'}`}>
                  {selectedFlow.callsProcessed.toLocaleString()}
                </div>
              </div>
              <div>
                <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-white' : 'text-gray-700'}`}>
                  Created By
                </label>
                <div className={`p-3 rounded-lg ${isDarkMode ? 'bg-gray-700 text-white' : 'bg-gray-100 text-black'}`}>
                  {selectedFlow.createdBy}
                </div>
              </div>
              <div>
                <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-white' : 'text-gray-700'}`}>
                  Created Date
                </label>
                <div className={`p-3 rounded-lg ${isDarkMode ? 'bg-gray-700 text-white' : 'bg-gray-100 text-black'}`}>
                  {new Date(selectedFlow.createdAt).toLocaleDateString()}
                </div>
              </div>
              <div>
                <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-white' : 'text-gray-700'}`}>
                  Last Modified
                </label>
                <div className={`p-3 rounded-lg ${isDarkMode ? 'bg-gray-700 text-white' : 'bg-gray-100 text-black'}`}>
                  {new Date(selectedFlow.lastModified).toLocaleDateString()}
                </div>
              </div>
            </div>
            
            <div>
              <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-white' : 'text-gray-700'}`}>
                Description
              </label>
              <div className={`p-3 rounded-lg ${isDarkMode ? 'bg-gray-700 text-white' : 'bg-gray-100 text-black'}`}>
                {selectedFlow.description}
              </div>
            </div>
          </div>
        ) : (
          // Add/Edit Mode
          <Form
            fields={formFields}
            onSubmit={handleSubmit}
            isDarkMode={isDarkMode}
            submitText={isEditMode ? 'Update Call Flow' : 'Create Call Flow'}
            loading={loading}
            initialData={getInitialData()}
          />
        )}
      </Modal>

      {/* Delete Confirmation Modal */}
      <Modal
        isOpen={isDeleteModalOpen}
        onClose={() => {
          setIsDeleteModalOpen(false)
          setSelectedFlow(null)
        }}
        title="Delete Call Flow"
        isDarkMode={isDarkMode}
        size="sm"
      >
        <div className="space-y-4">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
              <XCircle className="w-6 h-6 text-red-600" />
            </div>
            <div>
              <h3 className={`text-lg font-medium ${isDarkMode ? 'text-white' : 'text-black'}`}>
                Are you sure?
              </h3>
              <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                This action cannot be undone. The call flow will be permanently deleted.
              </p>
            </div>
          </div>
          
          {selectedFlow && (
            <div className={`p-4 rounded-lg ${isDarkMode ? 'bg-gray-700' : 'bg-gray-100'}`}>
              <p className={`text-sm ${isDarkMode ? 'text-white' : 'text-black'}`}>
                You are about to delete <strong>{selectedFlow.name}</strong> which has processed {selectedFlow.callsProcessed.toLocaleString()} calls.
              </p>
            </div>
          )}
          
          <div className="flex justify-end space-x-3">
            <button
              onClick={() => {
                setIsDeleteModalOpen(false)
                setSelectedFlow(null)
              }}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                isDarkMode 
                  ? 'text-gray-300 hover:bg-gray-700' 
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              Cancel
            </button>
            <button
              onClick={handleDeleteConfirm}
              disabled={loading}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                loading
                  ? 'bg-gray-400 cursor-not-allowed'
                  : 'bg-red-600 hover:bg-red-700 text-white'
              }`}
            >
              {loading ? 'Deleting...' : 'Delete'}
            </button>
          </div>
        </div>
      </Modal>
    </div>
  )
}
