import React, { useState } from 'react';

import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import Button from '../../../components/ui/Button';

const OrderSearchFilter = ({ onSearch, onFilter, className = "" }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [dateRange, setDateRange] = useState('all');
  const [orderType, setOrderType] = useState('all');
  const [showFilters, setShowFilters] = useState(false);

  const statusOptions = [
    { value: 'all', label: 'All Orders' },
    { value: 'pending', label: 'Pending' },
    { value: 'confirmed', label: 'Confirmed' },
    { value: 'preparing', label: 'Preparing' },
    { value: 'baking', label: 'Baking' },
    { value: 'decorating', label: 'Decorating' },
    { value: 'ready', label: 'Ready' },
    { value: 'out-for-delivery', label: 'Out for Delivery' },
    { value: 'delivered', label: 'Delivered' },
    { value: 'cancelled', label: 'Cancelled' }
  ];

  const dateRangeOptions = [
    { value: 'all', label: 'All Time' },
    { value: 'today', label: 'Today' },
    { value: 'week', label: 'This Week' },
    { value: 'month', label: 'This Month' },
    { value: '3months', label: 'Last 3 Months' },
    { value: '6months', label: 'Last 6 Months' },
    { value: 'year', label: 'This Year' }
  ];

  const orderTypeOptions = [
    { value: 'all', label: 'All Types' },
    { value: 'custom', label: 'Custom Cakes' },
    { value: 'ready-made', label: 'Ready-made Cakes' },
    { value: 'bento', label: 'Bento Cakes' }
  ];

  const handleSearch = (e) => {
    const query = e?.target?.value;
    setSearchQuery(query);
    onSearch(query);
  };

  const handleFilterChange = (filterType, value) => {
    switch (filterType) {
      case 'status':
        setStatusFilter(value);
        break;
      case 'dateRange':
        setDateRange(value);
        break;
      case 'orderType':
        setOrderType(value);
        break;
    }
    
    onFilter({
      status: filterType === 'status' ? value : statusFilter,
      dateRange: filterType === 'dateRange' ? value : dateRange,
      orderType: filterType === 'orderType' ? value : orderType
    });
  };

  const clearFilters = () => {
    setSearchQuery('');
    setStatusFilter('all');
    setDateRange('all');
    setOrderType('all');
    onSearch('');
    onFilter({
      status: 'all',
      dateRange: 'all',
      orderType: 'all'
    });
  };

  const hasActiveFilters = statusFilter !== 'all' || dateRange !== 'all' || orderType !== 'all' || searchQuery?.length > 0;

  return (
    <div className={`bg-card border border-border rounded-lg shadow-soft p-4 ${className}`}>
      {/* Search Bar */}
      <div className="flex items-center space-x-3 mb-4">
        <div className="flex-1">
          <Input
            type="search"
            placeholder="Search by order number, cake name, or customer..."
            value={searchQuery}
            onChange={handleSearch}
            className="w-full"
          />
        </div>
        <Button
          variant="outline"
          size="default"
          iconName="Filter"
          onClick={() => setShowFilters(!showFilters)}
          className={showFilters ? 'bg-accent' : ''}
        >
          Filters
        </Button>
      </div>

      {/* Filter Options */}
      {showFilters && (
        <div className="border-t border-border pt-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            <Select
              label="Order Status"
              options={statusOptions}
              value={statusFilter}
              onChange={(value) => handleFilterChange('status', value)}
            />
            
            <Select
              label="Date Range"
              options={dateRangeOptions}
              value={dateRange}
              onChange={(value) => handleFilterChange('dateRange', value)}
            />
            
            <Select
              label="Order Type"
              options={orderTypeOptions}
              value={orderType}
              onChange={(value) => handleFilterChange('orderType', value)}
            />
          </div>

          {/* Filter Actions */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              {hasActiveFilters && (
                <span className="text-sm text-muted-foreground">
                  Active filters applied
                </span>
              )}
            </div>
            <div className="flex items-center space-x-2">
              {hasActiveFilters && (
                <Button
                  variant="ghost"
                  size="sm"
                  iconName="X"
                  onClick={clearFilters}
                >
                  Clear All
                </Button>
              )}
              <Button
                variant="outline"
                size="sm"
                iconName="ChevronUp"
                onClick={() => setShowFilters(false)}
              >
                Hide Filters
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrderSearchFilter;