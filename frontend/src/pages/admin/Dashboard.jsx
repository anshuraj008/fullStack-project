import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  FiShoppingCart, 
  FiDollarSign, 
  FiUsers, 
  FiPackage,
  FiTrendingUp,
  FiCalendar
} from 'react-icons/fi';
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';
import axios from 'axios';

// --- Define your API base URL ---
const API_URL = 'http://localhost:5000/api/admin';

const Dashboard = () => {
  const [stats, setStats] = useState({
    totalOrders: 0,
    totalRevenue: 0,
    totalCustomers: 0,
    totalProducts: 0
  });
  const [loadingStats, setLoadingStats] = useState(true);
  const [loadingCharts, setLoadingCharts] = useState(true);
  const [loadingOrders, setLoadingOrders] = useState(true);
  const [timeRange, setTimeRange] = useState('today');

  // --- New state variables for live data ---
  const [salesData, setSalesData] = useState([]);
  const [categoryData, setCategoryData] = useState([]);
  const [recentOrders, setRecentOrders] = useState([]);

  // --- Updated useEffect to fetch all data ---
  useEffect(() => {
    fetchDashboardStats(timeRange);
  }, [timeRange]);

  useEffect(() => {
    // Fetch data that doesn't depend on timeRange
    fetchChartData();
    fetchRecentOrders();
  }, []); // Run only once on component load

  // --- Updated fetch function for Stat Cards ---
  const fetchDashboardStats = async (period) => {
    setLoadingStats(true);
    try {
      const response = await axios.get(`${API_URL}/dashboard/stats?period=${period}`);
      if (response.data.success) {
        setStats(response.data.data);
      }
    } catch (error) {
      console.error('Error fetching dashboard stats:', error);
    } finally {
      setLoadingStats(false);
    }
  };

  // --- New fetch functions for Charts and Table ---
  const fetchChartData = async () => {
    setLoadingCharts(true);
    try {
        // Fetch both sets of chart data in parallel
        const [salesRes, categoryRes] = await Promise.all([
            axios.get(`${API_URL}/dashboard/sales-analytics`),
            axios.get(`${API_URL}/dashboard/category-sales`)
        ]);

        if (salesRes.data.success) {
            setSalesData(salesRes.data.data);
        }
        if (categoryRes.data.success) {
            setCategoryData(categoryRes.data.data);
        }
    } catch (error) {
        console.error('Error fetching chart data:', error);
    } finally {
        setLoadingCharts(false);
    }
  };

  const fetchRecentOrders = async () => {
    setLoadingOrders(true);
    try {
      // Use the 'limit' param we added to the backend
      const response = await axios.get(`${API_URL}/orders?limit=5`);
      if (response.data.success) {
        setRecentOrders(response.data.data);
      }
    } catch (error) {
      console.error('Error fetching recent orders:', error);
    } finally {
      setLoadingOrders(false);
    }
  };

  const StatCard = ({ icon: Icon, title, value, change, color, loading }) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-card rounded-xl p-6 border border-border shadow-medium hover:shadow-large transition-all duration-300"
    >
      <div className="flex items-center justify-between mb-4">
        <div className={`w-12 h-12 rounded-lg bg-${color}/10 flex items-center justify-center`}>
          <Icon className={`text-${color}`} size={24} />
        </div>
        {change && (
          <div className="flex items-center space-x-1 text-success text-sm font-medium">
            <FiTrendingUp size={16} />
            <span>{change}</span>
          </div>
        )}
      </div>
      <h3 className="text-sm text-text-secondary mb-1">{title}</h3>
      <p className="text-3xl font-heading font-bold text-foreground">
        {loading ? '...' : value}
      </p>
    </motion.div>
  );

  const periodLabel = timeRange.charAt(0).toUpperCase() + timeRange.slice(1);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h1 className="text-3xl font-heading font-bold text-foreground mb-2">
            Dashboard Overview
          </h1>
          <p className="text-text-secondary">
            Welcome back! Here's what's happening with your bakery.
          </p>
        </div>
        <div className="mt-4 lg:mt-0 flex items-center space-x-3">
          <select
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value)}
            className="px-4 py-2 bg-card border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
          >
            <option value="today">Today</option>
            <option value="week">This Week</option>
            <option value="month">This Month</option>
          </select>
          <button className="px-4 py-2 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-secondary transition-colors flex items-center space-x-2">
            <FiCalendar size={18} />
            <span>Custom Range</span>
          </button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          icon={FiShoppingCart}
          title={`Orders ${periodLabel}`}
          value={stats.totalOrders}
          change="+12%" // Static for now
          color="primary"
          loading={loadingStats}
        />
        <StatCard
          icon={FiDollarSign}
          title={`Revenue ${periodLabel}`}
          value={`₹${stats?.totalRevenue?.toLocaleString() ?? '0'}`}
          change="+8%" // Static for now
          color="success"
          loading={loadingStats}
        />
        <StatCard
          icon={FiUsers}
          title="Total Customers"
          value={stats.totalCustomers}
          change="+23" // Static for now
          color="secondary"
          loading={loadingStats}
        />
        <StatCard
          icon={FiPackage}
          title="Total Products"
          value={stats.totalProducts}
          color="warning"
          loading={loadingStats}
        />
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Sales Chart */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-card rounded-xl p-6 border border-border shadow-medium"
        >
          <h2 className="text-xl font-heading font-semibold mb-4 text-foreground">
            Sales & Orders (Last 7 Days)
          </h2>
          {loadingCharts ? <p>Loading chart data...</p> : (
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={salesData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#F0E6ED" />
                <XAxis dataKey="name" stroke="#6B6B6B" />
                <YAxis stroke="#6B6B6B" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#F9F7F8', 
                    border: '1px solid #F0E6ED',
                    borderRadius: '8px'
                  }}
                />
                <Legend />
                <Line 
                  type="monotone" 
                  dataKey="sales" 
                  stroke="#F8BBD9" 
                  strokeWidth={2}
                  name="Sales (₹)"
                />
                <Line 
                  type="monotone" 
                  dataKey="orders" 
                  stroke="#E8A5C8" 
                  strokeWidth={2}
                  name="Orders"
                />
              </LineChart>
            </ResponsiveContainer>
          )}
        </motion.div>

        {/* Category Distribution */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-card rounded-xl p-6 border border-border shadow-medium"
        >
          <h2 className="text-xl font-heading font-semibold mb-4 text-foreground">
            Sales by Category
          </h2>
          {loadingCharts ? <p>Loading chart data...</p> : (
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={categoryData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {categoryData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          )}
        </motion.div>
      </div>

      {/* Recent Orders */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="bg-card rounded-xl p-6 border border-border shadow-medium"
      >
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-heading font-semibold text-foreground">
            Recent Orders
          </h2>
          <button className="text-primary hover:text-secondary text-sm font-medium">
            View All
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left py-3 px-4 text-sm font-semibold text-text-secondary">Order ID</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-text-secondary">Customer</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-text-secondary">Product</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-text-secondary">Amount</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-text-secondary">Status</th>
              </tr>
            </thead>
            <tbody>
              {/* --- THIS SECTION IS NOW LIVE --- */}
              {loadingOrders ? (
                <tr><td colSpan="5" className="text-center py-4">Loading recent orders...</td></tr>
              ) : recentOrders.length === 0 ? (
                <tr><td colSpan="5" className="text-center py-4">No recent orders found.</td></tr>
              ) : (
                recentOrders.map((order) => (
                  <tr key={order._id} className="border-b border-border hover:bg-muted/50 transition-colors">
                    <td className="py-3 px-4 text-sm font-mono text-foreground">#{order._id.toString().slice(-6)}</td>
                    <td className="py-3 px-4 text-sm text-foreground">{order.userId ? order.userId.userName : 'N/A'}</td>
                    <td className="py-3 px-4 text-sm text-text-secondary">{order.item.type} Cake</td>
                    <td className="py-3 px-4 text-sm font-semibold text-foreground">₹{order.totalPrice.toLocaleString()}</td>
                    <td className="py-3 px-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                        order.status === 'Processing' ? 'bg-warning/20 text-warning-foreground' :
                        order.status === 'Baking' ? 'bg-primary/20 text-primary-foreground' :
                        order.status === 'Confirmed' ? 'bg-success/20 text-success-foreground' :
                        order.status === 'Out for Delivery' ? 'bg-blue-500/20 text-blue-500' :
                        order.status === 'Completed' ? 'bg-gray-500/20 text-gray-500' :
                        'bg-error/20 text-error-foreground' // for Cancelled
                      }`}>
                        {order.status}
                      </span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </motion.div>
    </div>
  );
};

export default Dashboard;
