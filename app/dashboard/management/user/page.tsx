'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { User, Mail, Phone, Calendar, CheckCircle, XCircle, Shield, Building2, Clock } from 'lucide-react'
import DataTable from '../../../../components/ui/DataTable'
import Modal from '../../../../components/ui/Modal'
import Form from '../../../../components/ui/Form'

interface User {
  id: string
  name: string
  email: string
  phone: string
  department: string
  role: string
  position: string
  status: 'active' | 'inactive' | 'pending'
  lastLogin: string
  createdAt: string
  permissions: string[]
  employeeId: string
  manager: string
  location: string
  joinDate: string
}

export default function UserPage() {
  const [isDarkMode, setIsDarkMode] = useState(true)
  const [users, setUsers] = useState<User[]>([])
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
  const [selectedUser, setSelectedUser] = useState<User | null>(null)
  const [isEditMode, setIsEditMode] = useState(false)
  const [loading, setLoading] = useState(false)

  // Mock data
  useEffect(() => {
    const mockData: User[] = [
      {
        id: '1',
        name: 'John Smith',
        email: 'john.smith@buddhivoice.com',
        phone: '+91 93618 60665',
        department: 'Sales',
        role: 'Sales Manager',
        position: 'Manager',
        status: 'active',
        lastLogin: '2024-01-15 10:30:00',
        createdAt: '2024-01-01',
        permissions: ['user_management', 'reports_view', 'sales_access'],
        employeeId: 'EMP001',
        manager: 'Sarah Johnson',
        location: 'Bangalore, India',
        joinDate: '2023-06-15'
      },
      {
        id: '2',
        name: 'Sarah Johnson',
        email: 'sarah.johnson@buddhivoice.com',
        phone: '+91 93618 60666',
        department: 'Support',
        role: 'Support Lead',
        position: 'Lead',
        status: 'active',
        lastLogin: '2024-01-15 09:15:00',
        createdAt: '2024-01-02',
        permissions: ['ticket_management', 'customer_view', 'support_access'],
        employeeId: 'EMP002',
        manager: 'Mike Chen',
        location: 'Mumbai, India',
        joinDate: '2023-08-20'
      },
      {
        id: '3',
        name: 'Mike Chen',
        email: 'mike.chen@buddhivoice.com',
        phone: '+91 93618 60212',
        department: 'Technical',
        role: 'Technical Admin',
        position: 'Admin',
        status: 'active',
        lastLogin: '2024-01-15 08:45:00',
        createdAt: '2024-01-03',
        permissions: ['system_config', 'api_management', 'admin_access'],
        employeeId: 'EMP003',
        manager: 'David Wilson',
        location: 'Hyderabad, India',
        joinDate: '2023-04-10'
      },
      {
        id: '4',
        name: 'Emily Davis',
        email: 'emily.davis@buddhivoice.com',
        phone: '+91 93618 60213',
        department: 'Marketing',
        role: 'Marketing Manager',
        position: 'Manager',
        status: 'active',
        lastLogin: '2024-01-15 11:45:00',
        createdAt: '2024-01-04',
        permissions: ['campaign_management', 'analytics_view', 'marketing_access'],
        employeeId: 'EMP004',
        manager: 'Lisa Anderson',
        location: 'Delhi, India',
        joinDate: '2023-09-05'
      },
      {
        id: '5',
        name: 'David Wilson',
        email: 'david.wilson@buddhivoice.com',
        phone: '+91 93618 60214',
        department: 'Finance',
        role: 'Finance Admin',
        position: 'Admin',
        status: 'active',
        lastLogin: '2024-01-15 08:30:00',
        createdAt: '2024-01-05',
        permissions: ['billing_management', 'reports_view', 'finance_access'],
        employeeId: 'EMP005',
        manager: 'CEO',
        location: 'Chennai, India',
        joinDate: '2023-03-12'
      },
      {
        id: '6',
        name: 'Lisa Anderson',
        email: 'lisa.anderson@buddhivoice.com',
        phone: '+91 93618 60215',
        department: 'HR',
        role: 'HR Manager',
        position: 'Manager',
        status: 'inactive',
        lastLogin: '2024-01-10 14:20:00',
        createdAt: '2024-01-06',
        permissions: ['hr_management', 'employee_view', 'hr_access'],
        employeeId: 'EMP006',
        manager: 'CEO',
        location: 'Pune, India',
        joinDate: '2023-07-18'
      },
      {
        id: '7',
        name: 'Alex Kumar',
        email: 'alex.kumar@buddhivoice.com',
        phone: '+91 93618 60216',
        department: 'Sales',
        role: 'Sales Executive',
        position: 'Executive',
        status: 'pending',
        lastLogin: 'Never',
        createdAt: '2024-01-15',
        permissions: ['basic_access'],
        employeeId: 'EMP007',
        manager: 'John Smith',
        location: 'Bangalore, India',
        joinDate: '2024-01-15'
      }
    ]
    setUsers(mockData)
  }, [])

  const columns = [
    {
      key: 'name',
      label: 'User',
      sortable: true,
      render: (value: string, row: User) => (
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-gradient-to-br from-green-500 to-green-700 rounded-full flex items-center justify-center">
            <span className="text-white text-sm font-medium">
              {value.split(' ').map(n => n[0]).join('')}
            </span>
          </div>
          <div>
            <div className={`font-medium ${isDarkMode ? 'text-white' : 'text-black'}`}>
              {value}
            </div>
            <div className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              {row.employeeId}
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
        <div className="flex items-center space-x-2">
          <Building2 className={`w-4 h-4 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`} />
          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
            value === 'Sales' ? 'bg-blue-100 text-blue-800' :
            value === 'Support' ? 'bg-green-100 text-green-800' :
            value === 'Technical' ? 'bg-purple-100 text-purple-800' :
            value === 'Marketing' ? 'bg-pink-100 text-pink-800' :
            value === 'Finance' ? 'bg-yellow-100 text-yellow-800' :
            value === 'HR' ? 'bg-indigo-100 text-indigo-800' :
            'bg-gray-100 text-gray-800'
          }`}>
            {value}
          </span>
        </div>
      )
    },
    {
      key: 'role',
      label: 'Role',
      sortable: true,
      render: (value: string, row: User) => (
        <div>
          <div className={`font-medium ${isDarkMode ? 'text-white' : 'text-black'}`}>
            {value}
          </div>
          <div className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            {row.position}
          </div>
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
            <Clock className="w-3 h-3 mr-1" />
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
            {value === 'Never' ? 'Never' : new Date(value).toLocaleDateString()}
          </span>
        </div>
      )
    }
  ]

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
      name: 'employeeId',
      label: 'Employee ID',
      type: 'text' as const,
      placeholder: 'EMP001',
      required: true,
      validation: (value: string) => {
        if (value.length < 3) return 'Employee ID must be at least 3 characters'
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
      name: 'position',
      label: 'Position',
      type: 'select' as const,
      required: true,
      options: [
        { value: 'Executive', label: 'Executive' },
        { value: 'Senior Executive', label: 'Senior Executive' },
        { value: 'Lead', label: 'Lead' },
        { value: 'Manager', label: 'Manager' },
        { value: 'Senior Manager', label: 'Senior Manager' },
        { value: 'Admin', label: 'Admin' },
        { value: 'Director', label: 'Director' }
      ]
    },
    {
      name: 'manager',
      label: 'Manager',
      type: 'text' as const,
      placeholder: 'Enter manager name',
      required: true
    },
    {
      name: 'location',
      label: 'Location',
      type: 'text' as const,
      placeholder: 'Enter location',
      required: true
    },
    {
      name: 'joinDate',
      label: 'Join Date',
      type: 'text' as const,
      placeholder: 'YYYY-MM-DD',
      required: true,
      validation: (value: string) => {
        const dateRegex = /^\d{4}-\d{2}-\d{2}$/
        if (!dateRegex.test(value)) return 'Please enter date in YYYY-MM-DD format'
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
        { value: 'inactive', label: 'Inactive' },
        { value: 'pending', label: 'Pending' }
      ]
    }
  ]

  const handleAdd = () => {
    setSelectedUser(null)
    setIsEditMode(false)
    setIsModalOpen(true)
  }

  const handleEdit = (user: User) => {
    setSelectedUser(user)
    setIsEditMode(true)
    setIsModalOpen(true)
  }

  const handleDelete = (user: User) => {
    setSelectedUser(user)
    setIsDeleteModalOpen(true)
  }

  const handleView = (user: User) => {
    setSelectedUser(user)
    setIsEditMode(false)
    setIsModalOpen(true)
  }

  const handleSubmit = async (data: Record<string, string>) => {
    setLoading(true)
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    if (isEditMode && selectedUser) {
      // Update existing user
      setUsers(prev => prev.map(user => 
        user.id === selectedUser.id 
          ? { 
              ...user, 
              ...data, 
              lastLogin: user.lastLogin,
              createdAt: user.createdAt,
              permissions: user.permissions
            }
          : user
      ))
    } else {
      // Add new user
      const newUser: User = {
        id: Date.now().toString(),
        ...data,
        lastLogin: 'Never',
        createdAt: new Date().toISOString().split('T')[0],
        permissions: ['basic_access']
      }
      setUsers(prev => [...prev, newUser])
    }
    
    setLoading(false)
    setIsModalOpen(false)
    setSelectedUser(null)
  }

  const handleDeleteConfirm = async () => {
    if (!selectedUser) return
    
    setLoading(true)
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    setUsers(prev => prev.filter(user => user.id !== selectedUser.id))
    
    setLoading(false)
    setIsDeleteModalOpen(false)
    setSelectedUser(null)
  }

  const getInitialData = () => {
    if (selectedUser && isEditMode) {
      return {
        name: selectedUser.name,
        email: selectedUser.email,
        phone: selectedUser.phone,
        employeeId: selectedUser.employeeId,
        department: selectedUser.department,
        role: selectedUser.role,
        position: selectedUser.position,
        manager: selectedUser.manager,
        location: selectedUser.location,
        joinDate: selectedUser.joinDate,
        status: selectedUser.status
      }
    }
    return {}
  }

  const activeUsers = users.filter(u => u.status === 'active').length
  const inactiveUsers = users.filter(u => u.status === 'inactive').length
  const pendingUsers = users.filter(u => u.status === 'pending').length

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
            <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-green-700 rounded-xl flex items-center justify-center">
              <User className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-black'}`}>
                User Management
              </h1>
              <p className={`${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                Manage system users and their access permissions
              </p>
            </div>
          </div>
          
          <div className="flex items-center space-x-6">
            <div className="text-right">
              <div className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-black'}`}>
                {users.length}
              </div>
              <div className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                Total Users
              </div>
            </div>
            <div className="text-right">
              <div className={`text-2xl font-bold text-green-500`}>
                {activeUsers}
              </div>
              <div className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                Active
              </div>
            </div>
            <div className="text-right">
              <div className={`text-2xl font-bold text-red-500`}>
                {inactiveUsers}
              </div>
              <div className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                Inactive
              </div>
            </div>
            <div className="text-right">
              <div className={`text-2xl font-bold text-yellow-500`}>
                {pendingUsers}
              </div>
              <div className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                Pending
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
          data={users}
          columns={columns}
          isDarkMode={isDarkMode}
          onAdd={handleAdd}
          onEdit={handleEdit}
          onDelete={handleDelete}
          onView={handleView}
          title="System Users"
          addButtonText="Add User"
        />
      </motion.div>

      {/* Add/Edit Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false)
          setSelectedUser(null)
        }}
        title={isEditMode ? 'Edit User' : selectedUser ? 'View User' : 'Add User'}
        isDarkMode={isDarkMode}
        size="lg"
      >
        {selectedUser && !isEditMode ? (
          // View Mode
          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-white' : 'text-gray-700'}`}>
                  Full Name
                </label>
                <div className={`p-3 rounded-lg ${isDarkMode ? 'bg-gray-700 text-white' : 'bg-gray-100 text-black'}`}>
                  {selectedUser.name}
                </div>
              </div>
              <div>
                <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-white' : 'text-gray-700'}`}>
                  Employee ID
                </label>
                <div className={`p-3 rounded-lg ${isDarkMode ? 'bg-gray-700 text-white' : 'bg-gray-100 text-black'}`}>
                  {selectedUser.employeeId}
                </div>
              </div>
              <div>
                <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-white' : 'text-gray-700'}`}>
                  Email
                </label>
                <div className={`p-3 rounded-lg ${isDarkMode ? 'bg-gray-700 text-white' : 'bg-gray-100 text-black'}`}>
                  {selectedUser.email}
                </div>
              </div>
              <div>
                <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-white' : 'text-gray-700'}`}>
                  Phone
                </label>
                <div className={`p-3 rounded-lg ${isDarkMode ? 'bg-gray-700 text-white' : 'bg-gray-100 text-black'}`}>
                  {selectedUser.phone}
                </div>
              </div>
              <div>
                <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-white' : 'text-gray-700'}`}>
                  Department
                </label>
                <div className={`p-3 rounded-lg ${isDarkMode ? 'bg-gray-700 text-white' : 'bg-gray-100 text-black'}`}>
                  {selectedUser.department}
                </div>
              </div>
              <div>
                <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-white' : 'text-gray-700'}`}>
                  Role
                </label>
                <div className={`p-3 rounded-lg ${isDarkMode ? 'bg-gray-700 text-white' : 'bg-gray-100 text-black'}`}>
                  {selectedUser.role}
                </div>
              </div>
              <div>
                <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-white' : 'text-gray-700'}`}>
                  Position
                </label>
                <div className={`p-3 rounded-lg ${isDarkMode ? 'bg-gray-700 text-white' : 'bg-gray-100 text-black'}`}>
                  {selectedUser.position}
                </div>
              </div>
              <div>
                <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-white' : 'text-gray-700'}`}>
                  Manager
                </label>
                <div className={`p-3 rounded-lg ${isDarkMode ? 'bg-gray-700 text-white' : 'bg-gray-100 text-black'}`}>
                  {selectedUser.manager}
                </div>
              </div>
              <div>
                <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-white' : 'text-gray-700'}`}>
                  Location
                </label>
                <div className={`p-3 rounded-lg ${isDarkMode ? 'bg-gray-700 text-white' : 'bg-gray-100 text-black'}`}>
                  {selectedUser.location}
                </div>
              </div>
              <div>
                <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-white' : 'text-gray-700'}`}>
                  Join Date
                </label>
                <div className={`p-3 rounded-lg ${isDarkMode ? 'bg-gray-700 text-white' : 'bg-gray-100 text-black'}`}>
                  {new Date(selectedUser.joinDate).toLocaleDateString()}
                </div>
              </div>
              <div>
                <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-white' : 'text-gray-700'}`}>
                  Last Login
                </label>
                <div className={`p-3 rounded-lg ${isDarkMode ? 'bg-gray-700 text-white' : 'bg-gray-100 text-black'}`}>
                  {selectedUser.lastLogin === 'Never' ? 'Never' : new Date(selectedUser.lastLogin).toLocaleString()}
                </div>
              </div>
              <div>
                <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-white' : 'text-gray-700'}`}>
                  Status
                </label>
                <div className={`p-3 rounded-lg ${isDarkMode ? 'bg-gray-700 text-white' : 'bg-gray-100 text-black'}`}>
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    selectedUser.status === 'active' 
                      ? 'bg-green-100 text-green-800' 
                      : selectedUser.status === 'inactive'
                      ? 'bg-red-100 text-red-800'
                      : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {selectedUser.status === 'active' ? (
                      <CheckCircle className="w-3 h-3 mr-1" />
                    ) : selectedUser.status === 'inactive' ? (
                      <XCircle className="w-3 h-3 mr-1" />
                    ) : (
                      <Clock className="w-3 h-3 mr-1" />
                    )}
                    {selectedUser.status.charAt(0).toUpperCase() + selectedUser.status.slice(1)}
                  </span>
                </div>
              </div>
            </div>
            
            <div>
              <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-white' : 'text-gray-700'}`}>
                Permissions
              </label>
              <div className="flex flex-wrap gap-2">
                {selectedUser.permissions.map((permission) => (
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
            submitText={isEditMode ? 'Update User' : 'Add User'}
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
          setSelectedUser(null)
        }}
        title="Delete User"
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
                This action cannot be undone. The user will lose access to the system.
              </p>
            </div>
          </div>
          
          {selectedUser && (
            <div className={`p-4 rounded-lg ${isDarkMode ? 'bg-gray-700' : 'bg-gray-100'}`}>
              <p className={`text-sm ${isDarkMode ? 'text-white' : 'text-black'}`}>
                You are about to delete <strong>{selectedUser.name}</strong> ({selectedUser.email})
              </p>
            </div>
          )}
          
          <div className="flex justify-end space-x-3">
            <button
              onClick={() => {
                setIsDeleteModalOpen(false)
                setSelectedUser(null)
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
