import React from 'react';
import Icon from '../../../components/AppIcon';

const DashboardStats = ({ className = "" }) => {
  const stats = [
    {
      id: 'total-orders',
      label: 'Total Orders',
      value: '24',
      change: '+3 this month',
      changeType: 'positive',
      icon: 'Package',
      color: 'bg-primary/10 text-primary'
    },
    {
      id: 'pending-orders',
      label: 'Pending Orders',
      value: '2',
      change: 'In progress',
      changeType: 'neutral',
      icon: 'Clock',
      color: 'bg-warning/10 text-warning'
    },
    {
      id: 'saved-designs',
      label: 'Saved Designs',
      value: '8',
      change: '+2 this week',
      changeType: 'positive',
      icon: 'Bookmark',
      color: 'bg-secondary/10 text-secondary'
    },
    {
      id: 'wishlist-items',
      label: 'Wishlist Items',
      value: '12',
      change: '3 on sale',
      changeType: 'positive',
      icon: 'Heart',
      color: 'bg-success/10 text-success'
    }
  ];

  const getChangeColor = (type) => {
    switch (type) {
      case 'positive':
        return 'text-success';
      case 'negative':
        return 'text-destructive';
      default:
        return 'text-muted-foreground';
    }
  };

  return (
    <div className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 ${className}`}>
      {stats?.map((stat) => (
        <div
          key={stat?.id}
          className="bg-card border border-border rounded-lg p-4 shadow-soft hover:shadow-medium transition-smooth"
        >
          <div className="flex items-center justify-between mb-3">
            <div className={`p-2 rounded-lg ${stat?.color}`}>
              <Icon name={stat?.icon} size={20} />
            </div>
            <div className="text-right">
              <div className="text-2xl font-heading font-bold text-foreground">
                {stat?.value}
              </div>
            </div>
          </div>
          
          <div className="space-y-1">
            <h3 className="text-sm font-medium text-foreground">
              {stat?.label}
            </h3>
            <p className={`text-xs ${getChangeColor(stat?.changeType)}`}>
              {stat?.change}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default DashboardStats;