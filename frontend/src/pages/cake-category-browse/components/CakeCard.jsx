import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const CakeCard = ({ cake, onAddToCart, onToggleWishlist, className = "" }) => {
  const [isWishlisted, setIsWishlisted] = useState(cake?.isWishlisted || false);
  const [showQuickAdd, setShowQuickAdd] = useState(false);
  const [selectedSize, setSelectedSize] = useState(cake?.sizes?.[0]?.id || 'medium');
  const [selectedFlavor, setSelectedFlavor] = useState(cake?.flavors?.[0]?.id || 'vanilla');

  const handleWishlistToggle = (e) => {
    e?.preventDefault();
    e?.stopPropagation();
    setIsWishlisted(!isWishlisted);
    onToggleWishlist?.(cake?.id, !isWishlisted);
  };

  const handleQuickAdd = (e) => {
    e?.preventDefault();
    e?.stopPropagation();
    setShowQuickAdd(true);
  };

  const handleAddToCart = () => {
    const selectedSizeData = cake?.sizes?.find(s => s?.id === selectedSize);
    const selectedFlavorData = cake?.flavors?.find(f => f?.id === selectedFlavor);
    
    onAddToCart?.({
      ...cake,
      selectedSize: selectedSizeData,
      selectedFlavor: selectedFlavorData,
      price: selectedSizeData?.price || cake?.startingPrice
    });
    setShowQuickAdd(false);
  };

  const getCurrentPrice = () => {
    const sizeData = cake?.sizes?.find(s => s?.id === selectedSize);
    return sizeData?.price || cake?.startingPrice;
  };

  return (
    <>
      <div className={`group relative bg-card rounded-lg border border-border overflow-hidden shadow-soft hover:shadow-medium transition-smooth ${className}`}>
        {/* Image Container */}
        <div className="relative aspect-square overflow-hidden">
          <Image
            src={cake?.image}
            alt={cake?.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-large"
          />
          
          {/* Overlay Actions */}
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-smooth">
            <div className="absolute top-3 right-3 flex flex-col space-y-2">
              <button
                onClick={handleWishlistToggle}
                className="w-8 h-8 bg-white/90 hover:bg-white rounded-full flex items-center justify-center shadow-soft transition-smooth"
              >
                <Icon
                  name="Heart"
                  size={16}
                  className={isWishlisted ? 'text-error fill-current' : 'text-muted-foreground'}
                />
              </button>
            </div>
            
            <div className="absolute bottom-3 left-3 right-3 opacity-0 group-hover:opacity-100 transition-smooth">
              <Button
                variant="default"
                size="sm"
                fullWidth
                iconName="Plus"
                onClick={handleQuickAdd}
                className="bg-white/90 hover:bg-white text-foreground shadow-soft"
              >
                Quick Add
              </Button>
            </div>
          </div>

          {/* Badges */}
          <div className="absolute top-3 left-3 flex flex-col space-y-1">
            {cake?.isNew && (
              <span className="bg-primary text-primary-foreground text-xs font-medium px-2 py-1 rounded-full">
                New
              </span>
            )}
            {cake?.isCustomizable && (
              <span className="bg-accent text-accent-foreground text-xs font-medium px-2 py-1 rounded-full">
                Customizable
              </span>
            )}
            {cake?.isPopular && (
              <span className="bg-warning text-warning-foreground text-xs font-medium px-2 py-1 rounded-full">
                Popular
              </span>
            )}
          </div>
        </div>

        {/* Content */}
        <div className="p-4">
          <div className="flex items-start justify-between mb-2">
            <h3 className="font-heading font-semibold text-foreground group-hover:text-primary transition-smooth line-clamp-2">
              {cake?.name}
            </h3>
          </div>

          {/* Rating */}
          <div className="flex items-center space-x-1 mb-2">
            <div className="flex items-center">
              {[...Array(5)]?.map((_, i) => (
                <Icon
                  key={i}
                  name="Star"
                  size={14}
                  className={i < Math.floor(cake?.rating) ? 'text-warning fill-current' : 'text-muted-foreground/30'}
                />
              ))}
            </div>
            <span className="text-sm text-muted-foreground">
              {cake?.rating} ({cake?.reviewCount})
            </span>
          </div>

          {/* Description */}
          <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
            {cake?.description}
          </p>

          {/* Size Options */}
          <div className="flex items-center space-x-1 mb-3">
            <span className="text-xs text-muted-foreground">Sizes:</span>
            {cake?.sizes?.slice(0, 3)?.map((size, index) => (
              <span key={size?.id} className="text-xs text-foreground">
                {size?.name}{index < Math.min(cake?.sizes?.length, 3) - 1 && ','}
              </span>
            ))}
            {cake?.sizes?.length > 3 && (
              <span className="text-xs text-muted-foreground">+{cake?.sizes?.length - 3} more</span>
            )}
          </div>

          {/* Price */}
          <div className="flex items-center justify-between">
            <div className="flex items-baseline space-x-1">
              <span className="text-lg font-semibold text-foreground">
                ₹{cake?.startingPrice}
              </span>
              <span className="text-sm text-muted-foreground">starting</span>
            </div>
            
            <Link
              to={`/cake-details/${cake?.id}`}
              className="text-sm text-primary hover:text-primary/80 font-medium transition-smooth"
            >
              View Details
            </Link>
          </div>
        </div>
      </div>
      {/* Quick Add Modal */}
      {showQuickAdd && (
        <>
          <div
            className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm"
            onClick={() => setShowQuickAdd(false)}
          />
          <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 w-full max-w-md bg-background rounded-lg border border-border shadow-large p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-heading font-semibold">Quick Add to Cart</h3>
              <Button
                variant="ghost"
                size="icon"
                iconName="X"
                onClick={() => setShowQuickAdd(false)}
              />
            </div>

            <div className="space-y-4">
              {/* Size Selection */}
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Size
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {cake?.sizes?.map((size) => (
                    <button
                      key={size?.id}
                      onClick={() => setSelectedSize(size?.id)}
                      className={`p-3 rounded-md border text-sm transition-smooth ${
                        selectedSize === size?.id
                          ? 'border-primary bg-accent text-primary' :'border-border bg-card hover:border-primary/50'
                      }`}
                    >
                      <div className="font-medium">{size?.name}</div>
                      <div className="text-xs text-muted-foreground">₹{size?.price}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Flavor Selection */}
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Flavor
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {cake?.flavors?.map((flavor) => (
                    <button
                      key={flavor?.id}
                      onClick={() => setSelectedFlavor(flavor?.id)}
                      className={`p-3 rounded-md border text-sm transition-smooth ${
                        selectedFlavor === flavor?.id
                          ? 'border-primary bg-accent text-primary' :'border-border bg-card hover:border-primary/50'
                      }`}
                    >
                      {flavor?.name}
                    </button>
                  ))}
                </div>
              </div>

              {/* Actions */}
              <div className="flex space-x-3 pt-4">
                <Button
                  variant="outline"
                  fullWidth
                  onClick={() => setShowQuickAdd(false)}
                >
                  Cancel
                </Button>
                <Button
                  variant="default"
                  fullWidth
                  iconName="ShoppingCart"
                  onClick={handleAddToCart}
                >
                  Add to Cart - ₹{getCurrentPrice()}
                </Button>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default CakeCard;