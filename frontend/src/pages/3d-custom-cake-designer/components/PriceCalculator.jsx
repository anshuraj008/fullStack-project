import React, { useState, useEffect } from 'react';

import Button from '../../../components/ui/Button';

const PriceCalculator = ({ cakeConfig, onPriceUpdate, className = "" }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [priceBreakdown, setPriceBreakdown] = useState({});
  const [totalPrice, setTotalPrice] = useState(0);

  // Base prices
  const basePrices = {
    sizes: {
      small: 25,
      medium: 35,
      large: 50,
      sheet: 45
    },
    shapes: {
      round: 0,
      square: 0,
      heart: 5,
      custom: 15
    },
    flavors: {
      vanilla: 0,
      chocolate: 2,
      strawberry: 3,
      lemon: 2,
      'red-velvet': 4,
      carrot: 3
    },
    frosting: {
      buttercream: 0,
      'cream-cheese': 3,
      fondant: 8,
      whipped: 2,
      ganache: 5
    },
    decorations: {
      roses: 12,
      sprinkles: 2,
      pearls: 8,
      flowers: 15,
      'gold-leaf': 20,
      'custom-design': 25
    }
  };

  const calculatePrice = () => {
    const breakdown = {};
    let total = 0;

    // Base cake price
    const basePrice = basePrices?.sizes?.[cakeConfig?.size] || basePrices?.sizes?.medium;
    breakdown.base = { label: `${cakeConfig?.size} cake`, price: basePrice };
    total += basePrice;

    // Shape addon
    const shapePrice = basePrices?.shapes?.[cakeConfig?.shape] || 0;
    if (shapePrice > 0) {
      breakdown.shape = { label: `${cakeConfig?.shape} shape`, price: shapePrice };
      total += shapePrice;
    }

    // Additional layers
    const extraLayers = Math.max(0, (cakeConfig?.layers || 1) - 1);
    if (extraLayers > 0) {
      const layerPrice = extraLayers * 8;
      breakdown.layers = { label: `${extraLayers} extra layer${extraLayers > 1 ? 's' : ''}`, price: layerPrice };
      total += layerPrice;
    }

    // Flavor addon
    const flavorPrice = basePrices?.flavors?.[cakeConfig?.flavor] || 0;
    if (flavorPrice > 0) {
      breakdown.flavor = { label: `${cakeConfig?.flavor} flavor`, price: flavorPrice };
      total += flavorPrice;
    }

    // Frosting addon
    const frostingPrice = basePrices?.frosting?.[cakeConfig?.frosting] || 0;
    if (frostingPrice > 0) {
      breakdown.frosting = { label: `${cakeConfig?.frosting} frosting`, price: frostingPrice };
      total += frostingPrice;
    }

    // Decorations
    if (cakeConfig?.decorations && cakeConfig?.decorations?.length > 0) {
      let decorationTotal = 0;
      cakeConfig?.decorations?.forEach(decoration => {
        const price = basePrices?.decorations?.[decoration] || 0;
        decorationTotal += price;
      });
      if (decorationTotal > 0) {
        breakdown.decorations = { 
          label: `${cakeConfig?.decorations?.length} decoration${cakeConfig?.decorations?.length > 1 ? 's' : ''}`, 
          price: decorationTotal 
        };
        total += decorationTotal;
      }
    }

    // Text addition
    if (cakeConfig?.text && cakeConfig?.text?.trim()) {
      breakdown.text = { label: 'Custom text', price: 5 };
      total += 5;
    }

    // Dietary options
    if (cakeConfig?.glutenFree) {
      breakdown.glutenFree = { label: 'Gluten-free', price: 8 };
      total += 8;
    }
    if (cakeConfig?.sugarFree) {
      breakdown.sugarFree = { label: 'Sugar-free', price: 6 };
      total += 6;
    }
    if (cakeConfig?.vegan) {
      breakdown.vegan = { label: 'Vegan', price: 10 };
      total += 10;
    }

    setPriceBreakdown(breakdown);
    setTotalPrice(total);
    
    if (onPriceUpdate) {
      onPriceUpdate({ breakdown, total });
    }
  };

  useEffect(() => {
    calculatePrice();
  }, [cakeConfig]);

  const formatPrice = (price) => {
    return `₹${price?.toFixed(2)}`;
  };

  return (
    <div className={`bg-background border border-border rounded-lg shadow-medium ${className}`}>
      {/* Price Summary Header */}
      <div 
        className="p-4 cursor-pointer"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-heading font-semibold text-lg text-foreground">
              Total: {formatPrice(totalPrice)}
            </h3>
            <p className="text-sm text-muted-foreground">
              {Object.keys(priceBreakdown)?.length} customization{Object.keys(priceBreakdown)?.length !== 1 ? 's' : ''}
            </p>
          </div>
          <div className="flex items-center space-x-2">
            <Button
              variant="ghost"
              size="icon"
              iconName={isExpanded ? "ChevronUp" : "ChevronDown"}
            />
          </div>
        </div>
      </div>
      {/* Detailed Breakdown */}
      {isExpanded && (
        <div className="border-t border-border">
          <div className="p-4 space-y-3">
            <h4 className="font-medium text-sm text-foreground mb-3">Price Breakdown</h4>
            
            {Object.entries(priceBreakdown)?.map(([key, item]) => (
              <div key={key} className="flex items-center justify-between py-1">
                <span className="text-sm text-muted-foreground capitalize">
                  {item?.label}
                </span>
                <span className="text-sm font-medium text-foreground">
                  {formatPrice(item?.price)}
                </span>
              </div>
            ))}
            
            <div className="border-t border-border pt-3 mt-3">
              <div className="flex items-center justify-between">
                <span className="font-medium text-foreground">Subtotal</span>
                <span className="font-semibold text-lg text-foreground">
                  {formatPrice(totalPrice)}
                </span>
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                Tax and delivery fees calculated at checkout
              </p>
            </div>
          </div>
        </div>
      )}
      {/* Quick Actions */}
      <div className="p-4 border-t border-border bg-muted/30">
        <div className="grid grid-cols-2 gap-2">
          <Button variant="outline" size="sm" iconName="Save">
            Save Design
          </Button>
          <Button variant="outline" size="sm" iconName="Share">
            Share
          </Button>
        </div>
        <Button variant="default" fullWidth className="mt-2" iconName="ShoppingCart">
          Add to Cart - {formatPrice(totalPrice)}
        </Button>
      </div>
    </div>
  );
};

export default PriceCalculator;