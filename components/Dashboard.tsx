'use client'

import { motion } from 'framer-motion'
import { BarChart3, TrendingUp, Users, Phone, Clock, CheckCircle, AlertCircle, XCircle } from 'lucide-react'
import { Line, Bar, Doughnut } from 'react-chartjs-2'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from 'chart.js'

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler
)

export default function Dashboard() {
  // Mock data for charts
  const callVolumeData = {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    datasets: [
      {
        label: 'Incoming Calls',
        data: [120, 190, 300, 500, 200, 300, 450],
        borderColor: '#FF0000',
        backgroundColor: 'rgba(255, 0, 0, 0.1)',
        fill: true,
        tension: 0.4,
      },
      {
        label: 'Outgoing Calls',
        data: [80, 150, 250, 400, 180, 250, 380],
        borderColor: '#950101',
        backgroundColor: 'rgba(149, 1, 1, 0.1)',
        fill: true,
        tension: 0.4,
      },
    ],
  }

  const callDurationData = {
    labels: ['0-1min', '1-3min', '3-5min', '5-10min', '10+min'],
    datasets: [
      {
        label: 'Call Duration Distribution',
        data: [25, 35, 20, 15, 5],
        backgroundColor: [
          '#FF0000',
          '#950101',
          '#3D0000',
          '#FF6B6B',
          '#FFB3B3',
        ],
        borderWidth: 0,
      },
    ],
  }

  const agentPerformanceData = {
    labels: ['Agent 1', 'Agent 2', 'Agent 3', 'Agent 4', 'Agent 5'],
    datasets: [
      {
        label: 'Calls Handled',
        data: [45, 52, 38, 61, 47],
        backgroundColor: '#FF0000',
        borderRadius: 8,
      },
    ],
  }

  const callStatusData = {
    labels: ['Completed', 'In Progress', 'Failed'],
    datasets: [
      {
        data: [75, 15, 10],
        backgroundColor: ['#10B981', '#F59E0B', '#EF4444'],
        borderWidth: 0,
      },
    ],
  }

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        labels: {
          color: 'white',
          font: {
            size: 12,
          },
        },
      },
    },
    scales: {
      x: {
        ticks: {
          color: 'white',
        },
        grid: {
          color: 'rgba(255, 255, 255, 0.1)',
        },
      },
      y: {
        ticks: {
          color: 'white',
        },
        grid: {
          color: 'rgba(255, 255, 255, 0.1)',
        },
      },
    },
  }

  const doughnutOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom' as const,
        labels: {
          color: 'white',
          font: {
            size: 12,
          },
        },
      },
    },
  }

  const stats = [
    { label: 'Total Calls Today', value: '1,247', icon: Phone, change: '+12%', color: 'text-green-400' },
    { label: 'Active Agents', value: '24', icon: Users, change: '+2', color: 'text-blue-400' },
    { label: 'Avg Call Duration', value: '4m 32s', icon: Clock, change: '-8%', color: 'text-yellow-400' },
    { label: 'Success Rate', value: '94.2%', icon: CheckCircle, change: '+2.1%', color: 'text-green-400' },
  ]

  const recentActivities = [
    { type: 'success', message: 'Call completed successfully', time: '2 min ago' },
    { type: 'warning', message: 'High call volume detected', time: '5 min ago' },
    { type: 'error', message: 'Connection failed for call #1234', time: '8 min ago' },
    { type: 'success', message: 'New agent logged in', time: '12 min ago' },
    { type: 'info', message: 'System maintenance completed', time: '15 min ago' },
  ]

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'success':
        return <CheckCircle className="w-5 h-5 text-green-400" />
      case 'warning':
        return <AlertCircle className="w-5 h-5 text-yellow-400" />
      case 'error':
        return <XCircle className="w-5 h-5 text-red-400" />
      default:
        return <CheckCircle className="w-5 h-5 text-blue-400" />
    }
  }

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
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Real-Time <span className="gradient-text">Analytics</span>
          </h2>
          <p className="text-xl text-white/80 max-w-3xl mx-auto">
            Monitor your communication performance with comprehensive dashboards 
            and real-time insights powered by advanced analytics.
          </p>
        </motion.div>

        {/* Stats Cards */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -5 }}
              className="glassmorphism p-6 rounded-2xl card-hover"
            >
              <div className="flex items-center justify-between mb-4">
                <stat.icon className="w-8 h-8 text-red-400" />
                <span className={`text-sm font-medium ${stat.color}`}>
                  {stat.change}
                </span>
              </div>
              <div className="text-3xl font-bold text-white mb-2">{stat.value}</div>
              <div className="text-white/70 text-sm">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>

        {/* Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* Call Volume Trend */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
            className="glassmorphism p-6 rounded-2xl"
          >
            <h3 className="text-xl font-bold text-white mb-4 flex items-center">
              <TrendingUp className="w-5 h-5 text-red-400 mr-2" />
              Call Volume Trend
            </h3>
            <div className="h-64">
              <Line data={callVolumeData} options={chartOptions} />
            </div>
          </motion.div>

          {/* Call Duration Distribution */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            viewport={{ once: true }}
            className="glassmorphism p-6 rounded-2xl"
          >
            <h3 className="text-xl font-bold text-white mb-4 flex items-center">
              <BarChart3 className="w-5 h-5 text-red-400 mr-2" />
              Call Duration Distribution
            </h3>
            <div className="h-64">
              <Doughnut data={callDurationData} options={doughnutOptions} />
            </div>
          </motion.div>

          {/* Agent Performance */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            viewport={{ once: true }}
            className="glassmorphism p-6 rounded-2xl"
          >
            <h3 className="text-xl font-bold text-white mb-4 flex items-center">
              <Users className="w-5 h-5 text-red-400 mr-2" />
              Agent Performance
            </h3>
            <div className="h-64">
              <Bar data={agentPerformanceData} options={chartOptions} />
            </div>
          </motion.div>

          {/* Call Status Overview */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 1.0 }}
            viewport={{ once: true }}
            className="glassmorphism p-6 rounded-2xl"
          >
            <h3 className="text-xl font-bold text-white mb-4 flex items-center">
              <CheckCircle className="w-5 h-5 text-red-400 mr-2" />
              Call Status Overview
            </h3>
            <div className="h-64">
              <Doughnut data={callStatusData} options={doughnutOptions} />
            </div>
          </motion.div>
        </div>

        {/* Recent Activities */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.2 }}
          viewport={{ once: true }}
          className="glassmorphism p-6 rounded-2xl"
        >
          <h3 className="text-xl font-bold text-white mb-6">Recent Activities</h3>
          <div className="space-y-4">
            {recentActivities.map((activity, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 1.4 + index * 0.1 }}
                viewport={{ once: true }}
                className="flex items-center justify-between p-4 bg-white/5 rounded-xl"
              >
                <div className="flex items-center space-x-3">
                  {getActivityIcon(activity.type)}
                  <span className="text-white/90">{activity.message}</span>
                </div>
                <span className="text-white/60 text-sm">{activity.time}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
