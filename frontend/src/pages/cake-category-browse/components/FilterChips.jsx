import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const FilterChips = ({ activeFilters, onRemoveFilter, onClearAll, className = "" }) => {
  const getFilterLabel = (sectionId, filterId) => {
    const filterLabels = {
      price: {
        'under-25': 'Under $25',
        '25-50': '$25 - $50',
        '50-100': '$50 - $100',
        'over-100': 'Over $100'
      },
      size: {
        'mini': 'Mini (4")',
        'small': 'Small (6")',
        'medium': 'Medium (8")',
        'large': 'Large (10")',
        'sheet': 'Sheet Cake'
      },
      flavor: {
        'vanilla': 'Vanilla',
        'chocolate': 'Chocolate',
        'strawberry': 'Strawberry',
        'red-velvet': 'Red Velvet',
        'lemon': 'Lemon',
        'carrot': 'Carrot'
      },
      occasion: {
        'birthday': 'Birthday',
        'wedding': 'Wedding',
        'anniversary': 'Anniversary',
        'graduation': 'Graduation',
        'baby-shower': 'Baby Shower',
        'corporate': 'Corporate'
      },
      dietary: {
        'gluten-free': 'Gluten Free',
        'vegan': 'Vegan',
        'sugar-free': 'Sugar Free',
        'keto': 'Keto Friendly'
      }
    };

    return filterLabels?.[sectionId]?.[filterId] || filterId;
  };

  const getAllActiveFilters = () => {
    const allFilters = [];
    Object.entries(activeFilters)?.forEach(([sectionId, filters]) => {
      if (Array.isArray(filters)) {
        filters?.forEach(filterId => {
          allFilters?.push({
            sectionId,
            filterId,
            label: getFilterLabel(sectionId, filterId)
          });
        });
      }
    });
    return allFilters;
  };

  const activeFiltersList = getAllActiveFilters();

  if (activeFiltersList?.length === 0) {
    return null;
  }

  return (
    <div className={`flex items-center space-x-2 overflow-x-auto pb-2 ${className}`}>
      <span className="text-sm text-muted-foreground whitespace-nowrap">
        Active filters:
      </span>
      <div className="flex items-center space-x-2">
        {activeFiltersList?.map((filter, index) => (
          <div
            key={`${filter?.sectionId}-${filter?.filterId}-${index}`}
            className="flex items-center space-x-1 bg-accent text-accent-foreground px-3 py-1 rounded-full text-sm whitespace-nowrap"
          >
            <span>{filter?.label}</span>
            <button
              onClick={() => onRemoveFilter(filter?.sectionId, filter?.filterId)}
              className="ml-1 hover:text-primary transition-smooth"
            >
              <Icon name="X" size={14} />
            </button>
          </div>
        ))}
        
        {activeFiltersList?.length > 1 && (
          <Button
            variant="ghost"
            size="sm"
            onClick={onClearAll}
            className="text-muted-foreground hover:text-foreground whitespace-nowrap"
          >
            Clear All
          </Button>
        )}
      </div>
    </div>
  );
};

export default FilterChips;