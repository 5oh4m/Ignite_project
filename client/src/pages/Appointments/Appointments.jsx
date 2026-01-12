import React, { useState } from 'react';
import { Calendar, Clock, MapPin, User, Plus, Phone } from 'lucide-react';
import { motion } from 'framer-motion';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import api from '../../services/api';
import toast from 'react-hot-toast';
import AppointmentDetailsModal from '../../components/features/AppointmentDetailsModal';
import BookAppointmentModal from '../../components/features/BookAppointmentModal';
import RescheduleModal from '../../components/features/RescheduleModal';

const Appointments = () => {
    const queryClient = useQueryClient();
    const [activeTab, setActiveTab] = useState('upcoming');
    const [selectedAppointment, setSelectedAppointment] = useState(null);
    const [isBookModalOpen, setIsBookModalOpen] = useState(false);
    const [rescheduleModalOpen, setRescheduleModalOpen] = useState(false);
    const [appointmentToReschedule, setAppointmentToReschedule] = useState(null);

    // Fetch Appointments
    const { data, isLoading } = useQuery({
        queryKey: ['my-appointments'],
        queryFn: async () => {
            const res = await api.get('/appointments/me'); // Fixed: Use /me for patient appointments
            return res.data.appointments;
        }
    });

    // Reschedule Mutation
    const rescheduleMutation = useMutation({
        mutationFn: async ({ id, date }) => {
            return await api.put(`/appointments/${id}/status`, {
                status: 'pending',
                remarks: `Rescheduled to ${date}`
            });
        },
        onSuccess: () => {
            queryClient.invalidateQueries(['my-appointments']);
            toast.success('Appointment rescheduled successfully');
            setRescheduleModalOpen(false);
        },
        onError: (error) => {
            toast.error(error.response?.data?.message || 'Failed to reschedule');
        }
    });

    const handleReschedule = (id, newDate, newTime) => {
        rescheduleMutation.mutate({ id, date: `${newDate} ${newTime}` });
        setAppointmentToReschedule(null);
    };

    const handleBookAppointment = () => {
        queryClient.invalidateQueries(['my-appointments']);
        setIsBookModalOpen(false);
    };

    const appointments = data || [];

    const filteredAppointments = appointments.filter(app => {
        const isPast = new Date(app.date) < new Date();
        if (activeTab === 'upcoming') {
            return !isPast || app.status === 'pending';
        }
        return isPast && app.status === 'completed';
    });

    if (isLoading) {
        return <div className="flex justify-center items-center h-screen">Loading appointments...</div>;
    }

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="flex justify-between items-center mb-8">
                <div>
                    <h1 className="text-3xl font-bold text-slate-900">Appointments</h1>
                    <p className="text-slate-500">Manage your visits and schedules</p>
                </div>
                <button
                    onClick={() => setIsBookModalOpen(true)}
                    className="flex items-center gap-2 bg-calm-blue text-white px-4 py-2.5 rounded-xl font-medium shadow-lg hover:bg-calm-blue-dark transition-all hover:-translate-y-0.5"
                >
                    <Plus className="w-5 h-5" />
                    Book New
                </button>
            </div>

            {/* Tabs */}
            <div className="flex space-x-4 border-b border-slate-200 mb-6">
                <button
                    onClick={() => setActiveTab('upcoming')}
                    className={`pb-3 px-4 text-sm font-medium transition-colors relative ${activeTab === 'upcoming' ? 'text-calm-blue' : 'text-slate-500 hover:text-slate-700'}`}
                >
                    Upcoming
                    {activeTab === 'upcoming' && <motion.div layoutId="activeTab" className="absolute bottom-0 left-0 right-0 h-0.5 bg-calm-blue" />}
                </button>
                <button
                    onClick={() => setActiveTab('past')}
                    className={`pb-3 px-4 text-sm font-medium transition-colors relative ${activeTab === 'past' ? 'text-calm-blue' : 'text-slate-500 hover:text-slate-700'}`}
                >
                    Past Visits
                    {activeTab === 'past' && <motion.div layoutId="activeTab" className="absolute bottom-0 left-0 right-0 h-0.5 bg-calm-blue" />}
                </button>
            </div>

            <div className="grid gap-4">
                {filteredAppointments.length === 0 ? (
                    <div className="text-center py-12 text-slate-500">
                        <p>No {activeTab} appointments found.</p>
                    </div>
                ) : (
                    filteredAppointments.map((app) => (
                        <motion.div
                            key={app._id}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="bg-white p-6 rounded-2xl border border-slate-100 flex flex-col md:flex-row gap-6 items-start md:items-center hover:shadow-md transition-shadow"
                        >
                            <div className="flex-shrink-0">
                                <div className="w-16 h-16 rounded-full bg-calm-blue/20 flex items-center justify-center text-calm-blue font-bold text-xl">
                                    {app.doctor?.user?.name?.charAt(0) || 'D'}
                                </div>
                            </div>

                            <div className="flex-grow grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
                                <div>
                                    <h3 className="text-lg font-bold text-slate-900">{app.doctor?.user?.name || 'Unknown Doctor'}</h3>
                                    <p className="text-calm-blue font-medium text-sm">{app.doctor?.specialization || 'General'}</p>
                                </div>

                                <div className="space-y-1">
                                    <div className="flex items-center gap-2 text-slate-600 text-sm">
                                        <Calendar className="w-4 h-4" />
                                        {new Date(app.date).toLocaleDateString()}
                                    </div>
                                    <div className="flex items-center gap-2 text-slate-600 text-sm">
                                        <Clock className="w-4 h-4" />
                                        {new Date(app.date).toLocaleTimeString()}
                                    </div>
                                </div>

                                <div className="flex items-center gap-2 text-slate-600 text-sm">
                                    <MapPin className="w-4 h-4 flex-shrink-0" />
                                    <span className="truncate">{app.hospital?.name || 'Hospital'}</span>
                                </div>
                            </div>

                            <div className="flex-shrink-0 w-full md:w-auto mt-4 md:mt-0">
                                {app.status === 'pending' ? (
                                    <div className="px-4 py-2 bg-amber-50 text-amber-600 rounded-lg text-sm font-bold border border-amber-100 flex items-center gap-2">
                                        <Clock className="w-4 h-4" />
                                        Confirm Pending
                                    </div>
                                ) : app.status === 'confirmed' ? (
                                    <div className="flex gap-2">
                                        <button
                                            onClick={() => {
                                                setAppointmentToReschedule(app);
                                                setRescheduleModalOpen(true);
                                            }}
                                            className="flex-1 md:flex-none px-4 py-2 border border-slate-200 text-slate-600 rounded-lg hover:bg-slate-50 text-sm font-medium"
                                        >
                                            Reschedule
                                        </button>
                                        <button
                                            onClick={() => setSelectedAppointment(app)}
                                            className="flex-1 md:flex-none px-4 py-2 bg-calm-blue/10 text-calm-blue rounded-lg hover:bg-calm-blue/20 text-sm font-medium"
                                        >
                                            Details
                                        </button>
                                    </div>
                                ) : (
                                    <button
                                        onClick={() => setSelectedAppointment(app)}
                                        className="w-full md:w-auto px-4 py-2 border border-slate-200 text-slate-600 rounded-lg hover:bg-slate-50 text-sm font-medium"
                                    >
                                        View Summary
                                    </button>
                                )}
                            </div>
                        </motion.div>
                    ))
                )}
            </div>

            <AppointmentDetailsModal
                isOpen={!!selectedAppointment}
                onClose={() => setSelectedAppointment(null)}
                appointment={selectedAppointment}
            />

            <BookAppointmentModal
                isOpen={isBookModalOpen}
                onClose={() => setIsBookModalOpen(false)}
                onSubmit={handleBookAppointment}
            />

            <RescheduleModal
                isOpen={rescheduleModalOpen}
                onClose={() => setRescheduleModalOpen(false)}
                appointment={appointmentToReschedule}
                onConfirm={handleReschedule}
            />
        </div>
    );
};

export default Appointments;
