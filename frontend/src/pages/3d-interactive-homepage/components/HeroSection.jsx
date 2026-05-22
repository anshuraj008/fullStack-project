import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import Icon from "../../../components/AppIcon";
import Image from "../../../components/AppImage";
import Button from "../../../components/ui/Button";
import BgImg from "/assets/banner.png";

const HeroSection = () => {
  const [currentRotation, setCurrentRotation] = useState(0);
  const [isAutoRotating, setIsAutoRotating] = useState(true);
  const [touchStart, setTouchStart] = useState(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  // Auto-rotation effect
  useEffect(() => {
    if (!isAutoRotating) return;

    const interval = setInterval(() => {
      setCurrentRotation((prev) => (prev + 1) % 360);
    }, 50);

    return () => clearInterval(interval);
  }, [isAutoRotating]);

  // Mouse parallax effect
  useEffect(() => {
    const handleMouseMove = (e) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 20;
      const y = (e.clientY / window.innerHeight - 0.5) * 20;
      setMousePosition({ x, y });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const handleTouchStart = (e) => {
    setIsAutoRotating(false);
    setTouchStart(e.touches[0].clientX);
  };

  const handleTouchMove = (e) => {
    if (!touchStart) return;

    const currentTouch = e.touches[0].clientX;
    const diff = touchStart - currentTouch;
    setCurrentRotation((prev) => prev + diff * 0.5);
    setTouchStart(currentTouch);
  };

  const handleTouchEnd = () => {
    setTouchStart(null);
    setTimeout(() => setIsAutoRotating(true), 3000);
  };

  const handleMouseInteraction = (isEntering) => {
    setIsAutoRotating(!isEntering);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2, delayChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { y: 60, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 100, damping: 15 },
    },
  };

  const floatingVariants = {
    float: {
      y: [-10, 10, -10],
      transition: { duration: 4, repeat: Infinity, ease: "easeInOut" },
    },
  };

  return (
    <motion.section
      className="relative min-h-screen bg-cover bg-center overflow-hidden"
      style={{
        backgroundImage: `url(${BgImg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      {/* Overlay for better text visibility */}
      <div className="absolute inset-0 bg-black/40"></div>

      <div className="relative z-10 container mx-auto px-4 pt-20 pb-8">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center min-h-[calc(100vh-5rem)]">
          {/* Left Side: Text Content */}
          <motion.div
            className="text-center lg:text-left space-y-6 lg:space-y-8 text-white"
            variants={itemVariants}
          >
            <motion.h1
              className="text-4xl md:text-6xl font-bold leading-tight drop-shadow-lg"
              initial={{ y: 100, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{
                type: "spring",
                stiffness: 100,
                damping: 15,
                delay: 0.2,
              }}
            >
              Freshly Baked Happiness,{" "}
              <motion.span
                className="block text-rose-400"
                initial={{ x: -50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{
                  type: "spring",
                  stiffness: 100,
                  damping: 15,
                  delay: 0.5,
                }}
              >
                Just for You 🍰
              </motion.span>
            </motion.h1>

            <motion.p
              className="text-lg md:text-xl text-white/90 max-w-2xl mx-auto lg:mx-0"
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{
                type: "spring",
                stiffness: 80,
                damping: 15,
                delay: 0.7,
              }}
            >
              Where traditional recipes meet artistic innovation — discover the perfect blend of timeless flavors and contemporary cake artistry that transforms every celebration into an unforgettable masterpiece!
            </motion.p>

            {/* Buttons */}
            <motion.div
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
              variants={itemVariants}
            >
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button
                  variant="default"
                  size="lg"
                  iconName="ShoppingCart"
                  iconPosition="left"
                  className="text-lg px-8 py-4 bg-rose-500 hover:bg-rose-600"
                  asChild
                >
                  <Link to="/cake-category-browse">Order Now</Link>
                </Button>
              </motion.div>
            </motion.div>
          </motion.div>

          {/* Right Side: 3D Interactive Image */}
          <motion.div className="relative" variants={itemVariants}>
            <motion.div
              className="relative w-full max-w-lg mx-auto aspect-square bg-gradient-to-br from-white/10 to-white/5 rounded-full shadow-xl-custom overflow-hidden cursor-grab active:cursor-grabbing"
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
              onMouseEnter={() => handleMouseInteraction(true)}
              onMouseLeave={() => handleMouseInteraction(false)}
              whileHover={{ scale: 1.02 }}
              animate={{
                x: mousePosition.x * 0.02,
                y: mousePosition.y * 0.02,
              }}
              transition={{ type: "spring", stiffness: 100, damping: 15 }}
            >
              <motion.div
                className="absolute inset-4 transition-transform duration-100 ease-out"
                style={{ transform: `rotateY(${currentRotation}deg)` }}
                animate={floatingVariants.float}
              >
                <Image
                  src="https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=500&h=500&fit=crop"
                  alt="3D Interactive Birthday Cake"
                  className="w-full h-full object-cover rounded-full shadow-large"
                />
              </motion.div>

              {/* Floating icons */}
              <motion.div
                className="absolute -top-4 -right-4 w-8 h-8 bg-rose-500 rounded-full flex items-center justify-center shadow-medium"
                animate={{ y: [-5, 5, -5], rotate: [0, 180, 360] }}
                transition={{
                  y: { duration: 2, repeat: Infinity, ease: "easeInOut" },
                  rotate: { duration: 4, repeat: Infinity, ease: "linear" },
                }}
              >
                <Icon name="Star" size={16} className="text-white" />
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Navigation Cards */}
      <motion.div
        className="relative z-10 container mx-auto px-4 py-8"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.5, duration: 0.8 }}
      >
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center max-w-4xl mx-auto">
          {/* Browse Cakes Card */}
          <motion.div
            whileHover={{ scale: 1.05, y: -5 }}
            whileTap={{ scale: 0.95 }}
            className="group"
          >
            <Link
              to="/cake-category-browse"
              className="flex flex-col items-center p-6 bg-white/10 backdrop-blur-sm rounded-xl border border-white/20 hover:bg-white/20 transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              <div className="w-12 h-12 bg-rose-500 rounded-full flex items-center justify-center mb-4 group-hover:bg-rose-600 transition-colors">
                <Icon name="Search" size={24} className="text-white" />
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">Browse Cakes</h3>
              <p className="text-sm text-white/80 text-center">Explore our delicious collection</p>
            </Link>
          </motion.div>

          {/* Cart Card */}
          <motion.div
            whileHover={{ scale: 1.05, y: -5 }}
            whileTap={{ scale: 0.95 }}
            className="group"
          >
            <Link
              to="/shopping-cart-checkout"
              className="flex flex-col items-center p-6 bg-white/10 backdrop-blur-sm rounded-xl border border-white/20 hover:bg-white/20 transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              <div className="w-12 h-12 bg-rose-500 rounded-full flex items-center justify-center mb-4 group-hover:bg-rose-600 transition-colors">
                <Icon name="ShoppingCart" size={24} className="text-white" />
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">Shopping Cart</h3>
              <p className="text-sm text-white/80 text-center">View and manage your orders</p>
            </Link>
          </motion.div>

          {/* Custom Designer Card */}
          <motion.div
            whileHover={{ scale: 1.05, y: -5 }}
            whileTap={{ scale: 0.95 }}
            className="group"
          >
            <Link
              to="/3d-custom-cake-designer"
              className="flex flex-col items-center p-6 bg-white/10 backdrop-blur-sm rounded-xl border border-white/20 hover:bg-white/20 transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              <div className="w-12 h-12 bg-rose-500 rounded-full flex items-center justify-center mb-4 group-hover:bg-rose-600 transition-colors">
                <Icon name="Palette" size={24} className="text-white" />
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">Custom Design</h3>
              <p className="text-sm text-white/80 text-center">Create your perfect cake</p>
            </Link>
          </motion.div>
        </div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2.5 }}
      >
        <motion.div
          className="flex flex-col items-center space-y-2"
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <span className="text-sm font-medium">Scroll to explore</span>
          <motion.div
            animate={{ y: [0, 5, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          >
            <Icon name="ChevronDown" size={24} />
          </motion.div>
        </motion.div>
      </motion.div>
    </motion.section>
  );
};

export default HeroSection;
