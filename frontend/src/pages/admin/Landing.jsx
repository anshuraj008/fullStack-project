import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  FiBarChart2, 
  FiPackage, 
  FiShoppingCart, 
  FiUsers, 
  FiTruck,
  FiArrowRight,
  FiCheckCircle
} from 'react-icons/fi';

// Use public image path to match customer frontend
const Logo = "/assets/images/no_image.png";

const LandingPage = () => {
  const features = [
    {
      icon: FiBarChart2,
      title: 'Dashboard Analytics',
      description: 'Track daily/weekly/monthly orders, sales analytics, and customer trends in real-time.',
      color: 'primary'
    },
    {
      icon: FiPackage,
      title: 'Product Management',
      description: 'Add, edit, and delete cakes. Manage customizations, pricing, and seasonal offers.',
      color: 'secondary'
    },
    {
      icon: FiShoppingCart,
      title: 'Order Management',
      description: 'View incoming orders, assign delivery staff, and update order statuses seamlessly.',
      color: 'success'
    },
    {
      icon: FiUsers,
      title: 'Customer Management',
      description: 'View registered customers, handle queries, and offer loyalty rewards.',
      color: 'warning'
    },
    {
      icon: FiTruck,
      title: 'Delivery Management',
      description: 'Real-time delivery tracking, zone management, and staff coordination.',
      color: 'error'
    }
  ];

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
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-accent/10 to-background">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border shadow-soft">
        <div className="container mx-auto px-4 lg:px-6 h-16 flex items-center justify-between">
          {/* Logo matching customer frontend */}
          <Link to="/" className="flex items-center space-x-2">
            <img src={Logo} alt="Cuppie Cake Logo" className="w-10 h-10 rounded-md" />
            <span className="text-xl font-heading font-semibold text-foreground">
              Cuppie Cake
            </span>
          </Link>
          <Link
            to="/admin"
            className="px-6 py-2 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-secondary transition-all duration-200 shadow-soft hover:shadow-medium"
          >
            Admin Portal
          </Link>
        </div>
      </header>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4">
        <div className="container mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-5xl lg:text-7xl font-heading font-bold text-foreground mb-6">
              Admin Control Center
            </h1>
            <p className="text-xl lg:text-2xl text-text-secondary max-w-3xl mx-auto mb-8">
              Streamline your bakery operations with our comprehensive admin dashboard.
              Manage products, orders, customers, and deliveries all in one place.
            </p>
            <Link
              to="/admin"
              className="inline-flex items-center space-x-2 px-8 py-4 bg-primary text-primary-foreground rounded-xl font-semibold text-lg hover:bg-secondary transition-all duration-200 shadow-medium hover:shadow-large"
            >
              <span>Get Started</span>
              <FiArrowRight size={24} />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={containerVariants}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {features.map((feature, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="bg-card rounded-2xl p-8 border border-border shadow-medium hover:shadow-large transition-all duration-300 group"
              >
                <div className={`w-16 h-16 rounded-xl bg-${feature.color}/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  <feature.icon className={`text-${feature.color}`} size={32} />
                </div>
                <h3 className="text-2xl font-heading font-semibold mb-4 text-foreground">
                  {feature.title}
                </h3>
                <p className="text-text-secondary leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 px-4 bg-card/50">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto"
          >
            <h2 className="text-4xl lg:text-5xl font-heading font-bold text-center mb-12 text-foreground">
              Why Choose Our Admin Panel?
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              {[
                'Real-time order tracking and status updates',
                'Comprehensive sales analytics and reports',
                'Easy product and inventory management',
                'Customer relationship management tools',
                'Delivery staff coordination and tracking',
                'Loyalty program and discount management'
              ].map((benefit, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-start space-x-3"
                >
                  <FiCheckCircle className="text-success flex-shrink-0 mt-1" size={24} />
                  <p className="text-lg text-text-secondary">{benefit}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="bg-gradient-to-r from-primary via-secondary to-primary p-12 rounded-3xl shadow-xl-custom"
          >
            <h2 className="text-4xl font-heading font-bold text-primary-foreground mb-4">
              Ready to Manage Your Bakery?
            </h2>
            <p className="text-xl text-primary-foreground/90 mb-8 max-w-2xl mx-auto">
              Access the admin portal and take control of your bakery operations.
            </p>
            <Link
              to="/admin"
              className="inline-flex items-center space-x-2 px-10 py-5 bg-background text-foreground rounded-xl font-semibold text-lg hover:bg-card transition-all duration-200 shadow-large"
            >
              <span>Enter Admin Portal</span>
              <FiArrowRight size={24} />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-4 border-t border-border">
        <div className="container mx-auto text-center">
          <p className="text-text-secondary">
            © 2025 Cuppie Cake. Admin Panel - All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
