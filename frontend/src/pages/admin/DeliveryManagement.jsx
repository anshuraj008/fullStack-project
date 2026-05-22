import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  FiTruck,
  FiMapPin,
  FiClock,
  FiUser,
  FiPhone,
  FiCheckCircle,
  FiAlertCircle,
  FiEdit2,
  FiPlus,
  FiLoader
} from 'react-icons/fi';
import axios from 'axios'; // Import axios

// Define your API base URL
const API_URL = 'http://localhost:5000/api/admin';

const DeliveryManagement = () => {
  const [deliveries, setDeliveries] = useState([]);
  const [deliveryStaff, setDeliveryStaff] = useState([]);
  const [zones, setZones] = useState([]);
  const [selectedTab, setSelectedTab] = useState('active');
  const [loading, setLoading] = useState(true);

  // Fetch all data on component mount
  useEffect(() => {
    fetchActiveDeliveries();
    fetchDeliveryStaff();
    fetchDeliveryZones();
  }, []);

  const fetchActiveDeliveries = async () => {
    try {
      setLoading(true);
      // Fetch only orders that are relevant for active delivery
      const response = await axios.get(`${API_URL}/orders?status=Assigned,Out for Delivery`);
      if (response.data.success) {
        setDeliveries(response.data.data);
      }
    } catch (err) {
      console.error("Error fetching deliveries:", err);
    } finally {
      setLoading(false);
    }
  };

  const fetchDeliveryStaff = async () => {
    try {
      const response = await axios.get(`${API_URL}/staff`);
      if (response.data.success) {
        setDeliveryStaff(response.data.data);
      }
    } catch (err) {
      console.error("Error fetching staff:", err);
    }
  };

  const fetchDeliveryZones = async () => {
    try {
      const response = await axios.get(`${API_URL}/delivery-zones`);
      if (response.data.success) {
        setZones(response.data.data);
      }
    } catch (err) {
      console.error("Error fetching zones:", err);
    }
  };

  // Function to call the backend to update order status
  const updateDeliveryStatus = async (deliveryId, newStatus) => {
    try {
      // Optimistic update: Update local state first for a snappy UI
      setDeliveries(deliveries.map(d =>
        d._id === deliveryId ? { ...d, status: newStatus } : d
      ));
      
      // Call the backend to persist the change
      await axios.patch(`${API_URL}/orders/${deliveryId}/status`, { status: newStatus });
    } catch (err) {
      console.error("Error updating status:", err);
      // Revert state if API call fails (or refetch)
      fetchActiveDeliveries();
    }
  };

  const getStatusColor = (status) => {
    const colors = {
      'Assigned': 'bg-warning/20 text-warning-foreground',
      'Out for Delivery': 'bg-primary/20 text-primary-foreground',
      'Delivered': 'bg-success/20 text-success-foreground',
      'Failed': 'bg-destructive/20 text-destructive-foreground',
      'Completed': 'bg-success/20 text-success-foreground',
      'Processing': 'bg-indigo-500/20 text-indigo-500',
      'Baking': 'bg-purple-500/20 text-purple-500',
      'Confirmed': 'bg-blue-500/20 text-blue-500',
    };
    return colors[status] || 'bg-muted text-muted-foreground';
  };

  // Helper to format date
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      day: '2-digit',
      month: 'short',
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h1 className="text-3xl font-heading font-bold text-foreground mb-2">
            Delivery Management
          </h1>
          <p className="text-text-secondary">
            Manage delivery staff, zones, and real-time tracking.
          </p>
        </div>
      </div>

      {/* Stats Cards (Now driven by fetched data) */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-card rounded-xl p-6 border border-border shadow-medium"
        >
          {/* ... Stat Card 1: Active Deliveries ... */}
          <h3 className="text-sm text-text-secondary mb-1">Active Deliveries</h3>
          <p className="text-3xl font-heading font-bold text-foreground">
            {loading ? <FiLoader className="animate-spin" /> : deliveries.length}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-card rounded-xl p-6 border border-border shadow-medium"
        >
          {/* ... Stat Card 2: Completed Today (Note: This still needs a specific API endpoint) ... */}
          <h3 className="text-sm text-text-secondary mb-1">Completed Today</h3>
          <p className="text-3xl font-heading font-bold text-foreground">23</p> 
          {/* (This '23' is still static. It requires an enhancement to the dashboard stats API) */}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-card rounded-xl p-6 border border-border shadow-medium"
        >
          {/* ... Stat Card 3: Active Staff ... */}
          <h3 className="text-sm text-text-secondary mb-1">Active Staff</h3>
          <p className="text-3xl font-heading font-bold text-foreground">
            {loading ? <FiLoader className="animate-spin" /> : deliveryStaff.filter(s => s.status === 'Active').length}
          </p>
          {/* (Note: This relies on the 'status' field in the new staff model) */}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-card rounded-xl p-6 border border-border shadow-medium"
        >
          {/* ... Stat Card 4: Delivery Zones ... */}
          <h3 className="text-sm text-text-secondary mb-1">Delivery Zones</h3>
          <p className="text-3xl font-heading font-bold text-foreground">
            {loading ? <FiLoader className="animate-spin" /> : zones.length}
          </p>
        </motion.div>
      </div>

      {/* Tabs */}
      <div className="bg-card rounded-xl border border-border shadow-soft overflow-hidden">
        <div className="flex border-b border-border">
          {['active', 'staff', 'zones'].map((tab) => (
            <button
              key={tab}
              onClick={() => setSelectedTab(tab)}
              className={`flex-1 px-6 py-4 text-sm font-medium capitalize transition-colors ${
                selectedTab === tab
                  ? 'bg-primary text-primary-foreground'
                  : 'text-text-secondary hover:bg-muted'
              }`}
            >
              {tab === 'active' ? 'Active Deliveries' : tab === 'staff' ? 'Delivery Staff' : 'Delivery Zones'}
            </button>
          ))}
        </div>

        {/* Active Deliveries Tab */}
        {selectedTab === 'active' && (
          <div className="p-6">
            <div className="space-y-4">
              {loading ? (
                <div className="text-center py-10"><FiLoader className="animate-spin mx-auto text-primary" size={24} /></div>
              ) : deliveries.map((delivery) => (
                <motion.div
                  key={delivery._id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-muted rounded-lg p-4 hover:shadow-medium transition-all"
                >
                  <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-3 lg:space-y-0">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <span className="font-mono font-semibold text-foreground">#{delivery._id.toString().slice(-6)}</span>
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(delivery.status)}`}>
                          {delivery.status}
                        </span>
                      </div>
                      <p className="text-sm font-medium text-foreground mb-1">{delivery.userId?.userName || 'Customer Not Found'}</p>
                      <div className="flex items-start space-x-2 text-sm text-text-secondary mb-2">
                        <FiMapPin className="mt-0.5 flex-shrink-0" size={14} />
                        <span>{delivery.deliveryInfo?.address || 'Pickup Order'}</span>
                      </div>
                      <div className="flex items-center space-x-4 text-xs text-text-secondary">
                        <span className="flex items-center space-x-1">
                          <FiUser size={12} />
                          <span>{delivery.deliveryInfo?.assignedStaff?.userName || 'Unassigned'}</span>
                        </span>
                        <span className="flex items-center space-x-1">
                          <FiClock size={12} />
                          <span>{delivery.deliveryInfo?.timeSlot || 'N/A'}</span>
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <select
                        value={delivery.status}
                        onChange={(e) => updateDeliveryStatus(delivery._id, e.target.value)}
                        className="px-3 py-2 bg-background border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                      >
                        <option value="Assigned">Assigned</option>
                        <option value="Out for Delivery">Out for Delivery</option>
                        <option value="Delivered">Delivered</option>
                        <option value="Failed">Failed</option>
                      </select>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        )}

        {/* Delivery Staff Tab */}
        {selectedTab === 'staff' && (
          <div className="p-6">
            <div className="mb-4 flex justify-end">
              <button className="px-4 py-2 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-secondary transition-colors flex items-center space-x-2">
                <FiPlus size={18} />
                <span>Add Staff</span>
              </button>
            </div>
            {loading ? (
                <div className="text-center py-10"><FiLoader className="animate-spin mx-auto text-primary" size={24} /></div>
              ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {deliveryStaff.map((staff) => (
                  <motion.div
                    key={staff._id}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="bg-muted rounded-lg p-4 hover:shadow-medium transition-all"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h4 className="font-semibold text-foreground mb-1">{staff.userName}</h4>
                        <p className="text-xs text-text-secondary">{staff.email}</p>
                        {/* <p className="text-xs text-text-secondary">{staff.phone}</p> */}
                      </div>
                      {/* <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        staff.status === 'Active' 
                          ? 'bg-success/20 text-success-foreground' 
                          : 'bg-muted text-text-secondary'
                      }`}>
                        {staff.status}
                      </span> */}
                    </div>
                    {/* Note: The fields below are placeholders for now.
                        They require the new DeliveryStaff model and more complex backend logic.
                    */}
                    <div className="space-y-2 text-sm">
                      <p className="text-text-secondary">
                        <strong>Vehicle:</strong> (Vehicle data pending)
                      </p>
                      <p className="text-text-secondary">
                        <strong>Zone:</strong> (Zone data pending)
                      </p>
                      <div className="flex justify-between pt-2 border-t border-border">
                        <span className="text-text-secondary">Active:</span>
                        <span className="font-semibold text-primary">0</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-text-secondary">Total:</span>
                        <span className="font-semibold text-foreground">0</span>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Delivery Zones Tab */}
        {selectedTab === 'zones' && (
          <div className="p-6">
            <div className="mb-4 flex justify-end">
              <button className="px-4 py-2 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-secondary transition-colors flex items-center space-x-2">
                <FiPlus size={18} />
                <span>Add Zone</span>
              </button>
            </div>
            {loading ? (
                <div className="text-center py-10"><FiLoader className="animate-spin mx-auto text-primary" size={24} /></div>
              ) : (
              <div className="space-y-4">
                {zones.map((zone) => (
                  <motion.div
                    key={zone._id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-muted rounded-lg p-4 hover:shadow-medium transition-all"
                  >
                    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-2">
                          <h4 className="text-lg font-semibold text-foreground">{zone.zoneName}</h4>
                          {/* <span className="px-3 py-1 bg-primary/20 text-primary text-xs rounded-full font-medium">
                            {zone.activeDeliveries} Active
                          </span> */}
                        </div>
                        <p className="text-sm text-text-secondary mb-3">{zone.area || 'No area specified'}</p>
                        <div className="flex items-center space-x-6 text-sm">
                          <span className="text-text-secondary">
                            <strong>Fee:</strong> ₹{zone.deliveryFee}
                          </span>
                          <span className="text-text-secondary">
                            <strong>ETA:</strong> {zone.estimatedTime || 'N/A'}
                          </span>
                        </div>
                      </div>
                      <div className="mt-3 lg:mt-0">
                        <button className="px-4 py-2 bg-background border border-border rounded-lg hover:bg-card transition-colors flex items-center space-x-2">
                          <FiEdit2 size={16} />
                          <span>Edit</span>
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default DeliveryManagement;
