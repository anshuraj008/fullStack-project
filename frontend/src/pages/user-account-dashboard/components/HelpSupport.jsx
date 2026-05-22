import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const HelpSupport = () => {
  const [formData, setFormData] = useState({
    subject: '',
    message: '',
    category: 'general'
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Simulate API call
    setTimeout(() => {
      setIsSubmitted(true);
    }, 1000);
  };

  if (isSubmitted) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-card border border-border rounded-lg p-8 text-center"
      >
        <div className="w-16 h-16 bg-success/10 rounded-full flex items-center justify-center mx-auto mb-4">
          <Icon name="CheckCircle" size={32} className="text-success" />
        </div>
        <h2 className="text-2xl font-heading font-semibold text-foreground mb-2">Support Request Sent!</h2>
        <p className="text-muted-foreground mb-6">
          We've received your message and will respond within 24 hours.
        </p>
        <Button onClick={() => setIsSubmitted(false)}>
          Send Another Message
        </Button>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-card border border-border rounded-lg p-6"
    >
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
          <Icon name="HelpCircle" size={20} className="text-primary" />
        </div>
        <div>
          <h2 className="text-xl font-heading font-semibold text-foreground">Help & Support</h2>
          <p className="text-sm text-muted-foreground">Get help with your account or orders</p>
        </div>
      </div>

      <div className="space-y-6">
        {/* Contact Information */}
        <div className="bg-muted/30 rounded-lg p-4">
          <h3 className="font-medium text-foreground mb-2">Contact Information</h3>
          <div className="space-y-2 text-sm">
            <div className="flex items-center gap-2">
              <Icon name="Phone" size={16} className="text-primary" />
              <span>+91 62910 74147</span>
            </div>
            <div className="flex items-center gap-2">
              <Icon name="Mail" size={16} className="text-primary" />
              <span>contact@cuppiecake.com</span>
            </div>
            <div className="flex items-center gap-2">
              <Icon name="MessageCircle" size={16} className="text-primary" />
              <span>WhatsApp: +91 62910 74147</span>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div>
          <h3 className="font-medium text-foreground mb-3">Frequently Asked Questions</h3>
          <div className="space-y-3">
            <details className="group">
              <summary className="flex items-center justify-between cursor-pointer p-3 bg-muted/30 rounded-lg text-sm">
                <span>How do I track my order?</span>
                <Icon name="ChevronDown" size={16} className="group-open:rotate-180 transition-transform" />
              </summary>
              <div className="mt-2 p-3 bg-background rounded-lg text-sm text-muted-foreground">
                You can track your order in the "Order History" section of your dashboard or use the tracking link sent to your email.
              </div>
            </details>

            <details className="group">
              <summary className="flex items-center justify-between cursor-pointer p-3 bg-muted/30 rounded-lg text-sm">
                <span>How do I customize a cake?</span>
                <Icon name="ChevronDown" size={16} className="group-open:rotate-180 transition-transform" />
              </summary>
              <div className="mt-2 p-3 bg-background rounded-lg text-sm text-muted-foreground">
                Use our 3D Custom Cake Designer tool to create your perfect cake with flavors, decorations, and personalization.
              </div>
            </details>

            <details className="group">
              <summary className="flex items-center justify-between cursor-pointer p-3 bg-muted/30 rounded-lg text-sm">
                <span>What are the delivery options?</span>
                <Icon name="ChevronDown" size={16} className="group-open:rotate-180 transition-transform" />
              </summary>
              <div className="mt-2 p-3 bg-background rounded-lg text-sm text-muted-foreground">
                We offer same-day delivery in Kolkata and next-day delivery for surrounding areas. Standard delivery is free for orders over ₹500.
              </div>
            </details>
          </div>
        </div>

        {/* Support Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Category
            </label>
            <select
              name="category"
              value={formData.category}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
            >
              <option value="general">General Inquiry</option>
              <option value="orders">Order Issues</option>
              <option value="technical">Technical Support</option>
              <option value="billing">Billing</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Subject
            </label>
            <input
              type="text"
              name="subject"
              value={formData.subject}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
              placeholder="Brief description of your issue"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Message
            </label>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleInputChange}
              rows={4}
              className="w-full px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
              placeholder="Detailed description of your question or issue"
              required
            />
          </div>

          <Button type="submit" className="w-full">
            Send Support Request
          </Button>
        </form>
      </div>
    </motion.div>
  );
};

export default HelpSupport;
