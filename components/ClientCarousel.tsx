'use client'

import { motion } from 'framer-motion'

interface ClientCarouselProps {
  isDarkMode: boolean
}

export default function ClientCarousel({ isDarkMode }: ClientCarouselProps) {
  const clients = [
    { name: 'TechCorp', logo: 'TC', industry: 'Technology' },
    { name: 'FinServe', logo: 'FS', industry: 'Finance' },
    { name: 'HealthPlus', logo: 'HP', industry: 'Healthcare' },
    { name: 'EduTech', logo: 'ET', industry: 'Education' },
    { name: 'RetailPro', logo: 'RP', industry: 'Retail' },
    { name: 'ManufactureCo', logo: 'MC', industry: 'Manufacturing' },
  ]



  return (
    <section className="py-20 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className={`text-4xl md:text-5xl font-bold mb-6 ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
            Trusted by <span className="gradient-text">Leading Companies</span>
          </h2>
          <p className={`text-xl max-w-3xl mx-auto ${isDarkMode ? 'text-white/80' : 'text-gray-600'}`}>
            Join thousands of businesses that have transformed their communication 
            with BuddhiVoice's cutting-edge platform.
          </p>
        </motion.div>

        {/* Client Logos */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className="mb-20"
        >
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
            {clients.map((client, index) => (
              <motion.div
                key={client.name}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.1, rotate: 5 }}
                className="flex flex-col items-center space-y-3"
              >
                <div className={`w-20 h-20 glassmorphism ${isDarkMode ? 'dark' : 'light'} rounded-2xl flex items-center justify-center text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
                  {client.logo}
                </div>
                <div className="text-center">
                  <div className={`font-semibold ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>{client.name}</div>
                  <div className={`text-sm ${isDarkMode ? 'text-white/60' : 'text-gray-600'}`}>{client.industry}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <div className={`glassmorphism ${isDarkMode ? 'dark' : 'light'} p-8 rounded-2xl`}>
            <h3 className={`text-2xl md:text-3xl font-bold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
              Ready to Transform Your Business Communication?
            </h3>
            <p className={`mb-6 max-w-2xl mx-auto ${isDarkMode ? 'text-white/80' : 'text-gray-600'}`}>
              Join the companies that have already revolutionized their customer 
              service and internal communication with BuddhiVoice.
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="btn-primary text-lg px-8 py-4"
            >
              Get Started Today
            </motion.button>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
