
import { CreditCard, DollarSign, Package, ShoppingCart, TrendingUp, Users } from 'lucide-react';
import { products } from '@/lib/data';
import { useState } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';

const salesData = [
  { name: 'Jan', total: 5400 },
  { name: 'Feb', total: 6800 },
  { name: 'Mar', total: 5700 },
  { name: 'Apr', total: 7200 },
  { name: 'May', total: 9600 },
  { name: 'Jun', total: 8200 },
  { name: 'Jul', total: 10400 },
  { name: 'Aug', total: 11200 },
];

const topProducts = products.slice(0, 5).map(product => ({
  name: product.name.length > 20 ? `${product.name.substring(0, 20)}...` : product.name,
  total: Math.floor(Math.random() * 500) + 100
}));

const DashboardOverview = () => {
  const [period, setPeriod] = useState('monthly');
  
  // Calculate total revenue
  const totalRevenue = salesData.reduce((acc, curr) => acc + curr.total, 0);
  
  // Calculate mock statistics
  const stats = [
    {
      title: "Total Revenue",
      value: `$${totalRevenue.toLocaleString()}`,
      icon: DollarSign,
      change: "+12.5%",
      trend: "up",
    },
    {
      title: "Orders",
      value: "1,284",
      icon: ShoppingCart,
      change: "+8.2%",
      trend: "up",
    },
    {
      title: "Products",
      value: products.length.toString(),
      icon: Package,
      change: "+2.4%",
      trend: "up",
    },
    {
      title: "Customers",
      value: "921",
      icon: Users,
      change: "+4.5%",
      trend: "up",
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
        <div className="flex items-center gap-2">
          <select 
            className="h-9 rounded-md border border-input bg-background px-3 py-1 text-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
            value={period}
            onChange={(e) => setPeriod(e.target.value)}
          >
            <option value="daily">Daily</option>
            <option value="weekly">Weekly</option>
            <option value="monthly">Monthly</option>
            <option value="yearly">Yearly</option>
          </select>
        </div>
      </div>
      
      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, index) => (
          <div key={index} className="rounded-lg border bg-card p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  {stat.title}
                </p>
                <h3 className="text-2xl font-bold mt-1">{stat.value}</h3>
              </div>
              <div className={`rounded-md p-2 ${
                stat.trend === "up" ? "bg-green-100" : "bg-red-100"
              }`}>
                <stat.icon className={`h-5 w-5 ${
                  stat.trend === "up" ? "text-green-600" : "text-red-600"
                }`} />
              </div>
            </div>
            <div className="flex items-center gap-1 mt-4">
              <TrendingUp className={`h-4 w-4 ${
                stat.trend === "up" ? "text-green-600" : "text-red-600"
              }`} />
              <span className={`text-sm font-medium ${
                stat.trend === "up" ? "text-green-600" : "text-red-600"
              }`}>
                {stat.change}
              </span>
              <span className="text-sm text-muted-foreground">from last month</span>
            </div>
          </div>
        ))}
      </div>
      
      {/* Charts */}
      <div className="grid gap-4 md:grid-cols-2">
        <div className="rounded-lg border bg-card p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-medium">Sales Overview</h3>
            <CreditCard className="h-4 w-4 text-muted-foreground" />
          </div>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart
                data={salesData}
                margin={{
                  top: 5,
                  right: 10,
                  left: 10,
                  bottom: 5,
                }}
              >
                <defs>
                  <linearGradient id="colorTotal" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <XAxis 
                  dataKey="name" 
                  stroke="hsl(var(--muted-foreground))"
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                />
                <YAxis
                  stroke="hsl(var(--muted-foreground))"
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                  tickFormatter={(value) => `$${value}`}
                />
                <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                <Tooltip
                  content={({ active, payload }) => {
                    if (active && payload && payload.length) {
                      return (
                        <div className="rounded-lg border bg-background p-2 shadow-sm">
                          <div className="grid grid-cols-2 gap-2">
                            <div className="flex flex-col">
                              <span className="text-[0.70rem] uppercase text-muted-foreground">
                                {payload[0].payload.name}
                              </span>
                              <span className="font-bold text-muted-foreground">
                                ${payload[0].value}
                              </span>
                            </div>
                          </div>
                        </div>
                      )
                    }
                    return null
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="total"
                  stroke="hsl(var(--primary))"
                  strokeWidth={2}
                  fillOpacity={1}
                  fill="url(#colorTotal)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
        
        <div className="rounded-lg border bg-card p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-medium">Top Products</h3>
            <Package className="h-4 w-4 text-muted-foreground" />
          </div>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart 
                data={topProducts}
                margin={{
                  top: 5,
                  right: 10,
                  left: 10,
                  bottom: 30,
                }}
              >
                <XAxis 
                  dataKey="name" 
                  stroke="hsl(var(--muted-foreground))" 
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                  angle={-45}
                  textAnchor="end"
                />
                <YAxis
                  stroke="hsl(var(--muted-foreground))"
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                  tickFormatter={(value) => `$${value}`}
                />
                <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                <Tooltip
                  content={({ active, payload }) => {
                    if (active && payload && payload.length) {
                      return (
                        <div className="rounded-lg border bg-background p-2 shadow-sm">
                          <div className="grid grid-cols-2 gap-2">
                            <div className="flex flex-col">
                              <span className="text-[0.70rem] uppercase text-muted-foreground">
                                {payload[0].payload.name}
                              </span>
                              <span className="font-bold text-muted-foreground">
                                ${payload[0].value}
                              </span>
                            </div>
                          </div>
                        </div>
                      )
                    }
                    return null
                  }}
                />
                <Bar 
                  dataKey="total" 
                  fill="hsl(var(--primary))" 
                  radius={[4, 4, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
      
      {/* Recent Orders */}
      <div className="rounded-lg border bg-card">
        <div className="p-6">
          <h3 className="text-lg font-medium">Recent Orders</h3>
        </div>
        <div className="overflow-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-muted/50 text-left">
                <th className="font-medium p-4">Order ID</th>
                <th className="font-medium p-4">Customer</th>
                <th className="font-medium p-4">Product</th>
                <th className="font-medium p-4">Date</th>
                <th className="font-medium p-4">Status</th>
                <th className="font-medium p-4 text-right">Amount</th>
              </tr>
            </thead>
            <tbody>
              {[...Array(5)].map((_, i) => {
                const product = products[i];
                const statuses = ['Processing', 'Shipped', 'Delivered', 'Pending'];
                const randomStatus = statuses[Math.floor(Math.random() * statuses.length)];
                const statusColor = {
                  'Processing': 'bg-blue-100 text-blue-800',
                  'Shipped': 'bg-yellow-100 text-yellow-800',
                  'Delivered': 'bg-green-100 text-green-800',
                  'Pending': 'bg-orange-100 text-orange-800'
                }[randomStatus];
                
                return (
                  <tr key={i} className="border-t">
                    <td className="p-4 align-middle">#ORD-{Math.floor(10000 + Math.random() * 90000)}</td>
                    <td className="p-4 align-middle">Customer {i + 1}</td>
                    <td className="p-4 align-middle">
                      {product.name.length > 20 ? `${product.name.substring(0, 20)}...` : product.name}
                    </td>
                    <td className="p-4 align-middle">{new Date().toLocaleDateString()}</td>
                    <td className="p-4 align-middle">
                      <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${statusColor}`}>
                        {randomStatus}
                      </span>
                    </td>
                    <td className="p-4 align-middle text-right">${(product.price).toFixed(2)}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default DashboardOverview;
