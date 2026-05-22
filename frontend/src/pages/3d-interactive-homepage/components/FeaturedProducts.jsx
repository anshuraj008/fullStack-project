import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const FeaturedProducts = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [addedToCart, setAddedToCart] = useState(new Set());

  const categories = [
    { id: 'all', name: 'All Products', icon: 'Grid3X3' },
    { id: 'bestsellers', name: 'Bestsellers', icon: 'TrendingUp' },
    { id: 'new', name: 'New Arrivals', icon: 'Sparkles' },
    { id: 'premium', name: 'Premium', icon: 'Crown' }
  ];

  const featuredProducts = [
    {
      id: 1,
      name: "Classic Vanilla Birthday Cake",
      image: "https://images.unsplash.com/photo-1464349095431-e9a21285b5f3?w=400&h=300&fit=crop",
      price: 42.99,
      originalPrice: 48.99,
      rating: 4.9,
      reviews: 234,
      category: "Birthday Cakes",
      tags: ['bestsellers', 'all'],
      isBestseller: true,
      description: "Moist vanilla sponge with buttercream frosting",
      features: ["Serves 8-10", "Custom Message", "Same Day Delivery"],
      discount: 12
    },
    {
      id: 2,
      name: "Chocolate Truffle Bento",
      image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=400&h=300&fit=crop",
      price: 28.99,
      rating: 4.8,
      reviews: 156,
      category: "Bento Cakes",
      tags: ['new', 'all'],
      isNew: true,
      description: "Rich chocolate with truffle ganache center",
      features: ["Single Serving", "Personalized", "Gift Box Included"]
    },
    {
      id: 3,
      name: "Royal Wedding Cake",
      image: "https://images.unsplash.com/photo-1535141192574-5d4897c12636?w=400&h=300&fit=crop",
      price: 189.99,
      rating: 5.0,
      reviews: 89,
      category: "Wedding Cakes",
      tags: ['premium', 'all'],
      isPremium: true,
      description: "Three-tier masterpiece with sugar flowers",
      features: ["3-Tier Design", "Sugar Flowers", "Free Consultation"]
    },
    {
      id: 4,
      name: "Strawberry Shortcake Delight",
      image: "https://images.unsplash.com/photo-1565958011703-44f9829ba187?w=400&h=300&fit=crop",
      price: 38.99,
      rating: 4.7,
      reviews: 178,
      category: "Birthday Cakes",
      tags: ['bestsellers', 'all'],
      isBestseller: true,
      description: "Fresh strawberries with whipped cream layers",
      features: ["Fresh Berries", "Light & Fluffy", "Seasonal Special"]
    },
    {
      id: 5,
      name: "Minimalist Bento Collection",
      image: "https://images.unsplash.com/photo-1606890737304-57a1ca8a5b62?w=400&h=300&fit=crop",
      price: 32.99,
      rating: 4.6,
      reviews: 203,
      category: "Bento Cakes",
      tags: ['new', 'all'],
      isNew: true,
      description: "Clean design with custom text options",
      features: ["Minimalist Design", "Custom Text", "Instagram Ready"]
    },
    {
      id: 6,
      name: "Autumn Spice Premium Cake",
      image: "https://images.unsplash.com/photo-1571115764595-644a1f56a55c?w=400&h=300&fit=crop",
      price: 45.99,
      rating: 4.8,
      reviews: 92,
      category: "Seasonal Specials",
      tags: ['premium', 'all'],
      isPremium: true,
      description: "Seasonal spices with cream cheese frosting",
      features: ["Seasonal Flavors", "Premium Ingredients", "Limited Edition"]
    }
  ];

  const filteredProducts = featuredProducts?.filter(product => 
    selectedCategory === 'all' || product?.tags?.includes(selectedCategory)
  );

  const handleAddToCart = (productId) => {
    setAddedToCart(prev => new Set([...prev, productId]));
    setTimeout(() => {
      setAddedToCart(prev => {
        const newSet = new Set(prev);
        newSet?.delete(productId);
        return newSet;
      });
    }, 2000);
  };

  const getBadgeInfo = (product) => {
    if (product?.isNew) return { text: 'New', className: 'bg-success text-success-foreground' };
    if (product?.isBestseller) return { text: 'Bestseller', className: 'bg-primary text-primary-foreground' };
    if (product?.isPremium) return { text: 'Premium', className: 'bg-warning text-warning-foreground' };
    return null;
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 60, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 12
      }
    }
  };

  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4">
        {/* Animated Section Header */}
        <motion.div 
          className="text-center mb-12"
          initial={{ y: 50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ type: "spring", stiffness: 100, damping: 15 }}
        >
          <motion.h2 
            className="text-3xl md:text-4xl font-heading font-bold text-foreground mb-4"
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            Featured Products
          </motion.h2>
          <motion.p 
            className="text-lg text-muted-foreground max-w-2xl mx-auto"
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            Handpicked favorites that our customers love most
          </motion.p>
        </motion.div>

        {/* Enhanced Category Filter */}
        <motion.div 
          className="flex flex-wrap justify-center gap-2 mb-12"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={containerVariants}
        >
          {categories?.map((category, index) => (
            <motion.div
              key={category?.id}
              variants={itemVariants}
              custom={index}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button
                variant={selectedCategory === category?.id ? "default" : "outline"}
                size="sm"
                iconName={category?.icon}
                iconPosition="left"
                onClick={() => setSelectedCategory(category?.id)}
                className="transition-all duration-300"
              >
                {category?.name}
              </Button>
            </motion.div>
          ))}
        </motion.div>

        {/* Enhanced Products Grid */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={containerVariants}
        >
          {filteredProducts?.map((product, index) => (
            <motion.div
              key={product?.id}
              className="bg-card rounded-xl shadow-medium hover:shadow-large transition-all duration-300 overflow-hidden group"
              variants={itemVariants}
              custom={index}
              whileHover={{ 
                y: -10,
                transition: { type: "spring", stiffness: 300, damping: 20 }
              }}
              layout
            >
              {/* Enhanced Image Container */}
              <div className="relative overflow-hidden">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.3 }}
                >
                  <Image
                    src={product?.image}
                    alt={product?.name}
                    className="w-full h-56 object-cover"
                  />
                </motion.div>
                
                {/* Animated Badges */}
                <div className="absolute top-3 left-3 flex flex-col space-y-2">
                  {getBadgeInfo(product) && (
                    <motion.span 
                      className={`px-2 py-1 rounded-full text-xs font-medium ${getBadgeInfo(product)?.className}`}
                      initial={{ scale: 0, rotate: -90 }}
                      animate={{ scale: 1, rotate: 0 }}
                      transition={{ 
                        type: "spring", 
                        stiffness: 200, 
                        delay: index * 0.1 + 0.3
                      }}
                      whileHover={{ scale: 1.05 }}
                    >
                      {getBadgeInfo(product)?.text}
                    </motion.span>
                  )}
                  {product?.discount && (
                    <motion.span 
                      className="bg-error text-error-foreground px-2 py-1 rounded-full text-xs font-medium"
                      initial={{ scale: 0, rotate: 90 }}
                      animate={{ scale: 1, rotate: 0 }}
                      transition={{ 
                        type: "spring", 
                        stiffness: 200, 
                        delay: index * 0.1 + 0.4
                      }}
                      whileHover={{ scale: 1.05 }}
                    >
                      -{product?.discount}%
                    </motion.span>
                  )}
                </div>

                {/* Enhanced Quick Actions */}
                <motion.div 
                  className="absolute top-3 right-3 flex flex-col space-y-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  initial={{ y: -20, opacity: 0 }}
                  animate={{ y: 0, opacity: 0 }}
                  whileHover={{ opacity: 1 }}
                >
                  <motion.div whileHover={{ scale: 1.1, rotate: 5 }} whileTap={{ scale: 0.9 }}>
                    <Button
                      variant="ghost"
                      size="icon"
                      iconName="Eye"
                      className="bg-background/80 backdrop-blur-sm shadow-medium hover:bg-accent w-8 h-8"
                    />
                  </motion.div>
                  <motion.div whileHover={{ scale: 1.1, rotate: -5 }} whileTap={{ scale: 0.9 }}>
                    <Button
                      variant="ghost"
                      size="icon"
                      iconName="Heart"
                      className="bg-background/80 backdrop-blur-sm shadow-medium hover:bg-accent w-8 h-8"
                    />
                  </motion.div>
                </motion.div>

                {/* Enhanced Quick Add to Cart */}
                <motion.div 
                  className="absolute bottom-3 left-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  initial={{ y: 20, opacity: 0 }}
                  whileHover={{ y: 0, opacity: 1 }}
                >
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Button
                      variant="default"
                      size="sm"
                      iconName={addedToCart?.has(product?.id) ? "Check" : "ShoppingCart"}
                      iconPosition="left"
                      fullWidth
                      onClick={() => handleAddToCart(product?.id)}
                      disabled={addedToCart?.has(product?.id)}
                      className="bg-background/90 backdrop-blur-sm text-foreground hover:bg-primary hover:text-primary-foreground"
                    >
                      {addedToCart?.has(product?.id) ? 'Added!' : 'Quick Add'}
                    </Button>
                  </motion.div>
                </motion.div>
              </div>

              {/* Enhanced Content */}
              <div className="p-6">
                <motion.div 
                  className="mb-3"
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: index * 0.1 + 0.2 }}
                >
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex-1">
                      <motion.h3 
                        className="font-heading font-semibold text-foreground mb-1 line-clamp-2"
                        whileHover={{ color: "rgb(59 130 246)" }}
                      >
                        {product?.name}
                      </motion.h3>
                      <p className="text-sm text-muted-foreground">
                        {product?.category}
                      </p>
                    </div>
                  </div>

                  <p className="text-sm text-muted-foreground mb-3">
                    {product?.description}
                  </p>

                  {/* Animated Features */}
                  <div className="flex flex-wrap gap-1 mb-3">
                    {product?.features?.slice(0, 2)?.map((feature, featureIndex) => (
                      <motion.span
                        key={featureIndex}
                        className="text-xs bg-muted text-muted-foreground px-2 py-1 rounded-full"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ 
                          delay: index * 0.1 + 0.4 + featureIndex * 0.05,
                          type: "spring",
                          stiffness: 200
                        }}
                        whileHover={{ scale: 1.05, backgroundColor: "rgb(59 130 246 / 0.1)" }}
                      >
                        {feature}
                      </motion.span>
                    ))}
                    {product?.features?.length > 2 && (
                      <span className="text-xs text-muted-foreground px-2 py-1">
                        +{product?.features?.length - 2} more
                      </span>
                    )}
                  </div>
                </motion.div>

                {/* Animated Rating */}
                <motion.div 
                  className="flex items-center space-x-2 mb-4"
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: index * 0.1 + 0.3 }}
                >
                  <div className="flex items-center">
                    {[...Array(5)]?.map((_, i) => (
                      <motion.div
                        key={i}
                        initial={{ rotate: 0, scale: 0 }}
                        animate={{ rotate: 360, scale: 1 }}
                        transition={{ 
                          delay: index * 0.1 + 0.5 + i * 0.05,
                          type: "spring",
                          stiffness: 200
                        }}
                        whileHover={{ scale: 1.2 }}
                      >
                        <Icon
                          name="Star"
                          size={14}
                          className={`${
                            i < Math.floor(product?.rating)
                              ? 'text-warning fill-current' :'text-muted-foreground'
                          }`}
                        />
                      </motion.div>
                    ))}
                  </div>
                  <span className="text-sm font-medium text-foreground">
                    {product?.rating}
                  </span>
                  <span className="text-sm text-muted-foreground">
                    ({product?.reviews})
                  </span>
                </motion.div>

                {/* Enhanced Pricing */}
                <motion.div 
                  className="flex items-center justify-between mb-4"
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: index * 0.1 + 0.4 }}
                >
                  <div className="flex items-center space-x-2">
                    <motion.span 
                      className="text-xl font-bold text-primary"
                      whileHover={{ scale: 1.05 }}
                    >
                      ₹{product?.price}
                    </motion.span>
                    {product?.originalPrice && (
                      <motion.span 
                        className="text-sm text-muted-foreground line-through"
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 + 0.6 }}
                      >
                        ₹{product?.originalPrice}
                      </motion.span>
                    )}
                  </div>
                </motion.div>

                {/* Enhanced Actions */}
                <motion.div 
                  className="flex space-x-2"
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: index * 0.1 + 0.5 }}
                >
                  <motion.div
                    className="flex-1"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Button
                      variant="default"
                      size="sm"
                      iconName="ShoppingCart"
                      iconPosition="left"
                      fullWidth
                      onClick={() => handleAddToCart(product?.id)}
                      disabled={addedToCart?.has(product?.id)}
                    >
                      {addedToCart?.has(product?.id) ? 'Added to Cart' : 'Add to Cart'}
                    </Button>
                  </motion.div>
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Button
                      variant="outline"
                      size="sm"
                      iconName="Palette"
                      asChild
                    >
                      <Link to="/3d-custom-cake-designer">Customize</Link>
                    </Button>
                  </motion.div>
                </motion.div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Enhanced View All Button */}
        <motion.div 
          className="text-center mt-12"
          initial={{ y: 50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
        >
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button
              variant="outline"
              size="lg"
              iconName="ArrowRight"
              iconPosition="right"
              asChild
            >
              <Link to="/cake-category-browse">View All Products</Link>
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default FeaturedProducts;