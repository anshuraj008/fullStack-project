import React from 'react';
import { Helmet } from 'react-helmet';
import Header from '../../../components/ui/Header';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import { useAuth } from '../../../utils/AuthContext';

// Import dashboard components
import AccountSidebar from './AccountSidebar';
import DashboardStats from './DashboardStats';
import RecentOrders from './RecentOrders';
import UpcomingDeliveries from './UpcomingDeliveries';
import ProfileSettings from './ProfileSettings';
import SavedDesigns from './SavedDesigns';
import QuickActions from './QuickActions';
import WishlistPreview from './WishlistPreview';
import PendingOrders from './PendingOrders';
import HelpSupport from './HelpSupport';

const CustomerDashboard = ({ isSidebarOpen, toggleSidebar, closeSidebar }) => {
  const { user } = useAuth();

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
          <p className="mt-4 text-gray-600">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  const currentUser = {
    name: user.name || 'User',
    email: user.email || '',
    memberSince: user.createdAt || new Date().toISOString(),
    avatar: user.avatar || 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
    loyaltyPoints: user.loyaltyPoints || 0,
    nextReward: (Math.floor((user.loyaltyPoints || 0) / 500) + 1) * 500
  };

  const loyaltyProgress = (currentUser?.loyaltyPoints / currentUser?.nextReward) * 100;

  return (
    <>
      <Helmet>
        <title>My Account Dashboard - Cuppie Cake</title>
        <meta name="description" content="Manage your orders, track deliveries, and customize your cake preferences in your personal dashboard." />
      </Helmet>
      <div className="min-h-screen bg-background">
        <Header />

        <div className="flex pt-16">
          {/* Desktop Sidebar */}
          <div className="hidden md:block">
            <AccountSidebar
              isOpen={false}
              onClose={() => {}}
              userRole="customer"
            />
          </div>

          {/* Mobile Sidebar */}
          <AccountSidebar
            isOpen={isSidebarOpen}
            onClose={closeSidebar}
            className="md:hidden"
            userRole="customer"
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
                  Dashboard
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
                      Member since {formatMemberSince(currentUser?.memberSince)}
                    </p>

                    {/* Loyalty Points */}
                    <div className="bg-background/50 rounded-lg p-3 max-w-sm">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium text-foreground">
                          Loyalty Points
                        </span>
                        <span className="text-sm font-bold text-primary">
                          {currentUser?.loyaltyPoints} pts
                        </span>
                      </div>
                      <div className="w-full bg-muted rounded-full h-2 mb-1">
                        <div
                          className="bg-primary h-2 rounded-full transition-smooth"
                          style={{ width: `${loyaltyProgress}%` }}
                        />
                      </div>
                      <p className="text-xs text-muted-foreground">
                        {currentUser?.nextReward - currentUser?.loyaltyPoints} points to next reward
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-2">
                    <Button variant="default" iconName="Edit">
                      Edit Profile
                    </Button>
                    <Button variant="outline" iconName="Settings">
                      Settings
                    </Button>
                  </div>
                </div>
              </div>

              {/* Dashboard Stats */}
              <DashboardStats className="mb-6" />

              {/* Main Dashboard Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

                {/* Left Column - Main Content */}
                <div className="lg:col-span-2 space-y-6">

                  {/* Profile Settings */}
                  <ProfileSettings />

                  {/* Pending Orders */}
                  <PendingOrders />

                  {/* Recent Orders */}
                  <RecentOrders />

                  {/* Upcoming Deliveries */}
                  <UpcomingDeliveries />

                  {/* Saved Designs */}
                  <SavedDesigns />

                  {/* Wishlist Preview */}
                  <WishlistPreview />

                </div>

                {/* Right Column - Quick Actions & Info */}
                <div className="space-y-6">

                  {/* Quick Actions */}
                  <QuickActions />

                  {/* Account Status Card */}
                  <div className="bg-card border border-border rounded-lg shadow-soft p-4">
                    <h3 className="text-lg font-heading font-semibold text-foreground mb-4">
                      Account Status
                    </h3>

                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <Icon name="CheckCircle" size={16} className="text-success" />
                          <span className="text-sm text-foreground">Email Verified</span>
                        </div>
                        <Icon name="Check" size={16} className="text-success" />
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <Icon name="CheckCircle" size={16} className="text-success" />
                          <span className="text-sm text-foreground">Phone Verified</span>
                        </div>
                        <Icon name="Check" size={16} className="text-success" />
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <Icon name="MapPin" size={16} className="text-warning" />
                          <span className="text-sm text-foreground">Default Address</span>
                        </div>
                        <Button variant="ghost" size="xs" iconName="Edit">
                          Update
                        </Button>
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <Icon name="CreditCard" size={16} className="text-success" />
                          <span className="text-sm text-foreground">Payment Method</span>
                        </div>
                        <Button variant="ghost" size="xs" iconName="Plus">
                          Add
                        </Button>
                      </div>
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
                            Order #ORD-2024-001 was delivered
                          </p>
                          <p className="text-xs text-muted-foreground">2 hours ago</p>
                        </div>
                      </div>

                      <div className="flex items-start space-x-3">
                        <div className="w-2 h-2 bg-secondary rounded-full mt-2 flex-shrink-0" />
                        <div className="flex-1">
                          <p className="text-sm text-foreground">
                            Saved new cake design "Pink Rose Birthday"
                          </p>
                          <p className="text-xs text-muted-foreground">1 day ago</p>
                        </div>
                      </div>

                      <div className="flex items-start space-x-3">
                        <div className="w-2 h-2 bg-success rounded-full mt-2 flex-shrink-0" />
                        <div className="flex-1">
                          <p className="text-sm text-foreground">
                            Added 3 items to wishlist
                          </p>
                          <p className="text-xs text-muted-foreground">3 days ago</p>
                        </div>
                      </div>

                      <div className="flex items-start space-x-3">
                        <div className="w-2 h-2 bg-warning rounded-full mt-2 flex-shrink-0" />
                        <div className="flex-1">
                          <p className="text-sm text-foreground">
                            Updated delivery address
                          </p>
                          <p className="text-xs text-muted-foreground">1 week ago</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Help & Support */}
                  <HelpSupport />

                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CustomerDashboard;
