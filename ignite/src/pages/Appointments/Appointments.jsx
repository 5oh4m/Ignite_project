import React, { useState } from 'react';
import { Calendar, Clock, MapPin, User, Plus, Phone } from 'lucide-react';
import { motion } from 'framer-motion';
import AppointmentDetailsModal from '../../components/features/AppointmentDetailsModal';
import BookAppointmentModal from '../../components/features/BookAppointmentModal';
import RescheduleModal from '../../components/features/RescheduleModal';

const initialAppointments = [
    {
        id: 1,
        doctor: "Dr. Izhar",
        specialty: "Cardiologist",
        date: "2023-10-25",
        time: "10:00 AM",
        location: "Central City Hospital",
        status: "Upcoming",
        mobile: "+1 (555) 123-4567",
        image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=100&h=100"
    },
    {
        id: 2,
        doctor: "Dr. Soham",
        specialty: "Dermatologist",
        date: "2023-10-28",
        time: "02:30 PM",
        location: "Skin Care Clinic",
        status: "Upcoming",
        mobile: "+1 (555) 987-6543",
        image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&q=80&w=100&h=100"
    },
    {
        id: 3,
        doctor: "Dr. Karishma",
        specialty: "General Physician",
        date: "2023-09-15",
        time: "09:00 AM",
        location: "Community Health Center",
        status: "Completed",
        mobile: "+1 (555) 456-7890",
        image: "https://images.unsplash.com/photo-1594824476967-48c8b964273f?auto=format&fit=crop&q=80&w=100&h=100"
    }
];

const Appointments = () => {
    const [appointments, setAppointments] = useState(initialAppointments);
    const [activeTab, setActiveTab] = useState('upcoming');
    const [selectedAppointment, setSelectedAppointment] = useState(null);
    const [isBookModalOpen, setIsBookModalOpen] = useState(false);
    const [rescheduleModalOpen, setRescheduleModalOpen] = useState(false);
    const [appointmentToReschedule, setAppointmentToReschedule] = useState(null);

    const handleReschedule = (id, newDate, newTime) => {
        setAppointments(appointments.map(app => {
            if (app.id === id) {
                return {
                    ...app,
                    date: newDate,
                    time: newTime,
                    status: 'Confirmation Pending' // Reset status
                };
            }
            return app;
        }));
        setRescheduleModalOpen(false);
        setAppointmentToReschedule(null);
    };

    const handleBookAppointment = (newAppointment) => {
        const appointment = {
            id: appointments.length + 1,
            ...newAppointment,
            status: 'Confirmation Pending',
            image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&q=80&w=100&h=100", // Default image
            mobile: "+1 (555) 000-0000" // Default mobile
        };
        setAppointments([appointment, ...appointments]);
        setIsBookModalOpen(false);
    };

    const filteredAppointments = appointments.filter(app => {
        if (activeTab === 'upcoming') {
            return app.status === 'Upcoming' || app.status === 'Confirmation Pending';
        }
        return app.status === 'Completed';
    });

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
                {filteredAppointments.map((app) => (
                    <motion.div
                        key={app.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-white p-6 rounded-2xl border border-slate-100 flex flex-col md:flex-row gap-6 items-start md:items-center hover:shadow-md transition-shadow"
                    >
                        <div className="flex-shrink-0">
                            <img src={app.image} alt={app.doctor} className="w-16 h-16 rounded-full object-cover border-2 border-white shadow-sm" />
                        </div>

                        <div className="flex-grow grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
                            <div>
                                <h3 className="text-lg font-bold text-slate-900">{app.doctor}</h3>
                                <p className="text-calm-blue font-medium text-sm">{app.specialty}</p>
                                <div className="flex items-center gap-2 text-slate-500 text-xs mt-1">
                                    <Phone className="w-3 h-3" />
                                    {app.mobile}
                                </div>
                            </div>

                            <div className="space-y-1">
                                <div className="flex items-center gap-2 text-slate-600 text-sm">
                                    <Calendar className="w-4 h-4" />
                                    {app.date}
                                </div>
                                <div className="flex items-center gap-2 text-slate-600 text-sm">
                                    <Clock className="w-4 h-4" />
                                    {app.time}
                                </div>
                            </div>

                            <div className="flex items-center gap-2 text-slate-600 text-sm">
                                <MapPin className="w-4 h-4 flex-shrink-0" />
                                <span className="truncate">{app.location}</span>
                            </div>
                        </div>

                        <div className="flex-shrink-0 w-full md:w-auto mt-4 md:mt-0">
                            {app.status === 'Confirmation Pending' ? (
                                <div className="px-4 py-2 bg-amber-50 text-amber-600 rounded-lg text-sm font-bold border border-amber-100 flex items-center gap-2">
                                    <Clock className="w-4 h-4" />
                                    Confirm Pending
                                </div>
                            ) : app.status === 'Upcoming' ? (
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
                ))}
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
