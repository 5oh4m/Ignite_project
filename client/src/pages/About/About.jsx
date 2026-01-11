import React from 'react';
import { motion } from 'framer-motion';
import { Heart, Shield, Clock, Users, Award, MapPin } from 'lucide-react';

const About = () => {
    return (
        <div className="bg-white">
            {/* Hero Section */}
            <div className="relative bg-calm-blue text-white py-24 overflow-hidden">
                <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl -translate-y-12 translate-x-12"></div>
                <div className="absolute bottom-0 left-0 w-72 h-72 bg-white/10 rounded-full blur-2xl -translate-x-12 translate-y-12"></div>

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-4xl md:text-5xl font-bold mb-6"
                    >
                        Reimagining Healthcare Accessibility
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-xl text-blue-100 max-w-3xl mx-auto"
                    >
                        MedLink connects patients with the best healthcare providers, ensuring timely medical attention and seamless record management.
                    </motion.p>
                </div>
            </div>

            {/* Mission Section */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
                <div className="text-center mb-16">
                    <span className="text-calm-blue font-bold tracking-wider uppercase text-sm">Our Mission</span>
                    <h2 className="text-3xl font-bold text-slate-900 mt-2">Healthcare for Everyone, Everywhere</h2>
                    <p className="text-slate-500 mt-4 max-w-2xl mx-auto">
                        We believe that access to quality healthcare should be simple, transparent, and immediate. Our platform bridges the gap between patients and providers.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {[
                        { icon: Clock, title: "Instant Booking", desc: "Book appointments in seconds with real-time doctor availability." },
                        { icon: Shield, title: "Secure Records", desc: "Your medical history is encrypted and accessible only to you and your doctors." },
                        { icon: MapPin, title: "Smart Locator", desc: "Find the nearest specialized care based on your location and needs." }
                    ].map((item, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className="p-8 rounded-3xl bg-slate-50 hover:bg-white hover:shadow-xl transition-all border border-slate-100"
                        >
                            <div className="w-14 h-14 bg-calm-blue/10 rounded-2xl flex items-center justify-center text-calm-blue mb-6">
                                <item.icon className="w-7 h-7" />
                            </div>
                            <h3 className="text-xl font-bold text-slate-900 mb-3">{item.title}</h3>
                            <p className="text-slate-600 leading-relaxed">{item.desc}</p>
                        </motion.div>
                    ))}
                </div>
            </div>

            {/* Stats Section */}
            <div className="bg-slate-900 text-white py-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
                        {[
                            { number: "10k+", label: "Active Patients" },
                            { number: "500+", label: "Specialist Doctors" },
                            { number: "50+", label: "Partner Hospitals" },
                            { number: "24/7", label: "Emergency Support" }
                        ].map((stat, index) => (
                            <div key={index}>
                                <div className="text-4xl font-bold text-calm-blue mb-2">{stat.number}</div>
                                <div className="text-slate-400">{stat.label}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default About;
