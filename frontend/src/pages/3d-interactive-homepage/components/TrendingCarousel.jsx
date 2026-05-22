import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const TrendingCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [direction, setDirection] = useState(0);

  const trendingCakes = [
    {
      id: 1,
      name: "Rainbow Layer Cake",
      image: "https://images.unsplash.com/photo-1464349095431-e9a21285b5f3?w=400&h=300&fit=crop",
      price: 45.99,
      rating: 4.9,
      reviews: 234,
      category: "Birthday Cakes",
      isNew: true,
      description: "Vibrant rainbow layers with vanilla buttercream"
    },
    {
      id: 2,
      name: "Elegant Wedding Cake",
      image: "https://images.unsplash.com/photo-1535141192574-5d4897c12636?w=400&h=300&fit=crop",
      price: 125.99,
      rating: 5.0,
      reviews: 89,
      category: "Wedding Cakes",
      isTrending: true,
      description: "Three-tier masterpiece with sugar flowers"
    },
    {
      id: 3,
      name: "Chocolate Bento Box",
      image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=400&h=300&fit=crop",
      price: 28.99,
      rating: 4.8,
      reviews: 156,
      category: "Bento Cakes",
      isPopular: true,
      description: "Rich chocolate with personalized message"
    },
    {
      id: 4,
      name: "Seasonal Pumpkin Spice",
      image: "https://images.unsplash.com/photo-1571115764595-644a1f56a55c?w=400&h=300&fit=crop",
      price: 38.99,
      rating: 4.7,
      reviews: 92,
      category: "Seasonal Specials",
      isSeasonal: true,
      description: "Autumn flavors with cinnamon cream cheese frosting"
    },
    {
      id: 5,
      name: "Strawberry Shortcake",
      image: "https://images.unsplash.com/photo-1565958011703-44f9829ba187?w=400&h=300&fit=crop",
      price: 42.99,
      rating: 4.9,
      reviews: 178,
      category: "Birthday Cakes",
      isNew: true,
      description: "Fresh strawberries with whipped cream layers"
    },
    {
      id: 6,
      name: "Minimalist Bento",
      image: "https://images.unsplash.com/photo-1606890737304-57a1ca8a5b62?w=400&h=300&fit=crop",
      price: 24.99,
      rating: 4.6,
      reviews: 203,
      category: "Bento Cakes",
      isPopular: true,
      description: "Clean design with custom text options"
    }
  ];

  // Auto-play functionality
  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      nextSlide();
    }, 4000);

    return () => clearInterval(interval);
  }, [isAutoPlaying, currentIndex]);

  const nextSlide = () => {
    setDirection(1);
    setCurrentIndex(prev => (prev + 1) % trendingCakes?.length);
  };

  const prevSlide = () => {
    setDirection(-1);
    setCurrentIndex(prev => (prev - 1 + trendingCakes?.length) % trendingCakes?.length);
    setIsAutoPlaying(false);
  };

  const goToSlide = (index) => {
    setDirection(index > currentIndex ? 1 : -1);
    setCurrentIndex(index);
    setIsAutoPlaying(false);
  };

  const getBadgeInfo = (cake) => {
    if (cake?.isNew) return { text: 'New', className: 'bg-success text-success-foreground' };
    if (cake?.isTrending) return { text: 'Trending', className: 'bg-primary text-primary-foreground' };
    if (cake?.isPopular) return { text: 'Popular', className: 'bg-warning text-warning-foreground' };
    if (cake?.isSeasonal) return { text: 'Seasonal', className: 'bg-secondary text-secondary-foreground' };
    return null;
  };

  const slideVariants = {
    enter: (direction) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1
    },
    exit: (direction) => ({
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0
    })
  };

  const cardVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: (index) => ({
      y: 0,
      opacity: 1,
      transition: {
        delay: index * 0.1,
        type: "spring",
        stiffness: 100,
        damping: 12
      }
    }),
    hover: {
      y: -8,
      scale: 1.02,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 20
      }
    }
  };

  return (
    <section className="py-16 bg-background overflow-hidden">
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
            Trending Designs
          </motion.h2>
          <motion.p 
            className="text-lg text-muted-foreground max-w-2xl mx-auto"
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            Discover our most popular cake creations loved by customers worldwide
          </motion.p>
        </motion.div>

        {/* Enhanced Carousel Container */}
        <div className="relative max-w-7xl mx-auto">
          {/* Animated Navigation Buttons */}
          <motion.div
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <motion.button
              onClick={prevSlide}
              className="absolute left-0 top-1/2 transform -translate-y-1/2 z-10 bg-background/80 backdrop-blur-sm shadow-large hover:bg-accent w-12 h-12 rounded-full flex items-center justify-center transition-colors"
              whileHover={{ scale: 1.1, x: -5 }}
              whileTap={{ scale: 0.9 }}
            >
              <Icon name="ChevronLeft" size={24} className="text-foreground" />
            </motion.button>
          </motion.div>

          <motion.div
            initial={{ x: 50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <motion.button
              onClick={nextSlide}
              className="absolute right-0 top-1/2 transform -translate-y-1/2 z-10 bg-background/80 backdrop-blur-sm shadow-large hover:bg-accent w-12 h-12 rounded-full flex items-center justify-center transition-colors"
              whileHover={{ scale: 1.1, x: 5 }}
              whileTap={{ scale: 0.9 }}
            >
              <Icon name="ChevronRight" size={24} className="text-foreground" />
            </motion.button>
          </motion.div>

          {/* Enhanced Carousel Track */}
          <div className="overflow-hidden mx-12">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <AnimatePresence mode="wait" custom={direction}>
                {trendingCakes?.slice(currentIndex, currentIndex + 3)?.map((cake, index) => (
                  <motion.div
                    key={cake?.id}
                    custom={index}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    variants={cardVariants}
                    whileHover="hover"
                    className="bg-card rounded-lg shadow-medium hover:shadow-large transition-all duration-300 overflow-hidden group"
                  >
                    {/* Enhanced Image Container */}
                    <div className="relative overflow-hidden">
                      <motion.div
                        whileHover={{ scale: 1.05 }}
                        transition={{ duration: 0.3 }}
                      >
                        <Image
                          src={cake?.image}
                          alt={cake?.name}
                          className="w-full h-48 object-cover"
                        />
                      </motion.div>
                      
                      {/* Animated Badge */}
                      {getBadgeInfo(cake) && (
                        <motion.div 
                          className={`absolute top-3 left-3 px-2 py-1 rounded-full text-xs font-medium ${getBadgeInfo(cake)?.className}`}
                          initial={{ scale: 0, rotate: -180 }}
                          animate={{ scale: 1, rotate: 0 }}
                          transition={{ 
                            type: "spring", 
                            stiffness: 200, 
                            damping: 15,
                            delay: index * 0.1 + 0.3
                          }}
                          whileHover={{ scale: 1.1 }}
                        >
                          {getBadgeInfo(cake)?.text}
                        </motion.div>
                      )}

                      {/* Enhanced Quick Actions */}
                      <motion.div 
                        className="absolute top-3 right-3 flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
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
                    </div>

                    {/* Enhanced Content */}
                    <div className="p-4">
                      <motion.div 
                        className="flex items-start justify-between mb-2"
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: index * 0.1 + 0.4 }}
                      >
                        <div>
                          <motion.h3 
                            className="font-heading font-semibold text-foreground mb-1"
                            whileHover={{ color: "rgb(59 130 246)" }}
                          >
                            {cake?.name}
                          </motion.h3>
                          <p className="text-sm text-muted-foreground">
                            {cake?.category}
                          </p>
                        </div>
                        <motion.div 
                          className="text-right"
                          whileHover={{ scale: 1.05 }}
                        >
                          <div className="text-lg font-bold text-primary">
                            ₹{cake?.price}
                          </div>
                        </motion.div>
                      </motion.div>

                      <motion.p 
                        className="text-sm text-muted-foreground mb-3"
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: index * 0.1 + 0.5 }}
                      >
                        {cake?.description}
                      </motion.p>

                      {/* Animated Rating */}
                      <motion.div 
                        className="flex items-center space-x-2 mb-4"
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: index * 0.1 + 0.6 }}
                      >
                        <div className="flex items-center">
                          {[...Array(5)]?.map((_, i) => (
                            <motion.div
                              key={i}
                              initial={{ rotate: 0, scale: 0 }}
                              animate={{ rotate: 360, scale: 1 }}
                              transition={{ 
                                delay: index * 0.1 + 0.7 + i * 0.05,
                                type: "spring",
                                stiffness: 200
                              }}
                              whileHover={{ scale: 1.2 }}
                            >
                              <Icon
                                name="Star"
                                size={14}
                                className={`${
                                  i < Math.floor(cake?.rating)
                                    ? 'text-warning fill-current' :'text-muted-foreground'
                                }`}
                              />
                            </motion.div>
                          ))}
                        </div>
                        <span className="text-sm font-medium text-foreground">
                          {cake?.rating}
                        </span>
                        <span className="text-sm text-muted-foreground">
                          ({cake?.reviews} reviews)
                        </span>
                      </motion.div>

                      {/* Enhanced Actions */}
                      <motion.div 
                        className="flex space-x-2"
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: index * 0.1 + 0.7 }}
                      >
                        <motion.div
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          className="flex-1"
                        >
                          <Button
                            variant="default"
                            size="sm"
                            iconName="ShoppingCart"
                            iconPosition="left"
                            fullWidth
                          >
                            Add to Cart
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
              </AnimatePresence>
            </div>
          </div>

          {/* Enhanced Dots Indicator */}
          <motion.div 
            className="flex justify-center space-x-2 mt-8"
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.8 }}
          >
            {trendingCakes?.map((_, index) => (
              <motion.button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentIndex
                    ? 'bg-primary w-8' :'bg-muted-foreground/30 hover:bg-muted-foreground/50'
                }`}
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
                animate={{
                  width: index === currentIndex ? 32 : 12,
                  backgroundColor: index === currentIndex ? "rgb(59 130 246)" : "rgba(107 114 128 / 0.3)"
                }}
              />
            ))}
          </motion.div>

          {/* Auto-play Indicator */}
          <motion.div 
            className="absolute top-4 right-4"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 1 }}
          >
            <motion.button
              onClick={() => setIsAutoPlaying(!isAutoPlaying)}
              className="w-10 h-10 bg-background/80 backdrop-blur-sm rounded-full flex items-center justify-center shadow-medium hover:bg-background transition-colors"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <motion.div
                animate={{ rotate: isAutoPlaying ? 360 : 0 }}
                transition={{ duration: isAutoPlaying ? 2 : 0.3, repeat: isAutoPlaying ? Infinity : 0, ease: "linear" }}
              >
                <Icon 
                  name={isAutoPlaying ? "Pause" : "Play"} 
                  size={16} 
                  className="text-foreground" 
                />
              </motion.div>
            </motion.button>
          </motion.div>
        </div>

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
              <Link to="/cake-category-browse">View All Designs</Link>
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default TrendingCarousel;