import React, { useEffect, useRef, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Polyline } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import mapmarker from "../../assets/map-marker.svg";
import warehouseData from "../../assets/data/warehouses.json";
import { Link } from 'react-router';
import { HashLink } from 'react-router-hash-link';
import { PiBuildingOfficeBold } from "react-icons/pi";
import Typewriter from 'typewriter-effect';


const customIcon = new L.Icon({
    iconUrl: mapmarker,
    iconSize: [21, 34],
    iconAnchor: [10, 34],
    popupAnchor: [0, -30],
});


const Coverage = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [searchResult, setSearchResult] = useState(null);
    const mapRef = useRef()

    // Transform warehouseData to same shape you used before
    const districtLocations = warehouseData.map(item => ({
        name: item.district,                       
        coords: [item.latitude, item.longitude],    
    }));

    const handleSearch = () => {
        const match = warehouseData.find(
            (item) => item.district.toLowerCase() === searchTerm.trim().toLowerCase()
        );

        if (match && mapRef.current) {
            // zoom into that location on map
            mapRef.current.setView([match.latitude, match.longitude], 8);
            setSearchResult(match); // store matched object
        } else {
            setSearchResult("not_found");
        }
    };

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, []);

    return (
        <div
            data-aos="fade-left"
            data-aos-offset="100"
            data-aos-delay="100"
            data-aos-duration="800"
            data-aos-easing="ease-in-out"

        >
            <section className="lg:min-h-screen px-3 md:px-8 lg:px-20 py-10 my-3 lg:my-5 rounded-3xl bg-white text-[#03373D]">
                {/* Heading  */}
                <div className="text-center md:text-start mb-8">
                    <h2 className="text-3xl lg:text-4xl font-bold mb-2">We are available in 64 districts</h2>
                </div>

                {/* Search Section */}
                <div className="flex flex-col md:flex-row gap-2 items-center justify-center md:justify-start mb-5">
                    <div className="flex w-full sm:w-[400px] bg-[#F7F9F9] rounded-full  overflow-hidden">

                        <input
                            type="text"
                            placeholder="🔍 Search your district"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="flex-grow px-5 bg-transparent outline-none text-sm text-[#03373D] custom-placeholder"
                        />

                        <button
                            onClick={handleSearch}
                            className="bg-[#CAEB66] cursor-pointer text-[#03373D] font-semibold px-6 py-2 rounded-full hover:opacity-90 transition"
                        >
                            Search
                        </button>
                    </div>

                    <HashLink to="/contact-us#officeLocation" aria-label="Find office locations">
                        <span className='text-[#CAEB66] font-bold gap-1 flex items-center hover:underline hover:text-[#b5db4f] transition-colors duration-200 md:text-xl'>
                            <PiBuildingOfficeBold size={24} />
                            <Typewriter
                                options={{
                                    strings: ['Find Offices Here'],
                                    autoStart: true,
                                    loop: true,
                                    delay: 65,
                                    deleteSpeed: 30,
                                    pauseFor: 1000,
                                    cursor: '',
                                }}
                            />
                        </span>
                    </HashLink>
                </div>

                {/* Show search result */}
                <div className="mb-8">
                    {searchResult && searchResult !== "not_found" && (
                        <div className="relative bg-[#F7F9F9] rounded-xl p-4 shadow-md">
                            {/* Close button */}
                            <button
                                onClick={() => setSearchResult(null)}
                                className="absolute top-2 right-2 cursor-pointer  text-red-600 hover:text-red-600 text-2xl font-bold"
                                aria-label="Close search result"
                            >
                                ×
                            </button>

                            <h3 className="font-bold text-lg text-[#03373D] mb-2">
                                📍 {searchResult.district}
                            </h3>
                            <p><strong>Main Hub (City):</strong> {searchResult.city}</p>
                            <p><strong>Covered Areas:</strong> {searchResult.covered_area.join(", ")}</p>
                            <p><strong>Status:</strong> {searchResult.status}</p>
                        </div>
                    )}

                    {searchResult === "not_found" && (
                        <div className="bg-red-100 text-red-600 p-3 rounded-lg shadow-sm">
                            ❌ District not found. Please check spelling and try again.
                        </div>
                    )}
                </div>

                {/* Map Section */}
                <div className="w-full border-t-1 border-gray-300 lg:pt-8">
                    <p className="my-5 lg:mb-8 text-sm md:text-lg lg:text-xl font-bold  text-[#03373D]">We deliver almost all over Bangladesh.</p>

                    <MapContainer
                        ref={mapRef}
                        center={[23.8103, 90.4125]}
                        zoom={6}
                        scrollWheelZoom={true}
                        style={{ height: '350px', width: '100%' }}
                        className="rounded-xl shadow-md"
                    >
                        <TileLayer
                            attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a>'
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        />

                        {/* markers from warehouseData */}
                        {districtLocations.map((district, idx) => (
                            <Marker key={idx} position={district.coords} icon={customIcon}>
                                <Popup>{district.name}</Popup>
                            </Marker>
                        ))}
                    </MapContainer>
                </div>
            </section></div>
    );
};

export default Coverage;


