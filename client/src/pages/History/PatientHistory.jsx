import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, FileText, Activity, Pill, User, Clock, AlertCircle } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import api from '../../services/api';

const PatientHistory = () => {
    const { data: timelineData, isLoading } = useQuery({
        queryKey: ['timeline', 'me'],
        queryFn: async () => {
            const res = await api.get('/timeline');
            return res.data;
        },
    });

    const events = timelineData?.events || [];

    const getIcon = (type) => {
        switch (type) {
            case 'diagnosis': return <Activity className="w-5 h-5" />;
            case 'prescription': return <Pill className="w-5 h-5" />;
            case 'lab_report': return <FileText className="w-5 h-5" />;
            case 'surgery': return <AlertCircle className="w-5 h-5" />;
            default: return <Calendar className="w-5 h-5" />;
        }
    };

    const getColor = (type) => {
        switch (type) {
            case 'diagnosis': return 'bg-blue-100 text-blue-600';
            case 'prescription': return 'bg-green-100 text-green-600';
            case 'lab_report': return 'bg-purple-100 text-purple-600';
            case 'surgery': return 'bg-red-100 text-red-600';
            default: return 'bg-slate-100 text-slate-600';
        }
    };

    if (isLoading) return <div className="flex justify-center p-10">Loading history...</div>;

    return (
        <div className="max-w-4xl mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold text-slate-900 mb-8">Medical Timeline</h1>

            {events.length === 0 ? (
                <div className="text-center py-12 bg-slate-50 rounded-2xl border border-slate-200 border-dashed">
                    <Clock className="w-12 h-12 text-slate-300 mx-auto mb-3" />
                    <p className="text-slate-500">No medical history recorded yet.</p>
                </div>
            ) : (
                <div className="relative border-l-2 border-slate-200 ml-4 space-y-8">
                    {events.map((event, index) => (
                        <motion.div
                            key={event._id}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className="relative pl-8"
                        >
                            <div className={`absolute -left-[9px] top-0 w-4 h-4 rounded-full border-2 border-white ring-4 ring-slate-50 ${getColor(event.type).split(' ')[1].replace('text', 'bg')}`} />

                            <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
                                <div className="flex justify-between items-start mb-2">
                                    <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide ${getColor(event.type)}`}>
                                        {getIcon(event.type)}
                                        {event.type.replace('_', ' ')}
                                    </div>
                                    <span className="text-sm text-slate-400 font-medium">
                                        {new Date(event.date).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' })}
                                    </span>
                                </div>

                                <h3 className="text-xl font-bold text-slate-900 mb-2">{event.title}</h3>
                                <p className="text-slate-600 leading-relaxed mb-4">{event.description}</p>

                                {event.doctor && (
                                    <div className="flex items-center gap-2 pt-4 border-t border-slate-50">
                                        <div className="w-6 h-6 rounded-full bg-slate-100 flex items-center justify-center text-xs font-bold text-slate-500">
                                            Dr
                                        </div>
                                        <span className="text-sm text-slate-500 font-medium">Added by Dr. {event.doctor.name}</span>
                                    </div>
                                )}
                            </div>
                        </motion.div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default PatientHistory;
