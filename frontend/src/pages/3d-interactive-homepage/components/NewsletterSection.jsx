import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const NewsletterSection = () => {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const benefits = [
    {
      icon: 'Gift',
      title: 'Exclusive Offers',
      description: 'Get 15% off your first custom cake order'
    },
    {
      icon: 'Calendar',
      title: 'Early Access',
      description: 'Be first to know about seasonal collections'
    },
    {
      icon: 'Sparkles',
      title: 'Design Tips',
      description: 'Weekly cake decorating tips and trends'
    },
    {
      icon: 'Heart',
      title: 'Special Events',
      description: 'Invites to virtual cake decorating classes'
    }
  ];

  const handleSubscribe = async (e) => {
    e?.preventDefault();
    setError('');
    
    if (!email) {
      setError('Please enter your email address');
      return;
    }

    if (!email?.includes('@')) {
      setError('Please enter a valid email address');
      return;
    }

    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      setIsSubscribed(true);
      setEmail('');
    }, 1500);
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
    hidden: { y: 30, opacity: 0 },
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

  if (isSubscribed) {
    return (
      <motion.section 
        className="py-16 bg-gradient-to-r from-primary/10 via-accent/20 to-secondary/10"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ type: "spring", stiffness: 100, damping: 15 }}
      >
        <div className="container mx-auto px-4">
          <motion.div 
            className="max-w-2xl mx-auto text-center"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.div 
              className="w-20 h-20 bg-success rounded-full flex items-center justify-center mx-auto mb-6 shadow-large"
              variants={itemVariants}
              animate={{ 
                scale: [1, 1.1, 1],
                rotate: [0, 5, -5, 0] 
              }}
              transition={{ 
                scale: { duration: 2, repeat: Infinity },
                rotate: { duration: 0.5, repeat: 1 }
              }}
            >
              <Icon name="Check" size={40} className="text-success-foreground" />
            </motion.div>
            <motion.h2 
              className="text-3xl font-heading font-bold text-foreground mb-4"
              variants={itemVariants}
            >
              Welcome to the Cuppie Cake Family!
            </motion.h2>
            <motion.p 
              className="text-lg text-muted-foreground mb-8"
              variants={itemVariants}
            >
              Thank you for subscribing! Check your email for a special welcome offer and start exploring our delicious world of custom cakes.
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
                >
                  Start Designing
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
                  iconName="Search"
                  iconPosition="left"
                >
                  Browse Cakes
                </Button>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </motion.section>
    );
  }

  return (
    <section className="py-16 bg-gradient-to-r from-primary/10 via-accent/20 to-secondary/10">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <motion.div 
            className="grid lg:grid-cols-2 gap-12 items-center"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={containerVariants}
          >
            {/* Enhanced Content Side */}
            <motion.div variants={itemVariants}>
              <motion.div 
                className="mb-8"
                variants={itemVariants}
              >
                <motion.h2 
                  className="text-3xl md:text-4xl font-heading font-bold text-foreground mb-4"
                  initial={{ x: -50, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ type: "spring", stiffness: 100, damping: 15 }}
                >
                  Join the Sweet Life
                </motion.h2>
                <motion.p 
                  className="text-lg text-muted-foreground"
                  initial={{ x: -30, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.2 }}
                >
                  Subscribe to our newsletter and be the first to discover new flavors, exclusive designs, and special offers. Plus, get 15% off your first custom cake!
                </motion.p>
              </motion.div>

              {/* Enhanced Benefits Grid */}
              <motion.div 
                className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8"
                variants={containerVariants}
              >
                {benefits?.map((benefit, index) => (
                  <motion.div
                    key={index}
                    className="flex items-start space-x-3 p-4 bg-background/50 backdrop-blur-sm rounded-lg shadow-soft"
                    variants={itemVariants}
                    whileHover={{ 
                      scale: 1.02,
                      backgroundColor: "rgba(255, 255, 255, 0.7)",
                      transition: { type: "spring", stiffness: 300 }
                    }}
                  >
                    <motion.div 
                      className="w-10 h-10 bg-primary/20 rounded-full flex items-center justify-center flex-shrink-0"
                      whileHover={{ scale: 1.1, rotate: 5 }}
                    >
                      <Icon name={benefit?.icon} size={20} className="text-primary" />
                    </motion.div>
                    <div>
                      <motion.h3 
                        className="font-heading font-semibold text-foreground mb-1"
                        whileHover={{ color: "rgb(59 130 246)" }}
                      >
                        {benefit?.title}
                      </motion.h3>
                      <p className="text-sm text-muted-foreground">
                        {benefit?.description}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </motion.div>

              {/* Enhanced Social Proof */}
              <motion.div 
                className="flex items-center space-x-4 text-sm text-muted-foreground"
                variants={itemVariants}
              >
                <motion.div 
                  className="flex items-center space-x-2"
                  whileHover={{ scale: 1.05 }}
                >
                  <Icon name="Users" size={16} />
                  <span>Join 25,000+ subscribers</span>
                </motion.div>
                <motion.div 
                  className="flex items-center space-x-2"
                  whileHover={{ scale: 1.05 }}
                >
                  <Icon name="Shield" size={16} />
                  <span>No spam, unsubscribe anytime</span>
                </motion.div>
              </motion.div>
            </motion.div>

            {/* Enhanced Subscription Form */}
            <motion.div 
              className="bg-background rounded-2xl shadow-large p-8"
              variants={itemVariants}
              whileHover={{ 
                scale: 1.02,
                boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)"
              }}
              transition={{ type: "spring", stiffness: 200 }}
            >
              <motion.div 
                className="text-center mb-6"
                variants={containerVariants}
              >
                <motion.div 
                  className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4 shadow-medium"
                  variants={itemVariants}
                  whileHover={{ 
                    scale: 1.1,
                    rotate: 5,
                    boxShadow: "0 10px 25px rgba(59, 130, 246, 0.4)"
                  }}
                  animate={{ 
                    boxShadow: [
                      "0 10px 25px rgba(59, 130, 246, 0.2)",
                      "0 10px 25px rgba(59, 130, 246, 0.4)",
                      "0 10px 25px rgba(59, 130, 246, 0.2)"
                    ]
                  }}
                  transition={{ 
                    boxShadow: { duration: 3, repeat: Infinity }
                  }}
                >
                  <Icon name="Mail" size={32} className="text-primary-foreground" />
                </motion.div>
                <motion.h3 
                  className="text-xl font-heading font-bold text-foreground mb-2"
                  variants={itemVariants}
                >
                  Get Sweet Updates
                </motion.h3>
                <motion.p 
                  className="text-muted-foreground"
                  variants={itemVariants}
                >
                  Enter your email to start receiving exclusive offers
                </motion.p>
              </motion.div>

              <motion.form 
                onSubmit={handleSubscribe} 
                className="space-y-4"
                variants={containerVariants}
              >
                <motion.div variants={itemVariants}>
                  <Input
                    type="email"
                    label="Email Address"
                    placeholder="your.email@example.com"
                    value={email}
                    onChange={(e) => setEmail(e?.target?.value)}
                    error={error}
                    required
                    className="mb-4"
                  />
                </motion.div>

                <motion.div
                  variants={itemVariants}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Button
                    type="submit"
                    variant="default"
                    size="lg"
                    fullWidth
                    loading={isLoading}
                    iconName={isLoading ? undefined : "ArrowRight"}
                    iconPosition="right"
                  >
                    {isLoading ? 'Subscribing...' : 'Subscribe & Get 15% Off'}
                  </Button>
                </motion.div>

                <motion.p 
                  className="text-xs text-muted-foreground text-center"
                  variants={itemVariants}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.8 }}
                >
                  By subscribing, you agree to our{' '}
                  <motion.button 
                    className="text-primary hover:underline"
                    whileHover={{ scale: 1.05 }}
                  >
                    Privacy Policy
                  </motion.button>{' '}
                  and{' '}
                  <motion.button 
                    className="text-primary hover:underline"
                    whileHover={{ scale: 1.05 }}
                  >
                    Terms of Service
                  </motion.button>
                </motion.p>
              </motion.form>

              {/* Enhanced Trust Badges */}
              <motion.div 
                className="flex justify-center items-center space-x-4 mt-6 pt-6 border-t border-border"
                variants={containerVariants}
              >
                <motion.div 
                  className="flex items-center space-x-2 text-xs text-muted-foreground"
                  variants={itemVariants}
                  whileHover={{ scale: 1.05 }}
                >
                  <Icon name="Lock" size={14} />
                  <span>Secure & Private</span>
                </motion.div>
                <motion.div 
                  className="flex items-center space-x-2 text-xs text-muted-foreground"
                  variants={itemVariants}
                  whileHover={{ scale: 1.05 }}
                >
                  <Icon name="Zap" size={14} />
                  <span>Instant Delivery</span>
                </motion.div>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default NewsletterSection;