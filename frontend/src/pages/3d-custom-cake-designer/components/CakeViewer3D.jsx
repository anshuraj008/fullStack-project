import React, { useState, useRef, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const CakeViewer3D = ({ cakeConfig, onModelUpdate, className = "" }) => {
  const viewerRef = useRef(null);
  const [isLoading, setIsLoading] = useState(true);
  const [viewMode, setViewMode] = useState('perspective');
  const [rotation, setRotation] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [isDragging, setIsDragging] = useState(false);
  const [lastMousePos, setLastMousePos] = useState({ x: 0, y: 0 });

  // Mock 3D cake rendering based on configuration
  const renderCakeModel = () => {
    const { size, shape, layers, flavor, frosting, decorations, text } = cakeConfig;
    
    // Simulate 3D model loading
    setTimeout(() => {
      setIsLoading(false);
      if (onModelUpdate) {
        onModelUpdate({
          rendered: true,
          config: cakeConfig,
          timestamp: new Date()?.toISOString()
        });
      }
    }, 1500);

    return (
      <div className="relative w-full h-full flex items-center justify-center">
        {/* Mock 3D Cake Visualization */}
        <div 
          className="relative transition-transform duration-300 ease-out"
          style={{
            transform: `perspective(800px) rotateX(${rotation?.x}deg) rotateY(${rotation?.y}deg) scale(${zoom})`,
            transformStyle: 'preserve-3d'
          }}
        >
          {/* Cake Base */}
          <div className={`relative ${getCakeSizeClasses(size)} ${getCakeShapeClasses(shape)}`}>
            {/* Render layers */}
            {Array.from({ length: layers }, (_, index) => (
              <div
                key={index}
                className={`absolute inset-0 ${getFrostingColor(frosting)} border-2 border-opacity-20 border-gray-300`}
                style={{
                  height: `${100 - index * 15}%`,
                  width: `${100 - index * 10}%`,
                  top: `${index * 8}%`,
                  left: `${index * 5}%`,
                  borderRadius: shape === 'round' ? '50%' : '8px',
                  boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
                  background: `linear-gradient(45deg, ${getFrostingColor(frosting)}, ${getFrostingColor(frosting)}dd)`
                }}
              >
                {/* Layer decorations */}
                {decorations?.includes('roses') && index === 0 && (
                  <div className="absolute top-2 left-1/2 transform -translate-x-1/2">
                    <div className="w-4 h-4 bg-pink-400 rounded-full shadow-sm"></div>
                  </div>
                )}
                {decorations?.includes('sprinkles') && (
                  <div className="absolute inset-0 overflow-hidden rounded-inherit">
                    {Array.from({ length: 12 }, (_, i) => (
                      <div
                        key={i}
                        className="absolute w-1 h-3 bg-gradient-to-b from-yellow-400 to-red-400 rounded-full"
                        style={{
                          top: `${Math.random() * 80 + 10}%`,
                          left: `${Math.random() * 80 + 10}%`,
                          transform: `rotate(${Math.random() * 360}deg)`
                        }}
                      />
                    ))}
                  </div>
                )}
              </div>
            ))}
            
            {/* Text overlay */}
            {text && (
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10">
                <div className="bg-white bg-opacity-90 px-3 py-1 rounded-md shadow-sm">
                  <span className="text-sm font-medium text-gray-800">{text}</span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  };

  const getCakeSizeClasses = (size) => {
    const sizes = {
      small: 'w-24 h-16',
      medium: 'w-32 h-20',
      large: 'w-40 h-24',
      sheet: 'w-48 h-16'
    };
    return sizes?.[size] || sizes?.medium;
  };

  const getCakeShapeClasses = (shape) => {
    return shape === 'round' ? 'rounded-full' : 'rounded-lg';
  };

  const getFrostingColor = (frosting) => {
    const colors = {
      buttercream: '#FFF8DC',
      'cream-cheese': '#F5F5DC',
      fondant: '#FFFFFF',
      whipped: '#FFFAFA'
    };
    return colors?.[frosting] || colors?.buttercream;
  };

  const handleMouseDown = (e) => {
    setIsDragging(true);
    setLastMousePos({ x: e?.clientX, y: e?.clientY });
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    
    const deltaX = e?.clientX - lastMousePos?.x;
    const deltaY = e?.clientY - lastMousePos?.y;
    
    setRotation(prev => ({
      x: Math.max(-45, Math.min(45, prev?.x - deltaY * 0.5)),
      y: prev?.y + deltaX * 0.5
    }));
    
    setLastMousePos({ x: e?.clientX, y: e?.clientY });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleZoom = (direction) => {
    setZoom(prev => {
      const newZoom = direction === 'in' ? prev * 1.2 : prev / 1.2;
      return Math.max(0.5, Math.min(3, newZoom));
    });
  };

  const resetView = () => {
    setRotation({ x: 0, y: 0 });
    setZoom(1);
  };

  useEffect(() => {
    const handleGlobalMouseMove = (e) => handleMouseMove(e);
    const handleGlobalMouseUp = () => handleMouseUp();

    if (isDragging) {
      document.addEventListener('mousemove', handleGlobalMouseMove);
      document.addEventListener('mouseup', handleGlobalMouseUp);
    }

    return () => {
      document.removeEventListener('mousemove', handleGlobalMouseMove);
      document.removeEventListener('mouseup', handleGlobalMouseUp);
    };
  }, [isDragging, lastMousePos]);

  return (
    <div className={`relative bg-gradient-to-br from-gray-50 to-gray-100 rounded-lg overflow-hidden ${className}`}>
      {/* Loading Overlay */}
      {isLoading && (
        <div className="absolute inset-0 bg-background/80 backdrop-blur-sm flex items-center justify-center z-20">
          <div className="text-center">
            <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-2"></div>
            <p className="text-sm text-muted-foreground">Rendering your cake...</p>
          </div>
        </div>
      )}

      {/* 3D Viewer Controls */}
      <div className="absolute top-4 right-4 z-10 flex flex-col space-y-2">
        <Button
          variant="secondary"
          size="icon"
          iconName="RotateCcw"
          onClick={resetView}
          className="bg-white/90 hover:bg-white shadow-medium"
        />
        <Button
          variant="secondary"
          size="icon"
          iconName="ZoomIn"
          onClick={() => handleZoom('in')}
          className="bg-white/90 hover:bg-white shadow-medium"
        />
        <Button
          variant="secondary"
          size="icon"
          iconName="ZoomOut"
          onClick={() => handleZoom('out')}
          className="bg-white/90 hover:bg-white shadow-medium"
        />
      </div>

      {/* View Mode Toggle */}
      <div className="absolute top-4 left-4 z-10">
        <div className="bg-white/90 rounded-lg p-1 shadow-medium">
          <Button
            variant={viewMode === 'perspective' ? 'default' : 'ghost'}
            size="sm"
            onClick={() => setViewMode('perspective')}
          >
            3D
          </Button>
          <Button
            variant={viewMode === 'orthographic' ? 'default' : 'ghost'}
            size="sm"
            onClick={() => setViewMode('orthographic')}
          >
            2D
          </Button>
        </div>
      </div>

      {/* 3D Cake Model */}
      <div
        ref={viewerRef}
        className="w-full h-full cursor-grab active:cursor-grabbing select-none"
        onMouseDown={handleMouseDown}
        style={{ minHeight: '400px' }}
      >
        {renderCakeModel()}
      </div>

      {/* Interaction Hints */}
      <div className="absolute bottom-4 left-4 right-4 z-10">
        <div className="bg-white/90 backdrop-blur-sm rounded-lg p-3 shadow-medium">
          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <span className="flex items-center space-x-1">
              <Icon name="Mouse" size={14} />
              <span>Drag to rotate</span>
            </span>
            <span className="flex items-center space-x-1">
              <Icon name="MousePointer" size={14} />
              <span>Scroll to zoom</span>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CakeViewer3D;