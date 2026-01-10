import React from 'react';
import { Activity, Clock, CheckCircle, AlertCircle } from 'lucide-react';

const reports = [
    { id: 1, test: "Complete Blood Count (CBC)", status: "Completed", date: "Oct 24, 2023", result: "Normal", value: "All values within range" },
    { id: 2, test: "Lipid Profile", status: "Pending", date: "Oct 25, 2023", result: "In Progress", value: "Results expected by 4PM" },
    { id: 3, test: "HbA1c", status: "Completed", date: "Sep 10, 2023", result: "High", value: "6.8%" },
];

const LabReports = () => {
    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-slate-900">Lab Reports</h1>
                <p className="text-slate-500">View diagnostic test results and status</p>
            </div>

            <div className="space-y-4">
                {reports.map((report) => (
                    <div key={report.id} className="bg-white p-6 rounded-2xl border border-slate-100 flex flex-col md:flex-row items-center gap-6">
                        <div className="flex-shrink-0">
                            <div className={`w-14 h-14 rounded-full flex items-center justify-center ${report.status === 'Completed'
                                    ? (report.result === 'Normal' ? 'bg-green-100 text-green-600' : 'bg-orange-100 text-orange-600')
                                    : 'bg-blue-100 text-blue-600'
                                }`}>
                                <Activity className="w-7 h-7" />
                            </div>
                        </div>

                        <div className="flex-grow text-center md:text-left">
                            <h3 className="text-lg font-bold text-slate-900">{report.test}</h3>
                            <p className="text-slate-500 text-sm">Requested on {report.date}</p>
                        </div>

                        <div className="bg-slate-50 px-6 py-3 rounded-xl min-w-[200px] text-center md:text-left">
                            <p className="text-xs text-slate-500 uppercase font-semibold mb-1">Result</p>
                            <p className="font-medium text-slate-800">{report.value}</p>
                        </div>

                        <div className="flex-shrink-0">
                            {report.status === 'Completed' ? (
                                <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-sm font-medium ${report.result === 'Normal' ? 'bg-green-50 text-green-700' : 'bg-orange-50 text-orange-700'
                                    }`}>
                                    {report.result === 'Normal' ? <CheckCircle className="w-4 h-4" /> : <AlertCircle className="w-4 h-4" />}
                                    {report.status}
                                </span>
                            ) : (
                                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-sm font-medium bg-blue-50 text-blue-700">
                                    <Clock className="w-4 h-4" />
                                    {report.status}
                                </span>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default LabReports;
