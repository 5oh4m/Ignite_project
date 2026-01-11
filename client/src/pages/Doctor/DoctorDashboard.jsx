import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import api from '../../services/api';
import { Calendar, Clock, User, FileText, CheckCircle, XCircle, Upload, Plus } from 'lucide-react';
import toast from 'react-hot-toast';
import UploadRecordModal from '../../components/features/UploadRecordModal';
import AddTimelineEventModal from '../../components/features/AddTimelineEventModal';

const DoctorDashboard = () => {
    const queryClient = useQueryClient();
    const [selectedAppointment, setSelectedAppointment] = useState(null);
    const [notes, setNotes] = useState('');
    const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
    const [isTimelineModalOpen, setIsTimelineModalOpen] = useState(false);
    const [activeTab, setActiveTab] = useState('appointments'); // appointments, patients

    // Fetch Appointments (Using the general endpoint which filters by doctor role)
    const { data, isLoading } = useQuery({
        queryKey: ['doctor-appointments'],
        queryFn: async () => {
            const res = await api.get('/appointments');
            return res.data;
        }
    });

    // Fetch All Patients (Reusing the admin endpoint as Doctor is authorized)
    const { data: patientsData, isLoading: isPatientsLoading } = useQuery({
        queryKey: ['admin-patients'],
        queryFn: async () => {
            const res = await api.get('/admin/patients');
            return res.data;
        }
    });

    // Update Notes Mutation
    const updateNotesMutation = useMutation({
        mutationFn: async ({ id, notes, status }) => {
            return await api.put(`/appointments/${id}/status`, {
                status,
                remarks: notes // Map notes to remarks for status update
            });
        },
        onSuccess: () => {
            queryClient.invalidateQueries(['doctor-appointments']);
            toast.success('Consultation completed');
            setSelectedAppointment(null);
            setNotes('');
        },
        onError: (error) => {
            toast.error(error.response?.data?.message || 'Failed to update');
        }
    });

    if (isLoading) return <div className="p-8 text-center"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-calm-blue mx-auto"></div></div>;

    const appointments = data?.appointments || [];
    const allPatients = patientsData?.patients || [];
    const pendingAppointments = appointments.filter(a => a.status === 'confirmed' || a.status === 'pending');
    const completedAppointments = appointments.filter(a => a.status === 'completed' || a.status === 'cancelled');

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-bold text-slate-900">Doctor Dashboard</h1>
                <div className="flex bg-slate-100 p-1 rounded-xl">
                    <button
                        onClick={() => setActiveTab('appointments')}
                        className={`px-4 py-2 rounded-lg text-sm font-bold transition-all ${activeTab === 'appointments' ? 'bg-white shadow-sm text-slate-900' : 'text-slate-500 hover:text-slate-700'}`}
                    >
                        My Appointments
                    </button>
                    <button
                        onClick={() => setActiveTab('patients')}
                        className={`px-4 py-2 rounded-lg text-sm font-bold transition-all ${activeTab === 'patients' ? 'bg-white shadow-sm text-slate-900' : 'text-slate-500 hover:text-slate-700'}`}
                    >
                        Patient Directory
                    </button>
                </div>
            </div>

            {activeTab === 'appointments' && (
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Appointment List */}
                    <div className="lg:col-span-2 space-y-6">
                        <div className="bg-white rounded-xl shadow-sm p-6 border border-slate-100">
                            <h2 className="text-xl font-bold text-slate-800 mb-4 flex items-center gap-2">
                                <Calendar className="w-5 h-5 text-calm-blue" />
                                Upcoming Appointments
                            </h2>

                            {pendingAppointments.length === 0 ? (
                                <p className="text-slate-500 italic">No pending appointments.</p>
                            ) : (
                                <div className="space-y-4">
                                    {pendingAppointments.map((apt) => (
                                        <div
                                            key={apt._id}
                                            className={`p-4 rounded-lg border transition-all cursor-pointer ${selectedAppointment?._id === apt._id ? 'bg-blue-50 border-calm-blue ring-1 ring-calm-blue' : 'bg-slate-50 border-slate-200 hover:border-calm-blue/50'}`}
                                            onClick={() => {
                                                setSelectedAppointment(apt);
                                                setNotes(apt.notes || '');
                                            }}
                                        >
                                            <div className="flex justify-between items-start">
                                                <div className="flex items-center gap-4">
                                                    <div className="w-10 h-10 rounded-full bg-calm-blue/20 flex items-center justify-center text-calm-blue font-bold">
                                                        {apt.patient?.name?.charAt(0) || 'U'}
                                                    </div>
                                                    <div>
                                                        <h3 className="font-semibold text-slate-900">{apt.patient?.name || 'Unknown Patient'}</h3>
                                                        <p className="text-sm text-slate-500 flex items-center gap-1">
                                                            <Clock className="w-3 h-3" />
                                                            {new Date(apt.date).toLocaleString()}
                                                        </p>
                                                    </div>
                                                </div>
                                                <span className={`px-3 py-1 rounded-full text-xs font-medium capitalize 
                                                ${apt.status === 'confirmed' ? 'bg-green-100 text-green-700' :
                                                        apt.status === 'pending' ? 'bg-yellow-100 text-yellow-700' : 'bg-gray-100'}`}>
                                                    {apt.status}
                                                </span>
                                            </div>
                                            {apt.reason && (
                                                <p className="mt-2 text-sm text-slate-600 bg-white p-2 rounded border border-slate-100">
                                                    <span className="font-medium">Reason:</span> {apt.reason}
                                                </p>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* Recent History */}
                        <div className="bg-white rounded-xl shadow-sm p-6 border border-slate-100">
                            <h2 className="text-xl font-bold text-slate-800 mb-4 text-gray-400">Recent History</h2>
                            {completedAppointments.length === 0 ? (
                                <p className="text-slate-500 italic text-sm">No history yet.</p>
                            ) : (
                                <div className="space-y-3">
                                    {completedAppointments.slice(0, 5).map(apt => (
                                        <div key={apt._id} className="py-3 border-b border-gray-100 text-sm flex justify-between items-center">
                                            <div className="flex items-center gap-2">
                                                <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-500 font-bold text-xs">
                                                    {apt.patient?.name?.charAt(0)}
                                                </div>
                                                <span className="font-medium text-slate-700">{apt.patient?.name}</span>
                                            </div>
                                            <div className="text-right">
                                                <div className="text-slate-500">{new Date(apt.date).toLocaleDateString()}</div>
                                                <span className={`text-xs ${apt.status === 'completed' ? 'text-green-600' : 'text-red-600'}`}>
                                                    {apt.status}
                                                </span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Main Action Panel */}
                    <div className="lg:col-span-1">
                        {selectedAppointment ? (
                            <div className="bg-white rounded-xl shadow-lg p-6 border border-calm-blue/20 sticky top-24">
                                <div className="flex justify-between items-center mb-6">
                                    <h3 className="text-lg font-bold text-slate-900">Consultation</h3>
                                    <button onClick={() => setSelectedAppointment(null)} className="text-slate-400 hover:text-slate-600"><XCircle className="w-5 h-5" /></button>
                                </div>

                                <div className="space-y-4 mb-6">
                                    <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
                                        <label className="text-xs text-slate-500 uppercase font-bold">Patient Details</label>
                                        <p className="font-bold text-lg text-slate-900">{selectedAppointment.patient?.name}</p>
                                        <p className="text-sm text-slate-600">{selectedAppointment.patient?.email}</p>
                                        <p className="text-sm text-slate-600">{selectedAppointment.patient?.phone}</p>
                                    </div>
                                    <div className="p-3 bg-blue-50 rounded-lg text-sm text-blue-800 border border-blue-100">
                                        <strong>Complaint:</strong> {selectedAppointment.reason}
                                    </div>
                                </div>

                                <div className="space-y-4">
                                    <button
                                        onClick={() => setIsUploadModalOpen(true)}
                                        className="w-full py-3 border-2 border-dashed border-calm-blue text-calm-blue rounded-xl font-bold hover:bg-blue-50 transition-colors flex items-center justify-center gap-2"
                                    >
                                        <Upload className="w-4 h-4" />
                                        Upload Report / Prescription
                                    </button>

                                    <button
                                        onClick={() => setIsTimelineModalOpen(true)}
                                        className="w-full py-3 border-2 border-dashed border-purple-200 text-purple-600 rounded-xl font-bold hover:bg-purple-50 transition-colors flex items-center justify-center gap-2"
                                    >
                                        <Plus className="w-4 h-4" />
                                        Add to Medical History
                                    </button>

                                    <div>
                                        <label className="block text-sm font-medium text-slate-700 mb-1">Doctor's Notes</label>
                                        <textarea
                                            rows={6}
                                            className="w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-calm-blue focus:outline-none"
                                            placeholder="Enter diagnosis, prescription details, and observations..."
                                            value={notes}
                                            onChange={(e) => setNotes(e.target.value)}
                                        ></textarea>
                                    </div>

                                    <div className="flex gap-3">
                                        <button
                                            onClick={() => updateNotesMutation.mutate({
                                                id: selectedAppointment._id,
                                                notes,
                                                status: 'completed'
                                            })}
                                            disabled={updateNotesMutation.isPending}
                                            className="flex-1 bg-calm-blue text-white py-3 rounded-xl hover:bg-calm-blue-dark transition-colors flex items-center justify-center gap-2 font-bold shadow-lg shadow-blue-500/20"
                                        >
                                            <CheckCircle className="w-4 h-4" />
                                            Complete
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <div className="bg-slate-50 rounded-xl p-8 text-center border-2 border-slate-200 border-dashed h-64 flex flex-col items-center justify-center">
                                <User className="w-12 h-12 text-slate-300 mx-auto mb-3" />
                                <p className="text-slate-500 font-medium">Select a patient to start consultation</p>
                            </div>
                        )}
                    </div>
                </div>
            )}
            {/* Patients Directory Tab */}
            {
                activeTab === 'patients' && (
                    <div className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden">
                        <div className="p-6 border-b border-slate-100 bg-slate-50">
                            <h2 className="text-lg font-bold text-slate-800 flex items-center gap-2">
                                <User className="w-5 h-5 text-calm-blue" />
                                All Registered Patients
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
                                            <th className="px-6 py-4">Phone</th>
                                            <th className="px-6 py-4 text-right">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-slate-100">
                                        {allPatients.map(patient => (
                                            <tr key={patient._id} className="hover:bg-slate-50 transition-colors">
                                                <td className="px-6 py-4 font-bold text-slate-900">
                                                    <div className="flex items-center gap-3">
                                                        <div className="w-8 h-8 rounded-full bg-slate-100 text-slate-500 flex items-center justify-center font-bold">
                                                            {patient.name?.charAt(0)}
                                                        </div>
                                                        {patient.name}
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 text-slate-600">{patient.email}</td>
                                                <td className="px-6 py-4 text-slate-600">{patient.phone || 'N/A'}</td>
                                                <td className="px-6 py-4 text-right">
                                                    <div className="flex justify-end gap-2">
                                                        {/* We can add functionality to start an appointment directly from here later */}
                                                        <button
                                                            onClick={() => {
                                                                // For now, simpler: simulate clicking an appointment or create a lightweight "open patient" state
                                                                // BUT doctor dashboard relies on 'selectedAppointment' which needs an APPOINTMENT object.
                                                                // So for now, just show 'View History' or similar placeholder
                                                                toast('View Patient History feature coming soon');
                                                            }}
                                                            className="text-calm-blue font-bold hover:underline"
                                                        >
                                                            View Details
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                        {allPatients.length === 0 && (
                                            <tr>
                                                <td colSpan="4" className="p-8 text-center text-slate-500">No patients found.</td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            )}
                        </div>
                    </div>
                )}

            {/* Modals - rendered conditionally based on state, but technically outside the tab switch logic so they persist if needed, though usually triggered from appointments */}
            {selectedAppointment && (
                <UploadRecordModal
                    isOpen={isUploadModalOpen}
                    onClose={() => setIsUploadModalOpen(false)}
                    patientId={selectedAppointment.patient?._id}
                />
            )}

            {selectedAppointment && (
                <AddTimelineEventModal
                    isOpen={isTimelineModalOpen}
                    onClose={() => setIsTimelineModalOpen(false)}
                    patientId={selectedAppointment.patient?._id}
                />
            )}
        </div>
    );
};

export default DoctorDashboard;
