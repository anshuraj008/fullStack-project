import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Image from '../../../components/AppImage';

const PresetSelector = ({ onPresetSelect, className = "" }) => {
  const [selectedCategory, setSelectedCategory] = useState('popular');

  const presetCategories = [
    { id: 'popular', label: 'Popular', icon: 'TrendingUp' },
    { id: 'birthday', label: 'Birthday', icon: 'Gift' },
    { id: 'wedding', label: 'Wedding', icon: 'Heart' },
    { id: 'celebration', label: 'Celebration', icon: 'PartyPopper' }
  ];

  const presetDesigns = {
    popular: [
      {
        id: 'classic-vanilla',
        name: 'Classic Vanilla Dream',
        image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=300&h=200&fit=crop',
        price: 45,
        config: {
          size: 'medium',
          shape: 'round',
          layers: 2,
          flavor: 'vanilla',
          frosting: 'buttercream',
          frostingColor: '#FFFFFF',
          decorations: ['roses'],
          text: 'Celebration',
          textStyle: 'script',
          textColor: '#F8BBD9'
        }
      },
      {
        id: 'chocolate-delight',
        name: 'Chocolate Delight',
        image: 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=300&h=200&fit=crop',
        price: 52,
        config: {
          size: 'medium',
          shape: 'round',
          layers: 3,
          flavor: 'chocolate',
          frosting: 'ganache',
          frostingColor: '#8B4513',
          decorations: ['gold-leaf', 'pearls'],
          text: '',
          textStyle: 'print',
          textColor: '#2D2D2D'
        }
      },
      {
        id: 'strawberry-bliss',
        name: 'Strawberry Bliss',
        image: 'https://images.unsplash.com/photo-1565958011703-44f9829ba187?w=300&h=200&fit=crop',
        price: 48,
        config: {
          size: 'medium',
          shape: 'round',
          layers: 2,
          flavor: 'strawberry',
          frosting: 'cream-cheese',
          frostingColor: '#FFE4E1',
          decorations: ['flowers', 'sprinkles'],
          text: 'Sweet Moments',
          textStyle: 'script',
          textColor: '#E8A5C8'
        }
      }
    ],
    birthday: [
      {
        id: 'rainbow-birthday',
        name: 'Rainbow Birthday',
        image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=300&h=200&fit=crop',
        price: 55,
        config: {
          size: 'large',
          shape: 'round',
          layers: 3,
          flavor: 'vanilla',
          frosting: 'buttercream',
          frostingColor: '#F8BBD9',
          decorations: ['sprinkles', 'roses'],
          text: 'Happy Birthday',
          textStyle: 'print',
          textColor: '#2D2D2D'
        }
      },
      {
        id: 'kids-favorite',
        name: 'Kids Favorite',
        image: 'https://images.unsplash.com/photo-1464349095431-e9a21285b5f3?w=300&h=200&fit=crop',
        price: 42,
        config: {
          size: 'medium',
          shape: 'round',
          layers: 2,
          flavor: 'chocolate',
          frosting: 'buttercream',
          frostingColor: '#F5C842',
          decorations: ['sprinkles'],
          text: 'Happy Birthday',
          textStyle: 'print',
          textColor: '#2D2D2D'
        }
      }
    ],
    wedding: [
      {
        id: 'elegant-white',
        name: 'Elegant White',
        image: 'https://images.unsplash.com/photo-1621303837174-89787a7d4729?w=300&h=200&fit=crop',
        price: 85,
        config: {
          size: 'large',
          shape: 'round',
          layers: 4,
          flavor: 'vanilla',
          frosting: 'fondant',
          frostingColor: '#FFFFFF',
          decorations: ['roses', 'pearls'],
          text: '',
          textStyle: 'script',
          textColor: '#2D2D2D'
        }
      },
      {
        id: 'romantic-pink',
        name: 'Romantic Pink',
        image: 'https://images.unsplash.com/photo-1535254973040-607b474cb50d?w=300&h=200&fit=crop',
        price: 78,
        config: {
          size: 'large',
          shape: 'heart',
          layers: 3,
          flavor: 'strawberry',
          frosting: 'buttercream',
          frostingColor: '#F8BBD9',
          decorations: ['roses', 'flowers'],
          text: '',
          textStyle: 'script',
          textColor: '#2D2D2D'
        }
      }
    ],
    celebration: [
      {
        id: 'graduation-special',
        name: 'Graduation Special',
        image: 'https://images.unsplash.com/photo-1557925923-cd4648e211a0?w=300&h=200&fit=crop',
        price: 65,
        config: {
          size: 'sheet',
          shape: 'square',
          layers: 2,
          flavor: 'lemon',
          frosting: 'cream-cheese',
          frostingColor: '#FFFACD',
          decorations: ['gold-leaf'],
          text: 'Congratulations',
          textStyle: 'print',
          textColor: '#2D2D2D'
        }
      },
      {
        id: 'anniversary-gold',
        name: 'Anniversary Gold',
        image: 'https://images.unsplash.com/photo-1571115764595-644a1f56a55c?w=300&h=200&fit=crop',
        price: 72,
        config: {
          size: 'medium',
          shape: 'round',
          layers: 3,
          flavor: 'red-velvet',
          frosting: 'cream-cheese',
          frostingColor: '#FFFFFF',
          decorations: ['gold-leaf', 'roses'],
          text: 'Anniversary',
          textStyle: 'script',
          textColor: '#F5C842'
        }
      }
    ]
  };

  const handlePresetSelect = (preset) => {
    if (onPresetSelect) {
      onPresetSelect(preset?.config);
    }
  };

  return (
    <div className={`bg-background border border-border rounded-lg shadow-medium ${className}`}>
      {/* Header */}
      <div className="p-4 border-b border-border">
        <h3 className="text-lg font-heading font-semibold text-foreground">
          Quick Start Presets
        </h3>
        <p className="text-sm text-muted-foreground">
          Choose a design to customize or use as-is
        </p>
      </div>
      {/* Category Tabs */}
      <div className="p-4 border-b border-border">
        <div className="flex space-x-1 overflow-x-auto">
          {presetCategories?.map((category) => (
            <button
              key={category?.id}
              onClick={() => setSelectedCategory(category?.id)}
              className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium whitespace-nowrap transition-smooth ${
                selectedCategory === category?.id
                  ? 'bg-primary text-primary-foreground'
                  : 'text-muted-foreground hover:text-foreground hover:bg-accent'
              }`}
            >
              <Icon name={category?.icon} size={16} />
              <span>{category?.label}</span>
            </button>
          ))}
        </div>
      </div>
      {/* Preset Grid */}
      <div className="p-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {presetDesigns?.[selectedCategory]?.map((preset) => (
            <div
              key={preset?.id}
              className="group border border-border rounded-lg overflow-hidden hover:border-primary/50 transition-smooth cursor-pointer"
              onClick={() => handlePresetSelect(preset)}
            >
              {/* Preset Image */}
              <div className="relative h-32 overflow-hidden">
                <Image
                  src={preset?.image}
                  alt={preset?.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-smooth"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-smooth" />
                <div className="absolute top-2 right-2">
                  <div className="bg-white/90 backdrop-blur-sm rounded-full px-2 py-1">
                    <span className="text-xs font-medium text-foreground">
                      ${preset?.price}
                    </span>
                  </div>
                </div>
              </div>

              {/* Preset Info */}
              <div className="p-3">
                <h4 className="font-medium text-sm text-foreground mb-1">
                  {preset?.name}
                </h4>
                <div className="flex items-center justify-between">
                  <div className="text-xs text-muted-foreground">
                    {preset?.config?.layers} layer{preset?.config?.layers > 1 ? 's' : ''} • {preset?.config?.flavor}
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    iconName="ArrowRight"
                    className="opacity-0 group-hover:opacity-100 transition-smooth"
                  >
                    Use
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Custom Design Option */}
      <div className="p-4 border-t border-border bg-muted/30">
        <div className="text-center">
          <h4 className="font-medium text-sm text-foreground mb-2">
            Start from Scratch
          </h4>
          <p className="text-xs text-muted-foreground mb-3">
            Create your own unique design with full customization
          </p>
          <Button
            variant="outline"
            size="sm"
            iconName="Palette"
            onClick={() => handlePresetSelect({
              size: 'medium',
              shape: 'round',
              layers: 1,
              flavor: 'vanilla',
              frosting: 'buttercream',
              frostingColor: '#FFFFFF',
              decorations: [],
              text: '',
              textStyle: 'script',
              textColor: '#2D2D2D'
            })}
          >
            Start Custom Design
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PresetSelector;