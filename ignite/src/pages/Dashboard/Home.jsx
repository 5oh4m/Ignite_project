import React from 'react';
import SOSButton from '../../components/features/SOSButton';
import { Activity, MapPin, Calendar, FileText, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';

const Home = () => {
    const services = [
        { icon: MapPin, title: "Find Hospital", desc: "Locate nearest medical centers", link: "/locator", color: "bg-blue-500" },
        { icon: Calendar, title: "Appointments", desc: "Schedule visits with specialists", link: "/appointments", color: "bg-green-500" },
        { icon: Activity, title: "Health Records", desc: "Access your medical history", link: "/records", color: "bg-purple-500" },
        { icon: FileText, title: "Lab Reports", desc: "View diagnostic results", link: "/reports", color: "bg-orange-500" },
        { icon: Clock, title: "Patient History", desc: "View medical timeline", link: "/history", color: "bg-pink-500" },
    ];

    return (
        <div className="min-h-screen pb-20">
            {/* Hero Section */}
            <div className="bg-gradient-to-b from-calm-blue/10 to-transparent py-16 px-4 text-center relative overflow-hidden">
                <div className="max-w-4xl mx-auto relative z-10">
                    <h1 className="text-4xl md:text-6xl font-extrabold text-slate-900 mb-6">
                        Your Health, <span className="text-calm-blue">Immediate Priority</span>
                    </h1>
                    <p className="text-lg md:text-xl text-slate-600 mb-8 max-w-2xl mx-auto">
                        Connect with top doctors, find nearby hospitals, and get emergency help within seconds.
                    </p>

                    <div className="flex justify-center mb-16">
                        <SOSButton />
                    </div>
                </div>

                {/* Background blobs */}
                <div className="absolute top-0 left-0 w-64 h-64 bg-calm-blue/10 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
                <div className="absolute bottom-0 right-0 w-64 h-64 bg-emergency-red/10 rounded-full blur-3xl translate-x-1/2 translate-y-1/2"></div>
            </div>

            {/* Services Grid */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-10 relative z-20">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {services.map((service, index) => (
                        <Link
                            key={index}
                            to={service.link}
                            className="glass p-6 rounded-2xl hover:shadow-xl transition-all hover:-translate-y-1 group border-t-4 border-transparent hover:border-calm-blue"
                        >
                            <div className={`w-12 h-12 ${service.color} text-white rounded-xl flex items-center justify-center mb-4 shadow-lg`}>
                                <service.icon className="w-6 h-6" />
                            </div>
                            <h3 className="text-xl font-bold text-slate-900 mb-2">{service.title}</h3>
                            <p className="text-slate-500 text-sm">{service.desc}</p>
                        </Link>
                    ))}
                </div>
            </div>

            {/* Stats Section */}
            <div className="max-w-7xl mx-auto px-4 py-20">
                <div className="glass rounded-3xl p-8 md:p-12">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center divide-y md:divide-y-0 md:divide-x divide-slate-200">
                        <div>
                            <div className="text-4xl font-bold text-calm-blue mb-2">24/7</div>
                            <div className="text-slate-600 text-sm uppercase tracking-wider font-semibold">Emergency Support</div>
                        </div>
                        <div>
                            <div className="text-4xl font-bold text-calm-blue mb-2">500+</div>
                            <div className="text-slate-600 text-sm uppercase tracking-wider font-semibold">Doctors Available</div>
                        </div>
                        <div>
                            <div className="text-4xl font-bold text-calm-blue mb-2">10k+</div>
                            <div className="text-slate-600 text-sm uppercase tracking-wider font-semibold">Patients Recovered</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;
