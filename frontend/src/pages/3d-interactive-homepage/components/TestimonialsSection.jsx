import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

const TestimonialsSection = () => {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [direction, setDirection] = useState(0);

  const testimonials = [
    {
      id: 1,
      name: "Sarah Johnson",
      role: "Happy Customer", 
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face",
      rating: 5,
      text: `The 3D cake designer blew my mind! I could see exactly how my daughter's birthday cake would look before ordering. The final result was even better than I imagined. Absolutely perfect!`,
      cakeType: "Custom Birthday Cake",
      orderDate: "December 2024",
      location: "New York, NY"
    },
    {
      id: 2,
      name: "Michael Chen",
      role: "Wedding Planner",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face",
      rating: 5,
      text: `As a wedding planner, I've worked with many bakeries, but Cuppie Cake's attention to detail and quality is unmatched. Their 3-tier wedding cakes are works of art that taste as amazing as they look.`,
      cakeType: "Wedding Cake Collection",
      orderDate: "November 2024",
      location: "Los Angeles, CA"
    },
    {
      id: 3,
      name: "Emily Rodriguez",
      role: "Busy Mom",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face",
      rating: 5,
      text: `The bento cakes are perfect for my family! Each kid gets their own personalized cake, and the ordering process is so easy. The delivery is always on time, and the cakes are fresh and delicious.`,
      cakeType: "Bento Cake Set",
      orderDate: "December 2024",
      location: "Chicago, IL"
    },
    {
      id: 4,
      name: "David Thompson",
      role: "Corporate Event Manager",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
      rating: 5,
      text: `Ordered a custom cake for our company anniversary. The team was professional, the design process was seamless, and the cake was the highlight of our celebration. Highly recommend!`,
      cakeType: "Corporate Custom Cake",
      orderDate: "October 2024",
      location: "San Francisco, CA"
    }
  ];

  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      nextTestimonial();
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoPlaying, currentTestimonial]);

  const nextTestimonial = () => {
    setDirection(1);
    setCurrentTestimonial(prev => (prev + 1) % testimonials?.length);
  };

  const prevTestimonial = () => {
    setDirection(-1);
    setCurrentTestimonial(prev => (prev - 1 + testimonials?.length) % testimonials?.length);
    setIsAutoPlaying(false);
  };

  const goToTestimonial = (index) => {
    setDirection(index > currentTestimonial ? 1 : -1);
    setCurrentTestimonial(index);
    setIsAutoPlaying(false);
  };

  const currentData = testimonials?.[currentTestimonial];

  const slideVariants = {
    enter: (direction) => ({
      x: direction > 0 ? 300 : -300,
      opacity: 0,
      scale: 0.9
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
      scale: 1
    },
    exit: (direction) => ({
      zIndex: 0,
      x: direction < 0 ? 300 : -300,
      opacity: 0,
      scale: 0.9
    })
  };

  return (
    <section className="py-16 bg-gradient-to-br from-accent/30 via-background to-muted/20">
      <div className="container mx-auto px-4">
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
            What Our Customers Say
          </motion.h2>
          <motion.p 
            className="text-lg text-muted-foreground max-w-2xl mx-auto"
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            Real stories from real customers who chose Cuppie Cake for their special moments
          </motion.p>
        </motion.div>

        <div className="max-w-4xl mx-auto">
          <motion.div 
            className="bg-card rounded-2xl shadow-large p-8 md:p-12 relative overflow-hidden"
            initial={{ scale: 0.9, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ type: "spring", stiffness: 100, damping: 15 }}
            whileHover={{ scale: 1.01 }}
          >
            <motion.div 
              className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full -translate-y-16 translate-x-16"
              animate={{ 
                scale: [1, 1.2, 1],
                rotate: [0, 180, 360] 
              }}
              transition={{ 
                duration: 20, 
                repeat: Infinity, 
                ease: "linear" 
              }}
            />
            <motion.div 
              className="absolute bottom-0 left-0 w-24 h-24 bg-secondary/5 rounded-full translate-y-12 -translate-x-12"
              animate={{ 
                scale: [1.2, 0.8, 1.2],
                rotate: [360, 180, 0] 
              }}
              transition={{ 
                duration: 15, 
                repeat: Infinity, 
                ease: "linear" 
              }}
            />

            <motion.button
              onClick={prevTestimonial}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 w-10 h-10 bg-background/80 backdrop-blur-sm rounded-full shadow-medium hover:bg-accent transition-colors duration-300 flex items-center justify-center"
              whileHover={{ scale: 1.1, x: -5 }}
              whileTap={{ scale: 0.9 }}
            >
              <Icon name="ChevronLeft" size={20} className="text-foreground" />
            </motion.button>
            <motion.button
              onClick={nextTestimonial}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 w-10 h-10 bg-background/80 backdrop-blur-sm rounded-full shadow-medium hover:bg-accent transition-colors duration-300 flex items-center justify-center"
              whileHover={{ scale: 1.1, x: 5 }}
              whileTap={{ scale: 0.9 }}
            >
              <Icon name="ChevronRight" size={20} className="text-foreground" />
            </motion.button>

            <div className="text-center relative z-10">
              <AnimatePresence mode="wait" custom={direction}>
                <motion.div
                  key={currentTestimonial}
                  custom={direction}
                  variants={slideVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{
                    x: { type: "spring", stiffness: 300, damping: 30 },
                    opacity: { duration: 0.2 }
                  }}
                >
                  <motion.div 
                    className="flex justify-center mb-6"
                    initial={{ scale: 0, rotate: -180 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ 
                      type: "spring", 
                      stiffness: 200, 
                      delay: 0.1 
                    }}
                  >
                    <motion.div 
                      className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center"
                      whileHover={{ 
                        scale: 1.1,
                        backgroundColor: "rgba(59, 130, 246, 0.15)",
                        rotate: 5 
                      }}
                    >
                      <Icon name="Quote" size={32} className="text-primary" />
                    </motion.div>
                  </motion.div>

                  <motion.div 
                    className="flex justify-center items-center space-x-1 mb-6"
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.2 }}
                  >
                    {[...Array(currentData?.rating)]?.map((_, i) => (
                      <motion.div
                        key={i}
                        initial={{ scale: 0, rotate: -180 }}
                        animate={{ scale: 1, rotate: 0 }}
                        transition={{ 
                          delay: 0.3 + i * 0.05,
                          type: "spring",
                          stiffness: 200
                        }}
                        whileHover={{ scale: 1.3 }}
                      >
                        <Icon
                          name="Star"
                          size={24}
                          className="text-warning fill-current"
                        />
                      </motion.div>
                    ))}
                  </motion.div>

                  <motion.blockquote 
                    className="text-lg md:text-xl text-foreground mb-8 leading-relaxed font-medium"
                    initial={{ y: 30, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.3 }}
                  >
                    "{currentData?.text}"
                  </motion.blockquote>

                  <motion.div 
                    className="flex flex-col md:flex-row items-center justify-center space-y-4 md:space-y-0 md:space-x-6"
                    initial={{ y: 30, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.4 }}
                  >
                    <div className="flex items-center space-x-4">
                      <motion.div
                        whileHover={{ scale: 1.1 }}
                        transition={{ type: "spring", stiffness: 300 }}
                      >
                        <Image
                          src={currentData?.avatar}
                          alt={currentData?.name}
                          className="w-16 h-16 rounded-full object-cover shadow-medium"
                        />
                      </motion.div>
                      <div className="text-left">
                        <motion.h4 
                          className="font-heading font-semibold text-foreground"
                          whileHover={{ color: "rgb(59 130 246)" }}
                        >
                          {currentData?.name}
                        </motion.h4>
                        <p className="text-sm text-muted-foreground">
                          {currentData?.role}
                        </p>
                      </div>
                    </div>

                    <div className="hidden md:block w-px h-12 bg-border"></div>

                    <motion.div 
                      className="text-center md:text-left"
                      whileHover={{ scale: 1.05 }}
                    >
                      <p className="text-sm font-medium text-primary">
                        {currentData?.cakeType}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {currentData?.orderDate} • {currentData?.location}
                      </p>
                    </motion.div>
                  </motion.div>
                </motion.div>
              </AnimatePresence>
            </div>
          </motion.div>

          <motion.div 
            className="flex justify-center space-x-3 mt-8"
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            {testimonials?.map((_, index) => (
              <motion.button
                key={index}
                onClick={() => goToTestimonial(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentTestimonial
                    ? 'bg-primary scale-125' :'bg-muted-foreground/30 hover:bg-muted-foreground/50'
                }`}
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
                animate={{
                  width: index === currentTestimonial ? 32 : 12,
                  backgroundColor: index === currentTestimonial ? "rgb(59 130 246)" : "rgba(107 114 128 / 0.3)"
                }}
              />
            ))}
          </motion.div>
        </div>

        <motion.div 
          className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: {
                staggerChildren: 0.1,
                delayChildren: 0.3
              }
            }
          }}
        >
          {[
            { number: "50k+", label: "Happy Customers", icon: "Users" },
            { number: "4.9★", label: "Average Rating", icon: "Star" },
            { number: "500+", label: "Custom Designs", icon: "Palette" },
            { number: "99%", label: "On-Time Delivery", icon: "Clock" }
          ]?.map((stat, index) => (
            <motion.div 
              key={stat?.label}
              className="text-center"
              variants={{
                hidden: { y: 50, opacity: 0 },
                visible: {
                  y: 0,
                  opacity: 1,
                  transition: {
                    type: "spring",
                    stiffness: 100,
                    damping: 12
                  }
                }
              }}
              whileHover={{ 
                scale: 1.05,
                transition: { type: "spring", stiffness: 300 }
              }}
            >
              <motion.div
                className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3"
                whileHover={{ scale: 1.1, rotate: 5 }}
              >
                <Icon name={stat?.icon} size={20} className="text-primary" />
              </motion.div>
              <motion.div 
                className="text-3xl md:text-4xl font-heading font-bold text-primary mb-2"
                animate={{ 
                  textShadow: ["0px 0px 0px rgba(0,0,0,0)", "0px 0px 10px rgba(59, 130, 246, 0.3)", "0px 0px 0px rgba(0,0,0,0)"] 
                }}
                transition={{ duration: 3, repeat: Infinity, delay: index * 0.5 }}
              >
                {stat?.number}
              </motion.div>
              <div className="text-sm text-muted-foreground">
                {stat?.label}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default TestimonialsSection;