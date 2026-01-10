import React from 'react';
import { Link } from 'react-router-dom';
import { HeartPulse, Menu, X } from 'lucide-react';
import { useState } from 'react';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);

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
                        <div className="ml-10 flex items-baseline space-x-8">
                            <Link to="/" className="text-slate-600 hover:text-calm-blue px-3 py-2 rounded-md text-sm font-medium transition-colors">Home</Link>
                            <Link to="/locator" className="text-slate-600 hover:text-calm-blue px-3 py-2 rounded-md text-sm font-medium transition-colors">Find Hospital</Link>
                            <Link to="/auth" state={{ isLogin: true }} className="border border-calm-blue text-calm-blue px-6 py-2.5 rounded-xl text-sm font-medium hover:bg-calm-blue hover:text-white transition-all shadow-sm">Login</Link>
                            <Link to="/auth" state={{ isLogin: false }} className="bg-calm-blue text-white px-6 py-2.5 rounded-xl text-sm font-medium hover:bg-calm-blue-dark transition-all shadow-lg hover:shadow-calm-blue/30 transform hover:-translate-y-0.5">
                                Sign Up
                            </Link>
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
                        <Link to="/locator" className="text-slate-600 hover:text-calm-blue block px-3 py-2 rounded-md text-base font-medium">Find Hospital</Link>
                        <Link to="/auth" state={{ isLogin: true }} className="text-slate-600 hover:text-calm-blue block px-3 py-2 rounded-md text-base font-medium">Login</Link>
                        <Link to="/auth" state={{ isLogin: false }} className="text-slate-600 hover:text-calm-blue block px-3 py-2 rounded-md text-base font-medium">Sign Up</Link>
                    </div>
                </div>
            )}
        </nav>
    );
};

export default Navbar;
