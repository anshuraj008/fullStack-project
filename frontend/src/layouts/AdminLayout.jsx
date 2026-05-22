import React, { useState } from 'react';
import { Outlet, NavLink, Link, useNavigate } from 'react-router-dom';
import { 
  FiHome, 
  FiPackage, 
  FiShoppingCart, 
  FiUsers, 
  FiTruck, 
  FiMenu,
  FiX,
  FiLogOut
} from 'react-icons/fi';
import { useAuth } from '../utils/AuthContext';

// Use public image path to match customer frontend
const logo = '/assets/images/no_image.png';

const AdminLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();
  const { logout } = useAuth();

  const navItems = [
    { path: '/admin/dashboard', label: 'Dashboard', icon: FiHome },
    { path: '/admin/products', label: 'Products', icon: FiPackage },
    { path: '/admin/orders', label: 'Orders', icon: FiShoppingCart },
    { path: '/admin/customers', label: 'Customers', icon: FiUsers },
    { path: '/admin/delivery', label: 'Delivery', icon: FiTruck },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-background border-b border-border shadow-soft">
        <div className="flex items-center justify-between h-16 px-4 lg:px-6">
          <div className="flex items-center space-x-4">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="lg:hidden p-2 rounded-md hover:bg-muted transition-colors"
            >
              {sidebarOpen ? <FiX size={24} /> : <FiMenu size={24} />}
            </button>
            {/* Logo matching customer frontend */}
            <Link to="/admin/dashboard" className="flex items-center space-x-2">
              <img src={logo} alt="Cuppie Cake Logo" className="w-10 h-10 rounded-md" />
              <div className="flex flex-col">
                <span className="text-xl font-heading font-semibold text-foreground leading-tight">
                  Cuppie Cake
                </span>
                <span className="text-xs text-primary font-medium">Admin Panel</span>
              </div>
            </Link>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="hidden md:flex items-center space-x-2">
              <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-semibold">
                A
              </div>
              <span className="text-sm font-medium">Admin</span>
            </div>
            <button
              onClick={() => {
                logout();
                navigate('/login');
              }}
              className="p-2 rounded-md hover:bg-muted transition-colors text-text-secondary hover:text-foreground"
              aria-label="Sign out"
            >
              <FiLogOut size={20} />
            </button>
          </div>
        </div>
      </header>

      {/* Sidebar */}
      <aside
        className={`fixed top-16 left-0 bottom-0 w-64 bg-card border-r border-border shadow-medium transform transition-transform duration-300 ease-in-out z-40 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } lg:translate-x-0`}
      >
        <nav className="p-4 space-y-2">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              onClick={() => setSidebarOpen(false)}
              className={({ isActive }) =>
                `flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                  isActive
                    ? 'bg-primary text-primary-foreground shadow-soft'
                    : 'text-text-secondary hover:bg-muted hover:text-foreground'
                }`
              }
            >
              <item.icon size={20} />
              <span className="font-medium">{item.label}</span>
            </NavLink>
          ))}
        </nav>
      </aside>

      {/* Overlay for mobile */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Main Content */}
      <main className="pt-16 lg:pl-64 min-h-screen">
        <div className="p-6">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default AdminLayout;
