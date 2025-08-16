import React, { useState } from 'react';


const deliveryPricingData = {
    parcel_types: {
        documents: 9,
        electronics: 50,
        fragile_items: 70,
        general_goods: 30,
    },
    delivery_zones: {
        within_city: {
            rate_per_kg: 2,
            rate_per_km: 0.1,
        },
        inter_city_dhaka_to_chittagong: {
            rate_per_kg: 8,
            rate_per_km: 0.5,
        },
        inter_city_dhaka_to_sylhet: {
            rate_per_kg: 10,
            rate_per_km: 0.6,
        },
        outside_main_cities: {
            rate_per_kg: 13,
            rate_per_km: 0.7,
        },
    },
    calculateFare: (parcelType, destination, weightKg) => {
        const baseFare = deliveryPricingData.parcel_types[parcelType];
        const zoneRates = deliveryPricingData.delivery_zones[destination];
        if (!baseFare || !zoneRates || isNaN(weightKg)) return null;

        const fixedDistanceKm = 150;
        const totalFare =
            baseFare +
            weightKg * zoneRates.rate_per_kg +
            fixedDistanceKm * zoneRates.rate_per_km;

        return totalFare;
    },
};

const CalculateFare = () => {
    const [parcelType, setParcelType] = useState('');
    const [destination, setDestination] = useState('');
    const [weight, setWeight] = useState('');
    const [fare, setFare] = useState(null);

    const handleCalculate = () => {
        const result = deliveryPricingData.calculateFare(parcelType, destination, parseFloat(weight));
        setFare(result);
    };

    const handleReset = () => {
        setParcelType('');
        setDestination('');
        setWeight('');
        setFare(null);
    };

    return (
        <section className="bg-white my-5 rounded-3xl py-10 px-5 lg:px-20">
            <div className="text-center mb-10">
                <h2 className="text-[#03373D] lg:text-start lg:font-bold lg:text-5xl text-3xl font-bold mb-3">Pricing Calculator</h2>

                <p className="text-[#606060] hidden lg:flex max-w-xl lg:text-start font-semibold text-sm mb-3">  Enjoy fast, reliable parcel delivery with real-time tracking and zero hassle. From personal packages to business shipments — we deliver on time, every time.</p>

                <h3 className="text-[#03373D] text-center lg:my-8 my-5 lg:font-bold text-xl lg:text-3xl font-bold mb-3">Calculate Your Cost</h3>

                <p className="text-[#606060] lg:hidden  max-w-2xl mx-auto text-sm lg:text-base">
                    Enjoy fast, reliable parcel delivery with real-time tracking and zero hassle. From personal packages to business shipments — we deliver on time, every time.
                </p>
            </div>

            <div className="flex flex-col lg:flex-row items-center justify-center gap-10">
                {/* Form Section */}
                <div className="w-full max-w-md space-y-6">
                    <div>
                        <label className="block text-sm font-medium text-[#03373D] mb-1">Parcel type</label>
                        <select
                            value={parcelType}
                            onChange={(e) => setParcelType(e.target.value)}
                            className="w-full border border-[#E0E0E0] rounded-md px-4 py-2 text-sm"
                            required
                        >
                            <option value="">Select Parcel type</option>
                            <option value="documents">Documents</option>
                            <option value="electronics">Electronics</option>
                            <option value="fragile_items">Fragile Items</option>
                            <option value="general_goods">General Goods</option>
                        </select>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-[#03373D] mb-1">Delivery Destination</label>
                        <select
                            value={destination}
                            onChange={(e) => setDestination(e.target.value)}
                            className="w-full border border-[#E0E0E0] rounded-md px-4 py-2 text-sm"
                            required
                        >
                            <option value="">Select Delivery Destination</option>
                            <option value="within_city">Within City</option>
                            <option value="inter_city_dhaka_to_chittagong">Dhaka to Chittagong</option>
                            <option value="inter_city_dhaka_to_sylhet">Dhaka to Sylhet</option>
                            <option value="outside_main_cities">Outside Main Cities</option>
                        </select>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-[#03373D] mb-1">Weight (KG)</label>
                        <input
                            type="number"
                            value={weight}
                            onChange={(e) => setWeight(e.target.value)}
                            className="w-full border border-[#E0E0E0] rounded-md px-4 py-2 text-sm"
                            placeholder="Enter weight"
                            required
                        />
                    </div>

                    <div className="flex gap-4 pt-2">
                        <button
                            type="button"
                            onClick={handleReset}
                            className="bg-white border-2 border-[#CAEB66] text-[#03373D] font-semibold px-6 py-2 rounded-md hover:bg-[#CAEB66] hover:text-white w-2/4 cursor-pointer transition"
                        >
                            Reset
                        </button>
                        <button
                            type="button"
                            onClick={handleCalculate}
                            className="bg-[#CAEB66] w-full text-[#03373D] font-semibold px-6 py-2 rounded-md hover:opacity-90 cursor-pointer transition"
                        >
                            Calculate
                        </button>
                    </div>
                </div>

                {/* Fare Display */}
                {fare !== null && (
                    <div className="lg:text-8xl text-5xl font-bold text-[#03373D]">
                        {fare} Tk
                    </div>
                )}
            </div>
        </section>
    );
};

export default CalculateFare;
