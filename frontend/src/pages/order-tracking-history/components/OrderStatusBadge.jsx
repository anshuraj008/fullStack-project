import React from 'react';
import Icon from '../../../components/AppIcon';

const OrderStatusBadge = ({ status, className = "" }) => {
  const statusConfig = {
    'pending': {
      label: 'Order Placed',
      icon: 'Clock',
      bgColor: 'bg-warning/20',
      textColor: 'text-warning',
      iconColor: 'text-warning'
    },
    'confirmed': {
      label: 'Confirmed',
      icon: 'CheckCircle',
      bgColor: 'bg-success/20',
      textColor: 'text-success',
      iconColor: 'text-success'
    },
    'preparing': {
      label: 'Preparing',
      icon: 'ChefHat',
      bgColor: 'bg-primary/20',
      textColor: 'text-primary',
      iconColor: 'text-primary'
    },
    'baking': {
      label: 'Baking',
      icon: 'Flame',
      bgColor: 'bg-secondary/20',
      textColor: 'text-secondary',
      iconColor: 'text-secondary'
    },
    'decorating': {
      label: 'Decorating',
      icon: 'Palette',
      bgColor: 'bg-accent/40',
      textColor: 'text-foreground',
      iconColor: 'text-foreground'
    },
    'ready': {
      label: 'Ready for Pickup',
      icon: 'Package',
      bgColor: 'bg-success/20',
      textColor: 'text-success',
      iconColor: 'text-success'
    },
    'out-for-delivery': {
      label: 'Out for Delivery',
      icon: 'Truck',
      bgColor: 'bg-primary/20',
      textColor: 'text-primary',
      iconColor: 'text-primary'
    },
    'delivered': {
      label: 'Delivered',
      icon: 'CheckCircle2',
      bgColor: 'bg-success/20',
      textColor: 'text-success',
      iconColor: 'text-success'
    },
    'cancelled': {
      label: 'Cancelled',
      icon: 'XCircle',
      bgColor: 'bg-destructive/20',
      textColor: 'text-destructive',
      iconColor: 'text-destructive'
    }
  };

  const config = statusConfig?.[status] || statusConfig?.['pending'];

  return (
    <div className={`inline-flex items-center space-x-2 px-3 py-1 rounded-full text-sm font-medium ${config?.bgColor} ${config?.textColor} ${className}`}>
      <Icon name={config?.icon} size={16} className={config?.iconColor} />
      <span>{config?.label}</span>
    </div>
  );
};

export default OrderStatusBadge;