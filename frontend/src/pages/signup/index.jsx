import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";
import { IoPersonAdd as IoMdPersonAdd, IoArrowBack as IoMdArrowBack } from "react-icons/io5";
import { FaUser, FaUserShield } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import api from "../../utils/api";
import { useAuth } from "../../utils/AuthContext";
import Icon from "../../components/AppIcon";
import Button from "../../components/ui/Button";
import axios from "axios";

const SignupPage = () => {
  const postAuthRedirect = "/3d-interactive-homepage";
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    agreeToTerms: false,
    accountType: "customer" // 'customer' or 'admin'
  });
  const [isLoading, setIsLoading] = useState(false);
  const [adminExists, setAdminExists] = useState(true);
  const [checkingAdmin, setCheckingAdmin] = useState(true);
  const { login } = useAuth();
  const navigate = useNavigate();

  // Check if admin already exists
  useEffect(() => {
    const checkAdminExists = async () => {
      try {
        const customerRes = await api.get("/api/auth/check-admin");
        const adminBackendRes = await axios.get("http://localhost:5001/api/auth/check-admin");
        
        // If admin exists in either backend, disable admin registration
        setAdminExists(customerRes.data.adminExists || adminBackendRes.data.adminExists);
      } catch (err) {
        console.error("Error checking admin:", err);
        // Allow admin registration if check fails (default to false)
        setAdminExists(false);
      } finally {
        setCheckingAdmin(false);
      }
    };

    checkAdminExists();
  }, []);

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
      // Validation
      if (formData.name.trim().length < 2) {
        alert("Please enter your full name");
        setIsLoading(false);
        return;
      }

      if (formData.password.length < 6) {
        alert("Password must be at least 6 characters");
        setIsLoading(false);
        return;
      }

      if (formData.password !== formData.confirmPassword) {
        alert("Passwords do not match");
        setIsLoading(false);
        return;
      }

      if (!formData.agreeToTerms) {
        alert("Please agree to the terms and conditions");
        setIsLoading(false);
        return;
      }

      // Determine which backend to use
      const baseURL = formData.accountType === 'admin' 
        ? 'http://localhost:5001' 
        : 'http://localhost:5000';

      const endpoint = formData.accountType === 'admin'
        ? '/api/auth/signup'
        : '/api/auth/register';

      const requestData = formData.accountType === 'admin'
        ? {
            userName: formData.name,
            email: formData.email,
            password: formData.password,
            role: 'admin'
          }
        : {
            name: formData.name,
            email: formData.email,
            password: formData.password,
            role: 'customer'
          };

      const res = await axios.post(baseURL + endpoint, requestData);

      if (formData.accountType === 'admin') {
        alert("Admin account created successfully! Please login.");
        navigate("/login");
      } else {
        login(res.data.token, res.data.user);
        navigate(postAuthRedirect, { replace: true });
      }
    } catch (err) {
      alert(err?.response?.data?.message || "Registration failed");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Helmet>
        <title>Sign Up - Cuppie Cake</title>
        <meta name="description" content="Create your Cuppie Cake account to start designing and ordering custom cakes." />
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
                <IoMdPersonAdd size={30} />
              </div>
            </Link>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Create Account</h1>
            <p className="text-gray-600">Sign up to start designing and ordering cakes 🎂</p>
          </div>

          <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8">
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Account Type Selection */}
              {!checkingAdmin && (
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    Account Type
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    {/* Customer Account */}
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
                      <div className="text-xs text-gray-500 mt-1">Browse & Order</div>
                    </button>

                    {/* Admin Account */}
                    <button
                      type="button"
                      onClick={() => !adminExists && setFormData(prev => ({ ...prev, accountType: 'admin' }))}
                      disabled={adminExists}
                      className={`p-4 border-2 rounded-lg transition-all ${
                        adminExists
                          ? 'border-gray-200 bg-gray-50 opacity-50 cursor-not-allowed'
                          : formData.accountType === 'admin'
                          ? 'border-blue-500 bg-blue-50'
                          : 'border-gray-200 hover:border-blue-300'
                      }`}
                    >
                      <FaUserShield className={`text-2xl mx-auto mb-2 ${
                        formData.accountType === 'admin' ? 'text-blue-500' : 'text-gray-400'
                      }`} />
                      <div className="text-sm font-medium text-gray-700">Admin</div>
                      <div className="text-xs text-gray-500 mt-1">
                        {adminExists ? 'Already Exists' : 'Manage System'}
                      </div>
                    </button>
                  </div>
                </div>
              )}

              {/* Full Name Field */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Full Name <span className="text-[#8C5A3C]">*</span>
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Your full name"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2F6D66] focus:border-[#2F6D66] transition-all"
                  required
                />
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
                  placeholder="Create a strong password (min. 6 characters)"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2F6D66] focus:border-[#2F6D66] transition-all"
                  required
                  minLength={6}
                />
              </div>

              {/* Confirm Password Field */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Confirm Password <span className="text-[#8C5A3C]">*</span>
                </label>
                <input
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  placeholder="Re-enter your password"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2F6D66] focus:border-[#2F6D66] transition-all"
                  required
                />
              </div>

              {/* Terms and Conditions */}
              <div className="flex items-start gap-2">
                <input
                  type="checkbox"
                  name="agreeToTerms"
                  checked={formData.agreeToTerms}
                  onChange={handleInputChange}
                  className="accent-[#8C5A3C] mt-1"
                  required
                />
                <label className="text-sm text-gray-600">
                  I agree to the{" "}
                  <Link to="/terms" className="text-[#8C5A3C] hover:underline">
                    Terms of Service
                  </Link>{" "}
                  and{" "}
                  <Link to="/privacy" className="text-[#8C5A3C] hover:underline">
                    Privacy Policy
                  </Link>
                </label>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-gradient-to-r from-[#8C5A3C] to-[#2F6D66] text-white py-3 rounded-lg font-semibold hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? "Creating Account..." : "Create Account"}
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

              {/* Social Signup Buttons */}
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

            {/* Login Link */}
            <div className="text-center">
              <p className="text-gray-600">
                Already have an account?{" "}
                <Link to="/login" className="text-[#8C5A3C] hover:underline font-medium">
                  Sign in here
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

export default SignupPage;
