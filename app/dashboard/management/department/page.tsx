'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Building2, Users, Mail, Phone, Calendar, CheckCircle, XCircle, MapPin } from 'lucide-react'
import DataTable from '../../../../components/ui/DataTable'
import Modal from '../../../../components/ui/Modal'
import Form from '../../../../components/ui/Form'

interface Department {
  id: string
  name: string
  description: string
  manager: string
  managerEmail: string
  managerPhone: string
  location: string
  employeeCount: number
  status: 'active' | 'inactive'
  createdAt: string
  budget: number
  costCenter: string
}

export default function DepartmentPage() {
  const [isDarkMode, setIsDarkMode] = useState(true)
  const [departments, setDepartments] = useState<Department[]>([])
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
  const [selectedDepartment, setSelectedDepartment] = useState<Department | null>(null)
  const [isEditMode, setIsEditMode] = useState(false)
  const [loading, setLoading] = useState(false)

  // Mock data
  useEffect(() => {
    const mockData: Department[] = [
      {
        id: '1',
        name: 'Sales Department',
        description: 'Responsible for customer acquisition and revenue generation',
        manager: 'John Smith',
        managerEmail: 'john.smith@buddhivoice.com',
        managerPhone: '+91 93618 60210',
        location: 'Bangalore, India',
        employeeCount: 25,
        status: 'active',
        createdAt: '2024-01-01',
        budget: 500000,
        costCenter: 'CC-SALES-001'
      },
      {
        id: '2',
        name: 'Customer Support',
        description: 'Handles customer inquiries, technical support, and issue resolution',
        manager: 'Sarah Johnson',
        managerEmail: 'sarah.johnson@buddhivoice.com',
        managerPhone: '+91 93618 60211',
        location: 'Mumbai, India',
        employeeCount: 18,
        status: 'active',
        createdAt: '2024-01-02',
        budget: 300000,
        costCenter: 'CC-SUPPORT-002'
      },
      {
        id: '3',
        name: 'Technical Operations',
        description: 'Manages system infrastructure, development, and technical maintenance',
        manager: 'Mike Chen',
        managerEmail: 'mike.chen@buddhivoice.com',
        managerPhone: '+91 93618 60212',
        location: 'Hyderabad, India',
        employeeCount: 32,
        status: 'active',
        createdAt: '2024-01-03',
        budget: 800000,
        costCenter: 'CC-TECH-003'
      },
      {
        id: '4',
        name: 'Marketing & Communications',
        description: 'Brand management, digital marketing, and customer engagement',
        manager: 'Emily Davis',
        managerEmail: 'emily.davis@buddhivoice.com',
        managerPhone: '+91 93618 60213',
        location: 'Delhi, India',
        employeeCount: 12,
        status: 'active',
        createdAt: '2024-01-04',
        budget: 400000,
        costCenter: 'CC-MARKETING-004'
      },
      {
        id: '5',
        name: 'Finance & Accounting',
        description: 'Financial planning, budgeting, and accounting operations',
        manager: 'David Wilson',
        managerEmail: 'david.wilson@buddhivoice.com',
        managerPhone: '+91 93618 60214',
        location: 'Chennai, India',
        employeeCount: 8,
        status: 'active',
        createdAt: '2024-01-05',
        budget: 200000,
        costCenter: 'CC-FINANCE-005'
      },
      {
        id: '6',
        name: 'Human Resources',
        description: 'Employee relations, recruitment, and organizational development',
        manager: 'Lisa Anderson',
        managerEmail: 'lisa.anderson@buddhivoice.com',
        managerPhone: '+91 93618 60215',
        location: 'Pune, India',
        employeeCount: 6,
        status: 'inactive',
        createdAt: '2024-01-06',
        budget: 150000,
        costCenter: 'CC-HR-006'
      }
    ]
    setDepartments(mockData)
  }, [])

  const columns = [
    {
      key: 'name',
      label: 'Department',
      sortable: true,
      render: (value: string, row: Department) => (
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-700 rounded-lg flex items-center justify-center">
            <Building2 className="w-5 h-5 text-white" />
          </div>
          <div>
            <div className={`font-medium ${isDarkMode ? 'text-white' : 'text-black'}`}>
              {value}
            </div>
            <div className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              {row.costCenter}
            </div>
          </div>
        </div>
      )
    },
    {
      key: 'manager',
      label: 'Manager',
      sortable: true,
      render: (value: string, row: Department) => (
        <div>
          <div className={`font-medium ${isDarkMode ? 'text-white' : 'text-black'}`}>
            {value}
          </div>
          <div className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            {row.managerEmail}
          </div>
        </div>
      )
    },
    {
      key: 'location',
      label: 'Location',
      sortable: true,
      render: (value: string) => (
        <div className="flex items-center space-x-2">
          <MapPin className={`w-4 h-4 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`} />
          <span className={isDarkMode ? 'text-white' : 'text-black'}>{value}</span>
        </div>
      )
    },
    {
      key: 'employeeCount',
      label: 'Employees',
      sortable: true,
      render: (value: number) => (
        <div className="flex items-center space-x-2">
          <Users className={`w-4 h-4 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`} />
          <span className={`font-medium ${isDarkMode ? 'text-white' : 'text-black'}`}>
            {value}
          </span>
        </div>
      )
    },
    {
      key: 'budget',
      label: 'Budget',
      sortable: true,
      render: (value: number) => (
        <span className={`font-medium ${isDarkMode ? 'text-white' : 'text-black'}`}>
          ₹{value.toLocaleString()}
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
      name: 'name',
      label: 'Department Name',
      type: 'text' as const,
      placeholder: 'Enter department name',
      required: true,
      validation: (value: string) => {
        if (value.length < 2) return 'Department name must be at least 2 characters'
        return null
      }
    },
    {
      name: 'description',
      label: 'Description',
      type: 'textarea' as const,
      placeholder: 'Enter department description',
      required: true,
      validation: (value: string) => {
        if (value.length < 10) return 'Description must be at least 10 characters'
        return null
      }
    },
    {
      name: 'manager',
      label: 'Manager Name',
      type: 'text' as const,
      placeholder: 'Enter manager name',
      required: true
    },
    {
      name: 'managerEmail',
      label: 'Manager Email',
      type: 'email' as const,
      placeholder: 'Enter manager email',
      required: true,
      validation: (value: string) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        if (!emailRegex.test(value)) return 'Please enter a valid email address'
        return null
      }
    },
    {
      name: 'managerPhone',
      label: 'Manager Phone',
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
      name: 'location',
      label: 'Location',
      type: 'text' as const,
      placeholder: 'Enter location',
      required: true
    },
    {
      name: 'employeeCount',
      label: 'Employee Count',
      type: 'number' as const,
      placeholder: '0',
      required: true,
      validation: (value: string) => {
        const num = parseInt(value)
        if (isNaN(num) || num < 0) return 'Please enter a valid number'
        return null
      }
    },
    {
      name: 'budget',
      label: 'Budget (₹)',
      type: 'number' as const,
      placeholder: '0',
      required: true,
      validation: (value: string) => {
        const num = parseInt(value)
        if (isNaN(num) || num < 0) return 'Please enter a valid budget amount'
        return null
      }
    },
    {
      name: 'costCenter',
      label: 'Cost Center',
      type: 'text' as const,
      placeholder: 'CC-DEPT-001',
      required: true,
      validation: (value: string) => {
        if (value.length < 3) return 'Cost center must be at least 3 characters'
        return null
      }
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
    setSelectedDepartment(null)
    setIsEditMode(false)
    setIsModalOpen(true)
  }

  const handleEdit = (department: Department) => {
    setSelectedDepartment(department)
    setIsEditMode(true)
    setIsModalOpen(true)
  }

  const handleDelete = (department: Department) => {
    setSelectedDepartment(department)
    setIsDeleteModalOpen(true)
  }

  const handleView = (department: Department) => {
    setSelectedDepartment(department)
    setIsEditMode(false)
    setIsModalOpen(true)
  }

  const handleSubmit = async (data: Record<string, string>) => {
    setLoading(true)
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    if (isEditMode && selectedDepartment) {
      // Update existing department
      setDepartments(prev => prev.map(department => 
        department.id === selectedDepartment.id 
          ? { 
              ...department, 
              ...data, 
              employeeCount: parseInt(data.employeeCount),
              budget: parseInt(data.budget)
            }
          : department
      ))
    } else {
      // Add new department
      const newDepartment: Department = {
        id: Date.now().toString(),
        ...data,
        employeeCount: parseInt(data.employeeCount),
        budget: parseInt(data.budget),
        createdAt: new Date().toISOString().split('T')[0]
      }
      setDepartments(prev => [...prev, newDepartment])
    }
    
    setLoading(false)
    setIsModalOpen(false)
    setSelectedDepartment(null)
  }

  const handleDeleteConfirm = async () => {
    if (!selectedDepartment) return
    
    setLoading(true)
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    setDepartments(prev => prev.filter(department => department.id !== selectedDepartment.id))
    
    setLoading(false)
    setIsDeleteModalOpen(false)
    setSelectedDepartment(null)
  }

  const getInitialData = () => {
    if (selectedDepartment && isEditMode) {
      return {
        name: selectedDepartment.name,
        description: selectedDepartment.description,
        manager: selectedDepartment.manager,
        managerEmail: selectedDepartment.managerEmail,
        managerPhone: selectedDepartment.managerPhone,
        location: selectedDepartment.location,
        employeeCount: selectedDepartment.employeeCount.toString(),
        budget: selectedDepartment.budget.toString(),
        costCenter: selectedDepartment.costCenter,
        status: selectedDepartment.status
      }
    }
    return {}
  }

  const totalEmployees = departments.reduce((sum, dept) => sum + dept.employeeCount, 0)
  const totalBudget = departments.reduce((sum, dept) => sum + dept.budget, 0)
  const activeDepartments = departments.filter(d => d.status === 'active').length

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
              <Building2 className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-black'}`}>
                Department Management
              </h1>
              <p className={`${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                Manage organizational departments and their resources
              </p>
            </div>
          </div>
          
          <div className="flex items-center space-x-6">
            <div className="text-right">
              <div className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-black'}`}>
                {departments.length}
              </div>
              <div className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                Total Departments
              </div>
            </div>
            <div className="text-right">
              <div className={`text-2xl font-bold text-green-500`}>
                {activeDepartments}
              </div>
              <div className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                Active
              </div>
            </div>
            <div className="text-right">
              <div className={`text-2xl font-bold text-blue-500`}>
                {totalEmployees}
              </div>
              <div className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                Total Employees
              </div>
            </div>
            <div className="text-right">
              <div className={`text-2xl font-bold text-purple-500`}>
                ₹{(totalBudget / 100000).toFixed(1)}L
              </div>
              <div className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                Total Budget
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
          data={departments}
          columns={columns}
          isDarkMode={isDarkMode}
          onAdd={handleAdd}
          onEdit={handleEdit}
          onDelete={handleDelete}
          onView={handleView}
          title="Departments"
          addButtonText="Add Department"
        />
      </motion.div>

      {/* Add/Edit Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false)
          setSelectedDepartment(null)
        }}
        title={isEditMode ? 'Edit Department' : selectedDepartment ? 'View Department' : 'Add Department'}
        isDarkMode={isDarkMode}
        size="lg"
      >
        {selectedDepartment && !isEditMode ? (
          // View Mode
          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-white' : 'text-gray-700'}`}>
                  Department Name
                </label>
                <div className={`p-3 rounded-lg ${isDarkMode ? 'bg-gray-700 text-white' : 'bg-gray-100 text-black'}`}>
                  {selectedDepartment.name}
                </div>
              </div>
              <div>
                <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-white' : 'text-gray-700'}`}>
                  Cost Center
                </label>
                <div className={`p-3 rounded-lg ${isDarkMode ? 'bg-gray-700 text-white' : 'bg-gray-100 text-black'}`}>
                  {selectedDepartment.costCenter}
                </div>
              </div>
              <div>
                <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-white' : 'text-gray-700'}`}>
                  Manager
                </label>
                <div className={`p-3 rounded-lg ${isDarkMode ? 'bg-gray-700 text-white' : 'bg-gray-100 text-black'}`}>
                  {selectedDepartment.manager}
                </div>
              </div>
              <div>
                <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-white' : 'text-gray-700'}`}>
                  Manager Email
                </label>
                <div className={`p-3 rounded-lg ${isDarkMode ? 'bg-gray-700 text-white' : 'bg-gray-100 text-black'}`}>
                  {selectedDepartment.managerEmail}
                </div>
              </div>
              <div>
                <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-white' : 'text-gray-700'}`}>
                  Manager Phone
                </label>
                <div className={`p-3 rounded-lg ${isDarkMode ? 'bg-gray-700 text-white' : 'bg-gray-100 text-black'}`}>
                  {selectedDepartment.managerPhone}
                </div>
              </div>
              <div>
                <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-white' : 'text-gray-700'}`}>
                  Location
                </label>
                <div className={`p-3 rounded-lg ${isDarkMode ? 'bg-gray-700 text-white' : 'bg-gray-100 text-black'}`}>
                  {selectedDepartment.location}
                </div>
              </div>
              <div>
                <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-white' : 'text-gray-700'}`}>
                  Employee Count
                </label>
                <div className={`p-3 rounded-lg ${isDarkMode ? 'bg-gray-700 text-white' : 'bg-gray-100 text-black'}`}>
                  {selectedDepartment.employeeCount}
                </div>
              </div>
              <div>
                <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-white' : 'text-gray-700'}`}>
                  Budget
                </label>
                <div className={`p-3 rounded-lg ${isDarkMode ? 'bg-gray-700 text-white' : 'bg-gray-100 text-black'}`}>
                  ₹{selectedDepartment.budget.toLocaleString()}
                </div>
              </div>
              <div>
                <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-white' : 'text-gray-700'}`}>
                  Status
                </label>
                <div className={`p-3 rounded-lg ${isDarkMode ? 'bg-gray-700 text-white' : 'bg-gray-100 text-black'}`}>
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    selectedDepartment.status === 'active' 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-red-100 text-red-800'
                  }`}>
                    {selectedDepartment.status === 'active' ? (
                      <CheckCircle className="w-3 h-3 mr-1" />
                    ) : (
                      <XCircle className="w-3 h-3 mr-1" />
                    )}
                    {selectedDepartment.status.charAt(0).toUpperCase() + selectedDepartment.status.slice(1)}
                  </span>
                </div>
              </div>
              <div>
                <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-white' : 'text-gray-700'}`}>
                  Created Date
                </label>
                <div className={`p-3 rounded-lg ${isDarkMode ? 'bg-gray-700 text-white' : 'bg-gray-100 text-black'}`}>
                  {new Date(selectedDepartment.createdAt).toLocaleDateString()}
                </div>
              </div>
            </div>
            
            <div>
              <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-white' : 'text-gray-700'}`}>
                Description
              </label>
              <div className={`p-3 rounded-lg ${isDarkMode ? 'bg-gray-700 text-white' : 'bg-gray-100 text-black'}`}>
                {selectedDepartment.description}
              </div>
            </div>
          </div>
        ) : (
          // Add/Edit Mode
          <Form
            fields={formFields}
            onSubmit={handleSubmit}
            isDarkMode={isDarkMode}
            submitText={isEditMode ? 'Update Department' : 'Add Department'}
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
          setSelectedDepartment(null)
        }}
        title="Delete Department"
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
                This action cannot be undone. All employees in this department will be affected.
              </p>
            </div>
          </div>
          
          {selectedDepartment && (
            <div className={`p-4 rounded-lg ${isDarkMode ? 'bg-gray-700' : 'bg-gray-100'}`}>
              <p className={`text-sm ${isDarkMode ? 'text-white' : 'text-black'}`}>
                You are about to delete <strong>{selectedDepartment.name}</strong> with {selectedDepartment.employeeCount} employees.
              </p>
            </div>
          )}
          
          <div className="flex justify-end space-x-3">
            <button
              onClick={() => {
                setIsDeleteModalOpen(false)
                setSelectedDepartment(null)
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