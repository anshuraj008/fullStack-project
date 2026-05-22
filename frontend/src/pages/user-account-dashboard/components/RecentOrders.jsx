import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Image from '../../../components/AppImage';

const RecentOrders = ({ className = "" }) => {
  const [orders] = useState([
    {
      id: 'ORD-2024-001',
      date: '2024-08-25',
      status: 'delivered',
      total: 67.99,
      items: 2,
      image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=400&h=300&fit=crop',
      title: 'Custom Birthday Cake + Cupcakes',
      deliveryDate: '2024-08-26',
      canReorder: true,
      canReview: true
    },
    {
      id: 'ORD-2024-002',
      date: '2024-08-23',
      status: 'in-progress',
      total: 89.50,
      items: 1,
      image: 'https://images.pexels.com/photos/1721932/pexels-photo-1721932.jpeg?w=400&h=300&fit=crop',
      title: 'Wedding Anniversary Cake',
      deliveryDate: '2024-08-28',
      canReorder: false,
      canReview: false
    },
    {
      id: 'ORD-2024-003',
      date: '2024-08-20',
      status: 'cancelled',
      total: 45.00,
      items: 3,
      image: 'https://images.pixabay.com/photo/2017/01/11/11/33/cake-1971552_960_720.jpg?w=400&h=300&fit=crop',
      title: 'Chocolate Bento Cakes Set',
      deliveryDate: null,
      canReorder: true,
      canReview: false
    }
  ]);

  const getStatusConfig = (status) => {
    const configs = {
      'delivered': {
        label: 'Delivered',
        color: 'bg-success/10 text-success border-success/20',
        icon: 'CheckCircle'
      },
      'in-progress': {
        label: 'In Progress',
        color: 'bg-warning/10 text-warning border-warning/20',
        icon: 'Clock'
      },
      'cancelled': {
        label: 'Cancelled',
        color: 'bg-destructive/10 text-destructive border-destructive/20',
        icon: 'XCircle'
      },
      'pending': {
        label: 'Pending',
        color: 'bg-muted text-muted-foreground border-border',
        icon: 'AlertCircle'
      }
    };
    return configs?.[status] || configs?.pending;
  };

  const formatDate = (dateString) => {
    return new Date(dateString)?.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  return (
    <div className={`bg-card border border-border rounded-lg shadow-soft ${className}`}>
      <div className="p-4 border-b border-border">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-heading font-semibold text-foreground">
            Recent Orders
          </h2>
          <Link
            to="/order-tracking-history"
            className="text-sm text-primary hover:text-primary/80 font-medium transition-smooth"
          >
            View All
          </Link>
        </div>
      </div>
      <div className="p-4 space-y-4">
        {orders?.map((order) => {
          const statusConfig = getStatusConfig(order?.status);
          
          return (
            <div
              key={order?.id}
              className="flex flex-col sm:flex-row gap-4 p-4 bg-background border border-border rounded-lg hover:shadow-medium transition-smooth"
            >
              {/* Order Image */}
              <div className="w-full sm:w-20 h-20 rounded-lg overflow-hidden flex-shrink-0">
                <Image
                  src={order?.image}
                  alt={order?.title}
                  className="w-full h-full object-cover"
                />
              </div>
              {/* Order Details */}
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <h3 className="font-medium text-foreground text-sm mb-1">
                      {order?.title}
                    </h3>
                    <p className="text-xs text-muted-foreground">
                      Order #{order?.id}
                    </p>
                  </div>
                  <div className={`px-2 py-1 rounded-full text-xs font-medium border ${statusConfig?.color}`}>
                    <div className="flex items-center space-x-1">
                      <Icon name={statusConfig?.icon} size={12} />
                      <span>{statusConfig?.label}</span>
                    </div>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-4 text-xs text-muted-foreground mb-3">
                  <span>Ordered: {formatDate(order?.date)}</span>
                  {order?.deliveryDate && (
                    <span>Delivery: {formatDate(order?.deliveryDate)}</span>
                  )}
                  <span>{order?.items} item{order?.items > 1 ? 's' : ''}</span>
                  <span className="font-medium text-foreground">${order?.total?.toFixed(2)}</span>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-wrap gap-2">
                  <Button
                    variant="outline"
                    size="xs"
                    iconName="Eye"
                    className="text-xs"
                  >
                    View Details
                  </Button>
                  
                  {order?.status === 'in-progress' && (
                    <Button
                      variant="outline"
                      size="xs"
                      iconName="MapPin"
                      className="text-xs"
                    >
                      Track Order
                    </Button>
                  )}
                  
                  {order?.canReorder && (
                    <Button
                      variant="outline"
                      size="xs"
                      iconName="RotateCcw"
                      className="text-xs"
                    >
                      Reorder
                    </Button>
                  )}
                  
                  {order?.canReview && (
                    <Button
                      variant="outline"
                      size="xs"
                      iconName="Star"
                      className="text-xs"
                    >
                      Review
                    </Button>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default RecentOrders;