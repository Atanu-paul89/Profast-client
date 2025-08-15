import React from 'react';
import live_parcel from "../../../assets/live-tracking.png";
import safe_delivery from "../../../assets/safe-delivery.png";
import call_support from "../../../assets/callservice2.png";
import AOS from 'aos';
import 'aos/dist/aos.css'; // You can also use <link> for styles
AOS.init();

//got this from npm aos website (copy paste) 
AOS.init({
    // Global settings:
    disable: false, // accepts following values: 'phone', 'tablet', 'mobile', boolean, expression or function
    startEvent: 'DOMContentLoaded', // name of the event dispatched on the document, that AOS should initialize on
    initClassName: 'aos-init', // class applied after initialization
    animatedClassName: 'aos-animate', // class applied on animation
    useClassNames: false, // if true, will add content of `data-aos` as classes on scroll
    disableMutationObserver: false, // disables automatic mutations' detections (advanced)
    debounceDelay: 50, // the delay on debounce used while resizing window (advanced)
    throttleDelay: 99, // the delay on throttle used while scrolling the page (advanced)


    // Settings that can be overridden on per-element basis, by `data-aos-*` attributes:
    offset: 120, // offset (in px) from the original trigger point
    delay: 0, // values from 0 to 3000, with step 50ms
    duration: 400, // values from 0 to 3000, with step 50ms
    easing: 'ease', // default easing for AOS animations
    once: false, // whether animation should happen only once - while scrolling down
    mirror: false, // whether elements should animate out while scrolling past them
    anchorPlacement: 'top-bottom', // defines which position of the element regarding to window should trigger the animation

});

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
            data-aos-offset="200"
            data-aos-delay="40"
            data-aos-duration="1000"
            data-aos-easing="ease-in-out"
            data-aos-mirror="true"
            data-aos-once="false"
            data-aos-anchor-placement="top-center"
        >
            <section className="my-10  px-5 pb-13 lg:px-15 space-y-5 border-b-2 border-dashed border-[#03464D50]">
                {features.map((feature, index) => (
                    <div
                        key={index}
                        className="flex rounded-2xl bg-white px-5 py-3 flex-col md:flex-row items-center gap-6 md:gap-10"
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
