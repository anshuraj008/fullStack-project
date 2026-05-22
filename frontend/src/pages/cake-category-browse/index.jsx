import React, { useState, useEffect, useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import Header from '../../components/ui/Header';
import FilterSidebar from './components/FilterSidebar';
import CakeCard from './components/CakeCard';
import FilterChips from './components/FilterChips';
import SortDropdown from './components/SortDropdown';
import CategoryBreadcrumb from './components/CategoryBreadcrumb';
import LoadingSkeleton from './components/LoadingSkeleton';

const CakeCategoryBrowse = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [currentSort, setCurrentSort] = useState('popularity');
  const [filters, setFilters] = useState({
    price: [],
    size: [],
    flavor: [],
    occasion: [],
    dietary: []
  });
  const [cakes, setCakes] = useState([]);
  const [displayedCakes, setDisplayedCakes] = useState([]);
  const [page, setPage] = useState(1);

  // Mock cake data
  const mockCakes = [
    {
      id: 1,
      name: "Classic Vanilla Birthday Cake",
      description: "A timeless vanilla sponge cake with buttercream frosting and colorful sprinkles",
      image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=400&h=400&fit=crop",
      startingPrice: 25.99,
      rating: 4.8,
      reviewCount: 124,
      isNew: false,
      isCustomizable: true,
      isPopular: true,
      isWishlisted: false,
      category: "birthday",
      sizes: [
        { id: 'small', name: '6"', price: 25.99 },
        { id: 'medium', name: '8"', price: 35.99 },
        { id: 'large', name: '10"', price: 49.99 }
      ],
      flavors: [
        { id: 'vanilla', name: 'Vanilla' },
        { id: 'chocolate', name: 'Chocolate' },
        { id: 'strawberry', name: 'Strawberry' }
      ],
      tags: ['birthday', 'vanilla', 'customizable']
    },
    {
      id: 2,
      name: "Decadent Chocolate Fudge Cake",
      description: "Rich chocolate cake layers with fudge frosting and chocolate ganache drip",
      image: "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=400&h=400&fit=crop",
      startingPrice: 32.99,
      rating: 4.9,
      reviewCount: 89,
      isNew: true,
      isCustomizable: true,
      isPopular: false,
      isWishlisted: true,
      category: "birthday",
      sizes: [
        { id: 'small', name: '6"', price: 32.99 },
        { id: 'medium', name: '8"', price: 42.99 },
        { id: 'large', name: '10"', price: 56.99 }
      ],
      flavors: [
        { id: 'chocolate', name: 'Chocolate' },
        { id: 'red-velvet', name: 'Red Velvet' }
      ],
      tags: ['birthday', 'chocolate', 'premium']
    },
    {
      id: 3,
      name: "Elegant Wedding Tier Cake",
      description: "Three-tier wedding cake with white fondant and sugar flower decorations",
      image: "https://images.unsplash.com/photo-1621303837174-89787a7d4729?w=400&h=400&fit=crop",
      startingPrice: 125.99,
      rating: 4.7,
      reviewCount: 45,
      isNew: false,
      isCustomizable: true,
      isPopular: true,
      isWishlisted: false,
      category: "wedding",
      sizes: [
        { id: 'medium', name: '2-Tier', price: 125.99 },
        { id: 'large', name: '3-Tier', price: 189.99 },
        { id: 'xl', name: '4-Tier', price: 249.99 }
      ],
      flavors: [
        { id: 'vanilla', name: 'Vanilla' },
        { id: 'lemon', name: 'Lemon' },
        { id: 'red-velvet', name: 'Red Velvet' }
      ],
      tags: ['wedding', 'elegant', 'fondant']
    },
    {
      id: 4,
      name: "Fresh Strawberry Shortcake",
      description: "Light sponge cake with fresh strawberries and whipped cream layers",
      image: "https://images.unsplash.com/photo-1565958011703-44f9829ba187?w=400&h=400&fit=crop",
      startingPrice: 28.99,
      rating: 4.6,
      reviewCount: 67,
      isNew: false,
      isCustomizable: false,
      isPopular: false,
      isWishlisted: false,
      category: "seasonal",
      sizes: [
        { id: 'small', name: '6"', price: 28.99 },
        { id: 'medium', name: '8"', price: 38.99 }
      ],
      flavors: [
        { id: 'strawberry', name: 'Strawberry' },
        { id: 'vanilla', name: 'Vanilla' }
      ],
      tags: ['strawberry', 'fresh', 'seasonal']
    },
    {
      id: 5,
      name: "Red Velvet Anniversary Cake",
      description: "Classic red velvet cake with cream cheese frosting and elegant decorations",
      image: "https://images.unsplash.com/photo-1586985289688-ca3cf47d3e6e?w=400&h=400&fit=crop",
      startingPrice: 34.99,
      rating: 4.8,
      reviewCount: 92,
      isNew: false,
      isCustomizable: true,
      isPopular: true,
      isWishlisted: true,
      category: "anniversary",
      sizes: [
        { id: 'small', name: '6"', price: 34.99 },
        { id: 'medium', name: '8"', price: 44.99 },
        { id: 'large', name: '10"', price: 58.99 }
      ],
      flavors: [
        { id: 'red-velvet', name: 'Red Velvet' }
      ],
      tags: ['anniversary', 'red-velvet', 'cream-cheese']
    },
    {
      id: 6,
      name: "Graduation Cap Cake",
      description: "Fun graduation-themed cake shaped like a cap with personalized message",
      image: "https://images.unsplash.com/photo-1557925923-cd4648e211a0?w=400&h=400&fit=crop",
      startingPrice: 39.99,
      rating: 4.5,
      reviewCount: 34,
      isNew: true,
      isCustomizable: true,
      isPopular: false,
      isWishlisted: false,
      category: "graduation",
      sizes: [
        { id: 'medium', name: '8"', price: 39.99 },
        { id: 'large', name: '10"', price: 52.99 }
      ],
      flavors: [
        { id: 'vanilla', name: 'Vanilla' },
        { id: 'chocolate', name: 'Chocolate' },
        { id: 'lemon', name: 'Lemon' }
      ],
      tags: ['graduation', 'themed', 'customizable']
    },
    {
      id: 7,
      name: "Gluten-Free Carrot Cake",
      description: "Moist gluten-free carrot cake with cream cheese frosting and walnut pieces",
      image: "https://images.unsplash.com/photo-1621303837174-89787a7d4729?w=400&h=400&fit=crop",
      startingPrice: 36.99,
      rating: 4.4,
      reviewCount: 28,
      isNew: false,
      isCustomizable: false,
      isPopular: false,
      isWishlisted: false,
      category: "dietary",
      sizes: [
        { id: 'small', name: '6"', price: 36.99 },
        { id: 'medium', name: '8"', price: 46.99 }
      ],
      flavors: [
        { id: 'carrot', name: 'Carrot' }
      ],
      tags: ['gluten-free', 'carrot', 'dietary']
    },
    {
      id: 8,
      name: "Baby Shower Pink Ombre",
      description: "Beautiful pink ombre cake perfect for baby shower celebrations",
      image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=400&h=400&fit=crop",
      startingPrice: 42.99,
      rating: 4.7,
      reviewCount: 56,
      isNew: false,
      isCustomizable: true,
      isPopular: true,
      isWishlisted: false,
      category: "baby-shower",
      sizes: [
        { id: 'medium', name: '8"', price: 42.99 },
        { id: 'large', name: '10"', price: 56.99 }
      ],
      flavors: [
        { id: 'vanilla', name: 'Vanilla' },
        { id: 'strawberry', name: 'Strawberry' }
      ],
      tags: ['baby-shower', 'pink', 'ombre']
    }
  ];

  // Initialize data
  useEffect(() => {
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setCakes(mockCakes);
      setDisplayedCakes(mockCakes?.slice(0, 8));
      setIsLoading(false);
    }, 1000);
  }, []);

  // Handle filter changes
  const handleFilterChange = useCallback((sectionId, newFilters) => {
    if (sectionId === 'all') {
      setFilters(newFilters);
    } else {
      setFilters(prev => ({
        ...prev,
        [sectionId]: newFilters
      }));
    }
  }, []);

  // Handle sort changes
  const handleSortChange = useCallback((sortId) => {
    setCurrentSort(sortId);
  }, []);

  // Apply filters and sorting
  useEffect(() => {
    let filteredCakes = [...cakes];

    // Apply filters
    Object.entries(filters)?.forEach(([sectionId, filterValues]) => {
      if (filterValues?.length > 0) {
        filteredCakes = filteredCakes?.filter(cake => {
          switch (sectionId) {
            case 'price':
              return filterValues?.some(priceRange => {
                const price = cake?.startingPrice;
                switch (priceRange) {
                  case 'under-25': return price < 25;
                  case '25-50': return price >= 25 && price <= 50;
                  case '50-100': return price >= 50 && price <= 100;
                  case 'over-100': return price > 100;
                  default: return true;
                }
              });
            case 'size':
              return cake?.sizes?.some(size => filterValues?.includes(size?.id));
            case 'flavor':
              return cake?.flavors?.some(flavor => filterValues?.includes(flavor?.id));
            case 'occasion':
              return filterValues?.includes(cake?.category);
            case 'dietary':
              return cake?.tags?.some(tag => filterValues?.includes(tag));
            default:
              return true;
          }
        });
      }
    });

    // Apply sorting
    filteredCakes?.sort((a, b) => {
      switch (currentSort) {
        case 'price-low':
          return a?.startingPrice - b?.startingPrice;
        case 'price-high':
          return b?.startingPrice - a?.startingPrice;
        case 'rating':
          return b?.rating - a?.rating;
        case 'newest':
          return b?.isNew - a?.isNew;
        case 'name-az':
          return a?.name?.localeCompare(b?.name);
        case 'name-za':
          return b?.name?.localeCompare(a?.name);
        case 'popularity':
        default:
          return (b?.isPopular ? 1 : 0) - (a?.isPopular ? 1 : 0) || b?.reviewCount - a?.reviewCount;
      }
    });

    setDisplayedCakes(filteredCakes?.slice(0, page * 8));
    setHasMore(filteredCakes?.length > page * 8);
  }, [cakes, filters, currentSort, page]);

  // Handle load more
  const handleLoadMore = () => {
    setLoadingMore(true);
    setTimeout(() => {
      setPage(prev => prev + 1);
      setLoadingMore(false);
    }, 500);
  };

  // Handle filter removal
  const handleRemoveFilter = (sectionId, filterId) => {
    setFilters(prev => ({
      ...prev,
      [sectionId]: prev?.[sectionId]?.filter(id => id !== filterId)
    }));
  };

  // Handle clear all filters
  const handleClearAllFilters = () => {
    setFilters({
      price: [],
      size: [],
      flavor: [],
      occasion: [],
      dietary: []
    });
  };

  // Handle add to cart
  const handleAddToCart = (cake) => {
    console.log('Added to cart:', cake);
    // In real app, this would update cart state/context
  };

  // Handle wishlist toggle
  const handleToggleWishlist = (cakeId, isWishlisted) => {
    setCakes(prev => prev?.map(cake => 
      cake?.id === cakeId ? { ...cake, isWishlisted } : cake
    ));
  };

  const currentCategory = searchParams?.get('category') || 'All Cakes';
  const currentSubcategory = searchParams?.get('subcategory');

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-16">
        <div className="container mx-auto px-4 py-6">
          {/* Breadcrumb */}
          <CategoryBreadcrumb 
            category={currentCategory !== 'All Cakes' ? currentCategory : null}
            subcategory={currentSubcategory}
            className="mb-6"
          />

          {/* Page Header */}
          <div className="mb-6">
            <h1 className="text-3xl font-heading font-bold text-foreground mb-2">
              {currentCategory === 'All Cakes' ? 'Browse All Cakes' : `${currentCategory} Cakes`}
            </h1>
            <p className="text-muted-foreground">
              Discover our collection of handcrafted cakes made with premium ingredients
            </p>
          </div>

          <div className="flex flex-col lg:flex-row gap-6">
            {/* Desktop Filter Sidebar */}
            <div className="hidden lg:block w-80 flex-shrink-0">
              <FilterSidebar
                isOpen={true}
                onClose={() => {}}
                filters={filters}
                onFilterChange={handleFilterChange}
              />
            </div>

            {/* Main Content */}
            <div className="flex-1 min-w-0">
              {/* Mobile Filter Button & Sort */}
              <div className="flex items-center justify-between mb-4 lg:hidden">
                <Button
                  variant="outline"
                  iconName="Filter"
                  onClick={() => setIsFilterOpen(true)}
                  className="flex items-center space-x-2"
                >
                  <span>Filters</span>
                  {Object.values(filters)?.flat()?.length > 0 && (
                    <span className="bg-primary text-primary-foreground text-xs font-medium px-2 py-1 rounded-full">
                      {Object.values(filters)?.flat()?.length}
                    </span>
                  )}
                </Button>
                
                <SortDropdown
                  currentSort={currentSort}
                  onSortChange={handleSortChange}
                  resultsCount={displayedCakes?.length}
                />
              </div>

              {/* Desktop Sort */}
              <div className="hidden lg:block mb-4">
                <SortDropdown
                  currentSort={currentSort}
                  onSortChange={handleSortChange}
                  resultsCount={displayedCakes?.length}
                />
              </div>

              {/* Active Filter Chips */}
              <FilterChips
                activeFilters={filters}
                onRemoveFilter={handleRemoveFilter}
                onClearAll={handleClearAllFilters}
                className="mb-6"
              />

              {/* Cake Grid */}
              {isLoading ? (
                <LoadingSkeleton count={8} />
              ) : (
                <>
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 lg:gap-6">
                    {displayedCakes?.map((cake) => (
                      <CakeCard
                        key={cake?.id}
                        cake={cake}
                        onAddToCart={handleAddToCart}
                        onToggleWishlist={handleToggleWishlist}
                      />
                    ))}
                  </div>

                  {/* Load More */}
                  {hasMore && (
                    <div className="flex justify-center mt-8">
                      <Button
                        variant="outline"
                        size="lg"
                        loading={loadingMore}
                        onClick={handleLoadMore}
                        iconName="ChevronDown"
                      >
                        Load More Cakes
                      </Button>
                    </div>
                  )}

                  {/* No Results */}
                  {displayedCakes?.length === 0 && !isLoading && (
                    <div className="text-center py-12">
                      <Icon name="Search" size={48} className="text-muted-foreground mx-auto mb-4" />
                      <h3 className="text-lg font-heading font-semibold text-foreground mb-2">
                        No cakes found
                      </h3>
                      <p className="text-muted-foreground mb-4">
                        Try adjusting your filters or search terms
                      </p>
                      <Button
                        variant="outline"
                        onClick={handleClearAllFilters}
                      >
                        Clear All Filters
                      </Button>
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        </div>

        {/* Mobile Filter Sidebar */}
        <FilterSidebar
          isOpen={isFilterOpen}
          onClose={() => setIsFilterOpen(false)}
          filters={filters}
          onFilterChange={handleFilterChange}
          className="lg:hidden"
        />
      </main>
    </div>
  );
};

export default CakeCategoryBrowse;