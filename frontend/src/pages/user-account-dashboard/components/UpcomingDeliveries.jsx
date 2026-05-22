import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Image from '../../../components/AppImage';

const UpcomingDeliveries = ({ className = "" }) => {
  const [deliveries] = useState([
    {
      id: 'ORD-2024-004',
      title: 'Custom Wedding Cake',
      image: 'https://images.unsplash.com/photo-1535141192574-5d4897c12636?w=400&h=300&fit=crop',
      deliveryDate: '2024-08-28T14:00:00',
      address: '123 Main Street, Downtown, NY 10001',
      status: 'confirmed',
      trackingId: 'TRK-WED-001',
      estimatedTime: '2:00 PM - 4:00 PM',
      driverName: 'Sarah Johnson',
      driverPhone: '+1 (555) 123-4567'
    },
    {
      id: 'ORD-2024-005',
      title: 'Birthday Party Cupcake Set',
      image: 'https://images.pexels.com/photos/1721932/pexels-photo-1721932.jpeg?w=400&h=300&fit=crop',
      deliveryDate: '2024-08-29T10:30:00',
      address: '456 Oak Avenue, Suburb, NY 10002',
      status: 'preparing',
      trackingId: 'TRK-BDY-002',
      estimatedTime: '10:30 AM - 12:30 PM',
      driverName: null,
      driverPhone: null
    }
  ]);

  const [countdowns, setCountdowns] = useState({});

  useEffect(() => {
    const updateCountdowns = () => {
      const now = new Date();
      const newCountdowns = {};

      deliveries?.forEach(delivery => {
        const deliveryTime = new Date(delivery.deliveryDate);
        const timeDiff = deliveryTime - now;

        if (timeDiff > 0) {
          const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
          const hours = Math.floor((timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
          const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));

          if (days > 0) {
            newCountdowns[delivery.id] = `${days}d ${hours}h`;
          } else if (hours > 0) {
            newCountdowns[delivery.id] = `${hours}h ${minutes}m`;
          } else {
            newCountdowns[delivery.id] = `${minutes}m`;
          }
        } else {
          newCountdowns[delivery.id] = 'Overdue';
        }
      });

      setCountdowns(newCountdowns);
    };

    updateCountdowns();
    const interval = setInterval(updateCountdowns, 60000); // Update every minute

    return () => clearInterval(interval);
  }, [deliveries]);

  const getStatusConfig = (status) => {
    const configs = {
      'confirmed': {
        label: 'Confirmed',
        color: 'bg-success/10 text-success border-success/20',
        icon: 'CheckCircle'
      },
      'preparing': {
        label: 'Preparing',
        color: 'bg-warning/10 text-warning border-warning/20',
        icon: 'Clock'
      },
      'out-for-delivery': {
        label: 'Out for Delivery',
        color: 'bg-primary/10 text-primary border-primary/20',
        icon: 'Truck'
      }
    };
    return configs?.[status] || configs?.preparing;
  };

  const formatDeliveryDate = (dateString) => {
    return new Date(dateString)?.toLocaleDateString('en-US', {
      weekday: 'long',
      month: 'short',
      day: 'numeric'
    });
  };

  if (deliveries?.length === 0) {
    return (
      <div className={`bg-card border border-border rounded-lg shadow-soft p-6 text-center ${className}`}>
        <Icon name="Calendar" size={48} className="text-muted-foreground mx-auto mb-3" />
        <h3 className="text-lg font-heading font-semibold text-foreground mb-2">
          No Upcoming Deliveries
        </h3>
        <p className="text-muted-foreground mb-4">
          You don't have any scheduled deliveries at the moment.
        </p>
        <Button variant="default" iconName="Plus">
          Place New Order
        </Button>
      </div>
    );
  }

  return (
    <div className={`bg-card border border-border rounded-lg shadow-soft ${className}`}>
      <div className="p-4 border-b border-border">
        <h2 className="text-lg font-heading font-semibold text-foreground">
          Upcoming Deliveries
        </h2>
      </div>
      <div className="p-4 space-y-4">
        {deliveries?.map((delivery) => {
          const statusConfig = getStatusConfig(delivery?.status);
          
          return (
            <div
              key={delivery?.id}
              className="p-4 bg-background border border-border rounded-lg hover:shadow-medium transition-smooth"
            >
              <div className="flex flex-col sm:flex-row gap-4">
                {/* Delivery Image */}
                <div className="w-full sm:w-16 h-16 rounded-lg overflow-hidden flex-shrink-0">
                  <Image
                    src={delivery?.image}
                    alt={delivery?.title}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Delivery Details */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h3 className="font-medium text-foreground text-sm mb-1">
                        {delivery?.title}
                      </h3>
                      <p className="text-xs text-muted-foreground">
                        Order #{delivery?.id}
                      </p>
                    </div>
                    <div className={`px-2 py-1 rounded-full text-xs font-medium border ${statusConfig?.color}`}>
                      <div className="flex items-center space-x-1">
                        <Icon name={statusConfig?.icon} size={12} />
                        <span>{statusConfig?.label}</span>
                      </div>
                    </div>
                  </div>

                  {/* Countdown Timer */}
                  <div className="bg-accent/50 rounded-lg p-3 mb-3">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-xs text-muted-foreground mb-1">
                          Delivery in
                        </p>
                        <p className="text-lg font-heading font-bold text-primary">
                          {countdowns?.[delivery?.id] || 'Calculating...'}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-xs text-muted-foreground mb-1">
                          {formatDeliveryDate(delivery?.deliveryDate)}
                        </p>
                        <p className="text-sm font-medium text-foreground">
                          {delivery?.estimatedTime}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Delivery Address */}
                  <div className="flex items-start space-x-2 mb-3">
                    <Icon name="MapPin" size={14} className="text-muted-foreground mt-0.5" />
                    <p className="text-xs text-muted-foreground">
                      {delivery?.address}
                    </p>
                  </div>

                  {/* Driver Info */}
                  {delivery?.driverName && (
                    <div className="flex items-center space-x-2 mb-3 p-2 bg-muted/50 rounded-lg">
                      <Icon name="User" size={14} className="text-muted-foreground" />
                      <div className="flex-1">
                        <p className="text-xs font-medium text-foreground">
                          Driver: {delivery?.driverName}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {delivery?.driverPhone}
                        </p>
                      </div>
                    </div>
                  )}

                  {/* Action Buttons */}
                  <div className="flex flex-wrap gap-2">
                    <Button
                      variant="default"
                      size="xs"
                      iconName="MapPin"
                      className="text-xs"
                    >
                      Track Live
                    </Button>
                    
                    <Button
                      variant="outline"
                      size="xs"
                      iconName="MessageCircle"
                      className="text-xs"
                    >
                      Contact Driver
                    </Button>
                    
                    <Button
                      variant="outline"
                      size="xs"
                      iconName="Calendar"
                      className="text-xs"
                    >
                      Reschedule
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default UpcomingDeliveries;