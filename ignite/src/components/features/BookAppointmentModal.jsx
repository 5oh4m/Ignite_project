import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Building2, Stethoscope, FileText, CreditCard, Calendar, Clock } from 'lucide-react';

const BookAppointmentModal = ({ isOpen, onClose, onSubmit }) => {
    if (!isOpen) return null;

    const [formData, setFormData] = useState({
        hospital: '',
        department: '',
        date: '',
        time: '',
        note: '',
        paymentType: 'prepaid'
    });

    const handleSubmit = (e) => {
        e.preventDefault();

        // Create appointment object from form data
        const newAppointment = {
            doctor: "Dr. Assigned (" + formData.department + ")", // Temporary placeholder
            specialty: formData.department,
            date: formData.date,
            time: formData.time,
            location: formData.hospital,
            note: formData.note,
            paymentType: formData.paymentType
        };

        onSubmit(newAppointment);
        setFormData({ hospital: '', department: '', date: '', time: '', note: '', paymentType: 'prepaid' }); // Reset form
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
                        className="fixed inset-0 m-auto z-[10000] max-w-lg w-[95%] h-auto max-h-[85vh] bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col"
                    >
                        <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-slate-50">
                            <h2 className="text-xl font-bold text-slate-900">Book New Appointment</h2>
                            <button
                                onClick={onClose}
                                className="p-2 bg-white rounded-full hover:bg-slate-100 border border-slate-200 transition-colors"
                            >
                                <X className="w-5 h-5 text-slate-500" />
                            </button>
                        </div>

                        <div className="flex-1 overflow-y-auto p-6">
                            <form onSubmit={handleSubmit} className="space-y-6">
                                {/* Hospital Name */}
                                <div>
                                    <label className="block text-sm font-bold text-slate-700 mb-2 flex items-center gap-2">
                                        <Building2 className="w-4 h-4 text-calm-blue" />
                                        Hospital Name
                                    </label>
                                    <select
                                        className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-calm-blue focus:ring-2 focus:ring-calm-blue/20 outline-none transition-all text-slate-600 appearance-none bg-white"
                                        value={formData.hospital}
                                        onChange={(e) => setFormData({ ...formData, hospital: e.target.value })}
                                        required
                                    >
                                        <option value="">Select Hospital</option>
                                        <option value="Central City Hospital">Central City Hospital</option>
                                        <option value="Skin Care Clinic">Skin Care Clinic</option>
                                        <option value="Community Health Center">Community Health Center</option>
                                    </select>
                                </div>

                                {/* Department */}
                                <div>
                                    <label className="block text-sm font-bold text-slate-700 mb-2 flex items-center gap-2">
                                        <Stethoscope className="w-4 h-4 text-calm-blue" />
                                        Department
                                    </label>
                                    <select
                                        className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-calm-blue focus:ring-2 focus:ring-calm-blue/20 outline-none transition-all text-slate-600 appearance-none bg-white"
                                        value={formData.department}
                                        onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                                        required
                                    >
                                        <option value="">Select Department</option>
                                        <option value="Cardiology">Cardiology</option>
                                        <option value="Dermatology">Dermatology</option>
                                        <option value="General Medicine">General Medicine</option>
                                        <option value="Pediatrics">Pediatrics</option>
                                    </select>
                                </div>

                                {/* Date and Time Row */}
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-bold text-slate-700 mb-2 flex items-center gap-2">
                                            <Calendar className="w-4 h-4 text-calm-blue" />
                                            Preferred Date
                                        </label>
                                        <input
                                            type="date"
                                            className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-calm-blue focus:ring-2 focus:ring-calm-blue/20 outline-none transition-all text-slate-600 bg-white"
                                            value={formData.date}
                                            onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-bold text-slate-700 mb-2 flex items-center gap-2">
                                            <Clock className="w-4 h-4 text-calm-blue" />
                                            Preferred Time
                                        </label>
                                        <input
                                            type="time"
                                            className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-calm-blue focus:ring-2 focus:ring-calm-blue/20 outline-none transition-all text-slate-600 bg-white"
                                            value={formData.time}
                                            onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                                            required
                                        />
                                    </div>
                                </div>

                                {/* Short Note */}
                                <div>
                                    <label className="block text-sm font-bold text-slate-700 mb-2 flex items-center gap-2">
                                        <FileText className="w-4 h-4 text-calm-blue" />
                                        Short Note (Reason for visit)
                                    </label>
                                    <textarea
                                        className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-calm-blue focus:ring-2 focus:ring-calm-blue/20 outline-none transition-all text-slate-600 min-h-[100px] resize-none"
                                        placeholder="Briefly describe your symptoms..."
                                        value={formData.note}
                                        onChange={(e) => setFormData({ ...formData, note: e.target.value })}
                                    />
                                </div>

                                {/* Payment Options */}
                                <div>
                                    <label className="block text-sm font-bold text-slate-700 mb-3 flex items-center gap-2">
                                        <CreditCard className="w-4 h-4 text-calm-blue" />
                                        Payment Method
                                    </label>
                                    <div className="grid grid-cols-2 gap-4">
                                        <label
                                            className={`cursor-pointer border rounded-xl p-4 flex flex-col items-center justify-center gap-2 transition-all ${formData.paymentType === 'prepaid' ? 'border-calm-blue bg-calm-blue/5 ring-1 ring-calm-blue' : 'border-slate-200 hover:border-slate-300 hover:bg-slate-50'}`}
                                        >
                                            <input
                                                type="radio"
                                                name="paymentType"
                                                value="prepaid"
                                                checked={formData.paymentType === 'prepaid'}
                                                onChange={(e) => setFormData({ ...formData, paymentType: e.target.value })}
                                                className="hidden"
                                            />
                                            <span className="font-bold text-slate-900">Prepaid</span>
                                            <span className="text-xs text-slate-500">Pay now & save time</span>
                                        </label>

                                        <label
                                            className={`cursor-pointer border rounded-xl p-4 flex flex-col items-center justify-center gap-2 transition-all ${formData.paymentType === 'payAtClinic' ? 'border-calm-blue bg-calm-blue/5 ring-1 ring-calm-blue' : 'border-slate-200 hover:border-slate-300 hover:bg-slate-50'}`}
                                        >
                                            <input
                                                type="radio"
                                                name="paymentType"
                                                value="payAtClinic"
                                                checked={formData.paymentType === 'payAtClinic'}
                                                onChange={(e) => setFormData({ ...formData, paymentType: e.target.value })}
                                                className="hidden"
                                            />
                                            <span className="font-bold text-slate-900">Pay at Clinic</span>
                                            <span className="text-xs text-slate-500">Pay during visit</span>
                                        </label>
                                    </div>
                                </div>

                                <div className="pt-4">
                                    <button
                                        type="submit"
                                        className="w-full bg-calm-blue hover:bg-calm-blue-dark text-white font-bold py-3.5 rounded-xl shadow-lg shadow-calm-blue/30 transition-all hover:translate-y-[-2px] active:translate-y-0"
                                    >
                                        Confirm Booking
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

export default BookAppointmentModal;
