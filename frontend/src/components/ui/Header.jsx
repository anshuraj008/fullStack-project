import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Icon from "../AppIcon";
import Button from "./Button";
import { useAuth } from "../../utils/AuthContext";
import { IoLogIn as IoMdLogIn, IoClose as IoMdClose } from "react-icons/io5";
// Use public image path because src/assets/Logo.png is not present in the repo
const Logo = "/assets/images/no_image.png";

const Header = () => {
  const { user, logout, login: authLogin } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isAccountSidebarOpen, setIsAccountSidebarOpen] = useState(false);
  const [showLoginDropdown, setShowLoginDropdown] = useState(false);
  const [loginForm, setLoginForm] = useState({
    email: '',
    password: '',
    rememberMe: false
  });
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [authNotice, setAuthNotice] = useState("");
  const location = useLocation();
  const navigate = useNavigate();

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (showLoginDropdown && !event.target.closest('.login-dropdown')) {
        setShowLoginDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [showLoginDropdown]);

  const navigationItems = [
    { label: "Home", path: "/3d-interactive-homepage", icon: "Home" },
    { label: "Browse Cakes", path: "/cake-category-browse", icon: "Search" },
    { label: "About Us", path: "/about", icon: "Info" },
    { label: "Contact", path: "/contact", icon: "Phone" },
  ];

  const adminNavigationItems = [
    { label: "Dashboard", path: "http://localhost:5173/admin/dashboard", icon: "LayoutDashboard" },
    { label: "Products", path: "http://localhost:5173/admin/products", icon: "Package" },
    { label: "Orders", path: "http://localhost:5173/admin/orders", icon: "ShoppingCart" },
    { label: "Customers", path: "http://localhost:5173/admin/customers", icon: "Users" },
    { label: "Delivery", path: "http://localhost:5173/admin/delivery", icon: "Truck" },
  ];

  const isAdminUser = user?.role === 'admin';

  const isActivePath = (path) => location?.pathname === path;

  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);
  const toggleAccountSidebar = () => setIsAccountSidebarOpen(!isAccountSidebarOpen);
  const closeMobileMenu = () => setIsMobileMenuOpen(false);

  const handleLoginInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setLoginForm(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleQuickLogin = async (e) => {
    e.preventDefault();
    setIsLoggingIn(true);

    try {
      // Use the same API call as the login page
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: loginForm.email,
          password: loginForm.password
        })
      });

      if (res.ok) {
        const data = await res.json();
        authLogin(data.token, data.user);
        setShowLoginDropdown(false);
        setAuthNotice("Signed in successfully");
        setTimeout(() => setAuthNotice(""), 3000);
        // Both admin and customer stay in customer frontend
        navigate("/3d-interactive-homepage");
      } else {
        throw new Error('Login failed');
      }
    } catch (err) {
      alert('Login failed. Please check your credentials.');
    } finally {
      setIsLoggingIn(false);
    }
  };
  

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 bg-background border-b border-border shadow-soft">
        <div className="flex items-center justify-between h-16 px-4 lg:px-6">
          {/* Logo Section */}
          <Link to="/3d-interactive-homepage" className="flex items-center space-x-2">
            <img src={Logo} alt="Cuppie Cake Logo" className="w-10 h-10 rounded-md" />
            <span className="text-xl font-heading font-semibold text-foreground">
              Cuppie Cake
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            {navigationItems?.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-smooth ${isActivePath(item.path)
                  ? "text-primary bg-accent"
                  : "text-foreground hover:text-primary hover:bg-accent/50"
                  }`}
              >
                <Icon name={item.icon} size={18} />
                <span>{item.label}</span>
              </Link>
            ))}
            
            {/* Admin Dashboard Link */}
            {isAdminUser && (
              <a
                href="http://localhost:5173/admin/dashboard"
                className="flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-smooth text-white bg-black hover:bg-gray-800 border border-gray-900"
              >
                <Icon name="LayoutDashboard" size={18} />
                <span>Admin Dashboard</span>
              </a>
            )}
          </nav>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center space-x-4">
            {user ? (
              <>
                {/* User Profile Section */}
                <div className="flex items-center space-x-3 px-3 py-2 bg-accent/50 rounded-lg">
                  <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                    <Icon name="User" size={16} className="text-primary-foreground" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-sm font-medium text-foreground">{user.name || 'User'}</span>
                    <span className="text-xs text-muted-foreground">{user.role === 'admin' ? 'Admin' : 'Customer'}</span>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    logout();
                    navigate('/login');
                  }}
                  className="text-foreground hover:text-primary"
                >
                  Logout
                </Button>
              </>
            ) : (
              <>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => navigate('/login')}
                  className="text-foreground hover:text-primary"
                >
                  Login
                </Button>
                <Button
                  variant="primary"
                  size="sm"
                  onClick={() => navigate('/signup')}
                >
                  Sign Up
                </Button>
              </>
            )}
          </div>

          {/* Mobile Buttons */}
          <div className="md:hidden flex items-center space-x-2">
            <Button
              variant="ghost"
              size="icon"
              iconName="User"
              onClick={toggleAccountSidebar}
              className="text-foreground hover:text-primary"
            />
            <Button
              variant="ghost"
              size="icon"
              iconName={isMobileMenuOpen ? "X" : "Menu"}
              onClick={toggleMobileMenu}
              className="text-foreground hover:text-primary"
            />
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-background border-t border-border shadow-medium">
            <nav className="px-4 py-4 space-y-2">
              {navigationItems?.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={closeMobileMenu}
                  className={`flex items-center space-x-3 px-3 py-3 rounded-md text-sm font-medium transition-smooth ${isActivePath(item.path)
                    ? "text-primary bg-accent"
                    : "text-foreground hover:text-primary hover:bg-accent/50"
                    }`}
                >
                  <Icon name={item.icon} size={20} />
                  <span>{item.label}</span>
                </Link>
              ))}

              {/* Mobile Login / Admin Links */}
              {user ? (
                <>
                  {isAdminUser && (
                    <div className="pt-2 border-t border-gray-200">
                      <a
                        href="http://localhost:5173/admin/dashboard"
                        onClick={closeMobileMenu}
                        className="flex items-center space-x-3 px-3 py-3 rounded-md text-sm font-medium transition-smooth text-white bg-black hover:bg-gray-800"
                      >
                        <Icon name="LayoutDashboard" size={20} />
                        <span>Admin Dashboard</span>
                      </a>
                    </div>
                  )}
                </>
              ) : (
                <>
                  <div className="relative">
                    <button
                      onClick={() => setShowLoginDropdown(!showLoginDropdown)}
                      className="flex items-center justify-center gap-2 w-full text-center px-4 py-2 border border-primary text-primary rounded-lg hover:bg-primary hover:text-primary-foreground transition"
                    >
                      <IoMdLogIn size={16} /> Login
                    </button>

                    {/* Mobile Quick Login Dropdown */}
                    {showLoginDropdown && (
                      <div className="absolute left-0 right-0 top-full mt-2 bg-white rounded-lg shadow-lg border border-gray-200 z-50 login-dropdown">
                        <div className="p-4">
                          <div className="flex items-center justify-between mb-4">
                            <h3 className="text-lg font-semibold text-gray-900">Quick Sign In</h3>
                            <button
                              onClick={() => setShowLoginDropdown(false)}
                              className="text-gray-400 hover:text-gray-600"
                            >
                              <IoMdClose size={20} />
                            </button>
                          </div>

                          <form onSubmit={handleQuickLogin} className="space-y-3">
                            <div>
                              <input
                                type="email"
                                name="email"
                                value={loginForm.email}
                                onChange={handleLoginInputChange}
                                placeholder="Email address"
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-rose-400 focus:border-rose-400 text-sm"
                                required
                              />
                            </div>

                            <div>
                              <input
                                type="password"
                                name="password"
                                value={loginForm.password}
                                onChange={handleLoginInputChange}
                                placeholder="Password"
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-rose-400 focus:border-rose-400 text-sm"
                                required
                              />
                            </div>

                            <div className="flex items-center justify-between text-sm">
                              <label className="flex items-center gap-2">
                                <input
                                  type="checkbox"
                                  name="rememberMe"
                                  checked={loginForm.rememberMe}
                                  onChange={handleLoginInputChange}
                                  className="accent-rose-500"
                                />
                                <span className="text-gray-600">Remember me</span>
                              </label>
                              <button
                                type="button"
                                className="text-rose-500 hover:underline font-medium"
                              >
                                Forgot?
                              </button>
                            </div>

                            <button
                              type="submit"
                              disabled={isLoggingIn}
                              className="w-full bg-gradient-to-r from-rose-400 to-rose-600 text-white py-2 rounded-md font-medium hover:shadow-lg transition-all disabled:opacity-50 text-sm"
                            >
                              {isLoggingIn ? "Signing In..." : "Sign In"}
                            </button>
                          </form>

                          <div className="mt-3 pt-3 border-t border-gray-200">
                            <p className="text-center text-sm text-gray-600">
                              Don't have an account?{" "}
                              <Link
                                to="/signup"
                                className="text-rose-500 hover:underline font-medium"
                                onClick={() => {
                                  setShowLoginDropdown(false);
                                  closeMobileMenu();
                                }}
                              >
                                Sign up
                              </Link>
                            </p>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>

                  <Link
                    to="/signup"
                    className="flex items-center justify-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition"
                    onClick={closeMobileMenu}
                  >
                    <Icon name="UserPlus" size={16} /> Sign Up
                  </Link>
                </>
              )}
            </nav>
          </div>
        )}
      </header>

      {/* Account Sidebar */}
      {isAccountSidebarOpen && (
        <>
          {/* Overlay */}
          <div
            className="fixed inset-0 z-40 bg-black/20 backdrop-blur-sm"
            onClick={toggleAccountSidebar}
          />

          {/* Sidebar */}
          <div className="fixed top-0 right-0 z-50 h-full w-full sm:w-80 bg-background border-l border-border shadow-large transition-transform">
            <div className="flex items-center justify-between p-4 border-b border-border">
              <h2 className="text-lg font-heading font-semibold text-foreground">
                My Account
              </h2>
              <Button
                variant="ghost"
                size="icon"
                iconName="X"
                onClick={toggleAccountSidebar}
                className="text-foreground hover:text-primary"
              />
            </div>

            <nav className="p-4 space-y-2">
              {isAdminUser ? (
                <>
                  {adminNavigationItems.map((item) => (
                    <Link
                      key={item.path}
                      to={item.path}
                      onClick={toggleAccountSidebar}
                      className={`flex items-center space-x-3 px-3 py-3 rounded-md text-sm font-medium transition-smooth ${isActivePath(item.path)
                        ? "text-primary bg-accent"
                        : "text-foreground hover:text-primary hover:bg-accent/50"
                        }`}
                    >
                      <Icon name={item.icon} size={20} />
                      <span>{item.label}</span>
                    </Link>
                  ))}
                </>
              ) : (
                <>
                  <Link
                    to="/user-account-dashboard"
                    onClick={toggleAccountSidebar}
                    className={`flex items-center space-x-3 px-3 py-3 rounded-md text-sm font-medium transition-smooth ${isActivePath("/user-account-dashboard")
                      ? "text-primary bg-accent"
                      : "text-foreground hover:text-primary hover:bg-accent/50"
                      }`}
                  >
                    <Icon name="User" size={20} />
                    <span>Dashboard</span>
                  </Link>

                  <Link
                    to="/order-tracking-history"
                    onClick={toggleAccountSidebar}
                    className={`flex items-center space-x-3 px-3 py-3 rounded-md text-sm font-medium transition-smooth ${isActivePath("/order-tracking-history")
                      ? "text-primary bg-accent"
                      : "text-foreground hover:text-primary hover:bg-accent/50"
                      }`}
                  >
                    <Icon name="Package" size={20} />
                    <span>Order History</span>
                  </Link>

                  <div className="pt-4 border-t border-border">
                    <button className="flex items-center space-x-3 px-3 py-3 rounded-md text-sm font-medium text-foreground hover:text-primary hover:bg-accent/50 transition-smooth w-full text-left">
                      <Icon name="Settings" size={20} />
                      <span>Settings</span>
                    </button>
                    <button className="flex items-center space-x-3 px-3 py-3 rounded-md text-sm font-medium text-foreground hover:text-primary hover:bg-accent/50 transition-smooth w-full text-left">
                      <Icon name="HelpCircle" size={20} />
                      <span>Help & Support</span>
                    </button>
                    <button
                      onClick={() => {
                        logout();
                        setIsAccountSidebarOpen(false);
                        navigate('/login');
                      }}
                      className="flex items-center space-x-3 px-3 py-3 rounded-md text-sm font-medium text-destructive hover:bg-destructive/10 transition-smooth w-full text-left"
                    >
                      <Icon name="LogOut" size={20} />
                      <span>Sign Out</span>
                    </button>
                  </div>
                </>
              )}
            </nav>
          </div>
        </>
      )}
    </>
  );
};

export default Header;
