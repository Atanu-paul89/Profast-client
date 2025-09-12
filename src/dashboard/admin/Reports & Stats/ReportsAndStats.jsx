import React, { useRef, useState } from 'react';
import ParcelStats from './ParcelStats';
import PaymentStats from './PaymentStats';
import RiderStats from './RiderStats';
import UserStats from './UserStats';
import { motion } from 'framer-motion';

const ReportsAndStats = () => {

    const parcelRef = useRef(null);
    const paymentRef = useRef(null);
    const riderRef = useRef(null);
    const userRef = useRef(null);

    const scrollToSection = (ref) => {
        ref.current?.scrollIntoView({ behavior: 'smooth' });
    };



    return (
        <div className="px-4 py-8 space-y-10">
            {/* Heading */}
            <motion.h1
                className="text-3xl font-bold text-[#03373D] mb-6"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
            >
                Reports & Analytics
            </motion.h1>

            {/* Navigation Buttons */}
            <div className="grid grid-cols-2 lg:flex lg:flex-row gap-4 mb-8">
                <button
                    onClick={() => scrollToSection(parcelRef)}
                    className="bg-[#CAEB66] text-[#03373D] font-semibold py-2 px-4 rounded-md cursor-pointer hover:scale-[1.03] transition"
                >
                    Parcel Stats
                </button>
                <button
                    onClick={() => scrollToSection(paymentRef)}
                    className="bg-[#03373D] text-[#BAEC66] font-semibold py-2 px-4 rounded-md cursor-pointer hover:scale-[1.03] transition"
                >
                    Payment Stats
                </button>
                <button
                    onClick={() => scrollToSection(riderRef)}
                    className="bg-[#CAEB66] text-[#03373D] font-semibold py-2 px-4 rounded-md cursor-pointer hover:scale-[1.03] transition"
                >
                    Rider Stats
                </button>
                <button
                    onClick={() => scrollToSection(userRef)}
                    className="bg-[#03373D] text-[#BAEC66] font-semibold py-2 px-4 rounded-md cursor-pointer hover:scale-[1.03] transition"
                >
                    User Stats
                </button>
            </div>

            {/* OVerview Sections*/}
            <section ref={parcelRef} >
                <ParcelStats />
            </section>

            <section ref={paymentRef}>
                <PaymentStats />
            </section>

            <section ref={riderRef} >
                <RiderStats />
            </section>
            <section ref={userRef} >
                <UserStats />
            </section>
        </div>
    );
};

export default ReportsAndStats;





