import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Image from '../../../components/AppImage';

const SavedDesigns = ({ className = "" }) => {
  const [designs] = useState([
    {
      id: 'design-001',
      name: 'Pink Rose Birthday Cake',
      image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=400&h=300&fit=crop',
      createdDate: '2024-08-20',
      lastModified: '2024-08-22',
      estimatedPrice: 65.99,
      layers: 2,
      flavor: 'Vanilla & Strawberry',
      size: '8 inch',
      status: 'draft',
      canOrder: true
    },
    {
      id: 'design-002',
      name: 'Chocolate Wedding Cake',
      image: 'https://images.pexels.com/photos/1721932/pexels-photo-1721932.jpeg?w=400&h=300&fit=crop',
      createdDate: '2024-08-15',
      lastModified: '2024-08-18',
      estimatedPrice: 125.50,
      layers: 3,
      flavor: 'Chocolate Fudge',
      size: '10 inch',
      status: 'completed',
      canOrder: true
    },
    {
      id: 'design-003',
      name: 'Rainbow Unicorn Cake',
      image: 'https://images.pixabay.com/photo/2017/01/11/11/33/cake-1971552_960_720.jpg?w=400&h=300&fit=crop',
      createdDate: '2024-08-10',
      lastModified: '2024-08-12',
      estimatedPrice: 89.99,
      layers: 2,
      flavor: 'Funfetti',
      size: '9 inch',
      status: 'draft',
      canOrder: true
    },
    {
      id: 'design-004',
      name: 'Elegant Floral Cake',
      image: 'https://images.unsplash.com/photo-1535141192574-5d4897c12636?w=400&h=300&fit=crop',
      createdDate: '2024-08-05',
      lastModified: '2024-08-08',
      estimatedPrice: 95.00,
      layers: 2,
      flavor: 'Lemon',
      size: '8 inch',
      status: 'completed',
      canOrder: true
    }
  ]);

  const getStatusConfig = (status) => {
    const configs = {
      'draft': {
        label: 'Draft',
        color: 'bg-warning/10 text-warning border-warning/20',
        icon: 'Edit'
      },
      'completed': {
        label: 'Completed',
        color: 'bg-success/10 text-success border-success/20',
        icon: 'CheckCircle'
      }
    };
    return configs?.[status] || configs?.draft;
  };

  const formatDate = (dateString) => {
    return new Date(dateString)?.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  if (designs?.length === 0) {
    return (
      <div className={`bg-card border border-border rounded-lg shadow-soft p-6 text-center ${className}`}>
        <Icon name="Bookmark" size={48} className="text-muted-foreground mx-auto mb-3" />
        <h3 className="text-lg font-heading font-semibold text-foreground mb-2">
          No Saved Designs
        </h3>
        <p className="text-muted-foreground mb-4">
          Start creating custom cake designs and save them for later.
        </p>
        <Link to="/3d-custom-cake-designer">
          <Button variant="default" iconName="Plus">
            Create New Design
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
            Saved Designs
          </h2>
          <Link to="/3d-custom-cake-designer">
            <Button variant="outline" size="sm" iconName="Plus">
              New Design
            </Button>
          </Link>
        </div>
      </div>
      <div className="p-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {designs?.map((design) => {
            const statusConfig = getStatusConfig(design?.status);
            
            return (
              <div
                key={design?.id}
                className="bg-background border border-border rounded-lg overflow-hidden hover:shadow-medium transition-smooth group"
              >
                {/* Design Image */}
                <div className="relative aspect-square overflow-hidden">
                  <Image
                    src={design?.image}
                    alt={design?.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-large"
                  />
                  
                  {/* Status Badge */}
                  <div className={`absolute top-2 right-2 px-2 py-1 rounded-full text-xs font-medium border ${statusConfig?.color}`}>
                    <div className="flex items-center space-x-1">
                      <Icon name={statusConfig?.icon} size={10} />
                      <span>{statusConfig?.label}</span>
                    </div>
                  </div>

                  {/* Quick Actions Overlay */}
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-smooth flex items-center justify-center space-x-2">
                    <Button
                      variant="secondary"
                      size="sm"
                      iconName="Eye"
                      className="text-xs"
                    >
                      Preview
                    </Button>
                    <Button
                      variant="default"
                      size="sm"
                      iconName="Edit"
                      className="text-xs"
                    >
                      Edit
                    </Button>
                  </div>
                </div>
                {/* Design Details */}
                <div className="p-3">
                  <h3 className="font-medium text-foreground text-sm mb-2 line-clamp-1">
                    {design?.name}
                  </h3>
                  
                  <div className="space-y-1 mb-3">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-muted-foreground">Size:</span>
                      <span className="text-foreground">{design?.size}</span>
                    </div>
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-muted-foreground">Layers:</span>
                      <span className="text-foreground">{design?.layers}</span>
                    </div>
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-muted-foreground">Flavor:</span>
                      <span className="text-foreground line-clamp-1">{design?.flavor}</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between mb-3">
                    <span className="text-lg font-heading font-bold text-primary">
                      ${design?.estimatedPrice?.toFixed(2)}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      Modified {formatDate(design?.lastModified)}
                    </span>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex space-x-2">
                    <Button
                      variant="outline"
                      size="xs"
                      iconName="Edit"
                      fullWidth
                      className="text-xs"
                    >
                      Continue
                    </Button>
                    
                    {design?.canOrder && (
                      <Button
                        variant="default"
                        size="xs"
                        iconName="ShoppingCart"
                        fullWidth
                        className="text-xs"
                      >
                        Order
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default SavedDesigns;