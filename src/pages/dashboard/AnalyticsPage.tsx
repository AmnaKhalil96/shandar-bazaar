
import { useState } from 'react';
import { BarChart, Bar, LineChart, Line, AreaChart, Area, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

// Sample data
const monthlyRevenue = [
  { name: 'Jan', revenue: 4500 },
  { name: 'Feb', revenue: 5200 },
  { name: 'Mar', revenue: 4800 },
  { name: 'Apr', revenue: 6000 },
  { name: 'May', revenue: 7500 },
  { name: 'Jun', revenue: 8200 },
  { name: 'Jul', revenue: 9800 },
  { name: 'Aug', revenue: 10500 },
  { name: 'Sep', revenue: 11200 },
  { name: 'Oct', revenue: 10800 },
  { name: 'Nov', revenue: 12000 },
  { name: 'Dec', revenue: 13500 },
];

const salesByCategory = [
  { name: 'Electronics', value: 35 },
  { name: 'Fashion', value: 25 },
  { name: 'Home & Living', value: 20 },
  { name: 'Beauty', value: 10 },
  { name: 'Sports', value: 5 },
  { name: 'Books', value: 5 },
];

const userAcquisition = [
  { name: 'Jan', new: 120, returning: 80 },
  { name: 'Feb', new: 140, returning: 90 },
  { name: 'Mar', new: 130, returning: 100 },
  { name: 'Apr', new: 170, returning: 110 },
  { name: 'May', new: 190, returning: 120 },
  { name: 'Jun', new: 210, returning: 130 },
  { name: 'Jul', new: 230, returning: 150 },
  { name: 'Aug', new: 250, returning: 170 },
];

const conversionRates = [
  { name: 'Jan', rate: 2.4 },
  { name: 'Feb', rate: 2.8 },
  { name: 'Mar', rate: 2.3 },
  { name: 'Apr', rate: 3.1 },
  { name: 'May', rate: 3.6 },
  { name: 'Jun', rate: 3.8 },
  { name: 'Jul', rate: 4.1 },
  { name: 'Aug', rate: 4.5 },
];

const COLORS = ['#3b82f6', '#ef4444', '#10b981', '#f59e0b', '#8b5cf6', '#ec4899'];

export default function AnalyticsPage() {
  const [timeframe, setTimeframe] = useState('yearly');
  
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Analytics</h2>
        <select 
          className="h-9 rounded-md border border-input bg-background px-3 py-1 text-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
          value={timeframe}
          onChange={(e) => setTimeframe(e.target.value)}
        >
          <option value="daily">Daily</option>
          <option value="weekly">Weekly</option>
          <option value="monthly">Monthly</option>
          <option value="yearly">Yearly</option>
        </select>
      </div>
      
      <div className="grid gap-6 md:grid-cols-2">
        {/* Monthly Revenue */}
        <div className="rounded-lg border bg-card p-6">
          <h3 className="text-lg font-medium mb-4">Revenue</h3>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart
                data={monthlyRevenue}
                margin={{ top: 5, right: 20, left: 20, bottom: 5 }}
              >
                <defs>
                  <linearGradient id="revenueGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                <XAxis dataKey="name" stroke="hsl(var(--muted-foreground))" />
                <YAxis 
                  stroke="hsl(var(--muted-foreground))"
                  tickFormatter={(value) => `$${value}`}
                />
                <Tooltip 
                  formatter={(value) => [`$${value}`, 'Revenue']}
                  contentStyle={{ 
                    backgroundColor: 'hsl(var(--card))',
                    border: '1px solid hsl(var(--border))'
                  }}
                />
                <Area 
                  type="monotone" 
                  dataKey="revenue" 
                  stroke="hsl(var(--primary))" 
                  fillOpacity={1} 
                  fill="url(#revenueGradient)" 
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
        
        {/* Sales by Category */}
        <div className="rounded-lg border bg-card p-6">
          <h3 className="text-lg font-medium mb-4">Sales by Category</h3>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={salesByCategory}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={90}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                >
                  {salesByCategory.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip 
                  formatter={(value) => [`${value}%`, 'Percentage']}
                  contentStyle={{ 
                    backgroundColor: 'hsl(var(--card))',
                    border: '1px solid hsl(var(--border))'
                  }}
                />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
        
        {/* User Acquisition */}
        <div className="rounded-lg border bg-card p-6">
          <h3 className="text-lg font-medium mb-4">User Acquisition</h3>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={userAcquisition}
                margin={{ top: 5, right: 20, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                <XAxis dataKey="name" stroke="hsl(var(--muted-foreground))" />
                <YAxis stroke="hsl(var(--muted-foreground))" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'hsl(var(--card))',
                    border: '1px solid hsl(var(--border))'
                  }}
                />
                <Legend />
                <Bar dataKey="new" name="New Users" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                <Bar dataKey="returning" name="Returning Users" fill="#10b981" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
        
        {/* Conversion Rate */}
        <div className="rounded-lg border bg-card p-6">
          <h3 className="text-lg font-medium mb-4">Conversion Rate</h3>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={conversionRates}
                margin={{ top: 5, right: 20, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                <XAxis dataKey="name" stroke="hsl(var(--muted-foreground))" />
                <YAxis 
                  stroke="hsl(var(--muted-foreground))"
                  tickFormatter={(value) => `${value}%`}
                />
                <Tooltip 
                  formatter={(value) => [`${value}%`, 'Conversion Rate']}
                  contentStyle={{ 
                    backgroundColor: 'hsl(var(--card))',
                    border: '1px solid hsl(var(--border))'
                  }}
                />
                <Line 
                  type="monotone" 
                  dataKey="rate" 
                  stroke="#ef4444" 
                  activeDot={{ r: 8 }} 
                  strokeWidth={2}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}
