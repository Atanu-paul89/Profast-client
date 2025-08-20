import React from 'react';
import lg from "../../../assets/bookingIcon.png"



const How_It_Works = () => {
    // const location = useLocation();

    // useEffect(() => {
    //     AOS.refresh();
    // }, [location]);
    return (
        <div
            data-aos="fade-up"
            data-aos-offset="100"
            data-aos-delay="100"
            data-aos-duration="600"
            data-aos-easing="ease-in-out"
        >

            <section className='my-8 lg:px-15'>
                <h2 className='text-center lg:text-start mb-5 text-[32px] text-[#03373D] font-bold'>How it works</h2>

                {/* parent div of cards */}
                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 px-2 lg:px-5'>

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