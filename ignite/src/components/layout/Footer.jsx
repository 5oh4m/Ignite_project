import React from 'react';
import { Phone, Mail, MapPin } from 'lucide-react';

const Footer = () => {
    return (
        <footer className="bg-slate-900 border-t border-slate-800 mt-auto">
            <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div>
                        <h3 className="text-lg font-semibold text-white mb-4">Emergency Support</h3>
                        <div className="flex items-center gap-2 text-emergency-red mb-2">
                            <Phone className="w-5 h-5" />
                            <span className="font-bold text-xl">911 / 112</span>
                        </div>
                        <p className="text-slate-400 text-sm">24/7 Ambulance & Emergency Services</p>
                    </div>

                    <div>
                        <h3 className="text-lg font-semibold text-white mb-4">Contact</h3>
                        <ul className="space-y-3">
                            <li className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors">
                                <Mail className="w-4 h-4" />
                                <span>support@medlink.com</span>
                            </li>
                            <li className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors">
                                <MapPin className="w-4 h-4" />
                                <span>123 Health Ave, Medical District</span>
                            </li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="text-lg font-semibold text-white mb-4">Quick Links</h3>
                        <ul className="space-y-2 text-slate-400">
                            <li><a href="#" className="hover:text-calm-blue transition-colors">About Us</a></li>
                            <li><a href="#" className="hover:text-calm-blue transition-colors">Privacy Policy</a></li>
                            <li><a href="#" className="hover:text-calm-blue transition-colors">Terms of Service</a></li>
                        </ul>
                    </div>
                </div>
                <div className="mt-8 pt-8 border-t border-slate-800 text-center text-slate-500 text-sm">
                    &copy; {new Date().getFullYear()} MedLink. All rights reserved.
                </div>
            </div>
        </footer>
    );
};

export default Footer;
