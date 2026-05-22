import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import { Checkbox } from '../../../components/ui/Checkbox';

const CustomizationPanel = ({ 
  cakeConfig, 
  onConfigChange, 
  isOpen = true, 
  onToggle, 
  className = "" 
}) => {
  const [activeSection, setActiveSection] = useState('base');
  const [textInput, setTextInput] = useState(cakeConfig?.text || '');

  const customizationSections = [
    { id: 'base', label: 'Cake Base', icon: 'Layers' },
    { id: 'flavors', label: 'Flavors', icon: 'Cookie' },
    { id: 'frosting', label: 'Frosting', icon: 'Paintbrush' },
    { id: 'decorations', label: 'Decorations', icon: 'Star' },
    { id: 'text', label: 'Text & Message', icon: 'Type' },
    { id: 'special', label: 'Special Requests', icon: 'MessageSquare' }
  ];

  const sizeOptions = [
    { value: 'small', label: '6" Round (Serves 4-6)', price: 25 },
    { value: 'medium', label: '8" Round (Serves 8-10)', price: 35 },
    { value: 'large', label: '10" Round (Serves 12-15)', price: 50 },
    { value: 'sheet', label: '9x13" Sheet (Serves 20-25)', price: 45 }
  ];

  const shapeOptions = [
    { value: 'round', label: 'Round' },
    { value: 'square', label: 'Square' },
    { value: 'heart', label: 'Heart (+₹5)' },
    { value: 'custom', label: 'Custom Shape (+₹15)' }
  ];

  const flavorOptions = [
    { value: 'vanilla', label: 'Vanilla Bean', price: 0 },
    { value: 'chocolate', label: 'Rich Chocolate', price: 2 },
    { value: 'strawberry', label: 'Fresh Strawberry', price: 3 },
    { value: 'lemon', label: 'Lemon Zest', price: 2 },
    { value: 'red-velvet', label: 'Red Velvet', price: 4 },
    { value: 'carrot', label: 'Carrot Spice', price: 3 }
  ];

  const frostingOptions = [
    { value: 'buttercream', label: 'Classic Buttercream', price: 0 },
    { value: 'cream-cheese', label: 'Cream Cheese', price: 3 },
    { value: 'fondant', label: 'Smooth Fondant', price: 8 },
    { value: 'whipped', label: 'Whipped Cream', price: 2 },
    { value: 'ganache', label: 'Chocolate Ganache', price: 5 }
  ];

  const decorationOptions = [
    { id: 'roses', label: 'Sugar Roses', price: 12 },
    { id: 'sprinkles', label: 'Rainbow Sprinkles', price: 2 },
    { id: 'pearls', label: 'Edible Pearls', price: 8 },
    { id: 'flowers', label: 'Fresh Flowers', price: 15 },
    { id: 'gold-leaf', label: 'Gold Leaf', price: 20 },
    { id: 'custom-design', label: 'Custom Design', price: 25 }
  ];

  const handleConfigUpdate = (key, value) => {
    const updatedConfig = { ...cakeConfig, [key]: value };
    onConfigChange(updatedConfig);
  };

  const handleDecorationToggle = (decorationId) => {
    const currentDecorations = cakeConfig?.decorations || [];
    const updatedDecorations = currentDecorations?.includes(decorationId)
      ? currentDecorations?.filter(id => id !== decorationId)
      : [...currentDecorations, decorationId];
    
    handleConfigUpdate('decorations', updatedDecorations);
  };

  const handleTextChange = (value) => {
    setTextInput(value);
    handleConfigUpdate('text', value);
  };

  const renderSectionContent = () => {
    switch (activeSection) {
      case 'base':
        return (
          <div className="space-y-4">
            <Select
              label="Cake Size"
              options={sizeOptions?.map(opt => ({
                value: opt?.value,
                label: opt?.label,
                description: `Base price: ₹${opt?.price}`
              }))}
              value={cakeConfig?.size}
              onChange={(value) => handleConfigUpdate('size', value)}
            />
            <Select
              label="Cake Shape"
              options={shapeOptions}
              value={cakeConfig?.shape}
              onChange={(value) => handleConfigUpdate('shape', value)}
            />
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Number of Layers
              </label>
              <div className="flex items-center space-x-4">
                <Button
                  variant="outline"
                  size="icon"
                  iconName="Minus"
                  onClick={() => handleConfigUpdate('layers', Math.max(1, cakeConfig?.layers - 1))}
                  disabled={cakeConfig?.layers <= 1}
                />
                <span className="text-lg font-semibold w-8 text-center">{cakeConfig?.layers}</span>
                <Button
                  variant="outline"
                  size="icon"
                  iconName="Plus"
                  onClick={() => handleConfigUpdate('layers', Math.min(5, cakeConfig?.layers + 1))}
                  disabled={cakeConfig?.layers >= 5}
                />
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                Additional layers: +₹8 each
              </p>
            </div>
          </div>
        );

      case 'flavors':
        return (
          <div className="space-y-4">
            <Select
              label="Primary Flavor"
              description="Main cake flavor for all layers"
              options={flavorOptions?.map(opt => ({
                value: opt?.value,
                label: opt?.label,
                description: opt?.price > 0 ? `+₹${opt?.price}` : 'Included'
              }))}
              value={cakeConfig?.flavor}
              onChange={(value) => handleConfigUpdate('flavor', value)}
            />
            {cakeConfig?.layers > 1 && (
              <div className="p-4 bg-accent rounded-lg">
                <h4 className="font-medium text-sm mb-2">Layer-by-Layer Flavors</h4>
                <p className="text-xs text-muted-foreground mb-3">
                  Customize each layer individually (+₹3 per different flavor)
                </p>
                <Button variant="outline" size="sm" iconName="Settings">
                  Customize Layers
                </Button>
              </div>
            )}
          </div>
        );

      case 'frosting':
        return (
          <div className="space-y-4">
            <Select
              label="Frosting Type"
              options={frostingOptions?.map(opt => ({
                value: opt?.value,
                label: opt?.label,
                description: opt?.price > 0 ? `+₹${opt?.price}` : 'Included'
              }))}
              value={cakeConfig?.frosting}
              onChange={(value) => handleConfigUpdate('frosting', value)}
            />
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Frosting Color
              </label>
              <div className="grid grid-cols-6 gap-2">
                {['#FFFFFF', '#F8BBD9', '#E8A5C8', '#FFE4E1', '#A8D5A8', '#F5C842']?.map((color) => (
                  <button
                    key={color}
                    className={`w-8 h-8 rounded-full border-2 transition-smooth ${
                      cakeConfig?.frostingColor === color 
                        ? 'border-primary scale-110' :'border-border hover:border-primary/50'
                    }`}
                    style={{ backgroundColor: color }}
                    onClick={() => handleConfigUpdate('frostingColor', color)}
                  />
                ))}
              </div>
            </div>
          </div>
        );

      case 'decorations':
        return (
          <div className="space-y-4">
            <div>
              <h4 className="font-medium text-sm mb-3">Select Decorations</h4>
              <div className="space-y-2">
                {decorationOptions?.map((decoration) => (
                  <div key={decoration?.id} className="flex items-center justify-between p-3 border border-border rounded-lg">
                    <div className="flex items-center space-x-3">
                      <Checkbox
                        checked={(cakeConfig?.decorations || [])?.includes(decoration?.id)}
                        onChange={() => handleDecorationToggle(decoration?.id)}
                      />
                      <div>
                        <span className="text-sm font-medium">{decoration?.label}</span>
                        <p className="text-xs text-muted-foreground">+₹{decoration?.price}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );

      case 'text':
        return (
          <div className="space-y-4">
            <Input
              label="Cake Message"
              type="text"
              placeholder="Happy Birthday, Congratulations..."
              value={textInput}
              onChange={(e) => handleTextChange(e?.target?.value)}
              description="Maximum 50 characters"
              maxLength={50}
            />
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Text Style
              </label>
              <div className="grid grid-cols-2 gap-2">
                <Button
                  variant={cakeConfig?.textStyle === 'script' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => handleConfigUpdate('textStyle', 'script')}
                >
                  Script
                </Button>
                <Button
                  variant={cakeConfig?.textStyle === 'print' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => handleConfigUpdate('textStyle', 'print')}
                >
                  Print
                </Button>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Text Color
              </label>
              <div className="grid grid-cols-6 gap-2">
                {['#2D2D2D', '#F8BBD9', '#E8A5C8', '#A8D5A8', '#F5C842', '#E8A5A5']?.map((color) => (
                  <button
                    key={color}
                    className={`w-8 h-8 rounded-full border-2 transition-smooth ${
                      cakeConfig?.textColor === color 
                        ? 'border-primary scale-110' :'border-border hover:border-primary/50'
                    }`}
                    style={{ backgroundColor: color }}
                    onClick={() => handleConfigUpdate('textColor', color)}
                  />
                ))}
              </div>
            </div>
          </div>
        );

      case 'special':
        return (
          <div className="space-y-4">
            <Input
              label="Special Requests"
              type="textarea"
              placeholder="Any special dietary requirements, design preferences, or delivery instructions..."
              value={cakeConfig?.specialRequests || ''}
              onChange={(e) => handleConfigUpdate('specialRequests', e?.target?.value)}
              description="Our bakers will review and contact you if needed"
              rows={4}
            />
            <div className="p-4 bg-accent rounded-lg">
              <h4 className="font-medium text-sm mb-2">Dietary Options</h4>
              <div className="space-y-2">
                <Checkbox
                  label="Gluten-Free (+₹8)"
                  checked={cakeConfig?.glutenFree || false}
                  onChange={(e) => handleConfigUpdate('glutenFree', e?.target?.checked)}
                />
                <Checkbox
                  label="Sugar-Free (+₹6)"
                  checked={cakeConfig?.sugarFree || false}
                  onChange={(e) => handleConfigUpdate('sugarFree', e?.target?.checked)}
                />
                <Checkbox
                  label="Vegan (+₹10)"
                  checked={cakeConfig?.vegan || false}
                  onChange={(e) => handleConfigUpdate('vegan', e?.target?.checked)}
                />
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className={`bg-background border-l border-border ${className}`}>
      {/* Panel Header */}
      <div className="p-4 border-b border-border">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-heading font-semibold text-foreground">
            Customize Your Cake
          </h2>
          {onToggle && (
            <Button
              variant="ghost"
              size="icon"
              iconName={isOpen ? "ChevronRight" : "ChevronLeft"}
              onClick={onToggle}
              className="md:hidden"
            />
          )}
        </div>
      </div>
      {/* Section Navigation */}
      <div className="p-4 border-b border-border">
        <div className="grid grid-cols-2 md:grid-cols-1 gap-1">
          {customizationSections?.map((section) => (
            <button
              key={section?.id}
              onClick={() => setActiveSection(section?.id)}
              className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-smooth ${
                activeSection === section?.id
                  ? 'bg-primary text-primary-foreground'
                  : 'text-foreground hover:bg-accent hover:text-primary'
              }`}
            >
              <Icon name={section?.icon} size={16} />
              <span className="hidden md:inline">{section?.label}</span>
            </button>
          ))}
        </div>
      </div>
      {/* Section Content */}
      <div className="p-4 flex-1 overflow-y-auto">
        {renderSectionContent()}
      </div>
    </div>
  );
};

export default CustomizationPanel;