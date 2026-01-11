import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Save, Clock } from 'lucide-react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import api from '../../services/api';
import toast from 'react-hot-toast';

const AddTimelineEventModal = ({ isOpen, onClose, patientId }) => {
    const queryClient = useQueryClient();
    const [formData, setFormData] = useState({
        title: '',
        type: 'visit', // diagnosis, surgery, prescription, visit, other
        description: '',
        date: new Date().toISOString().split('T')[0]
    });

    const addEventMutation = useMutation({
        mutationFn: async (data) => {
            return await api.post('/timeline', { ...data, patientId });
        },
        onSuccess: () => {
            toast.success('Timeline event added');
            queryClient.invalidateQueries(['timeline', patientId]);
            onClose();
            setFormData({ title: '', type: 'visit', description: '', date: new Date().toISOString().split('T')[0] });
        },
        onError: (err) => {
            toast.error(err.response?.data?.message || 'Failed to add event');
        }
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        addEventMutation.mutate(formData);
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
                        className="fixed inset-0 m-auto z-[10000] max-w-md w-[95%] h-auto bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col"
                    >
                        <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-slate-50">
                            <h2 className="text-xl font-bold text-slate-900">Add Medical History</h2>
                            <button onClick={onClose}><X className="w-5 h-5 text-slate-500" /></button>
                        </div>

                        <form onSubmit={handleSubmit} className="p-6 space-y-4">
                            <div>
                                <label className="block text-sm font-bold text-slate-700 mb-2">Event Title</label>
                                <input
                                    type="text"
                                    required
                                    placeholder="e.g., Viral Fever Diagnosis"
                                    className="w-full px-4 py-3 rounded-xl border border-slate-200 outline-none focus:border-calm-blue"
                                    value={formData.title}
                                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-bold text-slate-700 mb-2">Type</label>
                                    <select
                                        className="w-full px-4 py-3 rounded-xl border border-slate-200 outline-none bg-white"
                                        value={formData.type}
                                        onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                                    >
                                        <option value="visit">Visit</option>
                                        <option value="diagnosis">Diagnosis</option>
                                        <option value="surgery">Surgery</option>
                                        <option value="prescription">Prescription</option>
                                        <option value="lab_report">Lab Report</option>
                                        <option value="other">Other</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm font-bold text-slate-700 mb-2">Date</label>
                                    <input
                                        type="date"
                                        required
                                        className="w-full px-4 py-3 rounded-xl border border-slate-200 outline-none"
                                        value={formData.date}
                                        onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-bold text-slate-700 mb-2">Description</label>
                                <textarea
                                    rows={3}
                                    className="w-full px-4 py-3 rounded-xl border border-slate-200 outline-none focus:border-calm-blue"
                                    placeholder="Details about the event..."
                                    value={formData.description}
                                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                />
                            </div>

                            <button
                                type="submit"
                                disabled={addEventMutation.isPending}
                                className="w-full bg-calm-blue text-white font-bold py-3.5 rounded-xl shadow-lg shadow-calm-blue/30 hover:bg-calm-blue-dark transition-all flex items-center justify-center gap-2"
                            >
                                <Save className="w-5 h-5" />
                                {addEventMutation.isPending ? 'Saving...' : 'Save Record'}
                            </button>
                        </form>
                    </motion.div>
                </>
            )}
        </AnimatePresence>,
        document.body
    );
};

export default AddTimelineEventModal;
