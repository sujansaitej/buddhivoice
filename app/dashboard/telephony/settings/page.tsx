'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Save, RefreshCw, Phone, Volume2, Clock, Shield, Globe, Wifi } from 'lucide-react'

export default function TelephonySettingsPage() {
  const [isDarkMode, setIsDarkMode] = useState(true)
  const [settings, setSettings] = useState({
    // General Settings
    systemName: 'BuddhiVoice PBX',
    timezone: 'Asia/Kolkata',
    language: 'en',
    
    // Call Settings
    maxCallDuration: 3600,
    callRecording: true,
    callForwarding: true,
    voicemailEnabled: true,
    
    // Audio Settings
    audioCodec: 'G.711',
    audioQuality: 'high',
    echoCancellation: true,
    noiseReduction: true,
    
    // Security Settings
    encryptionEnabled: true,
    srtpEnabled: true,
    allowAnonymous: false,
    maxConcurrentCalls: 100,
    
    // Network Settings
    sipPort: 5060,
    rtpPortRange: '10000-20000',
    natTraversal: true,
    stunServer: 'stun.l.google.com:19302'
  })

  const handleSave = () => {
    console.log('Saving settings:', settings)
    // Here you would typically save to backend
  }

  const handleReset = () => {
    console.log('Resetting settings')
    // Reset to default values
  }

  const handleInputChange = (key: string, value: any) => {
    setSettings(prev => ({
      ...prev,
      [key]: value
    }))
  }

  const SettingSection = ({ title, icon: Icon, children }: { title: string, icon: any, children: React.ReactNode }) => (
    <div className={`rounded-xl border p-6 ${
      isDarkMode ? 'bg-white/5 border-white/10' : 'bg-white border-gray-200'
    }`}>
      <div className="flex items-center space-x-3 mb-4">
        <Icon className={`w-5 h-5 ${isDarkMode ? 'text-red-400' : 'text-red-600'}`} />
        <h3 className={`text-lg font-semibold ${isDarkMode ? 'text-white' : 'text-black'}`}>
          {title}
        </h3>
      </div>
      {children}
    </div>
  )

  const SettingField = ({ label, children }: { label: string, children: React.ReactNode }) => (
    <div className="mb-4">
      <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-white/80' : 'text-gray-700'}`}>
        {label}
      </label>
      {children}
    </div>
  )

  return (
    <div className={`min-h-screen transition-all duration-500 ${isDarkMode ? 'dark' : 'light'}`}>
      <div className="p-6">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-black'}`}>
              Telephony Settings
            </h1>
            <p className={`mt-1 ${isDarkMode ? 'text-white/70' : 'text-gray-600'}`}>
              Configure your telephony system settings and preferences
            </p>
          </div>
          <div className="flex items-center space-x-3">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleReset}
              className={`px-4 py-2 rounded-lg border transition-colors ${
                isDarkMode 
                  ? 'bg-white/10 border-white/20 text-white hover:bg-white/20' 
                  : 'bg-white border-gray-300 text-gray-700 hover:bg-gray-50'
              }`}
            >
              <RefreshCw className="w-4 h-4 mr-2 inline" />
              Reset
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleSave}
              className="btn-primary flex items-center space-x-2"
            >
              <Save className="w-4 h-4" />
              <span>Save Settings</span>
            </motion.button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* General Settings */}
          <SettingSection title="General Settings" icon={Globe}>
            <SettingField label="System Name">
              <input
                type="text"
                value={settings.systemName}
                onChange={(e) => handleInputChange('systemName', e.target.value)}
                className={`w-full px-3 py-2 rounded-lg border transition-colors ${
                  isDarkMode 
                    ? 'bg-white/10 border-white/20 text-white' 
                    : 'bg-white border-gray-300 text-gray-900'
                }`}
              />
            </SettingField>
            
            <SettingField label="Timezone">
              <select
                value={settings.timezone}
                onChange={(e) => handleInputChange('timezone', e.target.value)}
                className={`w-full px-3 py-2 rounded-lg border transition-colors ${
                  isDarkMode 
                    ? 'bg-white/10 border-white/20 text-white' 
                    : 'bg-white border-gray-300 text-gray-900'
                }`}
              >
                <option value="Asia/Kolkata">Asia/Kolkata (IST)</option>
                <option value="UTC">UTC</option>
                <option value="America/New_York">America/New_York (EST)</option>
                <option value="Europe/London">Europe/London (GMT)</option>
              </select>
            </SettingField>
            
            <SettingField label="Language">
              <select
                value={settings.language}
                onChange={(e) => handleInputChange('language', e.target.value)}
                className={`w-full px-3 py-2 rounded-lg border transition-colors ${
                  isDarkMode 
                    ? 'bg-white/10 border-white/20 text-white' 
                    : 'bg-white border-gray-300 text-gray-900'
                }`}
              >
                <option value="en">English</option>
                <option value="hi">Hindi</option>
                <option value="es">Spanish</option>
                <option value="fr">French</option>
              </select>
            </SettingField>
          </SettingSection>

          {/* Call Settings */}
          <SettingSection title="Call Settings" icon={Phone}>
            <SettingField label="Max Call Duration (seconds)">
              <input
                type="number"
                value={settings.maxCallDuration}
                onChange={(e) => handleInputChange('maxCallDuration', parseInt(e.target.value))}
                className={`w-full px-3 py-2 rounded-lg border transition-colors ${
                  isDarkMode 
                    ? 'bg-white/10 border-white/20 text-white' 
                    : 'bg-white border-gray-300 text-gray-900'
                }`}
              />
            </SettingField>
            
            <SettingField label="Call Recording">
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={settings.callRecording}
                  onChange={(e) => handleInputChange('callRecording', e.target.checked)}
                  className="rounded border-gray-300 text-red-600 focus:ring-red-500"
                />
                <span className={`text-sm ${isDarkMode ? 'text-white/80' : 'text-gray-700'}`}>
                  Enable call recording
                </span>
              </label>
            </SettingField>
            
            <SettingField label="Call Forwarding">
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={settings.callForwarding}
                  onChange={(e) => handleInputChange('callForwarding', e.target.checked)}
                  className="rounded border-gray-300 text-red-600 focus:ring-red-500"
                />
                <span className={`text-sm ${isDarkMode ? 'text-white/80' : 'text-gray-700'}`}>
                  Enable call forwarding
                </span>
              </label>
            </SettingField>
            
            <SettingField label="Voicemail">
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={settings.voicemailEnabled}
                  onChange={(e) => handleInputChange('voicemailEnabled', e.target.checked)}
                  className="rounded border-gray-300 text-red-600 focus:ring-red-500"
                />
                <span className={`text-sm ${isDarkMode ? 'text-white/80' : 'text-gray-700'}`}>
                  Enable voicemail
                </span>
              </label>
            </SettingField>
          </SettingSection>

          {/* Audio Settings */}
          <SettingSection title="Audio Settings" icon={Volume2}>
            <SettingField label="Audio Codec">
              <select
                value={settings.audioCodec}
                onChange={(e) => handleInputChange('audioCodec', e.target.value)}
                className={`w-full px-3 py-2 rounded-lg border transition-colors ${
                  isDarkMode 
                    ? 'bg-white/10 border-white/20 text-white' 
                    : 'bg-white border-gray-300 text-gray-900'
                }`}
              >
                <option value="G.711">G.711 (PCMU/PCMA)</option>
                <option value="G.722">G.722</option>
                <option value="G.729">G.729</option>
                <option value="Opus">Opus</option>
              </select>
            </SettingField>
            
            <SettingField label="Audio Quality">
              <select
                value={settings.audioQuality}
                onChange={(e) => handleInputChange('audioQuality', e.target.value)}
                className={`w-full px-3 py-2 rounded-lg border transition-colors ${
                  isDarkMode 
                    ? 'bg-white/10 border-white/20 text-white' 
                    : 'bg-white border-gray-300 text-gray-900'
                }`}
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
                <option value="ultra">Ultra</option>
              </select>
            </SettingField>
            
            <SettingField label="Echo Cancellation">
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={settings.echoCancellation}
                  onChange={(e) => handleInputChange('echoCancellation', e.target.checked)}
                  className="rounded border-gray-300 text-red-600 focus:ring-red-500"
                />
                <span className={`text-sm ${isDarkMode ? 'text-white/80' : 'text-gray-700'}`}>
                  Enable echo cancellation
                </span>
              </label>
            </SettingField>
            
            <SettingField label="Noise Reduction">
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={settings.noiseReduction}
                  onChange={(e) => handleInputChange('noiseReduction', e.target.checked)}
                  className="rounded border-gray-300 text-red-600 focus:ring-red-500"
                />
                <span className={`text-sm ${isDarkMode ? 'text-white/80' : 'text-gray-700'}`}>
                  Enable noise reduction
                </span>
              </label>
            </SettingField>
          </SettingSection>

          {/* Security Settings */}
          <SettingSection title="Security Settings" icon={Shield}>
            <SettingField label="Encryption">
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={settings.encryptionEnabled}
                  onChange={(e) => handleInputChange('encryptionEnabled', e.target.checked)}
                  className="rounded border-gray-300 text-red-600 focus:ring-red-500"
                />
                <span className={`text-sm ${isDarkMode ? 'text-white/80' : 'text-gray-700'}`}>
                  Enable encryption
                </span>
              </label>
            </SettingField>
            
            <SettingField label="SRTP">
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={settings.srtpEnabled}
                  onChange={(e) => handleInputChange('srtpEnabled', e.target.checked)}
                  className="rounded border-gray-300 text-red-600 focus:ring-red-500"
                />
                <span className={`text-sm ${isDarkMode ? 'text-white/80' : 'text-gray-700'}`}>
                  Enable SRTP
                </span>
              </label>
            </SettingField>
            
            <SettingField label="Allow Anonymous Calls">
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={settings.allowAnonymous}
                  onChange={(e) => handleInputChange('allowAnonymous', e.target.checked)}
                  className="rounded border-gray-300 text-red-600 focus:ring-red-500"
                />
                <span className={`text-sm ${isDarkMode ? 'text-white/80' : 'text-gray-700'}`}>
                  Allow anonymous calls
                </span>
              </label>
            </SettingField>
            
            <SettingField label="Max Concurrent Calls">
              <input
                type="number"
                value={settings.maxConcurrentCalls}
                onChange={(e) => handleInputChange('maxConcurrentCalls', parseInt(e.target.value))}
                className={`w-full px-3 py-2 rounded-lg border transition-colors ${
                  isDarkMode 
                    ? 'bg-white/10 border-white/20 text-white' 
                    : 'bg-white border-gray-300 text-gray-900'
                }`}
              />
            </SettingField>
          </SettingSection>

          {/* Network Settings */}
          <SettingSection title="Network Settings" icon={Wifi}>
            <SettingField label="SIP Port">
              <input
                type="number"
                value={settings.sipPort}
                onChange={(e) => handleInputChange('sipPort', parseInt(e.target.value))}
                className={`w-full px-3 py-2 rounded-lg border transition-colors ${
                  isDarkMode 
                    ? 'bg-white/10 border-white/20 text-white' 
                    : 'bg-white border-gray-300 text-gray-900'
                }`}
              />
            </SettingField>
            
            <SettingField label="RTP Port Range">
              <input
                type="text"
                value={settings.rtpPortRange}
                onChange={(e) => handleInputChange('rtpPortRange', e.target.value)}
                className={`w-full px-3 py-2 rounded-lg border transition-colors ${
                  isDarkMode 
                    ? 'bg-white/10 border-white/20 text-white' 
                    : 'bg-white border-gray-300 text-gray-900'
                }`}
                placeholder="10000-20000"
              />
            </SettingField>
            
            <SettingField label="NAT Traversal">
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={settings.natTraversal}
                  onChange={(e) => handleInputChange('natTraversal', e.target.checked)}
                  className="rounded border-gray-300 text-red-600 focus:ring-red-500"
                />
                <span className={`text-sm ${isDarkMode ? 'text-white/80' : 'text-gray-700'}`}>
                  Enable NAT traversal
                </span>
              </label>
            </SettingField>
            
            <SettingField label="STUN Server">
              <input
                type="text"
                value={settings.stunServer}
                onChange={(e) => handleInputChange('stunServer', e.target.value)}
                className={`w-full px-3 py-2 rounded-lg border transition-colors ${
                  isDarkMode 
                    ? 'bg-white/10 border-white/20 text-white' 
                    : 'bg-white border-gray-300 text-gray-900'
                }`}
                placeholder="stun.l.google.com:19302"
              />
            </SettingField>
          </SettingSection>
        </div>
      </div>
    </div>
  )
}
