import React from 'react';
import Icon from '../../../components/AppIcon';

const CustomerManagement = () => {
  const customers = [
    { id: 1, name: 'John Doe', email: 'john@example.com', orders: 5, totalSpent: '$245', joinDate: '2023-12-01' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', orders: 3, totalSpent: '$189', joinDate: '2023-11-15' },
    { id: 3, name: 'Mike Johnson', email: 'mike@example.com', orders: 7, totalSpent: '$412', joinDate: '2023-10-20' },
  ];

  return (
    <div className="bg-card border border-border rounded-lg shadow-soft p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-heading font-semibold text-foreground">Customer Management</h2>
        <button className="text-primary hover:text-primary/80 text-sm font-medium">
          + Add Customer
        </button>
      </div>

      <div className="space-y-4">
        {customers.map((customer) => (
          <div key={customer.id} className="border border-border rounded-lg p-4 hover:bg-muted/20 transition-colors">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <Icon name="User" size={20} className="text-primary" />
                </div>
                <div>
                  <h3 className="font-medium text-foreground">{customer.name}</h3>
                  <p className="text-sm text-muted-foreground">{customer.email}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm font-medium text-foreground">{customer.orders} orders</p>
                <p className="text-sm text-muted-foreground">{customer.totalSpent} spent</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="text-center py-8 text-muted-foreground">
        <Icon name="Users" size={48} className="mx-auto mb-4 opacity-50" />
        <p>Advanced customer management features coming soon...</p>
      </div>
    </div>
  );
};

export default CustomerManagement;
