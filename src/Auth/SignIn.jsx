import React from 'react';
import Lottie from "lottie-react";
import signInAnimation from "../../src/assets/json/login.json";
import { Link, Navigate, useNavigate } from 'react-router';
import { FcGoogle } from "react-icons/fc";
import AOS from 'aos';
import 'aos/dist/aos.css'; // You can also use <link> for styles
import { useForm } from 'react-hook-form';
import useAuth from '../hooks/useAuth';
// ..
AOS.init();

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


const SignIn = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const {signinUser,signinGoogle} = useAuth();
    const navigate = useNavigate();

    const onSubmit = data => {
        console.log(data);
        signinUser(data.email, data.password)
        .then(() => {
            navigate("/");
        })
        .catch(error => {
            console.error(error);
        })
    }
    const handleGoogleSignin =() => {
        signinGoogle()
                .then(() => {
            navigate("/");
        })
        .catch(error => {console.error(error)})
    }

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
            <section className=" flex flex-col lg:flex-row items-center justify-center px-5 py-6 gap-10">
                <div className="lg:hidden w-[150px]">
                    <Lottie animationData={signInAnimation} loop={true} />
                </div>
                {/* Left Form */}
                <div className="w-full max-w-md space-y-5">
                    <div>

                        <h2 className="text-3xl lg:text-5xl font-bold text-[#03373D]">Welcome Back
                        </h2>
                        <p className="text-[#606060] font-semibold text-sm">Login with Profast</p>
                    </div>

                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-2">
                        <div>
                            <label className="text-sm">Email</label>
                            <input
                                type="email"
                                placeholder="Email"
                                //from react-hook-form //
                                {...register('email',
                                    {
                                        required: true,
                                        pattern: {
                                            value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                            message: "Invalid email type"
                                        }
                                    }
                                )}
                                className="w-full border border-[#E0E0E0] rounded-md px-4 py-2 text-sm"
                            />
                            {/* errors type from react hook forms */}
                            {
                                errors.email?.type === 'required' &&
                                <p className='text-red-500'>Please insert the email</p>
                            }
                            {
                                errors.email?.type === 'pattern' &&
                                <p className='text-red-500'>Invalid email type</p>
                            }
                        </div>
                        <div>
                            <label className="text-sm">Password</label>
                            <input
                                type="password"
                                placeholder="Password"
                                {...register('password', {
                                    required: true,
                                    minLength: 8
                                })}
                                className="w-full border border-[#E0E0E0] rounded-md px-4 py-2 text-sm"
                            />
                            {/* erros showsing message */}
                            {
                                errors.password?.type === 'required' &&
                                <p className='text-red-500'>password is required</p>
                            }
                            {
                                errors.password?.type === 'minLength' &&
                                <p className='text-red-500'>Minimum length is 8</p>
                            }
                        </div>
                        <div className="text-right">
                            <Link to="/auth/forgot-password" className="text-sm text-[#03373D] hover:underline">
                                Forget Password?
                            </Link>
                        </div>
                        <button
                            type="submit"
                            className="w-full bg-[#CAEB66] text-[#03373D] font-semibold cursor-pointer py-2 rounded-md hover:opacity-90 transition"
                        >
                            Sign In
                        </button>
                    </form>

                    <p className="text-sm text-[#606060]">
                        Don’t have any account?{" "}
                        <Link to="/auth/register" className="text-[#CAEB66] font-bold hover:underline">
                            Register
                        </Link>
                    </p>

                    <p className='text-gray-500 text-sm my-0 pb-3 text-center'>Or</p>

                    <button onClick={handleGoogleSignin} className="cursor-pointer w-full flex items-center justify-center gap-2  bg-[#E9ECF1] py-2 rounded-md hover:bg-gray-100 transition">
                        <span>
                            <FcGoogle size={24} />
                        </span>
                        <span className="text-sm font-semibold text-[#03373D]">Login with Google</span>
                    </button>
                </div>

                {/* Right Lottie Animation */}
                <div className="w-full hidden lg:flex lg:w-[500px]">
                    <Lottie animationData={signInAnimation} loop={true} />
                </div>
            </section>
        </div>
    );
};

export default SignIn;
