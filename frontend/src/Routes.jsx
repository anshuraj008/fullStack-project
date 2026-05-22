import React from "react";
import { BrowserRouter, Routes as RouterRoutes, Route } from "react-router-dom";
import ScrollToTop from "components/ScrollToTop";
import ErrorBoundary from "components/ErrorBoundary";
import NotFound from "pages/NotFound";
import ShoppingCartCheckout from './pages/shopping-cart-checkout';
import UserAccountDashboard from './pages/user-account-dashboard';
import CakeCategoryBrowse from './pages/cake-category-browse';
import CakeDetails from './pages/cake-details';
import CustomCakeDesigner from './pages/3d-custom-cake-designer';
import InteractiveHomepage from './pages/3d-interactive-homepage';
import OrderTrackingHistory from './pages/order-tracking-history';
import About from './pages/about';
import Contact from './pages/contact';
import Login from './pages/login';
import Signup from './pages/signup';
import FooterLayout from './layouts/FooterLayout';
import AdminLayout from './layouts/AdminLayout';
import ProtectedRoute from './components/ProtectedRoute';
import { AuthProvider } from './utils/AuthContext';

import AdminDashboard from './pages/admin/Dashboard';
import ProductManagement from './pages/admin/ProductManagement';
import OrderManagement from './pages/admin/OrderManagement';
import CustomerManagement from './pages/admin/CustomerManagement';
import DeliveryManagement from './pages/admin/DeliveryManagement';

const Routes = () => {
  return (
    <AuthProvider>
      <BrowserRouter>
        <ErrorBoundary>
          <ScrollToTop />
          <RouterRoutes>
            {/* Public Routes with Footer Layout */}
            <Route element={<FooterLayout />}>
              <Route path="/" element={<InteractiveHomepage />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/shopping-cart-checkout" element={<ShoppingCartCheckout />} />
              <Route path="/user-account-dashboard" element={<UserAccountDashboard />} />
              <Route path="/cake-category-browse" element={<CakeCategoryBrowse />} />
              <Route path="/cake-details/:id" element={<CakeDetails />} />
              <Route path="/3d-custom-cake-designer" element={<CustomCakeDesigner />} />
              <Route path="/3d-interactive-homepage" element={<InteractiveHomepage />} />
              <Route path="/order-tracking-history" element={<OrderTrackingHistory />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
            </Route>

              {/* Admin Routes - Protected */}
              <Route element={<ProtectedRoute requiredRole="admin" />}>
                <Route path="/admin" element={<AdminLayout />}>
                  <Route path="dashboard" element={<AdminDashboard />} />
                  <Route path="products" element={<ProductManagement />} />
                  <Route path="orders" element={<OrderManagement />} />
                  <Route path="customers" element={<CustomerManagement />} />
                  <Route path="delivery" element={<DeliveryManagement />} />
                </Route>
              </Route>

            {/* 404 Page */}
            <Route path="*" element={<NotFound />} />
          </RouterRoutes>
        </ErrorBoundary>
      </BrowserRouter>
    </AuthProvider>
  );
};

export default Routes;
