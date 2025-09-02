'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  Phone, 
  Code, 
  Copy, 
  Play, 
  Settings, 
  ExternalLink,
  CheckCircle,
  AlertCircle,
  Clock,
  Users,
  Activity
} from 'lucide-react'

export default function ClickToCallPage() {
  const [isDarkMode, setIsDarkMode] = useState(true)
  const [selectedLanguage, setSelectedLanguage] = useState('javascript')
  const [selectedIntegration, setSelectedIntegration] = useState('web')

  const codeExamples = {
    javascript: `// JavaScript Click-to-Call Implementation
function initiateCall(phoneNumber, agentId) {
  const apiKey = 'your-api-key-here';
  const endpoint = 'https://api.buddhiai.io/v1/calls/initiate';
  
  fetch(endpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': \`Bearer \${apiKey}\`
    },
    body: JSON.stringify({
      phone_number: phoneNumber,
      agent_id: agentId,
      source: 'web'
    })
  })
  .then(response => response.json())
  .then(data => {
    console.log('Call initiated:', data);
    // Handle success
  })
  .catch(error => {
    console.error('Error:', error);
    // Handle error
  });
}

// HTML Button
<button onclick="initiateCall('+1234567890', 'agent123')">
  Call Now
</button>`,
    
    python: `# Python Click-to-Call Implementation
import requests
import json

def initiate_call(phone_number, agent_id):
    api_key = 'your-api-key-here'
    endpoint = 'https://api.buddhiai.io/v1/calls/initiate'
    
    headers = {
        'Content-Type': 'application/json',
        'Authorization': f'Bearer {api_key}'
    }
    
    data = {
        'phone_number': phone_number,
        'agent_id': agent_id,
        'source': 'web'
    }
    
    try:
        response = requests.post(endpoint, headers=headers, json=data)
        response.raise_for_status()
        result = response.json()
        print(f'Call initiated: {result}')
        return result
    except requests.exceptions.RequestException as e:
        print(f'Error: {e}')
        return None

# Usage
initiate_call('+1234567890', 'agent123')`,
    
    php: `<?php
// PHP Click-to-Call Implementation
function initiateCall($phoneNumber, $agentId) {
    $apiKey = 'your-api-key-here';
    $endpoint = 'https://api.buddhiai.io/v1/calls/initiate';
    
    $data = [
        'phone_number' => $phoneNumber,
        'agent_id' => $agentId,
        'source' => 'web'
    ];
    
    $options = [
        'http' => [
            'header' => [
                'Content-Type: application/json',
                'Authorization: Bearer ' . $apiKey
            ],
            'method' => 'POST',
            'content' => json_encode($data)
        ]
    ];
    
    $context = stream_context_create($options);
    $result = file_get_contents($endpoint, false, $context);
    
    if ($result === FALSE) {
        echo 'Error initiating call';
    } else {
        echo 'Call initiated: ' . $result;
    }
}

// Usage
initiateCall('+1234567890', 'agent123');
?>`
  }

  const integrationTypes = [
    {
      id: 'web',
      name: 'Web Integration',
      description: 'Integrate click-to-call functionality into your website',
      icon: ExternalLink,
      features: ['HTML/JavaScript', 'React/Vue Components', 'WordPress Plugin']
    },
    {
      id: 'mobile',
      name: 'Mobile App',
      description: 'Add click-to-call to your mobile applications',
      icon: Phone,
      features: ['iOS SDK', 'Android SDK', 'React Native']
    },
    {
      id: 'crm',
      name: 'CRM Integration',
      description: 'Connect with popular CRM systems',
      icon: Users,
      features: ['Salesforce', 'HubSpot', 'Custom CRM']
    }
  ]

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
    alert('Code copied to clipboard!')
  }

  const stats = [
    { label: 'Total Calls', value: '12,456', icon: Phone, color: 'text-blue-500' },
    { label: 'Success Rate', value: '94.2%', icon: CheckCircle, color: 'text-green-500' },
    { label: 'Avg Response', value: '2.3s', icon: Clock, color: 'text-yellow-500' },
    { label: 'Active Integrations', value: '8', icon: Activity, color: 'text-purple-500' }
  ]

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Click to Call</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            Integrate one-click calling functionality into your applications
          </p>
        </div>
        <button className="btn-primary flex items-center space-x-2">
          <Settings className="w-5 h-5" />
          <span>Configure</span>
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
            className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'} rounded-lg p-6 border ${isDarkMode ? 'border-gray-700' : 'border-gray-200'}`}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className={`text-sm font-medium ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  {stat.label}
                </p>
                <p className={`text-2xl font-bold ${stat.color} mt-1`}>
                  {stat.value}
                </p>
              </div>
              <stat.icon className={`w-8 h-8 ${stat.color}`} />
            </div>
          </motion.div>
        ))}
      </div>

      {/* Integration Types */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.2 }}
        className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'} rounded-lg p-6 border ${isDarkMode ? 'border-gray-700' : 'border-gray-200'}`}
      >
        <h3 className={`text-lg font-semibold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
          Integration Types
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {integrationTypes.map((type, index) => (
            <div
              key={type.id}
              className={`p-4 rounded-lg border cursor-pointer transition-all ${
                selectedIntegration === type.id
                  ? `${isDarkMode ? 'border-red-500 bg-red-500/10' : 'border-red-500 bg-red-50'}`
                  : `${isDarkMode ? 'border-gray-700 hover:border-gray-600' : 'border-gray-200 hover:border-gray-300'}`
              }`}
              onClick={() => setSelectedIntegration(type.id)}
            >
              <div className="flex items-center space-x-3 mb-3">
                <type.icon className={`w-6 h-6 ${isDarkMode ? 'text-white' : 'text-gray-600'}`} />
                <h4 className={`font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                  {type.name}
                </h4>
              </div>
              <p className={`text-sm mb-3 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                {type.description}
              </p>
              <div className="space-y-1">
                {type.features.map((feature, idx) => (
                  <div key={idx} className="flex items-center space-x-2">
                    <CheckCircle className="w-3 h-3 text-green-500" />
                    <span className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                      {feature}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Code Examples */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.4 }}
        className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'} rounded-lg border ${isDarkMode ? 'border-gray-700' : 'border-gray-200'}`}
      >
        <div className="p-6 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <h3 className={`text-lg font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
              Code Examples
            </h3>
            <div className="flex items-center space-x-2">
              <select
                value={selectedLanguage}
                onChange={(e) => setSelectedLanguage(e.target.value)}
                className={`px-3 py-2 border rounded-lg text-sm ${
                  isDarkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-700'
                }`}
              >
                <option value="javascript">JavaScript</option>
                <option value="python">Python</option>
                <option value="php">PHP</option>
              </select>
              <button
                onClick={() => copyToClipboard(codeExamples[selectedLanguage as keyof typeof codeExamples])}
                className="btn-secondary flex items-center space-x-2"
              >
                <Copy className="w-4 h-4" />
                <span>Copy</span>
              </button>
            </div>
          </div>
        </div>
        
        <div className="p-6">
          <pre className={`text-sm overflow-x-auto ${isDarkMode ? 'text-gray-300' : 'text-gray-800'}`}>
            <code>{codeExamples[selectedLanguage as keyof typeof codeExamples]}</code>
          </pre>
        </div>
      </motion.div>

      {/* API Documentation */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.6 }}
        className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'} rounded-lg p-6 border ${isDarkMode ? 'border-gray-700' : 'border-gray-200'}`}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Code className={`w-6 h-6 ${isDarkMode ? 'text-white' : 'text-gray-600'}`} />
            <div>
              <h3 className={`font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                API Documentation
              </h3>
              <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                Complete API reference and integration guides
              </p>
            </div>
          </div>
          <button className="btn-primary flex items-center space-x-2">
            <ExternalLink className="w-4 h-4" />
            <span>View Docs</span>
          </button>
        </div>
      </motion.div>

      {/* Testing Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.8 }}
        className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'} rounded-lg p-6 border ${isDarkMode ? 'border-gray-700' : 'border-gray-200'}`}
      >
        <h3 className={`text-lg font-semibold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
          Test Your Integration
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-white' : 'text-gray-700'}`}>
              Phone Number
            </label>
            <input
              type="tel"
              placeholder="+1234567890"
              className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent ${
                isDarkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'
              }`}
            />
          </div>
          <div>
            <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-white' : 'text-gray-700'}`}>
              Agent ID
            </label>
            <input
              type="text"
              placeholder="agent123"
              className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent ${
                isDarkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'
              }`}
            />
          </div>
        </div>
        
        <div className="mt-4">
          <button className="btn-primary flex items-center space-x-2">
            <Play className="w-4 h-4" />
            <span>Test Call</span>
          </button>
        </div>
      </motion.div>
    </div>
  )
}
