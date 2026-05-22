import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Header from '../../components/ui/Header';
import Button from '../../components/ui/Button';
import Icon from '../../components/AppIcon';
import Image from '../../components/AppImage';

const CakeDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [cake, setCake] = useState(null);
  const [selectedSize, setSelectedSize] = useState(null);
  const [selectedFlavor, setSelectedFlavor] = useState(null);
  const [selectedAddOns, setSelectedAddOns] = useState([]);
  const [quantity, setQuantity] = useState(1);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [loading, setLoading] = useState(true);
  const [deliveryDate, setDeliveryDate] = useState('');
  const [specialInstructions, setSpecialInstructions] = useState('');
  const [activeTab, setActiveTab] = useState('details');
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  // Mock cake data - same as in CakeCategoryBrowse
  const mockCakes = [
    {
      id: 1,
      name: "Classic Vanilla Birthday Cake",
      description: "A timeless vanilla sponge cake with buttercream frosting and colorful sprinkles. Perfect for celebrations and special moments.",
      longDescription: "Indulge in our classic vanilla birthday cake, crafted with premium butter and fresh eggs. Each layer is fluffy and moist, topped with smooth buttercream frosting and festive sprinkles. A crowd-pleaser for all ages!",
      images: [
        "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=600&h=600&fit=crop",
        "https://images.unsplash.com/photo-1565958011703-44f9829ba187?w=600&h=600&fit=crop",
        "https://images.unsplash.com/photo-1587080190519-41d330fafcde?w=600&h=600&fit=crop"
      ],
      startingPrice: 25.99,
      rating: 4.8,
      reviewCount: 124,
      isNew: false,
      isCustomizable: true,
      isPopular: true,
      isWishlisted: false,
      category: "birthday",
      sizes: [
        { id: 'small', name: '6" (Serves 8)', price: 25.99, servings: 8 },
        { id: 'medium', name: '8" (Serves 12)', price: 35.99, servings: 12 },
        { id: 'large', name: '10" (Serves 16)', price: 49.99, servings: 16 }
      ],
      flavors: [
        { id: 'vanilla', name: 'Vanilla' },
        { id: 'chocolate', name: 'Chocolate' },
        { id: 'strawberry', name: 'Strawberry' }
      ],
      addOns: [
        { id: 'candles', name: 'Birthday Candles (12pcs)', price: 2.99, icon: 'Flame' },
        { id: 'message', name: 'Personalized Message', price: 5.99, icon: 'MessageSquare' },
        { id: 'flowers', name: 'Fresh Flower Topping', price: 8.99, icon: 'Flower2' },
        { id: 'gift-box', name: 'Premium Gift Box', price: 3.99, icon: 'Gift' }
      ],
      features: ["Premium Butter", "Fresh Eggs", "Customizable Message", "Handmade Frosting", "No Preservatives"],
      tags: ['birthday', 'vanilla', 'customizable', 'popular'],
      reviews: [
        { id: 1, name: 'Sarah M.', rating: 5, text: 'Absolutely delicious! The frosting was perfect.', date: '2 weeks ago' },
        { id: 2, name: 'John D.', rating: 4, text: 'Great taste, arrived on time.', date: '1 month ago' },
        { id: 3, name: 'Emma L.', rating: 5, text: 'My son loved it! Will order again.', date: '1 month ago' }
      ],
      ingredients: ['Flour', 'Eggs', 'Butter', 'Sugar', 'Vanilla Extract', 'Baking Powder', 'Salt'],
      allergens: ['Eggs', 'Milk', 'Gluten'],
      shelfLife: '2 days at room temperature, 5 days refrigerated',
      faq: [
        { q: 'Can I customize the message?', a: 'Yes! We offer free personalized messages up to 50 characters.' },
        { q: 'Do you offer gluten-free options?', a: 'Yes, we have gluten-free vanilla cake available.' },
        { q: 'What is your delivery range?', a: 'We deliver within 10km radius. Check your area at checkout.' },
        { q: 'Can I request specific decorations?', a: 'Absolutely! Add your requests in special instructions.' }
      ]
    },
    {
      id: 2,
      name: "Decadent Chocolate Fudge Cake",
      description: "Rich chocolate cake layers with fudge frosting and chocolate ganache drip",
      longDescription: "Experience the ultimate chocolate indulgence with our decadent fudge cake. Layers of moist chocolate sponge are filled with rich fudge frosting and topped with a luxurious chocolate ganache drip. Perfect for chocolate lovers who crave the most intense chocolate experience.",
      images: [
        "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=600&h=600&fit=crop",
        "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=600&h=600&fit=crop",
        "https://images.unsplash.com/photo-1587080190519-41d330fafcde?w=600&h=600&fit=crop"
      ],
      startingPrice: 32.99,
      rating: 4.9,
      reviewCount: 89,
      isNew: true,
      isCustomizable: true,
      isPopular: false,
      isWishlisted: false,
      category: "birthday",
      sizes: [
        { id: 'small', name: '6" (Serves 8)', price: 32.99, servings: 8 },
        { id: 'medium', name: '8" (Serves 12)', price: 42.99, servings: 12 },
        { id: 'large', name: '10" (Serves 16)', price: 56.99, servings: 16 }
      ],
      flavors: [
        { id: 'dark', name: 'Dark Chocolate' },
        { id: 'milk', name: 'Milk Chocolate' },
        { id: 'white', name: 'White Chocolate' }
      ],
      addOns: [
        { id: 'gold-leaf', name: 'Gold Leaf Decoration', price: 7.99, icon: 'Sparkles' },
        { id: 'berries', name: 'Fresh Berries', price: 6.99, icon: 'Cherry' },
        { id: 'candles', name: 'Birthday Candles (12pcs)', price: 2.99, icon: 'Flame' },
        { id: 'message', name: 'Personalized Message', price: 5.99, icon: 'MessageSquare' }
      ],
      features: ["100% Cocoa", "Ganache Drip", "Premium Chocolate", "Vegan Option Available", "Handcrafted Layers"],
      tags: ['birthday', 'chocolate', 'premium', 'new'],
      reviews: [
        { id: 1, name: 'Michael R.', rating: 5, text: 'The most chocolatey cake I\'ve ever had! Absolutely divine.', date: '1 week ago' },
        { id: 2, name: 'Lisa K.', rating: 5, text: 'Perfect for my chocolate-loving husband. He was amazed!', date: '2 weeks ago' },
        { id: 3, name: 'David P.', rating: 4, text: 'Rich and decadent. A bit too sweet for my taste but excellent quality.', date: '3 weeks ago' }
      ],
      ingredients: ['Cocoa Powder', 'Flour', 'Eggs', 'Butter', 'Sugar', 'Vanilla Extract', 'Baking Powder', 'Salt', 'Heavy Cream'],
      allergens: ['Eggs', 'Milk', 'Gluten'],
      shelfLife: '2 days at room temperature, 5 days refrigerated',
      faq: [
        { q: 'Is this cake suitable for vegans?', a: 'We offer a vegan version of this cake. Please specify in special instructions.' },
        { q: 'How intense is the chocolate flavor?', a: 'This cake has a very rich, intense chocolate flavor perfect for chocolate enthusiasts.' },
        { q: 'Can I customize the ganache drip color?', a: 'Yes, we can customize the ganache drip color to match your theme.' },
        { q: 'What makes this cake different from regular chocolate cake?', a: 'Our fudge cake uses premium cocoa and includes a rich fudge layer between each sponge layer, topped with ganache.' }
      ]
    },
    {
      id: 3,
      name: "Elegant Wedding Tier Cake",
      description: "Three-tier wedding cake with white fondant and sugar flower decorations",
      longDescription: "A stunning multi-tier wedding cake that will be the centerpiece of your special day. Each tier is carefully crafted with smooth white fondant and adorned with delicate sugar flowers. This elegant masterpiece is designed to impress and create lasting memories.",
      images: [
        "https://images.unsplash.com/photo-1621303837174-89787a7d4729?w=600&h=600&fit=crop",
        "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=600&h=600&fit=crop",
        "https://images.unsplash.com/photo-1565958011703-44f9829ba187?w=600&h=600&fit=crop",
        "https://images.unsplash.com/photo-1587080190519-41d330fafcde?w=600&h=600&fit=crop"
      ],
      startingPrice: 125.99,
      rating: 4.7,
      reviewCount: 45,
      isNew: false,
      isCustomizable: true,
      isPopular: true,
      isWishlisted: false,
      category: "wedding",
      sizes: [
        { id: 'medium', name: '2-Tier (Serves 30)', price: 125.99, servings: 30 },
        { id: 'large', name: '3-Tier (Serves 50)', price: 189.99, servings: 50 },
        { id: 'xl', name: '4-Tier (Serves 80)', price: 249.99, servings: 80 }
      ],
      flavors: [
        { id: 'vanilla', name: 'Vanilla' },
        { id: 'lemon', name: 'Lemon' },
        { id: 'red-velvet', name: 'Red Velvet' }
      ],
      addOns: [
        { id: 'fresh-flowers', name: 'Fresh Flower Arrangement', price: 45.99, icon: 'Flower2' },
        { id: 'cake-topper', name: 'Custom Cake Topper', price: 25.99, icon: 'Crown' },
        { id: 'delivery-setup', name: 'Professional Setup & Delivery', price: 35.99, icon: 'Truck' },
        { id: 'tasting-box', name: 'Pre-Order Tasting Box', price: 19.99, icon: 'Package' }
      ],
      features: ["Fondant Icing", "Sugar Flowers", "Multi-Tier Design", "Customizable Colors", "Professional Setup"],
      tags: ['wedding', 'elegant', 'fondant'],
      reviews: [
        { id: 1, name: 'Sarah & John', rating: 5, text: 'Absolutely beautiful! Our guests were amazed. The taste was incredible too.', date: '1 month ago' },
        { id: 2, name: 'Emily W.', rating: 4, text: 'Stunning design and delicious. The sugar flowers were so realistic!', date: '2 months ago' },
        { id: 3, name: 'Robert T.', rating: 5, text: 'Perfect centerpiece for our wedding. Highly recommend!', date: '2 months ago' }
      ],
      ingredients: ['Flour', 'Eggs', 'Butter', 'Sugar', 'Vanilla Extract', 'Fondant', 'Food Coloring', 'Sugar Paste'],
      allergens: ['Eggs', 'Milk', 'Gluten'],
      shelfLife: '3 days refrigerated, best served fresh',
      faq: [
        { q: 'How far in advance should I order?', a: 'We recommend ordering at least 2-3 weeks in advance for wedding cakes to ensure availability.' },
        { q: 'Can I customize the colors and design?', a: 'Yes! We offer full customization. Schedule a consultation to discuss your vision.' },
        { q: 'Do you provide setup services?', a: 'Yes, we offer professional setup and delivery services for an additional fee.' },
        { q: 'Can different tiers have different flavors?', a: 'Absolutely! Each tier can have a different flavor to suit all your guests\' preferences.' }
      ]
    },
    {
      id: 4,
      name: "Fresh Strawberry Shortcake",
      description: "Light sponge cake with fresh strawberries and whipped cream layers",
      longDescription: "A delightful summer favorite featuring layers of light, airy sponge cake generously filled with fresh, juicy strawberries and smooth whipped cream. This classic dessert is perfect for any occasion and brings a taste of sunshine to your celebration.",
      images: [
        "https://images.unsplash.com/photo-1565958011703-44f9829ba187?w=600&h=600&fit=crop",
        "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=600&h=600&fit=crop",
        "https://images.unsplash.com/photo-1587080190519-41d330fafcde?w=600&h=600&fit=crop"
      ],
      startingPrice: 28.99,
      rating: 4.6,
      reviewCount: 67,
      isNew: false,
      isCustomizable: false,
      isPopular: false,
      isWishlisted: false,
      category: "seasonal",
      sizes: [
        { id: 'small', name: '6" (Serves 8)', price: 28.99, servings: 8 },
        { id: 'medium', name: '8" (Serves 12)', price: 38.99, servings: 12 }
      ],
      flavors: [
        { id: 'strawberry', name: 'Strawberry' },
        { id: 'vanilla', name: 'Vanilla' }
      ],
      addOns: [
        { id: 'extra-berries', name: 'Extra Fresh Strawberries', price: 4.99, icon: 'Cherry' },
        { id: 'chocolate-drizzle', name: 'Chocolate Drizzle', price: 3.99, icon: 'Droplet' },
        { id: 'whipped-cream', name: 'Extra Whipped Cream', price: 2.99, icon: 'Cloud' }
      ],
      features: ["Fresh Strawberries", "Light Sponge", "Whipped Cream", "Seasonal Favorite", "No Artificial Flavors"],
      tags: ['strawberry', 'fresh', 'seasonal'],
      reviews: [
        { id: 1, name: 'Jennifer L.', rating: 5, text: 'So fresh and light! The strawberries were perfectly sweet.', date: '1 week ago' },
        { id: 2, name: 'Mark D.', rating: 4, text: 'Delicious summer cake. Great for picnics!', date: '2 weeks ago' },
        { id: 3, name: 'Amanda S.', rating: 5, text: 'My favorite! Always order this for summer parties.', date: '3 weeks ago' }
      ],
      ingredients: ['Flour', 'Eggs', 'Sugar', 'Butter', 'Fresh Strawberries', 'Heavy Cream', 'Vanilla Extract', 'Baking Powder'],
      allergens: ['Eggs', 'Milk', 'Gluten'],
      shelfLife: '1 day at room temperature, 2 days refrigerated',
      faq: [
        { q: 'Are the strawberries fresh?', a: 'Yes, we use only the freshest, locally sourced strawberries when in season.' },
        { q: 'Can this cake be made gluten-free?', a: 'Unfortunately, this cake is not available in gluten-free option due to the traditional sponge recipe.' },
        { q: 'How long does it stay fresh?', a: 'Best consumed within 24 hours due to fresh fruit. Refrigerate if not serving immediately.' },
        { q: 'Is this available year-round?', a: 'This cake is best during strawberry season (spring/summer) but can be ordered year-round.' }
      ]
    },
    {
      id: 5,
      name: "Red Velvet Anniversary Cake",
      description: "Classic red velvet cake with cream cheese frosting and elegant decorations",
      longDescription: "Celebrate your special moments with our classic red velvet cake. This timeless favorite features moist, velvety layers with a hint of cocoa, perfectly paired with our signature cream cheese frosting. Elegantly decorated to make your anniversary celebration unforgettable.",
      images: [
        "https://images.unsplash.com/photo-1586985289688-ca3cf47d3e6e?w=600&h=600&fit=crop",
        "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=600&h=600&fit=crop",
        "https://images.unsplash.com/photo-1565958011703-44f9829ba187?w=600&h=600&fit=crop",
        "https://images.unsplash.com/photo-1587080190519-41d330fafcde?w=600&h=600&fit=crop"
      ],
      startingPrice: 34.99,
      rating: 4.8,
      reviewCount: 92,
      isNew: false,
      isCustomizable: true,
      isPopular: true,
      isWishlisted: true,
      category: "anniversary",
      sizes: [
        { id: 'small', name: '6" (Serves 8)', price: 34.99, servings: 8 },
        { id: 'medium', name: '8" (Serves 12)', price: 44.99, servings: 12 },
        { id: 'large', name: '10" (Serves 16)', price: 58.99, servings: 16 }
      ],
      flavors: [
        { id: 'red-velvet', name: 'Red Velvet' }
      ],
      addOns: [
        { id: 'heart-topper', name: 'Heart-Shaped Topper', price: 8.99, icon: 'Heart' },
        { id: 'message', name: 'Anniversary Message', price: 5.99, icon: 'MessageSquare' },
        { id: 'roses', name: 'Sugar Rose Decorations', price: 12.99, icon: 'Flower2' },
        { id: 'gift-box', name: 'Premium Gift Box', price: 3.99, icon: 'Gift' }
      ],
      features: ["Cream Cheese Frosting", "Classic Recipe", "Elegant Design", "Perfect for Anniversaries", "Moist & Velvety"],
      tags: ['anniversary', 'red-velvet', 'cream-cheese'],
      reviews: [
        { id: 1, name: 'Patricia M.', rating: 5, text: 'Perfect for our 10th anniversary! The cream cheese frosting was divine.', date: '1 week ago' },
        { id: 2, name: 'James H.', rating: 5, text: 'My wife loved it! The cake was moist and beautifully decorated.', date: '2 weeks ago' },
        { id: 3, name: 'Susan K.', rating: 4, text: 'Classic red velvet done right. Very satisfied!', date: '1 month ago' }
      ],
      ingredients: ['Flour', 'Cocoa Powder', 'Buttermilk', 'Eggs', 'Butter', 'Sugar', 'Vanilla Extract', 'Red Food Coloring', 'Cream Cheese'],
      allergens: ['Eggs', 'Milk', 'Gluten'],
      shelfLife: '3 days at room temperature, 5 days refrigerated',
      faq: [
        { q: 'Can I add a personalized anniversary message?', a: 'Yes! We offer free personalized messages up to 50 characters.' },
        { q: 'What makes your red velvet special?', a: 'We use a traditional recipe with buttermilk and just the right amount of cocoa for that perfect red velvet flavor.' },
        { q: 'Is the cream cheese frosting very sweet?', a: 'Our cream cheese frosting is balanced - creamy and slightly tangy, not overly sweet.' },
        { q: 'Can I order this for other occasions?', a: 'Absolutely! While perfect for anniversaries, this cake is great for any celebration.' }
      ]
    },
    {
      id: 6,
      name: "Graduation Cap Cake",
      description: "Fun graduation-themed cake shaped like a cap with personalized message",
      longDescription: "Celebrate this milestone achievement with our fun and festive graduation cap cake! This unique design features a cake shaped like a graduation cap, complete with a tassel and personalized message. Perfect for celebrating your graduate's hard work and success.",
      images: [
        "https://images.unsplash.com/photo-1557925923-cd4648e211a0?w=600&h=600&fit=crop",
        "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=600&h=600&fit=crop",
        "https://images.unsplash.com/photo-1565958011703-44f9829ba187?w=600&h=600&fit=crop"
      ],
      startingPrice: 39.99,
      rating: 4.5,
      reviewCount: 34,
      isNew: true,
      isCustomizable: true,
      isPopular: false,
      isWishlisted: false,
      category: "graduation",
      sizes: [
        { id: 'medium', name: '8" (Serves 12)', price: 39.99, servings: 12 },
        { id: 'large', name: '10" (Serves 16)', price: 52.99, servings: 16 }
      ],
      flavors: [
        { id: 'vanilla', name: 'Vanilla' },
        { id: 'chocolate', name: 'Chocolate' },
        { id: 'lemon', name: 'Lemon' }
      ],
      addOns: [
        { id: 'diploma-scroll', name: 'Edible Diploma Scroll', price: 6.99, icon: 'FileText' },
        { id: 'school-colors', name: 'School Colors Decoration', price: 4.99, icon: 'Palette' },
        { id: 'message', name: 'Graduation Message', price: 5.99, icon: 'MessageSquare' },
        { id: 'photo-print', name: 'Edible Photo Print', price: 9.99, icon: 'Image' }
      ],
      features: ["Graduation Cap Design", "Customizable Message", "School Colors Available", "Themed Decoration", "Celebration Ready"],
      tags: ['graduation', 'themed', 'customizable'],
      reviews: [
        { id: 1, name: 'Maria G.', rating: 5, text: 'My daughter was thrilled! The design was perfect and it tasted amazing.', date: '2 weeks ago' },
        { id: 2, name: 'Tom B.', rating: 4, text: 'Great for graduation party. Everyone loved the unique design!', date: '1 month ago' },
        { id: 3, name: 'Rachel F.', rating: 5, text: 'Perfect way to celebrate! The cake was delicious and looked exactly as pictured.', date: '1 month ago' }
      ],
      ingredients: ['Flour', 'Eggs', 'Butter', 'Sugar', 'Vanilla Extract', 'Fondant', 'Food Coloring', 'Baking Powder'],
      allergens: ['Eggs', 'Milk', 'Gluten'],
      shelfLife: '2 days at room temperature, 4 days refrigerated',
      faq: [
        { q: 'Can I customize the cap color to match school colors?', a: 'Yes! We can customize the cap color to match any school colors. Just specify in special instructions.' },
        { q: 'How far in advance should I order?', a: 'We recommend ordering at least 1 week in advance, especially during graduation season.' },
        { q: 'Can I add the graduate\'s name?', a: 'Absolutely! We can add the graduate\'s name and a personalized message.' },
        { q: 'Is this available in different sizes?', a: 'Yes, we offer 8" and 10" sizes. Custom sizes available upon request.' }
      ]
    },
    {
      id: 7,
      name: "Gluten-Free Carrot Cake",
      description: "Moist gluten-free carrot cake with cream cheese frosting and walnut pieces",
      longDescription: "Enjoy our delicious gluten-free carrot cake made with premium ingredients. This moist, flavorful cake is packed with fresh carrots, warm spices, and crunchy walnuts, all topped with our smooth cream cheese frosting. Perfect for those with dietary restrictions who don\'t want to compromise on taste.",
      images: [
        "https://images.unsplash.com/photo-1621303837174-89787a7d4729?w=600&h=600&fit=crop",
        "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=600&h=600&fit=crop",
        "https://images.unsplash.com/photo-1565958011703-44f9829ba187?w=600&h=600&fit=crop"
      ],
      startingPrice: 36.99,
      rating: 4.4,
      reviewCount: 28,
      isNew: false,
      isCustomizable: false,
      isPopular: false,
      isWishlisted: false,
      category: "dietary",
      sizes: [
        { id: 'small', name: '6" (Serves 8)', price: 36.99, servings: 8 },
        { id: 'medium', name: '8" (Serves 12)', price: 46.99, servings: 12 }
      ],
      flavors: [
        { id: 'carrot', name: 'Carrot' }
      ],
      addOns: [
        { id: 'extra-walnuts', name: 'Extra Walnuts', price: 3.99, icon: 'Nut' },
        { id: 'raisins', name: 'Add Raisins', price: 2.99, icon: 'Cherry' },
        { id: 'coconut', name: 'Coconut Flakes', price: 3.99, icon: 'Leaf' }
      ],
      features: ["100% Gluten-Free", "Fresh Carrots", "Cream Cheese Frosting", "Walnut Pieces", "No Compromise on Taste"],
      tags: ['gluten-free', 'carrot', 'dietary'],
      reviews: [
        { id: 1, name: 'Jessica M.', rating: 5, text: 'Finally, a gluten-free cake that tastes amazing! You can\'t tell it\'s gluten-free.', date: '1 week ago' },
        { id: 2, name: 'Brian L.', rating: 4, text: 'Great option for gluten-free diets. Moist and flavorful.', date: '2 weeks ago' },
        { id: 3, name: 'Karen D.', rating: 4, text: 'Perfect for my celiac daughter. She loved it!', date: '3 weeks ago' }
      ],
      ingredients: ['Gluten-Free Flour', 'Fresh Carrots', 'Eggs', 'Sugar', 'Vegetable Oil', 'Walnuts', 'Cinnamon', 'Nutmeg', 'Cream Cheese', 'Vanilla Extract'],
      allergens: ['Eggs', 'Milk', 'Tree Nuts (Walnuts)'],
      shelfLife: '3 days at room temperature, 5 days refrigerated',
      faq: [
        { q: 'Is this cake certified gluten-free?', a: 'Yes, we use certified gluten-free ingredients and prepare in a dedicated gluten-free area.' },
        { q: 'Can I make this nut-free as well?', a: 'Yes, we can make it without walnuts. Please specify in special instructions.' },
        { q: 'Does it taste different from regular carrot cake?', a: 'No! Our gluten-free version tastes just as delicious as traditional carrot cake.' },
        { q: 'Is the cream cheese frosting also gluten-free?', a: 'Yes, all components including the frosting are gluten-free.' }
      ]
    },
    {
      id: 8,
      name: "Baby Shower Pink Ombre",
      description: "Beautiful pink ombre cake perfect for baby shower celebrations",
      longDescription: "Celebrate the upcoming arrival with our stunning pink ombre cake. This beautiful gradient design transitions from soft pink to deeper rose, creating an elegant and feminine look perfect for baby showers. Each layer is carefully crafted to create a smooth ombre effect that will impress your guests.",
      images: [
        "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=600&h=600&fit=crop",
        "https://images.unsplash.com/photo-1565958011703-44f9829ba187?w=600&h=600&fit=crop",
        "https://images.unsplash.com/photo-1587080190519-41d330fafcde?w=600&h=600&fit=crop",
        "https://images.unsplash.com/photo-1621303837174-89787a7d4729?w=600&h=600&fit=crop"
      ],
      startingPrice: 42.99,
      rating: 4.7,
      reviewCount: 56,
      isNew: false,
      isCustomizable: true,
      isPopular: true,
      isWishlisted: false,
      category: "baby-shower",
      sizes: [
        { id: 'medium', name: '8" (Serves 12)', price: 42.99, servings: 12 },
        { id: 'large', name: '10" (Serves 16)', price: 56.99, servings: 16 }
      ],
      flavors: [
        { id: 'vanilla', name: 'Vanilla' },
        { id: 'strawberry', name: 'Strawberry' }
      ],
      addOns: [
        { id: 'baby-topper', name: 'Baby-Themed Topper', price: 7.99, icon: 'Baby' },
        { id: 'flowers', name: 'Sugar Flower Decorations', price: 9.99, icon: 'Flower2' },
        { id: 'message', name: 'Baby Shower Message', price: 5.99, icon: 'MessageSquare' },
        { id: 'ribbon', name: 'Decorative Ribbon', price: 4.99, icon: 'Ribbon' }
      ],
      features: ["Ombre Design", "Pink Gradient", "Elegant Presentation", "Baby Shower Perfect", "Customizable Colors"],
      tags: ['baby-shower', 'pink', 'ombre'],
      reviews: [
        { id: 1, name: 'Nicole R.', rating: 5, text: 'Absolutely gorgeous! The ombre effect was perfect and it tasted amazing.', date: '1 week ago' },
        { id: 2, name: 'Michelle T.', rating: 5, text: 'The centerpiece of our baby shower! Everyone was asking where we got it.', date: '2 weeks ago' },
        { id: 3, name: 'Stephanie H.', rating: 4, text: 'Beautiful design and delicious. Highly recommend for baby showers!', date: '1 month ago' }
      ],
      ingredients: ['Flour', 'Eggs', 'Butter', 'Sugar', 'Vanilla Extract', 'Strawberry Extract', 'Food Coloring', 'Baking Powder', 'Buttercream'],
      allergens: ['Eggs', 'Milk', 'Gluten'],
      shelfLife: '2 days at room temperature, 4 days refrigerated',
      faq: [
        { q: 'Can I change the color to blue for a boy?', a: 'Yes! We can create the ombre effect in any color - blue, yellow, or any color you prefer.' },
        { q: 'How is the ombre effect achieved?', a: 'We carefully layer different shades of colored buttercream to create a smooth gradient effect.' },
        { q: 'Can I add baby-themed decorations?', a: 'Absolutely! We offer various baby-themed toppers and decorations.' },
        { q: 'Is this suitable for gender reveal parties?', a: 'Yes! We can create a neutral ombre that reveals the gender when cut, or customize as needed.' }
      ]
    }
  ];

  useEffect(() => {
    setLoading(true);
    const cakeId = parseInt(id);
    const foundCake = mockCakes.find(c => c.id === cakeId);
    
    if (foundCake) {
      setCake(foundCake);
      setSelectedSize(foundCake.sizes[0].id);
      setSelectedFlavor(foundCake.flavors[0].id);
      setIsWishlisted(foundCake.isWishlisted);
    }
    
    setLoading(false);
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="pt-16 px-4 py-12">
          <div className="text-center">
            <div className="inline-block">
              <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
            </div>
            <p className="mt-4 text-muted-foreground">Loading cake details...</p>
          </div>
        </div>
      </div>
    );
  }

  if (!cake) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="pt-16 px-4 py-12">
          <div className="text-center max-w-md mx-auto">
            <Icon name="AlertCircle" size={48} className="mx-auto text-warning mb-4" />
            <h2 className="text-2xl font-heading font-semibold mb-2">Cake Not Found</h2>
            <p className="text-muted-foreground mb-6">Sorry, we couldn't find the cake you're looking for.</p>
            <Button onClick={() => navigate('/cake-category-browse')}>
              Back to Browse
            </Button>
          </div>
        </div>
      </div>
    );
  }

  const selectedSizeData = cake.sizes.find(s => s.id === selectedSize);
  const addOnsPrice = selectedAddOns.reduce((sum, addOnId) => {
    const addOn = cake.addOns.find(a => a.id === addOnId);
    return sum + (addOn?.price || 0);
  }, 0);
  const currentPrice = selectedSizeData?.price || cake.startingPrice;
  const totalPrice = (currentPrice + addOnsPrice) * quantity;

  const toggleAddOn = (addOnId) => {
    setSelectedAddOns(prev =>
      prev.includes(addOnId)
        ? prev.filter(id => id !== addOnId)
        : [...prev, addOnId]
    );
  };

  const handleAddToCart = () => {
    const cartItem = {
      ...cake,
      selectedSize: selectedSizeData,
      selectedFlavor: cake.flavors.find(f => f.id === selectedFlavor),
      selectedAddOns: cake.addOns.filter(a => selectedAddOns.includes(a.id)),
      quantity,
      deliveryDate,
      specialInstructions,
      price: currentPrice,
      totalPrice
    };
    console.log('Added to cart:', cartItem);
    alert(`${quantity} x ${cake.name} added to cart!\nTotal: ₹${totalPrice.toFixed(2)}`);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="pt-16">
        {/* Breadcrumb */}
        <div className="border-b border-border bg-card/30 backdrop-blur-sm sticky top-16 z-40">
          <div className="max-w-7xl mx-auto px-4 py-3">
            <nav className="flex items-center space-x-2 text-sm text-muted-foreground">
              <button onClick={() => navigate('/')} className="hover:text-primary transition-smooth">
                Home
              </button>
              <Icon name="ChevronRight" size={16} />
              <button onClick={() => navigate('/cake-category-browse')} className="hover:text-primary transition-smooth">
                Browse
              </button>
              <Icon name="ChevronRight" size={16} />
              <span className="text-foreground">{cake.name}</span>
            </nav>
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* Left Column - Images */}
            <div className="lg:col-span-2 space-y-4">
              {/* Main Image */}
              <div className="relative aspect-square rounded-xl overflow-hidden border-2 border-border shadow-lg bg-muted">
                <img
                  src={cake.images?.[selectedImageIndex] || cake.images?.[0]}
                  alt={cake.name}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                />
                {/* Badges */}
                <div className="absolute top-4 left-4 flex flex-col space-y-2">
                  {cake.isNew && (
                    <span className="bg-gradient-to-r from-primary to-primary/80 text-primary-foreground text-xs font-bold px-3 py-1 rounded-full shadow-md">
                      🆕 New
                    </span>
                  )}
                  {cake.isPopular && (
                    <span className="bg-gradient-to-r from-warning to-warning/80 text-warning-foreground text-xs font-bold px-3 py-1 rounded-full shadow-md">
                      ⭐ Popular
                    </span>
                  )}
                  {cake.isCustomizable && (
                    <span className="bg-gradient-to-r from-accent to-accent/80 text-accent-foreground text-xs font-bold px-3 py-1 rounded-full shadow-md">
                      🎨 Customizable
                    </span>
                  )}
                </div>

                {/* Wishlist Button */}
                <button
                  onClick={() => setIsWishlisted(!isWishlisted)}
                  className="absolute top-4 right-4 w-12 h-12 rounded-full bg-white/95 hover:bg-white shadow-lg flex items-center justify-center transition-all duration-200 scale-hover"
                >
                  <Icon
                    name="Heart"
                    size={24}
                    className={isWishlisted ? 'fill-red-500 text-red-500' : 'text-muted-foreground'}
                  />
                </button>
              </div>

              {/* Thumbnail Images */}
              {cake.images && cake.images.length > 1 && (
                <div className="flex gap-3">
                  {cake.images.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setSelectedImageIndex(idx)}
                      className={`relative w-20 h-20 rounded-lg overflow-hidden border-2 transition-all ${
                        selectedImageIndex === idx
                          ? 'border-primary ring-2 ring-primary/30'
                          : 'border-border hover:border-primary/50'
                      }`}
                    >
                      <img src={img} alt={`View ${idx + 1}`} className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}

              {/* Tabs */}
              <div className="border-b border-border">
                <div className="flex space-x-1">
                  {['details', 'reviews', 'faq'].map((tab) => (
                    <button
                      key={tab}
                      onClick={() => setActiveTab(tab)}
                      className={`px-6 py-3 font-medium transition-smooth border-b-2 ${
                        activeTab === tab
                          ? 'border-primary text-primary'
                          : 'border-transparent text-muted-foreground hover:text-foreground'
                      }`}
                    >
                      {tab === 'details' && 'Details'}
                      {tab === 'reviews' && `Reviews (${cake.reviews?.length || 0})`}
                      {tab === 'faq' && 'FAQ'}
                    </button>
                  ))}
                </div>
              </div>

              {/* Tab Content */}
              <div className="bg-card border border-border rounded-lg p-6">
                {activeTab === 'details' && (
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-heading font-semibold text-foreground mb-3">About this Cake</h3>
                      <p className="text-muted-foreground leading-relaxed">{cake.longDescription}</p>
                    </div>

                    {cake.features && (
                      <div>
                        <h3 className="text-lg font-heading font-semibold text-foreground mb-3">Why Choose This?</h3>
                        <div className="grid grid-cols-2 gap-3">
                          {cake.features.map((feature, idx) => (
                            <div key={idx} className="flex items-center space-x-3 p-3 bg-muted/50 rounded-lg">
                              <Icon name="Check" size={20} className="text-primary flex-shrink-0" />
                              <span className="text-sm text-foreground">{feature}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {cake.ingredients && (
                      <div>
                        <h3 className="text-lg font-heading font-semibold text-foreground mb-3">Ingredients</h3>
                        <p className="text-sm text-muted-foreground mb-3">{cake.ingredients.join(', ')}</p>
                      </div>
                    )}

                    {cake.allergens && (
                      <div className="p-4 bg-warning/10 border border-warning/30 rounded-lg">
                        <div className="flex items-start space-x-3">
                          <Icon name="AlertCircle" size={20} className="text-warning flex-shrink-0 mt-0.5" />
                          <div>
                            <h4 className="font-semibold text-foreground mb-1">Allergen Information</h4>
                            <p className="text-sm text-muted-foreground">Contains: {cake.allergens.join(', ')}</p>
                          </div>
                        </div>
                      </div>
                    )}

                    {cake.shelfLife && (
                      <div className="p-4 bg-blue-500/10 border border-blue-500/30 rounded-lg">
                        <div className="flex items-start space-x-3">
                          <Icon name="Clock" size={20} className="text-blue-500 flex-shrink-0 mt-0.5" />
                          <div>
                            <h4 className="font-semibold text-foreground mb-1">Storage & Shelf Life</h4>
                            <p className="text-sm text-muted-foreground">{cake.shelfLife}</p>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {activeTab === 'reviews' && (
                  <div className="space-y-6">
                    {cake.reviews && cake.reviews.length > 0 ? (
                      cake.reviews.map((review) => (
                        <div key={review.id} className="border-b border-border last:border-b-0 pb-4 last:pb-0">
                          <div className="flex items-start justify-between mb-2">
                            <div>
                              <h4 className="font-semibold text-foreground">{review.name}</h4>
                              <p className="text-xs text-muted-foreground">{review.date}</p>
                            </div>
                            <div className="flex">
                              {[...Array(5)].map((_, i) => (
                                <Icon
                                  key={i}
                                  name="Star"
                                  size={14}
                                  className={i < review.rating ? 'text-warning fill-current' : 'text-muted-foreground/30'}
                                />
                              ))}
                            </div>
                          </div>
                          <p className="text-sm text-muted-foreground">{review.text}</p>
                        </div>
                      ))
                    ) : (
                      <p className="text-center text-muted-foreground py-6">No reviews yet. Be the first to review!</p>
                    )}
                  </div>
                )}

                {activeTab === 'faq' && (
                  <div className="space-y-3">
                    {cake.faq && cake.faq.length > 0 ? (
                      cake.faq.map((item, idx) => (
                        <details key={idx} className="group">
                          <summary className="flex items-center justify-between cursor-pointer p-3 bg-muted/50 rounded-lg font-medium text-foreground hover:bg-muted transition-smooth">
                            <span>{item.q}</span>
                            <Icon name="ChevronDown" size={18} className="group-open:rotate-180 transition-transform" />
                          </summary>
                          <p className="mt-2 p-3 text-sm text-muted-foreground">{item.a}</p>
                        </details>
                      ))
                    ) : (
                      <p className="text-center text-muted-foreground py-6">No FAQs available</p>
                    )}
                  </div>
                )}
              </div>
            </div>

            {/* Right Column - Order Form */}
            <div className="lg:col-span-1">
              <div className="sticky top-20 space-y-6">
                {/* Title & Rating */}
                <div className="bg-card border border-border rounded-lg p-6 space-y-4">
                  <h1 className="text-2xl font-heading font-bold text-foreground">
                    {cake.name}
                  </h1>
                  
                  {/* Rating */}
                  <div className="flex items-center space-x-3">
                    <div className="flex items-center space-x-1">
                      {[...Array(5)].map((_, i) => (
                        <Icon
                          key={i}
                          name="Star"
                          size={16}
                          className={i < Math.floor(cake.rating) ? 'text-warning fill-current' : 'text-muted-foreground/30'}
                        />
                      ))}
                    </div>
                    <span className="text-sm text-muted-foreground">
                      {cake.rating} • {cake.reviewCount} reviews
                    </span>
                  </div>

                  {/* Price */}
                  <div className="pt-4 border-t border-border">
                    <p className="text-sm text-muted-foreground mb-1">Starting from</p>
                    <p className="text-3xl font-bold text-primary">₹{cake.startingPrice}</p>
                  </div>
                </div>

                {/* Order Form */}
                <div className="bg-card border border-border rounded-lg p-6 space-y-4">
                  {/* Size Selection */}
                  <div className="space-y-3">
                    <label className="block text-sm font-semibold text-foreground">
                      <div className="flex items-center space-x-2">
                        <Icon name="Layers" size={16} className="text-primary" />
                        <span>Select Size</span>
                      </div>
                    </label>
                    <div className="space-y-2">
                      {cake.sizes.map((size) => (
                        <button
                          key={size.id}
                          onClick={() => setSelectedSize(size.id)}
                          className={`w-full p-3 rounded-lg border-2 text-left transition-all ${
                            selectedSize === size.id
                              ? 'border-primary bg-accent/20'
                              : 'border-border hover:border-primary/50'
                          }`}
                        >
                          <div className="flex items-center justify-between">
                            <div>
                              <p className="font-medium text-foreground">{size.name}</p>
                              <p className="text-xs text-muted-foreground">Serves {size.servings} people</p>
                            </div>
                            <p className="text-lg font-bold text-primary">₹{size.price}</p>
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Flavor Selection */}
                  <div className="space-y-3">
                    <label className="block text-sm font-semibold text-foreground">
                      <div className="flex items-center space-x-2">
                        <Icon name="Cookie" size={16} className="text-primary" />
                        <span>Choose Flavor</span>
                      </div>
                    </label>
                    <div className="grid grid-cols-2 gap-2">
                      {cake.flavors.map((flavor) => (
                        <button
                          key={flavor.id}
                          onClick={() => setSelectedFlavor(flavor.id)}
                          className={`p-3 rounded-lg border-2 text-center transition-all text-sm ${
                            selectedFlavor === flavor.id
                              ? 'border-primary bg-accent/20 font-semibold'
                              : 'border-border hover:border-primary/50'
                          }`}
                        >
                          {flavor.name}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Quantity */}
                  <div className="space-y-3">
                    <label className="block text-sm font-semibold text-foreground">
                      <div className="flex items-center space-x-2">
                        <Icon name="Package" size={16} className="text-primary" />
                        <span>Quantity</span>
                      </div>
                    </label>
                    <div className="flex items-center border border-border rounded-lg">
                      <button
                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                        className="px-4 py-2 hover:bg-muted transition-smooth"
                      >
                        <Icon name="Minus" size={18} className="text-primary" />
                      </button>
                      <input
                        type="number"
                        value={quantity}
                        onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                        className="flex-1 text-center py-2 text-lg font-semibold bg-transparent outline-none"
                      />
                      <button
                        onClick={() => setQuantity(quantity + 1)}
                        className="px-4 py-2 hover:bg-muted transition-smooth"
                      >
                        <Icon name="Plus" size={18} className="text-primary" />
                      </button>
                    </div>
                  </div>

                  {/* Delivery Date */}
                  <div className="space-y-3">
                    <label className="block text-sm font-semibold text-foreground">
                      <div className="flex items-center space-x-2">
                        <Icon name="Calendar" size={16} className="text-primary" />
                        <span>Delivery Date</span>
                      </div>
                    </label>
                    <input
                      type="date"
                      value={deliveryDate}
                      onChange={(e) => setDeliveryDate(e.target.value)}
                      className="w-full px-3 py-2 border border-border rounded-lg bg-background text-foreground"
                    />
                  </div>

                  {/* Add-ons */}
                  {cake.addOns && cake.addOns.length > 0 && (
                    <div className="space-y-3 pt-3 border-t border-border">
                      <p className="text-sm font-semibold text-foreground">Add Special Items</p>
                      {cake.addOns.map((addon) => (
                        <label key={addon.id} className="flex items-center p-3 rounded-lg border border-border cursor-pointer hover:bg-muted/50 transition-smooth">
                          <input
                            type="checkbox"
                            checked={selectedAddOns.includes(addon.id)}
                            onChange={() => toggleAddOn(addon.id)}
                            className="w-4 h-4 rounded border-border cursor-pointer"
                          />
                          <span className="flex-1 ml-3 text-sm text-foreground">{addon.name}</span>
                          <span className="text-sm font-semibold text-primary">+₹{addon.price}</span>
                        </label>
                      ))}
                    </div>
                  )}

                  {/* Special Instructions */}
                  <div className="space-y-3 pt-3 border-t border-border">
                    <label className="block text-sm font-semibold text-foreground">
                      <div className="flex items-center space-x-2">
                        <Icon name="MessageSquare" size={16} className="text-primary" />
                        <span>Special Instructions</span>
                      </div>
                    </label>
                    <textarea
                      value={specialInstructions}
                      onChange={(e) => setSpecialInstructions(e.target.value)}
                      placeholder="Add custom message, dietary requests, design preferences..."
                      className="w-full px-3 py-2 border border-border rounded-lg bg-background text-foreground text-sm placeholder-muted-foreground resize-none h-20"
                    />
                  </div>
                </div>

                {/* Price Breakdown */}
                <div className="bg-accent/10 border border-accent/30 rounded-lg p-4 space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Cake ({cake.name}):</span>
                    <span className="font-medium">₹{(currentPrice * quantity).toFixed(2)}</span>
                  </div>
                  {addOnsPrice > 0 && (
                    <div className="flex items-center justify-between text-sm border-t border-accent/30 pt-2">
                      <span className="text-muted-foreground">Add-ons:</span>
                      <span className="font-medium">₹{(addOnsPrice * quantity).toFixed(2)}</span>
                    </div>
                  )}
                  <div className="flex items-center justify-between font-semibold border-t border-accent/30 pt-2">
                    <span className="text-foreground">Total:</span>
                    <span className="text-2xl text-primary">₹{totalPrice.toFixed(2)}</span>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    fullWidth
                    iconName="MessageCircle"
                    size="lg"
                  >
                    Chat
                  </Button>
                  <Button
                    variant="default"
                    fullWidth
                    iconName="ShoppingCart"
                    size="lg"
                    onClick={handleAddToCart}
                  >
                    Add to Cart
                  </Button>
                </div>

                {/* Customize Button */}
                {cake.isCustomizable && (
                  <Button
                    variant="secondary"
                    fullWidth
                    iconName="Palette"
                    size="lg"
                    onClick={() => navigate('/3d-custom-cake-designer')}
                  >
                    Design Custom Cake
                  </Button>
                )}

                {/* Info Cards */}
                <div className="space-y-2 pt-4 border-t border-border">
                  <div className="flex items-start space-x-3 p-3 bg-card border border-border rounded-lg">
                    <Icon name="Truck" size={20} className="text-primary flex-shrink-0 mt-0.5" />
                    <div className="text-sm">
                      <p className="font-semibold text-foreground">Free Delivery</p>
                      <p className="text-xs text-muted-foreground">On orders above ₹500</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3 p-3 bg-card border border-border rounded-lg">
                    <Icon name="Clock" size={20} className="text-primary flex-shrink-0 mt-0.5" />
                    <div className="text-sm">
                      <p className="font-semibold text-foreground">Fresh Guarantee</p>
                      <p className="text-xs text-muted-foreground">Made to order, delivered fresh</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3 p-3 bg-card border border-border rounded-lg">
                    <Icon name="Shield" size={20} className="text-primary flex-shrink-0 mt-0.5" />
                    <div className="text-sm">
                      <p className="font-semibold text-foreground">100% Satisfaction</p>
                      <p className="text-xs text-muted-foreground">Or your money back</p>
                    </div>
                  </div>
                </div>

                {/* Order Section */}
                <div className="space-y-3 pt-4 border-t border-border">
                  <h3 className="text-lg font-heading font-semibold text-foreground">Ready to Order?</h3>
                  <p className="text-sm text-muted-foreground">
                    Complete your order and proceed to checkout to finalize your purchase.
                  </p>
                  <Button
                    variant="default"
                    fullWidth
                    iconName="ShoppingBag"
                    size="lg"
                    onClick={() => navigate('/shopping-cart-checkout')}
                    className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold"
                  >
                    Order Now
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CakeDetails;

