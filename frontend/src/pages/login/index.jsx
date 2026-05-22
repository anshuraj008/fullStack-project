import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";
import { IoLogIn as IoMdLogIn, IoArrowBack as IoMdArrowBack } from "react-icons/io5";
import { FaUser, FaUserShield } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import api from "../../utils/api";
import { useAuth } from "../../utils/AuthContext";
import Icon from "../../components/AppIcon";
import Button from "../../components/ui/Button";
import axios from "axios";

const LoginPage = () => {
  const postAuthRedirect = "/3d-interactive-homepage";
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rememberMe: false,
    accountType: "customer" // 'customer' or 'admin'
  });
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Determine which backend to use
      const baseURL = formData.accountType === 'admin' 
        ? 'http://localhost:5001' 
        : 'http://localhost:5000';

      const endpoint = formData.accountType === 'admin'
        ? '/api/auth/signin'
        : '/api/auth/login';

      const requestData = {
        email: formData.email,
        password: formData.password,
        role: formData.accountType
      };

      console.log("Attempting login to:", baseURL + endpoint);
      const res = await axios.post(baseURL + endpoint, requestData);

      login(res.data.token, res.data.user);

      navigate(postAuthRedirect, { replace: true });
    } catch (err) {
      console.error("Login error:", err);
      console.error("Error response:", err.response);
      alert(err?.response?.data?.message || "Login failed");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Helmet>
        <title>Login - Cuppie Cake</title>
        <meta name="description" content="Sign in to your Cuppie Cake account to access your orders, saved designs, and more." />
      </Helmet>

      <div className="min-h-screen bg-gradient-to-br from-[#FCFAF7] via-[#FFF8F1] to-[#F1F6F3] flex items-center justify-center p-4">
        {/* Back to Home Button */}
        <Link
          to="/3d-interactive-homepage"
          className="absolute top-6 left-6 flex items-center gap-2 text-gray-600 hover:text-[#8C5A3C] transition-colors"
        >
          <IoMdArrowBack size={20} />
          <span className="font-medium">Back to Home</span>
        </Link>

        <div className="w-full max-w-md">
          {/* Header */}
          <div className="text-center mb-8">
            <Link to="/3d-interactive-homepage" className="inline-block mb-6">
              <div className="bg-gradient-to-tr from-[#8C5A3C] to-[#2F6D66] text-white w-16 h-16 flex items-center justify-center rounded-2xl shadow-lg mx-auto">
                <IoMdLogIn size={30} />
              </div>
            </Link>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Welcome Back!</h1>
            <p className="text-gray-600">Sign in to continue your sweet journey 🍰</p>
          </div>

          <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Account Type Selection */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Login As
                </label>
                <div className="grid grid-cols-2 gap-3">
                  {/* Customer Login */}
                  <button
                    type="button"
                    onClick={() => setFormData(prev => ({ ...prev, accountType: 'customer' }))}
                    className={`p-4 border-2 rounded-lg transition-all ${
                      formData.accountType === 'customer'
                        ? 'border-[#8C5A3C] bg-[#F2E2C4]/35'
                        : 'border-gray-200 hover:border-[#2F6D66]'
                    }`}
                  >
                    <FaUser className={`text-2xl mx-auto mb-2 ${
                      formData.accountType === 'customer' ? 'text-[#8C5A3C]' : 'text-gray-400'
                    }`} />
                    <div className="text-sm font-medium text-gray-700">Customer</div>
                  </button>

                  {/* Admin Login */}
                  <button
                    type="button"
                    onClick={() => setFormData(prev => ({ ...prev, accountType: 'admin' }))}
                    className={`p-4 border-2 rounded-lg transition-all ${
                      formData.accountType === 'admin'
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-gray-200 hover:border-blue-300'
                    }`}
                  >
                    <FaUserShield className={`text-2xl mx-auto mb-2 ${
                      formData.accountType === 'admin' ? 'text-blue-500' : 'text-gray-400'
                    }`} />
                    <div className="text-sm font-medium text-gray-700">Admin</div>
                  </button>
                </div>
              </div>

              {/* Email Field */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address <span className="text-[#8C5A3C]">*</span>
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="your@email.com"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2F6D66] focus:border-[#2F6D66] transition-all"
                  required
                />
              </div>

              {/* Password Field */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Password <span className="text-[#8C5A3C]">*</span>
                </label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  placeholder="Enter your password"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2F6D66] focus:border-[#2F6D66] transition-all"
                  required
                />
              </div>

              {/* Remember Me & Forgot Password */}
              <div className="flex items-center justify-between text-sm">
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    name="rememberMe"
                    checked={formData.rememberMe}
                    onChange={handleInputChange}
                    className="accent-[#8C5A3C]"
                  />
                  <span className="text-gray-600">Remember me</span>
                </label>
                <button
                  type="button"
                  className="text-[#8C5A3C] hover:underline font-medium"
                >
                  Forgot password?
                </button>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-gradient-to-r from-[#8C5A3C] to-[#2F6D66] text-white py-3 rounded-lg font-semibold hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? "Signing In..." : "Sign In"}
              </button>
            </form>

            {/* Divider */}
            <div className="mt-6">
              <div className="flex items-center justify-center relative mb-6">
                <div className="absolute w-full border-t border-gray-200"></div>
                <span className="relative z-10 bg-white text-xs text-gray-400 px-4">
                  OR CONTINUE WITH
                </span>
              </div>

              {/* Social Login Buttons */}
              <div className="flex gap-3 mb-6">
                <button className="flex items-center justify-center gap-2 w-full border border-gray-300 rounded-lg py-3 hover:bg-gray-50 transition">
                  <FcGoogle size={20} />
                  <span className="text-sm font-medium text-gray-700">Google</span>
                </button>
                <button className="flex items-center justify-center gap-2 w-full border border-gray-300 rounded-lg py-3 hover:bg-gray-50 transition">
                  <FaUser size={20} className="text-gray-700" />
                  <span className="text-sm font-medium text-gray-700">Apple</span>
                </button>
              </div>
            </div>

            {/* Sign Up Link */}
            <div className="text-center">
              <p className="text-gray-600">
                Don't have an account?{" "}
                <Link to="/signup" className="text-[#8C5A3C] hover:underline font-medium">
                  Create one here
                </Link>
              </p>
            </div>
          </div>

          {/* Footer */}
          <div className="text-center mt-8">
            <p className="text-sm text-gray-500">
              Secured with enterprise-grade encryption 🔒
            </p>
            <p className="text-xs text-gray-400 mt-2">
              © 2025 <span className="text-[#8C5A3C] font-semibold">Cuppie Cake</span> — All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginPage;
