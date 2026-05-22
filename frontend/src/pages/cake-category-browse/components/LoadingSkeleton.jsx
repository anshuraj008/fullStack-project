import React from 'react';

const LoadingSkeleton = ({ count = 8, className = "" }) => {
  return (
    <div className={`grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 lg:gap-6 ${className}`}>
      {[...Array(count)]?.map((_, index) => (
        <div key={index} className="bg-card rounded-lg border border-border overflow-hidden shadow-soft animate-pulse">
          {/* Image Skeleton */}
          <div className="aspect-square bg-muted" />
          
          {/* Content Skeleton */}
          <div className="p-4 space-y-3">
            {/* Title */}
            <div className="h-4 bg-muted rounded w-3/4" />
            
            {/* Rating */}
            <div className="flex items-center space-x-1">
              <div className="flex space-x-1">
                {[...Array(5)]?.map((_, i) => (
                  <div key={i} className="w-3 h-3 bg-muted rounded" />
                ))}
              </div>
              <div className="h-3 bg-muted rounded w-12" />
            </div>
            
            {/* Description */}
            <div className="space-y-2">
              <div className="h-3 bg-muted rounded w-full" />
              <div className="h-3 bg-muted rounded w-2/3" />
            </div>
            
            {/* Size Options */}
            <div className="h-3 bg-muted rounded w-1/2" />
            
            {/* Price */}
            <div className="flex items-center justify-between">
              <div className="h-5 bg-muted rounded w-16" />
              <div className="h-4 bg-muted rounded w-20" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default LoadingSkeleton;