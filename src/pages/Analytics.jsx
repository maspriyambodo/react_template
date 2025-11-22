import { useMemo } from 'react'
import { 
  ComposedChart, 
  Line, 
  Bar, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  ScatterChart,
  Scatter,
  ZAxis
} from 'recharts'
import Card from '../components/ui/Card'

const Analytics = () => {
  const performanceData = useMemo(() => [
    { month: 'Jan', sales: 4000, profit: 2400, expenses: 2400, customers: 240 },
    { month: 'Feb', sales: 3000, profit: 1398, expenses: 2210, customers: 221 },
    { month: 'Mar', sales: 2000, profit: 9800, expenses: 2290, customers: 229 },
    { month: 'Apr', sales: 2780, profit: 3908, expenses: 2000, customers: 200 },
    { month: 'May', sales: 1890, profit: 4800, expenses: 2181, customers: 218 },
    { month: 'Jun', sales: 2390, profit: 3800, expenses: 2500, customers: 250 },
    { month: 'Jul', sales: 3490, profit: 4300, expenses: 2100, customers: 210 },
  ], [])

  const skillData = useMemo(() => [
    { subject: 'Performance', A: 120, B: 110, fullMark: 150 },
    { subject: 'Security', A: 98, B: 130, fullMark: 150 },
    { subject: 'Scalability', A: 86, B: 130, fullMark: 150 },
    { subject: 'UX', A: 99, B: 100, fullMark: 150 },
    { subject: 'Speed', A: 85, B: 90, fullMark: 150 },
    { subject: 'Reliability', A: 65, B: 85, fullMark: 150 },
  ], [])

  const scatterData = useMemo(() => [
    { x: 100, y: 200, z: 200 },
    { x: 120, y: 100, z: 260 },
    { x: 170, y: 300, z: 400 },
    { x: 140, y: 250, z: 280 },
    { x: 150, y: 400, z: 500 },
    { x: 110, y: 280, z: 200 },
  ], [])

  return (
    <div className="space-y-6">
      
      {/* Composed Chart */}
      <Card title="Sales Performance Analysis">
        <ResponsiveContainer width="100%" height={400}>
          <ComposedChart data={performanceData}>
            <CartesianGrid strokeDasharray="3 3" className="stroke-gray-300 dark:stroke-gray-600" />
            <XAxis dataKey="month" className="text-gray-600 dark:text-gray-400" />
            <YAxis className="text-gray-600 dark:text-gray-400" />
            <Tooltip contentStyle={{ backgroundColor: 'var(--tooltip-bg)', border: 'none' }} />
            <Legend />
            <Area type="monotone" dataKey="sales" fill="#3b82f6" stroke="#3b82f6" fillOpacity={0.3} />
            <Bar dataKey="profit" barSize={20} fill="#10b981" />
            <Line type="monotone" dataKey="expenses" stroke="#ef4444" strokeWidth={2} />
          </ComposedChart>
        </ResponsiveContainer>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Radar Chart */}
        <Card title="System Performance Metrics">
          <ResponsiveContainer width="100%" height={400}>
            <RadarChart data={skillData}>
              <PolarGrid className="stroke-gray-300 dark:stroke-gray-600" />
              <PolarAngleAxis dataKey="subject" className="text-gray-600 dark:text-gray-400" />
              <PolarRadiusAxis className="text-gray-600 dark:text-gray-400" />
              <Radar name="Current" dataKey="A" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.6} />
              <Radar name="Target" dataKey="B" stroke="#10b981" fill="#10b981" fillOpacity={0.6} />
              <Legend />
            </RadarChart>
          </ResponsiveContainer>
        </Card>

        {/* Scatter Chart */}
        <Card title="Customer Distribution">
          <ResponsiveContainer width="100%" height={400}>
            <ScatterChart>
              <CartesianGrid strokeDasharray="3 3" className="stroke-gray-300 dark:stroke-gray-600" />
              <XAxis type="number" dataKey="x" name="age" className="text-gray-600 dark:text-gray-400" />
              <YAxis type="number" dataKey="y" name="spending" className="text-gray-600 dark:text-gray-400" />
              <ZAxis type="number" dataKey="z" range={[60, 400]} name="score" />
              <Tooltip cursor={{ strokeDasharray: '3 3' }} />
              <Legend />
              <Scatter name="Customers" data={scatterData} fill="#3b82f6" />
            </ScatterChart>
          </ResponsiveContainer>
        </Card>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <h3 className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Revenue</h3>
          <p className="text-3xl font-bold mt-2">$45,231</p>
          <p className="text-sm text-green-600 mt-2">+20.1% from last month</p>
        </Card>
        <Card>
          <h3 className="text-sm font-medium text-gray-600 dark:text-gray-400">Active Users</h3>
          <p className="text-3xl font-bold mt-2">2,350</p>
          <p className="text-sm text-green-600 mt-2">+15.3% from last month</p>
        </Card>
        <Card>
          <h3 className="text-sm font-medium text-gray-600 dark:text-gray-400">Conversion Rate</h3>
          <p className="text-3xl font-bold mt-2">3.24%</p>
          <p className="text-sm text-red-600 mt-2">-2.5% from last month</p>
        </Card>
      </div>
    </div>
  )
}

export default Analytics
