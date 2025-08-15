import React, { useEffect } from 'react';
import lg from "../../../assets/bookingIcon.png"
import AOS from 'aos';
import 'aos/dist/aos.css'; // You can also use <link> for styles
import { useLocation } from 'react-router';
// ..
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

const How_It_Works = () => {
    const location = useLocation();

    useEffect(() => {
        AOS.refresh();
    }, [location]);
    return (
        <div
            data-aos="fade-up"
            data-aos-offset="200"
            data-aos-delay="10"
            data-aos-duration="600"
            data-aos-easing="ease-in-out"
            data-aos-mirror="true"
            data-aos-once="false"
            data-aos-anchor-placement="top-center"
        >

            <section className='my-10 lg:px-15'>
                <h2 className='text-center lg:text-start mb-5 text-[32px] text-[#03373D] font-bold'>How it works</h2>

                {/* parent div of cards */}
                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 px-5'>

                    {/* childs cards */}
                    <div className='space-y-3 bg-white rounded-2xl  p-5 '>
                        <img src={lg} alt="bookingIcon" className='h-[52px] w-[52px]' />
                        <h3 className='font-bold text-[#03373D]'>Booking Pick & Drop</h3>
                        <p className='text-[#606060] text-sm '>Schedule your pickup and drop-off with ease,  whether it's a gift for a loved one or a business parcel, we’ve got you covered.</p>
                    </div>

                    <div className='space-y-3 bg-white rounded-2xl  p-5 '>
                        <img src={lg} alt="bookingIcon" className='h-[52px] w-[52px]' />
                        <h3 className='font-bold text-[#03373D]'>Cash On Delivery</h3>
                        <p className='text-[#606060] text-sm '>Let your customers pay when they receive their orders, a secure and trusted way to build confidence in your service.</p>
                    </div>

                    <div className='space-y-3 bg-white rounded-2xl  p-5 '>
                        <img src={lg} alt="bookingIcon" className='h-[52px] w-[52px]' />
                        <h3 className='font-bold text-[#03373D]'>Delivery Hub</h3>
                        <p className='text-[#606060] text-sm '>Our centralized hubs ensure faster sorting and dispatch, reducing delays and optimizing delivery routes.</p>
                    </div>

                    <div className='space-y-3 bg-white rounded-2xl  p-5 '>
                        <img src={lg} alt="bookingIcon" className='h-[52px] w-[52px]' />
                        <h3 className='font-bold text-[#03373D]'>Booking SME & Corporate</h3>
                        <p className='text-[#606060] text-sm  '>Tailored logistics solutions for small businesses and corporate clients, streamline your operations with our reliable service.</p>
                    </div>

                </div>
            </section>
        </div>

    );
};

export default How_It_Works;