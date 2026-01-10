import React from 'react';
import ReactDOM from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Phone, Star, MapPin } from 'lucide-react';

const doctors = [
    {
        id: 1,
        name: "Dr. Sarah Wilson",
        specialty: "Cardiologist",
        hospital: "Central City Hospital",
        distance: "0.8 km",
        rating: 4.9,
        image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=300&h=300"
    },
    {
        id: 2,
        name: "Dr. James Chen",
        specialty: "Emergency Medicine",
        hospital: "St. Mary's Medical Center",
        distance: "1.2 km",
        rating: 4.8,
        image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&q=80&w=300&h=300"
    },
    {
        id: 3,
        name: "Dr. Emily Rodriguez",
        specialty: "Trauma Surgeon",
        hospital: "General Hospital",
        distance: "2.5 km",
        rating: 4.9,
        image: "https://images.unsplash.com/photo-1594824476967-48c8b964273f?auto=format&fit=crop&q=80&w=300&h=300"
    }
];

const DoctorListModal = ({ isOpen, onClose }) => {
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
                            <p className="text-red-100 text-sm mt-1">Connecting you to nearest available doctors</p>
                        </div>

                        <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-slate-50">
                            {doctors.map((doctor) => (
                                <div key={doctor.id} className="bg-white p-4 rounded-xl shadow-sm border border-slate-100 flex gap-4">
                                    <img src={doctor.image} alt={doctor.name} className="w-16 h-16 rounded-lg object-cover" />
                                    <div className="flex-1">
                                        <div className="flex justify-between items-start">
                                            <div>
                                                <h3 className="font-bold text-slate-800">{doctor.name}</h3>
                                                <p className="text-sm text-calm-blue font-medium">{doctor.specialty}</p>
                                            </div>
                                            <div className="flex items-center gap-1 text-xs font-bold text-amber-500 bg-amber-50 px-2 py-1 rounded-full">
                                                <Star className="w-3 h-3 fill-current" />
                                                {doctor.rating}
                                            </div>
                                        </div>

                                        <div className="mt-2 flex items-center gap-2 text-xs text-slate-500">
                                            <MapPin className="w-3 h-3" />
                                            {doctor.hospital} • {doctor.distance}
                                        </div>
                                    </div>

                                    <button className="self-center p-3 bg-green-500 text-white rounded-full shadow-lg shadow-green-500/30 hover:bg-green-600 transition-transform active:scale-95">
                                        <Phone className="w-5 h-5" />
                                    </button>
                                </div>
                            ))}
                        </div>

                        <div className="p-4 border-t border-slate-100 bg-white text-center">
                            <p className="text-xs text-slate-500">
                                Wait time: <span className="font-bold text-green-500">~2 mins</span>
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
