import React from 'react';
import rightrider from "../../../src/assets/agent-pending.png";


const BeARider = () => {
    return (
        <div
            data-aos="fade-left"
            data-aos-offset="100"
            data-aos-delay="100"
            data-aos-duration="800"
            data-aos-easing="ease-in-out"

        >
            <section className="bg-white rounded-3xl my-3 lg:my-5 py-5 lg:py-10 px-1 lg:px-20">
                <div className="text-center lg:text-left mb-10 max-w-3xl">
                    <div className="w-full lg:w-1/3  lg:hidden place-items-center">
                        <img src={rightrider} alt="Rider Illustration" className="w-1/3 h-1/3    object-contain" />
                    </div>
                    <h2 className="text-[#03373D] text-3xl font-bold mb-3">Be a Rider</h2>
                    <p className="text-[#606060] text-sm lg:text-base">
                        Enjoy fast, reliable parcel delivery with real-time tracking and zero hassle. From personal packages to business shipments — we deliver on time, every time.
                    </p>
                </div>

                <div className="lg:border-t-2 lg:border-gray-200 flex flex-col lg:flex-row items-center gap-10">
                    {/* Form Section */}
                    <form className="w-full lg:w-2/3 grid grid-cols-1 md:grid-cols-2 gap-6  p-6 ">
                        <div>
                            <label className="block text-sm font-medium text-[#03373D] mb-1">Your Name</label>
                            <input type="text" required placeholder="Full Name" className="w-full border border-[#E0E0E0] rounded-md px-4 py-2 text-sm " />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-[#03373D] mb-1">Your age</label>
                            <input type="number" required placeholder="Age" className="w-full border border-[#E0E0E0] rounded-md px-4 py-2 text-sm " />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-[#03373D] mb-1">Your Email</label>
                            <input type="email" placeholder="name@gmail.com" required className="w-full border border-[#E0E0E0] rounded-md px-4 py-2 text-sm " />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-[#03373D] mb-1">Your Region</label>
                            <select required className="w-full border border-[#E0E0E0]  rounded-md px-4 py-2 text-sm">
                                <option>Select your region</option>
                                <option>Dhaka</option>
                                <option>Chattogram</option>
                                <option>Sylhet</option>
                                <option>Khulna</option>
                                <option>Rajshahi</option>
                                <option>Barishal</option>
                                <option>Rangpur</option>
                                <option>Mymensingh</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-[#03373D] mb-1">NID No</label>
                            <input type="text" required placeholder="National ID No" className="w-full border border-[#E0E0E0] rounded-md px-4 py-2 text-sm " />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-[#03373D] mb-1">Contact</label>
                            <input type="text" required placeholder="+8801XXXXXXXXX" className="w-full border border-[#E0E0E0] rounded-md px-4 py-2 text-sm " />
                        </div>
                        <div className="md:col-span-2">
                            <label className="block text-sm font-medium text-[#03373D] mb-1">Which wire-house you want to work?</label>
                            <select required className="w-full border  border-[#E0E0E0] rounded-md px-4 py-2 text-sm">
                                <option>Select wire-house</option>
                                <option>Uttara Hub</option>
                                <option>Mirpur Hub</option>
                                <option>Motijheel Hub</option>
                                <option>Chattogram Hub</option>
                            </select>
                        </div>
                        <div className="md:col-span-2">
                            <button className="w-full cursor-pointer bg-[#CAEB66] text-[#03373D] font-semibold py-2 rounded-md hover:opacity-90 transition ">
                                Submit
                            </button>
                        </div>
                    </form>

                    {/* Right Image */}
                    <div className="w-full lg:w-1/3 hidden lg:flex">
                        <img src={rightrider} alt="Rider Illustration" className="w-full h-auto object-contain" />
                    </div>
                </div>
            </section>
        </div>
    );
};

export default BeARider;
