import React from 'react';
import lg from "../../../assets/service.png";
// React Icons
import { FaShippingFast, FaMapMarkedAlt, FaWarehouse, FaMoneyBillWave, FaBuilding, FaUndoAlt } from 'react-icons/fa';



// const services = [
//     {
//         title: "Express & Standard Delivery",
//         description: "We deliver parcels within 24–72 hours across the country. Express delivery available in Dhaka within 4–6 hours from pick-up to drop-off.",
//         icon: FaShippingFast,
//     },
//     {
//         title: "Nationwide Delivery",
//         description: "We deliver parcels nationwide with home delivery in every district, ensuring your products reach customers within 48–72 hours.",
//         icon: FaMapMarkedAlt,
//     },
//     {
//         title: "Fulfillment Solution",
//         description: "We also offer customized service with inventory management support, online order processing, packaging, and after sales support.",
//         icon: FaWarehouse,
//     },
//     {
//         title: "Cash on Home Delivery",
//         description: "100% cash on delivery anywhere in Bangladesh with guaranteed safety of your product.",
//         icon: FaMoneyBillWave,
//     },
//     {
//         title: "Corporate Service ",
//         description: "Customized corporate services which includes warehouse and inventory management support.",
//         icon: FaBuilding,
//     },
//     {
//         title: "Parcel Return",
//         description: "Through our reverse logistics facility we allow end customers to return or exchange their products with online business merchants.",
//         icon: FaUndoAlt,
//     },
// ];

const services = [
    {
        title: "Express & Standard Delivery",
        description:
            "Fast delivery within 24–72 hours across major cities. Express option in Dhaka delivers within 4–6 hours from pickup to drop-off.",
        icon: FaShippingFast,
    },
    {
        title: "Nationwide Delivery",
        description:
            "We deliver to every district in Bangladesh with doorstep service. Your parcels arrive safely within 48–72 hours nationwide.",
        icon: FaMapMarkedAlt,
    },
    {
        title: "Fulfillment Solution",
        description:
            "We offer inventory support, order processing, packaging, and after-sales service—tailored for growing online businesses.",
        icon: FaWarehouse,
    },
    {
        title: "Cash on Home Delivery",
        description:
            "Secure cash collection at the customer’s doorstep. We ensure safe handling and full delivery coverage across Bangladesh.",
        icon: FaMoneyBillWave,
    },
    {
        title: "Corporate Service",
        description:
            "Custom logistics for corporate clients, including warehouse support, inventory tracking, and flexible delivery contracts.",
        icon: FaBuilding,
    },
    {
        title: "Parcel Return",
        description:
            "Our reverse logistics lets customers return or exchange items easily, helping online merchants build trust and loyalty.",
        icon: FaUndoAlt,
    },
];


const OurServices = () => {

    return (
        <div
            data-aos="fade-right"
            data-aos-offset="100"
            data-aos-delay="100"
            data-aos-duration="600"
            data-aos-easing="ease-in-out"

        >
            <section className="my-5 lg:mt-20 bg-[#03373D] py-10 px-5 lg:px-20 rounded-3xl">
                <div className="text-center text-white mb-10">
                    <h2 className="text-[32px] font-bold mb-3">Our Services</h2>
                    <p className="max-w-3xl mx-auto text-gray-300 text-[16px]">
                        Enjoy fast, reliable parcel delivery with real-time tracking and zero hassle. From personal packages to business shipments — we deliver on time, every time.
                    </p>
                </div>

                <div className="lg:pb-9 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {services.map((service, index) => {
                        const isHighlighted = index === 1;
                        const Icon = service.icon;
                        return (
                            <div
                                key={index}
                                className={` rounded-2xl place-items-center p-6 space-y-3 shadow-md ${isHighlighted ? "bg-[#CAEB66]" : "bg-white"
                                    }`}
                            >
                                {/* <img src={lg} alt="Service Icon" className="h-[48px] w-[48px]" /> */}
                                <Icon className="h-[45px] w-[42px] text-[#03373D]" />
                                <h3 className="text-[#03373D] font-bold text-lg">{service.title}</h3>
                                <p className="text-[#606060] px-2 text-sm">{service.description}</p>
                            </div>
                        );
                    }

                    )}
                </div>
            </section>
        </div>
    );
};

export default OurServices;
