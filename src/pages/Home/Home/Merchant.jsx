import React from 'react';
import top_pic from "../../../assets/be-a-merchant-bg.png";
import right_pic from "../../../assets/location-merchant.png";


const Merchant = () => {

  return (
    <div
      data-aos="fade-up"
      data-aos-offset="100"
      data-aos-delay="100"
      data-aos-duration="600"
      data-aos-easing="ease-in-out"
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
