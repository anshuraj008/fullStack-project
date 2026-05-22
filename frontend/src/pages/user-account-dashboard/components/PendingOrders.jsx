import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import SignUpButton from '../../../components/ui/SignUpButton';

const PendingOrders = () => {
  const pendingOrders = [
    {
      id: '#ORD-124',
      customer: 'Sarah Johnson',
      items: ['Chocolate Cake', 'Birthday Cake'],
      total: '₹89',
      status: 'Payment Pending',
      time: '2 hours ago'
    },
    {
      id: '#ORD-125',
      customer: 'Michael Brown',
      items: ['Vanilla Cupcakes x12'],
      total: '₹45',
      status: 'Awaiting Confirmation',
      time: '4 hours ago'
    },
    {
      id: '#ORD-126',
      customer: 'Emily Davis',
      items: ['Custom Wedding Cake'],
      total: '₹320',
      status: 'Design Review',
      time: '6 hours ago'
    }
  ];

  const getStatusColor = (status) => {
    switch(status) {
      case 'Payment Pending': return 'text-yellow-600 bg-yellow-100';
      case 'Awaiting Confirmation': return 'text-blue-600 bg-blue-100';
      case 'Design Review': return 'text-purple-600 bg-purple-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  return (
    <div className="bg-card border border-border rounded-lg shadow-soft p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-heading font-semibold text-foreground">Pending Orders</h2>
        <Button variant="outline" iconName="Filter">Filter</Button>
      </div>

      <div className="space-y-4">
        {pendingOrders.map((order) => (
          <div key={order.id} className="border border-border rounded-lg p-4 hover:bg-muted/20 transition-colors">
            <div className="flex items-start justify-between mb-3">
              <div>
                <h3 className="font-medium text-foreground">{order.id}</h3>
                <p className="text-sm text-muted-foreground">{order.customer}</p>
              </div>
              <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
                {order.status}
              </span>
            </div>

            <div className="mb-3">
              <p className="text-sm text-muted-foreground mb-1">Items:</p>
              <div className="flex flex-wrap gap-1">
                {order.items.map((item, index) => (
                  <span key={index} className="inline-flex items-center px-2 py-1 rounded text-xs bg-muted text-muted-foreground">
                    {item}
                  </span>
                ))}
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total: <span className="font-medium text-foreground">{order.total}</span></p>
                <p className="text-xs text-muted-foreground">{order.time}</p>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="xs" iconName="Eye">View</Button>
                <Button variant="default" size="xs" iconName="Check">Process</Button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {pendingOrders.length === 0 && (
        <div className="text-center py-8 text-muted-foreground">
          <Icon name="CheckCircle" size={48} className="mx-auto mb-4 opacity-50" />
          <p>No pending orders!</p>
          <div className="mt-4">
            <SignUpButton variant="outline" size="sm" />
          </div>
        </div>
      )}
      <div className="mt-6 text-center">
        <p className="text-sm text-muted-foreground mb-2">Want to place an order?</p>
        <SignUpButton variant="default" size="lg" />
      </div>
    </div>
  );
};

export default PendingOrders;
