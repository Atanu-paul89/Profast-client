import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/autoplay';
import { Autoplay } from 'swiper/modules';
import amazon from "../../../assets/brands/amazon.png";
import casio from "../../../assets/brands/casio.png";
import moonstar from "../../../assets/brands/moonstar.png";
import randstad from "../../../assets/brands/randstad.png";
import startpeople from "../../../assets/brands/startPeople.png";
import start from "../../../assets/brands/start.png";

const brandLogos = [casio, amazon, moonstar, start, startpeople, randstad];

const Brands = () => {
  return (
    <div
      data-aos="fade-left"
      data-aos-offset="100"
      data-aos-delay="100"
      data-aos-duration="600"
      data-aos-easing="ease-in-out"

    >
      <section className="border-b-2 my-5 border-dashed border-[#03464D50] py-10 px-5 lg:px-15 text-center">
        <h2 className="text-[#03373D] text-[22px] lg:text-[28px] font-extrabold mb-[50px]">
          We've helped thousands of sales teams
        </h2>

        <Swiper
          modules={[Autoplay]}
          slidesPerView={3}
          spaceBetween={30}
          loop={true}
          autoplay={{ delay: 0, disableOnInteraction: false }}
          speed={4000}
          grabCursor={true}
          breakpoints={{
            640: { slidesPerView: 3 },
            768: { slidesPerView: 4 },
            1024: { slidesPerView: 5 },
          }}
          className="py-2.5"
        >
          {brandLogos.map((logo, index) => (
            <SwiperSlide key={index}>
              <img
                src={logo}
                alt={`Brand ${index}`}
                className="h-[40px] w-auto mx-auto object-contain"
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </section>
    </div>
  );
};

export default Brands;
