import React from 'react';
import Icon from '../../../components/AppIcon';

const AdminStats = ({ className = "" }) => {
  const stats = [
    {
      title: 'Total Orders',
      value: '156',
      change: '+12%',
      trend: 'up',
      icon: 'Package',
      color: 'text-blue-600'
    },
    {
      title: 'Revenue',
      value: '$8,420',
      change: '+8%',
      trend: 'up',
      icon: 'DollarSign',
      color: 'text-green-600'
    },
    {
      title: 'Active Customers',
      value: '89',
      change: '+15%',
      trend: 'up',
      icon: 'Users',
      color: 'text-purple-600'
    },
    {
      title: 'Pending Orders',
      value: '7',
      change: '-3',
      trend: 'down',
      icon: 'Clock',
      color: 'text-orange-600'
    }
  ];

  return (
    <div className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 ${className}`}>
      {stats.map((stat, index) => (
        <div key={index} className="bg-card border border-border rounded-lg p-4 shadow-soft">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">{stat.title}</p>
              <p className="text-2xl font-bold text-foreground mt-1">{stat.value}</p>
              <p className={`text-xs mt-1 ${stat.trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
                {stat.change} from last month
              </p>
            </div>
            <div className={`p-3 rounded-full bg-background ${stat.color}`}>
              <Icon name={stat.icon} size={24} />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AdminStats;
