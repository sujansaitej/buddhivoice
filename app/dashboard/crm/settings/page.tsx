'use client'

import { useState } from 'react'
import { Save, RefreshCw, Settings, User, Mail, Phone, Globe, Shield } from 'lucide-react'

export default function CRMSettingsPage() {
  const [isDarkMode, setIsDarkMode] = useState(true)
  const [settings, setSettings] = useState({
    // General Settings
    companyName: 'BuddhiVoice',
    timezone: 'Asia/Kolkata',
    dateFormat: 'DD/MM/YYYY',
    currency: 'INR',
    
    // Lead Settings
    autoAssignLeads: true,
    leadExpiryDays: 30,
    followUpReminder: true,
    followUpDays: 7,
    
    // Email Settings
    smtpHost: 'smtp.gmail.com',
    smtpPort: 587,
    smtpUsername: 'noreply@buddhiai.io',
    smtpPassword: '',
    fromEmail: 'noreply@buddhiai.io',
    fromName: 'BuddhiVoice CRM',
    
    // Notification Settings
    emailNotifications: true,
    smsNotifications: false,
    pushNotifications: true,
    notificationFrequency: 'immediate',
    
    // Integration Settings
    enableApi: true,
    apiKey: 'sk-1234567890abcdef',
    webhookUrl: 'https://api.buddhiai.io/webhook',
    syncInterval: 15,
    
    // Security Settings
    sessionTimeout: 30,
    passwordPolicy: 'strong',
    twoFactorAuth: false,
    ipWhitelist: '',
    
    // Custom Fields
    customFields: [
      { name: 'Industry', type: 'select', options: ['Technology', 'Healthcare', 'Finance', 'Education'] },
      { name: 'Company Size', type: 'select', options: ['1-10', '11-50', '51-200', '200+'] },
      { name: 'Lead Source', type: 'select', options: ['Website', 'Referral', 'Cold Call', 'Email'] }
    ]
  })

  const handleSave = () => {
    console.log('Saving settings:', settings)
    // Here you would typically save to your backend
    alert('Settings saved successfully!')
  }

  const handleReset = () => {
    if (confirm('Are you sure you want to reset all settings to default?')) {
      // Reset to default values
      setSettings({
        ...settings,
        companyName: 'BuddhiVoice',
        timezone: 'Asia/Kolkata',
        dateFormat: 'DD/MM/YYYY',
        currency: 'INR'
      })
    }
  }

  const handleInputChange = (section: string, field: string, value: any) => {
    setSettings(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const SettingSection = ({ title, icon: Icon, children }: { title: string, icon: any, children: React.ReactNode }) => (
    <div className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'} rounded-lg p-6 border ${isDarkMode ? 'border-gray-700' : 'border-gray-200'}`}>
      <div className="flex items-center space-x-3 mb-6">
        <Icon className={`w-6 h-6 ${isDarkMode ? 'text-white' : 'text-gray-700'}`} />
        <h3 className={`text-xl font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{title}</h3>
      </div>
      {children}
    </div>
  )

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">CRM Settings</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            Configure your CRM system preferences and integrations
          </p>
        </div>
        <div className="flex space-x-3">
          <button
            onClick={handleReset}
            className="btn-secondary flex items-center space-x-2"
          >
            <RefreshCw className="w-4 h-4" />
            <span>Reset</span>
          </button>
          <button
            onClick={handleSave}
            className="btn-primary flex items-center space-x-2"
          >
            <Save className="w-4 h-4" />
            <span>Save Settings</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* General Settings */}
        <SettingSection title="General Settings" icon={Settings}>
          <div className="space-y-4">
            <div>
              <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-white' : 'text-gray-700'}`}>
                Company Name
              </label>
              <input
                type="text"
                value={settings.companyName}
                onChange={(e) => handleInputChange('general', 'companyName', e.target.value)}
                className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent ${
                  isDarkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'
                }`}
              />
            </div>
            <div>
              <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-white' : 'text-gray-700'}`}>
                Timezone
              </label>
              <select
                value={settings.timezone}
                onChange={(e) => handleInputChange('general', 'timezone', e.target.value)}
                className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent ${
                  isDarkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'
                }`}
              >
                <option value="Asia/Kolkata">Asia/Kolkata (IST)</option>
                <option value="UTC">UTC</option>
                <option value="America/New_York">America/New_York (EST)</option>
                <option value="Europe/London">Europe/London (GMT)</option>
              </select>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-white' : 'text-gray-700'}`}>
                  Date Format
                </label>
                <select
                  value={settings.dateFormat}
                  onChange={(e) => handleInputChange('general', 'dateFormat', e.target.value)}
                  className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent ${
                    isDarkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'
                  }`}
                >
                  <option value="DD/MM/YYYY">DD/MM/YYYY</option>
                  <option value="MM/DD/YYYY">MM/DD/YYYY</option>
                  <option value="YYYY-MM-DD">YYYY-MM-DD</option>
                </select>
              </div>
              <div>
                <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-white' : 'text-gray-700'}`}>
                  Currency
                </label>
                <select
                  value={settings.currency}
                  onChange={(e) => handleInputChange('general', 'currency', e.target.value)}
                  className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent ${
                    isDarkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'
                  }`}
                >
                  <option value="INR">INR (₹)</option>
                  <option value="USD">USD ($)</option>
                  <option value="EUR">EUR (€)</option>
                  <option value="GBP">GBP (£)</option>
                </select>
              </div>
            </div>
          </div>
        </SettingSection>

        {/* Lead Settings */}
        <SettingSection title="Lead Management" icon={User}>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <label className={`text-sm font-medium ${isDarkMode ? 'text-white' : 'text-gray-700'}`}>
                Auto-assign leads
              </label>
              <input
                type="checkbox"
                checked={settings.autoAssignLeads}
                onChange={(e) => handleInputChange('leads', 'autoAssignLeads', e.target.checked)}
                className="h-4 w-4 text-red-600 focus:ring-red-500 border-gray-300 rounded"
              />
            </div>
            <div>
              <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-white' : 'text-gray-700'}`}>
                Lead Expiry (Days)
              </label>
              <input
                type="number"
                value={settings.leadExpiryDays}
                onChange={(e) => handleInputChange('leads', 'leadExpiryDays', parseInt(e.target.value))}
                className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent ${
                  isDarkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'
                }`}
              />
            </div>
            <div className="flex items-center justify-between">
              <label className={`text-sm font-medium ${isDarkMode ? 'text-white' : 'text-gray-700'}`}>
                Follow-up reminders
              </label>
              <input
                type="checkbox"
                checked={settings.followUpReminder}
                onChange={(e) => handleInputChange('leads', 'followUpReminder', e.target.checked)}
                className="h-4 w-4 text-red-600 focus:ring-red-500 border-gray-300 rounded"
              />
            </div>
            <div>
              <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-white' : 'text-gray-700'}`}>
                Follow-up Interval (Days)
              </label>
              <input
                type="number"
                value={settings.followUpDays}
                onChange={(e) => handleInputChange('leads', 'followUpDays', parseInt(e.target.value))}
                className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent ${
                  isDarkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'
                }`}
              />
            </div>
          </div>
        </SettingSection>

        {/* Email Settings */}
        <SettingSection title="Email Configuration" icon={Mail}>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-white' : 'text-gray-700'}`}>
                  SMTP Host
                </label>
                <input
                  type="text"
                  value={settings.smtpHost}
                  onChange={(e) => handleInputChange('email', 'smtpHost', e.target.value)}
                  className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent ${
                    isDarkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'
                  }`}
                />
              </div>
              <div>
                <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-white' : 'text-gray-700'}`}>
                  SMTP Port
                </label>
                <input
                  type="number"
                  value={settings.smtpPort}
                  onChange={(e) => handleInputChange('email', 'smtpPort', parseInt(e.target.value))}
                  className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent ${
                    isDarkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'
                  }`}
                />
              </div>
            </div>
            <div>
              <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-white' : 'text-gray-700'}`}>
                SMTP Username
              </label>
              <input
                type="text"
                value={settings.smtpUsername}
                onChange={(e) => handleInputChange('email', 'smtpUsername', e.target.value)}
                className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent ${
                  isDarkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'
                }`}
              />
            </div>
            <div>
              <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-white' : 'text-gray-700'}`}>
                From Email
              </label>
              <input
                type="email"
                value={settings.fromEmail}
                onChange={(e) => handleInputChange('email', 'fromEmail', e.target.value)}
                className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent ${
                  isDarkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'
                }`}
              />
            </div>
          </div>
        </SettingSection>

        {/* Security Settings */}
        <SettingSection title="Security & Access" icon={Shield}>
          <div className="space-y-4">
            <div>
              <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-white' : 'text-gray-700'}`}>
                Session Timeout (Minutes)
              </label>
              <input
                type="number"
                value={settings.sessionTimeout}
                onChange={(e) => handleInputChange('security', 'sessionTimeout', parseInt(e.target.value))}
                className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent ${
                  isDarkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'
                }`}
              />
            </div>
            <div>
              <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-white' : 'text-gray-700'}`}>
                Password Policy
              </label>
              <select
                value={settings.passwordPolicy}
                onChange={(e) => handleInputChange('security', 'passwordPolicy', e.target.value)}
                className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent ${
                  isDarkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'
                }`}
              >
                <option value="basic">Basic (6+ characters)</option>
                <option value="medium">Medium (8+ chars, mixed case)</option>
                <option value="strong">Strong (8+ chars, numbers, symbols)</option>
              </select>
            </div>
            <div className="flex items-center justify-between">
              <label className={`text-sm font-medium ${isDarkMode ? 'text-white' : 'text-gray-700'}`}>
                Two-Factor Authentication
              </label>
              <input
                type="checkbox"
                checked={settings.twoFactorAuth}
                onChange={(e) => handleInputChange('security', 'twoFactorAuth', e.target.checked)}
                className="h-4 w-4 text-red-600 focus:ring-red-500 border-gray-300 rounded"
              />
            </div>
            <div>
              <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-white' : 'text-gray-700'}`}>
                IP Whitelist (comma-separated)
              </label>
              <textarea
                value={settings.ipWhitelist}
                onChange={(e) => handleInputChange('security', 'ipWhitelist', e.target.value)}
                rows={3}
                placeholder="192.168.1.1, 10.0.0.1"
                className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent ${
                  isDarkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'
                }`}
              />
            </div>
          </div>
        </SettingSection>
      </div>
    </div>
  )
}
