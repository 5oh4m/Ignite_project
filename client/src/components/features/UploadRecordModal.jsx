import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Upload, FileText } from 'lucide-react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import api from '../../services/api';
import toast from 'react-hot-toast';

const UploadRecordModal = ({ isOpen, onClose, patientId = null }) => {
    const queryClient = useQueryClient();
    const [formData, setFormData] = useState({
        title: '',
        type: 'lab_report',
        description: '',
        patientId: patientId || '',
        file: null
    });

    const uploadMutation = useMutation({
        mutationFn: async (data) => {
            const formDataObj = new FormData();
            formDataObj.append('title', data.title);
            formDataObj.append('type', data.type);
            formDataObj.append('description', data.description);
            // If patientId is null, it means upload for self? No, upload logic requires patientId
            // If admin/doctor, they must specify patientId. 
            // For now let's assume current user if missing? No, that's risky.
            // Let's assume this modal is mostly for Admin/Doctor uploading TO a patient.
            if (data.patientId) formDataObj.append('patientId', data.patientId);

            formDataObj.append('file', data.file);

            return await api.post('/records', formDataObj, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });
        },
        onSuccess: () => {
            toast.success('Record uploaded successfully');
            queryClient.invalidateQueries(['records']);
            onClose();
            setFormData({ title: '', type: 'lab_report', description: '', patientId: '', file: null });
        },
        onError: (err) => {
            toast.error(err.response?.data?.message || 'Upload failed');
        }
    });

    const handleFileChange = (e) => {
        if (e.target.files[0]) {
            setFormData({ ...formData, file: e.target.files[0] });
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!formData.file) return toast.error("Please select a file");
        // If patientId is not passed as prop, user must enter it manually (e.g. by MongoDB ID for now)
        // Ideally we would have a patient search/select dropdown here.
        uploadMutation.mutate(formData);
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
                        className="fixed inset-0 m-auto z-[10000] max-w-lg w-[95%] h-auto bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col"
                    >
                        <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-slate-50">
                            <h2 className="text-xl font-bold text-slate-900">Upload Medical Record</h2>
                            <button onClick={onClose}><X className="w-5 h-5 text-slate-500" /></button>
                        </div>

                        <div className="p-6">
                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div>
                                    <label className="block text-sm font-bold text-slate-700 mb-2">Record Title</label>
                                    <input
                                        type="text"
                                        className="w-full px-4 py-3 rounded-xl border border-slate-200 outline-none focus:border-calm-blue"
                                        placeholder="e.g., Blood Test Report"
                                        value={formData.title}
                                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                        required
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
                                            <option value="lab_report">Lab Report</option>
                                            <option value="prescription">Prescription</option>
                                            <option value="imaging">Imaging (X-Ray/MRI)</option>
                                            <option value="other">Other</option>
                                        </select>
                                    </div>
                                    {!patientId && (
                                        <div>
                                            <label className="block text-sm font-bold text-slate-700 mb-2">Patient ID</label>
                                            <input
                                                type="text"
                                                className="w-full px-4 py-3 rounded-xl border border-slate-200 outline-none"
                                                placeholder="MongoDB ID"
                                                value={formData.patientId}
                                                onChange={(e) => setFormData({ ...formData, patientId: e.target.value })}
                                                required
                                            />
                                        </div>
                                    )}
                                </div>

                                <div>
                                    <label className="block text-sm font-bold text-slate-700 mb-2">File (PDF/Image)</label>
                                    <div className="border-2 border-dashed border-slate-300 rounded-xl p-6 text-center hover:bg-slate-50 transition-colors cursor-pointer relative">
                                        <input
                                            type="file"
                                            onChange={handleFileChange}
                                            className="absolute inset-0 opacity-0 cursor-pointer"
                                            accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
                                        />
                                        <Upload className="w-8 h-8 text-slate-400 mx-auto mb-2" />
                                        <p className="text-sm text-slate-500">
                                            {formData.file ? formData.file.name : "Click to upload or drag and drop"}
                                        </p>
                                    </div>
                                </div>

                                <button
                                    type="submit"
                                    disabled={uploadMutation.isPending}
                                    className="w-full bg-calm-blue text-white font-bold py-3.5 rounded-xl shadow-lg shadow-calm-blue/30 hover:bg-calm-blue-dark transition-all"
                                >
                                    {uploadMutation.isPending ? 'Uploading...' : 'Upload Record'}
                                </button>
                            </form>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>,
        document.body
    );
};

export default UploadRecordModal;
