import React, { useEffect } from "react";
import { motion } from "framer-motion";
import { Helmet } from "react-helmet";
import Header from "../../components/ui/Header";
import HeroSection from "./components/HeroSection";
import TrendingCarousel from "./components/TrendingCarousel";
import CategoryGrid from "./components/CategoryGrid";
import FeaturedProducts from "./components/FeaturedProducts";
import TestimonialsSection from "./components/TestimonialsSection";
import NewsletterSection from "./components/NewsletterSection";

const InteractiveHomepage = () => {
  useEffect(() => {
    // Smooth scrolling behavior
    document.documentElement.style.scrollBehavior = "smooth";

    // Cleanup
    return () => {
      document.documentElement.style.scrollBehavior = "auto";
    };
  }, []);

  const sectionVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  return (
    <>
      <Helmet>
        <title>Cuppie Cake - Premium 3D Custom Cake Designer | Order Online</title>
        <meta
          name="description"
          content="Create your dream cake with our interactive 3D designer. Premium bento cakes, birthday cakes, wedding cakes with custom designs. Order online with same-day delivery."
        />
        <meta
          name="keywords"
          content="custom cakes, 3D cake designer, bento cakes, birthday cakes, wedding cakes, online cake ordering, premium bakery"
        />
        <meta
          property="og:title"
          content="Cuppie Cake - Premium 3D Custom Cake Designer"
        />
        <meta
          property="og:description"
          content="Experience the magic of custom cake design with our interactive 3D builder. From bento cakes to wedding masterpieces."
        />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <link rel="canonical" href="/3d-interactive-homepage" />
      </Helmet>

      <div className="min-h-screen bg-background">
        <Header />

        <main className="pt-16">
          {/* Hero Section with 3D Interactive Cake */}
          <HeroSection />

          {/* Trending Designs Carousel */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={sectionVariants}
          >
            <TrendingCarousel />
          </motion.div>

          {/* Category Grid */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={sectionVariants}
          >
            <CategoryGrid />
          </motion.div>

          {/* Featured Products */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={sectionVariants}
          >
            <FeaturedProducts />
          </motion.div>

          {/* Customer Testimonials */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={sectionVariants}
          >
            <TestimonialsSection />
          </motion.div>

          {/* Newsletter Subscription */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={sectionVariants}
          >
            <NewsletterSection />
          </motion.div>
        </main>
      </div>
    </>
  );
};

export default InteractiveHomepage;
