import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Header from '../../components/ui/Header';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import CakeViewer3D from './components/CakeViewer3D';
import CustomizationPanel from './components/CustomizationPanel';
import PriceCalculator from './components/PriceCalculator';
import PresetSelector from './components/PresetSelector';
import ProgressIndicator from './components/ProgressIndicator';

const CustomCakeDesigner = () => {
  const [cakeConfig, setCakeConfig] = useState({
    size: 'medium',
    shape: 'round',
    layers: 1,
    flavor: 'vanilla',
    frosting: 'buttercream',
    frostingColor: '#FFFFFF',
    decorations: [],
    text: '',
    textStyle: 'script',
    textColor: '#2D2D2D',
    specialRequests: '',
    glutenFree: false,
    sugarFree: false,
    vegan: false
  });

  const [currentStep, setCurrentStep] = useState(1);
  const [isCustomizationOpen, setIsCustomizationOpen] = useState(true);
  const [isPresetSelectorOpen, setIsPresetSelectorOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [savedDesigns, setSavedDesigns] = useState([]);
  const [priceInfo, setPriceInfo] = useState({ breakdown: {}, total: 0 });

  // Check if mobile view
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Auto-save design
  useEffect(() => {
    const autoSave = setTimeout(() => {
      const designId = `design_${Date.now()}`;
      const savedDesign = {
        id: designId,
        config: cakeConfig,
        timestamp: new Date()?.toISOString(),
        price: priceInfo?.total
      };
      
      // Save to localStorage
      const existingDesigns = JSON.parse(localStorage.getItem('savedCakeDesigns') || '[]');
      const updatedDesigns = [savedDesign, ...existingDesigns?.slice(0, 4)]; // Keep last 5
      localStorage.setItem('savedCakeDesigns', JSON.stringify(updatedDesigns));
      setSavedDesigns(updatedDesigns);
    }, 2000);

    return () => clearTimeout(autoSave);
  }, [cakeConfig, priceInfo?.total]);

  const handleConfigChange = (newConfig) => {
    setCakeConfig(newConfig);
  };

  const handlePresetSelect = (presetConfig) => {
    setCakeConfig(presetConfig);
    setIsPresetSelectorOpen(false);
    setCurrentStep(2);
  };

  const handlePriceUpdate = (priceData) => {
    setPriceInfo(priceData);
  };

  const handleModelUpdate = (modelData) => {
    // Handle 3D model updates
    console.log('3D Model updated:', modelData);
  };

  const handleSaveDesign = () => {
    const designName = prompt('Enter a name for your design:') || `Custom Cake ${Date.now()}`;
    const savedDesign = {
      id: `saved_${Date.now()}`,
      name: designName,
      config: cakeConfig,
      timestamp: new Date()?.toISOString(),
      price: priceInfo?.total
    };
    
    const existingDesigns = JSON.parse(localStorage.getItem('savedCakeDesigns') || '[]');
    const updatedDesigns = [savedDesign, ...existingDesigns];
    localStorage.setItem('savedCakeDesigns', JSON.stringify(updatedDesigns));
    setSavedDesigns(updatedDesigns);
    
    alert('Design saved successfully!');
  };

  const handleShareDesign = () => {
    const shareData = {
      title: 'Check out my custom cake design!',
      text: `I designed a custom ${cakeConfig?.size} ${cakeConfig?.flavor} cake for $${priceInfo?.total?.toFixed(2)}`,
      url: window.location?.href
    };
    
    if (navigator.share) {
      navigator.share(shareData);
    } else {
      // Fallback - copy to clipboard
      navigator.clipboard?.writeText(`${shareData?.text} - ${shareData?.url}`);
      alert('Design link copied to clipboard!');
    }
  };

  const handleAddToCart = () => {
    const cartItem = {
      id: `custom_${Date.now()}`,
      type: 'custom',
      name: 'Custom Designed Cake',
      config: cakeConfig,
      price: priceInfo?.total,
      quantity: 1,
      image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=300&h=200&fit=crop'
    };
    
    // Add to cart (localStorage simulation)
    const existingCart = JSON.parse(localStorage.getItem('cakeCart') || '[]');
    const updatedCart = [...existingCart, cartItem];
    localStorage.setItem('cakeCart', JSON.stringify(updatedCart));
    
    alert('Custom cake added to cart!');
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      {/* Main Content */}
      <div className="pt-16">
        {/* Mobile Header */}
        <div className="md:hidden bg-background border-b border-border p-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-lg font-heading font-semibold text-foreground">
                Custom Cake Designer
              </h1>
              <p className="text-sm text-muted-foreground">
                Create your perfect cake
              </p>
            </div>
            <div className="flex items-center space-x-2">
              <Button
                variant="ghost"
                size="icon"
                iconName="Palette"
                onClick={() => setIsPresetSelectorOpen(!isPresetSelectorOpen)}
              />
              <Button
                variant="ghost"
                size="icon"
                iconName="Settings"
                onClick={() => setIsCustomizationOpen(!isCustomizationOpen)}
              />
            </div>
          </div>
        </div>

        {/* Desktop Header */}
        <div className="hidden md:block bg-background border-b border-border p-6">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-heading font-bold text-foreground">
                  3D Custom Cake Designer
                </h1>
                <p className="text-muted-foreground mt-1">
                  Design your perfect cake with real-time 3D preview and instant pricing
                </p>
              </div>
              <div className="flex items-center space-x-4">
                <Button
                  variant="outline"
                  iconName="Palette"
                  onClick={() => setIsPresetSelectorOpen(!isPresetSelectorOpen)}
                >
                  Quick Presets
                </Button>
                <Button
                  variant="outline"
                  iconName="Save"
                  onClick={handleSaveDesign}
                >
                  Save Design
                </Button>
                <Button
                  variant="outline"
                  iconName="Share"
                  onClick={handleShareDesign}
                >
                  Share
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Main Layout */}
        <div className="flex h-[calc(100vh-8rem)] md:h-[calc(100vh-12rem)]">
          {/* Left Sidebar - Progress & Presets (Desktop Only) */}
          <div className="hidden lg:block w-80 border-r border-border bg-background overflow-y-auto">
            <div className="p-4 space-y-4">
              <ProgressIndicator currentStep={currentStep} totalSteps={6} />
              
              {isPresetSelectorOpen && (
                <PresetSelector onPresetSelect={handlePresetSelect} />
              )}
              
              {savedDesigns?.length > 0 && (
                <div className="bg-background border border-border rounded-lg p-4">
                  <h3 className="font-heading font-semibold text-foreground mb-3">
                    Recent Designs
                  </h3>
                  <div className="space-y-2">
                    {savedDesigns?.slice(0, 3)?.map((design) => (
                      <button
                        key={design?.id}
                        onClick={() => setCakeConfig(design?.config)}
                        className="w-full text-left p-2 rounded-md hover:bg-accent transition-smooth"
                      >
                        <div className="text-sm font-medium text-foreground">
                          {design?.name || 'Unnamed Design'}
                        </div>
                        <div className="text-xs text-muted-foreground">
                          ₹{design?.price?.toFixed(2)} • {new Date(design.timestamp)?.toLocaleDateString()}
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Main Content Area */}
          <div className="flex-1 flex flex-col md:flex-row">
            {/* 3D Viewer */}
            <div className={`${isMobile ? 'h-1/2' : 'flex-1'} relative`}>
              <CakeViewer3D
                cakeConfig={cakeConfig}
                onModelUpdate={handleModelUpdate}
                className="w-full h-full"
              />
              
              {/* Floating Action Buttons (Mobile) */}
              {isMobile && (
                <div className="absolute bottom-4 right-4 flex flex-col space-y-2">
                  <Button
                    variant="default"
                    size="icon"
                    iconName="RotateCcw"
                    className="shadow-large"
                  />
                  <Button
                    variant="default"
                    size="icon"
                    iconName="ZoomIn"
                    className="shadow-large"
                  />
                </div>
              )}
            </div>

            {/* Right Panel - Customization & Price */}
            <div className={`${isMobile ? 'h-1/2' : 'w-96'} flex flex-col border-l border-border`}>
              {/* Price Calculator - Always Visible */}
              <div className="flex-shrink-0">
                <PriceCalculator
                  cakeConfig={cakeConfig}
                  onPriceUpdate={handlePriceUpdate}
                  className="border-0 border-b border-border rounded-none"
                />
              </div>

              {/* Customization Panel */}
              <div className="flex-1 overflow-hidden">
                <CustomizationPanel
                  cakeConfig={cakeConfig}
                  onConfigChange={handleConfigChange}
                  isOpen={isCustomizationOpen}
                  onToggle={() => setIsCustomizationOpen(!isCustomizationOpen)}
                  className="h-full"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Bottom Actions */}
        {isMobile && (
          <div className="fixed bottom-0 left-0 right-0 bg-background border-t border-border p-4 z-30">
            <div className="flex space-x-2">
              <Button
                variant="outline"
                iconName="Save"
                onClick={handleSaveDesign}
                className="flex-1"
              >
                Save
              </Button>
              <Button
                variant="default"
                iconName="ShoppingCart"
                onClick={handleAddToCart}
                className="flex-2"
              >
                Add to Cart - ₹{priceInfo?.total?.toFixed(2)}
              </Button>
            </div>
          </div>
        )}

        {/* Preset Selector Modal (Mobile) */}
        {isMobile && isPresetSelectorOpen && (
          <>
            <div
              className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40"
              onClick={() => setIsPresetSelectorOpen(false)}
            />
            <div className="fixed inset-x-4 top-20 bottom-20 bg-background rounded-lg shadow-xl z-50 overflow-hidden">
              <div className="flex items-center justify-between p-4 border-b border-border">
                <h2 className="text-lg font-heading font-semibold">Quick Presets</h2>
                <Button
                  variant="ghost"
                  size="icon"
                  iconName="X"
                  onClick={() => setIsPresetSelectorOpen(false)}
                />
              </div>
              <div className="flex-1 overflow-y-auto">
                <PresetSelector onPresetSelect={handlePresetSelect} className="border-0" />
              </div>
            </div>
          </>
        )}

        {/* Navigation Breadcrumb */}
        <div className="hidden md:block bg-muted/30 border-t border-border p-4">
          <div className="max-w-7xl mx-auto">
            <nav className="flex items-center space-x-2 text-sm text-muted-foreground">
              <Link to="/3d-interactive-homepage" className="hover:text-primary transition-smooth">
                Home
              </Link>
              <Icon name="ChevronRight" size={16} />
              <span className="text-foreground">Custom Cake Designer</span>
            </nav>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomCakeDesigner;