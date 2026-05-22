import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { motion, AnimatePresence } from 'framer-motion';
import { FiX, FiPlus, FiMinus, FiChevronDown, FiEye } from 'react-icons/fi';
import Header from '../../components/ui/Header';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';

const Menu = () => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [cart, setCart] = useState([]);
  const [quickAddItems, setQuickAddItems] = useState([]);
  const [showQuickAdd, setShowQuickAdd] = useState(false);
  const [showCart, setShowCart] = useState(false);
  const [notification, setNotification] = useState(null);
  const [selectedItemDetails, setSelectedItemDetails] = useState(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);

  const menuCategories = [
    { id: 'all', name: 'All Items', icon: 'Grid' },
    { id: 'birthday', name: 'Birthday Cakes', icon: 'Gift' },
    { id: 'wedding', name: 'Wedding Cakes', icon: 'Heart' },
    { id: 'cupcakes', name: 'Cupcakes', icon: 'Coffee' },
    { id: 'bento', name: 'Bento Cakes', icon: 'Box' },
    { id: 'seasonal', name: 'Seasonal Specials', icon: 'Star' }
  ];

  const menuItems = [
    // Birthday Cakes
    {
      id: 1,
      name: "Classic Vanilla Birthday",
      description: "Timeless vanilla sponge with buttercream frosting and sprinkles",
      price: 29.99,
      image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=300&h=300&fit=crop",
      category: 'birthday',
      popular: true,
      customizable: true,
      sizes: ['6"', '8"', '10"'],
      flavors: ['Vanilla', 'Chocolate', 'Strawberry']
    },
    {
      id: 2,
      name: "Chocolate Dream",
      description: "Rich chocolate cake with chocolate ganache and fresh berries",
      price: 34.99,
      image: "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=300&h=300&fit=crop",
      category: 'birthday',
      popular: true,
      customizable: true,
      sizes: ['6"', '8"', '10"'],
      flavors: ['Dark Chocolate', 'Milk Chocolate', 'White Chocolate']
    },
    {
      id: 3,
      name: "Rainbow Layer Cake",
      description: "Six colorful layers with cream cheese frosting",
      price: 39.99,
      image: "https://images.unsplash.com/photo-1551024506-0bccd828d307?w=300&h=300&fit=crop",
      category: 'birthday',
      popular: false,
      customizable: true,
      sizes: ['6"', '8"', '10"'],
      flavors: ['Rainbow', 'Unicorn', 'Custom Colors']
    },

    // Wedding Cakes
    {
      id: 4,
      name: "Elegant White Wedding",
      description: "Three-tier fondant cake with delicate floral decorations",
      price: 199.99,
      image: "https://images.unsplash.com/photo-1535254973040-607b474cb50d?w=300&h=300&fit=crop",
      category: 'wedding',
      popular: true,
      customizable: true,
      sizes: ['3-Tier', '4-Tier', '5-Tier'],
      flavors: ['Vanilla', 'Almond', 'Lemon']
    },
    {
      id: 5,
      name: "Rustic Buttercream Wedding",
      description: "Semi-naked cake with fresh flowers and rustic buttercream",
      price: 179.99,
      image: "https://images.unsplash.com/photo-1464349095431-e9a21285b5f3?w=300&h=300&fit=crop",
      category: 'wedding',
      popular: false,
      customizable: true,
      sizes: ['2-Tier', '3-Tier', '4-Tier'],
      flavors: ['Carrot', 'Red Velvet', 'Spice']
    },

    // Cupcakes
    {
      id: 6,
      name: "Assorted Cupcake Dozen",
      description: "Mix of vanilla, chocolate, and red velvet cupcakes",
      price: 24.99,
      image: "https://images.unsplash.com/photo-1519869325930-281384150729?w=300&h=300&fit=crop",
      category: 'cupcakes',
      popular: true,
      customizable: false,
      sizes: ['Standard'],
      flavors: ['Vanilla', 'Chocolate', 'Red Velvet', 'Mix']
    },
    {
      id: 7,
      name: "Mini Cupcake Bites",
      description: "Bite-sized cupcakes perfect for parties and events",
      price: 18.99,
      image: "https://images.unsplash.com/photo-1571115764595-644a1f56a55c?w=300&h=300&fit=crop",
      category: 'cupcakes',
      popular: false,
      customizable: true,
      sizes: ['Mini (24pc)', 'Small (12pc)'],
      flavors: ['Assorted', 'Single Flavor']
    },

    // Bento Cakes
    {
      id: 8,
      name: "Korean Bento Cake",
      description: "Adorable mini cake with cute decorations and messages",
      price: 15.99,
      image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=300&h=300&fit=crop",
      category: 'bento',
      popular: true,
      customizable: true,
      sizes: ['4" Square'],
      flavors: ['Vanilla', 'Chocolate', 'Matcha', 'Taro']
    },
    {
      id: 9,
      name: "Lunchbox Cake Special",
      description: "Perfect for gifting with personalized messages",
      price: 19.99,
      image: "https://images.unsplash.com/photo-1551024506-0bccd828d307?w=300&h=300&fit=crop",
      category: 'bento',
      popular: false,
      customizable: true,
      sizes: ['4" Square', '6" Round'],
      flavors: ['Strawberry', 'Oreo', 'Pistachio']
    },

    // Seasonal Specials
    {
      id: 10,
      name: "Holiday Gingerbread House",
      description: "Festive gingerbread cake with holiday decorations",
      price: 49.99,
      image: "https://images.unsplash.com/photo-1486427944299-d1955d23e34d?w=300&h=300&fit=crop",
      category: 'seasonal',
      popular: true,
      customizable: false,
      sizes: ['Standard'],
      flavors: ['Gingerbread Spice']
    },
    {
      id: 11,
      name: "Valentine's Heart Cake",
      description: "Romantic heart-shaped cake with rose decorations",
      price: 39.99,
      image: "https://images.unsplash.com/photo-1518047601542-79f18c655718?w=300&h=300&fit=crop",
      category: 'seasonal',
      popular: false,
      customizable: true,
      sizes: ['6" Heart', '8" Heart'],
      flavors: ['Red Velvet', 'Strawberry', 'Raspberry']
    }
  ];

  const filteredItems = activeCategory === 'all'
    ? menuItems
    : menuItems.filter(item => item.category === activeCategory);

  const addToCart = (item) => {
    setCart(prev => [...prev, { ...item, quantity: 1, selectedSize: item.sizes[0], selectedFlavor: item.flavors[0] }]);
    setShowCart(true);
    showNotification(`${item.name} added to cart!`);
  };

  const removeCartItem = (itemId, index) => {
    setCart(prev => prev.filter((_, i) => i !== index));
  };

  const updateCartQuantity = (index, quantity) => {
    if (quantity <= 0) {
      removeCartItem(null, index);
    } else {
      setCart(prev =>
        prev.map((item, i) =>
          i === index ? { ...item, quantity } : item
        )
      );
    }
  };

  const updateCartSize = (index, size) => {
    setCart(prev =>
      prev.map((item, i) =>
        i === index ? { ...item, selectedSize: size } : item
      )
    );
  };

  const updateCartFlavor = (index, flavor) => {
    setCart(prev =>
      prev.map((item, i) =>
        i === index ? { ...item, selectedFlavor: flavor } : item
      )
    );
  };

  const clearCart = () => {
    setCart([]);
    showNotification('Cart cleared!');
  };

  const viewItemDetails = (item, cartIndex = null) => {
    setSelectedItemDetails({ ...item, cartIndex });
    setShowDetailsModal(true);
  };

  const closeDetailsModal = () => {
    setShowDetailsModal(false);
    setTimeout(() => setSelectedItemDetails(null), 300);
  };

  const quickAddItem = (item) => {
    const existingItem = quickAddItems.find(q => q.id === item.id);
    
    if (existingItem) {
      setQuickAddItems(prev =>
        prev.map(q =>
          q.id === item.id
            ? { ...q, quantity: q.quantity + 1 }
            : q
        )
      );
    } else {
      setQuickAddItems(prev => [...prev, { ...item, quantity: 1, selectedSize: item.sizes[0], selectedFlavor: item.flavors[0] }]);
    }
    
    setShowQuickAdd(true);
    showNotification(`${item.name} added to quick section!`);
  };

  const removeQuickAddItem = (itemId) => {
    setQuickAddItems(prev => prev.filter(item => item.id !== itemId));
  };

  const updateQuickAddQuantity = (itemId, quantity) => {
    if (quantity <= 0) {
      removeQuickAddItem(itemId);
    } else {
      setQuickAddItems(prev =>
        prev.map(item =>
          item.id === itemId ? { ...item, quantity } : item
        )
      );
    }
  };

  const addQuickItemsToCart = () => {
    setCart(prev => [...prev, ...quickAddItems.map(item => ({ ...item }))]);
    showNotification(`${quickAddItems.length} item(s) added to cart!`);
    setQuickAddItems([]);
    setShowQuickAdd(false);
  };

  const showNotification = (message) => {
    setNotification(message);
    setTimeout(() => setNotification(null), 3000);
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(price);
  };

  return (
    <>
      <Helmet>
        <title>Menu - Cuppie Cake</title>
        <meta name="description" content="Browse our complete menu of delicious cakes, cupcakes, and custom creations" />
      </Helmet>

      <div className="min-h-screen bg-background">
        <Header />

        {/* Hero Section */}
        <section className="relative bg-gradient-to-br from-[#FCFAF7] to-[#F1F6F3] py-16 mt-16">
          <div className="container mx-auto px-4 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-4">
                Our Delicious Menu
              </h1>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                From classic birthday cakes to elegant wedding creations, discover our complete collection of handcrafted delights
              </p>
            </motion.div>
          </div>
        </section>

        {/* Menu Section */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            {/* Cart Section */}
            {cart.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-12 bg-gradient-to-r from-[#FFF8F1] to-[#F6EFE6] rounded-xl border-2 border-[#E9DED2] p-8 shadow-medium"
              >
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h2 className="text-2xl font-bold text-[#2B231D] flex items-center gap-2">
                      <Icon name="ShoppingCart" size={24} className="text-[#8C5A3C]" />
                      Shopping Cart
                    </h2>
                    <p className="text-[#6E6258] mt-1">{cart.length} item(s) in cart</p>
                  </div>
                  <button
                    onClick={() => setShowCart(!showCart)}
                    className="text-[#8C5A3C] hover:text-[#2F6D66] text-2xl"
                  >
                    <FiChevronDown
                      size={24}
                      className={`transform transition-transform ${showCart ? 'rotate-180' : ''}`}
                    />
                  </button>
                </div>

                <AnimatePresence>
                  {showCart && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                    >
                      {/* Cart Items Grid */}
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
                        {cart.map((item, index) => (
                          <motion.div
                            key={index}
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.9 }}
                            className="bg-white rounded-lg p-4 border border-[#E9DED2] shadow-soft"
                          >
                            {/* Item Image */}
                            <div className="mb-4 relative">
                              <img
                                src={item.image}
                                alt={item.name}
                                className="w-full h-32 object-cover rounded-lg cursor-pointer hover:opacity-80 transition"
                                onClick={() => viewItemDetails(item, index)}
                              />
                              <button
                                onClick={() => removeCartItem(item.id, index)}
                                className="absolute top-2 right-2 bg-[#8C5A3C] text-white p-2 rounded-full hover:bg-[#74482F]"
                              >
                                <FiX size={18} />
                              </button>
                              <button
                                onClick={() => viewItemDetails(item, index)}
                                className="absolute top-2 left-2 bg-[#8C5A3C] text-white p-2 rounded-full hover:bg-[#74482F]"
                                title="View Details"
                              >
                                <FiEye size={18} />
                              </button>
                            </div>

                            {/* Item Details */}
                            <div className="mb-3">
                              <h3 className="font-semibold text-gray-900 text-sm mb-2">{item.name}</h3>
                              <p className="text-lg font-bold text-[#8C5A3C]">{formatPrice(item.price)}</p>
                            </div>

                            {/* Size Selection */}
                            <div className="mb-3">
                              <label className="text-xs font-semibold text-gray-700 block mb-2">Size</label>
                              <select
                                value={item.selectedSize}
                                onChange={(e) => updateCartSize(index, e.target.value)}
                                className="w-full px-2 py-1 border border-gray-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-[#8C5A3C]"
                              >
                                {item.sizes.map((size) => (
                                  <option key={size} value={size}>
                                    {size}
                                  </option>
                                ))}
                              </select>
                            </div>

                            {/* Flavor Selection */}
                            <div className="mb-4">
                              <label className="text-xs font-semibold text-gray-700 block mb-2">Flavor</label>
                              <select
                                value={item.selectedFlavor}
                                onChange={(e) => updateCartFlavor(index, e.target.value)}
                                className="w-full px-2 py-1 border border-gray-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-[#8C5A3C]"
                              >
                                {item.flavors.map((flavor) => (
                                  <option key={flavor} value={flavor}>
                                    {flavor}
                                  </option>
                                ))}
                              </select>
                            </div>

                            {/* Quantity Controls */}
                            <div className="flex items-center justify-between bg-gray-100 rounded-lg p-2">
                              <button
                                onClick={() => updateCartQuantity(index, item.quantity - 1)}
                                className="p-1 hover:bg-gray-200 transition"
                              >
                                <FiMinus size={16} />
                              </button>
                              <span className="font-semibold text-sm w-8 text-center">
                                {item.quantity}
                              </span>
                              <button
                                onClick={() => updateCartQuantity(index, item.quantity + 1)}
                                className="p-1 hover:bg-gray-200 transition"
                              >
                                <FiPlus size={16} />
                              </button>
                            </div>

                            {/* Item Total */}
                            <div className="mt-3 pt-3 border-t border-gray-200 text-right">
                              <p className="text-xs text-gray-600">Item Total</p>
                              <p className="text-lg font-bold text-[#8C5A3C]">
                                {formatPrice(item.price * item.quantity)}
                              </p>
                            </div>
                          </motion.div>
                        ))}
                      </div>

                      {/* Cart Summary and Actions */}
                      <div className="bg-white rounded-lg p-6 border border-[#E9DED2]">
                        <div className="space-y-4 mb-6">
                          <div className="flex items-center justify-between text-gray-700">
                            <span>Subtotal:</span>
                            <span className="font-semibold">
                              {formatPrice(cart.reduce((sum, item) => sum + (item.price * item.quantity), 0))}
                            </span>
                          </div>
                          <div className="flex items-center justify-between text-gray-700">
                            <span>Estimated Delivery:</span>
                            <span className="font-semibold text-sm">3-5 business days</span>
                          </div>
                        </div>

                        <div className="pt-4 border-t border-gray-200 mb-6">
                          <div className="flex items-center justify-between">
                            <span className="text-lg font-bold text-gray-900">Order Total:</span>
                            <span className="text-3xl font-bold text-[#8C5A3C]">
                              {formatPrice(cart.reduce((sum, item) => sum + (item.price * item.quantity), 0))}
                            </span>
                          </div>
                        </div>

                        <div className="flex gap-3">
                          <button
                            onClick={clearCart}
                            className="flex-1 px-4 py-3 border-2 border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 font-semibold transition"
                          >
                            Clear Cart
                          </button>
                          <button
                            onClick={() => window.location.href = '/shopping-cart-checkout'}
                            className="flex-1 px-4 py-3 bg-[#8C5A3C] text-white rounded-lg hover:bg-[#74482F] font-semibold transition flex items-center justify-center gap-2"
                          >
                            <Icon name="ArrowRight" size={18} />
                            Proceed to Checkout
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            )}
            {quickAddItems.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-12 bg-gradient-to-r from-[#FFF8F1] to-[#F6EFE6] rounded-xl border-2 border-[#E7D7CA] p-8 shadow-medium"
              >
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h2 className="text-2xl font-bold text-[#2B231D] flex items-center gap-2">
                      <Icon name="Zap" size={24} className="text-[#8C5A3C]" />
                      Quick Add Section
                    </h2>
                    <p className="text-[#6E6258] mt-1">{quickAddItems.length} item(s) ready to add</p>
                  </div>
                  <button
                    onClick={() => setShowQuickAdd(!showQuickAdd)}
                    className="text-[#8C5A3C] hover:text-[#74482F] text-2xl"
                  >
                    {showQuickAdd ? '−' : '+'}
                  </button>
                </div>

                {showQuickAdd && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                  >
                    {/* Quick Add Items Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
                      {quickAddItems.map((item) => (
                        <motion.div
                          key={item.id}
                          initial={{ opacity: 0, scale: 0.9 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.9 }}
                          className="bg-white rounded-lg p-4 border border-[#D8E5E1] shadow-soft"
                        >
                          <div className="flex items-start justify-between mb-3">
                            <div>
                              <h3 className="font-semibold text-gray-900 text-sm">{item.name}</h3>
                              <p className="text-xs text-gray-600 mt-1">
                                Size: <span className="font-medium">{item.selectedSize}</span>
                              </p>
                              <p className="text-xs text-gray-600">
                                Flavor: <span className="font-medium">{item.selectedFlavor}</span>
                              </p>
                            </div>
                            <button
                              onClick={() => removeQuickAddItem(item.id)}
                              className="text-red-500 hover:text-red-700 p-1"
                            >
                              <FiX size={18} />
                            </button>
                          </div>

                          <div className="flex items-center justify-between">
                            <div className="text-lg font-bold text-[#8C5A3C]">
                              {formatPrice(item.price)}
                            </div>
                            <div className="flex items-center gap-2 bg-gray-100 rounded-lg">
                              <button
                                onClick={() => updateQuickAddQuantity(item.id, item.quantity - 1)}
                                className="p-2 hover:bg-gray-200 transition"
                              >
                                <FiMinus size={16} />
                              </button>
                              <span className="w-8 text-center font-semibold text-sm">
                                {item.quantity}
                              </span>
                              <button
                                onClick={() => updateQuickAddQuantity(item.id, item.quantity + 1)}
                                className="p-2 hover:bg-gray-200 transition"
                              >
                                <FiPlus size={16} />
                              </button>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </div>

                    {/* Summary and Actions */}
                    <div className="bg-white rounded-lg p-4 border border-[#D8E5E1]">
                      <div className="flex items-center justify-between mb-4">
                        <span className="text-gray-700 font-semibold">Total Items:</span>
                        <span className="text-2xl font-bold text-[#8C5A3C]">
                          {quickAddItems.reduce((sum, item) => sum + item.quantity, 0)}
                        </span>
                      </div>
                      <div className="flex items-center justify-between mb-4 pb-4 border-b border-gray-200">
                        <span className="text-gray-700 font-semibold">Subtotal:</span>
                        <span className="text-2xl font-bold text-[#8C5A3C]">
                          {formatPrice(quickAddItems.reduce((sum, item) => sum + (item.price * item.quantity), 0))}
                        </span>
                      </div>

                      <div className="flex gap-3">
                        <button
                          onClick={() => setQuickAddItems([])}
                          className="flex-1 px-4 py-2 border-2 border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 font-medium transition"
                        >
                          Clear All
                        </button>
                        <button
                          onClick={addQuickItemsToCart}
                          className="flex-1 px-4 py-2 bg-[#8C5A3C] text-white rounded-lg hover:bg-[#74482F] font-medium transition flex items-center justify-center gap-2"
                        >
                          <FiPlus size={18} />
                          Add to Cart
                        </button>
                      </div>
                    </div>
                  </motion.div>
                )}
              </motion.div>
            )}

            {/* Notification */}
            {notification && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="mb-6 p-4 bg-green-50 border border-green-200 text-green-700 rounded-lg flex items-center gap-2"
              >
                <Icon name="CheckCircle" size={20} className="text-green-600" />
                {notification}
              </motion.div>
            )}
            <div className="flex flex-wrap justify-center gap-4 mb-12">
              {menuCategories.map((category) => (
                <Button
                  key={category.id}
                  variant={activeCategory === category.id ? "default" : "outline"}
                  size="lg"
                  iconName={category.icon}
                  onClick={() => setActiveCategory(category.id)}
                  className={`px-6 py-3 ${activeCategory === category.id
                    ? 'bg-[#8C5A3C] hover:bg-[#74482F] text-white'
                    : 'border-[#E9DED2] text-[#8C5A3C] hover:bg-[#F6EFE6]'
                  }`}
                >
                  {category.name}
                </Button>
              ))}
            </div>

            {/* Menu Items */}
            <div className="max-w-6xl mx-auto">
              {filteredItems.map((item, index) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                  className="bg-white rounded-xl shadow-soft hover:shadow-medium transition-all duration-300 mb-8 overflow-hidden"
                >
                  <div className="md:flex">
                    {/* Image */}
                    <div className="md:w-1/3 relative">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-64 md:h-full object-cover"
                      />
                      {item.popular && (
                        <div className="absolute top-4 left-4 bg-[#8C5A3C] text-white px-3 py-1 rounded-full text-sm font-medium">
                          Popular
                        </div>
                      )}
                      {item.customizable && (
                        <div className="absolute top-4 right-4 bg-[#8C5A3C] text-white px-3 py-1 rounded-full text-sm font-medium">
                          Customizable
                        </div>
                      )}
                    </div>

                    {/* Content */}
                    <div className="md:w-2/3 p-8 flex flex-col justify-between">
                      <div>
                        <div className="flex items-start justify-between mb-4">
                          <div>
                            <h3 className="text-2xl font-bold text-gray-900 mb-2">
                              {item.name}
                            </h3>
                            <div className="flex items-center gap-4 text-sm text-gray-600 mb-3">
                              <span className="flex items-center gap-1">
                                <Icon name="Star" size={16} className="text-yellow-500" />
                                Featured
                              </span>
                              <span>{item.sizes.join(', ')}</span>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="text-3xl font-bold text-[#8C5A3C]">
                              {formatPrice(item.price)}
                            </div>
                            <div className="text-sm text-gray-500">starting at</div>
                          </div>
                        </div>

                        <p className="text-gray-600 mb-6 leading-relaxed">
                          {item.description}
                        </p>

                        <div className="grid md:grid-cols-2 gap-6 mb-6">
                          <div>
                            <h4 className="font-semibold text-gray-900 mb-2">Available Sizes</h4>
                            <div className="flex flex-wrap gap-2">
                              {item.sizes.map((size) => (
                                <span key={size} className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm">
                                  {size}
                                </span>
                              ))}
                            </div>
                          </div>
                          <div>
                            <h4 className="font-semibold text-gray-900 mb-2">Flavor Options</h4>
                            <div className="flex flex-wrap gap-2">
                              {item.flavors.map((flavor) => (
                                <span key={flavor} className="bg-[#F2E2C4] text-[#2B231D] px-3 py-1 rounded-full text-sm">
                                  {flavor}
                                </span>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center justify-between gap-4">
                        <div className="text-sm text-gray-500">
                          Made fresh to order • Custom designs available
                        </div>
                        <div className="flex gap-2">
                          <Button
                            variant="outline"
                            size="lg"
                            iconName="Eye"
                            onClick={() => viewItemDetails(item)}
                            className="border-[#2F6D66] text-[#2F6D66] hover:bg-[#F1F6F3]"
                          >
                            View Details
                          </Button>
                          <Button
                            variant="outline"
                            size="lg"
                            iconName="Zap"
                            onClick={() => quickAddItem(item)}
                            className="border-[#8C5A3C] text-[#8C5A3C] hover:bg-[#F6EFE6]"
                          >
                            Quick Add
                          </Button>
                          <Button
                            variant="default"
                            size="lg"
                            iconName="ShoppingCart"
                            onClick={() => addToCart(item)}
                            className="bg-[#8C5A3C] hover:bg-[#74482F]"
                          >
                            Add to Cart
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Empty State */}
            {filteredItems.length === 0 && (
              <div className="text-center py-16">
                <Icon name="Search" size={64} className="text-gray-300 mx-auto mb-4" />
                <h3 className="text-2xl font-semibold text-gray-900 mb-2">No items found</h3>
                <p className="text-gray-600">Try selecting a different category</p>
              </div>
            )}
          </div>
        </section>

        {/* Call to Action */}
        <section className="bg-gradient-to-r from-[#8C5A3C] to-[#2F6D66] py-16">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Don't see what you're looking for?
            </h2>
            <p className="text-xl text-[#F6EFE6] mb-8 max-w-2xl mx-auto">
              Our expert bakers can create any custom design you can imagine. Let's discuss your vision!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                variant="outline"
                size="lg"
                className="border-white text-white hover:bg-white hover:text-[#8C5A3C]"
                asChild
              >
                <a href="/3d-custom-cake-designer">Design Your Own</a>
              </Button>
              <Button
                variant="default"
                size="lg"
                className="bg-white text-[#8C5A3C] hover:bg-gray-100"
                asChild
              >
                <a href="/contact">Contact Us</a>
              </Button>
            </div>
          </div>
        </section>

        {/* Details Modal */}
        <AnimatePresence>
          {showDetailsModal && selectedItemDetails && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
              onClick={closeDetailsModal}
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                onClick={(e) => e.stopPropagation()}
                className="bg-white rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-2xl"
              >
                {/* Close Button */}
                <button
                  onClick={closeDetailsModal}
                  className="sticky top-4 right-4 float-right z-10 p-2 bg-[#8C5A3C] text-white rounded-full hover:bg-[#74482F] transition"
                >
                  <FiX size={24} />
                </button>

                {/* Modal Content */}
                <div className="grid md:grid-cols-2 gap-8 p-8">
                  {/* Left: Image */}
                  <div className="flex items-center justify-center">
                    <div className="relative w-full">
                      <img
                        src={selectedItemDetails.image}
                        alt={selectedItemDetails.name}
                        className="w-full h-96 object-cover rounded-xl"
                      />
                      {selectedItemDetails.popular && (
                        <div className="absolute top-4 left-4 bg-[#8C5A3C] text-white px-4 py-2 rounded-full font-semibold">
                          ⭐ Popular
                        </div>
                      )}
                      {selectedItemDetails.customizable && (
                        <div className="absolute top-4 right-4 bg-[#8C5A3C] text-white px-4 py-2 rounded-full font-semibold">
                          ✨ Customizable
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Right: Details */}
                  <div className="flex flex-col justify-between">
                    {/* Product Info */}
                    <div>
                      <h1 className="text-4xl font-bold text-gray-900 mb-3">
                        {selectedItemDetails.name}
                      </h1>
                      
                      <div className="mb-6">
                        <p className="text-3xl font-bold text-[#8C5A3C]">
                          {formatPrice(selectedItemDetails.price)}
                        </p>
                        <p className="text-gray-600 text-sm mt-1">Starting price</p>
                      </div>

                      <p className="text-gray-700 text-lg leading-relaxed mb-8">
                        {selectedItemDetails.description}
                      </p>

                      {/* Available Sizes */}
                      <div className="mb-6">
                        <h3 className="text-lg font-bold text-gray-900 mb-4">Available Sizes</h3>
                        <div className="flex flex-wrap gap-3">
                          {selectedItemDetails.sizes.map((size) => (
                            <div
                              key={size}
                              className="px-4 py-2 border-2 border-gray-300 rounded-lg font-semibold text-gray-700 hover:border-[#8C5A3C] hover:text-[#8C5A3C] transition cursor-default"
                            >
                              {size}
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Available Flavors */}
                      <div className="mb-8">
                        <h3 className="text-lg font-bold text-gray-900 mb-4">Flavor Options</h3>
                        <div className="flex flex-wrap gap-3">
                          {selectedItemDetails.flavors.map((flavor) => (
                            <div
                              key={flavor}
                              className="px-4 py-2 border-2 border-[#F2E2C4] bg-[#FFF8F1] text-[#2B231D] rounded-lg font-semibold hover:bg-[#F2E2C4] transition cursor-default"
                            >
                              {flavor}
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Product Features */}
                      <div className="bg-gray-50 rounded-lg p-4 mb-8">
                        <h3 className="text-lg font-bold text-gray-900 mb-3">What's Included</h3>
                        <ul className="space-y-2 text-gray-700">
                          <li className="flex items-center gap-2">
                            <span className="text-green-600 font-bold">✓</span> Fresh baked to order
                          </li>
                          <li className="flex items-center gap-2">
                            <span className="text-green-600 font-bold">✓</span> Premium quality ingredients
                          </li>
                          <li className="flex items-center gap-2">
                            <span className="text-green-600 font-bold">✓</span> Free personalization
                          </li>
                          <li className="flex items-center gap-2">
                            <span className="text-green-600 font-bold">✓</span> 3-5 business day delivery
                          </li>
                        </ul>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="space-y-3 pt-6 border-t border-gray-200">
                      <button
                        onClick={() => {
                          addToCart(selectedItemDetails);
                          closeDetailsModal();
                          showNotification(`${selectedItemDetails.name} added to cart!`);
                        }}
                        className="w-full px-6 py-4 bg-[#8C5A3C] text-white rounded-lg hover:bg-[#74482F] font-bold text-lg transition flex items-center justify-center gap-2"
                      >
                        <Icon name="ShoppingCart" size={20} />
                        Add to Cart - {formatPrice(selectedItemDetails.price)}
                      </button>
                      
                      <button
                        onClick={() => {
                          quickAddItem(selectedItemDetails);
                          closeDetailsModal();
                        }}
                        className="w-full px-6 py-4 bg-[#8C5A3C] text-white rounded-lg hover:bg-[#74482F] font-bold text-lg transition flex items-center justify-center gap-2"
                      >
                        <Icon name="Zap" size={20} />
                        Quick Add
                      </button>

                      <button
                        onClick={() => {
                          window.location.href = '/3d-custom-cake-designer';
                        }}
                        className="w-full px-6 py-4 bg-[#A66A49] text-white rounded-lg hover:bg-[#8C5A3C] font-bold text-lg transition flex items-center justify-center gap-2"
                      >
                        <Icon name="Palette" size={20} />
                        Customize This Design
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
};

export default Menu;
