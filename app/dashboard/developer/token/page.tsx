'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  Key, 
  Plus, 
  Eye, 
  EyeOff, 
  Copy, 
  Trash2, 
  Edit, 
  RefreshCw,
  Shield,
  Clock,
  CheckCircle,
  AlertCircle
} from 'lucide-react'

interface Token {
  id: string
  name: string
  token: string
  permissions: string[]
  status: 'Active' | 'Inactive' | 'Expired'
  createdAt: string
  lastUsed: string
  expiresAt: string
  createdBy: string
}

const mockTokens: Token[] = [
  {
    id: '1',
    name: 'Production API Token',
    token: 'sk-1234567890abcdef1234567890abcdef',
    permissions: ['read', 'write', 'admin'],
    status: 'Active',
    createdAt: '2024-01-15',
    lastUsed: '2024-01-22 14:30:15',
    expiresAt: '2024-12-31',
    createdBy: 'John Smith'
  },
  {
    id: '2',
    name: 'Development Token',
    token: 'sk-dev-abcdef1234567890abcdef1234567890',
    permissions: ['read', 'write'],
    status: 'Active',
    createdAt: '2024-01-10',
    lastUsed: '2024-01-22 10:15:30',
    expiresAt: '2024-06-30',
    createdBy: 'Sarah Johnson'
  },
  {
    id: '3',
    name: 'Read-Only Token',
    token: 'sk-ro-9876543210fedcba9876543210fedcba',
    permissions: ['read'],
    status: 'Inactive',
    createdAt: '2024-01-05',
    lastUsed: '2024-01-20 16:45:22',
    expiresAt: '2024-03-31',
    createdBy: 'Mike Chen'
  }
]

