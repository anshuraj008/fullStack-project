import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const CategoryGrid = () => {
  const categories = [
    {
      id: 'bento',
      name: 'Bento Cakes',
      description: 'Perfect single-serving cakes with personalized messages',
      image: 'https://images.unsplash.com/photo-1606890737304-57a1ca8a5b62?w=500&h=400&fit=crop',
      icon: 'Package',
      color: 'from-primary/20 to-primary/5',
      itemCount: 45,
      startingPrice: 18.99,
      features: ['Custom Messages', 'Single Serving', 'Quick Delivery']
    },
    {
      id: 'birthday',
      name: 'Birthday Cakes',
      description: 'Celebration cakes that make every birthday special',
      image: 'https://images.unsplash.com/photo-1464349095431-e9a21285b5f3?w=500&h=400&fit=crop',
      icon: 'Gift',
      color: 'from-secondary/20 to-secondary/5',
      itemCount: 78,
      startingPrice: 35.99,
      features: ['All Ages', 'Custom Themes', 'Multiple Sizes']
    },
    {
      id: 'wedding',
      name: 'Wedding Cakes',
      description: 'Elegant multi-tier cakes for your special day',
      image: 'https://images.unsplash.com/photo-1535141192574-5d4897c12636?w=500&h=400&fit=crop',
      icon: 'Heart',
      color: 'from-accent/30 to-accent/10',
      itemCount: 32,
      startingPrice: 125.99,
      features: ['Multi-Tier', 'Premium Design', 'Consultation']
    },
    {
      id: 'seasonal',
      name: 'Seasonal Specials',
      description: 'Limited-time flavors celebrating the seasons',
      image: 'https://images.unsplash.com/photo-1571115764595-644a1f56a55c?w=500&h=400&fit=crop',
      icon: 'Leaf',
      color: 'from-warning/20 to-warning/5',
      itemCount: 24,
      startingPrice: 28.99,
      features: ['Limited Time', 'Seasonal Flavors', 'Holiday Themes']
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
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

  const headerVariants = {
    hidden: { y: 40, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 80,
        damping: 15
      }
    }
  };

  return (
    <section className="py-16 bg-muted/30">
      <div className="container mx-auto px-4">
        {/* Animated Section Header */}
        <motion.div 
          className="text-center mb-12"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={headerVariants}
        >
          <motion.h2 
            className="text-3xl md:text-4xl font-heading font-bold text-foreground mb-4"
            variants={headerVariants}
          >
            Explore Our Categories
          </motion.h2>
          <motion.p 
            className="text-lg text-muted-foreground max-w-2xl mx-auto"
            variants={headerVariants}
          >
            From intimate bento cakes to grand wedding centerpieces, find the perfect cake for every occasion
          </motion.p>
        </motion.div>

        {/* Animated Category Grid */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={containerVariants}
        >
          {categories?.map((category, index) => (
            <motion.div
              key={category?.id}
              className="group relative bg-card rounded-[1.5rem] shadow-medium hover:shadow-large transition-all duration-300 overflow-hidden border border-border/60"
              variants={itemVariants}
              whileHover={{ 
                y: -8,
                transition: { type: "spring", stiffness: 300, damping: 20 }
              }}
              whileTap={{ scale: 0.98 }}
            >
              {/* Animated Background Gradient */}
              <motion.div 
                className={`absolute inset-0 bg-gradient-to-br ${category?.color} opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
                initial={{ scale: 0.8, opacity: 0 }}
                whileHover={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.3 }}
              />

              <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-primary via-secondary to-warning opacity-80" />
              
              {/* Image Container with Enhanced Animations */}
              <div className="relative overflow-hidden">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.3 }}
                >
                  <Image
                    src={category?.image}
                    alt={category?.name}
                    className="w-full h-48 object-cover"
                  />
                </motion.div>
                
                {/* Overlay */}
                <motion.div 
                  className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors duration-300"
                  initial={{ opacity: 0.2 }}
                  whileHover={{ opacity: 0.1 }}
                />
                
                {/* Animated Icon Badge */}
                <motion.div 
                  className="absolute top-4 left-4 w-12 h-12 bg-background/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-medium border border-white/50"
                  whileHover={{ 
                    scale: 1.1,
                    rotate: 5,
                    backgroundColor: "rgba(255, 255, 255, 1)"
                  }}
                  transition={{ type: "spring", stiffness: 400, damping: 17 }}
                >
                  <motion.div
                    initial={{ rotate: 0 }}
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.5 }}
                  >
                    <Icon name={category?.icon} size={24} className="text-primary" />
                  </motion.div>
                </motion.div>

                {/* Animated Item Count Badge */}
                <motion.div 
                  className="absolute top-4 right-4 bg-background/90 backdrop-blur-sm px-3 py-1 rounded-full shadow-medium"
                  initial={{ x: 20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: index * 0.1 + 0.5 }}
                  whileHover={{ scale: 1.05 }}
                >
                  <span className="text-sm font-medium text-foreground">
                    {category?.itemCount} items
                  </span>
                </motion.div>
              </div>

              {/* Enhanced Content with Staggered Animations */}
              <div className="relative p-6">
                <motion.div 
                  className="mb-4"
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: index * 0.1 + 0.3 }}
                >
                  <motion.h3 
                    className="text-xl font-heading font-bold text-foreground mb-2"
                    whileHover={{ color: "rgb(140 90 60)" }}
                    transition={{ duration: 0.2 }}
                  >
                    {category?.name}
                  </motion.h3>
                  <p className="text-sm text-muted-foreground">
                    {category?.description}
                  </p>
                </motion.div>

                {/* Animated Features */}
                <motion.div 
                  className="mb-4"
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: index * 0.1 + 0.4 }}
                >
                  <div className="flex flex-wrap gap-2">
                    {category?.features?.map((feature, featureIndex) => (
                      <motion.span
                        key={featureIndex}
                        className="text-xs bg-muted text-muted-foreground px-2 py-1 rounded-full border border-border/60"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ 
                          delay: index * 0.1 + 0.6 + featureIndex * 0.05,
                          type: "spring",
                          stiffness: 200
                        }}
                        whileHover={{ scale: 1.05, backgroundColor: "rgb(140 90 60 / 0.10)" }}
                      >
                        {feature}
                      </motion.span>
                    ))}
                  </div>
                </motion.div>

                {/* Animated Pricing */}
                <motion.div 
                  className="flex items-center justify-between mb-4"
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: index * 0.1 + 0.5 }}
                >
                  <div>
                    <span className="text-sm text-muted-foreground">Starting from</span>
                    <motion.div 
                      className="text-lg font-bold text-primary"
                      whileHover={{ scale: 1.05 }}
                    >
                      ₹{category?.startingPrice}
                    </motion.div>
                  </div>
                </motion.div>

                {/* Enhanced Action Button */}
                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: index * 0.1 + 0.6 }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Button
                    variant="default"
                    fullWidth
                    iconName="ArrowRight"
                    iconPosition="right"
                    className="group-hover:bg-primary group-hover:text-primary-foreground"
                    asChild
                  >
                    <Link to="/cake-category-browse">
                      Browse {category?.name}
                    </Link>
                  </Button>
                </motion.div>
              </div>

              {/* Enhanced Hover Effect Border */}
              <motion.div 
                className="absolute inset-0 border-2 border-transparent rounded-xl pointer-events-none"
                whileHover={{ 
                  borderColor: "rgba(59, 130, 246, 0.3)",
                  boxShadow: "0 0 20px rgba(59, 130, 246, 0.2)"
                }}
                transition={{ duration: 0.3 }}
              />
            </motion.div>
          ))}
        </motion.div>

        {/* Enhanced Custom Cake CTA */}
        <motion.div 
          className="mt-16 text-center"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={containerVariants}
        >
                <motion.div
                  className="bg-gradient-to-r from-primary/10 via-accent/20 to-secondary/10 rounded-[1.75rem] p-8 md:p-12 border border-border/50 shadow-inner"
            variants={itemVariants}
            whileHover={{ 
              scale: 1.02,
                    background: "linear-gradient(to right, rgba(140, 90, 60, 0.16), rgba(47, 109, 102, 0.18), rgba(212, 168, 61, 0.16))"
            }}
            transition={{ type: "spring", stiffness: 200, damping: 20 }}
          >
            <div className="max-w-3xl mx-auto">
              <motion.div 
                className="flex justify-center mb-6"
                whileHover={{ scale: 1.1, rotate: 5 }}
                transition={{ type: "spring", stiffness: 300, damping: 15 }}
              >
                <motion.div 
                  className="w-16 h-16 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center shadow-large"
                  animate={{ 
                    boxShadow: [
                      "0 10px 25px rgba(140, 90, 60, 0.18)",
                      "0 10px 25px rgba(47, 109, 102, 0.32)",
                      "0 10px 25px rgba(140, 90, 60, 0.18)"
                    ]
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <Icon name="Palette" size={32} className="text-primary-foreground" />
                </motion.div>
              </motion.div>
              
              <motion.h3 
                className="text-2xl md:text-3xl font-heading font-bold text-foreground mb-4"
                variants={headerVariants}
              >
                Can't Find What You're Looking For?
              </motion.h3>
              <motion.p 
                className="text-lg text-muted-foreground mb-8"
                variants={headerVariants}
              >
                Create your dream cake from scratch with our interactive 3D designer. Choose flavors, decorations, and personalize every detail.
              </motion.p>
              
              <motion.div 
                className="flex flex-col sm:flex-row gap-4 justify-center"
                variants={containerVariants}
              >
                <motion.div
                  variants={itemVariants}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button
                    variant="default"
                    size="lg"
                    iconName="Palette"
                    iconPosition="left"
                    className="text-lg px-8 py-4"
                    asChild
                  >
                    <Link to="/3d-custom-cake-designer">Start Custom Design</Link>
                  </Button>
                </motion.div>
                <motion.div
                  variants={itemVariants}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button
                    variant="outline"
                    size="lg"
                    iconName="Phone"
                    iconPosition="left"
                    className="text-lg px-8 py-4"
                  >
                    Speak to Designer
                  </Button>
                </motion.div>
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default CategoryGrid;