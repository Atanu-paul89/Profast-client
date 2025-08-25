import './../../index.css';
import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { MdOutlinePhoneCallback } from "react-icons/md";
import {
    FaShippingFast,
    FaMapMarkedAlt,
    FaWarehouse,
    FaMoneyBillWave,
    FaBuilding,
    FaUndoAlt
} from 'react-icons/fa';

const services = [
    {
        title: "Express & Standard Delivery",
        description:
            "Fast delivery within 24–72 hours across major cities. Express option in Dhaka delivers within 4–6 hours from pickup to drop-off.",
        details:
            "Ideal for urgent documents, gifts, and e-commerce orders in Dhaka.",
        icon: FaShippingFast,
    },
    {
        title: "Nationwide Delivery",
        description:
            "We deliver to every district in Bangladesh with doorstep service. Your parcels arrive safely within 48–72 hours nationwide.",
        details:
            "Perfect for businesses expanding reach across Bangladesh.",
        icon: FaMapMarkedAlt,
    },
    {
        title: "Fulfillment Solution",
        description:
            "We offer inventory support, order processing, packaging, and after-sales service—tailored for growing online businesses.",
        details:
            "Streamline your operations with end-to-end fulfillment.",
        icon: FaWarehouse,
    },
    {
        title: "Cash on Home Delivery",
        description:
            "Secure cash collection at the customer’s doorstep. We ensure safe handling and full delivery coverage across Bangladesh.",
        details:
            "Boost trust with doorstep payment options.",
        icon: FaMoneyBillWave,
    },
    {
        title: "Corporate Service",
        description:
            "Custom logistics for corporate clients, including warehouse support, inventory tracking, and flexible delivery contracts.",
        details:
            "Tailored logistics for enterprise-level needs.",
        icon: FaBuilding,
    },
    {
        title: "Parcel Return",
        description:
            "Our reverse logistics lets customers return or exchange items easily, helping online merchants build trust and loyalty.",
        details:
            "Simplify returns and exchanges for your customers.",
        icon: FaUndoAlt,
    },
];

const Services = () => {
    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, []);
    return (
        <div
            data-aos="fade-right"
            data-aos-offset="100"
            data-aos-delay="100"
            data-aos-duration="600"
            data-aos-easing="ease-in-out"
        >
            <section className="my-5 lg:mt-6 bg-white py-5 px-5 lg:px-20 rounded-3xl">
                <div className="text-center text-white mb-10">
                    <h2 className="text-[32px] text-[#03373D] font-bold mb-3">Our Services</h2>
                    <p className="max-w-3xl mx-auto text-gray-600 text-[16px]">
                        Enjoy fast, reliable parcel delivery with real-time tracking and zero hassle. From personal packages to business shipments — we deliver on time, every time.
                    </p>
                </div>

                <div className="lg:pb-9 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {services.map((service, index) => {
                        const isHighlighted = index === 1;
                        const Icon = service.icon;

                        return (
                            <motion.div
                                key={index}
                                initial={{ y: 0 }}
                                animate={{ y: [0, -4, 0] }}
                                transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
                                className="group relative w-full h-[260px] cursor-default"
                            >
                                {/* Card Container */}
                                <div className="relative hover:cursor-none  w-full h-full transition-transform duration-700 transform group-hover:rotate-y-180 [transform-style:preserve-3d]">
                                    {/* Front Side */}
                                    <div className={`absolute  w-full h-full rounded-2xl p-6 space-y-3 shadow-md [backface-visibility:hidden] ${isHighlighted ? 'bg-[#CAEB66]' : 'bg-white border-2 border-[#CAEB66]'}`}>
                                        <Icon className="h-[45px] w-[42px] text-[#03373D] mx-auto" />
                                        <h3 className="text-[#03373D] text-center font-bold text-lg">{service.title}</h3>
                                        <p className="text-[#606060] px-2 text-sm">{service.description}</p>
                                    </div>

                                    {/* Back Side */}
                                    <div className={`absolute  w-full h-full rounded-2xl p-6 shadow-md rotate-y-180 [backface-visibility:hidden] ${isHighlighted ? 'bg-[#03373D]' : 'bg-[#03373D]'}`}>
                                        <h3 className="text-[#CAEB66] font-bold text-lg">{service.title}</h3>
                                        <ul>
                                            <li className="text-white px-2 text-sm">{service.details}</li>
                                        </ul>
                                    </div>
                                </div>
                            </motion.div>
                        );
                    })}

                </div>

                {/* CTA Section */}
                <div className="mt-10 text-center">
                    <div className="inline-flex items-center gap-3 justify-center">
                        <MdOutlinePhoneCallback className="text-[#03373D] text-2xl" />
                        <span className="text-[#03373D] font-medium text-lg">
                            To know more, please{' '}
                            <a
                                href="/contact-us"
                                className="underline text-[#CAEB66] hover:text-[#03373D] transition-colors font-extrabold"
                            >
                                contact us
                            </a>
                        </span>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Services;
