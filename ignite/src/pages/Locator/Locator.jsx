import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import { Search, MapPin, Navigation, Star, Loader2 } from 'lucide-react';
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

// Helper to center map when position changes
const RecenterMap = ({ center }) => {
    const map = useMap();
    useEffect(() => {
        map.setView(center, 14);
    }, [center, map]);
    return null;
};

const generateMockHospitals = (centerLat, centerLng) => {
    const names = [
        "City General Hospital", "Emergency Care Center", "St. Patrick's Medical",
        "Grand Oak Hospital", "Sunrise Health Clinic", "Valley View Medical"
    ];

    return names.map((name, i) => {
        // Random offset for position (approx 0.02 degrees ~ 2km)
        const latOffset = (Math.random() - 0.5) * 0.04;
        const lngOffset = (Math.random() - 0.5) * 0.04;
        const rating = (4 + Math.random()).toFixed(1);
        const distance = (Math.sqrt(Math.pow(latOffset, 2) + Math.pow(lngOffset, 2)) * 111).toFixed(1); // Rough estimate in km

        return {
            id: i + 1,
            name: name,
            address: `${Math.floor(Math.random() * 100) + 1} Healthcare Ave`,
            beds: Math.floor(Math.random() * 50),
            totalBeds: 50,
            position: [centerLat + latOffset, centerLng + lngOffset],
            distance: `${distance} km`,
            rating: rating,
            urgent: Math.random() > 0.7
        };
    }).sort((a, b) => parseFloat(a.distance) - parseFloat(b.distance));
};

const Locator = () => {
    const [position, setPosition] = useState([51.505, -0.09]); // Default: London
    const [hospitals, setHospitals] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedHospital, setSelectedHospital] = useState(null);
    const [searchQuery, setSearchQuery] = useState("");
    const [isBookingOpen, setIsBookingOpen] = useState(false);
    const [activeHospital, setActiveHospital] = useState(null);

    useEffect(() => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (pos) => {
                    const { latitude, longitude } = pos.coords;
                    setPosition([latitude, longitude]);
                    setHospitals(generateMockHospitals(latitude, longitude));
                    setLoading(false);
                },
                (err) => {
                    console.error(err);
                    setError("Location access denied. Showing default location.");
                    setHospitals(generateMockHospitals(51.505, -0.09)); // Generate for default
                    setLoading(false);
                }
            );
        } else {
            setError("Geolocation not supported. Showing default location.");
            setHospitals(generateMockHospitals(51.505, -0.09));
            setLoading(false);
        }
    }, []);

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
                            placeholder="Search nearby hospitals..."
                            className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border-none rounded-xl focus:ring-2 focus:ring-calm-blue outline-none"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>
                </div>

                <div className="flex-1 overflow-y-auto p-4 space-y-4">
                    {loading ? (
                        <div className="flex justify-center items-center h-40">
                            <Loader2 className="w-8 h-8 text-calm-blue animate-spin" />
                        </div>
                    ) : filteredHospitals.length === 0 ? (
                        <p className="text-center text-slate-500 py-8">No hospitals found nearby.</p>
                    ) : (
                        filteredHospitals.map(hospital => (
                            <div
                                key={hospital.id}
                                className={`p-4 rounded-2xl border transition-all cursor-pointer hover:shadow-md ${selectedHospital?.id === hospital.id ? 'border-calm-blue bg-blue-50/50 ring-1 ring-calm-blue' : 'border-slate-100 bg-white'}`}
                                onClick={() => setSelectedHospital(hospital)}
                            >
                                <div className="flex justify-between items-start mb-2">
                                    <h3 className="font-bold text-slate-900">{hospital.name}</h3>
                                    <div className="flex items-center gap-1 bg-amber-50 px-2 py-0.5 rounded text-xs font-bold text-amber-600">
                                        {hospital.rating} <Star className="w-3 h-3 fill-current" />
                                    </div>
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
                                        {hospital.beds === 0 ? 'Full' : 'Book Bed'}
                                    </button>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>

            {/* Map View */}
            <div className="flex-1 h-1/2 md:h-full relative z-0">
                <MapContainer center={position} zoom={13} scrollWheelZoom={true} className="h-full w-full">
                    <TileLayer
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    <RecenterMap center={position} />

                    {/* User Location Marker */}
                    <Marker position={position}>
                        <Popup>You are here</Popup>
                    </Marker>

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
                                    <div className="flex justify-between items-start mb-1">
                                        <h3 className="font-bold text-slate-800">{hospital.name}</h3>
                                        <span className="text-xs font-bold text-amber-600 flex items-center gap-0.5">
                                            {hospital.rating} <Star className="w-3 h-3 fill-current" />
                                        </span>
                                    </div>
                                    <p className="text-sm text-slate-600 mb-2">{hospital.address}</p>
                                    <div className="flex justify-between items-center">
                                        <span className={`text-xs font-bold ${hospital.beds > 0 ? 'text-green-600' : 'text-red-600'}`}>
                                            {hospital.beds > 0 ? `${hospital.beds} Beds` : 'No Beds'}
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

                {error && (
                    <div className="absolute top-4 left-1/2 -translate-x-1/2 bg-red-50 text-red-600 px-4 py-2 rounded-full shadow-lg text-sm font-medium z-[1000] flex items-center gap-2">
                        <AlertCircle className="w-4 h-4" />
                        {error}
                    </div>
                )}
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
