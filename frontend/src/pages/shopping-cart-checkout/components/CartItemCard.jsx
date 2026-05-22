import React, { useState } from 'react';

import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const CartItemCard = ({ item, onUpdateQuantity, onRemove, onModifyCustom }) => {
  const [quantity, setQuantity] = useState(item?.quantity);
  const [isUpdating, setIsUpdating] = useState(false);

  const handleQuantityChange = async (newQuantity) => {
    if (newQuantity < 1) return;
    
    setIsUpdating(true);
    setQuantity(newQuantity);
    
    // Simulate API call
    setTimeout(() => {
      onUpdateQuantity(item?.id, newQuantity);
      setIsUpdating(false);
    }, 300);
  };

  const formatCustomizations = (customizations) => {
    if (!customizations) return null;
    
    return Object.entries(customizations)?.filter(([key, value]) => value && key !== 'notes')?.map(([key, value]) => `${key?.charAt(0)?.toUpperCase() + key?.slice(1)}: ${value}`)?.join(' • ');
  };

  return (
    <div className="bg-card border border-border rounded-lg p-4 shadow-soft">
      <div className="flex flex-col sm:flex-row gap-4">
        {/* Product Image */}
        <div className="relative w-full sm:w-24 h-24 rounded-lg overflow-hidden bg-muted">
          <Image
            src={item?.image}
            alt={item?.name}
            className="w-full h-full object-cover"
          />
          {item?.isCustom && (
            <div className="absolute top-1 right-1 bg-primary text-primary-foreground text-xs px-1.5 py-0.5 rounded">
              Custom
            </div>
          )}
        </div>

        {/* Product Details */}
        <div className="flex-1 min-w-0">
          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2">
            <div className="flex-1">
              <h3 className="font-medium text-foreground text-sm sm:text-base line-clamp-2">
                {item?.name}
              </h3>
              
              {item?.size && (
                <p className="text-sm text-muted-foreground mt-1">
                  Size: {item?.size}
                </p>
              )}
              
              {item?.customizations && (
                <p className="text-xs text-muted-foreground mt-1 line-clamp-2">
                  {formatCustomizations(item?.customizations)}
                </p>
              )}
              
              {item?.customizations?.notes && (
                <p className="text-xs text-muted-foreground mt-1 italic">
                  Note: {item?.customizations?.notes}
                </p>
              )}
            </div>

            {/* Price */}
            <div className="text-right">
              <p className="font-semibold text-foreground">
                ${(item?.price * quantity)?.toFixed(2)}
              </p>
              {quantity > 1 && (
                <p className="text-xs text-muted-foreground">
                  ${item?.price?.toFixed(2)} each
                </p>
              )}
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center justify-between mt-3">
            {/* Quantity Controls */}
            <div className="flex items-center space-x-2">
              <Button
                variant="outline"
                size="icon"
                iconName="Minus"
                onClick={() => handleQuantityChange(quantity - 1)}
                disabled={quantity <= 1 || isUpdating}
                className="h-8 w-8"
              />
              <span className="w-8 text-center text-sm font-medium">
                {isUpdating ? '...' : quantity}
              </span>
              <Button
                variant="outline"
                size="icon"
                iconName="Plus"
                onClick={() => handleQuantityChange(quantity + 1)}
                disabled={isUpdating}
                className="h-8 w-8"
              />
            </div>

            {/* Action Buttons */}
            <div className="flex items-center space-x-2">
              {item?.isCustom && (
                <Button
                  variant="ghost"
                  size="sm"
                  iconName="Edit"
                  onClick={() => onModifyCustom(item?.id)}
                  className="text-xs"
                >
                  Modify
                </Button>
              )}
              <Button
                variant="ghost"
                size="icon"
                iconName="Trash2"
                onClick={() => onRemove(item?.id)}
                className="h-8 w-8 text-destructive hover:text-destructive"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItemCard;