import React from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const QuickActions = ({ className = "" }) => {
  const quickActions = [
    {
      id: 'browse-cakes',
      title: 'Browse Cakes',
      description: 'Explore our cake collection',
      icon: 'Search',
      path: '/cake-category-browse',
      color: 'bg-primary/10 text-primary hover:bg-primary/20'
    },
    {
      id: 'custom-designer',
      title: 'Custom Designer',
      description: 'Create your dream cake',
      icon: 'Palette',
      path: '/3d-custom-cake-designer',
      color: 'bg-secondary/10 text-secondary hover:bg-secondary/20'
    },
    {
      id: 'track-orders',
      title: 'Track Orders',
      description: 'Monitor your deliveries',
      icon: 'Package',
      path: '/order-tracking-history',
      color: 'bg-success/10 text-success hover:bg-success/20'
    },
    {
      id: 'view-cart',
      title: 'View Cart',
      description: 'Review & checkout',
      icon: 'ShoppingCart',
      path: '/shopping-cart-checkout',
      color: 'bg-warning/10 text-warning hover:bg-warning/20'
    }
  ];

  const accountActions = [
    {
      id: 'edit-profile',
      title: 'Edit Profile',
      description: 'Update personal information',
      icon: 'User',
      action: 'profile'
    },
    {
      id: 'manage-addresses',
      title: 'Delivery Addresses',
      description: 'Manage delivery locations',
      icon: 'MapPin',
      action: 'addresses'
    },
    {
      id: 'notifications',
      title: 'Notifications',
      description: 'Manage alerts & updates',
      icon: 'Bell',
      action: 'notifications'
    },
    {
      id: 'help-support',
      title: 'Help & Support',
      description: 'Get assistance',
      icon: 'HelpCircle',
      action: 'help'
    }
  ];

  const handleAccountAction = (action) => {
    // Handle account-specific actions
    console.log(`Handling action: ${action}`);
  };

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Shopping Quick Actions */}
      <div className="bg-card border border-border rounded-lg shadow-soft p-4">
        <h2 className="text-lg font-heading font-semibold text-foreground mb-4">
          Quick Actions
        </h2>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {quickActions?.map((action) => (
            <Link
              key={action?.id}
              to={action?.path}
              className={`flex items-center space-x-3 p-3 rounded-lg transition-smooth ${action?.color}`}
            >
              <div className="flex-shrink-0">
                <Icon name={action?.icon} size={20} />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-medium text-sm">{action?.title}</h3>
                <p className="text-xs opacity-80">{action?.description}</p>
              </div>
              <Icon name="ChevronRight" size={16} className="opacity-60" />
            </Link>
          ))}
        </div>
      </div>
      {/* Account Management Actions */}
      <div className="bg-card border border-border rounded-lg shadow-soft p-4">
        <h2 className="text-lg font-heading font-semibold text-foreground mb-4">
          Account Management
        </h2>
        
        <div className="space-y-2">
          {accountActions?.map((action) => (
            <button
              key={action?.id}
              onClick={() => handleAccountAction(action?.action)}
              className="flex items-center space-x-3 p-3 rounded-lg w-full text-left hover:bg-accent hover:text-primary transition-smooth"
            >
              <div className="flex-shrink-0">
                <Icon name={action?.icon} size={18} className="text-muted-foreground" />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-medium text-sm text-foreground">{action?.title}</h3>
                <p className="text-xs text-muted-foreground">{action?.description}</p>
              </div>
              <Icon name="ChevronRight" size={16} className="text-muted-foreground opacity-60" />
            </button>
          ))}
        </div>
      </div>
      {/* Emergency Actions */}
      <div className="bg-card border border-border rounded-lg shadow-soft p-4">
        <h2 className="text-lg font-heading font-semibold text-foreground mb-4">
          Need Help?
        </h2>
        
        <div className="space-y-3">
          <Button
            variant="outline"
            fullWidth
            iconName="MessageCircle"
            className="justify-start"
          >
            <div className="text-left ml-2">
              <div className="font-medium text-sm">Live Chat Support</div>
              <div className="text-xs text-muted-foreground">Get instant help</div>
            </div>
          </Button>
          
          <Button
            variant="outline"
            fullWidth
            iconName="Phone"
            className="justify-start"
          >
            <div className="text-left ml-2">
              <div className="font-medium text-sm">Call Us</div>
              <div className="text-xs text-muted-foreground">+1 (555) 123-CAKE</div>
            </div>
          </Button>
          
          <Button
            variant="outline"
            fullWidth
            iconName="Mail"
            className="justify-start"
          >
            <div className="text-left ml-2">
              <div className="font-medium text-sm">Email Support</div>
              <div className="text-xs text-muted-foreground">support@cuppiecake.com</div>
            </div>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default QuickActions;