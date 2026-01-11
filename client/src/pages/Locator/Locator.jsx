import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import { Search, MapPin, Navigation, Star, Loader2, AlertCircle, ExternalLink } from 'lucide-react';
import BookingModal from '../../components/features/BookingModal';
import { useQuery } from '@tanstack/react-query';
import api from '../../services/api';

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

const Locator = () => {
    const [position, setPosition] = useState([28.6139, 77.2090]); // Default: New Delhi
    const [searchQuery, setSearchQuery] = useState("");
    const [isBookingOpen, setIsBookingOpen] = useState(false);
    const [activeHospital, setActiveHospital] = useState(null);
    const [locationError, setLocationError] = useState(null);
    const [useLocation, setUseLocation] = useState(false); // Valid state to trigger location fetch

    // Get User Location
    useEffect(() => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (pos) => {
                    setPosition([pos.coords.latitude, pos.coords.longitude]);
                    setUseLocation(true); // Enable location based search
                },
                (err) => {
                    console.error(err);
                    setLocationError("Location access denied. defaulted to New Delhi.");
                    setUseLocation(false);
                }
            );
        }
    }, []);

    const handleUseMyLocation = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (pos) => {
                    setPosition([pos.coords.latitude, pos.coords.longitude]);
                    setUseLocation(true);
                    setLocationError(null);
                },
                (err) => {
                    console.error(err);
                    setLocationError("Could not access location. Please enable permissions.");
                }
            );
        }
    };

    // Fetch Hospitals
    const { data, isLoading } = useQuery({
        queryKey: ['hospitals', position[0], position[1], searchQuery],
        queryFn: async () => {
            // In a real scenario, we send lat/lng to server
            // For now, if server is down or no data, we might need fallbacks or just show empty
            try {
                const res = await api.get(`/hospitals`, {
                    params: {
                        lat: useLocation ? position[0] : null, // Only send if we explicitly want to use location
                        lng: useLocation ? position[1] : null,
                        radius: 50, // 50km
                        search: searchQuery
                    }
                });
                return res.data.hospitals;
            } catch (e) {
                console.error("Failed to fetch hospitals", e);
                return [];
            }
        },
        enabled: true, // Always try to fetch
    });

    const hospitals = data || [];

    const handleBook = (hospital) => {
        setActiveHospital(hospital);
        setIsBookingOpen(true);
    };

    const openGoogleMaps = () => {
        const [lat, lng] = position;
        window.open(`https://www.google.com/maps/search/hospitals+near+me/@${lat},${lng},14z`, '_blank');
    };

    return (
        <div className="h-[calc(100vh-5rem)] flex flex-col md:flex-row bg-soft-white overflow-hidden">

            {/* Sidebar List */}
            <div className="w-full md:w-96 flex flex-col h-1/2 md:h-full bg-white border-r border-slate-200 z-10 shadow-lg md:shadow-none">
                <div className="p-4 border-b border-slate-100 flex flex-col gap-3">
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
                    <button
                        onClick={handleUseMyLocation}
                        className="flex items-center justify-center gap-2 w-full py-2 bg-slate-100 text-slate-700 font-semibold rounded-xl hover:bg-slate-200 transition-colors text-sm"
                    >
                        <Navigation className="w-4 h-4" />
                        Use Current Location
                    </button>
                </div>

                <div className="flex-1 overflow-y-auto p-4 space-y-4">
                    {isLoading ? (
                        <div className="flex justify-center items-center h-40">
                            <Loader2 className="w-8 h-8 text-calm-blue animate-spin" />
                        </div>
                    ) : hospitals.length === 0 ? (
                        <div className="text-center text-slate-500 py-8 px-4">
                            <p className="font-medium text-slate-700 mb-2">No registered hospitals found nearby.</p>
                            <p className="text-sm text-slate-400 mb-6">Our database currently has limited coverage. Please use Google Maps to find emergency care near you.</p>

                            <button
                                onClick={openGoogleMaps}
                                className="w-full py-3 bg-white border-2 border-slate-200 text-slate-700 font-bold rounded-xl hover:bg-slate-50 hover:border-slate-300 transition-colors flex items-center justify-center gap-2"
                            >
                                <img src="https://www.google.com/images/branding/product/2x/maps_96in128dp.png" alt="Google Maps" className="w-6 h-6 object-contain" />
                                Search on Google Maps
                            </button>
                        </div>
                    ) : (
                        hospitals.map(hospital => (
                            <div
                                key={hospital._id}
                                className="p-4 rounded-2xl border border-slate-100 bg-white transition-all cursor-pointer hover:shadow-md hover:border-calm-blue/50"
                                onClick={() => {
                                    setPosition(hospital.location.coordinates.reverse()); // Set map center
                                }}
                            >
                                <div className="flex justify-between items-start mb-2">
                                    <h3 className="font-bold text-slate-900">{hospital.name}</h3>
                                    <div className="flex items-center gap-1 bg-amber-50 px-2 py-0.5 rounded text-xs font-bold text-amber-600">
                                        4.5 <Star className="w-3 h-3 fill-current" />
                                    </div>
                                </div>

                                <div className="flex items-center gap-1 text-sm text-slate-500 mb-3">
                                    <MapPin className="w-3.5 h-3.5" />
                                    <span className="truncate">{hospital.address.street}, {hospital.address.city}</span>
                                </div>

                                <div className="flex items-center justify-between mt-3">
                                    <button className="text-calm-blue text-sm font-semibold flex items-center gap-1 hover:underline">
                                        <Navigation className="w-4 h-4" />
                                        1.2 km
                                    </button>
                                    <button
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            handleBook(hospital);
                                        }}
                                        disabled={hospital.availableBeds === 0}
                                        className="px-4 py-1.5 bg-calm-blue text-white text-sm font-medium rounded-lg hover:bg-calm-blue-dark disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                                    >
                                        {hospital.availableBeds === 0 ? 'Full' : 'Book Bed'}
                                    </button>
                                </div>
                            </div>
                        ))
                    )}

                    {/* Persistent Google Maps Button */}
                    {hospitals.length > 0 && (
                        <div className="pt-4 border-t border-slate-100 mt-2">
                            <button
                                onClick={openGoogleMaps}
                                className="w-full py-2.5 text-xs font-bold text-slate-500 hover:text-calm-blue flex items-center justify-center gap-2 transition-colors uppercase tracking-wider"
                            >
                                <ExternalLink className="w-4 h-4" />
                                View on Google Maps
                            </button>
                        </div>
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

                    {hospitals.map(hospital => (
                        <Marker
                            key={hospital._id}
                            position={[hospital.location.coordinates[1], hospital.location.coordinates[0]]} // Mongo is Lng,Lat. Leaflet is Lat,Lng
                        >
                            <Popup>
                                <div className="min-w-[200px]">
                                    <div className="flex justify-between items-start mb-1">
                                        <h3 className="font-bold text-slate-800">{hospital.name}</h3>
                                        <span className="text-xs font-bold text-amber-600 flex items-center gap-0.5">
                                            4.5 <Star className="w-3 h-3 fill-current" />
                                        </span>
                                    </div>
                                    <p className="text-sm text-slate-600 mb-2">{hospital.address.street}</p>
                                    <div className="flex justify-between items-center">
                                        <span className={`text-xs font-bold ${hospital.availableBeds > 0 ? 'text-green-600' : 'text-red-600'}`}>
                                            {hospital.availableBeds > 0 ? `${hospital.availableBeds} Beds` : 'No Beds'}
                                        </span>
                                        <button
                                            onClick={() => handleBook(hospital)}
                                            disabled={hospital.availableBeds === 0}
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

                {locationError && (
                    <div className="absolute top-4 left-1/2 -translate-x-1/2 bg-red-50 text-red-600 px-4 py-2 rounded-full shadow-lg text-sm font-medium z-[1000] flex items-center gap-2">
                        <AlertCircle className="w-4 h-4" />
                        {locationError}
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
