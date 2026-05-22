import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  FiSearch, 
  FiFilter, 
  FiEye,
  FiTruck,
  FiPackage,
  FiCheck,
  FiX,
  FiLoader // Added for loading
} from 'react-icons/fi';
import { format } from 'date-fns';
import axios from 'axios'; // Import axios

// Define your API base URL
const API_URL = 'http://localhost:5000/api/admin';

const OrderManagement = () => {
  const [orders, setOrders] = useState([]); // Will hold all orders from API
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedStatus, setSelectedStatus] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [showDetailModal, setShowDetailModal] = useState(false);

  const statuses = [
    'All',
    'Pending Payment',
    'Confirmed',
    'Processing',
    'Baking',
    'Out for Delivery',
    'Completed',
    'Cancelled'
  ];

  // --- INTEGRATED: Fetch orders from backend ---
  useEffect(() => {
    const fetchOrders = async () => {
      setLoading(true);
      setError(null);
      try {
        // Call the backend with the selected status filter
        const response = await axios.get(`${API_URL}/orders?status=${selectedStatus}`);
        if (response.data.success) {
          setOrders(response.data.data);
        }
      } catch (err) {
        console.error('Error fetching orders:', err);
        setError('Failed to load orders. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [selectedStatus]); // Re-fetch orders every time the status filter changes

  // --- INTEGRATED: Update status on backend ---
  const updateOrderStatus = async (orderId, newStatus) => {
    try {
      // Optimistic update: Update frontend state immediately
      const updatedOrders = orders.map(order => 
        order._id === orderId ? { ...order, status: newStatus } : order
      );
      setOrders(updatedOrders);

      if (selectedOrder && selectedOrder._id === orderId) {
        setSelectedOrder({ ...selectedOrder, status: newStatus });
      }

      // Call backend to persist the change
      await axios.patch(`${API_URL}/orders/${orderId}/status`, { status: newStatus });
      
    } catch (err) {
      console.error('Error updating order status:', err);
      // If error, revert state (or refetch all)
      // For simplicity, we can alert the user
      alert('Failed to update status. Please refresh and try again.');
    }
  };

  const getStatusColor = (status) => {
    const colors = {
      'Pending Payment': 'bg-warning/20 text-warning-foreground',
      'Confirmed': 'bg-success/20 text-success-foreground',
      'Processing': 'bg-primary/20 text-primary-foreground',
      'Baking': 'bg-secondary/20 text-secondary-foreground',
      'Out for Delivery': 'bg-accent/20 text-accent-foreground',
      'Completed': 'bg-gray-500/20 text-gray-500', // Changed for visibility
      'Cancelled': 'bg-destructive/20 text-destructive-foreground'
    };
    return colors[status] || 'bg-muted text-muted-foreground';
  };

  // Client-side search (on the already status-filtered list)
  const filteredOrders = orders.filter(order => {
    const orderId = order._id || ''; // Ensure _id is a string
    const userName = order.userId?.userName || '';
    
    return (
      userName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      orderId.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  const viewOrderDetails = (order) => {
    setSelectedOrder(order);
    setShowDetailModal(true);
  };

  if (error) {
    return <div className="p-6 text-center text-red-500">{error}</div>;
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h1 className="text-3xl font-heading font-bold text-foreground mb-2">
            Order Management
          </h1>
          <p className="text-text-secondary">
            View and manage incoming orders, assign delivery staff, and update statuses.
          </p>
        </div>
        <div className="mt-4 lg:mt-0 flex items-center space-x-3">
          <span className="px-4 py-2 bg-card border border-border rounded-lg text-sm">
            Total Orders: <strong>{loading ? '...' : orders.length}</strong>
          </span>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-card rounded-xl p-4 border border-border shadow-soft">
        <div className="flex flex-col lg:flex-row lg:items-center space-y-4 lg:space-y-0 lg:space-x-4">
          <div className="flex-1 relative">
            <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-text-secondary" size={20} />
            <input
              type="text"
              placeholder="Search by customer name or order ID..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
          <div className="flex items-center space-x-2">
            <FiFilter className="text-text-secondary" size={20} />
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="px-4 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            >
              {statuses.map(status => (
                <option key={status} value={status}>{status}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Status Summary Cards (now dynamic) */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {['Confirmed', 'Processing', 'Baking', 'Out for Delivery'].map((status, index) => {
          const count = loading ? '-' : orders.filter(o => o.status === status).length;
          return (
            <motion.div
              key={status}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className="bg-card rounded-lg p-4 border border-border shadow-soft"
            >
              <p className="text-sm text-text-secondary mb-1">{status}</p>
              <p className="text-2xl font-heading font-bold text-foreground">{count}</p>
            </motion.div>
          );
        })}
      </div>

      {/* Orders Table (now dynamic) */}
      <div className="bg-card rounded-xl border border-border shadow-medium overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-muted">
              <tr>
                <th className="text-left py-4 px-6 text-sm font-semibold text-text-secondary">Order ID</th>
                <th className="text-left py-4 px-6 text-sm font-semibold text-text-secondary">Customer</th>
                <th className="text-left py-4 px-6 text-sm font-semibold text-text-secondary">Product</th>
                <th className="text-left py-4 px-6 text-sm font-semibold text-text-secondary">Amount</th>
                <th className="text-left py-4 px-6 text-sm font-semibold text-text-secondary">Delivery</th>
                <th className="text-left py-4 px-6 text-sm font-semibold text-text-secondary">Status</th>
                <th className="text-left py-4 px-6 text-sm font-semibold text-text-secondary">Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr><td colSpan="7" className="text-center py-10"><FiLoader size={24} className="animate-spin text-primary mx-auto" /></td></tr>
              ) : filteredOrders.length === 0 ? (
                <tr><td colSpan="7" className="text-center py-10 text-text-secondary">No orders found.</td></tr>
              ) : (
                filteredOrders.map((order) => (
                  <tr key={order._id} className="border-t border-border hover:bg-muted/50 transition-colors">
                    <td className="py-4 px-6 text-sm font-mono text-foreground">#{order._id.toString().slice(-6)}</td>
                    <td className="py-4 px-6">
                      <div>
                        <p className="text-sm font-medium text-foreground">{order.userId?.userName || 'N/A'}</p>
                        <p className="text-xs text-text-secondary">{order.userId?.email || 'N/A'}</p>
                      </div>
                    </td>
                    <td className="py-4 px-6 text-sm text-text-secondary">
                      {order.item.type === 'Pre-designed' 
                        ? (order.item.productId?.name || 'Pre-designed Cake')
                        : `Custom ${order.item.customizations?.flavor || ''} Cake`}
                    </td>
                    <td className="py-4 px-6 text-sm font-semibold text-foreground">₹{order.totalPrice}</td>
                    <td className="py-4 px-6">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                        order.deliveryInfo.deliveryType === 'Delivery' 
                          ? 'bg-primary/20 text-primary-foreground' 
                          : 'bg-accent/20 text-accent-foreground'
                      }`}>
                        {order.deliveryInfo.deliveryType}
                      </span>
                    </td>
                    <td className="py-4 px-6">
                      <select
                        value={order.status}
                        onChange={(e) => updateOrderStatus(order._id, e.target.value)}
                        className={`px-3 py-1 rounded-full text-xs font-medium border-0 cursor-pointer ${getStatusColor(order.status)}`}
                      >
                        {statuses.filter(s => s !== 'All').map(status => (
                          <option key={status} value={status}>{status}</option>
                        ))}
                      </select>
                    </td>
                    <td className="py-4 px-6">
                      <button
                        onClick={() => viewOrderDetails(order)}
                        className="p-2 text-primary hover:bg-primary/10 rounded-lg transition-colors"
                        title="View Details"
                      >
                        <FiEye size={18} />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Order Detail Modal */}
      {showDetailModal && selectedOrder && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-card rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-xl-custom"
          >
            <div className="sticky top-0 bg-card border-b border-border p-6 flex items-center justify-between">
              <h2 className="text-2xl font-heading font-bold text-foreground">
                Order Details - #{selectedOrder._id.toString().slice(-6)}
              </h2>
              <button 
                onClick={() => setShowDetailModal(false)} 
                className="p-2 hover:bg-muted rounded-lg transition-colors"
              >
                <FiX size={24} />
              </button>
            </div>
            <div className="p-6 space-y-6">
              {/* Customer Info */}
              <div>
                <h3 className="text-lg font-semibold text-foreground mb-3">Customer Information</h3>
                <div className="bg-muted rounded-lg p-4 space-y-2">
                  <p className="text-sm"><strong>Name:</strong> {selectedOrder.userId?.userName || 'N/A'}</p>
                  <p className="text-sm"><strong>Email:</strong> {selectedOrder.userId?.email || 'N/A'}</p>
                </div>
              </div>

              {/* Order Details */}
              <div>
                <h3 className="text-lg font-semibold text-foreground mb-3">Order Details</h3>
                <div className="bg-muted rounded-lg p-4 space-y-2">
                  <p className="text-sm"><strong>Type:</strong> {selectedOrder.item.type}</p>
                  {selectedOrder.item.type === 'Pre-designed' && (
                    <p className="text-sm"><strong>Product:</strong> {selectedOrder.item.productId?.name || 'N/A'}</p>
                  )}
                  <p className="text-sm"><strong>Flavor:</strong> {selectedOrder.item.customizations?.flavor}</p>
                  <p className="text-sm"><strong>Size:</strong> {selectedOrder.item.customizations?.size}</p>
                  {selectedOrder.item.customizations?.layers && (
                    <p className="text-sm"><strong>Layers:</strong> {selectedOrder.item.customizations.layers}</p>
                  )}
                  {selectedOrder.item.customizations?.toppings && (
                    <p className="text-sm"><strong>Toppings:</strong> {selectedOrder.item.customizations.toppings.join(', ')}</p>
                  )}
                  {selectedOrder.item.customizations?.text && (
                    <p className="text-sm"><strong>Text:</strong> {selectedOrder.item.customizations.text}</p>
                  )}
                  <p className="text-sm"><strong>Total Price:</strong> ₹{selectedOrder.totalPrice}</p>
                </div>
              </div>

              {/* Delivery Info */}
              <div>
                <h3 className="text-lg font-semibold text-foreground mb-3">Delivery Information</h3>
                <div className="bg-muted rounded-lg p-4 space-y-2">
                  <p className="text-sm"><strong>Type:</strong> {selectedOrder.deliveryInfo.deliveryType}</p>
                  {selectedOrder.deliveryInfo.address && (
                    <p className="text-sm"><strong>Address:</strong> {selectedOrder.deliveryInfo.address}</p>
                  )}
                  <p className="text-sm"><strong>Scheduled Date:</strong> {format(new Date(selectedOrder.deliveryInfo.scheduledDate), 'PPP')}</p>
                  <p className="text-sm"><strong>Time Slot:</strong> {selectedOrder.deliveryInfo.timeSlot}</p>
                  <p className="text-sm"><strong>Assigned Staff:</strong> {selectedOrder.deliveryInfo.assignedStaff?.userName || 'Not Assigned'}</p>
                </div>
              </div>

              {/* Status Update */}
              <div>
                <h3 className="text-lg font-semibold text-foreground mb-3">Update Status</h3>
                <div className="flex flex-wrap gap-2">
                  {statuses.filter(s => s !== 'All').map(status => (
                    <button
                      key={status}
                      onClick={() => updateOrderStatus(selectedOrder._id, status)}
                      className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                        selectedOrder.status === status
                          ? getStatusColor(status)
                          : 'bg-muted text-text-secondary hover:bg-muted/80'
                      }`}
                    >
                      {status}
                    </button>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center space-x-3 pt-4">
                <button className="flex-1 px-6 py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-secondary transition-colors flex items-center justify-center space-x-2">
                  <FiTruck size={20} />
                  <span>Assign Delivery</span>
                </button>
                <button 
                  onClick={() => setShowDetailModal(false)}
                  className="flex-1 px-6 py-3 bg-muted text-foreground rounded-lg font-medium hover:bg-muted/80"
                >
                  Close
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default OrderManagement;
