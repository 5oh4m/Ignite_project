import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Calendar, Clock, FileText } from 'lucide-react';

const RescheduleModal = ({ isOpen, onClose, appointment, onConfirm }) => {
    if (!isOpen || !appointment) return null;

    const [formData, setFormData] = useState({
        date: '',
        time: '',
        reason: ''
    });

    useEffect(() => {
        if (appointment) {
            // Pre-fill with existing appointment details if needed, 
            // or leave empty for user to pick new ones.
            // Let's set the date to the current appointment date as a starting point.
            setFormData({
                date: appointment.date || '',
                time: appointment.time || '', // Note: format might need adjustment if time is 12h vs 24h
                reason: ''
            });
        }
    }, [appointment]);

    const handleSubmit = (e) => {
        e.preventDefault();
        onConfirm(appointment.id, formData.date, formData.time);
        onClose();
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
                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 20 }}
                        className="fixed inset-0 m-auto z-[10000] max-w-md w-[95%] h-auto bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col"
                    >
                        <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-slate-50">
                            <div>
                                <h2 className="text-xl font-bold text-slate-900">Reschedule Appointment</h2>
                                <p className="text-sm text-slate-500">with {appointment.doctor}</p>
                            </div>
                            <button
                                onClick={onClose}
                                className="p-2 bg-white rounded-full hover:bg-slate-100 border border-slate-200 transition-colors"
                            >
                                <X className="w-5 h-5 text-slate-500" />
                            </button>
                        </div>

                        <div className="p-6">
                            <form onSubmit={handleSubmit} className="space-y-6">
                                {/* New Date */}
                                <div>
                                    <label className="block text-sm font-bold text-slate-700 mb-2 flex items-center gap-2">
                                        <Calendar className="w-4 h-4 text-calm-blue" />
                                        New Date
                                    </label>
                                    <input
                                        type="date"
                                        className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-calm-blue focus:ring-2 focus:ring-calm-blue/20 outline-none transition-all text-slate-600 bg-white"
                                        value={formData.date}
                                        onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                                        required
                                    />
                                </div>

                                {/* New Time */}
                                <div>
                                    <label className="block text-sm font-bold text-slate-700 mb-2 flex items-center gap-2">
                                        <Clock className="w-4 h-4 text-calm-blue" />
                                        New Time
                                    </label>
                                    <input
                                        type="time"
                                        className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-calm-blue focus:ring-2 focus:ring-calm-blue/20 outline-none transition-all text-slate-600 bg-white"
                                        value={formData.time}
                                        onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                                        required
                                    />
                                </div>

                                {/* Reason (Optional) */}
                                <div>
                                    <label className="block text-sm font-bold text-slate-700 mb-2 flex items-center gap-2">
                                        <FileText className="w-4 h-4 text-calm-blue" />
                                        Reason for Reschedule (Optional)
                                    </label>
                                    <textarea
                                        className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-calm-blue focus:ring-2 focus:ring-calm-blue/20 outline-none transition-all text-slate-600 min-h-[80px] resize-none"
                                        placeholder="Briefly explain why..."
                                        value={formData.reason}
                                        onChange={(e) => setFormData({ ...formData, reason: e.target.value })}
                                    />
                                </div>

                                <div className="pt-2">
                                    <button
                                        type="submit"
                                        className="w-full bg-calm-blue hover:bg-calm-blue-dark text-white font-bold py-3.5 rounded-xl shadow-lg shadow-calm-blue/30 transition-all hover:translate-y-[-2px] active:translate-y-0"
                                    >
                                        Confirm Reschedule
                                    </button>
                                </div>
                            </form>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>,
        document.body
    );
};

export default RescheduleModal;
