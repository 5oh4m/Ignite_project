import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Calendar, Clock, MapPin, FileText, Pill, Stethoscope, Download } from 'lucide-react';
import api from '../../services/api';
import toast from 'react-hot-toast';

const AppointmentDetailsModal = ({ isOpen, onClose, appointment }) => {
    const [isDownloading, setIsDownloading] = useState(false);

    if (!appointment) return null;

    const handleDownloadSummary = async () => {
        try {
            setIsDownloading(true);
            const response = await api.get(`/appointments/${appointment._id}/summary`, {
                responseType: 'blob',
            });
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', `Summary-${appointment._id}.pdf`);
            document.body.appendChild(link);
            link.click();
            link.remove();
            toast.success('Summary downloaded');
        } catch (error) {
            console.error(error);
            toast.error('Failed to download summary');
        } finally {
            setIsDownloading(false);
        }
    };

    const doctorName = appointment.doctor?.user?.name || 'Unknown Doctor';
    const specialization = appointment.doctor?.specialization || 'General Physician';
    const hospitalName = appointment.hospital?.name || 'Medical Center';
    const dateObj = new Date(appointment.date);
    const dateStr = dateObj.toLocaleDateString();
    const timeStr = dateObj.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const image = appointment.doctor?.user?.image || 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&q=80&w=300&h=300';

    // Fallback notes if none exist
    const notes = appointment.notes || "No clinical notes available for this visit.";

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
                                <p className="text-slate-500 text-sm">Reference ID: #{appointment._id.substring(20)}</p>
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
                                <img src={image} alt={doctorName} className="w-20 h-20 rounded-2xl object-cover border border-slate-100 shadow-sm" />
                                <div>
                                    <h3 className="text-xl font-bold text-slate-900">Dr. {doctorName}</h3>
                                    <p className="text-calm-blue font-medium">{specialization}</p>
                                    <p className="text-sm text-slate-500">{hospitalName}</p>
                                    <div className="flex items-center gap-4 mt-2 text-sm text-slate-500">
                                        <span className="flex items-center gap-1.5"><Calendar className="w-4 h-4" /> {dateStr}</span>
                                        <span className="flex items-center gap-1.5"><Clock className="w-4 h-4" /> {timeStr}</span>
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-6">
                                {/* Diagnosis Section */}
                                <div className="bg-slate-50 rounded-2xl p-5 border border-slate-100">
                                    <h4 className="font-bold text-slate-900 mb-3 flex items-center gap-2">
                                        <Stethoscope className="w-5 h-5 text-calm-blue" />
                                        Clinical Notes & Diagnosis
                                    </h4>
                                    <p className="text-slate-600 leading-relaxed whitespace-pre-line">
                                        {notes}
                                    </p>
                                </div>

                                {/* Status */}
                                <div className={`p-4 rounded-xl border ${appointment.status === 'completed' ? 'bg-green-50 border-green-100 text-green-700' :
                                        appointment.status === 'cancelled' ? 'bg-red-50 border-red-100 text-red-700' :
                                            appointment.status === 'confirmed' ? 'bg-blue-50 border-blue-100 text-blue-700' :
                                                'bg-yellow-50 border-yellow-100 text-yellow-700'
                                    }`}>
                                    <p className="font-bold uppercase tracking-wide text-xs">Status: {appointment.status}</p>
                                </div>
                            </div>
                        </div>

                        <div className="p-4 border-t border-slate-100 bg-white flex justify-end gap-3">
                            <button onClick={onClose} className="px-5 py-2.5 rounded-xl font-medium text-slate-600 hover:bg-slate-50 border border-transparent hover:border-slate-200 transition-all">
                                Close
                            </button>
                            {appointment.status === 'completed' && (
                                <button
                                    onClick={handleDownloadSummary}
                                    disabled={isDownloading}
                                    className="px-5 py-2.5 rounded-xl font-medium bg-calm-blue text-white hover:bg-calm-blue-dark shadow-lg shadow-calm-blue/30 transition-all flex items-center gap-2 disabled:opacity-50"
                                >
                                    <Download className="w-4 h-4" />
                                    {isDownloading ? 'Generating...' : 'Download Summary'}
                                </button>
                            )}
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>,
        document.body
    );
};

export default AppointmentDetailsModal;
