import React from 'react';
import top_pic from "../../../assets/be-a-merchant-bg.png";
import right_pic from "../../../assets/location-merchant.png";
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

const Merchant = () => {

  return (
    <div
      data-aos="fade-up"
      data-aos-offset="100"
      data-aos-delay="40"
      data-aos-duration="500"
      data-aos-easing="ease-in-out"
      data-aos-mirror="true"
      data-aos-once="false"
      data-aos-anchor-placement="top-center"
    >
      <section className="bg-[#03373D] mb-10 lg:mx-15 rounded-3xl relative overflow-hidden py-16 px-5 lg:px-20 text-center lg:text-left">
        {/* Top Center Image */}
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-[1100px] h-auto z-0">
          <img src={top_pic} alt="Top Decoration" className="w-full h-auto" />
        </div>

        {/* Content Wrapper */}
        <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-10">
          {/* Left Text Content */}
          <div className="max-w-xl space-y-6">
            <h2 className="text-white text-2xl lg:text-3xl font-bold">
              Merchant and Customer Satisfaction is Our First Priority
            </h2>
            <p className="text-[#DADADA] text-sm lg:text-base">
              We offer the lowest delivery charge with the highest value along with 100% safety of your product. Pathao courier delivers your parcels in every corner of Bangladesh right on time.
            </p>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <button className="bg-[#CAEB66] text-[#03373D] font-semibold px-6 py-2 rounded-3xl hover:opacity-90 transition">
                Become a Merchant
              </button>
              <button className="border border-[#CAEB66] text-[#CAEB66] font-semibold px-6 py-2 rounded-3xl hover:bg-[#CAEB66] hover:text-[#03373D] transition">
                Earn with Profast Courier
              </button>
            </div>
          </div>

          {/* Right Image */}
          <div className="w-[250px] lg:w-[1100px] hidden lg:flex">
            <img src={right_pic} alt="Location Illustration" className="w-full h-auto" />
          </div>
        </div>
      </section>
    </div>
  );
};

export default Merchant;
