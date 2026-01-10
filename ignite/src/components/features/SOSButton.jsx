import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Phone } from 'lucide-react';
import DoctorListModal from './DoctorListModal';

const SOSButton = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <>
            <div className="relative group cursor-pointer" onClick={() => setIsModalOpen(true)}>
                <motion.div
                    animate={{
                        scale: [1, 1.1, 1],
                        boxShadow: [
                            "0 0 0 0px rgba(239, 68, 68, 0.4)",
                            "0 0 0 20px rgba(239, 68, 68, 0)",
                        ],
                    }}
                    transition={{
                        duration: 1.5,
                        repeat: Infinity,
                        ease: "easeInOut",
                    }}
                    className="absolute inset-0 bg-emergency-red rounded-full opacity-30 blur-md group-hover:bg-red-500"
                ></motion.div>
                <div className="relative w-24 h-24 bg-gradient-to-br from-emergency-red to-red-600 rounded-full flex items-center justify-center shadow-xl shadow-red-500/40 border-4 border-white transform transition-transform group-hover:scale-105 active:scale-95">
                    <div className="flex flex-col items-center text-white">
                        <span className="font-black text-2xl tracking-wider">SOS</span>
                        <Phone className="w-5 h-5 mt-1 animate-bounce" />
                    </div>
                </div>
            </div>
            <DoctorListModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
        </>
    );
};

export default SOSButton;
