import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import Header from '../../components/ui/Header';
import ActiveOrderCard from './components/ActiveOrderCard';
import OrderHistoryCard from './components/OrderHistoryCard';
import OrderSearchFilter from './components/OrderSearchFilter';
import ReviewModal from './components/ReviewModal';

const OrderTrackingHistory = () => {
  const [activeTab, setActiveTab] = useState('active');
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState({
    status: 'all',
    dateRange: 'all',
    orderType: 'all'
  });
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);

  // Mock data for active orders
  const [activeOrders] = useState([
    {
      id: 'ORD-2025-001',
      orderNumber: 'ORD-2025-001',
      cakeName: 'Custom Birthday Cake',
      cakeImage: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=400',
      status: 'baking',
      orderDate: new Date('2025-01-27T10:30:00'),
      estimatedCompletion: new Date('2025-01-27T18:00:00'),
      estimatedDelivery: new Date('2025-01-27T19:30:00'),
      totalAmount: 67.99,
      deliveryType: 'delivery',
      deliveryAddress: '123 Main Street, Apartment 4B, New York, NY 10001',
      driverName: 'Mike Johnson',
      specialInstructions: 'Please call before delivery. Ring apartment buzzer.',
      items: [
        {
          name: 'Custom Birthday Cake',
          image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=200',
          size: '8" Round',
          flavor: 'Chocolate',
          price: 45.99,
          quantity: 1,
          customizations: 'Pink frosting, "Happy 25th Birthday Sarah" text, sugar roses'
        },
        {
          name: 'Chocolate Cupcakes',
          image: 'https://images.unsplash.com/photo-1614707267537-b85aaf00c4b7?w=200',
          size: 'Regular',
          flavor: 'Chocolate',
          price: 18.00,
          quantity: 6
        }
      ]
    },
    {
      id: 'ORD-2025-002',
      orderNumber: 'ORD-2025-002',
      cakeName: 'Wedding Anniversary Cake',
      cakeImage: 'https://images.unsplash.com/photo-1621303837174-89787a7d4729?w=400',
      status: 'out-for-delivery',
      orderDate: new Date('2025-01-26T14:15:00'),
      estimatedCompletion: new Date('2025-01-27T16:00:00'),
      estimatedDelivery: new Date('2025-01-27T17:30:00'),
      totalAmount: 89.99,
      deliveryType: 'delivery',
      deliveryAddress: '456 Oak Avenue, Brooklyn, NY 11201',
      driverName: 'Lisa Chen',
      items: [
        {
          name: 'Wedding Anniversary Cake',
          image: 'https://images.unsplash.com/photo-1621303837174-89787a7d4729?w=200',
          size: '10" Round',
          flavor: 'Vanilla',
          price: 89.99,
          quantity: 1,
          customizations: 'White fondant, gold accents, "Happy 10th Anniversary" text'
        }
      ]
    },
    {
      id: 'ORD-2025-003',
      orderNumber: 'ORD-2025-003',
      cakeName: 'Bento Cake Collection',
      cakeImage: 'https://images.pexels.com/photos/1721932/pexels-photo-1721932.jpeg?w=400',
      status: 'ready',
      orderDate: new Date('2025-01-27T09:00:00'),
      estimatedCompletion: new Date('2025-01-27T15:00:00'),
      totalAmount: 34.99,
      deliveryType: 'pickup',
      pickupLocation: 'Cuppie Cake Bakery - Downtown, 789 Broadway, New York, NY 10003',
      items: [
        {
          name: 'Mini Bento Cakes',
          image: 'https://images.pexels.com/photos/1721932/pexels-photo-1721932.jpeg?w=200',
          size: '4" Round',
          flavor: 'Mixed',
          price: 34.99,
          quantity: 4,
          customizations: 'Assorted flavors and decorations'
        }
      ]
    }
  ]);

  // Mock data for order history
  const [orderHistory] = useState([
    {
      id: 'ORD-2024-156',
      orderNumber: 'ORD-2024-156',
      cakeName: 'Christmas Special Cake',
      cakeImage: 'https://images.pixabay.com/photo/2017/12/09/08/18/pizza-3007395_1280.jpg?w=400',
      status: 'delivered',
      orderDate: new Date('2024-12-23T11:30:00'),
      deliveredAt: new Date('2024-12-24T16:45:00'),
      totalAmount: 75.50,
      deliveryType: 'delivery',
      deliveryAddress: '123 Main Street, Apartment 4B, New York, NY 10001',
      hasReview: true,
      rating: 5,
      items: [
        {
          name: 'Christmas Special Cake',
          image: 'https://images.pixabay.com/photo/2017/12/09/08/18/pizza-3007395_1280.jpg?w=200',
          size: '9" Round',
          flavor: 'Red Velvet',
          price: 75.50,
          quantity: 1
        }
      ]
    },
    {
      id: 'ORD-2024-142',
      orderNumber: 'ORD-2024-142',
      cakeName: 'Birthday Surprise Cake',
      cakeImage: 'https://images.unsplash.com/photo-1586985289688-ca3cf47d3e6e?w=400',
      status: 'delivered',
      orderDate: new Date('2024-11-15T13:20:00'),
      deliveredAt: new Date('2024-11-16T18:30:00'),
      totalAmount: 52.99,
      deliveryType: 'pickup',
      pickupLocation: 'Cuppie Cake Bakery - Downtown, 789 Broadway, New York, NY 10003',
      hasReview: false,
      items: [
        {
          name: 'Birthday Surprise Cake',
          image: 'https://images.unsplash.com/photo-1586985289688-ca3cf47d3e6e?w=200',
          size: '8" Round',
          flavor: 'Strawberry',
          price: 52.99,
          quantity: 1
        }
      ]
    },
    {
      id: 'ORD-2024-128',
      orderNumber: 'ORD-2024-128',
      cakeName: 'Custom Wedding Cake',
      cakeImage: 'https://images.pexels.com/photos/1721932/pexels-photo-1721932.jpeg?w=400',
      status: 'cancelled',
      orderDate: new Date('2024-10-08T16:45:00'),
      totalAmount: 125.00,
      deliveryType: 'delivery',
      deliveryAddress: '456 Oak Avenue, Brooklyn, NY 11201',
      hasReview: false,
      items: [
        {
          name: 'Custom Wedding Cake',
          image: 'https://images.pexels.com/photos/1721932/pexels-photo-1721932.jpeg?w=200',
          size: '12" Round',
          flavor: 'Vanilla',
          price: 125.00,
          quantity: 1
        }
      ]
    }
  ]);

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  const handleFilter = (newFilters) => {
    setFilters(newFilters);
  };

  const handleReorder = (order) => {
    // In a real app, this would navigate to the cake designer with pre-filled data
    console.log('Reordering:', order);
    // For demo, we'll just show an alert
    alert(`Reordering ${order?.cakeName}. You'll be redirected to the cake designer.`);
  };

  const handleReview = (order) => {
    setSelectedOrder(order);
    setIsReviewModalOpen(true);
  };

  const handleReviewSubmit = (reviewData) => {
    console.log('Review submitted:', reviewData);
    // In a real app, this would send the review to the backend
    alert('Thank you for your review!');
  };

  const filteredHistory = orderHistory?.filter(order => {
    // Search filter
    if (searchQuery) {
      const query = searchQuery?.toLowerCase();
      if (!order?.orderNumber?.toLowerCase()?.includes(query) &&
          !order?.cakeName?.toLowerCase()?.includes(query)) {
        return false;
      }
    }

    // Status filter
    if (filters?.status !== 'all' && order?.status !== filters?.status) {
      return false;
    }

    // Date range filter (simplified for demo)
    if (filters?.dateRange !== 'all') {
      const now = new Date();
      const orderDate = order?.orderDate;
      
      switch (filters?.dateRange) {
        case 'today':
          if (orderDate?.toDateString() !== now?.toDateString()) return false;
          break;
        case 'week':
          const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
          if (orderDate < weekAgo) return false;
          break;
        case 'month':
          const monthAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
          if (orderDate < monthAgo) return false;
          break;
      }
    }

    return true;
  });

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Page Header */}
          <div className="mb-8">
            <div className="flex items-center space-x-2 text-sm text-muted-foreground mb-2">
              <Link to="/user-account-dashboard" className="hover:text-primary transition-smooth">
                Account
              </Link>
              <Icon name="ChevronRight" size={16} />
              <span>Order Tracking & History</span>
            </div>
            <h1 className="text-3xl font-heading font-bold text-foreground">
              My Orders
            </h1>
            <p className="text-muted-foreground mt-2">
              Track your current orders and view your purchase history
            </p>
          </div>

          {/* Tab Navigation */}
          <div className="flex items-center space-x-1 mb-6 bg-muted rounded-lg p-1">
            <button
              onClick={() => setActiveTab('active')}
              className={`flex items-center space-x-2 px-4 py-2 rounded-md text-sm font-medium transition-smooth ${
                activeTab === 'active' ?'bg-background text-foreground shadow-soft' :'text-muted-foreground hover:text-foreground'
              }`}
            >
              <Icon name="Clock" size={16} />
              <span>Active Orders</span>
              {activeOrders?.length > 0 && (
                <span className="bg-primary text-primary-foreground text-xs px-2 py-0.5 rounded-full">
                  {activeOrders?.length}
                </span>
              )}
            </button>
            <button
              onClick={() => setActiveTab('history')}
              className={`flex items-center space-x-2 px-4 py-2 rounded-md text-sm font-medium transition-smooth ${
                activeTab === 'history' ?'bg-background text-foreground shadow-soft' :'text-muted-foreground hover:text-foreground'
              }`}
            >
              <Icon name="History" size={16} />
              <span>Order History</span>
            </button>
          </div>

          {/* Active Orders Tab */}
          {activeTab === 'active' && (
            <div>
              {activeOrders?.length > 0 ? (
                <div className="space-y-6">
                  {activeOrders?.map((order) => (
                    <ActiveOrderCard
                      key={order?.id}
                      order={order}
                    />
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <div className="w-24 h-24 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                    <Icon name="ShoppingCart" size={32} className="text-muted-foreground" />
                  </div>
                  <h3 className="text-lg font-heading font-semibold text-foreground mb-2">
                    No Active Orders
                  </h3>
                  <p className="text-muted-foreground mb-6">
                    You don't have any active orders at the moment.
                  </p>
                  <Button
                    variant="default"
                    iconName="Plus"
                    asChild
                  >
                    <Link to="/cake-category-browse">
                      Browse Cakes
                    </Link>
                  </Button>
                </div>
              )}
            </div>
          )}

          {/* Order History Tab */}
          {activeTab === 'history' && (
            <div>
              {/* Search and Filter */}
              <OrderSearchFilter
                onSearch={handleSearch}
                onFilter={handleFilter}
                className="mb-6"
              />

              {/* Order History List */}
              {filteredHistory?.length > 0 ? (
                <div className="space-y-4">
                  {filteredHistory?.map((order) => (
                    <OrderHistoryCard
                      key={order?.id}
                      order={order}
                      onReorder={handleReorder}
                      onReview={handleReview}
                    />
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <div className="w-24 h-24 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                    <Icon name="Search" size={32} className="text-muted-foreground" />
                  </div>
                  <h3 className="text-lg font-heading font-semibold text-foreground mb-2">
                    No Orders Found
                  </h3>
                  <p className="text-muted-foreground mb-6">
                    {searchQuery || filters?.status !== 'all' || filters?.dateRange !== 'all' || filters?.orderType !== 'all' ?'Try adjusting your search or filter criteria.' :'You haven\'t placed any orders yet.'}
                  </p>
                  {(!searchQuery && filters?.status === 'all' && filters?.dateRange === 'all' && filters?.orderType === 'all') && (
                    <Button
                      variant="default"
                      iconName="Plus"
                      asChild
                    >
                      <Link to="/cake-category-browse">
                        Start Shopping
                      </Link>
                    </Button>
                  )}
                </div>
              )}
            </div>
          )}
        </div>
      </main>
      {/* Review Modal */}
      <ReviewModal
        order={selectedOrder}
        isOpen={isReviewModalOpen}
        onClose={() => {
          setIsReviewModalOpen(false);
          setSelectedOrder(null);
        }}
        onSubmit={handleReviewSubmit}
      />
    </div>
  );
};

export default OrderTrackingHistory;