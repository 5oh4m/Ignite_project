import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Building2, Stethoscope, FileText, CreditCard, Calendar, Clock } from 'lucide-react';
import { useQuery, useMutation } from '@tanstack/react-query';
import api from '../../services/api';
import toast from 'react-hot-toast';

const BookAppointmentModal = ({ isOpen, onClose, onSubmit }) => {
    const [formData, setFormData] = useState({
        hospitalId: '',
        doctorId: '',
        date: '',
        time: '',
        reason: '',
    });

    // Fetch Hospitals
    const { data: hospitalsData } = useQuery({
        queryKey: ['hospitals'],
        queryFn: async () => {
            const res = await api.get('/hospitals');
            return res.data.hospitals;
        },
        enabled: isOpen,
    });

    // Fetch Doctors (simplified - in reality would filter by hospital)
    const { data: doctorsData } = useQuery({
        queryKey: ['doctors'],
        queryFn: async () => {
            // This endpoint doesn't exist yet - would need to create /api/doctors list endpoint
            return [];
        },
        enabled: false, // Disabled for now
    });

    // Book Mutation
    const bookMutation = useMutation({
        mutationFn: async (appointmentData) => {
            const dateTime = new Date(`${appointmentData.date}T${appointmentData.time}`);
            return await api.post('/appointments', {
                doctorId: appointmentData.doctorId,
                hospitalId: appointmentData.hospitalId,
                date: dateTime,
                reason: appointmentData.reason,
            });
        },
        onSuccess: () => {
            toast.success('Appointment booked successfully!');
            onSubmit();
            setFormData({ hospitalId: '', doctorId: '', date: '', time: '', reason: '' });
        },
        onError: (error) => {
            toast.error(error.response?.data?.message || 'Failed to book appointment');
        },
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        bookMutation.mutate(formData);
    };

    if (!isOpen) return null;

    const hospitals = hospitalsData || [];

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
                                        value={formData.hospitalId}
                                        onChange={(e) => setFormData({ ...formData, hospitalId: e.target.value })}
                                        required
                                    >
                                        <option value="">Select Hospital</option>
                                        {hospitals.map(h => (
                                            <option key={h._id} value={h._id}>{h.name}</option>
                                        ))}
                                    </select>
                                </div>

                                {/* Doctor - Placeholder for now */}
                                <div>
                                    <label className="block text-sm font-bold text-slate-700 mb-2 flex items-center gap-2">
                                        <Stethoscope className="w-4 h-4 text-calm-blue" />
                                        Department / Doctor
                                    </label>
                                    <input
                                        type="text"
                                        placeholder="Doctor ID (temporary)"
                                        className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-calm-blue focus:ring-2 focus:ring-calm-blue/20 outline-none transition-all text-slate-600 bg-white"
                                        value={formData.doctorId}
                                        onChange={(e) => setFormData({ ...formData, doctorId: e.target.value })}
                                        required
                                    />
                                    <p className="text-xs text-slate-500 mt-1">Enter doctor MongoDB ID (will be improved)</p>
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
                                            min={new Date().toISOString().split('T')[0]}
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

                                {/* Reason */}
                                <div>
                                    <label className="block text-sm font-bold text-slate-700 mb-2 flex items-center gap-2">
                                        <FileText className="w-4 h-4 text-calm-blue" />
                                        Reason for Visit
                                    </label>
                                    <textarea
                                        className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-calm-blue focus:ring-2 focus:ring-calm-blue/20 outline-none transition-all text-slate-600 min-h-[100px] resize-none"
                                        placeholder="Briefly describe your symptoms..."
                                        value={formData.reason}
                                        onChange={(e) => setFormData({ ...formData, reason: e.target.value })}
                                    />
                                </div>

                                <div className="pt-4">
                                    <button
                                        type="submit"
                                        disabled={bookMutation.isPending}
                                        className="w-full bg-calm-blue hover:bg-calm-blue-dark text-white font-bold py-3.5 rounded-xl shadow-lg shadow-calm-blue/30 transition-all hover:translate-y-[-2px] active:translate-y-0 disabled:opacity-70"
                                    >
                                        {bookMutation.isPending ? 'Booking...' : 'Confirm Booking'}
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
