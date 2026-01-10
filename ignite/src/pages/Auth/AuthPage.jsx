import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Lock, User, ArrowRight, Github, Chrome } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

const AuthPage = () => {
    const location = useLocation();
    const [isLogin, setIsLogin] = useState(location.state?.isLogin ?? true);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: ''
    });
    const [errors, setErrors] = useState({});

    const validate = () => {
        const newErrors = {};
        if (!formData.email) newErrors.email = 'Email is required';
        if (!formData.password) newErrors.password = 'Password is required';
        if (!isLogin) {
            if (!formData.name) newErrors.name = 'Name is required';
            if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = 'Passwords do not match';
        }
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validate()) {
            console.log('Form submitted:', formData);
            // Mock login/signup logic here
        }
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        // Clear error when user types
        if (errors[e.target.name]) {
            setErrors({ ...errors, [e.target.name]: '' });
        }
    };

    return (
        <div className="min-h-[calc(100vh-5rem)] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-soft-white">
            <div className="max-w-md w-full space-y-8 glass p-8 rounded-3xl relative overflow-hidden">
                {/* Decorative background blobs */}
                <div className="absolute -top-10 -right-10 w-32 h-32 bg-calm-blue/20 rounded-full blur-2xl"></div>
                <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-emergency-red/10 rounded-full blur-2xl"></div>

                <div className="text-center relative z-10">
                    <motion.h2
                        key={isLogin ? 'login' : 'signup'}
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-3xl font-extrabold text-slate-900"
                    >
                        {isLogin ? 'Welcome Back' : 'Create Account'}
                    </motion.h2>
                    <p className="mt-2 text-sm text-slate-600">
                        {isLogin ? 'Sign in to access your healthcare portal' : 'Join our healthcare network today'}
                    </p>
                </div>

                <div className="relative z-10">
                    {/* Social Login */}
                    <div className="grid grid-cols-2 gap-3 mb-6">
                        <button className="flex items-center justify-center px-4 py-2 border border-slate-200 rounded-xl hover:bg-slate-50 transition-colors bg-white">
                            <Chrome className="w-5 h-5 mr-2 text-slate-700" />
                            <span className="text-sm font-medium text-slate-700">Google</span>
                        </button>
                        <button className="flex items-center justify-center px-4 py-2 border border-slate-200 rounded-xl hover:bg-slate-50 transition-colors bg-white">
                            <Github className="w-5 h-5 mr-2 text-slate-700" />
                            <span className="text-sm font-medium text-slate-700">GitHub</span>
                        </button>
                    </div>

                    <div className="relative mb-6">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-slate-200"></div>
                        </div>
                        <div className="relative flex justify-center text-sm">
                            <span className="px-2 bg-white/50 text-slate-500">Or continue with</span>
                        </div>
                    </div>

                    <form className="space-y-6" onSubmit={handleSubmit}>
                        <AnimatePresence mode="wait">
                            {!isLogin && (
                                <motion.div
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: 'auto' }}
                                    exit={{ opacity: 0, height: 0 }}
                                    className="overflow-hidden"
                                >
                                    <label className="block text-sm font-medium text-slate-700 mb-1">Full Name</label>
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                            <User className="h-5 w-5 text-slate-400" />
                                        </div>
                                        <input
                                            name="name"
                                            type="text"
                                            className={`block w-full pl-10 pr-3 py-2.5 border ${errors.name ? 'border-red-300 focus:ring-red-500 focus:border-red-500' : 'border-slate-300 focus:ring-calm-blue focus:border-calm-blue'} rounded-xl bg-white/50 placeholder-slate-400 focus:outline-none focus:ring-2 sm:text-sm transition-all`}
                                            placeholder="John Doe"
                                            value={formData.name}
                                            onChange={handleChange}
                                        />
                                    </div>
                                    {errors.name && <p className="mt-1 text-xs text-red-500">{errors.name}</p>}
                                </motion.div>
                            )}
                        </AnimatePresence>

                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">Email address</label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <Mail className="h-5 w-5 text-slate-400" />
                                </div>
                                <input
                                    name="email"
                                    type="email"
                                    className={`block w-full pl-10 pr-3 py-2.5 border ${errors.email ? 'border-red-300 focus:ring-red-500 focus:border-red-500' : 'border-slate-300 focus:ring-calm-blue focus:border-calm-blue'} rounded-xl bg-white/50 placeholder-slate-400 focus:outline-none focus:ring-2 sm:text-sm transition-all`}
                                    placeholder="you@example.com"
                                    value={formData.email}
                                    onChange={handleChange}
                                />
                            </div>
                            {errors.email && <p className="mt-1 text-xs text-red-500">{errors.email}</p>}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">Password</label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <Lock className="h-5 w-5 text-slate-400" />
                                </div>
                                <input
                                    name="password"
                                    type="password"
                                    className={`block w-full pl-10 pr-3 py-2.5 border ${errors.password ? 'border-red-300 focus:ring-red-500 focus:border-red-500' : 'border-slate-300 focus:ring-calm-blue focus:border-calm-blue'} rounded-xl bg-white/50 placeholder-slate-400 focus:outline-none focus:ring-2 sm:text-sm transition-all`}
                                    placeholder="••••••••"
                                    value={formData.password}
                                    onChange={handleChange}
                                />
                            </div>
                            {errors.password && <p className="mt-1 text-xs text-red-500">{errors.password}</p>}
                        </div>

                        <AnimatePresence>
                            {!isLogin && (
                                <motion.div
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: 'auto' }}
                                    exit={{ opacity: 0, height: 0 }}
                                    className="overflow-hidden"
                                >
                                    <label className="block text-sm font-medium text-slate-700 mb-1 opacity-0">Confirm Password</label> {/* Hidden label for spacing if needed, but keeping it tight */}
                                    <div className="relative mt-4"> {/* Added margin top manually */}
                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                            <Lock className="h-5 w-5 text-slate-400" />
                                        </div>
                                        <input
                                            name="confirmPassword"
                                            type="password"
                                            className={`block w-full pl-10 pr-3 py-2.5 border ${errors.confirmPassword ? 'border-red-300 focus:ring-red-500 focus:border-red-500' : 'border-slate-300 focus:ring-calm-blue focus:border-calm-blue'} rounded-xl bg-white/50 placeholder-slate-400 focus:outline-none focus:ring-2 sm:text-sm transition-all`}
                                            placeholder="Confirm Password"
                                            value={formData.confirmPassword}
                                            onChange={handleChange}
                                        />
                                    </div>
                                    {errors.confirmPassword && <p className="mt-1 text-xs text-red-500">{errors.confirmPassword}</p>}
                                </motion.div>
                            )}
                        </AnimatePresence>

                        <div>
                            <button
                                type="submit"
                                className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-xl text-white bg-calm-blue hover:bg-calm-blue-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-calm-blue transition-all shadow-lg hover:shadow-calm-blue/30"
                            >
                                {isLogin ? 'Sign In' : 'Create Account'}
                                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                            </button>
                        </div>
                    </form>

                    <div className="mt-6 text-center">
                        <p className="text-sm text-slate-600">
                            {isLogin ? "Don't have an account? " : "Already have an account? "}
                            <button
                                onClick={() => {
                                    setIsLogin(!isLogin);
                                    setErrors({});
                                }}
                                className="font-medium text-calm-blue hover:text-calm-blue-dark transition-colors focus:outline-none"
                            >
                                {isLogin ? 'Sign up' : 'Sign in'}
                            </button>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AuthPage;
