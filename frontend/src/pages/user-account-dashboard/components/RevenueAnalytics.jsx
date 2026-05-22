import React from 'react';
import Icon from '../../../components/AppIcon';

const RevenueAnalytics = () => {
  const analytics = [
    { period: 'This Month', revenue: '$8,420', orders: 156, growth: '+12%' },
    { period: 'Last Month', revenue: '$7,520', orders: 142, growth: '+8%' },
    { period: 'This Year', revenue: '$94,230', orders: 1847, growth: '+23%' },
  ];

  return (
    <div className="bg-card border border-border rounded-lg shadow-soft p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-heading font-semibold text-foreground">Revenue Analytics</h2>
        <div className="flex gap-2">
          <button className="px-3 py-1 text-xs bg-primary text-primary-foreground rounded">7D</button>
          <button className="px-3 py-1 text-xs text-muted-foreground hover:bg-muted rounded">30D</button>
          <button className="px-3 py-1 text-xs text-muted-foreground hover:bg-muted rounded">90D</button>
        </div>
      </div>

      <div className="space-y-4">
        {analytics.map((item, index) => (
          <div key={index} className="border border-border rounded-lg p-4">
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-medium text-foreground">{item.period}</h3>
              <span className="text-xs bg-green-100 text-green-600 px-2 py-1 rounded">
                {item.growth}
              </span>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-muted-foreground">Revenue</p>
                <p className="text-lg font-bold text-green-600">{item.revenue}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Orders</p>
                <p className="text-lg font-bold text-foreground">{item.orders}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="text-center py-8 text-muted-foreground">
        <Icon name="TrendingUp" size={48} className="mx-auto mb-4 opacity-50" />
        <p>Detailed analytics dashboard coming soon...</p>
      </div>
    </div>
  );
};

export default RevenueAnalytics;
