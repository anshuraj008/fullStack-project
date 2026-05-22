import React from 'react';
import Icon from '../../../components/AppIcon';

const OrderProgressTimeline = ({ currentStatus, orderDate, estimatedDelivery, className = "" }) => {
  const timelineSteps = [
    {
      id: 'pending',
      label: 'Order Placed',
      icon: 'ShoppingCart',
      timestamp: orderDate,
      description: 'Your order has been received'
    },
    {
      id: 'confirmed',
      label: 'Order Confirmed',
      icon: 'CheckCircle',
      timestamp: new Date(orderDate.getTime() + 15 * 60000),
      description: 'Payment processed successfully'
    },
    {
      id: 'preparing',
      label: 'Preparing Ingredients',
      icon: 'ChefHat',
      timestamp: new Date(orderDate.getTime() + 2 * 60 * 60000),
      description: 'Fresh ingredients being prepared'
    },
    {
      id: 'baking',
      label: 'Baking in Progress',
      icon: 'Flame',
      timestamp: new Date(orderDate.getTime() + 4 * 60 * 60000),
      description: 'Your cake is in the oven'
    },
    {
      id: 'decorating',
      label: 'Decorating',
      icon: 'Palette',
      timestamp: new Date(orderDate.getTime() + 6 * 60 * 60000),
      description: 'Adding final touches and decorations'
    },
    {
      id: 'ready',
      label: 'Ready for Pickup/Delivery',
      icon: 'Package',
      timestamp: new Date(orderDate.getTime() + 8 * 60 * 60000),
      description: 'Your cake is ready!'
    },
    {
      id: 'delivered',
      label: 'Delivered',
      icon: 'CheckCircle2',
      timestamp: estimatedDelivery,
      description: 'Order completed successfully'
    }
  ];

  const getCurrentStepIndex = () => {
    return timelineSteps?.findIndex(step => step?.id === currentStatus);
  };

  const currentStepIndex = getCurrentStepIndex();

  const formatTime = (date) => {
    return date?.toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit',
      hour12: true 
    });
  };

  return (
    <div className={`space-y-4 ${className}`}>
      <h4 className="font-heading font-semibold text-foreground mb-4">Order Progress</h4>
      <div className="relative">
        {timelineSteps?.map((step, index) => {
          const isCompleted = index <= currentStepIndex;
          const isCurrent = index === currentStepIndex;
          const isUpcoming = index > currentStepIndex;

          return (
            <div key={step?.id} className="relative flex items-start space-x-4 pb-6 last:pb-0">
              {/* Timeline Line */}
              {index < timelineSteps?.length - 1 && (
                <div className={`absolute left-6 top-12 w-0.5 h-8 ${
                  isCompleted ? 'bg-success' : 'bg-border'
                }`} />
              )}
              {/* Timeline Icon */}
              <div className={`relative z-10 flex items-center justify-center w-12 h-12 rounded-full border-2 ${
                isCompleted 
                  ? 'bg-success border-success text-white' 
                  : isCurrent 
                    ? 'bg-primary border-primary text-white animate-pulse' :'bg-background border-border text-muted-foreground'
              }`}>
                <Icon name={step?.icon} size={20} />
              </div>
              {/* Timeline Content */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <h5 className={`font-medium ${
                    isCompleted || isCurrent ? 'text-foreground' : 'text-muted-foreground'
                  }`}>
                    {step?.label}
                  </h5>
                  <span className={`text-sm ${
                    isCompleted || isCurrent ? 'text-foreground' : 'text-muted-foreground'
                  }`}>
                    {isCompleted || isCurrent ? formatTime(step?.timestamp) : 'Pending'}
                  </span>
                </div>
                <p className={`text-sm mt-1 ${
                  isCompleted || isCurrent ? 'text-muted-foreground' : 'text-muted-foreground/60'
                }`}>
                  {step?.description}
                </p>
                {isCurrent && (
                  <div className="mt-2">
                    <div className="flex items-center space-x-2 text-sm text-primary">
                      <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />
                      <span>In Progress</span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default OrderProgressTimeline;