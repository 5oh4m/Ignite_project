import React from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import api from '../../services/api';
import { Users, Calendar, Activity, CheckCircle, XCircle, Search, User, Clock } from 'lucide-react';
import toast from 'react-hot-toast';

const AdminDashboard = () => {
    const queryClient = useQueryClient();
    const [activeTab, setActiveTab] = React.useState('appointments'); // appointments, patients

    // Fetch pending appointments
    const { data: appointmentsData, isLoading } = useQuery({
        queryKey: ['appointments', 'pending'],
        queryFn: async () => {
            const res = await api.get('/appointments?status=pending');
            return res.data;
        },
    });

    // Fetch All Patients
    const { data: patientsData, isLoading: isPatientsLoading } = useQuery({
        queryKey: ['admin-patients'],
        queryFn: async () => {
            const res = await api.get('/admin/patients');
            return res.data;
        }
    });

    // Mutation for status update
    const statusMutation = useMutation({
        mutationFn: async ({ id, status }) => {
            return await api.put(`/appointments/${id}/status`, { status });
        },
        onSuccess: () => {
            toast.success('Appointment updated');
            queryClient.invalidateQueries(['appointments']);
        },
        onError: () => toast.error('Failed to update status'),
    });

    const pendingAppointments = appointmentsData?.appointments || [];
    const allPatients = patientsData?.patients || [];

    const handleAction = (id, status) => {
        if (window.confirm(`Are you sure you want to ${status} this appointment?`)) {
            statusMutation.mutate({ id, status });
        }
    };

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-bold text-slate-900">Admin Portal</h1>
                <div className="flex bg-slate-100 p-1 rounded-xl">
                    <button
                        onClick={() => setActiveTab('appointments')}
                        className={`px-4 py-2 rounded-lg text-sm font-bold transition-all ${activeTab === 'appointments' ? 'bg-white shadow-sm text-slate-900' : 'text-slate-500 hover:text-slate-700'}`}
                    >
                        Approvals
                    </button>
                    <button
                        onClick={() => setActiveTab('patients')}
                        className={`px-4 py-2 rounded-lg text-sm font-bold transition-all ${activeTab === 'patients' ? 'bg-white shadow-sm text-slate-900' : 'text-slate-500 hover:text-slate-700'}`}
                    >
                        All Patients
                    </button>
                </div>
            </div>

            {/* Stats Cards - Mocked for now, can be real API later */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
                    <div className="flex items-center gap-4">
                        <div className="p-3 bg-blue-100 text-blue-600 rounded-full">
                            <Users className="w-6 h-6" />
                        </div>
                        <div>
                            <p className="text-sm text-slate-500">Total Users</p>
                            <p className="text-2xl font-bold">1,254</p>
                        </div>
                    </div>
                </div>
                <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
                    <div className="flex items-center gap-4">
                        <div className="p-3 bg-green-100 text-green-600 rounded-full">
                            <Calendar className="w-6 h-6" />
                        </div>
                        <div>
                            <p className="text-sm text-slate-500">Appointments Today</p>
                            <p className="text-2xl font-bold">45</p>
                        </div>
                    </div>
                </div>
                <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
                    <div className="flex items-center gap-4">
                        <div className="p-3 bg-purple-100 text-purple-600 rounded-full">
                            <Activity className="w-6 h-6" />
                        </div>
                        <div>
                            <p className="text-sm text-slate-500">Active Doctors</p>
                            <p className="text-2xl font-bold">28</p>
                        </div>
                    </div>
                </div>
            </div>

            {activeTab === 'appointments' && (
                <div className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden">
                    <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-slate-50">
                        <h2 className="text-lg font-bold text-slate-800 flex items-center gap-2">
                            <Clock className="w-5 h-5 text-orange-500" />
                            Pending Approvals
                        </h2>
                        <span className="bg-orange-100 text-orange-600 px-3 py-1 rounded-full text-xs font-bold">
                            {pendingAppointments.length} Pending
                        </span>
                    </div>

                    <div className="overflow-x-auto">
                        {isLoading ? (
                            <div className="p-8 text-center"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-slate-800 mx-auto"></div></div>
                        ) : pendingAppointments.length > 0 ? (
                            <table className="w-full text-left text-sm">
                                <thead className="bg-slate-50 text-slate-500 uppercase font-semibold">
                                    <tr>
                                        <th className="px-6 py-4">Patient</th>
                                        <th className="px-6 py-4">Doctor</th>
                                        <th className="px-6 py-4">Date & Time</th>
                                        <th className="px-6 py-4">Reason</th>
                                        <th className="px-6 py-4 text-right">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-100">
                                    {pendingAppointments.map((app) => (
                                        <tr key={app._id} className="hover:bg-slate-50 transition-colors">
                                            <td className="px-6 py-4 font-medium text-slate-900">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center">
                                                        <User className="w-4 h-4 text-slate-500" />
                                                    </div>
                                                    {app.patient?.name || 'Unknown User'}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 text-slate-600">
                                                Dr. {app.doctor?.user?.name || 'Unknown'}
                                            </td>
                                            <td className="px-6 py-4 text-slate-600">
                                                {new Date(app.date).toLocaleString()}
                                            </td>
                                            <td className="px-6 py-4 text-slate-500 max-w-xs truncate">
                                                {app.reason}
                                            </td>
                                            <td className="px-6 py-4 text-right">
                                                <div className="flex items-center justify-end gap-2">
                                                    <button
                                                        onClick={() => handleAction(app._id, 'confirmed')}
                                                        className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors tooltip"
                                                        title="Approve"
                                                    >
                                                        <CheckCircle className="w-5 h-5" />
                                                    </button>
                                                    <button
                                                        onClick={() => handleAction(app._id, 'cancelled')}
                                                        className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors tooltip"
                                                        title="Reject"
                                                    >
                                                        <XCircle className="w-5 h-5" />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        ) : (
                            <div className="p-12 text-center text-slate-500">
                                <CheckCircle className="w-12 h-12 text-slate-200 mx-auto mb-4" />
                                <p>All caught up! No pending approvals.</p>
                            </div>
                        )}
                    </div>
                </div>
            )}

            {/* Patients List Section */}
            {activeTab === 'patients' && (
                <div className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden mt-8">
                    <div className="p-6 border-b border-slate-100 bg-slate-50">
                        <h2 className="text-lg font-bold text-slate-800 flex items-center gap-2">
                            <Users className="w-5 h-5 text-calm-blue" />
                            Registered Patients directory
                        </h2>
                    </div>

                    <div className="overflow-x-auto">
                        {isPatientsLoading ? (
                            <div className="p-8 text-center"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-slate-800 mx-auto"></div></div>
                        ) : (
                            <table className="w-full text-left text-sm">
                                <thead className="bg-slate-50 text-slate-500 uppercase font-semibold">
                                    <tr>
                                        <th className="px-6 py-4">Name</th>
                                        <th className="px-6 py-4">Email</th>
                                        <th className="px-6 py-4">Joined</th>
                                        <th className="px-6 py-4 text-right">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-100">
                                    {allPatients.map(patient => (
                                        <tr key={patient._id} className="hover:bg-slate-50 transition-colors">
                                            <td className="px-6 py-4 font-bold text-slate-900">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-8 h-8 rounded-full bg-calm-blue/10 text-calm-blue flex items-center justify-center font-bold">
                                                        {patient.name?.charAt(0)}
                                                    </div>
                                                    {patient.name}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 text-slate-600">{patient.email}</td>
                                            <td className="px-6 py-4 text-slate-400">{new Date(patient.createdAt).toLocaleDateString()}</td>
                                            <td className="px-6 py-4 text-right">
                                                <button className="text-calm-blue font-bold hover:underline">View Profile</button>
                                            </td>
                                        </tr>
                                    ))}
                                    {allPatients.length === 0 && (
                                        <tr>
                                            <td colSpan="4" className="p-8 text-center text-slate-500">No registered patients found.</td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};


export default AdminDashboard;
