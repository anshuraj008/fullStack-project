import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const OrderSummary = ({ 
  cartItems, 
  deliveryFee, 
  onPlaceOrder, 
  isProcessing,
  isFormValid 
}) => {
  const subtotal = cartItems?.reduce((sum, item) => sum + (item?.price * item?.quantity), 0);
  const tax = subtotal * 0.08; // 8% tax rate
  const total = subtotal + deliveryFee + tax;

  const formatPrice = (price) => `$${price?.toFixed(2)}`;

  return (
    <div className="bg-card border border-border rounded-lg p-4 sm:p-6 sticky top-20">
      <h3 className="text-lg font-heading font-semibold text-foreground mb-4">
        Order Summary
      </h3>
      {/* Items Summary */}
      <div className="space-y-3 mb-4">
        {cartItems?.map((item) => (
          <div key={item?.id} className="flex items-center justify-between text-sm">
            <div className="flex-1 min-w-0">
              <p className="font-medium text-foreground truncate">
                {item?.name}
              </p>
              <p className="text-muted-foreground">
                Qty: {item?.quantity} × {formatPrice(item?.price)}
              </p>
            </div>
            <p className="font-medium text-foreground ml-2">
              {formatPrice(item?.price * item?.quantity)}
            </p>
          </div>
        ))}
      </div>
      <div className="border-t border-border pt-4 space-y-2">
        {/* Subtotal */}
        <div className="flex items-center justify-between text-sm">
          <span className="text-muted-foreground">Subtotal</span>
          <span className="font-medium text-foreground">
            {formatPrice(subtotal)}
          </span>
        </div>

        {/* Delivery Fee */}
        <div className="flex items-center justify-between text-sm">
          <span className="text-muted-foreground">
            {deliveryFee > 0 ? 'Delivery Fee' : 'Pickup (Free)'}
          </span>
          <span className="font-medium text-foreground">
            {deliveryFee > 0 ? formatPrice(deliveryFee) : 'Free'}
          </span>
        </div>

        {/* Tax */}
        <div className="flex items-center justify-between text-sm">
          <span className="text-muted-foreground">Tax (8%)</span>
          <span className="font-medium text-foreground">
            {formatPrice(tax)}
          </span>
        </div>

        {/* Discount (if applicable) */}
        <div className="flex items-center justify-between text-sm text-success">
          <span>First Order Discount</span>
          <span>-$5.00</span>
        </div>
      </div>
      {/* Total */}
      <div className="border-t border-border pt-4 mt-4">
        <div className="flex items-center justify-between">
          <span className="text-lg font-semibold text-foreground">Total</span>
          <span className="text-xl font-bold text-primary">
            {formatPrice(Math.max(0, total - 5))}
          </span>
        </div>
      </div>
      {/* Estimated Delivery Time */}
      <div className="mt-4 p-3 bg-accent/50 rounded-lg">
        <div className="flex items-center space-x-2 text-sm">
          <Icon name="Clock" size={16} className="text-primary" />
          <span className="text-muted-foreground">
            Estimated delivery: 2-3 business days
          </span>
        </div>
      </div>
      {/* Place Order Button */}
      <Button
        variant="default"
        size="lg"
        fullWidth
        loading={isProcessing}
        disabled={!isFormValid || isProcessing}
        onClick={onPlaceOrder}
        iconName="CreditCard"
        className="mt-6"
      >
        {isProcessing ? 'Processing...' : `Place Order • ${formatPrice(Math.max(0, total - 5))}`}
      </Button>
      {/* Security Notice */}
      <div className="mt-4 text-center">
        <p className="text-xs text-muted-foreground">
          <Icon name="Shield" size={12} className="inline mr-1 text-success" />
          Your payment information is secure and encrypted
        </p>
      </div>
      {/* Promo Code */}
      <div className="mt-4 pt-4 border-t border-border">
        <details className="group">
          <summary className="flex items-center justify-between cursor-pointer text-sm font-medium text-primary">
            <span>Have a promo code?</span>
            <Icon name="ChevronDown" size={16} className="group-open:rotate-180 transition-transform" />
          </summary>
          <div className="mt-3 space-y-2">
            <div className="flex space-x-2">
              <input
                type="text"
                placeholder="Enter promo code"
                className="flex-1 px-3 py-2 text-sm border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
              />
              <Button variant="outline" size="sm">
                Apply
              </Button>
            </div>
          </div>
        </details>
      </div>
    </div>
  );
};

export default OrderSummary;