import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const AdminSidebar = ({ isOpen, onClose, className = "", activeView, setActiveView }) => {
  const sidebarItems = [
    {
      id: 'overview',
      label: 'Overview',
      icon: 'LayoutDashboard',
      description: 'Dashboard overview',
      action: () => setActiveView('overview')
    },
    {
      id: 'orders',
      label: 'Order Management',
      icon: 'Package',
      description: 'Manage all orders',
      action: () => setActiveView('orders')
    },
    {
      id: 'pending',
      label: 'Pending Orders',
      icon: 'Clock',
      description: 'Orders awaiting action',
      action: () => setActiveView('pending')
    },
    {
      id: 'inventory',
      label: 'Inventory',
      icon: 'Archive',
      description: 'Stock management',
      action: () => setActiveView('inventory')
    },
    {
      id: 'customers',
      label: 'Customers',
      icon: 'Users',
      description: 'Customer management',
      action: () => setActiveView('customers')
    },
    {
      id: 'analytics',
      label: 'Analytics',
      icon: 'TrendingUp',
      description: 'Revenue & reports',
      action: () => setActiveView('analytics')
    }
  ];

  const isActiveView = (viewId) => {
    return activeView === viewId;
  };

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/20 backdrop-blur-sm md:hidden"
          onClick={onClose}
        />
      )}
      {/* Sidebar */}
      <div className={`fixed top-16 left-0 z-50 h-[calc(100vh-4rem)] w-full sm:w-80 md:w-64 lg:w-72 bg-background border-r border-border shadow-large transform transition-large md:relative md:top-0 md:shadow-none md:translate-x-0 ${
        isOpen ? 'translate-x-0' : '-translate-x-full'
      } ${className}`}>

        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-border md:hidden">
          <h2 className="text-lg font-heading font-semibold text-foreground">
            Admin Menu
          </h2>
          <Button
            variant="ghost"
            size="icon"
            iconName="X"
            onClick={onClose}
            className="text-foreground hover:text-primary"
          />
        </div>

        {/* Navigation */}
        <nav className="p-4 space-y-2 overflow-y-auto h-full">
          {sidebarItems?.map((item) => (
            <button
              key={item?.id}
              onClick={() => {
                item.action();
                onClose();
              }}
              className={`flex items-start space-x-3 px-3 py-3 rounded-lg text-sm transition-smooth group w-full text-left ${
                isActiveView(item?.id)
                  ? 'bg-primary text-primary-foreground'
                  : 'text-foreground hover:bg-accent hover:text-primary'
              }`}
            >
              <Icon
                name={item?.icon}
                size={20}
                className={`mt-0.5 ${
                  isActiveView(item?.id)
                    ? 'text-primary-foreground'
                    : 'text-muted-foreground group-hover:text-primary'
                }`}
              />
              <div className="flex-1 min-w-0">
                <div className="font-medium">{item?.label}</div>
                <div className={`text-xs mt-0.5 ${
                  isActiveView(item?.id)
                    ? 'text-primary-foreground/80'
                    : 'text-muted-foreground'
                }`}>
                  {item?.description}
                </div>
              </div>
            </button>
          ))}

          {/* Divider */}
          <div className="border-t border-border my-4" />

          {/* System Management */}
          <div className="space-y-2">
            <div className="px-3 py-2">
              <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                System Management
              </h3>
            </div>

            <button className="flex items-center space-x-3 px-3 py-3 rounded-lg text-sm text-foreground hover:bg-accent hover:text-primary transition-smooth w-full text-left group">
              <Icon name="Settings" size={20} className="text-muted-foreground group-hover:text-primary" />
              <div>
                <div className="font-medium">System Settings</div>
                <div className="text-xs text-muted-foreground mt-0.5">Configuration & preferences</div>
              </div>
            </button>

            <button className="flex items-center space-x-3 px-3 py-3 rounded-lg text-sm text-foreground hover:bg-accent hover:text-primary transition-smooth w-full text-left group">
              <Icon name="Users" size={20} className="text-muted-foreground group-hover:text-primary" />
              <div>
                <div className="font-medium">Staff Management</div>
                <div className="text-xs text-muted-foreground mt-0.5">Manage employees & roles</div>
              </div>
            </button>

            <button className="flex items-center space-x-3 px-3 py-3 rounded-lg text-sm text-foreground hover:bg-accent hover:text-primary transition-smooth w-full text-left group">
              <Icon name="Bell" size={20} className="text-muted-foreground group-hover:text-primary" />
              <div>
                <div className="font-medium">Notifications</div>
                <div className="text-xs text-muted-foreground mt-0.5">System alerts & updates</div>
              </div>
            </button>
          </div>

          {/* Divider */}
          <div className="border-t border-border my-4" />

          {/* Account Actions */}
          <div className="space-y-2">
            <button className="flex items-center space-x-3 px-3 py-3 rounded-lg text-sm text-foreground hover:bg-accent hover:text-primary transition-smooth w-full text-left group">
              <Icon name="User" size={20} className="text-muted-foreground group-hover:text-primary" />
              <div>
                <div className="font-medium">My Profile</div>
                <div className="text-xs text-muted-foreground mt-0.5">Personal account settings</div>
              </div>
            </button>

            <button className="flex items-center space-x-3 px-3 py-3 rounded-lg text-sm text-foreground hover:bg-accent hover:text-primary transition-smooth w-full text-left group">
              <Icon name="HelpCircle" size={20} className="text-muted-foreground group-hover:text-primary" />
              <div>
                <div className="font-medium">Help & Support</div>
                <div className="text-xs text-muted-foreground mt-0.5">Get assistance</div>
              </div>
            </button>

            <button className="flex items-center space-x-3 px-3 py-3 rounded-lg text-sm text-destructive hover:bg-destructive/10 transition-smooth w-full text-left group">
              <Icon name="LogOut" size={20} className="text-destructive" />
              <div>
                <div className="font-medium">Sign Out</div>
                <div className="text-xs text-destructive/80 mt-0.5">End admin session</div>
              </div>
            </button>
          </div>
        </nav>
      </div>
    </>
  );
};

export default AdminSidebar;
