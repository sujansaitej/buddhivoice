'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { UserCheck, Shield, Mail, Phone, Calendar, CheckCircle, XCircle } from 'lucide-react'
import DataTable from '../../../../components/ui/DataTable'
import Modal from '../../../../components/ui/Modal'
import Form from '../../../../components/ui/Form'

interface SubAdmin {
  id: string
  name: string
  email: string
  phone: string
  department: string
  role: string
  status: 'active' | 'inactive'
  lastLogin: string
  createdAt: string
  permissions: string[]
}

export default function SubAdminPage() {
  const [isDarkMode, setIsDarkMode] = useState(true)
  const [subAdmins, setSubAdmins] = useState<SubAdmin[]>([])
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
  const [selectedSubAdmin, setSelectedSubAdmin] = useState<SubAdmin | null>(null)
  const [isEditMode, setIsEditMode] = useState(false)
  const [loading, setLoading] = useState(false)

  // Mock data
  useEffect(() => {
    const mockData: SubAdmin[] = [
      {
        id: '1',
        name: 'John Smith',
        email: 'john.smith@buddhivoice.com',
        phone: '+91 93618 60210',
        department: 'Sales',
        role: 'Sales Manager',
        status: 'active',
        lastLogin: '2024-01-15 10:30:00',
        createdAt: '2024-01-01',
        permissions: ['user_management', 'reports_view']
      },
      {
        id: '2',
        name: 'Sarah Johnson',
        email: 'sarah.johnson@buddhivoice.com',
        phone: '+91 93618 60211',
        department: 'Support',
        role: 'Support Lead',
        status: 'active',
        lastLogin: '2024-01-15 09:15:00',
        createdAt: '2024-01-02',
        permissions: ['ticket_management', 'customer_view']
      },
      {
        id: '3',
        name: 'Mike Chen',
        email: 'mike.chen@buddhivoice.com',
        phone: '+91 93618 60212',
        department: 'Technical',
        role: 'Technical Admin',
        status: 'inactive',
        lastLogin: '2024-01-10 14:20:00',
        createdAt: '2024-01-03',
        permissions: ['system_config', 'api_management']
      },
      {
        id: '4',
        name: 'Emily Davis',
        email: 'emily.davis@buddhivoice.com',
        phone: '+91 93618 60213',
        department: 'Marketing',
        role: 'Marketing Manager',
        status: 'active',
        lastLogin: '2024-01-15 11:45:00',
        createdAt: '2024-01-04',
        permissions: ['campaign_management', 'analytics_view']
      },
      {
        id: '5',
        name: 'David Wilson',
        email: 'david.wilson@buddhivoice.com',
        phone: '+91 93618 60214',
        department: 'Finance',
        role: 'Finance Admin',
        status: 'active',
        lastLogin: '2024-01-15 08:30:00',
        createdAt: '2024-01-05',
        permissions: ['billing_management', 'reports_view']
      }
    ]
    setSubAdmins(mockData)
  }, [])

  const columns = [
    {
      key: 'name',
      label: 'Name',
      sortable: true,
      render: (value: string, row: SubAdmin) => (
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-gradient-to-br from-red-500 to-red-700 rounded-full flex items-center justify-center">
            <span className="text-white text-sm font-medium">
              {value.split(' ').map(n => n[0]).join('')}
            </span>
          </div>
          <div>
            <div className={`font-medium ${isDarkMode ? 'text-white' : 'text-black'}`}>
              {value}
            </div>
            <div className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              {row.role}
            </div>
          </div>
        </div>
      )
    },
    {
      key: 'email',
      label: 'Email',
      sortable: true,
      render: (value: string) => (
        <div className="flex items-center space-x-2">
          <Mail className={`w-4 h-4 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`} />
          <span className={isDarkMode ? 'text-white' : 'text-black'}>{value}</span>
        </div>
      )
    },
    {
      key: 'phone',
      label: 'Phone',
      render: (value: string) => (
        <div className="flex items-center space-x-2">
          <Phone className={`w-4 h-4 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`} />
          <span className={isDarkMode ? 'text-white' : 'text-black'}>{value}</span>
        </div>
      )
    },
    {
      key: 'department',
      label: 'Department',
      sortable: true,
      render: (value: string) => (
        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
          value === 'Sales' ? 'bg-blue-100 text-blue-800' :
          value === 'Support' ? 'bg-green-100 text-green-800' :
          value === 'Technical' ? 'bg-purple-100 text-purple-800' :
          value === 'Marketing' ? 'bg-pink-100 text-pink-800' :
          'bg-gray-100 text-gray-800'
        }`}>
          {value}
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
            : 'bg-red-100 text-red-800'
        }`}>
          {value === 'active' ? (
            <CheckCircle className="w-3 h-3 mr-1" />
          ) : (
            <XCircle className="w-3 h-3 mr-1" />
          )}
          {value.charAt(0).toUpperCase() + value.slice(1)}
        </span>
      )
    },
    {
      key: 'lastLogin',
      label: 'Last Login',
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

  const formFields = [
    {
      name: 'name',
      label: 'Full Name',
      type: 'text' as const,
      placeholder: 'Enter full name',
      required: true,
      validation: (value: string) => {
        if (value.length < 2) return 'Name must be at least 2 characters'
        return null
      }
    },
    {
      name: 'email',
      label: 'Email Address',
      type: 'email' as const,
      placeholder: 'Enter email address',
      required: true,
      validation: (value: string) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        if (!emailRegex.test(value)) return 'Please enter a valid email address'
        return null
      }
    },
    {
      name: 'phone',
      label: 'Phone Number',
      type: 'tel' as const,
      placeholder: '+91 93618 60210',
      required: true,
      validation: (value: string) => {
        const phoneRegex = /^\+91\s\d{5}\s\d{5}$/
        if (!phoneRegex.test(value)) return 'Please enter a valid phone number (+91 XXXXX XXXXX)'
        return null
      }
    },
    {
      name: 'department',
      label: 'Department',
      type: 'select' as const,
      required: true,
      options: [
        { value: 'Sales', label: 'Sales' },
        { value: 'Support', label: 'Support' },
        { value: 'Technical', label: 'Technical' },
        { value: 'Marketing', label: 'Marketing' },
        { value: 'Finance', label: 'Finance' },
        { value: 'HR', label: 'HR' }
      ]
    },
    {
      name: 'role',
      label: 'Role',
      type: 'text' as const,
      placeholder: 'Enter role title',
      required: true
    },
    {
      name: 'status',
      label: 'Status',
      type: 'select' as const,
      required: true,
      options: [
        { value: 'active', label: 'Active' },
        { value: 'inactive', label: 'Inactive' }
      ]
    }
  ]

  const handleAdd = () => {
    setSelectedSubAdmin(null)
    setIsEditMode(false)
    setIsModalOpen(true)
  }

  const handleEdit = (subAdmin: SubAdmin) => {
    setSelectedSubAdmin(subAdmin)
    setIsEditMode(true)
    setIsModalOpen(true)
  }

  const handleDelete = (subAdmin: SubAdmin) => {
    setSelectedSubAdmin(subAdmin)
    setIsDeleteModalOpen(true)
  }

  const handleView = (subAdmin: SubAdmin) => {
    setSelectedSubAdmin(subAdmin)
    setIsEditMode(false)
    setIsModalOpen(true)
  }

  const handleSubmit = async (data: Record<string, string>) => {
    setLoading(true)
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    if (isEditMode && selectedSubAdmin) {
      // Update existing sub admin
      setSubAdmins(prev => prev.map(subAdmin => 
        subAdmin.id === selectedSubAdmin.id 
          ? { ...subAdmin, ...data, lastLogin: subAdmin.lastLogin }
          : subAdmin
      ))
    } else {
      // Add new sub admin
      const newSubAdmin: SubAdmin = {
        id: Date.now().toString(),
        ...data,
        lastLogin: new Date().toISOString(),
        createdAt: new Date().toISOString().split('T')[0],
        permissions: ['basic_access']
      }
      setSubAdmins(prev => [...prev, newSubAdmin])
    }
    
    setLoading(false)
    setIsModalOpen(false)
    setSelectedSubAdmin(null)
  }

  const handleDeleteConfirm = async () => {
    if (!selectedSubAdmin) return
    
    setLoading(true)
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    setSubAdmins(prev => prev.filter(subAdmin => subAdmin.id !== selectedSubAdmin.id))
    
    setLoading(false)
    setIsDeleteModalOpen(false)
    setSelectedSubAdmin(null)
  }

  const getInitialData = () => {
    if (selectedSubAdmin && isEditMode) {
      return {
        name: selectedSubAdmin.name,
        email: selectedSubAdmin.email,
        phone: selectedSubAdmin.phone,
        department: selectedSubAdmin.department,
        role: selectedSubAdmin.role,
        status: selectedSubAdmin.status
      }
    }
    return {}
  }

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
            <div className="w-12 h-12 bg-gradient-to-br from-red-500 to-red-700 rounded-xl flex items-center justify-center">
              <UserCheck className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-black'}`}>
                Sub Admin Management
              </h1>
              <p className={`${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                Manage sub administrators and their permissions
              </p>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="text-right">
              <div className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-black'}`}>
                {subAdmins.length}
              </div>
              <div className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                Total Sub Admins
              </div>
            </div>
            <div className="text-right">
              <div className={`text-2xl font-bold text-green-500`}>
                {subAdmins.filter(s => s.status === 'active').length}
              </div>
              <div className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                Active
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
          data={subAdmins}
          columns={columns}
          isDarkMode={isDarkMode}
          onAdd={handleAdd}
          onEdit={handleEdit}
          onDelete={handleDelete}
          onView={handleView}
          title="Sub Administrators"
          addButtonText="Add Sub Admin"
        />
      </motion.div>

      {/* Add/Edit Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false)
          setSelectedSubAdmin(null)
        }}
        title={isEditMode ? 'Edit Sub Admin' : selectedSubAdmin ? 'View Sub Admin' : 'Add Sub Admin'}
        isDarkMode={isDarkMode}
        size="md"
      >
        {selectedSubAdmin && !isEditMode ? (
          // View Mode
          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-white' : 'text-gray-700'}`}>
                  Name
                </label>
                <div className={`p-3 rounded-lg ${isDarkMode ? 'bg-gray-700 text-white' : 'bg-gray-100 text-black'}`}>
                  {selectedSubAdmin.name}
                </div>
              </div>
              <div>
                <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-white' : 'text-gray-700'}`}>
                  Email
                </label>
                <div className={`p-3 rounded-lg ${isDarkMode ? 'bg-gray-700 text-white' : 'bg-gray-100 text-black'}`}>
                  {selectedSubAdmin.email}
                </div>
              </div>
              <div>
                <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-white' : 'text-gray-700'}`}>
                  Phone
                </label>
                <div className={`p-3 rounded-lg ${isDarkMode ? 'bg-gray-700 text-white' : 'bg-gray-100 text-black'}`}>
                  {selectedSubAdmin.phone}
                </div>
              </div>
              <div>
                <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-white' : 'text-gray-700'}`}>
                  Department
                </label>
                <div className={`p-3 rounded-lg ${isDarkMode ? 'bg-gray-700 text-white' : 'bg-gray-100 text-black'}`}>
                  {selectedSubAdmin.department}
                </div>
              </div>
              <div>
                <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-white' : 'text-gray-700'}`}>
                  Role
                </label>
                <div className={`p-3 rounded-lg ${isDarkMode ? 'bg-gray-700 text-white' : 'bg-gray-100 text-black'}`}>
                  {selectedSubAdmin.role}
                </div>
              </div>
              <div>
                <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-white' : 'text-gray-700'}`}>
                  Status
                </label>
                <div className={`p-3 rounded-lg ${isDarkMode ? 'bg-gray-700 text-white' : 'bg-gray-100 text-black'}`}>
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    selectedSubAdmin.status === 'active' 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-red-100 text-red-800'
                  }`}>
                    {selectedSubAdmin.status === 'active' ? (
                      <CheckCircle className="w-3 h-3 mr-1" />
                    ) : (
                      <XCircle className="w-3 h-3 mr-1" />
                    )}
                    {selectedSubAdmin.status.charAt(0).toUpperCase() + selectedSubAdmin.status.slice(1)}
                  </span>
                </div>
              </div>
            </div>
            
            <div>
              <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-white' : 'text-gray-700'}`}>
                Permissions
              </label>
              <div className="flex flex-wrap gap-2">
                {selectedSubAdmin.permissions.map((permission) => (
                  <span
                    key={permission}
                    className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
                  >
                    <Shield className="w-3 h-3 mr-1" />
                    {permission.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())}
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
            submitText={isEditMode ? 'Update Sub Admin' : 'Add Sub Admin'}
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
          setSelectedSubAdmin(null)
        }}
        title="Delete Sub Admin"
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
                This action cannot be undone.
              </p>
            </div>
          </div>
          
          {selectedSubAdmin && (
            <div className={`p-4 rounded-lg ${isDarkMode ? 'bg-gray-700' : 'bg-gray-100'}`}>
              <p className={`text-sm ${isDarkMode ? 'text-white' : 'text-black'}`}>
                You are about to delete <strong>{selectedSubAdmin.name}</strong> ({selectedSubAdmin.email})
              </p>
            </div>
          )}
          
          <div className="flex justify-end space-x-3">
            <button
              onClick={() => {
                setIsDeleteModalOpen(false)
                setSelectedSubAdmin(null)
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
