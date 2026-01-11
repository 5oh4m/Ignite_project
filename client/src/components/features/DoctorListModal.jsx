import React from 'react';
import ReactDOM from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Phone, Star, MapPin, Navigation } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import api from '../../services/api';

const DoctorListModal = ({ isOpen, onClose, userLocation }) => {

    const { data: hospitalsData, isLoading } = useQuery({
        queryKey: ['emergency-hospitals', userLocation],
        queryFn: async () => {
            const params = {};
            if (userLocation) {
                params.lat = userLocation.lat;
                params.lng = userLocation.lng;
                params.radius = 50; // 50km radius for emergency
            }
            const res = await api.get('/hospitals', { params });
            return res.data;
        },
        enabled: isOpen,
    });

    const hospitals = hospitalsData?.hospitals || [];

    const calculateDistance = (lat1, lon1, lat2, lon2) => {
        if (!lat1 || !lat2) return null;
        // Simple Haversine formula approximation or use API return if available
        // For now, if API handles sort by distance, we can rely on that order
        return "Nearby";
    };

    if (!isOpen) return null;

    return ReactDOM.createPortal(
        <AnimatePresence>
            {isOpen && (
                <>
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-[9999]"
                    />
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 20 }}
                        className="fixed inset-0 m-auto z-[10000] max-w-lg w-[95%] h-[80vh] bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col"
                    >
                        <div className="p-6 bg-gradient-to-r from-emergency-red to-red-600 text-white relative">
                            <button
                                onClick={onClose}
                                className="absolute top-4 right-4 p-2 bg-white/20 rounded-full hover:bg-white/30 transition-colors"
                            >
                                <X className="w-5 h-5" />
                            </button>
                            <h2 className="text-2xl font-bold flex items-center gap-2">
                                <span className="animate-pulse w-3 h-3 bg-white rounded-full"></span>
                                Emergency Response
                            </h2>
                            <p className="text-red-100 text-sm mt-1">
                                {userLocation ? "Locating nearest hospitals..." : "Showing all emergency centers"}
                            </p>
                        </div>

                        <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-slate-50">
                            {isLoading ? (
                                <div className="text-center py-10">
                                    <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-red-500 mx-auto mb-4"></div>
                                    <p className="text-slate-500">Connecting to emergency network...</p>
                                </div>
                            ) : hospitals.length > 0 ? (
                                hospitals.map((hospital) => (
                                    <div key={hospital._id} className="bg-white p-4 rounded-xl shadow-sm border border-slate-100 flex gap-4">
                                        <div className="w-16 h-16 rounded-lg bg-red-50 flex items-center justify-center text-red-500 flex-shrink-0">
                                            <Navigation className="w-8 h-8" />
                                        </div>
                                        <div className="flex-1">
                                            <div className="flex justify-between items-start">
                                                <div>
                                                    <h3 className="font-bold text-slate-800 line-clamp-1">{hospital.name}</h3>
                                                    <p className="text-xs text-slate-500 mt-1 line-clamp-2">
                                                        {hospital.address?.street}, {hospital.address?.city}
                                                    </p>
                                                </div>
                                            </div>

                                            <div className="mt-3 flex items-center gap-2">
                                                <a
                                                    href={`tel:${hospital.phone}`}
                                                    className="flex-1 bg-green-500 text-white py-2 px-3 rounded-lg flex items-center justify-center gap-2 text-sm font-bold shadow-lg shadow-green-500/20 active:scale-95 transition-transform"
                                                >
                                                    <Phone className="w-4 h-4" />
                                                    Call Now
                                                </a>
                                                <a
                                                    href={`https://www.google.com/maps/dir/?api=1&destination=${hospital.location?.coordinates[1]},${hospital.location?.coordinates[0]}`}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="bg-blue-500 text-white py-2 px-3 rounded-lg flex items-center justify-center gap-2 text-sm font-bold shadow-lg shadow-blue-500/20 active:scale-95 transition-transform"
                                                >
                                                    <Navigation className="w-4 h-4" />
                                                    Map
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <div className="text-center py-10">
                                    <p className="text-slate-500 mb-4">No hospitals found nearby.</p>
                                    <a
                                        href="tel:108"
                                        className="inline-flex items-center gap-2 bg-red-600 text-white px-6 py-3 rounded-xl font-bold shadow-lg hover:bg-red-700 transition-colors"
                                    >
                                        <Phone className="w-5 h-5" />
                                        Call National Emergency (108)
                                    </a>
                                </div>
                            )}
                        </div>

                        <div className="p-4 border-t border-slate-100 bg-white text-center">
                            <p className="text-xs text-slate-500">
                                Emergency services are available 24/7
                            </p>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>,
        document.body
    );
};

export default DoctorListModal;
