import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Icon from '../AppIcon';

const CartIndicator = ({ className = "" }) => {
  const [cartItems, setCartItems] = useState([]);
  const [isAnimating, setIsAnimating] = useState(false);

  // Mock cart data - in real app this would come from context/state management
  const cartCount = cartItems?.length;
  const cartTotal = cartItems?.reduce((sum, item) => sum + (item?.price * item?.quantity), 0);

  // Simulate cart updates
  useEffect(() => {
    // Mock initial cart items
    setCartItems([
      { id: 1, name: 'Custom Birthday Cake', price: 45.99, quantity: 1 },
      { id: 2, name: 'Chocolate Cupcakes', price: 24.99, quantity: 2 }
    ]);
  }, []);

  const handleCartUpdate = () => {
    setIsAnimating(true);
    setTimeout(() => setIsAnimating(false), 300);
  };

  return (
    <Link
      to="/shopping-cart-checkout"
      className={`relative inline-flex items-center p-2 rounded-md text-foreground hover:text-primary hover:bg-accent/50 transition-smooth ${className}`}
      onClick={handleCartUpdate}
    >
      <div className="relative">
        <Icon 
          name="ShoppingCart" 
          size={24} 
          className={`transition-smooth ${isAnimating ? 'scale-110' : 'scale-100'}`} 
        />
        
        {cartCount > 0 && (
          <span className="absolute -top-2 -right-2 bg-primary text-primary-foreground text-xs font-medium rounded-full h-5 w-5 flex items-center justify-center min-w-[20px] animate-pulse">
            {cartCount > 99 ? '99+' : cartCount}
          </span>
        )}
      </div>
      {cartCount > 0 && (
        <div className="hidden sm:block ml-2">
          <div className="text-sm font-medium">
            ${cartTotal?.toFixed(2)}
          </div>
          <div className="text-xs text-muted-foreground">
            {cartCount} {cartCount === 1 ? 'item' : 'items'}
          </div>
        </div>
      )}
    </Link>
  );
};

export default CartIndicator;