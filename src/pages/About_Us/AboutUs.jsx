

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const tabs = ['Story', 'Mission', 'Success', 'Team & Others'];

const tabContent = {
    Story: `Profast was born out of a simple but powerful idea: to make parcel delivery in Bangladesh fast, reliable, and stress-free. In a market often plagued by delays and uncertainty, we saw an opportunity to build something better — a logistics company that puts people first.

From our earliest days, we focused on solving real problems for real customers. We introduced real-time tracking, streamlined pickup and drop-off systems, and a customer support team that actually listens. These weren’t just features — they were promises.

As we grew, so did our ambitions. We expanded our coverage, built partnerships with e-commerce platforms, and invested in technology that could scale with demand. Today, Profast is more than a delivery service — it’s a trusted logistics partner for thousands across the country.`,

    Mission: `At Profast, our mission is to redefine what delivery means in the modern age. We believe every parcel carries more than just goods — it carries trust, urgency, and emotion. Whether it's a birthday gift, a business contract, or a critical medical supply, we treat every delivery with care and precision.

Our goal is to build a logistics ecosystem that’s not only fast, but also transparent and human-centered. That means real-time updates, proactive communication, and a support system that’s always within reach.

We’re also committed to sustainability and innovation. By optimizing routes, reducing packaging waste, and exploring electric delivery options, we aim to make logistics smarter and greener — without compromising speed or reliability.`,

    Success: `Success at Profast isn’t just measured in numbers — though we’re proud of the millions of parcels delivered and the thousands of satisfied clients. It’s measured in the stories behind those deliveries: the entrepreneur who scaled her business with our help, the family who received a gift on time, the hospital that got its supplies when it mattered most.

Our journey has been shaped by resilience, adaptability, and a relentless pursuit of excellence. We’ve weathered market shifts, scaled operations, and built a team that thrives on solving complex logistics challenges.

Each milestone — from launching our mobile app to expanding into new regions — is a testament to our commitment. And we’re just getting started. With new services on the horizon and a growing network, Profast is poised to lead the next wave of logistics innovation in Bangladesh.`,

    'Team & Others': `At the heart of Profast is a team of passionate professionals who bring our vision to life every day. Our leadership includes:

[ Rasel Ahamed (CTO): A visionary technologist driving our logistics platform and real-time tracking systems.]
[ Awlad Hossin (Senior Product Designer): The creative force behind our user experience, ensuring every interaction feels intuitive and seamless. ]
[ Nasir Uddin (CEO): The strategic mind guiding Profast’s growth, partnerships, and customer-first philosophy. ]

Beyond leadership, our team includes dedicated riders, support agents, warehouse managers, and developers — all working together to deliver excellence. We believe in collaboration, innovation, and the power of people to transform logistics into something extraordinary.`,
};

const AboutUs = () => {
    const [activeTab, setActiveTab] = useState('Story');

    return (
        <section className="lg:min-h-screen px-5 lg:px-20 py-10 rounded-3xl my-5 lg:my-6 bg-white text-[#03373D]">
            <div className="text-center lg:text-start mb-8 pb-4 lg:pb-7 border-b-1 border-gray-300">
                <h2 className="text-3xl lg:text-4xl font-bold mb-2">About Us</h2>
                <p className="text-sm lg:text-md text-gray-500 max-w-3xl">
                    Enjoy fast, reliable parcel delivery with real-time tracking and zero hassle. From personal <br className='hidden lg:flex' /> packages to business shipments — we deliver on time, every time.
                </p>
            </div>

            {/* Tabs */}
            <div className="flex flex-wrap justify-start gap-4 mb-7">
                {tabs.map((tab) => (
                    <button
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                        className={`py-1 lg:px-2 rounded-md font-semibold transition ${activeTab === tab ? 'text-[#CAEB66] font-extrabold cursor-pointer text-xl lg:text-2xl' : 'text-gray-600 hover:bg-[#CAEB6640] cursor-pointer'
                            }`}
                    >
                        {tab}
                    </button>
                ))}
            </div>

            {/* Animated Content */}
            <AnimatePresence mode="wait">
                <motion.div
                    key={activeTab}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.5 }}
                    className="whitespace-pre-line text-start text-lg lg:text-xl text-gray-700"
                >
                    {tabContent[activeTab]}
                </motion.div>
            </AnimatePresence>
        </section>
    );
};

export default AboutUs;

