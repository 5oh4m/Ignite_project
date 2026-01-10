import React, { useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { Search, MapPin, Navigation, BedDouble, AlertCircle } from 'lucide-react';
import BookingModal from '../../components/features/BookingModal';

// Fix for default Leaflet marker icons
import L from 'leaflet';
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

let DefaultIcon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow,
    iconSize: [25, 41],
    iconAnchor: [12, 41]
});
L.Marker.prototype.options.icon = DefaultIcon;


const hospitals = [
    {
        id: 1,
        name: "City General Hospital",
        address: "123 Healthcare Ave",
        beds: 15,
        totalBeds: 50,
        position: [51.505, -0.09],
        distance: "2.5 km",
        urgent: false
    },
    {
        id: 2,
        name: "St. Patrick's Medical",
        address: "45 West Side Rd",
        beds: 3,
        totalBeds: 40,
        position: [51.51, -0.1],
        distance: "4.1 km",
        urgent: true
    },
    {
        id: 3,
        name: "Emergency Care Center",
        address: "88 North Road",
        beds: 0,
        totalBeds: 20,
        position: [51.51, -0.09],
        distance: "1.2 km",
        urgent: true
    }
];

const Locator = () => {
    const [selectedHospital, setSelectedHospital] = useState(null);
    const [searchQuery, setSearchQuery] = useState("");
    const [isBookingOpen, setIsBookingOpen] = useState(false);
    const [activeHospital, setActiveHospital] = useState(null);

    const filteredHospitals = hospitals.filter(h =>
        h.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const handleBook = (hospital) => {
        setActiveHospital(hospital);
        setIsBookingOpen(true);
    };

    return (
        <div className="h-[calc(100vh-5rem)] flex flex-col md:flex-row bg-soft-white overflow-hidden">

            {/* Sidebar List */}
            <div className="w-full md:w-96 flex flex-col h-1/2 md:h-full bg-white border-r border-slate-200 z-10 shadow-lg md:shadow-none">
                <div className="p-4 border-b border-slate-100">
                    <div className="relative">
                        <Search className="absolute left-3 top-3 w-5 h-5 text-slate-400" />
                        <input
                            type="text"
                            placeholder="Search hospitals..."
                            className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border-none rounded-xl focus:ring-2 focus:ring-calm-blue outline-none"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>
                </div>

                <div className="flex-1 overflow-y-auto p-4 space-y-4">
                    {filteredHospitals.map(hospital => (
                        <div
                            key={hospital.id}
                            className={`p-4 rounded-2xl border transition-all cursor-pointer hover:shadow-md ${selectedHospital?.id === hospital.id ? 'border-calm-blue bg-blue-50/50 ring-1 ring-calm-blue' : 'border-slate-100 bg-white'}`}
                            onClick={() => setSelectedHospital(hospital)}
                        >
                            <div className="flex justify-between items-start mb-2">
                                <h3 className="font-bold text-slate-900">{hospital.name}</h3>
                                {hospital.beds === 0 ? (
                                    <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-semibold bg-red-100 text-red-800">
                                        Full
                                    </span>
                                ) : (
                                    <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-semibold ${hospital.beds < 5 ? 'bg-orange-100 text-orange-800' : 'bg-green-100 text-green-800'}`}>
                                        {hospital.beds} Beds
                                    </span>
                                )}
                            </div>

                            <div className="flex items-center gap-1 text-sm text-slate-500 mb-3">
                                <MapPin className="w-3.5 h-3.5" />
                                <span className="truncate">{hospital.address}</span>
                            </div>

                            <div className="flex items-center justify-between mt-3">
                                <button className="text-calm-blue text-sm font-semibold flex items-center gap-1 hover:underline">
                                    <Navigation className="w-4 h-4" />
                                    {hospital.distance}
                                </button>
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        handleBook(hospital);
                                    }}
                                    disabled={hospital.beds === 0}
                                    className="px-4 py-1.5 bg-calm-blue text-white text-sm font-medium rounded-lg hover:bg-calm-blue-dark disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                                >
                                    Book Bed
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Map View */}
            <div className="flex-1 h-1/2 md:h-full relative">
                <MapContainer center={[51.505, -0.09]} zoom={13} scrollWheelZoom={true} className="h-full w-full">
                    <TileLayer
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    {filteredHospitals.map(hospital => (
                        <Marker
                            key={hospital.id}
                            position={hospital.position}
                            eventHandlers={{
                                click: () => {
                                    setSelectedHospital(hospital);
                                },
                            }}
                        >
                            <Popup>
                                <div className="min-w-[200px]">
                                    <h3 className="font-bold text-slate-800">{hospital.name}</h3>
                                    <p className="text-sm text-slate-600 mb-2">{hospital.address}</p>
                                    <div className="flex justify-between items-center">
                                        <span className={`text-xs font-bold ${hospital.beds > 0 ? 'text-green-600' : 'text-red-600'}`}>
                                            {hospital.beds > 0 ? `${hospital.beds} Available` : 'No Beds'}
                                        </span>
                                        <button
                                            onClick={() => handleBook(hospital)}
                                            disabled={hospital.beds === 0}
                                            className="px-3 py-1 bg-calm-blue text-white text-xs rounded hover:bg-calm-blue-dark disabled:opacity-50"
                                        >
                                            Book
                                        </button>
                                    </div>
                                </div>
                            </Popup>
                        </Marker>
                    ))}
                </MapContainer>

                {/* Mobile floating action button for map/list toggle could go here */}
            </div>

            <BookingModal
                isOpen={isBookingOpen}
                onClose={() => setIsBookingOpen(false)}
                hospital={activeHospital}
            />
        </div>
    );
};

export default Locator;
