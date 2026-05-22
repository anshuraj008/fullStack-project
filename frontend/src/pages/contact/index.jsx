import React, { useState } from 'react';
import Header from '../../components/ui/Header';
import Icon from '../../components/AppIcon';
import api from '../../utils/api';

const Contact = () => {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [status, setStatus] = useState({ type: '', message: '' });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic client-side validation
    if (!form.name || !form.email || !form.message) {
      setStatus({ type: 'error', message: 'Please fill in your name, email, and message.' });
      return;
    }

    try {
      await api.post('/api/contact', form);
      setStatus({ type: 'success', message: 'Thanks! Your message has been sent.' });
      setForm({ name: '', email: '', subject: '', message: '' });
    } catch (error) {
      const message = error?.response?.data?.message || 'Unable to send your message right now. Please try again.';
      setStatus({ type: 'error', message });
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      <main className="pt-16">
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="mb-8 flex items-center gap-3">
            <div className="w-12 h-12 rounded-lg bg-[#F2E2C4] flex items-center justify-center">
              <Icon name="Phone" size={22} className="text-[#2F6D66]" />
            </div>
            <div>
              <h1 className="text-3xl font-heading font-bold">Contact Us</h1>
              <p className="text-muted-foreground">We'd love to hear from you. Send us a message and we’ll respond shortly.</p>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="flex flex-wrap items-center gap-3 mb-8">
            <a
              href="tel:+916291074147"
              className="inline-flex items-center gap-2 rounded-md border border-border px-4 py-2 hover:bg-accent/50 transition"
            >
              <Icon name="Phone" size={16} /> Call Us
            </a>
            <a
              href="mailto:contact@cuppiecake.com"
              className="inline-flex items-center gap-2 rounded-md border border-border px-4 py-2 hover:bg-accent/50 transition"
            >
              <Icon name="Mail" size={16} /> Email
            </a>
            <a
              href="https://wa.me/916291074147?text=Hello%20Cuppie%20Cake%20team!"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-md bg-green-500 text-white px-4 py-2 hover:opacity-90 transition"
            >
              <Icon name="MessageCircle" size={16} /> WhatsApp
            </a>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Contact Form */}
            <div className="lg:col-span-2 p-6 rounded-xl border border-border bg-card shadow-soft">
              {status.message && (
                <div className={`mb-4 rounded-md px-4 py-3 text-sm ${status.type === 'error' ? 'bg-destructive/10 text-destructive' : 'bg-secondary/10 text-secondary'}`}>
                  {status.message}
                </div>
              )}
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm mb-1">Name</label>
                    <input
                      type="text"
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                      className="w-full rounded-md border border-border bg-background px-3 py-2 focus:outline-none focus:ring-2 focus:ring-secondary"
                      placeholder="Your name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm mb-1">Email</label>
                    <input
                      type="email"
                      name="email"
                      value={form.email}
                      onChange={handleChange}
                      className="w-full rounded-md border border-border bg-background px-3 py-2 focus:outline-none focus:ring-2 focus:ring-secondary"
                      placeholder="you@example.com"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm mb-1">Subject</label>
                  <input
                    type="text"
                    name="subject"
                    value={form.subject}
                    onChange={handleChange}
                    className="w-full rounded-md border border-border bg-background px-3 py-2 focus:outline-none focus:ring-2 focus:ring-secondary"
                    placeholder="How can we help?"
                  />
                </div>

                <div>
                  <label className="block text-sm mb-1">Message</label>
                  <textarea
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    rows={6}
                    className="w-full rounded-md border border-border bg-background px-3 py-2 focus:outline-none focus:ring-2 focus:ring-secondary"
                    placeholder="Write your message here..."
                  />
                </div>

                <button
                  type="submit"
                  className="inline-flex items-center gap-2 rounded-md bg-primary px-5 py-2.5 text-primary-foreground hover:opacity-90 transition"
                >
                  <Icon name="Send" size={18} />
                  Send Message
                </button>
              </form>
            </div>

            {/* Contact Details */}
            <aside className="space-y-6">
              <div className="p-6 rounded-xl border border-border bg-card shadow-soft">
                <h3 className="text-lg font-heading font-semibold mb-2">Visit Us</h3>
                <p className="text-muted-foreground text-sm">
                  Park Street Area
                  <br /> Kolkata, West Bengal, India
                </p>
              </div>
              <div className="p-6 rounded-xl border border-border bg-card shadow-soft">
                <h3 className="text-lg font-heading font-semibold mb-2">Hours</h3>
                <p className="text-muted-foreground text-sm">
                  Mon–Sat: 9:00 AM – 7:00 PM
                  <br /> Sun: 10:00 AM – 5:00 PM
                </p>
              </div>
              <div className="p-6 rounded-xl border border-border bg-card shadow-soft">
                <h3 className="text-lg font-heading font-semibold mb-2">Contact</h3>
                <div className="text-sm space-y-2">
                  <div>
                    <span className="text-muted-foreground">Email: </span>
                    <a href="mailto:contact@cuppiecake.com" className="text-primary hover:underline">contact@cuppiecake.com</a>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Phone: </span>
                    <a href="tel:+916291074147" className="text-primary hover:underline">+91 62910 74147</a>
                  </div>
                  <div>
                    <span className="text-muted-foreground">WhatsApp: </span>
                    <a
                      href="https://wa.me/916291074147?text=Hello%20Cuppie%20Cake%20team!"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary hover:underline"
                    >
                      Chat with us
                    </a>
                  </div>
                </div>
              </div>
            </aside>
          </div>

          {/* Map Embed */}
          <div className="mt-10 p-1 rounded-xl border border-border bg-card shadow-soft overflow-hidden">
            <iframe
              title="Cuppie Cake Location"
              className="w-full h-[380px]"
              style={{ border: 0 }}
              loading="lazy"
              allowFullScreen
              referrerPolicy="no-referrer-when-downgrade"
              src="https://www.google.com/maps?q=Kolkata,%20West%20Bengal,%20India&output=embed"
            />
          </div>
        </section>
      </main>
    </div>
  );
};

export default Contact;
