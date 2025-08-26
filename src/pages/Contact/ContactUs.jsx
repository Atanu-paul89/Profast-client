import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import {
    MdPhone, MdEmail, MdBusinessCenter, MdLocationOn, MdWork, MdSearch
} from 'react-icons/md';
import officelocationData from "../../assets/profast_offices.json";
import { useLocation } from 'react-router';

const ContactUs = () => {
    const [district, setDistrict] = useState('');
    const [searchResult, setSearchResult] = useState(null);

    const handleSearch = () => {
        const key = district.toLowerCase().trim();
        if (officelocationData[key]) {
            setSearchResult(officelocationData[key]);
        } else {
            setSearchResult('invalid');
        }
    };

    const sectionVariant = {
        hidden: { opacity: 0, y: 30 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
    };

    const location = useLocation();
    useEffect(() => {
        if (location.hash) {
            // Logic for scrolling to a specific section
            const element = document.getElementById(location.hash.substring(1));
            if (element) {
                element.scrollIntoView({ behavior: 'smooth' });
            }
        } else {
            // Logic for scrolling to the top of the page
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    }, [location]);

    return (
        <div className="px-5 my-5 lg:my-6 rounded-3xl py-10 lg:px-20 bg-white text-[#03373D] space-y-10">
            {/* Title */}
            <motion.h2
                initial="hidden"
                animate="visible"
                variants={sectionVariant}
                className="text-3xl font-bold text-center"
            >
                Contact Us — We're Here 24/7
            </motion.h2>

            {/* Mobile */}
            <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={sectionVariant}
                className="flex flex-col lg:flex-row items-start gap-6"
            >
                <MdPhone className="text-3xl text-[#CAEB66]" />
                <div>
                    <h3 className="text-xl font-semibold">Mobile</h3>
                    <p>+880-1521538945 | +880-1960845459 | +880-1960812123</p>
                </div>
            </motion.div>

            {/* Email */}
            <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={sectionVariant}
                className="flex flex-col lg:flex-row items-start gap-6"
            >
                <MdEmail className="text-3xl text-[#CAEB66]" />
                <div>
                    <h3 className="text-xl font-semibold">Email</h3>
                    <p>helpdesk@profast.bd | complain@profast.bd | feedback@profast.bd</p>
                </div>
            </motion.div>

            {/* Career */}
            <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={sectionVariant}
                className="flex flex-col lg:flex-row items-start gap-6"
            >
                <MdWork className="text-3xl text-[#CAEB66]" />
                <div>
                    <h3 className="text-xl font-semibold">Career</h3>
                    <p>Hire.hr@profast.bd | cv.apply@profast.bd</p>
                    <p>+880-1700085610 | +880-1700085612</p>
                </div>
            </motion.div>

            {/* Business */}
            <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={sectionVariant}
                className="flex flex-col lg:flex-row items-start gap-6"
            >
                <MdBusinessCenter className="text-3xl text-[#CAEB66]" />
                <div>
                    <h3 className="text-xl font-semibold">Business</h3>
                    <p>partner.bd@profast.bd | partner.int@profast.bd</p>
                    <p>+880-1700045610 | +880-1700045612</p>
                </div>
            </motion.div>

            {/* Location */}
            <section id="officeLocation"  >

                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={sectionVariant}
                    className="space-y-4 pt-5"

                >
                    <div className="flex items-center gap-3">
                        <MdLocationOn className="text-3xl text-[#CAEB66]" />
                        <h3 className="text-xl font-semibold">Office Locations</h3>
                    </div>

                    {/* Dhaka & Chattogram */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {['dhaka', 'chattogram'].map((key) =>
                            officelocationData[key].map((office, idx) => (
                                <div key={idx} className="border border-[#CAEB66] rounded-xl p-4 shadow-sm">
                                    <h4 className="font-bold">{office.name}</h4>
                                    <p>{office.address}</p>
                                    <p className="text-sm text-gray-600">{office.phone}</p>
                                    <p className="text-sm text-gray-600">{office.email}</p>
                                </div>
                            ))
                        )}
                    </div>

                    {/* Search Other Districts */}
                    <div className="mt-6">
                        <div className="flex flex-col sm:flex-row gap-3 items-center">
                            <input
                                type="text"
                                placeholder="Search by district name"
                                value={district}
                                onChange={(e) => setDistrict(e.target.value)}
                                className="border border-[#03373D] px-4 py-2 rounded-md w-full sm:w-64"
                            />
                            <button
                                onClick={handleSearch}
                                className="bg-[#CAEB66]  text-[#03373D] px-4 py-2 rounded-md flex cursor-pointer items-center gap-1"
                            >
                                <MdSearch size={24} className='pt-1' /> Search
                            </button>
                        </div>

                        {/* Search Result */}
                        <div className="mt-4">
                            {searchResult === 'invalid' && (
                                <p className="text-red-600">Invalid district name. Please check your spelling.</p>
                            )}
                            {Array.isArray(searchResult) && (
                                <div className="space-y-2">
                                    {searchResult.map((office, idx) => (
                                        <div key={idx} className="border border-[#CAEB66] rounded-xl p-4 shadow-sm">
                                            <h4 className="font-bold">{office.name}</h4>
                                            <p>{office.address}</p>
                                            <p className="text-sm text-gray-600">{office.phone}</p>
                                            <p className="text-sm text-gray-600">{office.email}</p>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                </motion.div>
            </section>
        </div>
    );
};

export default ContactUs;
