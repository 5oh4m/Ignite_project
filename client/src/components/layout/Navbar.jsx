import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { HeartPulse, Menu, X, User } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const Navbar = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const [isOpen, setIsOpen] = useState(false);

    const handleLogout = async () => {
        await logout();
        navigate('/auth');
    };

    return (
        <nav className="fixed w-full z-50 transition-all duration-300 glass">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-20">
                    <div className="flex items-center">
                        <Link to="/" className="flex items-center gap-2 group">
                            <div className="p-2 bg-calm-blue/10 rounded-full group-hover:bg-calm-blue/20 transition-colors">
                                <HeartPulse className="w-8 h-8 text-calm-blue" />
                            </div>
                            <span className="text-2xl font-bold bg-gradient-to-r from-calm-blue to-blue-600 bg-clip-text text-transparent">
                                MedLink
                            </span>
                        </Link>
                    </div>

                    <div className="hidden md:block">
                        <div className="ml-10 flex items-center space-x-8">
                            <Link to="/" className="text-slate-600 hover:text-calm-blue px-3 py-2 rounded-md text-sm font-medium transition-colors">Home</Link>

                            {user && (
                                <>
                                    {user.role === 'patient' && (
                                        <>
                                            <Link to="/locator" className="text-slate-600 hover:text-calm-blue px-3 py-2 rounded-md text-sm font-medium transition-colors">Find Hospital</Link>
                                            <Link to="/appointments" className="text-slate-600 hover:text-calm-blue px-3 py-2 rounded-md text-sm font-medium transition-colors">MyAppointments</Link>
                                        </>
                                    )}
                                    {user.role === 'doctor' && (
                                        <Link to="/doctor/dashboard" className="text-slate-600 hover:text-calm-blue px-3 py-2 rounded-md text-sm font-medium transition-colors">Dashboard</Link>
                                    )}
                                    {user.role === 'admin' && (
                                        <Link to="/admin/dashboard" className="text-slate-600 hover:text-calm-blue px-3 py-2 rounded-md text-sm font-medium transition-colors">Admin Panel</Link>
                                    )}
                                </>
                            )}

                            {user ? (
                                <div className="flex items-center gap-4">
                                    <span className="text-sm font-medium text-slate-500 flex items-center gap-1">
                                        <User className="w-4 h-4" />
                                        {user.name}
                                    </span>
                                    <button
                                        onClick={handleLogout}
                                        className="bg-emergency-red/10 text-emergency-red border border-emergency-red/20 px-6 py-2.5 rounded-xl text-sm font-medium hover:bg-emergency-red hover:text-white transition-all shadow-sm"
                                    >
                                        Logout
                                    </button>
                                </div>
                            ) : (
                                <>
                                    <Link to="/auth" state={{ isLogin: true }} className="border border-calm-blue text-calm-blue px-6 py-2.5 rounded-xl text-sm font-medium hover:bg-calm-blue hover:text-white transition-all shadow-sm">Login</Link>
                                    <Link to="/auth" state={{ isLogin: false }} className="bg-calm-blue text-white px-6 py-2.5 rounded-xl text-sm font-medium hover:bg-calm-blue-dark transition-all shadow-lg hover:shadow-calm-blue/30 transform hover:-translate-y-0.5">
                                        Sign Up
                                    </Link>
                                </>
                            )}
                        </div>
                    </div>

                    <div className="-mr-2 flex md:hidden">
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="inline-flex items-center justify-center p-2 rounded-md text-slate-600 hover:text-calm-blue hover:bg-slate-100 focus:outline-none"
                        >
                            {isOpen ? <X className="block h-6 w-6" /> : <Menu className="block h-6 w-6" />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile menu */}
            {isOpen && (
                <div className="md:hidden glass border-t border-slate-100">
                    <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                        <Link to="/" className="text-slate-600 hover:text-calm-blue block px-3 py-2 rounded-md text-base font-medium">Home</Link>
                        {user ? (
                            <button onClick={handleLogout} className="text-left w-full text-emergency-red hover:bg-emergency-red/10 block px-3 py-2 rounded-md text-base font-medium">Logout</button>
                        ) : (
                            <Link to="/auth" className="text-slate-600 hover:text-calm-blue block px-3 py-2 rounded-md text-base font-medium">Login</Link>
                        )}
                    </div>
                </div>
            )}
        </nav>
    );
};

export default Navbar;
