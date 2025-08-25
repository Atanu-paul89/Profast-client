
import React, { useState } from 'react';

const divisions = [
    'Dhaka', 'Chattogram', 'Rajshahi', 'Khulna', 'Barishal', 'Rangpur', 'Mymensingh', 'Sylhet'
];

const parcelTypes = {
    documents: {
        baseFare: 9,
        intraDivision: { perKg: 4, perKm: 0.15 },
        interDivision: { perKg: 7, perKm: 0.4 }
    },
    electronics: {
        baseFare: 14,
        intraDivision: { perKg: 7, perKm: 0.25 },
        interDivision: { perKg: 10, perKm: 0.7 }
    },
    fragile_items: {
        baseFare: 23,
        intraDivision: { perKg: 10, perKm: 0.35 },
        interDivision: { perKg: 14, perKm: 1.0 }
    },
    general_goods: {
        baseFare: 14,
        intraDivision: { perKg: 5, perKm: 0.2 },
        interDivision: { perKg: 7, perKm: 0.5 }
    }
};

const divisionDistances = {
    Dhaka: { Dhaka: 10, Chattogram: 245, Rajshahi: 245, Khulna: 260, Barishal: 120, Rangpur: 300, Mymensingh: 120, Sylhet: 240 },
    Chattogram: { Dhaka: 245, Chattogram: 10, Rajshahi: 480, Khulna: 400, Barishal: 320, Rangpur: 540, Mymensingh: 350, Sylhet: 320 },
    Rajshahi: { Dhaka: 245, Chattogram: 480, Rajshahi: 10, Khulna: 270, Barishal: 340, Rangpur: 160, Mymensingh: 260, Sylhet: 420 },
    Khulna: { Dhaka: 260, Chattogram: 400, Rajshahi: 270, Khulna: 10, Barishal: 180, Rangpur: 400, Mymensingh: 320, Sylhet: 480 },
    Barishal: { Dhaka: 120, Chattogram: 320, Rajshahi: 340, Khulna: 180, Barishal: 10, Rangpur: 420, Mymensingh: 220, Sylhet: 340 },
    Rangpur: { Dhaka: 300, Chattogram: 540, Rajshahi: 160, Khulna: 400, Barishal: 420, Rangpur: 10, Mymensingh: 220, Sylhet: 380 },
    Mymensingh: { Dhaka: 120, Chattogram: 350, Rajshahi: 260, Khulna: 320, Barishal: 220, Rangpur: 220, Mymensingh: 10, Sylhet: 220 },
    Sylhet: { Dhaka: 240, Chattogram: 320, Rajshahi: 420, Khulna: 480, Barishal: 340, Rangpur: 380, Mymensingh: 220, Sylhet: 10 },
};

const MIN_FARE_SAME_DIVISION = 45;
const MIN_FARE_DIFFERENT_DIVISION = 75;
const MIN_DISTANCE_SAME_DIVISION = 10;

const calculateFare = (parcelType, fromDivision, toDivision, weightKg) => {
    const typeRates = parcelTypes[parcelType];
    if (!typeRates || !fromDivision || !toDivision || isNaN(weightKg) || weightKg <= 0) return null;

    const distance = divisionDistances[fromDivision][toDivision];
    if (!distance) return null;

    let totalFare;
    if (fromDivision === toDivision) {
        // Intra-division
        const usedDistance = Math.max(distance, MIN_DISTANCE_SAME_DIVISION);
        totalFare =
            typeRates.baseFare +
            weightKg * typeRates.intraDivision.perKg +
            usedDistance * typeRates.intraDivision.perKm;
        totalFare = Math.max(totalFare, MIN_FARE_SAME_DIVISION);
    } else {
        // Inter-division
        totalFare =
            typeRates.baseFare +
            weightKg * typeRates.interDivision.perKg +
            distance * typeRates.interDivision.perKm;
        totalFare = Math.max(totalFare, MIN_FARE_DIFFERENT_DIVISION);
    }

    return Math.round(totalFare);
};

const CalculateFare = () => {
    const [parcelType, setParcelType] = useState('');
    const [fromDivision, setFromDivision] = useState('');
    const [toDivision, setToDivision] = useState('');
    const [weight, setWeight] = useState('');
    const [fare, setFare] = useState(null);

    const handleCalculate = () => {
        const result = calculateFare(parcelType, fromDivision, toDivision, parseFloat(weight));
        setFare(result);
    };

    const handleReset = () => {
        setParcelType('');
        setFromDivision('');
        setToDivision('');
        setWeight('');
        setFare(null);
    };

    return (
        <div
            data-aos="zoom-out"
            data-aos-offset="100"
            data-aos-delay="40"
            data-aos-duration="700"
            data-aos-easing="ease-in-out">
            <section className="bg-white my-5 rounded-3xl py-10 px-5 lg:px-20">
                <div className="text-center mb-10">
                    <h2 className="text-[#03373D] lg:text-start lg:font-bold lg:text-5xl text-3xl font-bold mb-3">Pricing Calculator</h2>
                    <p className="text-[#606060] hidden lg:flex max-w-xl lg:text-start font-semibold text-sm mb-3">
                        Enjoy fast, reliable parcel delivery with real-time tracking and zero hassle. From personal packages to business shipments — we deliver on time, every time.
                    </p>
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
                            <label className="block text-sm font-medium text-[#03373D] mb-1">From Division</label>
                            <select
                                value={fromDivision}
                                onChange={(e) => setFromDivision(e.target.value)}
                                className="w-full border border-[#E0E0E0] rounded-md px-4 py-2 text-sm"
                                required
                            >
                                <option value="">Select From Division</option>
                                {divisions.map(d => <option key={d} value={d}>{d}</option>)}
                            </select>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-[#03373D] mb-1">To Division</label>
                            <select
                                value={toDivision}
                                onChange={(e) => setToDivision(e.target.value)}
                                className="w-full border border-[#E0E0E0] rounded-md px-4 py-2 text-sm"
                                required
                            >
                                <option value="">Select To Division</option>
                                {divisions.map(d => <option key={d} value={d}>{d}</option>)}
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
                                min="0.1"
                                step="0.1"
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
        </div>
    );
};

export default CalculateFare;