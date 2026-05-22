import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';
import OrderStatusBadge from './OrderStatusBadge';
import OrderProgressTimeline from './OrderProgressTimeline';

const ActiveOrderCard = ({ order, className = "" }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const formatDate = (date) => {
    return date?.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const formatTime = (date) => {
    return date?.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    });
  };

  const getEstimatedTime = () => {
    const now = new Date();
    const timeDiff = order?.estimatedCompletion?.getTime() - now?.getTime();
    const hours = Math.floor(timeDiff / (1000 * 60 * 60));
    const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
    
    if (hours > 0) {
      return `${hours}h ${minutes}m`;
    }
    return `${minutes}m`;
  };

  return (
    <div className={`bg-card border border-border rounded-lg shadow-soft overflow-hidden ${className}`}>
      {/* Order Header */}
      <div className="p-4 border-b border-border">
        <div className="flex items-start justify-between">
          <div className="flex items-start space-x-3">
            <div className="w-16 h-16 rounded-lg overflow-hidden bg-muted">
              <Image
                src={order?.cakeImage}
                alt={order?.cakeName}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex-1">
              <h3 className="font-heading font-semibold text-foreground">{order?.cakeName}</h3>
              <p className="text-sm text-muted-foreground">Order #{order?.orderNumber}</p>
              <p className="text-sm text-muted-foreground">
                Placed on {formatDate(order?.orderDate)} at {formatTime(order?.orderDate)}
              </p>
            </div>
          </div>
          <OrderStatusBadge status={order?.status} />
        </div>
      </div>
      {/* Order Summary */}
      <div className="p-4">
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <p className="text-sm text-muted-foreground">Estimated Completion</p>
            <p className="font-medium text-foreground">
              {formatDate(order?.estimatedCompletion)} at {formatTime(order?.estimatedCompletion)}
            </p>
            <p className="text-sm text-primary">
              {order?.status !== 'delivered' && order?.status !== 'cancelled' && (
                <>Approx. {getEstimatedTime()} remaining</>
              )}
            </p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Total Amount</p>
            <p className="font-semibold text-lg text-foreground">${order?.totalAmount?.toFixed(2)}</p>
          </div>
        </div>

        {/* Delivery Information */}
        {order?.deliveryType === 'delivery' && (
          <div className="bg-accent/30 rounded-lg p-3 mb-4">
            <div className="flex items-center space-x-2 mb-2">
              <Icon name="MapPin" size={16} className="text-primary" />
              <span className="text-sm font-medium text-foreground">Delivery Address</span>
            </div>
            <p className="text-sm text-muted-foreground">{order?.deliveryAddress}</p>
            {order?.status === 'out-for-delivery' && (
              <div className="mt-2 flex items-center space-x-2">
                <Icon name="Truck" size={16} className="text-primary" />
                <span className="text-sm text-primary">Driver: {order?.driverName}</span>
                <span className="text-sm text-muted-foreground">• ETA: {formatTime(order?.estimatedDelivery)}</span>
              </div>
            )}
          </div>
        )}

        {order?.deliveryType === 'pickup' && (
          <div className="bg-accent/30 rounded-lg p-3 mb-4">
            <div className="flex items-center space-x-2 mb-2">
              <Icon name="Store" size={16} className="text-primary" />
              <span className="text-sm font-medium text-foreground">Pickup Location</span>
            </div>
            <p className="text-sm text-muted-foreground">{order?.pickupLocation}</p>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-2">
          <Button
            variant="outline"
            size="sm"
            iconName={isExpanded ? "ChevronUp" : "ChevronDown"}
            onClick={() => setIsExpanded(!isExpanded)}
            className="flex-1"
          >
            {isExpanded ? 'Hide Details' : 'View Details'}
          </Button>
          
          {order?.status === 'out-for-delivery' && (
            <Button
              variant="default"
              size="sm"
              iconName="MapPin"
              className="flex-1"
            >
              Track Delivery
            </Button>
          )}
          
          {(order?.status === 'ready' || order?.status === 'delivered') && (
            <Button
              variant="secondary"
              size="sm"
              iconName="RotateCcw"
              className="flex-1"
            >
              Reorder
            </Button>
          )}
        </div>
      </div>
      {/* Expanded Details */}
      {isExpanded && (
        <div className="border-t border-border">
          <div className="p-4">
            <OrderProgressTimeline
              currentStatus={order?.status}
              orderDate={order?.orderDate}
              estimatedDelivery={order?.estimatedDelivery}
            />
            
            {/* Order Items */}
            <div className="mt-6">
              <h4 className="font-heading font-semibold text-foreground mb-3">Order Items</h4>
              <div className="space-y-3">
                {order?.items?.map((item, index) => (
                  <div key={index} className="flex items-center justify-between py-2 border-b border-border last:border-b-0">
                    <div className="flex items-center space-x-3">
                      <div className="w-12 h-12 rounded-lg overflow-hidden bg-muted">
                        <Image
                          src={item?.image}
                          alt={item?.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div>
                        <p className="font-medium text-foreground">{item?.name}</p>
                        <p className="text-sm text-muted-foreground">
                          {item?.size} • {item?.flavor}
                        </p>
                        {item?.customizations && (
                          <p className="text-xs text-muted-foreground">
                            {item?.customizations}
                          </p>
                        )}
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-medium text-foreground">${item?.price?.toFixed(2)}</p>
                      <p className="text-sm text-muted-foreground">Qty: {item?.quantity}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Special Instructions */}
            {order?.specialInstructions && (
              <div className="mt-4">
                <h4 className="font-heading font-semibold text-foreground mb-2">Special Instructions</h4>
                <p className="text-sm text-muted-foreground bg-muted rounded-lg p-3">
                  {order?.specialInstructions}
                </p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default ActiveOrderCard;