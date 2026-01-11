import React, { useState } from 'react';
import { FileText, Download, Share2, Search, Filter, Upload, Plus } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import api from '../../services/api';
import { useAuth } from '../../context/AuthContext';
import toast from 'react-hot-toast';
import UploadRecordModal from '../../components/features/UploadRecordModal';

const HealthRecords = () => {
    const { user } = useAuth();
    const [searchTerm, setSearchTerm] = useState('');
    const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);

    const { data: recordsData, isLoading } = useQuery({
        queryKey: ['records', 'me'],
        queryFn: async () => {
            const res = await api.get('/records/me');
            return res.data;
        },
    });

    const handleDownload = async (recordId, fileName) => {
        try {
            const response = await api.get(`/records/${recordId}/download`, {
                responseType: 'blob',
            });
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', fileName);
            document.body.appendChild(link);
            link.click();
            link.remove();
        } catch (error) {
            toast.error('Failed to download file');
        }
    };

    const records = recordsData?.records || [];
    const filteredRecords = records.filter(r =>
        r.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        r.doctor?.name?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-slate-900">Health Records</h1>
                    <p className="text-slate-500">Access and download your medical documents</p>
                </div>
                <div className="flex items-center gap-3 w-full md:w-auto">
                    <div className="relative flex-grow md:flex-grow-0">
                        <Search className="absolute left-3 top-2.5 w-5 h-5 text-slate-400" />
                        <input
                            type="text"
                            placeholder="Search records..."
                            className="pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-calm-blue outline-none w-full md:w-64"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>

                    {(user?.role === 'admin' || user?.role === 'doctor') && (
                        <button
                            onClick={() => setIsUploadModalOpen(true)}
                            className="flex items-center gap-2 px-4 py-2.5 bg-calm-blue text-white rounded-xl hover:bg-calm-blue-dark transition-colors shadow-lg shadow-blue-500/20"
                        >
                            <Plus className="w-5 h-5" />
                            Upload Record
                        </button>
                    )}
                </div>
            </div>

            {isLoading ? (
                <div className="flex justify-center py-20">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-calm-blue"></div>
                </div>
            ) : filteredRecords.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredRecords.map((record) => (
                        <div key={record._id} className="bg-white p-6 rounded-2xl border border-slate-100 hover:shadow-lg transition-all group">
                            <div className="flex justify-between items-start mb-4">
                                <div className={`p-3 rounded-xl ${record.category === 'lab_report' ? 'bg-blue-50 text-blue-500' : 'bg-purple-50 text-purple-500'}`}>
                                    <FileText className="w-6 h-6" />
                                </div>
                                <div className="text-xs font-bold text-slate-400 bg-slate-50 px-2 py-1 rounded uppercase">
                                    {record.fileType}
                                </div>
                            </div>

                            <h3 className="text-lg font-bold text-slate-900 mb-1 line-clamp-1">{record.title}</h3>
                            <p className="text-sm text-slate-500 mb-4 capitalize">
                                {record.category.replace('_', ' ')} • {new Date(record.createdAt).toLocaleDateString()}
                            </p>

                            {record.doctor && (
                                <div className="flex items-center gap-2 mb-4">
                                    <div className="w-6 h-6 rounded-full bg-slate-100 flex items-center justify-center text-xs font-bold text-slate-500">
                                        Dr
                                    </div>
                                    <span className="text-sm text-slate-600">Dr. {record.doctor.name}</span>
                                </div>
                            )}

                            <div className="flex items-center justify-between pt-4 border-t border-slate-50">
                                <span className="text-xs text-slate-400 font-medium">
                                    Uploaded by {record.uploadedBy?.name}
                                </span>
                                <button
                                    onClick={() => handleDownload(record._id, `${record.title}.${record.fileType}`)}
                                    className="flex items-center gap-1.5 text-sm font-medium text-calm-blue hover:text-calm-blue-dark"
                                >
                                    <Download className="w-4 h-4" />
                                    Download
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="text-center py-20 bg-slate-50 rounded-3xl border-2 border-dashed border-slate-200">
                    <FileText className="w-16 h-16 text-slate-300 mx-auto mb-4" />
                    <h3 className="text-xl font-bold text-slate-900 mb-2">No Records Found</h3>
                    <p className="text-slate-500">You don't have any medical records yet.</p>
                </div>
            )}

            <UploadRecordModal
                isOpen={isUploadModalOpen}
                onClose={() => setIsUploadModalOpen(false)}
            />
        </div>
    );
};

export default HealthRecords;
