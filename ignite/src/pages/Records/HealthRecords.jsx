import React from 'react';
import { FileText, Download, Share2, Search, Filter } from 'lucide-react';

const records = [
    { id: 1, title: "Blood Test Results", type: "Lab Report", date: "Oct 24, 2023", doctor: "Dr. Sarah Wilson", size: "1.2 MB" },
    { id: 2, title: "Cardiology Assessment", type: "Prescription", date: "Oct 20, 2023", doctor: "Dr. Sarah Wilson", size: "540 KB" },
    { id: 3, title: "Annual Physical X-Ray", type: "Imaging", date: "Sep 15, 2023", doctor: "Dr. James Chen", size: "4.5 MB" },
    { id: 4, title: "Vaccination Record", type: "Certificate", date: "Jan 10, 2023", doctor: "System Generated", size: "200 KB" },
];

const HealthRecords = () => {
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
                        <input type="text" placeholder="Search records..." className="pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-calm-blue outline-none w-full md:w-64" />
                    </div>
                    <button className="p-2.5 bg-white border border-slate-200 rounded-xl hover:bg-slate-50 text-slate-600">
                        <Filter className="w-5 h-5" />
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {records.map((record) => (
                    <div key={record.id} className="bg-white p-6 rounded-2xl border border-slate-100 hover:shadow-lg transition-all group">
                        <div className="flex justify-between items-start mb-4">
                            <div className={`p-3 rounded-xl ${record.type === 'Lab Report' ? 'bg-blue-50 text-blue-500' : record.type === 'Prescription' ? 'bg-green-50 text-green-500' : 'bg-purple-50 text-purple-500'}`}>
                                <FileText className="w-6 h-6" />
                            </div>
                            <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                <button className="p-2 text-slate-400 hover:text-calm-blue hover:bg-blue-50 rounded-lg transition-colors">
                                    <Share2 className="w-4 h-4" />
                                </button>
                            </div>
                        </div>

                        <h3 className="text-lg font-bold text-slate-900 mb-1">{record.title}</h3>
                        <p className="text-sm text-slate-500 mb-4">{record.type} • {record.date}</p>

                        <div className="flex items-center gap-2 mb-4">
                            <div className="w-6 h-6 rounded-full bg-slate-100 flex items-center justify-center text-xs font-bold text-slate-500">
                                {record.doctor.charAt(4)}
                            </div>
                            <span className="text-sm text-slate-600">{record.doctor}</span>
                        </div>

                        <div className="flex items-center justify-between pt-4 border-t border-slate-50">
                            <span className="text-xs text-slate-400 font-medium">{record.size}</span>
                            <button className="flex items-center gap-1.5 text-sm font-medium text-calm-blue hover:text-calm-blue-dark">
                                <Download className="w-4 h-4" />
                                Download
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default HealthRecords;
