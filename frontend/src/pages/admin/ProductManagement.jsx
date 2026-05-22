import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  FiPlus, 
  FiEdit2, 
  FiTrash2, 
  FiSearch,
  FiFilter,
  FiX,
  FiSave,
  FiLoader // Added for loading
} from 'react-icons/fi';
import axios from 'axios';

// Define your API base URL
const API_URL = 'http://localhost:5000/api/admin';

const ProductManagement = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [showModal, setShowModal] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false); // For modal loading
  const [editingProduct, setEditingProduct] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    imageUrl: '',
    category: 'Bento Cakes',
    variants: [{ size: '', price: '', servings: '' }],
    isFeatured: false,
    flavor: '',
    frosting: ''
  });

  const categories = ['All', 'Bento Cakes', 'Birthday Cakes', 'Wedding Cakes', 'Seasonal Specials'];

  // --- CHANGED: useEffect now depends on filters ---
  // This will refetch data whenever the search term or category changes
  useEffect(() => {
    fetchProducts();
  }, [searchTerm, selectedCategory]); // Dependencies added

  // --- CHANGED: fetchProducts now sends filters to the backend ---
  const fetchProducts = async () => {
    setLoading(true);
    try {
      // Build query parameters
      const params = new URLSearchParams();
      if (searchTerm) {
        params.append('search', searchTerm);
      }
      if (selectedCategory !== 'All') {
        params.append('category', selectedCategory);
      }

      const response = await axios.get(`${API_URL}/products?${params.toString()}`);
      if (response.data.success) {
        setProducts(response.data.data);
      }
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleVariantChange = (index, field, value) => {
    const newVariants = [...formData.variants];
    newVariants[index][field] = value;
    setFormData(prev => ({ ...prev, variants: newVariants }));
  };

  const addVariant = () => {
    setFormData(prev => ({
      ...prev,
      variants: [...prev.variants, { size: '', price: '', servings: '' }]
    }));
  };

  const removeVariant = (index) => {
    setFormData(prev => ({
      ...prev,
      variants: prev.variants.filter((_, i) => i !== index)
    }));
  };

  // --- CHANGED: Added loading state for submit ---
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      if (editingProduct) {
        await axios.put(`${API_URL}/products/${editingProduct._id}`, formData);
      } else {
        await axios.post(`${API_URL}/products`, formData);
      }
      fetchProducts(); // Refetch all products
      closeModal();
    } catch (error) {
      console.error('Error saving product:', error);
      alert('Error saving product. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleEdit = (product) => {
    setEditingProduct(product);
    setFormData({
      name: product.name,
      description: product.description,
      imageUrl: product.imageUrl,
      category: product.category,
      // Ensure variants is always an array
      variants: product.variants.length ? product.variants : [{ size: '', price: '', servings: '' }],
      isFeatured: product.isFeatured || false,
      flavor: product.flavor || '',
      frosting: product.frosting || ''
    });
    setShowModal(true);
  };

  // --- CHANGED: Added loading state for delete ---
  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      setLoading(true); // Reuse main loading state
      try {
        await axios.delete(`${API_URL}/products/${id}`);
        fetchProducts(); // Refetch
      } catch (error) {
        console.error('Error deleting product:', error);
        alert('Error deleting product. Please try again.');
      } finally {
        setLoading(false);
      }
    }
  };

  const openAddModal = () => {
    setEditingProduct(null);
    setFormData({
      name: '',
      description: '',
      imageUrl: '',
      category: 'Bento Cakes',
      variants: [{ size: '', price: '', servings: '' }],
      isFeatured: false,
      flavor: '',
      frosting: ''
    });
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setEditingProduct(null);
  };

  // --- CHANGED: Removed client-side filtering ---
  // The 'products' state is now always the filtered list from the backend
  // const filteredProducts = ... (This whole block is removed)

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h1 className="text-3xl font-heading font-bold text-foreground mb-2">
            Product Management
          </h1>
          <p className="text-text-secondary">
            Manage your cake inventory, pricing, and customization options.
          </p>
        </div>
        <button
          onClick={openAddModal}
          className="mt-4 lg:mt-0 px-6 py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-secondary transition-colors flex items-center space-x-2 shadow-soft"
        >
          <FiPlus size={20} />
          <span>Add New Product</span>
        </button>
      </div>

      {/* Filters */}
      <div className="bg-card rounded-xl p-4 border border-border shadow-soft">
        <div className="flex flex-col lg:flex-row lg:items-center space-y-4 lg:space-y-0 lg:space-x-4">
          <div className="flex-1 relative">
            <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-text-secondary" size={20} />
            <input
              type="text"
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
          <div className="flex items-center space-x-2">
            <FiFilter className="text-text-secondary" size={20} />
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-4 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            >
              {categories.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Products Grid */}
      {loading ? (
        <div className="text-center py-12">
          <FiLoader size={32} className="animate-spin text-primary mx-auto" />
          <p className="text-text-secondary mt-2">Loading products...</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* --- CHANGED: Map over 'products' directly --- */}
          {products.map((product, index) => (
            <motion.div
              key={product._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className="bg-card rounded-xl overflow-hidden border border-border shadow-medium hover:shadow-large transition-all duration-300 group"
            >
              {/* ... (rest of the card JSX remains the same) ... */}
              <div className="relative h-48 bg-muted overflow-hidden">
                <img
                  src={product.imageUrl}
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                {product.isFeatured && (
                  <span className="absolute top-2 right-2 px-3 py-1 bg-warning text-warning-foreground rounded-full text-xs font-semibold">
                    Featured
                  </span>
                )}
              </div>
              <div className="p-4">
                <div className="flex items-start justify-between mb-2">
                  <h3 className="text-lg font-heading font-semibold text-foreground">
                    {product.name}
                  </h3>
                  <span className="px-2 py-1 bg-primary/10 text-primary text-xs rounded">
                    {product.category}
                  </span>
                </div>
                <p className="text-sm text-text-secondary mb-3 line-clamp-2">
                  {product.description}
                </p>
                <div className="mb-3">
                  <p className="text-xs text-text-secondary mb-1">Variants:</p>
                  <div className="flex flex-wrap gap-2">
                    {product.variants.map((variant, i) => (
                      <span key={i} className="px-2 py-1 bg-accent text-accent-foreground text-xs rounded">
                        {variant.size}: ₹{variant.price}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => handleEdit(product)}
                    className="flex-1 px-3 py-2 bg-primary/10 text-primary rounded-lg hover:bg-primary hover:text-primary-foreground transition-colors flex items-center justify-center space-x-2"
                  >
                    <FiEdit2 size={16} />
                    <span>Edit</span>
                  </button>
                  <button
                    onClick={() => handleDelete(product._id)}
                    className="flex-1 px-3 py-2 bg-destructive/10 text-destructive rounded-lg hover:bg-destructive hover:text-destructive-foreground transition-colors flex items-center justify-center space-x-2"
                  >
                    <FiTrash2 size={16} />
                    <span>Delete</span>
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-card rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-xl-custom"
          >
            <div className="sticky top-0 bg-card border-b border-border p-6 flex items-center justify-between">
              <h2 className="text-2xl font-heading font-bold text-foreground">
                {editingProduct ? 'Edit Product' : 'Add New Product'}
              </h2>
              <button onClick={closeModal} className="p-2 hover:bg-muted rounded-lg transition-colors">
                <FiX size={24} />
              </button>
            </div>
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              {/* ... (form fields remain the same) ... */}
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Product Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Description</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  required
                  rows="3"
                  className="w-full px-4 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Category</label>
                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  >
                    {categories.filter(c => c !== 'All').map(cat => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Image URL</label>
                  <input
                    type="url"
                    name="imageUrl"
                    value={formData.imageUrl}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Flavor</label>
                  <input
                    type="text"
                    name="flavor"
                    value={formData.flavor}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Frosting</label>
                  <input
                    type="text"
                    name="frosting"
                    value={formData.frosting}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
              </div>
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="block text-sm font-medium text-foreground">Variants</label>
                  <button
                    type="button"
                    onClick={addVariant}
                    className="text-sm text-primary hover:text-secondary flex items-center space-x-1"
                  >
                    <FiPlus size={16} />
                    <span>Add Variant</span>
                  </button>
                </div>
                {formData.variants.map((variant, index) => (
                  <div key={index} className="flex items-center space-x-2 mb-2">
                    <input
                      type="text"
                      placeholder="Size"
                      value={variant.size}
                      onChange={(e) => handleVariantChange(index, 'size', e.target.value)}
                      required
                      className="flex-1 px-3 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                    <input
                      type="number"
                      placeholder="Price"
                      value={variant.price}
                      onChange={(e) => handleVariantChange(index, 'price', e.target.value)}
                      required
                      className="flex-1 px-3 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                    <input
                      type="text"
                      placeholder="Servings"
                      value={variant.servings}
                      onChange={(e) => handleVariantChange(index, 'servings', e.target.value)}
                      className="flex-1 px-3 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                    {formData.variants.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeVariant(index)}
                        className="p-2 text-destructive hover:bg-destructive/10 rounded-lg transition-colors"
                      >
                        <FiTrash2 size={18} />
                      </button>
                    )}
                  </div>
                ))}
              </div>
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="isFeatured"
                  name="isFeatured"
                  checked={formData.isFeatured}
                  onChange={handleInputChange}
                  className="w-4 h-4 text-primary border-border rounded focus:ring-primary"
                />
                <label htmlFor="isFeatured" className="text-sm text-foreground">
                  Mark as Featured Product
                </label>
              </div>
              <div className="flex items-center space-x-3 pt-4">
                <button
                  type="submit"
                  disabled={isSubmitting} // --- CHANGED: Disable button on submit ---
                  className="flex-1 px-6 py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-secondary transition-colors flex items-center justify-center space-x-2 disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <FiLoader className="animate-spin" size={20} />
                  ) : (
                    <FiSave size={20} />
                  )}
                  <span>{isSubmitting ? 'Saving...' : (editingProduct ? 'Update Product' : 'Create Product')}</span>
                </button>
                <button
                  type="button"
                  onClick={closeModal}
                  className="flex-1 px-6 py-3 bg-muted text-foreground rounded-lg font-medium hover:bg-muted/80 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default ProductManagement;
