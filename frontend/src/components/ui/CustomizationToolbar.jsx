import React, { useState } from 'react';
import Icon from '../AppIcon';
import Button from './Button';

const CustomizationToolbar = ({ isOpen = false, onToggle, className = "" }) => {
  const [activeTab, setActiveTab] = useState('flavors');
  const [selectedOptions, setSelectedOptions] = useState({
    flavor: 'vanilla',
    size: 'medium',
    frosting: 'buttercream',
    decoration: 'roses'
  });

  const toolbarTabs = [
    { id: 'flavors', label: 'Flavors', icon: 'Cookie' },
    { id: 'sizes', label: 'Sizes', icon: 'Maximize' },
    { id: 'frosting', label: 'Frosting', icon: 'Paintbrush' },
    { id: 'decorations', label: 'Decorations', icon: 'Star' },
    { id: 'text', label: 'Text', icon: 'Type' }
  ];

  const customizationOptions = {
    flavors: [
      { id: 'vanilla', name: 'Vanilla Bean', price: 0, color: '#F5F5DC' },
      { id: 'chocolate', name: 'Rich Chocolate', price: 2, color: '#8B4513' },
      { id: 'strawberry', name: 'Fresh Strawberry', price: 3, color: '#FFB6C1' },
      { id: 'lemon', name: 'Lemon Zest', price: 2, color: '#FFFACD' }
    ],
    sizes: [
      { id: 'small', name: '6" Round', serves: '4-6', price: 25 },
      { id: 'medium', name: '8" Round', serves: '8-10', price: 35 },
      { id: 'large', name: '10" Round', serves: '12-15', price: 50 },
      { id: 'sheet', name: '9x13" Sheet', serves: '20-25', price: 45 }
    ],
    frosting: [
      { id: 'buttercream', name: 'Classic Buttercream', price: 0 },
      { id: 'cream-cheese', name: 'Cream Cheese', price: 3 },
      { id: 'fondant', name: 'Smooth Fondant', price: 8 },
      { id: 'whipped', name: 'Whipped Cream', price: 2 }
    ],
    decorations: [
      { id: 'roses', name: 'Sugar Roses', price: 12 },
      { id: 'sprinkles', name: 'Rainbow Sprinkles', price: 2 },
      { id: 'pearls', name: 'Edible Pearls', price: 8 },
      { id: 'custom', name: 'Custom Design', price: 25 }
    ]
  };

  const handleOptionSelect = (category, optionId) => {
    setSelectedOptions(prev => ({
      ...prev,
      [category]: optionId
    }));
  };

  const renderTabContent = () => {
    const options = customizationOptions?.[activeTab];
    if (!options) return null;

    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {options?.map((option) => (
          <div
            key={option?.id}
            onClick={() => handleOptionSelect(activeTab, option?.id)}
            className={`p-3 rounded-lg border cursor-pointer transition-smooth ${
              selectedOptions?.[activeTab] === option?.id
                ? 'border-primary bg-accent text-primary' :'border-border bg-card hover:border-primary/50 hover:bg-accent/50'
            }`}
          >
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium text-sm">{option?.name}</h4>
                {option?.serves && (
                  <p className="text-xs text-muted-foreground">Serves {option?.serves}</p>
                )}
              </div>
              <div className="text-right">
                <span className="text-sm font-medium">
                  {option?.price > 0 ? `+$${option?.price}` : 'Included'}
                </span>
                {option?.color && (
                  <div
                    className="w-4 h-4 rounded-full border border-border ml-2 inline-block"
                    style={{ backgroundColor: option?.color }}
                  />
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  };

  return (
    <>
      {/* Mobile Bottom Sheet */}
      <div className={`md:hidden fixed bottom-0 left-0 right-0 z-40 bg-background border-t border-border shadow-large transform transition-large ${
        isOpen ? 'translate-y-0' : 'translate-y-full'
      } ${className}`}>
        <div className="p-4">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-heading font-semibold">Customize Your Cake</h3>
            <Button
              variant="ghost"
              size="icon"
              iconName="ChevronDown"
              onClick={onToggle}
            />
          </div>
          
          {/* Tab Navigation */}
          <div className="flex space-x-1 mb-4 overflow-x-auto">
            {toolbarTabs?.map((tab) => (
              <button
                key={tab?.id}
                onClick={() => setActiveTab(tab?.id)}
                className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium whitespace-nowrap transition-smooth ${
                  activeTab === tab?.id
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-muted text-muted-foreground hover:bg-accent hover:text-foreground'
                }`}
              >
                <Icon name={tab?.icon} size={16} />
                <span>{tab?.label}</span>
              </button>
            ))}
          </div>
          
          {/* Tab Content */}
          <div className="max-h-64 overflow-y-auto">
            {renderTabContent()}
          </div>
        </div>
      </div>
      {/* Desktop Side Panel */}
      <div className={`hidden md:block fixed top-16 right-0 z-40 h-[calc(100vh-4rem)] w-80 bg-background border-l border-border shadow-large transform transition-large ${
        isOpen ? 'translate-x-0' : 'translate-x-full'
      } ${className}`}>
        <div className="p-4 h-full flex flex-col">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-heading font-semibold">Customize Your Cake</h3>
            <Button
              variant="ghost"
              size="icon"
              iconName="X"
              onClick={onToggle}
            />
          </div>
          
          {/* Tab Navigation */}
          <div className="flex flex-col space-y-1 mb-4">
            {toolbarTabs?.map((tab) => (
              <button
                key={tab?.id}
                onClick={() => setActiveTab(tab?.id)}
                className={`flex items-center space-x-3 px-3 py-2 rounded-md text-sm font-medium transition-smooth ${
                  activeTab === tab?.id
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-muted text-muted-foreground hover:bg-accent hover:text-foreground'
                }`}
              >
                <Icon name={tab?.icon} size={18} />
                <span>{tab?.label}</span>
              </button>
            ))}
          </div>
          
          {/* Tab Content */}
          <div className="flex-1 overflow-y-auto">
            {renderTabContent()}
          </div>
          
          {/* Action Buttons */}
          <div className="pt-4 border-t border-border space-y-2">
            <Button variant="default" fullWidth iconName="ShoppingCart">
              Add to Cart - $47.99
            </Button>
            <Button variant="outline" fullWidth iconName="Eye">
              Preview 3D Model
            </Button>
          </div>
        </div>
      </div>
      {/* Toggle Button for Desktop */}
      {!isOpen && (
        <Button
          variant="default"
          size="lg"
          iconName="Settings"
          onClick={onToggle}
          className="hidden md:flex fixed top-20 right-4 z-30 shadow-medium"
        >
          Customize
        </Button>
      )}
    </>
  );
};

export default CustomizationToolbar;