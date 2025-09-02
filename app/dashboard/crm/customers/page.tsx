'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Plus, User, Phone, Mail, Building, Edit, Trash2, Search, Filter, Star, DollarSign, Calendar, Award } from 'lucide-react'
import DataTable from '../../../../components/ui/DataTable'
import Modal from '../../../../components/ui/Modal'
import Form from '../../../../components/ui/Form'

interface Customer {
  id: string
  name: string
  email: string
  phone: string
  company: string
  position: string
  status: 'active' | 'inactive' | 'suspended' | 'churned'
  tier: 'bronze' | 'silver' | 'gold' | 'platinum'
  totalSpent: number
  lastPurchase: string
  joinDate: string
  assignedTo: string
  notes: string
  tags: string[]
  subscriptionType: 'basic' | 'premium' | 'enterprise'
}

export default function CustomersPage() {
  const [isDarkMode, setIsDarkMode] = useState(true)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingCustomer, setEditingCustomer] = useState<Customer | null>(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [filterStatus, setFilterStatus] = useState('all')
  const [filterTier, setFilterTier] = useState('all')
  const [filterSubscription, setFilterSubscription] = useState('all')

  const mockData: Customer[] = [
    {
      id: 'CUST-001',
      name: 'Alice Johnson',
      email: 'alice.johnson@techcorp.com',
      phone: '+91 98765 43210',
      company: 'TechCorp Solutions',
      position: 'CTO',
      status: 'active',
      tier: 'platinum',
      totalSpent: 150000,
      lastPurchase: '2024-01-15',
      joinDate: '2023-06-01',
      assignedTo: 'John Smith',
      notes: 'Enterprise customer, very satisfied with service',
      tags: ['enterprise', 'high-value', 'satisfied'],
      subscriptionType: 'enterprise'
    },
    {
      id: 'CUST-002',
      name: 'Bob Wilson',
      email: 'bob.wilson@startup.io',
      phone: '+91 99999 99999',
      company: 'StartupIO',
      position: 'Founder',
      status: 'active',
      tier: 'silver',
      totalSpent: 25000,
      lastPurchase: '2024-01-10',
      joinDate: '2023-08-15',
      assignedTo: 'Sarah Johnson',
      notes: 'Growing startup, potential for upgrade',
      tags: ['startup', 'growing', 'potential'],
      subscriptionType: 'premium'
    },
    {
      id: 'CUST-003',
      name: 'Carol Brown',
      email: 'carol.brown@enterprise.com',
      phone: '+91 88888 88888',
      company: 'Enterprise Corp',
      position: 'IT Director',
      status: 'active',
      tier: 'gold',
      totalSpent: 75000,
      lastPurchase: '2024-01-05',
      joinDate: '2023-03-20',
      assignedTo: 'Mike Chen',
      notes: 'Large enterprise, multiple departments',
      tags: ['enterprise', 'multi-department', 'stable'],
      subscriptionType: 'enterprise'
    },
    {
      id: 'CUST-004',
      name: 'David Miller',
      email: 'david.miller@smallbiz.com',
      phone: '+91 77777 77777',
      company: 'SmallBiz Inc',
      position: 'Owner',
      status: 'inactive',
      tier: 'bronze',
      totalSpent: 5000,
      lastPurchase: '2023-12-01',
      joinDate: '2023-10-01',
      assignedTo: 'Emily Davis',
      notes: 'Small business, payment issues',
      tags: ['small-business', 'payment-issues', 'inactive'],
      subscriptionType: 'basic'
    },
    {
      id: 'CUST-005',
      name: 'Eva Garcia',
      email: 'eva.garcia@midcorp.com',
      phone: '+91 66666 66666',
      company: 'MidCorp Ltd',
      position: 'Operations Manager',
      status: 'active',
      tier: 'silver',
      totalSpent: 35000,
      lastPurchase: '2024-01-12',
      joinDate: '2023-07-10',
      assignedTo: 'David Wilson',
      notes: 'Mid-size company, regular customer',
      tags: ['mid-size', 'regular', 'stable'],
      subscriptionType: 'premium'
    }
  ]

  const filteredData = mockData.filter(customer => {
    const matchesSearch = customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         customer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         customer.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         customer.id.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = filterStatus === 'all' || customer.status === filterStatus
    const matchesTier = filterTier === 'all' || customer.tier === filterTier
    const matchesSubscription = filterSubscription === 'all' || customer.subscriptionType === filterSubscription
    return matchesSearch && matchesStatus && matchesTier && matchesSubscription
  })

  const columns = [
    { key: 'id', label: 'Customer ID', sortable: true },
    { key: 'name', label: 'Name', sortable: true },
    { key: 'company', label: 'Company', sortable: true },
    { key: 'tier', label: 'Tier', sortable: true },
    { key: 'status', label: 'Status', sortable: true },
    { key: 'subscriptionType', label: 'Subscription', sortable: true },
    { key: 'totalSpent', label: 'Total Spent', sortable: true },
    { key: 'assignedTo', label: 'Assigned To', sortable: true },
    { key: 'actions', label: 'Actions', sortable: false }
  ]

  const handleEdit = (customer: Customer) => {
    setEditingCustomer(customer)
    setIsModalOpen(true)
  }

  const handleDelete = (id: string) => {
    console.log('Delete customer:', id)
  }

  const handleCall = (phone: string) => {
    console.log('Call customer:', phone)
  }

  const handleEmail = (email: string) => {
    console.log('Email customer:', email)
  }

  const renderCell = (key: string, value: any, row: Customer) => {
    if (key === 'status') {
      const statusColors = {
        active: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
        inactive: 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200',
        suspended: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200',
        churned: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
      }
      return (
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusColors[row.status]}`}>
          {value}
        </span>
      )
    }

    if (key === 'tier') {
      const tierColors = {
        bronze: 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200',
        silver: 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200',
        gold: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200',
        platinum: 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200'
      }
      return (
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${tierColors[row.tier]}`}>
          {value}
        </span>
      )
    }

    if (key === 'subscriptionType') {
      const subscriptionColors = {
        basic: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
        premium: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
        enterprise: 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200'
      }
      return (
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${subscriptionColors[row.subscriptionType]}`}>
          {value}
        </span>
      )
    }

    if (key === 'totalSpent') {
      return (
        <div className="flex items-center space-x-2">
          <DollarSign className={`w-4 h-4 ${isDarkMode ? 'text-white/60' : 'text-gray-500'}`} />
          <span className="font-medium">₹{value.toLocaleString()}</span>
        </div>
      )
    }

    if (key === 'name') {
      return (
        <div className="flex items-center space-x-2">
          <User className={`w-4 h-4 ${isDarkMode ? 'text-white/60' : 'text-gray-500'}`} />
          <span className="font-medium">{value}</span>
        </div>
      )
    }

    if (key === 'company') {
      return (
        <div className="flex items-center space-x-2">
          <Building className={`w-4 h-4 ${isDarkMode ? 'text-white/60' : 'text-gray-500'}`} />
          <span>{value}</span>
        </div>
      )
    }

    if (key === 'assignedTo') {
      return (
        <div className="flex items-center space-x-2">
          <User className={`w-4 h-4 ${isDarkMode ? 'text-white/60' : 'text-gray-500'}`} />
          <span>{value}</span>
        </div>
      )
    }

    if (key === 'actions') {
      return (
        <div className="flex items-center space-x-2">
          <button
            onClick={() => handleCall(row.phone)}
            className={`p-1 rounded hover:bg-gray-100 dark:hover:bg-gray-700 ${
              isDarkMode ? 'text-white' : 'text-gray-600'
            }`}
            title="Call"
          >
            <Phone className="w-4 h-4" />
          </button>
          <button
            onClick={() => handleEmail(row.email)}
            className={`p-1 rounded hover:bg-gray-100 dark:hover:bg-gray-700 ${
              isDarkMode ? 'text-white' : 'text-gray-600'
            }`}
            title="Email"
          >
            <Mail className="w-4 h-4" />
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
      label: 'Full Name',
      type: 'text',
      required: true,
      value: editingCustomer?.name || ''
    },
    {
      name: 'email',
      label: 'Email Address',
      type: 'email',
      required: true,
      value: editingCustomer?.email || ''
    },
    {
      name: 'phone',
      label: 'Phone Number',
      type: 'text',
      required: true,
      value: editingCustomer?.phone || '',
      placeholder: '+91 98765 43210'
    },
    {
      name: 'company',
      label: 'Company',
      type: 'text',
      required: true,
      value: editingCustomer?.company || ''
    },
    {
      name: 'position',
      label: 'Position',
      type: 'text',
      required: true,
      value: editingCustomer?.position || ''
    },
    {
      name: 'status',
      label: 'Status',
      type: 'select',
      required: true,
      value: editingCustomer?.status || 'active',
      options: [
        { value: 'active', label: 'Active' },
        { value: 'inactive', label: 'Inactive' },
        { value: 'suspended', label: 'Suspended' },
        { value: 'churned', label: 'Churned' }
      ]
    },
    {
      name: 'tier',
      label: 'Customer Tier',
      type: 'select',
      required: true,
      value: editingCustomer?.tier || 'bronze',
      options: [
        { value: 'bronze', label: 'Bronze' },
        { value: 'silver', label: 'Silver' },
        { value: 'gold', label: 'Gold' },
        { value: 'platinum', label: 'Platinum' }
      ]
    },
    {
      name: 'subscriptionType',
      label: 'Subscription Type',
      type: 'select',
      required: true,
      value: editingCustomer?.subscriptionType || 'basic',
      options: [
        { value: 'basic', label: 'Basic' },
        { value: 'premium', label: 'Premium' },
        { value: 'enterprise', label: 'Enterprise' }
      ]
    },
    {
      name: 'totalSpent',
      label: 'Total Spent (₹)',
      type: 'number',
      required: true,
      value: editingCustomer?.totalSpent || 0
    },
    {
      name: 'assignedTo',
      label: 'Assigned To',
      type: 'text',
      required: true,
      value: editingCustomer?.assignedTo || ''
    },
    {
      name: 'notes',
      label: 'Notes',
      type: 'textarea',
      required: false,
      value: editingCustomer?.notes || ''
    }
  ]

  return (
    <div className={`min-h-screen transition-all duration-500 ${isDarkMode ? 'dark' : 'light'}`}>
      <div className="p-6">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-black'}`}>
              Customers
            </h1>
            <p className={`mt-1 ${isDarkMode ? 'text-white/70' : 'text-gray-600'}`}>
              Manage customer relationships, track spending, and maintain customer data
            </p>
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="btn-primary flex items-center space-x-2"
            onClick={() => {
              setEditingCustomer(null)
              setIsModalOpen(true)
            }}
          >
            <Plus className="w-4 h-4" />
            <span>Add Customer</span>
          </motion.button>
        </div>

        {/* Customer Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className={`rounded-xl border p-4 ${
            isDarkMode ? 'bg-white/5 border-white/10' : 'bg-white border-gray-200'
          }`}>
            <div className="flex items-center space-x-3">
              <User className={`w-8 h-8 ${isDarkMode ? 'text-blue-400' : 'text-blue-600'}`} />
              <div>
                <p className={`text-sm ${isDarkMode ? 'text-white/70' : 'text-gray-600'}`}>Total Customers</p>
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
              <Award className={`w-8 h-8 ${isDarkMode ? 'text-purple-400' : 'text-purple-600'}`} />
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
              <DollarSign className={`w-8 h-8 ${isDarkMode ? 'text-green-400' : 'text-green-600'}`} />
              <div>
                <p className={`text-sm ${isDarkMode ? 'text-white/70' : 'text-gray-600'}`}>Total Revenue</p>
                <p className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-black'}`}>
                  ₹{mockData.reduce((sum, c) => sum + c.totalSpent, 0).toLocaleString()}
                </p>
              </div>
            </div>
          </div>
          <div className={`rounded-xl border p-4 ${
            isDarkMode ? 'bg-white/5 border-white/10' : 'bg-white border-gray-200'
          }`}>
            <div className="flex items-center space-x-3">
              <Star className={`w-8 h-8 ${isDarkMode ? 'text-yellow-400' : 'text-yellow-600'}`} />
              <div>
                <p className={`text-sm ${isDarkMode ? 'text-white/70' : 'text-gray-600'}`}>Platinum</p>
                <p className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-black'}`}>
                  {mockData.filter(c => c.tier === 'platinum').length}
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
                placeholder="Search customers..."
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
              <option value="suspended">Suspended</option>
              <option value="churned">Churned</option>
            </select>
            <select
              value={filterTier}
              onChange={(e) => setFilterTier(e.target.value)}
              className={`px-3 py-2 rounded-lg border transition-colors ${
                isDarkMode 
                  ? 'bg-white/10 border-white/20 text-white' 
                  : 'bg-white border-gray-300 text-gray-900'
              }`}
            >
              <option value="all">All Tiers</option>
              <option value="bronze">Bronze</option>
              <option value="silver">Silver</option>
              <option value="gold">Gold</option>
              <option value="platinum">Platinum</option>
            </select>
            <select
              value={filterSubscription}
              onChange={(e) => setFilterSubscription(e.target.value)}
              className={`px-3 py-2 rounded-lg border transition-colors ${
                isDarkMode 
                  ? 'bg-white/10 border-white/20 text-white' 
                  : 'bg-white border-gray-300 text-gray-900'
              }`}
            >
              <option value="all">All Subscriptions</option>
              <option value="basic">Basic</option>
              <option value="premium">Premium</option>
              <option value="enterprise">Enterprise</option>
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
          title={editingCustomer ? 'Edit Customer' : 'Add Customer'}
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
