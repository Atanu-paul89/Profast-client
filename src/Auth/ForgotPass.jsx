import React, { useEffect } from 'react';
import Lottie from "lottie-react";
import forgotanimation from "../../src/assets/json/forbidden.json";
import { Link } from 'react-router';
import AOS from 'aos';
import 'aos/dist/aos.css';

const ForgotPass = () => {
    useEffect(() => {
        AOS.init({ duration: 400, easing: 'ease-in-out' });
    }, []);

    return (
        <div
            data-aos="zoom-out"
            data-aos-offset="200"
            data-aos-delay="40"
            data-aos-duration="400"
            data-aos-easing="ease-in-out"
            data-aos-mirror="true"
            data-aos-once="false"
            data-aos-anchor-placement="top-center"
        >
            <section className="flex flex-col lg:flex-row items-center justify-center px-5 py-12 lg:py-15 gap-2">
                {/* Left Form */}
                <div className="w-full max-w-md space-y-5">
                    <div >
                        <h2 className="text-3xl lg:text-4xl font-bold  lg:text-[#03373D]">Forgot Password</h2>
                        <p className="text-[#606060] mt-1 font-semibold lg:font-normal  text-sm">
                            Enter your email address and we’ll send <br  /> you a reset link.
                        </p>
                    </div>

                    <form className="space-y-4 lg:w-2/3">
                        <div>
                            <label className="text-sm font-semibold">Email</label>
                            <input
                                type="email"
                                placeholder="Email"
                                required
                                className="w-full shadow-md border border-[#E0E0E0] rounded-md px-4 py-2 text-sm"
                            />
                        </div>
                        <button
                            type="submit"
                            className="w-full bg-[#CAEB66] text-[#03373D] font-semibold cursor-pointer py-2 rounded-md hover:opacity-90 transition"
                        >
                            Send
                        </button>
                    </form>

                    <p className="text-sm text-[#606060]">
                        Remember your password?{" "}
                        <Link to="/auth/signin" className="text-[#CAEB66] font-bold hover:underline">
                            Sign In
                        </Link>
                    </p>
                </div>

                {/* Right Lottie Animation */}
                <div className="w-full hidden lg:flex lg:w-[500px]">
                    <Lottie animationData={forgotanimation} loop={true} />
                </div>
            </section>
        </div>
    );
};

export default ForgotPass;
