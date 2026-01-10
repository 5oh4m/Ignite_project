import React from 'react';
import { Calendar, Syringe, Building2, Pill } from 'lucide-react';

const history = [
    { id: 1, type: "Hospital Visit", title: "Emergency Admission", date: "Oct 24, 2023", desc: "Admitted for severe chest pain. Discharged after 2 days.", icon: Building2, color: "bg-red-500" },
    { id: 2, type: "Prescription", title: "Added New Medication", date: "Oct 26, 2023", desc: "Prescribed Atorvastatin 10mg daily.", icon: Pill, color: "bg-green-500" },
    { id: 3, type: "Vaccination", title: "Flu Shot", date: "Nov 01, 2022", desc: "Annual influenza vaccination administered.", icon: Syringe, color: "bg-blue-500" },
    { id: 4, type: "General Checkup", title: "Annual Physical", date: "Aug 15, 2022", desc: "Routine health screening. No major issues found.", icon: Calendar, color: "bg-purple-500" },
];

const PatientHistory = () => {
    return (
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="mb-12 text-center">
                <h1 className="text-3xl font-bold text-slate-900">Medical Timeline</h1>
                <p className="text-slate-500">A simplified view of your medical history</p>
            </div>

            <div className="relative">
                {/* Vertical Line */}
                <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-slate-200"></div>

                <div className="space-y-12">
                    {history.map((item) => (
                        <div key={item.id} className="relative pl-24 group">
                            {/* Timeline Dot */}
                            <div className={`absolute left-[1.9rem] top-1 w-4 h-4 rounded-full border-4 border-white shadow-sm ring-2 ring-slate-200 ${item.color}`}></div>

                            {/* Date Tag */}
                            <div className="absolute left-0 top-1 text-xs font-bold text-slate-400 w-16 text-right">
                                {item.date}
                            </div>

                            {/* Content Card */}
                            <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-all relative">
                                {/* Icon */}
                                <div className={`absolute -left-16 top-6 w-10 h-10 rounded-xl ${item.color} text-white flex items-center justify-center shadow-lg`}>
                                    <item.icon className="w-5 h-5" />
                                </div>

                                <div className="flex items-center gap-2 mb-2">
                                    <span className="text-xs font-bold uppercase tracking-wider text-slate-400 bg-slate-50 px-2 py-1 rounded">{item.type}</span>
                                </div>
                                <h3 className="text-xl font-bold text-slate-900 mb-2">{item.title}</h3>
                                <p className="text-slate-600 leading-relaxed">{item.desc}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default PatientHistory;
