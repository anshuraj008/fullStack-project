import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import { Checkbox } from '../../../components/ui/Checkbox';

const FilterSidebar = ({ isOpen, onClose, filters, onFilterChange, className = "" }) => {
  const [expandedSections, setExpandedSections] = useState({
    price: true,
    size: true,
    flavor: true,
    occasion: true,
    dietary: false
  });

  const toggleSection = (section) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev?.[section]
    }));
  };

  const filterSections = [
    {
      id: 'price',
      title: 'Price Range',
      type: 'range',
      options: [
        { id: 'under-25', label: 'Under $25', value: '0-25' },
        { id: '25-50', label: '$25 - $50', value: '25-50' },
        { id: '50-100', label: '$50 - $100', value: '50-100' },
        { id: 'over-100', label: 'Over $100', value: '100+' }
      ]
    },
    {
      id: 'size',
      title: 'Cake Size',
      type: 'checkbox',
      options: [
        { id: 'mini', label: 'Mini (4")', count: 24 },
        { id: 'small', label: 'Small (6")', count: 18 },
        { id: 'medium', label: 'Medium (8")', count: 32 },
        { id: 'large', label: 'Large (10")', count: 15 },
        { id: 'sheet', label: 'Sheet Cake', count: 8 }
      ]
    },
    {
      id: 'flavor',
      title: 'Flavor',
      type: 'checkbox',
      options: [
        { id: 'vanilla', label: 'Vanilla', count: 45 },
        { id: 'chocolate', label: 'Chocolate', count: 38 },
        { id: 'strawberry', label: 'Strawberry', count: 22 },
        { id: 'red-velvet', label: 'Red Velvet', count: 19 },
        { id: 'lemon', label: 'Lemon', count: 16 },
        { id: 'carrot', label: 'Carrot', count: 12 }
      ]
    },
    {
      id: 'occasion',
      title: 'Occasion',
      type: 'checkbox',
      options: [
        { id: 'birthday', label: 'Birthday', count: 56 },
        { id: 'wedding', label: 'Wedding', count: 23 },
        { id: 'anniversary', label: 'Anniversary', count: 18 },
        { id: 'graduation', label: 'Graduation', count: 14 },
        { id: 'baby-shower', label: 'Baby Shower', count: 11 },
        { id: 'corporate', label: 'Corporate', count: 8 }
      ]
    },
    {
      id: 'dietary',
      title: 'Dietary Options',
      type: 'checkbox',
      options: [
        { id: 'gluten-free', label: 'Gluten Free', count: 12 },
        { id: 'vegan', label: 'Vegan', count: 8 },
        { id: 'sugar-free', label: 'Sugar Free', count: 6 },
        { id: 'keto', label: 'Keto Friendly', count: 4 }
      ]
    }
  ];

  const handleFilterToggle = (sectionId, optionId) => {
    const currentFilters = filters?.[sectionId] || [];
    const newFilters = currentFilters?.includes(optionId)
      ? currentFilters?.filter(id => id !== optionId)
      : [...currentFilters, optionId];
    
    onFilterChange(sectionId, newFilters);
  };

  const clearAllFilters = () => {
    const clearedFilters = {};
    filterSections?.forEach(section => {
      clearedFilters[section.id] = [];
    });
    onFilterChange('all', clearedFilters);
  };

  const getActiveFilterCount = () => {
    return Object.values(filters)?.reduce((count, filterArray) => {
      return count + (Array.isArray(filterArray) ? filterArray?.length : 0);
    }, 0);
  };

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/20 backdrop-blur-sm lg:hidden"
          onClick={onClose}
        />
      )}
      {/* Filter Sidebar */}
      <div className={`fixed lg:static top-0 right-0 z-50 h-full lg:h-auto w-full sm:w-80 lg:w-full bg-background border-l lg:border-l-0 lg:border-r border-border shadow-large lg:shadow-none transform transition-large lg:transform-none ${
        isOpen ? 'translate-x-0' : 'translate-x-full lg:translate-x-0'
      } ${className}`}>
        <div className="p-4 lg:p-0 h-full flex flex-col">
          {/* Header */}
          <div className="flex items-center justify-between mb-6 lg:mb-4">
            <div className="flex items-center space-x-2">
              <h2 className="text-lg font-heading font-semibold text-foreground">
                Filters
              </h2>
              {getActiveFilterCount() > 0 && (
                <span className="bg-primary text-primary-foreground text-xs font-medium px-2 py-1 rounded-full">
                  {getActiveFilterCount()}
                </span>
              )}
            </div>
            <div className="flex items-center space-x-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={clearAllFilters}
                className="text-muted-foreground hover:text-foreground"
              >
                Clear All
              </Button>
              <Button
                variant="ghost"
                size="icon"
                iconName="X"
                onClick={onClose}
                className="lg:hidden text-foreground hover:text-primary"
              />
            </div>
          </div>

          {/* Filter Sections */}
          <div className="flex-1 overflow-y-auto space-y-4">
            {filterSections?.map((section) => (
              <div key={section?.id} className="border-b border-border pb-4 last:border-b-0">
                <button
                  onClick={() => toggleSection(section?.id)}
                  className="flex items-center justify-between w-full py-2 text-left"
                >
                  <h3 className="font-medium text-foreground">{section?.title}</h3>
                  <Icon
                    name={expandedSections?.[section?.id] ? "ChevronUp" : "ChevronDown"}
                    size={18}
                    className="text-muted-foreground"
                  />
                </button>

                {expandedSections?.[section?.id] && (
                  <div className="mt-3 space-y-2">
                    {section?.options?.map((option) => (
                      <div key={option?.id} className="flex items-center justify-between">
                        <Checkbox
                          label={option?.label}
                          checked={(filters?.[section?.id] || [])?.includes(option?.id)}
                          onChange={() => handleFilterToggle(section?.id, option?.id)}
                          className="flex-1"
                        />
                        {option?.count && (
                          <span className="text-sm text-muted-foreground ml-2">
                            ({option?.count})
                          </span>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Mobile Apply Button */}
          <div className="lg:hidden pt-4 border-t border-border">
            <Button
              variant="default"
              fullWidth
              onClick={onClose}
            >
              Apply Filters ({getActiveFilterCount()})
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default FilterSidebar;