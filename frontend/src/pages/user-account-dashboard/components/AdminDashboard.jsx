import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import Header from '../../../components/ui/Header';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import { useAuth } from '../../../utils/AuthContext';

// Import admin-specific dashboard components
import AdminSidebar from './AdminSidebar';
import AdminStats from './AdminStats';
import OrderManagement from './OrderManagement';
import InventoryManagement from './InventoryManagement';
import CustomerManagement from './CustomerManagement';
import RevenueAnalytics from './RevenueAnalytics';
import PendingOrders from './PendingOrders';

const AdminDashboard = ({ isSidebarOpen, toggleSidebar, closeSidebar }) => {
  const { user } = useAuth();
  const [activeView, setActiveView] = useState('overview');

  const formatMemberSince = (dateString) => {
    return new Date(dateString)?.toLocaleDateString('en-US', {
      month: 'long',
      year: 'numeric'
    });
  };

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading admin dashboard...</p>
        </div>
      </div>
    );
  }

  const currentUser = {
    name: user.name || 'Admin',
    email: user.email || '',
    memberSince: user.createdAt || new Date().toISOString(),
    avatar: user.avatar || 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
    role: 'Admin'
  };

  const renderActiveView = () => {
    switch(activeView) {
      case 'orders':
        return <OrderManagement />;
      case 'inventory':
        return <InventoryManagement />;
      case 'customers':
        return <CustomerManagement />;
      case 'analytics':
        return <RevenueAnalytics />;
      case 'pending':
        return <PendingOrders />;
      default:
        return (
          <>
            {/* Admin Stats */}
            <AdminStats className="mb-6" />

            {/* Main Dashboard Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Left Column - Main Content */}
              <div className="lg:col-span-2 space-y-6">
                {/* Pending Orders */}
                <PendingOrders />

                {/* Quick Actions */}
                <div className="bg-card border border-border rounded-lg shadow-soft p-4">
                  <h3 className="text-lg font-heading font-semibold text-foreground mb-4">
                    Quick Actions
                  </h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    <Button
                      variant="outline"
                      iconName="Plus"
                      className="h-auto p-3 flex-col gap-2"
                      onClick={() => setActiveView('orders')}
                    >
                      <Icon name="Package" size={20} />
                      <span className="text-xs">New Order</span>
                    </Button>
                    <Button
                      variant="outline"
                      iconName="Users"
                      className="h-auto p-3 flex-col gap-2"
                      onClick={() => setActiveView('customers')}
                    >
                      <Icon name="Users" size={20} />
                      <span className="text-xs">Customers</span>
                    </Button>
                    <Button
                      variant="outline"
                      iconName="TrendingUp"
                      className="h-auto p-3 flex-col gap-2"
                      onClick={() => setActiveView('analytics')}
                    >
                      <Icon name="TrendingUp" size={20} />
                      <span className="text-xs">Analytics</span>
                    </Button>
                    <Button
                      variant="outline"
                      iconName="Settings"
                      className="h-auto p-3 flex-col gap-2"
                      onClick={() => setActiveView('inventory')}
                    >
                      <Icon name="Settings" size={20} />
                      <span className="text-xs">Inventory</span>
                    </Button>
                  </div>
                </div>

                {/* Recent Activity */}
                <div className="bg-card border border-border rounded-lg shadow-soft p-4">
                  <h3 className="text-lg font-heading font-semibold text-foreground mb-4">
                    Recent Activity
                  </h3>
                  <div className="space-y-3">
                    <div className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                      <div className="flex-1">
                        <p className="text-sm text-foreground">
                          New order #ORD-2024-125 received from Sarah Johnson
                        </p>
                        <p className="text-xs text-muted-foreground">5 minutes ago</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-success rounded-full mt-2 flex-shrink-0" />
                      <div className="flex-1">
                        <p className="text-sm text-foreground">
                          Order #ORD-2024-120 marked as delivered
                        </p>
                        <p className="text-xs text-muted-foreground">15 minutes ago</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-warning rounded-full mt-2 flex-shrink-0" />
                      <div className="flex-1">
                        <p className="text-sm text-foreground">
                          Low stock alert: Vanilla cake mix (5 units remaining)
                        </p>
                        <p className="text-xs text-muted-foreground">1 hour ago</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column - System Status */}
              <div className="space-y-6">
                {/* System Status */}
                <div className="bg-card border border-border rounded-lg shadow-soft p-4">
                  <h3 className="text-lg font-heading font-semibold text-foreground mb-4">
                    System Status
                  </h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Icon name="CheckCircle" size={16} className="text-success" />
                        <span className="text-sm text-foreground">Server Status</span>
                      </div>
                      <span className="text-xs bg-success/10 text-success px-2 py-1 rounded">Online</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Icon name="CheckCircle" size={16} className="text-success" />
                        <span className="text-sm text-foreground">Database</span>
                      </div>
                      <span className="text-xs bg-success/10 text-success px-2 py-1 rounded">Connected</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Icon name="CheckCircle" size={16} className="text-success" />
                        <span className="text-sm text-foreground">Payment Gateway</span>
                      </div>
                      <span className="text-xs bg-success/10 text-success px-2 py-1 rounded">Active</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Icon name="CheckCircle" size={16} className="text-success" />
                        <span className="text-sm text-foreground">Email Service</span>
                      </div>
                      <span className="text-xs bg-success/10 text-success px-2 py-1 rounded">Operational</span>
                    </div>
                  </div>
                </div>

                {/* Today's Summary */}
                <div className="bg-card border border-border rounded-lg shadow-soft p-4">
                  <h3 className="text-lg font-heading font-semibold text-foreground mb-4">
                    Today's Summary
                  </h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Total Orders</span>
                      <span className="text-lg font-bold text-foreground">24</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Revenue</span>
                      <span className="text-lg font-bold text-success">$1,240</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Pending Orders</span>
                      <span className="text-lg font-bold text-warning">3</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">New Customers</span>
                      <span className="text-lg font-bold text-primary">7</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </>
        );
    }
  };

  return (
    <>
      <Helmet>
        <title>Admin Dashboard - Cuppie Cake</title>
        <meta name="description" content="Manage bakery operations, orders, inventory, and analytics from your admin dashboard." />
      </Helmet>
      <div className="min-h-screen bg-background">
        <Header />

        <div className="flex pt-16">
          {/* Desktop Sidebar */}
          <div className="hidden md:block">
            <AdminSidebar
              isOpen={false}
              onClose={() => {}}
              activeView={activeView}
              setActiveView={setActiveView}
            />
          </div>

          {/* Mobile Sidebar */}
          <AdminSidebar
            isOpen={isSidebarOpen}
            onClose={closeSidebar}
            className="md:hidden"
            activeView={activeView}
            setActiveView={setActiveView}
          />

          {/* Main Content */}
          <div className="flex-1 md:ml-0">
            <div className="p-4 lg:p-6 max-w-7xl mx-auto">

              {/* Mobile Header */}
              <div className="flex items-center justify-between mb-6 md:hidden">
                <Button
                  variant="ghost"
                  size="icon"
                  iconName="Menu"
                  onClick={toggleSidebar}
                  className="text-foreground hover:text-primary"
                />
                <h1 className="text-xl font-heading font-bold text-foreground">
                  Admin Dashboard
                </h1>
                <div className="w-10" /> {/* Spacer */}
              </div>

              {/* Welcome Section */}
              <div className="bg-gradient-to-r from-primary/10 to-secondary/10 rounded-lg p-6 mb-6">
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                  <div className="w-16 h-16 rounded-full overflow-hidden flex-shrink-0 border-2 border-primary/20">
                    <img
                      src={currentUser?.avatar}
                      alt={currentUser?.name}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.target.src = '/assets/images/no_image.png';
                      }}
                    />
                  </div>

                  <div className="flex-1">
                    <h1 className="text-2xl font-heading font-bold text-foreground mb-1">
                      Welcome back, {currentUser?.name}!
                    </h1>
                    <p className="text-muted-foreground mb-3">
                      Administrator since {formatMemberSince(currentUser?.memberSince)}
                    </p>
                    <div className="flex items-center gap-2">
                      <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary">
                        <Icon name="Shield" size={12} className="mr-1" />
                        Administrator
                      </span>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-2">
                    <Button variant="default" iconName="Settings">
                      Settings
                    </Button>
                    <Button variant="outline" iconName="Users">
                      Manage Staff
                    </Button>
                  </div>
                </div>
              </div>

              {/* Active View Content */}
              {renderActiveView()}

            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminDashboard;
