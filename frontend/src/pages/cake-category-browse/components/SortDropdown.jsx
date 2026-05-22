import React, { useState, useRef, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const SortDropdown = ({ currentSort, onSortChange, resultsCount, className = "" }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const sortOptions = [
    { id: 'popularity', label: 'Most Popular', icon: 'TrendingUp' },
    { id: 'price-low', label: 'Price: Low to High', icon: 'ArrowUp' },
    { id: 'price-high', label: 'Price: High to Low', icon: 'ArrowDown' },
    { id: 'newest', label: 'Newest First', icon: 'Clock' },
    { id: 'rating', label: 'Highest Rated', icon: 'Star' },
    { id: 'name-az', label: 'Name: A to Z', icon: 'ArrowUp' },
    { id: 'name-za', label: 'Name: Z to A', icon: 'ArrowDown' }
  ];

  const currentSortOption = sortOptions?.find(option => option?.id === currentSort) || sortOptions?.[0];

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef?.current && !dropdownRef?.current?.contains(event?.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSortSelect = (sortId) => {
    onSortChange(sortId);
    setIsOpen(false);
  };

  return (
    <div className={`flex items-center justify-between ${className}`}>
      {/* Results Count */}
      <div className="text-sm text-muted-foreground">
        {resultsCount} {resultsCount === 1 ? 'cake' : 'cakes'} found
      </div>
      {/* Sort Dropdown */}
      <div className="relative" ref={dropdownRef}>
        <Button
          variant="outline"
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center space-x-2"
        >
          <Icon name={currentSortOption?.icon} size={16} />
          <span className="hidden sm:inline">Sort by:</span>
          <span>{currentSortOption?.label}</span>
          <Icon 
            name={isOpen ? "ChevronUp" : "ChevronDown"} 
            size={16} 
            className="ml-1"
          />
        </Button>

        {/* Dropdown Menu */}
        {isOpen && (
          <div className="absolute top-full right-0 mt-2 w-56 bg-background border border-border rounded-lg shadow-large z-30">
            <div className="py-2">
              {sortOptions?.map((option) => (
                <button
                  key={option?.id}
                  onClick={() => handleSortSelect(option?.id)}
                  className={`w-full flex items-center space-x-3 px-4 py-2 text-left text-sm transition-smooth ${
                    currentSort === option?.id
                      ? 'bg-accent text-primary' :'text-foreground hover:bg-accent/50'
                  }`}
                >
                  <Icon name={option?.icon} size={16} />
                  <span>{option?.label}</span>
                  {currentSort === option?.id && (
                    <Icon name="Check" size={16} className="ml-auto" />
                  )}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SortDropdown;