'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Phone, MapPin, Calendar, CheckCircle, XCircle, Globe, DollarSign } from 'lucide-react'
import DataTable from '../../../../components/ui/DataTable'
import Modal from '../../../../components/ui/Modal'
import Form from '../../../../components/ui/Form'

interface DIDNumber {
  id: string
  number: string
  country: string
  city: string
  provider: string
  type: 'local' | 'toll-free' | 'international'
  status: 'active' | 'inactive' | 'pending'
  monthlyCost: number
  setupCost: number
  assignedTo: string
  createdAt: string
  features: string[]
}

export default function DIDNumbersPage() {
  const [isDarkMode, setIsDarkMode] = useState(true)
  const [didNumbers, setDidNumbers] = useState<DIDNumber[]>([])
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
  const [selectedDID, setSelectedDID] = useState<DIDNumber | null>(null)
  const [isEditMode, setIsEditMode] = useState(false)
  const [loading, setLoading] = useState(false)

  // Mock data
  useEffect(() => {
    const mockData: DIDNumber[] = [
      {
        id: '1',
        number: '+91 80 1234 5678',
        country: 'India',
        city: 'Bangalore',
        provider: 'Airtel',
        type: 'local',
        status: 'active',
        monthlyCost: 500,
        setupCost: 1000,
        assignedTo: 'Sales Department',
        createdAt: '2024-01-01',
        features: ['SMS', 'Voice', 'Fax']
      },
      {
        id: '2',
        number: '+91 22 9876 5432',
        country: 'India',
        city: 'Mumbai',
        provider: 'Vodafone',
        type: 'local',
        status: 'active',
        monthlyCost: 600,
        setupCost: 1200,
        assignedTo: 'Support Department',
        createdAt: '2024-01-02',
        features: ['SMS', 'Voice']
      },
      {
        id: '3',
        number: '1800 123 4567',
        country: 'India',
        city: 'National',
        provider: 'BSNL',
        type: 'toll-free',
        status: 'active',
        monthlyCost: 800,
        setupCost: 2000,
        assignedTo: 'Customer Service',
        createdAt: '2024-01-03',
        features: ['Voice', 'IVR']
      },
      {
        id: '4',
        number: '+1 555 123 4567',
        country: 'USA',
        city: 'New York',
        provider: 'Verizon',
        type: 'international',
        status: 'active',
        monthlyCost: 1200,
        setupCost: 3000,
        assignedTo: 'International Sales',
        createdAt: '2024-01-04',
        features: ['SMS', 'Voice', 'Fax']
      },
      {
        id: '5',
        number: '+44 20 1234 5678',
        country: 'UK',
        city: 'London',
        provider: 'BT',
        type: 'international',
        status: 'inactive',
        monthlyCost: 1500,
        setupCost: 3500,
        assignedTo: 'Unassigned',
        createdAt: '2024-01-05',
        features: ['Voice']
      },
      {
        id: '6',
        number: '+91 11 5555 7777',
        country: 'India',
        city: 'Delhi',
        provider: 'Jio',
        type: 'local',
        status: 'pending',
        monthlyCost: 450,
        setupCost: 900,
        assignedTo: 'Marketing Department',
        createdAt: '2024-01-15',
        features: ['SMS', 'Voice', 'Video']
      }
    ]
    setDidNumbers(mockData)
  }, [])

  const columns = [
    {
      key: 'number',
      label: 'DID Number',
      sortable: true,
      render: (value: string, row: DIDNumber) => (
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-700 rounded-lg flex items-center justify-center">
            <Phone className="w-5 h-5 text-white" />
          </div>
          <div>
            <div className={`font-medium ${isDarkMode ? 'text-white' : 'text-black'}`}>
              {value}
            </div>
            <div className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              {row.type.charAt(0).toUpperCase() + row.type.slice(1)}
            </div>
          </div>
        </div>
      )
    },
    {
      key: 'location',
      label: 'Location',
      sortable: true,
      render: (value: string, row: DIDNumber) => (
        <div className="flex items-center space-x-2">
          <MapPin className={`w-4 h-4 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`} />
          <div>
            <div className={`font-medium ${isDarkMode ? 'text-white' : 'text-black'}`}>
              {row.city}
            </div>
            <div className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              {row.country}
            </div>
          </div>
        </div>
      )
    },
    {
      key: 'provider',
      label: 'Provider',
      sortable: true,
      render: (value: string) => (
        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
          value === 'Airtel' ? 'bg-red-100 text-red-800' :
          value === 'Vodafone' ? 'bg-red-100 text-red-800' :
          value === 'BSNL' ? 'bg-orange-100 text-orange-800' :
          value === 'Jio' ? 'bg-blue-100 text-blue-800' :
          value === 'Verizon' ? 'bg-red-100 text-red-800' :
          value === 'BT' ? 'bg-blue-100 text-blue-800' :
          'bg-gray-100 text-gray-800'
        }`}>
          {value}
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
      key: 'monthlyCost',
      label: 'Monthly Cost',
      sortable: true,
      render: (value: number) => (
        <div className="flex items-center space-x-2">
          <DollarSign className={`w-4 h-4 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`} />
          <span className={`font-medium ${isDarkMode ? 'text-white' : 'text-black'}`}>
            ₹{value}
          </span>
        </div>
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
            : 'bg-yellow-100 text-yellow-800'
        }`}>
          {value === 'active' ? (
            <CheckCircle className="w-3 h-3 mr-1" />
          ) : value === 'inactive' ? (
            <XCircle className="w-3 h-3 mr-1" />
          ) : (
            <Globe className="w-3 h-3 mr-1" />
          )}
          {value.charAt(0).toUpperCase() + value.slice(1)}
        </span>
      )
    },
    {
      key: 'createdAt',
      label: 'Created',
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
      name: 'number',
      label: 'DID Number',
      type: 'text' as const,
      placeholder: '+91 80 1234 5678',
      required: true,
      validation: (value: string) => {
        if (value.length < 10) return 'Please enter a valid phone number'
        return null
      }
    },
    {
      name: 'country',
      label: 'Country',
      type: 'select' as const,
      required: true,
      options: [
        { value: 'India', label: 'India' },
        { value: 'USA', label: 'USA' },
        { value: 'UK', label: 'UK' },
        { value: 'Canada', label: 'Canada' },
        { value: 'Australia', label: 'Australia' },
        { value: 'Germany', label: 'Germany' }
      ]
    },
    {
      name: 'city',
      label: 'City',
      type: 'text' as const,
      placeholder: 'Enter city name',
      required: true
    },
    {
      name: 'provider',
      label: 'Provider',
      type: 'select' as const,
      required: true,
      options: [
        { value: 'Airtel', label: 'Airtel' },
        { value: 'Vodafone', label: 'Vodafone' },
        { value: 'BSNL', label: 'BSNL' },
        { value: 'Jio', label: 'Jio' },
        { value: 'Verizon', label: 'Verizon' },
        { value: 'BT', label: 'BT' },
        { value: 'T-Mobile', label: 'T-Mobile' }
      ]
    },
    {
      name: 'type',
      label: 'Type',
      type: 'select' as const,
      required: true,
      options: [
        { value: 'local', label: 'Local' },
        { value: 'toll-free', label: 'Toll-Free' },
        { value: 'international', label: 'International' }
      ]
    },
    {
      name: 'monthlyCost',
      label: 'Monthly Cost (₹)',
      type: 'number' as const,
      placeholder: '500',
      required: true,
      validation: (value: string) => {
        const num = parseInt(value)
        if (isNaN(num) || num < 0) return 'Please enter a valid cost'
        return null
      }
    },
    {
      name: 'setupCost',
      label: 'Setup Cost (₹)',
      type: 'number' as const,
      placeholder: '1000',
      required: true,
      validation: (value: string) => {
        const num = parseInt(value)
        if (isNaN(num) || num < 0) return 'Please enter a valid cost'
        return null
      }
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
        { value: 'Marketing Department', label: 'Marketing Department' },
        { value: 'International Sales', label: 'International Sales' },
        { value: 'Unassigned', label: 'Unassigned' }
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
        { value: 'pending', label: 'Pending' }
      ]
    }
  ]

  const handleAdd = () => {
    setSelectedDID(null)
    setIsEditMode(false)
    setIsModalOpen(true)
  }

  const handleEdit = (did: DIDNumber) => {
    setSelectedDID(did)
    setIsEditMode(true)
    setIsModalOpen(true)
  }

  const handleDelete = (did: DIDNumber) => {
    setSelectedDID(did)
    setIsDeleteModalOpen(true)
  }

  const handleView = (did: DIDNumber) => {
    setSelectedDID(did)
    setIsEditMode(false)
    setIsModalOpen(true)
  }

  const handleSubmit = async (data: Record<string, string>) => {
    setLoading(true)
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    if (isEditMode && selectedDID) {
      // Update existing DID
      setDidNumbers(prev => prev.map(did => 
        did.id === selectedDID.id 
          ? { 
              ...did, 
              ...data, 
              monthlyCost: parseInt(data.monthlyCost),
              setupCost: parseInt(data.setupCost),
              createdAt: did.createdAt,
              features: did.features
            }
          : did
      ))
    } else {
      // Add new DID
      const newDID: DIDNumber = {
        id: Date.now().toString(),
        number: data.number || '',
        country: data.country || '',
        city: data.city || '',
        provider: data.provider || '',
        type: data.type || 'local',
        status: data.status || 'pending',
        monthlyCost: parseInt(data.monthlyCost) || 0,
        setupCost: parseInt(data.setupCost) || 0,
        assignedTo: data.assignedTo || '',
        createdAt: new Date().toISOString().split('T')[0],
        features: ['Voice']
      }
      setDidNumbers(prev => [...prev, newDID])
    }
    
    setLoading(false)
    setIsModalOpen(false)
    setSelectedDID(null)
  }

  const handleDeleteConfirm = async () => {
    if (!selectedDID) return
    
    setLoading(true)
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    setDidNumbers(prev => prev.filter(did => did.id !== selectedDID.id))
    
    setLoading(false)
    setIsDeleteModalOpen(false)
    setSelectedDID(null)
  }

  const getInitialData = () => {
    if (selectedDID && isEditMode) {
      return {
        number: selectedDID.number,
        country: selectedDID.country,
        city: selectedDID.city,
        provider: selectedDID.provider,
        type: selectedDID.type,
        monthlyCost: selectedDID.monthlyCost.toString(),
        setupCost: selectedDID.setupCost.toString(),
        assignedTo: selectedDID.assignedTo,
        status: selectedDID.status
      }
    }
    return {}
  }

  const activeNumbers = didNumbers.filter(d => d.status === 'active').length
  const totalMonthlyCost = didNumbers.reduce((sum, d) => sum + d.monthlyCost, 0)
  const totalSetupCost = didNumbers.reduce((sum, d) => sum + d.setupCost, 0)

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
            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-700 rounded-xl flex items-center justify-center">
              <Phone className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-black'}`}>
                DID Numbers Management
              </h1>
              <p className={`${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                Manage Direct Inward Dialing numbers and their configurations
              </p>
            </div>
          </div>
          
          <div className="flex items-center space-x-6">
            <div className="text-right">
              <div className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-black'}`}>
                {didNumbers.length}
              </div>
              <div className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                Total Numbers
              </div>
            </div>
            <div className="text-right">
              <div className={`text-2xl font-bold text-green-500`}>
                {activeNumbers}
              </div>
              <div className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                Active
              </div>
            </div>
            <div className="text-right">
              <div className={`text-2xl font-bold text-blue-500`}>
                ₹{totalMonthlyCost.toLocaleString()}
              </div>
              <div className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                Monthly Cost
              </div>
            </div>
            <div className="text-right">
              <div className={`text-2xl font-bold text-purple-500`}>
                ₹{totalSetupCost.toLocaleString()}
              </div>
              <div className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                Setup Cost
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
          data={didNumbers}
          columns={columns}
          isDarkMode={isDarkMode}
          onAdd={handleAdd}
          onEdit={handleEdit}
          onDelete={handleDelete}
          onView={handleView}
          title="DID Numbers"
          addButtonText="Add DID Number"
        />
      </motion.div>

      {/* Add/Edit Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false)
          setSelectedDID(null)
        }}
        title={isEditMode ? 'Edit DID Number' : selectedDID ? 'View DID Number' : 'Add DID Number'}
        isDarkMode={isDarkMode}
        size="lg"
      >
        {selectedDID && !isEditMode ? (
          // View Mode
          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-white' : 'text-gray-700'}`}>
                  DID Number
                </label>
                <div className={`p-3 rounded-lg ${isDarkMode ? 'bg-gray-700 text-white' : 'bg-gray-100 text-black'}`}>
                  {selectedDID.number}
                </div>
              </div>
              <div>
                <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-white' : 'text-gray-700'}`}>
                  Type
                </label>
                <div className={`p-3 rounded-lg ${isDarkMode ? 'bg-gray-700 text-white' : 'bg-gray-100 text-black'}`}>
                  {selectedDID.type.charAt(0).toUpperCase() + selectedDID.type.slice(1)}
                </div>
              </div>
              <div>
                <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-white' : 'text-gray-700'}`}>
                  Country
                </label>
                <div className={`p-3 rounded-lg ${isDarkMode ? 'bg-gray-700 text-white' : 'bg-gray-100 text-black'}`}>
                  {selectedDID.country}
                </div>
              </div>
              <div>
                <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-white' : 'text-gray-700'}`}>
                  City
                </label>
                <div className={`p-3 rounded-lg ${isDarkMode ? 'bg-gray-700 text-white' : 'bg-gray-100 text-black'}`}>
                  {selectedDID.city}
                </div>
              </div>
              <div>
                <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-white' : 'text-gray-700'}`}>
                  Provider
                </label>
                <div className={`p-3 rounded-lg ${isDarkMode ? 'bg-gray-700 text-white' : 'bg-gray-100 text-black'}`}>
                  {selectedDID.provider}
                </div>
              </div>
              <div>
                <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-white' : 'text-gray-700'}`}>
                  Assigned To
                </label>
                <div className={`p-3 rounded-lg ${isDarkMode ? 'bg-gray-700 text-white' : 'bg-gray-100 text-black'}`}>
                  {selectedDID.assignedTo}
                </div>
              </div>
              <div>
                <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-white' : 'text-gray-700'}`}>
                  Monthly Cost
                </label>
                <div className={`p-3 rounded-lg ${isDarkMode ? 'bg-gray-700 text-white' : 'bg-gray-100 text-black'}`}>
                  ₹{selectedDID.monthlyCost.toLocaleString()}
                </div>
              </div>
              <div>
                <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-white' : 'text-gray-700'}`}>
                  Setup Cost
                </label>
                <div className={`p-3 rounded-lg ${isDarkMode ? 'bg-gray-700 text-white' : 'bg-gray-100 text-black'}`}>
                  ₹{selectedDID.setupCost.toLocaleString()}
                </div>
              </div>
              <div>
                <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-white' : 'text-gray-700'}`}>
                  Status
                </label>
                <div className={`p-3 rounded-lg ${isDarkMode ? 'bg-gray-700 text-white' : 'bg-gray-100 text-black'}`}>
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    selectedDID.status === 'active' 
                      ? 'bg-green-100 text-green-800' 
                      : selectedDID.status === 'inactive'
                      ? 'bg-red-100 text-red-800'
                      : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {selectedDID.status === 'active' ? (
                      <CheckCircle className="w-3 h-3 mr-1" />
                    ) : selectedDID.status === 'inactive' ? (
                      <XCircle className="w-3 h-3 mr-1" />
                    ) : (
                      <Globe className="w-3 h-3 mr-1" />
                    )}
                    {selectedDID.status.charAt(0).toUpperCase() + selectedDID.status.slice(1)}
                  </span>
                </div>
              </div>
              <div>
                <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-white' : 'text-gray-700'}`}>
                  Created Date
                </label>
                <div className={`p-3 rounded-lg ${isDarkMode ? 'bg-gray-700 text-white' : 'bg-gray-100 text-black'}`}>
                  {new Date(selectedDID.createdAt).toLocaleDateString()}
                </div>
              </div>
            </div>
            
            <div>
              <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-white' : 'text-gray-700'}`}>
                Features
              </label>
              <div className="flex flex-wrap gap-2">
                {selectedDID.features.map((feature) => (
                  <span
                    key={feature}
                    className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
                  >
                    {feature}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ) : (
          // Add/Edit Mode
          <Form
            fields={formFields}
            onSubmit={handleSubmit}
            isDarkMode={isDarkMode}
            submitText={isEditMode ? 'Update DID Number' : 'Add DID Number'}
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
          setSelectedDID(null)
        }}
        title="Delete DID Number"
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
                This action cannot be undone. The DID number will be permanently removed.
              </p>
            </div>
          </div>
          
          {selectedDID && (
            <div className={`p-4 rounded-lg ${isDarkMode ? 'bg-gray-700' : 'bg-gray-100'}`}>
              <p className={`text-sm ${isDarkMode ? 'text-white' : 'text-black'}`}>
                You are about to delete <strong>{selectedDID.number}</strong> ({selectedDID.city}, {selectedDID.country})
              </p>
            </div>
          )}
          
          <div className="flex justify-end space-x-3">
            <button
              onClick={() => {
                setIsDeleteModalOpen(false)
                setSelectedDID(null)
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
