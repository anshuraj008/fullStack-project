import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const AccountSidebar = ({ isOpen, onClose, className = "" }) => {
  const location = useLocation();

  const sidebarItems = [
    { 
      id: 'dashboard', 
      label: 'Dashboard', 
      path: '/user-account-dashboard', 
      icon: 'LayoutDashboard',
      description: 'Overview & quick actions'
    },
    { 
      id: 'orders', 
      label: 'Order History', 
      path: '/order-tracking-history', 
      icon: 'Package',
      description: 'Track & manage orders'
    },
    { 
      id: 'profile', 
      label: 'Profile Settings', 
      path: '#profile-settings', 
      icon: 'User',
      description: 'Personal information'
    },
    { 
      id: 'addresses', 
      label: 'Delivery Addresses', 
      path: '#addresses', 
      icon: 'MapPin',
      description: 'Manage delivery locations'
    },
    { 
      id: 'designs', 
      label: 'Saved Designs', 
      path: '#designs', 
      icon: 'Bookmark',
      description: 'Custom cake designs'
    },
    { 
      id: 'wishlist', 
      label: 'Wishlist', 
      path: '#wishlist', 
      icon: 'Heart',
      description: 'Favorite products'
    },
    { 
      id: 'notifications', 
      label: 'Notifications', 
      path: '#notifications', 
      icon: 'Bell',
      description: 'Alerts & updates'
    }
  ];

  const isActivePath = (path) => {
    if (path?.startsWith('#')) return false;
    return location?.pathname === path;
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
            Account Menu
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
            <Link
              key={item?.id}
              to={item?.path}
              onClick={onClose}
              className={`flex items-start space-x-3 px-3 py-3 rounded-lg text-sm transition-smooth group ${
                isActivePath(item?.path)
                  ? 'bg-primary text-primary-foreground'
                  : 'text-foreground hover:bg-accent hover:text-primary'
              }`}
            >
              <Icon 
                name={item?.icon} 
                size={20} 
                className={`mt-0.5 ${
                  isActivePath(item?.path) 
                    ? 'text-primary-foreground' 
                    : 'text-muted-foreground group-hover:text-primary'
                }`}
              />
              <div className="flex-1 min-w-0">
                <div className="font-medium">{item?.label}</div>
                <div className={`text-xs mt-0.5 ${
                  isActivePath(item?.path)
                    ? 'text-primary-foreground/80'
                    : 'text-muted-foreground'
                }`}>
                  {item?.description}
                </div>
              </div>
            </Link>
          ))}

          {/* Divider */}
          <div className="border-t border-border my-4" />

          {/* Additional Actions */}
          <div className="space-y-2">
            <button className="flex items-center space-x-3 px-3 py-3 rounded-lg text-sm text-foreground hover:bg-accent hover:text-primary transition-smooth w-full text-left group">
              <Icon name="Settings" size={20} className="text-muted-foreground group-hover:text-primary" />
              <div>
                <div className="font-medium">Settings</div>
                <div className="text-xs text-muted-foreground mt-0.5">Account preferences</div>
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
                <div className="text-xs text-destructive/80 mt-0.5">End your session</div>
              </div>
            </button>
          </div>
        </nav>
      </div>
    </>
  );
};

export default AccountSidebar;