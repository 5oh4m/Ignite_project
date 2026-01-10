import React from 'react';
import ReactDOM from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Calendar, Clock, MapPin, FileText, Pill, Stethoscope, Download } from 'lucide-react';

const AppointmentDetailsModal = ({ isOpen, onClose, appointment }) => {
    if (!appointment) return null;

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
                        className="fixed inset-0 m-auto z-[10000] max-w-2xl w-[95%] h-auto max-h-[85vh] bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col"
                    >
                        <div className="p-6 border-b border-slate-100 flex justify-between items-start bg-slate-50">
                            <div>
                                <h2 className="text-2xl font-bold text-slate-900 mb-1">Appointment Summary</h2>
                                <p className="text-slate-500 text-sm">Reference ID: #{appointment.id}2023</p>
                            </div>
                            <button
                                onClick={onClose}
                                className="p-2 bg-white rounded-full hover:bg-slate-100 border border-slate-200 transition-colors"
                            >
                                <X className="w-5 h-5 text-slate-500" />
                            </button>
                        </div>

                        <div className="flex-1 overflow-y-auto p-6">
                            {/* Doctor Info */}
                            <div className="flex items-center gap-4 mb-8">
                                <img src={appointment.image} alt={appointment.doctor} className="w-20 h-20 rounded-2xl object-cover border border-slate-100 shadow-sm" />
                                <div>
                                    <h3 className="text-xl font-bold text-slate-900">{appointment.doctor}</h3>
                                    <p className="text-calm-blue font-medium">{appointment.specialty}</p>
                                    <div className="flex items-center gap-4 mt-2 text-sm text-slate-500">
                                        <span className="flex items-center gap-1.5"><Calendar className="w-4 h-4" /> {appointment.date}</span>
                                        <span className="flex items-center gap-1.5"><Clock className="w-4 h-4" /> {appointment.time}</span>
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-6">
                                {/* Diagnosis Section */}
                                <div className="bg-slate-50 rounded-2xl p-5 border border-slate-100">
                                    <h4 className="font-bold text-slate-900 mb-3 flex items-center gap-2">
                                        <Stethoscope className="w-5 h-5 text-calm-blue" />
                                        Diagnosis
                                    </h4>
                                    <p className="text-slate-600 leading-relaxed">
                                        Patient presented with mild arrhythmia and fatigue. ECG confirmed sinus tachycardia. BP slightly elevated at 135/85. Recommended lifestyle changes and started on low-dose beta blockers.
                                    </p>
                                </div>

                                {/* Prescription Section */}
                                <div className="bg-green-50 rounded-2xl p-5 border border-green-100">
                                    <h4 className="font-bold text-slate-900 mb-3 flex items-center gap-2">
                                        <Pill className="w-5 h-5 text-green-600" />
                                        Prescribed Medication
                                    </h4>
                                    <ul className="space-y-3">
                                        <li className="flex items-center justify-between bg-white p-3 rounded-xl border border-green-100 shadow-sm">
                                            <div>
                                                <p className="font-bold text-slate-800">Metoprolol</p>
                                                <p className="text-xs text-slate-500">25mg • Once daily (Morning)</p>
                                            </div>
                                            <span className="text-xs font-bold text-green-600 bg-green-50 px-2 py-1 rounded">2 Weeks</span>
                                        </li>
                                        <li className="flex items-center justify-between bg-white p-3 rounded-xl border border-green-100 shadow-sm">
                                            <div>
                                                <p className="font-bold text-slate-800">Vitamin D3</p>
                                                <p className="text-xs text-slate-500">1000 IU • Once daily</p>
                                            </div>
                                            <span className="text-xs font-bold text-green-600 bg-green-50 px-2 py-1 rounded">3 Months</span>
                                        </li>
                                    </ul>
                                </div>

                                {/* Next Steps */}
                                <div className="border border-slate-200 rounded-2xl p-5">
                                    <h4 className="font-bold text-slate-900 mb-3 flex items-center gap-2">
                                        <FileText className="w-5 h-5 text-slate-400" />
                                        Notes & Follow-up
                                    </h4>
                                    <ul className="list-disc list-inside text-slate-600 text-sm space-y-1 ml-1">
                                        <li>Avoid caffeine and heavy exercise for 1 week.</li>
                                        <li>Monitor blood pressure daily in the morning.</li>
                                        <li>Follow-up appointment scheduled for Nov 10, 2023.</li>
                                    </ul>
                                </div>
                            </div>
                        </div>

                        <div className="p-4 border-t border-slate-100 bg-white flex justify-end gap-3">
                            <button onClick={onClose} className="px-5 py-2.5 rounded-xl font-medium text-slate-600 hover:bg-slate-50 border border-transparent hover:border-slate-200 transition-all">
                                Close
                            </button>
                            <button className="px-5 py-2.5 rounded-xl font-medium bg-calm-blue text-white hover:bg-calm-blue-dark shadow-lg shadow-calm-blue/30 transition-all flex items-center gap-2">
                                <Download className="w-4 h-4" />
                                Download Summary
                            </button>
                        </div>
                    </motion.div>
                </>
            )}
        </ AnimatePresence>,
        document.body
    );
};

export default AppointmentDetailsModal;
