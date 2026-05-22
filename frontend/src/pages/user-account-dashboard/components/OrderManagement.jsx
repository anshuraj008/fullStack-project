import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const OrderManagement = () => {
  const orders = [
    { id: '#ORD-001', customer: 'John Doe', status: 'pending', amount: '$45', date: '2024-01-15' },
    { id: '#ORD-002', customer: 'Jane Smith', status: 'processing', amount: '$67', date: '2024-01-14' },
    { id: '#ORD-003', customer: 'Mike Johnson', status: 'completed', amount: '$89', date: '2024-01-13' },
  ];

  const getStatusColor = (status) => {
    switch(status) {
      case 'pending': return 'text-yellow-600 bg-yellow-100';
      case 'processing': return 'text-blue-600 bg-blue-100';
      case 'completed': return 'text-green-600 bg-green-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  return (
    <div className="bg-card border border-border rounded-lg shadow-soft p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-heading font-semibold text-foreground">Order Management</h2>
        <Button variant="default" iconName="Plus">New Order</Button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-muted/50">
            <tr>
              <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">Order ID</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">Customer</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">Status</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">Amount</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">Date</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {orders.map((order) => (
              <tr key={order.id} className="hover:bg-muted/20">
                <td className="px-4 py-3 text-sm font-medium text-foreground">{order.id}</td>
                <td className="px-4 py-3 text-sm text-muted-foreground">{order.customer}</td>
                <td className="px-4 py-3">
                  <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
                    {order.status}
                  </span>
                </td>
                <td className="px-4 py-3 text-sm font-medium text-foreground">{order.amount}</td>
                <td className="px-4 py-3 text-sm text-muted-foreground">{order.date}</td>
                <td className="px-4 py-3">
                  <div className="flex gap-2">
                    <Button variant="ghost" size="xs" iconName="Eye">View</Button>
                    <Button variant="ghost" size="xs" iconName="Edit">Edit</Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default OrderManagement;
