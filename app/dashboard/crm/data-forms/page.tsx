'use client'

import { useState } from 'react'
import { Plus, Search, Edit, Trash2, Eye, Download, Upload } from 'lucide-react'
import DataTable from '../../../../components/ui/DataTable'
import Modal from '../../../../components/ui/Modal'
import Form from '../../../../components/ui/Form'

interface DataForm {
  id: string
  name: string
  type: 'Lead Form' | 'Contact Form' | 'Support Form' | 'Feedback Form' | 'Survey Form'
  status: 'Active' | 'Inactive' | 'Draft'
  fields: number
  submissions: number
  createdBy: string
  createdAt: string
  lastModified: string
}

const mockDataForms: DataForm[] = [
  {
    id: '1',
    name: 'Lead Generation Form',
    type: 'Lead Form',
    status: 'Active',
    fields: 8,
    submissions: 156,
    createdBy: 'John Smith',
    createdAt: '2024-01-15',
    lastModified: '2024-01-20'
  },
  {
    id: '2',
    name: 'Customer Support Form',
    type: 'Support Form',
    status: 'Active',
    fields: 12,
    submissions: 89,
    createdBy: 'Sarah Johnson',
    createdAt: '2024-01-10',
    lastModified: '2024-01-18'
  },
  {
    id: '3',
    name: 'Product Feedback Survey',
    type: 'Survey Form',
    status: 'Draft',
    fields: 15,
    submissions: 0,
    createdBy: 'Mike Chen',
    createdAt: '2024-01-22',
    lastModified: '2024-01-22'
  },
  {
    id: '4',
    name: 'Contact Information Form',
    type: 'Contact Form',
    status: 'Active',
    fields: 6,
    submissions: 234,
    createdBy: 'Emily Davis',
    createdAt: '2024-01-08',
    lastModified: '2024-01-19'
  },
  {
    id: '5',
    name: 'Service Request Form',
    type: 'Support Form',
    status: 'Inactive',
    fields: 10,
    submissions: 67,
    createdBy: 'David Wilson',
    createdAt: '2024-01-05',
    lastModified: '2024-01-15'
  }
]

export default function DataFormsPage() {
  const [dataForms, setDataForms] = useState<DataForm[]>(mockDataForms)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingForm, setEditingForm] = useState<DataForm | null>(null)
  const [searchTerm, setSearchTerm] = useState('')

  const filteredForms = dataForms.filter(form =>
    form.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    form.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
    form.status.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const handleCreate = () => {
    setEditingForm(null)
    setIsModalOpen(true)
  }

  const handleEdit = (form: DataForm) => {
    setEditingForm(form)
    setIsModalOpen(true)
  }

  const handleDelete = (id: string) => {
    setDataForms(dataForms.filter(form => form.id !== id))
  }

  const handleSubmit = (formData: any) => {
    if (editingForm) {
      setDataForms(dataForms.map(form =>
        form.id === editingForm.id
          ? { ...form, ...formData, lastModified: new Date().toISOString().split('T')[0] }
          : form
      ))
    } else {
      const newForm: DataForm = {
        id: Date.now().toString(),
        ...formData,
        fields: 0,
        submissions: 0,
        createdBy: 'Current User',
        createdAt: new Date().toISOString().split('T')[0],
        lastModified: new Date().toISOString().split('T')[0]
      }
      setDataForms([newForm, ...dataForms])
    }
    setIsModalOpen(false)
    setEditingForm(null)
  }

  const columns = [
    { key: 'name', label: 'Form Name', sortable: true },
    { key: 'type', label: 'Type', sortable: true },
    { key: 'status', label: 'Status', sortable: true },
    { key: 'fields', label: 'Fields', sortable: true },
    { key: 'submissions', label: 'Submissions', sortable: true },
    { key: 'createdBy', label: 'Created By', sortable: true },
    { key: 'createdAt', label: 'Created', sortable: true },
    { key: 'lastModified', label: 'Last Modified', sortable: true }
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
    { name: 'name', label: 'Form Name', type: 'text', required: true },
    { name: 'type', label: 'Form Type', type: 'select', required: true, options: [
      { value: 'Lead Form', label: 'Lead Form' },
      { value: 'Contact Form', label: 'Contact Form' },
      { value: 'Support Form', label: 'Support Form' },
      { value: 'Feedback Form', label: 'Feedback Form' },
      { value: 'Survey Form', label: 'Survey Form' }
    ]},
    { name: 'status', label: 'Status', type: 'select', required: true, options: [
      { value: 'Active', label: 'Active' },
      { value: 'Inactive', label: 'Inactive' },
      { value: 'Draft', label: 'Draft' }
    ]}
  ]

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Data Forms</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            Manage your custom data collection forms and surveys
          </p>
        </div>
        <button
          onClick={handleCreate}
          className="btn-primary flex items-center space-x-2"
        >
          <Plus className="w-5 h-5" />
          <span>Create Form</span>
        </button>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
        <div className="p-6 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center space-x-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search forms..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              />
            </div>
            <button className="btn-secondary flex items-center space-x-2">
              <Download className="w-4 h-4" />
              <span>Export</span>
            </button>
            <button className="btn-secondary flex items-center space-x-2">
              <Upload className="w-4 h-4" />
              <span>Import</span>
            </button>
          </div>
        </div>

        <DataTable
          data={filteredForms}
          columns={columns}
          onEdit={handleEdit}
          onDelete={handleDelete}
          actions={[
            { icon: Eye, label: 'View', onClick: (item) => console.log('View', item) },
            { icon: Edit, label: 'Edit', onClick: handleEdit },
            { icon: Trash2, label: 'Delete', onClick: handleDelete }
          ]}
        />
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={editingForm ? 'Edit Data Form' : 'Create New Data Form'}
      >
        <Form
          fields={formFields}
          initialData={editingForm}
          onSubmit={handleSubmit}
          submitLabel={editingForm ? 'Update Form' : 'Create Form'}
        />
      </Modal>
    </div>
  )
}
