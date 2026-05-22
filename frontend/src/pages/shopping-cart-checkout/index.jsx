import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Header from '../../components/ui/Header';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import CartItemCard from './components/CartItemCard';
import DeliverySection from './components/DeliverySection';
import PaymentSection from './components/PaymentSection';
import OrderSummary from './components/OrderSummary';
import CheckoutProgress from './components/CheckoutProgress';
import GuestCheckoutPrompt from './components/GuestCheckoutPrompt';

const ShoppingCartCheckout = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [isProcessing, setIsProcessing] = useState(false);
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  
  // Check authentication on mount
  useEffect(() => {
    const authUser = localStorage.getItem('auth_user');
    const authToken = localStorage.getItem('auth_token');
    
    if (authUser && authToken) {
      try {
        const userData = JSON.parse(authUser);
        setUser(userData);
        setIsAuthenticated(true);
      } catch (error) {
        console.error('Error parsing user data:', error);
      }
    }
  }, []);
  
  // Cart state
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      name: "Custom Birthday Cake - Rainbow Layers",
      price: 45.99,
      quantity: 1,
      size: "8 inch Round",
      image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=400&h=300&fit=crop",
      isCustom: true,
      customizations: {
        flavor: "Vanilla Bean",
        frosting: "Buttercream",
        decoration: "Rainbow Sprinkles",
        text: "Happy Birthday Sarah!",
        notes: "Please make extra colorful"
      }
    },
    {
      id: 2,
      name: "Chocolate Cupcakes Box",
      price: 24.99,
      quantity: 2,
      size: "12 pieces",
      image: "https://images.unsplash.com/photo-1587668178277-295251f900ce?w=400&h=300&fit=crop",
      isCustom: false
    },
    {
      id: 3,
      name: "Strawberry Bento Cake",
      price: 18.99,
      quantity: 1,
      size: "4 inch Square",
      image: "https://images.unsplash.com/photo-1621303837174-89787a7d4729?w=400&h=300&fit=crop",
      isCustom: false
    }
  ]);

  // Form state
  const [guestData, setGuestData] = useState({
    isGuest: true,
    email: '',
    phone: '',
    firstName: '',
    lastName: '',
    createAccount: false,
    password: ''
  });

  // Update guest data when user is authenticated
  useEffect(() => {
    if (isAuthenticated && user) {
      setGuestData({
        isGuest: false,
        email: user.email || '',
        phone: user.phone || '',
        firstName: user.userName?.split(' ')[0] || '',
        lastName: user.userName?.split(' ').slice(1).join(' ') || '',
        createAccount: false,
        password: ''
      });
    }
  }, [isAuthenticated, user]);

  const [deliveryData, setDeliveryData] = useState({
    type: 'delivery',
    address: '',
    branch: '',
    date: '',
    time: '',
    fee: 0
  });

  const [paymentData, setPaymentData] = useState({
    method: 'card',
    cardData: {
      number: '',
      expiry: '',
      cvv: '',
      name: ''
    },
    billingAddress: {
      sameAsDelivery: true,
      street: '',
      city: '',
      zip: ''
    },
    saveCard: false
  });

  // Validation state
  const [isFormValid, setIsFormValid] = useState(false);

  // Validate form completeness
  useEffect(() => {
    // For authenticated users, guest info is always valid
    const isGuestInfoValid = !isAuthenticated ? 
      (guestData?.email && guestData?.phone && guestData?.firstName && guestData?.lastName) :
      true;

    const isDeliveryValid = deliveryData?.date && deliveryData?.time && 
      (deliveryData?.type === 'delivery' ? deliveryData?.address : deliveryData?.branch);

    const isPaymentValid = paymentData?.method === 'card' ?
      (paymentData?.cardData?.number && paymentData?.cardData?.expiry && 
       paymentData?.cardData?.cvv && paymentData?.cardData?.name) :
      true; // Other payment methods handled externally

    setIsFormValid(isGuestInfoValid && isDeliveryValid && isPaymentValid && isAuthenticated);
  }, [guestData, deliveryData, paymentData, isAuthenticated]);

  // Cart operations
  const handleUpdateQuantity = (itemId, newQuantity) => {
    setCartItems(items => 
      items?.map(item => 
        item?.id === itemId ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const handleRemoveItem = (itemId) => {
    setCartItems(items => items?.filter(item => item?.id !== itemId));
  };

  const handleModifyCustom = (itemId) => {
    navigate('/3d-custom-cake-designer', { 
      state: { editingItemId: itemId } 
    });
  };

  // Form handlers
  const handleGuestInfoChange = (data) => {
    setGuestData(data);
  };

  const handleDeliveryChange = (data) => {
    setDeliveryData(data);
  };

  const handlePaymentChange = (data) => {
    setPaymentData(data);
  };

  // Order placement
  const handlePlaceOrder = async () => {
    if (!isFormValid) return;

    // Check if user is authenticated
    if (!isAuthenticated) {
      alert('Please sign in to place an order');
      navigate('/login');
      return;
    }

    setIsProcessing(true);
    
    try {
      const authToken = localStorage.getItem('auth_token');
      
      // Prepare order data for each cart item
      const orderPromises = cartItems.map(async (item) => {
        const orderData = {
          userId: user._id,
          item: {
            type: item.isCustom ? 'Custom' : 'Pre-designed',
            productId: item.productId || null,
            customizations: item.isCustom ? {
              flavor: item.customizations?.flavor || '',
              size: item.size || '',
              layers: item.customizations?.layers || 1,
              toppings: item.customizations?.toppings || [],
              decorations: item.customizations?.decorations || [],
              text: item.customizations?.text || '',
              notes: item.customizations?.notes || ''
            } : {}
          },
          totalPrice: item.price * item.quantity,
          status: 'Pending Payment',
          deliveryInfo: {
            deliveryType: deliveryData.type === 'delivery' ? 'Delivery' : 'Pickup',
            address: deliveryData.type === 'delivery' ? deliveryData.address : null,
            scheduledDate: new Date(deliveryData.date),
            timeSlot: deliveryData.time,
            paymentDetails: {
              razorpayOrderId: paymentData.method === 'card' ? `rzp_${Date.now()}` : null,
              razorpayPaymentId: paymentData.method === 'card' ? `pay_${Date.now()}` : null
            }
          }
        };

        // Submit order to backend
        const response = await axios.post(
          'http://localhost:5000/api/orders',
          orderData,
          {
            headers: {
              'Authorization': `Bearer ${authToken}`,
              'Content-Type': 'application/json'
            }
          }
        );

        return response.data;
      });

      // Wait for all orders to be created
      const createdOrders = await Promise.all(orderPromises);
      
      // Calculate grand total
      const grandTotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0) + deliveryData.fee;
      
      // Mock order confirmation data
      const orderConfirmation = {
        orderId: createdOrders[0]?.data?._id || 'ORD-' + Date.now(),
        orders: createdOrders,
        items: cartItems,
        customer: {
          name: `${guestData.firstName} ${guestData.lastName}`,
          email: guestData.email,
          phone: guestData.phone
        },
        delivery: deliveryData,
        payment: paymentData,
        total: grandTotal,
        status: 'Confirmed',
        estimatedDelivery: new Date(deliveryData.date).toLocaleDateString(),
        createdAt: new Date().toISOString()
      };

      // Clear cart and redirect to success page
      setCartItems([]);
      navigate('/order-tracking-history', { 
        state: { newOrder: orderConfirmation, showSuccess: true } 
      });
      
    } catch (error) {
      console.error('Order placement failed:', error);
      alert(error.response?.data?.message || 'Failed to place order. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  // Empty cart state
  if (cartItems?.length === 0 && !isProcessing) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="pt-16">
          <div className="container mx-auto px-4 py-8">
            <div className="max-w-md mx-auto text-center">
              <div className="w-24 h-24 bg-muted rounded-full flex items-center justify-center mx-auto mb-6">
                <Icon name="ShoppingCart" size={32} className="text-muted-foreground" />
              </div>
              <h1 className="text-2xl font-heading font-semibold text-foreground mb-2">
                Your cart is empty
              </h1>
              <p className="text-muted-foreground mb-6">
                Looks like you haven't added any delicious cakes yet!
              </p>
              <div className="space-y-3">
                <Button
                  variant="default"
                  size="lg"
                  fullWidth
                  iconName="Search"
                  onClick={() => navigate('/cake-category-browse')}
                >
                  Browse Cakes
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  fullWidth
                  iconName="Palette"
                  onClick={() => navigate('/3d-custom-cake-designer')}
                >
                  Design Custom Cake
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Authentication check - show login prompt if not authenticated
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="pt-16">
          <div className="container mx-auto px-4 py-8">
            <div className="max-w-md mx-auto text-center">
              <div className="w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <Icon name="Lock" size={32} className="text-primary" />
              </div>
              <h1 className="text-2xl font-heading font-semibold text-foreground mb-2">
                Sign in to checkout
              </h1>
              <p className="text-muted-foreground mb-6">
                Please sign in to your account to complete your order. This helps us track your order and provide better service.
              </p>
              <div className="space-y-3">
                <Button
                  variant="default"
                  size="lg"
                  fullWidth
                  iconName="LogIn"
                  onClick={() => navigate('/login', { state: { from: '/shopping-cart-checkout' } })}
                >
                  Sign In
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  fullWidth
                  iconName="UserPlus"
                  onClick={() => navigate('/signup', { state: { from: '/shopping-cart-checkout' } })}
                >
                  Create Account
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  fullWidth
                  onClick={() => navigate('/cake-category-browse')}
                >
                  Continue Shopping
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="pt-16">
        <div className="container mx-auto px-4 py-6">
          {/* Page Header */}
          <div className="mb-6">
            <div className="flex items-center space-x-2 text-sm text-muted-foreground mb-2">
              <button onClick={() => navigate('/cake-category-browse')} className="hover:text-primary">
                Continue Shopping
              </button>
              <Icon name="ChevronRight" size={16} />
              <span>Checkout</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-heading font-bold text-foreground">
              Checkout
            </h1>
          </div>

          {/* Progress Indicator */}
          <CheckoutProgress currentStep={currentStep} />

          {/* Main Content */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left Column - Forms */}
            <div className="lg:col-span-2 space-y-6">
              {/* Guest Checkout */}
              <GuestCheckoutPrompt
                onGuestInfo={handleGuestInfoChange}
                guestData={guestData}
                onCreateAccount={(accountData) => {
                  setGuestData(prev => ({
                    ...prev,
                    createAccount: true,
                    ...accountData
                  }));
                }}
              />

              {/* Cart Items */}
              <div className="bg-card border border-border rounded-lg p-4 sm:p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-heading font-semibold text-foreground">
                    Your Order ({cartItems?.length} {cartItems?.length === 1 ? 'item' : 'items'})
                  </h3>
                  <Button
                    variant="ghost"
                    size="sm"
                    iconName="Edit"
                    onClick={() => navigate('/cake-category-browse')}
                  >
                    Edit Cart
                  </Button>
                </div>
                
                <div className="space-y-4">
                  {cartItems?.map((item) => (
                    <CartItemCard
                      key={item?.id}
                      item={item}
                      onUpdateQuantity={handleUpdateQuantity}
                      onRemove={handleRemoveItem}
                      onModifyCustom={handleModifyCustom}
                    />
                  ))}
                </div>
              </div>

              {/* Delivery Information */}
              <DeliverySection
                onDeliveryChange={handleDeliveryChange}
                deliveryData={deliveryData}
              />

              {/* Payment Information */}
              <PaymentSection
                onPaymentChange={handlePaymentChange}
                paymentData={paymentData}
                orderTotal={cartItems?.reduce((sum, item) => sum + (item?.price * item?.quantity), 0)}
              />
            </div>

            {/* Right Column - Order Summary */}
            <div className="lg:col-span-1">
              <OrderSummary
                cartItems={cartItems}
                deliveryFee={deliveryData?.fee}
                onPlaceOrder={handlePlaceOrder}
                isProcessing={isProcessing}
                isFormValid={isFormValid}
              />
            </div>
          </div>

          {/* Mobile Sticky Bottom Bar */}
          <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-background border-t border-border p-4 shadow-large">
            <div className="flex items-center justify-between mb-2">
              <span className="font-medium text-foreground">Total</span>
              <span className="text-lg font-bold text-primary">
                ${Math.max(0, cartItems?.reduce((sum, item) => sum + (item?.price * item?.quantity), 0) + deliveryData?.fee + (cartItems?.reduce((sum, item) => sum + (item?.price * item?.quantity), 0) * 0.08) - 5)?.toFixed(2)}
              </span>
            </div>
            <Button
              variant="default"
              size="lg"
              fullWidth
              loading={isProcessing}
              disabled={!isFormValid || isProcessing}
              onClick={handlePlaceOrder}
              iconName="CreditCard"
            >
              {isProcessing ? 'Processing...' : 'Place Order'}
            </Button>
          </div>

          {/* Mobile Bottom Padding */}
          <div className="lg:hidden h-24" />
        </div>
      </div>
    </div>
  );
};

export default ShoppingCartCheckout;