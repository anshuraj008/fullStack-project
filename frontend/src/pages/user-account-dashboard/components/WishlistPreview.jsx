import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Image from '../../../components/AppImage';

const WishlistPreview = ({ className = "" }) => {
  const [wishlistItems] = useState([
    {
      id: 'wish-001',
      name: 'Strawberry Shortcake',
      image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=400&h=300&fit=crop',
      originalPrice: 45.99,
      currentPrice: 39.99,
      onSale: true,
      inStock: true,
      category: 'Birthday Cakes',
      rating: 4.8,
      reviews: 124,
      addedDate: '2024-08-20'
    },
    {
      id: 'wish-002',
      name: 'Chocolate Truffle Cake',
      image: 'https://images.pexels.com/photos/1721932/pexels-photo-1721932.jpeg?w=400&h=300&fit=crop',
      originalPrice: 52.99,
      currentPrice: 52.99,
      onSale: false,
      inStock: true,
      category: 'Premium Cakes',
      rating: 4.9,
      reviews: 89,
      addedDate: '2024-08-18'
    },
    {
      id: 'wish-003',
      name: 'Rainbow Layer Cake',
      image: 'https://images.pixabay.com/photo/2017/01/11/11/33/cake-1971552_960_720.jpg?w=400&h=300&fit=crop',
      originalPrice: 38.99,
      currentPrice: 38.99,
      onSale: false,
      inStock: false,
      category: 'Kids Cakes',
      rating: 4.7,
      reviews: 156,
      addedDate: '2024-08-15'
    },
    {
      id: 'wish-004',
      name: 'Elegant Wedding Cake',
      image: 'https://images.unsplash.com/photo-1535141192574-5d4897c12636?w=400&h=300&fit=crop',
      originalPrice: 125.00,
      currentPrice: 110.00,
      onSale: true,
      inStock: true,
      category: 'Wedding Cakes',
      rating: 5.0,
      reviews: 67,
      addedDate: '2024-08-12'
    }
  ]);

  const [removingItem, setRemovingItem] = useState(null);

  const handleRemoveFromWishlist = (itemId) => {
    setRemovingItem(itemId);
    // Simulate removal animation
    setTimeout(() => {
      setRemovingItem(null);
      // In real app, this would update the wishlist state
    }, 300);
  };

  const handleAddToCart = (item) => {
    // Handle add to cart functionality
    console.log('Adding to cart:', item);
  };

  const formatDate = (dateString) => {
    return new Date(dateString)?.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric'
    });
  };

  if (wishlistItems?.length === 0) {
    return (
      <div className={`bg-card border border-border rounded-lg shadow-soft p-6 text-center ${className}`}>
        <Icon name="Heart" size={48} className="text-muted-foreground mx-auto mb-3" />
        <h3 className="text-lg font-heading font-semibold text-foreground mb-2">
          Your Wishlist is Empty
        </h3>
        <p className="text-muted-foreground mb-4">
          Save your favorite cakes to keep track of them.
        </p>
        <Link to="/cake-category-browse">
          <Button variant="default" iconName="Search">
            Browse Cakes
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div className={`bg-card border border-border rounded-lg shadow-soft ${className}`}>
      <div className="p-4 border-b border-border">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-heading font-semibold text-foreground">
            Wishlist
          </h2>
          <div className="flex items-center space-x-2">
            <span className="text-sm text-muted-foreground">
              {wishlistItems?.filter(item => item?.onSale)?.length} on sale
            </span>
            <Button variant="ghost" size="sm" iconName="ExternalLink">
              View All
            </Button>
          </div>
        </div>
      </div>
      <div className="p-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {wishlistItems?.map((item) => (
            <div
              key={item?.id}
              className={`bg-background border border-border rounded-lg overflow-hidden hover:shadow-medium transition-smooth group ${
                removingItem === item?.id ? 'opacity-50 scale-95' : ''
              }`}
            >
              {/* Item Image */}
              <div className="relative aspect-square overflow-hidden">
                <Image
                  src={item?.image}
                  alt={item?.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-large"
                />
                
                {/* Sale Badge */}
                {item?.onSale && (
                  <div className="absolute top-2 left-2 bg-destructive text-destructive-foreground px-2 py-1 rounded-full text-xs font-medium">
                    Sale
                  </div>
                )}

                {/* Stock Status */}
                {!item?.inStock && (
                  <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                    <span className="bg-background text-foreground px-3 py-1 rounded-full text-sm font-medium">
                      Out of Stock
                    </span>
                  </div>
                )}

                {/* Remove Button */}
                <button
                  onClick={() => handleRemoveFromWishlist(item?.id)}
                  className="absolute top-2 right-2 p-1.5 bg-background/80 hover:bg-background rounded-full transition-smooth opacity-0 group-hover:opacity-100"
                >
                  <Icon name="X" size={14} className="text-foreground" />
                </button>
              </div>

              {/* Item Details */}
              <div className="p-3">
                <div className="mb-2">
                  <h3 className="font-medium text-foreground text-sm mb-1 line-clamp-1">
                    {item?.name}
                  </h3>
                  <p className="text-xs text-muted-foreground">
                    {item?.category}
                  </p>
                </div>

                {/* Rating */}
                <div className="flex items-center space-x-1 mb-2">
                  <div className="flex items-center">
                    {[...Array(5)]?.map((_, i) => (
                      <Icon
                        key={i}
                        name="Star"
                        size={12}
                        className={`${
                          i < Math.floor(item?.rating)
                            ? 'text-warning fill-current' :'text-muted-foreground'
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-xs text-muted-foreground">
                    {item?.rating} ({item?.reviews})
                  </span>
                </div>

                {/* Price */}
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-2">
                    <span className="text-lg font-heading font-bold text-primary">
                      ${item?.currentPrice?.toFixed(2)}
                    </span>
                    {item?.onSale && (
                      <span className="text-sm text-muted-foreground line-through">
                        ${item?.originalPrice?.toFixed(2)}
                      </span>
                    )}
                  </div>
                  <span className="text-xs text-muted-foreground">
                    Added {formatDate(item?.addedDate)}
                  </span>
                </div>

                {/* Action Buttons */}
                <div className="space-y-2">
                  <Button
                    variant={item?.inStock ? "default" : "secondary"}
                    size="xs"
                    iconName="ShoppingCart"
                    fullWidth
                    disabled={!item?.inStock}
                    onClick={() => handleAddToCart(item)}
                    className="text-xs"
                  >
                    {item?.inStock ? 'Add to Cart' : 'Notify When Available'}
                  </Button>
                  
                  <div className="flex space-x-2">
                    <Button
                      variant="outline"
                      size="xs"
                      iconName="Eye"
                      fullWidth
                      className="text-xs"
                    >
                      View
                    </Button>
                    <Button
                      variant="outline"
                      size="xs"
                      iconName="Share"
                      fullWidth
                      className="text-xs"
                    >
                      Share
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* View All Button */}
        <div className="mt-4 text-center">
          <Button variant="outline" iconName="ArrowRight">
            View All Wishlist Items ({wishlistItems?.length})
          </Button>
        </div>
      </div>
    </div>
  );
};

export default WishlistPreview;