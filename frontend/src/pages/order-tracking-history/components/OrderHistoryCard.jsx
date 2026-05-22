import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';
import OrderStatusBadge from './OrderStatusBadge';

const OrderHistoryCard = ({ order, onReorder, onReview, className = "" }) => {
  const [showDetails, setShowDetails] = useState(false);

  const formatDate = (date) => {
    return date?.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const canReview = order?.status === 'delivered' && !order?.hasReview;
  const canReorder = ['delivered', 'cancelled']?.includes(order?.status);

  return (
    <div className={`bg-card border border-border rounded-lg shadow-soft overflow-hidden ${className}`}>
      <div className="p-4">
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-start space-x-3">
            <div className="w-14 h-14 rounded-lg overflow-hidden bg-muted">
              <Image
                src={order?.cakeImage}
                alt={order?.cakeName}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex-1">
              <h3 className="font-heading font-medium text-foreground">{order?.cakeName}</h3>
              <p className="text-sm text-muted-foreground">Order #{order?.orderNumber}</p>
              <p className="text-sm text-muted-foreground">{formatDate(order?.orderDate)}</p>
            </div>
          </div>
          <div className="text-right">
            <OrderStatusBadge status={order?.status} />
            <p className="font-semibold text-foreground mt-1">${order?.totalAmount?.toFixed(2)}</p>
          </div>
        </div>

        {/* Order Summary */}
        <div className="flex items-center justify-between text-sm text-muted-foreground mb-3">
          <span>{order?.items?.length} item{order?.items?.length > 1 ? 's' : ''}</span>
          <span>{order?.deliveryType === 'delivery' ? 'Delivered' : 'Picked up'}</span>
        </div>

        {/* Rating Display */}
        {order?.hasReview && order?.rating && (
          <div className="flex items-center space-x-2 mb-3">
            <div className="flex items-center space-x-1">
              {[1, 2, 3, 4, 5]?.map((star) => (
                <Icon
                  key={star}
                  name="Star"
                  size={16}
                  className={star <= order?.rating ? 'text-warning fill-current' : 'text-border'}
                />
              ))}
            </div>
            <span className="text-sm text-muted-foreground">Your rating</span>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-2">
          <Button
            variant="outline"
            size="sm"
            iconName={showDetails ? "ChevronUp" : "ChevronDown"}
            onClick={() => setShowDetails(!showDetails)}
            className="flex-1"
          >
            {showDetails ? 'Hide Details' : 'View Details'}
          </Button>
          
          {canReorder && (
            <Button
              variant="secondary"
              size="sm"
              iconName="RotateCcw"
              onClick={() => onReorder(order)}
              className="flex-1"
            >
              Reorder
            </Button>
          )}
          
          {canReview && (
            <Button
              variant="default"
              size="sm"
              iconName="Star"
              onClick={() => onReview(order)}
              className="flex-1"
            >
              Review
            </Button>
          )}
        </div>
      </div>
      {/* Expanded Details */}
      {showDetails && (
        <div className="border-t border-border p-4">
          {/* Order Items */}
          <div className="mb-4">
            <h4 className="font-heading font-semibold text-foreground mb-3">Order Items</h4>
            <div className="space-y-3">
              {order?.items?.map((item, index) => (
                <div key={index} className="flex items-center justify-between py-2">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 rounded-lg overflow-hidden bg-muted">
                      <Image
                        src={item?.image}
                        alt={item?.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <p className="font-medium text-foreground text-sm">{item?.name}</p>
                      <p className="text-xs text-muted-foreground">
                        {item?.size} • {item?.flavor}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-medium text-foreground text-sm">${item?.price?.toFixed(2)}</p>
                    <p className="text-xs text-muted-foreground">Qty: {item?.quantity}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Delivery Information */}
          <div className="mb-4">
            <h4 className="font-heading font-semibold text-foreground mb-2">
              {order?.deliveryType === 'delivery' ? 'Delivery' : 'Pickup'} Information
            </h4>
            <div className="bg-muted rounded-lg p-3">
              <div className="flex items-center space-x-2 mb-1">
                <Icon 
                  name={order?.deliveryType === 'delivery' ? 'MapPin' : 'Store'} 
                  size={16} 
                  className="text-primary" 
                />
                <span className="text-sm font-medium text-foreground">
                  {order?.deliveryType === 'delivery' ? 'Delivered to' : 'Picked up from'}
                </span>
              </div>
              <p className="text-sm text-muted-foreground">
                {order?.deliveryType === 'delivery' ? order?.deliveryAddress : order?.pickupLocation}
              </p>
              {order?.deliveredAt && (
                <p className="text-sm text-muted-foreground mt-1">
                  Completed on {formatDate(order?.deliveredAt)} at {order?.deliveredAt?.toLocaleTimeString('en-US', {
                    hour: '2-digit',
                    minute: '2-digit',
                    hour12: true
                  })}
                </p>
              )}
            </div>
          </div>

          {/* Special Instructions */}
          {order?.specialInstructions && (
            <div>
              <h4 className="font-heading font-semibold text-foreground mb-2">Special Instructions</h4>
              <p className="text-sm text-muted-foreground bg-muted rounded-lg p-3">
                {order?.specialInstructions}
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default OrderHistoryCard;