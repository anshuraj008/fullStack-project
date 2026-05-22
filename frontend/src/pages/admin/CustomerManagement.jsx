import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  FiSearch, 
  FiMail,
  FiPhone,
  FiGift,
  FiMessageSquare,
  FiEye,
  FiUsers,
  FiX,
  FiLoader // Added for loading state
} from 'react-icons/fi';
import axios from 'axios'; // Import axios

// Define your API base URL
const API_URL = 'http://localhost:5000/api/admin';

const CustomerManagement = () => {
  const [customers, setCustomers] = useState([]); // Start with an empty array
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [loading, setLoading] = useState(true); // Add loading state
  const [error, setError] = useState(null); // Add error state

  // --- THIS IS NOW INTEGRATED ---
  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        setLoading(true);
        setError(null);
        // Fetch data from your backend
        const response = await axios.get(`${API_URL}/customers`);
        if (response.data.success) {
          setCustomers(response.data.data); // Set real customers
        }
      } catch (err) {
        console.error('Error fetching customers:', err);
        setError('Failed to load customers. Please try again.');
      } finally {
        setLoading(false);
      }
    };
    
    fetchCustomers();
  }, []); // Runs once on component mount

  const filteredCustomers = customers.filter(customer => {
    const name = (customer.userName || '').toLowerCase();
    const email = (customer.email || '').toLowerCase();
    const search = searchTerm.toLowerCase();
    return name.includes(search) || email.includes(search);
  });

  const viewCustomerDetails = (customer) => {
    setSelectedCustomer(customer);
    setShowDetailModal(true);
  };

  const sendEmail = (customer) => {
    window.location.href = `mailto:${customer.email}`;
  };

  // Note: This feature requires a separate Loyalty/Discount backend system
  const offerReward = (customerId) => {
    alert('Offering reward (requires loyalty backend integration)');
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
            Customer Management
          </h1>
          <p className="text-text-secondary">
            View registered customers, handle queries, and manage loyalty rewards.
          </p>
        </div>
      </div>

      {/* Stats Cards --- NOW DYNAMIC --- */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-card rounded-xl p-6 border border-border shadow-medium"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
              <FiUsers className="text-primary" size={24} />
            </div>
          </div>
          <h3 className="text-sm text-text-secondary mb-1">Total Customers</h3>
          <p className="text-3xl font-heading font-bold text-foreground">
            {loading ? <FiLoader className="animate-spin" /> : customers.length}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-card rounded-xl p-6 border border-border shadow-medium"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 rounded-lg bg-success/10 flex items-center justify-center">
              <FiGift className="text-success" size={24} />
            </div>
          </div>
          <h3 className="text-sm text-text-secondary mb-1">Loyalty Members</h3>
          <p className="text-3xl font-heading font-bold text-foreground">
            {loading ? <FiLoader className="animate-spin" /> : customers.filter(c => (c.loyaltyPoints || 0) > 500).length}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-card rounded-xl p-6 border border-border shadow-medium"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 rounded-lg bg-secondary/10 flex items-center justify-center">
              <FiMessageSquare className="text-secondary" size={24} />
            </div>
          </div>
          <h3 className="text-sm text-text-secondary mb-1">Active Queries</h3>
          {/* Note: This is still hardcoded. Requires Contact/Query system integration. */}
          <p className="text-3xl font-heading font-bold text-foreground">3</p>
        </motion.div>
      </div>

      {/* Search */}
      <div className="bg-card rounded-xl p-4 border border-border shadow-soft">
        <div className="relative">
          <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-text-secondary" size={20} />
          <input
            type="text"
            placeholder="Search customers by name or email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>
      </div>

      {/* Customers Grid --- NOW DYNAMIC --- */}
      {loading ? (
        <div className="text-center py-10">
          <FiLoader size={32} className="animate-spin text-primary mx-auto" />
          <p className="text-text-secondary mt-2">Loading customers...</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCustomers.map((customer, index) => (
            <motion.div
              key={customer._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className="bg-card rounded-xl p-6 border border-border shadow-medium hover:shadow-large transition-all duration-300"
            >
              <div className="flex items-start space-x-4 mb-4">
                <img
                  src={customer.avatar || `https://ui-avatars.com/api/?name=${(customer.userName || 'Customer').replace(' ', '+')}&background=F8BBD9&color=2D2D2D`}
                  alt={customer.userName || 'Customer'}
                  className="w-16 h-16 rounded-full border-2 border-primary"
                />
                <div className="flex-1">
                  <h3 className="text-lg font-heading font-semibold text-foreground mb-1">
                    {customer.userName || 'Unknown Customer'}
                  </h3>
                  <p className="text-sm text-text-secondary">{customer.email || 'No email'}</p>
                </div>
              </div>

              <div className="space-y-2 mb-4">
                <div className="flex justify-between text-sm">
                  <span className="text-text-secondary">Total Orders:</span>
                  <span className="font-semibold text-foreground">{customer.totalOrders || 0}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-text-secondary">Total Spent:</span>
                  <span className="font-semibold text-foreground">₹{(customer.totalSpent || 0).toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-text-secondary">Loyalty Points:</span>
                  <span className="font-semibold text-success">{customer.loyaltyPoints || 0} pts</span>
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <button
                  onClick={() => viewCustomerDetails(customer)}
                  className="flex-1 px-3 py-2 bg-primary/10 text-primary rounded-lg hover:bg-primary hover:text-primary-foreground transition-colors flex items-center justify-center space-x-2"
                >
                  <FiEye size={16} />
                  <span>View</span>
                </button>
                <button
                  onClick={() => sendEmail(customer)}
                  className="flex-1 px-3 py-2 bg-secondary/10 text-secondary rounded-lg hover:bg-secondary hover:text-secondary-foreground transition-colors flex items-center justify-center space-x-2"
                >
                  <FiMail size={16} />
                  <span>Email</span>
                </button>
                <button
                  onClick={() => offerReward(customer._id)}
                  className="px-3 py-2 bg-success/10 text-success rounded-lg hover:bg-success hover:text-success-foreground transition-colors"
                  title="Offer Reward"
                >
                  <FiGift size={16} />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {/* Customer Detail Modal (remains the same) */}
      {showDetailModal && selectedCustomer && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-card rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-xl-custom"
          >
            <div className="sticky top-0 bg-card border-b border-border p-6 flex items-center justify-between">
              <h2 className="text-2xl font-heading font-bold text-foreground">
                Customer Profile
              </h2>
              <button 
                onClick={() => setShowDetailModal(false)} 
                className="p-2 hover:bg-muted rounded-lg transition-colors"
              >
                <FiX size={24} />
              </button>
            </div>
            <div className="p-6 space-y-6">
              {/* Profile Header */}
              <div className="flex items-center space-x-4">
                <img
                  src={selectedCustomer.avatar || `https://ui-avatars.com/api/?name=${(selectedCustomer.userName || 'Customer').replace(' ', '+')}&background=F8BBD9&color=2D2D2D`}
                  alt={selectedCustomer.userName || 'Customer'}
                  className="w-20 h-20 rounded-full border-4 border-primary"
                />
                <div>
                  <h3 className="text-2xl font-heading font-bold text-foreground">
                    {selectedCustomer.userName || 'Unknown Customer'}
                  </h3>
                  <p className="text-text-secondary">{selectedCustomer.email || 'No email'}</p>
                </div>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-muted rounded-lg p-4">
                  <p className="text-sm text-text-secondary mb-1">Total Orders</p>
                  <p className="text-2xl font-heading font-bold text-foreground">
                    {selectedCustomer.totalOrders || 0}
                  </p>
                </div>
                <div className="bg-muted rounded-lg p-4">
                  <p className="text-sm text-text-secondary mb-1">Total Spent</p>
                  <p className="text-2xl font-heading font-bold text-foreground">
                    ₹{(selectedCustomer.totalSpent || 0).toLocaleString()}
                  </p>
                </div>
                <div className="bg-muted rounded-lg p-4">
                  <p className="text-sm text-text-secondary mb-1">Loyalty Points</p>
                  <p className="text-2xl font-heading font-bold text-success">
                    {selectedCustomer.loyaltyPoints || 0}
                  </p>
                </div>
                <div className="bg-muted rounded-lg p-4">
                  <p className="text-sm text-text-secondary mb-1">Member Since</p>
                  <p className="text-2xl font-heading font-bold text-foreground">
                    {selectedCustomer.joinedDate ? new Date(selectedCustomer.joinedDate).toLocaleDateString('en-US', { year: 'numeric', month: 'short' }) : 'N/A'}
                  </p>
                </div>
              </div>

              {/* Actions */}
              <div className="flex flex-col space-y-3">
                <button
                  onClick={() => sendEmail(selectedCustomer)}
                  className="w-full px-6 py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-secondary transition-colors flex items-center justify-center space-x-2"
                >
                  <FiMail size={20} />
                  <span>Send Email</span>
                </button>
                <button
                  onClick={() => offerReward(selectedCustomer._id)}
                  className="w-full px-6 py-3 bg-success text-success-foreground rounded-lg font-medium hover:bg-success/90 transition-colors flex items-center justify-center space-x-2"
                >
                  <FiGift size={20} />
                  <span>Offer Loyalty Reward</span>
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default CustomerManagement;