export default function TokenPage() {
  const [isDarkMode, setIsDarkMode] = useState(true)
  const [tokens, setTokens] = useState<Token[]>(mockTokens)
  const [showTokens, setShowTokens] = useState<{[key: string]: boolean}>({})
  const [isCreating, setIsCreating] = useState(false)
  const [newToken, setNewToken] = useState({
    name: '',
    permissions: [] as string[],
    expiresAt: ''
  })

  const toggleTokenVisibility = (tokenId: string) => {
    setShowTokens(prev => ({
      ...prev,
      [tokenId]: !prev[tokenId]
    }))
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
    // You could add a toast notification here
    alert('Token copied to clipboard!')
  }

  const generateNewToken = () => {
    const newTokenData: Token = {
      id: Date.now().toString(),
      name: newToken.name,
      token: `sk-${Math.random().toString(36).substring(2, 15)}${Math.random().toString(36).substring(2, 15)}`,
      permissions: newToken.permissions,
      status: 'Active',
      createdAt: new Date().toISOString().split('T')[0],
      lastUsed: 'Never',
      expiresAt: newToken.expiresAt,
      createdBy: 'Current User'
    }
    setTokens([newTokenData, ...tokens])
    setIsCreating(false)
    setNewToken({ name: '', permissions: [], expiresAt: '' })
  }

  const revokeToken = (tokenId: string) => {
    if (confirm('Are you sure you want to revoke this token?')) {
      setTokens(tokens.map(token => 
        token.id === tokenId 
          ? { ...token, status: 'Inactive' as const }
          : token
      ))
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active': return 'bg-green-100 text-green-800'
      case 'Inactive': return 'bg-gray-100 text-gray-800'
      case 'Expired': return 'bg-red-100 text-red-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Active': return <CheckCircle className="w-4 h-4 text-green-500" />
      case 'Inactive': return <AlertCircle className="w-4 h-4 text-gray-500" />
      case 'Expired': return <AlertCircle className="w-4 h-4 text-red-500" />
      default: return <AlertCircle className="w-4 h-4 text-gray-500" />
    }
  }

  const maskToken = (token: string) => {
    return token.substring(0, 8) + '•'.repeat(token.length - 16) + token.substring(token.length - 8)
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">API Tokens</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            Manage your API tokens for secure access to BuddhiVoice services
          </p>
        </div>
        <button
          onClick={() => setIsCreating(true)}
          className="btn-primary flex items-center space-x-2"
        >
          <Plus className="w-5 h-5" />
          <span>Generate Token</span>
        </button>
      </div>

      {/* Security Notice */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className={`${isDarkMode ? 'bg-blue-900/20 border-blue-500/30' : 'bg-blue-50 border-blue-200'} border rounded-lg p-4`}
      >
        <div className="flex items-start space-x-3">
          <Shield className={`w-5 h-5 mt-0.5 ${isDarkMode ? 'text-blue-400' : 'text-blue-600'}`} />
          <div>
            <h3 className={`font-medium ${isDarkMode ? 'text-blue-300' : 'text-blue-800'}`}>
              Security Best Practices
            </h3>
            <ul className={`text-sm mt-1 space-y-1 ${isDarkMode ? 'text-blue-200' : 'text-blue-700'}`}>
              <li>• Keep your tokens secure and never share them publicly</li>
              <li>• Use different tokens for different environments (production, development)</li>
              <li>• Regularly rotate your tokens and revoke unused ones</li>
              <li>• Monitor token usage and set appropriate expiration dates</li>
            </ul>
          </div>
        </div>
      </motion.div>

      {/* Create Token Modal */}
      {isCreating && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className={`fixed inset-0 bg-black/50 flex items-center justify-center z-50`}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'} rounded-lg p-6 w-full max-w-md`}
          >
            <h3 className={`text-lg font-semibold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
              Generate New Token
            </h3>
            
            <div className="space-y-4">
              <div>
                <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-white' : 'text-gray-700'}`}>
                  Token Name
                </label>
                <input
                  type="text"
                  value={newToken.name}
                  onChange={(e) => setNewToken({...newToken, name: e.target.value})}
                  placeholder="e.g., Production API Token"
                  className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent ${
                    isDarkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'
                  }`}
                />
              </div>

              <div>
                <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-white' : 'text-gray-700'}`}>
                  Permissions
                </label>
                <div className="space-y-2">
                  {['read', 'write', 'admin'].map(permission => (
                    <label key={permission} className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        checked={newToken.permissions.includes(permission)}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setNewToken({...newToken, permissions: [...newToken.permissions, permission]})
                          } else {
                            setNewToken({...newToken, permissions: newToken.permissions.filter(p => p !== permission)})
                          }
                        }}
                        className="h-4 w-4 text-red-600 focus:ring-red-500 border-gray-300 rounded"
                      />
                      <span className={`text-sm ${isDarkMode ? 'text-white' : 'text-gray-700'}`}>
                        {permission.charAt(0).toUpperCase() + permission.slice(1)}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-white' : 'text-gray-700'}`}>
                  Expiration Date
                </label>
                <input
                  type="date"
                  value={newToken.expiresAt}
                  onChange={(e) => setNewToken({...newToken, expiresAt: e.target.value})}
                  className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent ${
                    isDarkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'
                  }`}
                />
              </div>
            </div>

            <div className="flex space-x-3 mt-6">
              <button
                onClick={() => setIsCreating(false)}
                className="btn-secondary flex-1"
              >
                Cancel
              </button>
              <button
                onClick={generateNewToken}
                className="btn-primary flex-1"
              >
                Generate Token
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}

      {/* Tokens List */}
      <div className="space-y-4">
        {tokens.map((token, index) => (
          <motion.div
            key={token.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
            className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'} rounded-lg p-6 border ${isDarkMode ? 'border-gray-700' : 'border-gray-200'}`}
          >
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-3">
                <Key className={`w-5 h-5 ${isDarkMode ? 'text-white' : 'text-gray-600'}`} />
                <div>
                  <h3 className={`font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                    {token.name}
                  </h3>
                  <div className="flex items-center space-x-2 mt-1">
                    {getStatusIcon(token.status)}
                    <span className={`px-2 py-1 rounded-full text-xs ${getStatusColor(token.status)}`}>
                      {token.status}
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => toggleTokenVisibility(token.id)}
                  className={`p-2 rounded-lg transition-colors ${isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'}`}
                >
                  {showTokens[token.id] ? (
                    <EyeOff className={`w-4 h-4 ${isDarkMode ? 'text-white' : 'text-gray-600'}`} />
                  ) : (
                    <Eye className={`w-4 h-4 ${isDarkMode ? 'text-white' : 'text-gray-600'}`} />
                  )}
                </button>
                <button
                  onClick={() => copyToClipboard(token.token)}
                  className={`p-2 rounded-lg transition-colors ${isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'}`}
                >
                  <Copy className={`w-4 h-4 ${isDarkMode ? 'text-white' : 'text-gray-600'}`} />
                </button>
                <button
                  onClick={() => revokeToken(token.id)}
                  className={`p-2 rounded-lg transition-colors ${isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'}`}
                >
                  <Trash2 className={`w-4 h-4 ${isDarkMode ? 'text-white' : 'text-gray-600'}`} />
                </button>
              </div>
            </div>

            <div className="space-y-3">
              <div>
                <label className={`block text-sm font-medium mb-1 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  Token
                </label>
                <div className={`p-3 rounded-lg font-mono text-sm ${isDarkMode ? 'bg-gray-700' : 'bg-gray-100'}`}>
                  {showTokens[token.id] ? token.token : maskToken(token.token)}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className={`block text-sm font-medium mb-1 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                    Permissions
                  </label>
                  <div className="flex flex-wrap gap-1">
                    {token.permissions.map(permission => (
                      <span
                        key={permission}
                        className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full"
                      >
                        {permission}
                      </span>
                    ))}
                  </div>
                </div>
                <div>
                  <label className={`block text-sm font-medium mb-1 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                    Created
                  </label>
                  <p className={`text-sm ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                    {token.createdAt}
                  </p>
                </div>
                <div>
                  <label className={`block text-sm font-medium mb-1 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                    Last Used
                  </label>
                  <p className={`text-sm ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                    {token.lastUsed}
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
