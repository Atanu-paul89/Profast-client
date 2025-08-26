import React, { useEffect, useRef, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Polyline } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import mapmarker from "../../assets/map-marker.svg";
import warehouseData from "../../assets/warehouses.json";
import { Link } from 'react-router';
import { HashLink } from 'react-router-hash-link';


const customIcon = new L.Icon({
    iconUrl: mapmarker,
    iconSize: [21, 34],
    iconAnchor: [10, 34],
    popupAnchor: [0, -30],
});

// const districtLocations = [
//     { name: 'Dhaka', coords: [23.8103, 90.4125] },
//     { name: 'Chattogram', coords: [22.3569, 91.7832] },
//     { name: 'Barishal', coords: [22.7010, 90.3535] },
//     { name: 'Khulna', coords: [22.8456, 89.5403] },
//     { name: 'Rajshahi', coords: [24.3745, 88.6042] },
//     { name: 'Rangpur', coords: [25.7439, 89.2752] },
//     { name: 'Mymensingh', coords: [24.7471, 90.4203] },
//     { name: 'Sylhet', coords: [24.8949, 91.8687] },
//     { name: 'Cox’s Bazar', coords: [21.4272, 91.9798] },
//     { name: 'Comilla', coords: [23.4607, 91.1809] },
//     { name: 'Narayanganj', coords: [23.6238, 90.5000] },
//     { name: 'Gazipur', coords: [23.9999, 90.4203] },
//     { name: 'Jessore', coords: [23.1664, 89.2080] },
//     { name: 'Bogura', coords: [24.8465, 89.3773] },
//     { name: 'Dinajpur', coords: [25.6276, 88.6332] },
//     { name: 'Pabna', coords: [24.0064, 89.2372] },
//     { name: 'Noakhali', coords: [22.8696, 91.0995] },
//     { name: 'Faridpur', coords: [23.6070, 89.8420] },
//     { name: 'Panchagarh', coords: [26.3411, 88.5542] },
//     { name: 'Habiganj', coords: [24.3740, 91.4155] },
//     { name: 'Sunamganj', coords: [25.0658, 91.3950] },
//     { name: 'Bandarban', coords: [22.1953, 92.2184] },
//     { name: 'Rangamati', coords: [22.7324, 92.2985] },
// ];

const Coverage = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [searchResult, setSearchResult] = useState(null);
    const mapRef = useRef()

    // Transform warehouseData to same shape you used before
    const districtLocations = warehouseData.map(item => ({
        name: item.district,                        // district name
        coords: [item.latitude, item.longitude],    // leaflet needs [lat, lng]
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
                <div className="flex items-center justify-center md:justify-start mb-2">
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
                </div>
                <p className='mb-2'>FInd out all of our office addresses
                    <HashLink to="/contact-us#officeLocation"><span> here</span></HashLink>
                </p>

                {/* Show search result */}
                <div className="mb-8">
                    {searchResult && searchResult !== "not_found" && (
                        <div className="bg-[#F7F9F9] rounded-xl p-4 shadow-md">
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


