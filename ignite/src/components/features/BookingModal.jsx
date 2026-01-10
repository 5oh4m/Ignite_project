import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Calendar, CreditCard, CheckCircle } from 'lucide-react';

const BookingModal = ({ isOpen, onClose, hospital }) => {
    const [step, setStep] = useState(1);
    const [loading, setLoading] = useState(false);

    if (!hospital) return null;

    const handlePayment = (e) => {
        e.preventDefault();
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
            setStep(2);
        }, 2000);
    };

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
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        className="fixed inset-0 m-auto z-[10000] max-w-md w-[95%] h-auto max-h-[90vh] bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col"
                    >
                        <div className="p-4 border-b border-slate-100 flex justify-between items-center bg-slate-50">
                            <h3 className="font-bold text-slate-900">Book Bed</h3>
                            <button onClick={onClose}><X className="w-5 h-5 text-slate-500" /></button>
                        </div>

                        <div className="p-6 overflow-y-auto">
                            {step === 1 ? (
                                <>
                                    <div className="mb-6">
                                        <h4 className="text-lg font-bold text-slate-800 mb-1">{hospital.name}</h4>
                                        <p className="text-sm text-slate-500">Emergency Ward Booking</p>
                                        <div className="mt-4 p-4 bg-blue-50 rounded-xl border border-blue-100">
                                            <div className="flex justify-between text-sm mb-2">
                                                <span className="text-slate-600">Booking Fee</span>
                                                <span className="font-bold text-slate-900">$50.00</span>
                                            </div>
                                            <div className="flex justify-between text-sm">
                                                <span className="text-slate-600">Tax</span>
                                                <span className="font-bold text-slate-900">$5.00</span>
                                            </div>
                                            <div className="flex justify-between text-lg font-bold mt-2 pt-2 border-t border-blue-200">
                                                <span className="text-calm-blue">Total</span>
                                                <span className="text-calm-blue">$55.00</span>
                                            </div>
                                        </div>
                                    </div>

                                    <form onSubmit={handlePayment} className="space-y-4">
                                        <div>
                                            <label className="block text-sm font-medium text-slate-700 mb-1">Card Number</label>
                                            <div className="relative">
                                                <CreditCard className="absolute left-3 top-3 w-5 h-5 text-slate-400" />
                                                <input type="text" placeholder="0000 0000 0000 0000" className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-xl focus:ring-2 focus:ring-calm-blue focus:border-calm-blue outline-none" required />
                                            </div>
                                        </div>
                                        <div className="grid grid-cols-2 gap-4">
                                            <div>
                                                <label className="block text-sm font-medium text-slate-700 mb-1">Expiry</label>
                                                <input type="text" placeholder="MM/YY" className="w-full px-4 py-2 border border-slate-300 rounded-xl focus:ring-2 focus:ring-calm-blue focus:border-calm-blue outline-none" required />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-slate-700 mb-1">CVC</label>
                                                <input type="text" placeholder="123" className="w-full px-4 py-2 border border-slate-300 rounded-xl focus:ring-2 focus:ring-calm-blue focus:border-calm-blue outline-none" required />
                                            </div>
                                        </div>

                                        <button
                                            type="submit"
                                            disabled={loading}
                                            className="w-full py-3 bg-calm-blue text-white rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-calm-blue-dark transition-colors disabled:opacity-70"
                                        >
                                            {loading ? <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" /> : "Pay & Book"}
                                        </button>
                                    </form>
                                </>
                            ) : (
                                <div className="text-center py-8">
                                    <div className="w-20 h-20 bg-green-100 text-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
                                        <CheckCircle className="w-10 h-10" />
                                    </div>
                                    <h4 className="text-2xl font-bold text-slate-900 mb-2">Booking Confirmed!</h4>
                                    <p className="text-slate-600 mb-6">Your bed at {hospital.name} has been reserved.</p>
                                    <button onClick={onClose} className="w-full py-3 bg-slate-100 text-slate-700 font-bold rounded-xl hover:bg-slate-200 transition-colors">
                                        Close
                                    </button>
                                </div>
                            )}
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>,
        document.body
    );
};

export default BookingModal;
