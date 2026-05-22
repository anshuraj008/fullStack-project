import React, { useState } from "react";
import { IoLogIn as IoMdLogIn } from "react-icons/io5";
import { FaUser, FaLayerGroup, FaApple } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import api from "../../utils/api";
import { useAuth } from "../../utils/AuthContext";
const LoginModal = ({ onClose, onSuccess }) => {
    const [activeTab, setActiveTab] = useState("signin");
    const [accountType, setAccountType] = useState("customer");
    const { login } = useAuth();

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm px-4">
            {/* Scrollable & Hidden Scrollbar Container */}
            <div
                className="relative bg-white rounded-3xl shadow-2xl w-full max-w-md max-h-[90vh] overflow-y-scroll border border-gray-100 p-8 animate-fadeIn 
                   scrollbar-hide"
            >
                {/* ✕ Close Button */}
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-gray-400 hover:text-rose-500 transition"
                    aria-label="Close"
                >
                    ✕
                </button>

                {/* Header */}
                <div className="flex flex-col items-center mb-8">
                    <div className="bg-gradient-to-tr from-rose-400 to-rose-600 text-white w-14 h-14 flex items-center justify-center rounded-2xl shadow-lg">
                        <IoMdLogIn size={26} />
                    </div>
                    <h1 className="text-3xl font-bold mt-4 text-gray-900 tracking-tight">
                        {activeTab === "signin" ? "Welcome Back" : "Create Account"}
                    </h1>
                    <p className="text-gray-500 text-sm mt-1 text-center">
                        {activeTab === "signin"
                            ? "Sign in to continue your sweet journey 🍰"
                            : "Sign up to start designing and ordering cakes 🎂"}
                    </p>
                </div>

                {/* Account Type */}
                <div className="flex justify-center gap-3 mb-5">
                    <button
                        onClick={() => setAccountType("customer")}
                        className={`flex items-center gap-2 px-4 py-2 border rounded-lg text-sm font-medium transition-all duration-200 ${accountType === "customer"
                            ? "bg-rose-50 border-rose-400 text-rose-500 shadow-sm"
                            : "border-gray-300 text-gray-600 hover:bg-gray-50"
                            }`}
                    >
                        <FaUser size={14} /> Customer
                    </button>

                    <button
                        onClick={() => setAccountType("admin")}
                        className={`flex items-center gap-2 px-4 py-2 border rounded-lg text-sm font-medium transition-all duration-200 ${accountType === "admin"
                            ? "bg-rose-50 border-rose-400 text-rose-500 shadow-sm"
                            : "border-gray-300 text-gray-600 hover:bg-gray-50"
                            }`}
                    >
                        <FaLayerGroup size={14} /> Admin
                    </button>
                </div>

                <p className="text-center text-xs text-gray-500 mb-6">
                    {accountType === "customer"
                        ? "Access your orders and account settings."
                        : "Manage bakery operations and dashboards."}
                </p>

                {/* Sign In / Sign Up Tabs */}
                <div className="flex mb-6 border border-gray-200 rounded-xl overflow-hidden text-sm font-medium">
                    <button
                        className={`w-1/2 py-2 transition ${activeTab === "signin"
                            ? "bg-rose-500 text-white"
                            : "bg-gray-50 text-gray-600 hover:bg-gray-100"
                            }`}
                        onClick={() => setActiveTab("signin")}
                    >
                        Sign In
                    </button>
                    <button
                        className={`w-1/2 py-2 transition ${activeTab === "signup"
                            ? "bg-rose-500 text-white"
                            : "bg-gray-50 text-gray-600 hover:bg-gray-100"
                            }`}
                        onClick={() => setActiveTab("signup")}
                    >
                        Sign Up
                    </button>
                </div>

                {/* Form */}
                <form
                    className="space-y-4 pb-4"
                    onSubmit={(e) => {
                        e.preventDefault();
                        const form = e.currentTarget;
                        const email = form.querySelector('input[type="email"]').value;
                        const password = form.querySelector('input[name="password"]').value;
                        const confirm = form.querySelector('input[name="confirm"]')?.value;
                        const nameInput = form.querySelector('input[name="name"]');
                        const name = nameInput ? nameInput.value : undefined;

                        const run = async () => {
                            try {
                                if (activeTab === "signup") {
                                    if (!name || name.trim().length < 2) {
                                        alert("Please enter your name");
                                        return;
                                    }
                                    if (password !== confirm) {
                                        alert("Passwords do not match");
                                        return;
                                    }
                                }
                                if (activeTab ==="signup") {
                                    const res = await api.post("/api/auth/register", { name: name || email.split('@')[0], email, password, role: accountType });
                                    login(res.data.token, res.data.user);
                                } else {
                                    const res = await api.post("/api/auth/login", { email, password });
                                    login(res.data.token, res.data.user);
                                }
                                if (typeof onSuccess === "function") onSuccess();
                                if (typeof onClose === "function") onClose();
                            } catch (err) {
                                alert(err?.response?.data?.message || "Authentication failed");
                            }
                        };
                        run();
                    }}
                >
                    {activeTab === "signup" && (
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Full Name <span className="text-rose-500">*</span>
                            </label>
                            <input
                                type="text"
                                name="name"
                                placeholder="Your full name"
                                className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-400 focus:border-rose-400 transition-all"
                                required
                            />
                        </div>
                    )}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Email Address <span className="text-rose-500">*</span>
                        </label>
                        <input
                            type="email"
                            placeholder="your@email.com"
                            className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-400 focus:border-rose-400 transition-all"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Password <span className="text-rose-500">*</span>
                        </label>
                        <input
                            type="password"
                            name="password"
                            placeholder="Enter your password"
                            className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-400 focus:border-rose-400 transition-all"
                            required
                        />
                    </div>

                    {activeTab === "signup" && (
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Confirm Password <span className="text-rose-500">*</span>
                            </label>
                            <input
                                type="password"
                                name="confirm"
                                placeholder="Re-enter your password"
                                className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-400 focus:border-rose-400 transition-all"
                                required
                            />
                        </div>
                    )}

                    <div className="flex items-center justify-between text-sm">
                        <label className="flex items-center gap-2">
                            <input type="checkbox" className="accent-rose-500" />
                            <span>Remember me</span>
                        </label>
                        <button
                            type="button"
                            className="text-rose-500 hover:underline font-medium"
                        >
                            Forgot password?
                        </button>
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-gradient-to-r from-rose-400 to-rose-600 text-white py-2.5 rounded-lg font-semibold hover:shadow-lg transition-all"
                    >
                        {activeTab === "signin" ? "Sign In" : "Create Account"}
                    </button>
                </form>

                {/* OR Continue */}
                <div className="mt-6">
                    <div className="flex items-center justify-center relative mb-4">
                        <div className="absolute w-full border-t border-gray-200"></div>
                        <span className="relative z-10 bg-white text-xs text-gray-400 px-3">
                            OR CONTINUE WITH
                        </span>
                    </div>

                    <div className="flex justify-center gap-3">
                        <button className="flex items-center justify-center gap-2 w-full border border-gray-300 rounded-lg py-2 hover:bg-gray-50 transition">
                            <FcGoogle size={20} />
                            <span className="text-sm font-medium text-gray-700">Google</span>
                        </button>
                        <button className="flex items-center justify-center gap-2 w-full border border-gray-300 rounded-lg py-2 hover:bg-gray-50 transition">
                            <FaApple size={20} />
                            <span className="text-sm font-medium text-gray-700">Apple</span>
                        </button>
                    </div>

                    <p className="text-center text-xs text-gray-400 mt-6">
                        Secured with enterprise-grade encryption 🔒
                    </p>
                </div>

                {/* Footer */}
                <p className="text-center text-xs text-gray-400 mt-8 pb-4">
                    © 2025 <span className="text-rose-500 font-semibold">Cuppie Cake</span> — All rights reserved.
                </p>
            </div>
        </div>
    );
};

export default LoginModal;
