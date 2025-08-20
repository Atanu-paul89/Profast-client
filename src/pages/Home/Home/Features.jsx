import React from 'react';
import live_parcel from "../../../assets/live-tracking.png";
import safe_delivery from "../../../assets/safe-delivery.png";
import call_support from "../../../assets/callservice2.png";


const features = [
    {
        title: "Live Parcel Tracking",
        description:
            "Stay updated in real-time with our live parcel tracking feature. From pick-up to delivery, monitor your shipment's journey and get instant status updates for complete peace of mind.",
        image: live_parcel,
    },
    {
        title: "100% Safe Delivery",
        description:
            "We ensure your parcels are handled with the utmost care and delivered securely to their destination. Our reliable process guarantees safe and damage-free delivery every time.",
        image: safe_delivery,
    },
    {
        title: "24/7 Call Center Support",
        description:
            "Our dedicated support team is available around the clock to assist you with any questions, updates, or delivery concerns—anytime you need us.",
        image: call_support,
    },
];

const Features = () => {
    return (
        <div
            data-aos="fade-down"
            data-aos-offset="100"
            data-aos-delay="100"
            data-aos-duration="600"
            data-aos-easing="ease-in-out"

        >
            <section className="my-10  px-2 pb-13 lg:px-15 space-y-5 border-b-2 border-dashed border-[#03464D50]">
                {features.map((feature, index) => (
                    <div
                        key={index}
                        className="flex rounded-2xl bg-white px-5 py-7 lg:py-5 flex-col md:flex-row items-center gap-6 md:gap-10"
                    >
                        {/* Left Image */}
                        <div className="">
                            <img
                                src={feature.image}
                                alt={feature.title}
                                className="w-40 h-40 object-contain"
                            />
                        </div>

                        {/* Vertical dashed line */}
                        <div className="hidden md:block h-[150px] border-l-2 border-dashed border-[#03464D50]"></div>

                        {/* Right Text */}
                        <div className="w-full md:w-[60%]">
                            <h3 className="text-[#03373D] text-xl font-bold mb-3 text-center md:text-start">
                                {feature.title}
                            </h3>
                            <p className="text-[#606060] text-sm">{feature.description}</p>
                        </div>
                    </div>
                ))}
            </section>
        </div>
    );
};

export default Features;
