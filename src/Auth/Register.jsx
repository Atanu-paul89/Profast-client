import React from 'react';
import Lottie from "lottie-react";
import registerAnimation from "../../src/assets/json/register.json";
import { Link } from 'react-router';
import { FcGoogle } from "react-icons/fc";
import AOS from 'aos';
import 'aos/dist/aos.css'; // You can also use <link> for styles
import { useForm } from 'react-hook-form';
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


const Register = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();

    const onSubmit = data => {
        console.log(data);
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
                    <Lottie animationData={registerAnimation} loop={true} />
                </div>
                {/* Left Form */}
                <div className="w-full max-w-md space-y-5">
                    <div>

                        <h2 className="text-3xl lg:text-4xl font-bold text-[#03373D]">Create an account
                        </h2>
                        <p className="text-[#606060] font-semibold text-sm">Register with Profast</p>
                    </div>

                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-2">
                        <div className="">
                            <label className="text-sm">Profile Photo</label>
                            <input
                                type="file"
                                accept="image/*"
                                required
                                {...register('file', {
                                    required: "Profile photo is required",
                                    validate: {
                                        acceptedFormats: (files) => {
                                            if (!files || !files[0]) return "Profile photo is required";
                                            const allowedTypes = ["image/jpeg", "image/png", "image/jpg"];
                                            return allowedTypes.includes(files[0].type)
                                                ? true
                                                : "Only JPG, JPEG, PNG files are allowed";
                                        },
                                        fileSize: (files) => {
                                            if (!files || !files[0]) return "Profile photo is required";
                                            return files[0].size < 5 * 1024 * 1024
                                                ? true
                                                : "File size must be less than 5MB";
                                        }
                                    }
                                })}
                                className="block w-full text-sm text-[#606060] file:mr-4 file:py-2 file:px-4
               file:rounded-md file:border-0
               file:text-sm file:font-semibold
               file:bg-[#CAEB66] file:text-[#03373D]
               hover:file:bg-[#b6d95c] cursor-pointer border border-[#E0E0E0] rounded-md"
                            />
                            {errors.file && <p className='text-red-500'>{errors.file.message}</p>}
                        </div>
                        <div>
                            <label className="text-sm">Name</label>
                            <input
                                type="text"
                                placeholder="full Name"
                                required
                                {...register('name', {
                                    required: "Name is required",
                                    minLength: {
                                        value: 2,
                                        message: "Name must be at least 2 characters"
                                    },
                                    pattern: {
                                        value: /^[A-Za-z\s]+$/,
                                        message: "Name can only contain letters and spaces"
                                    }
                                })}
                                className="w-full border border-[#E0E0E0] rounded-md px-4 py-2 text-sm"
                            />
                            {errors.name && <p className='text-red-500'>{errors.name.message}</p>}
                        </div>
                        <div>
                            {/* Email */}
                            <label className="text-sm">Email</label>
                            <input
                                type="email"
                                placeholder="Email"
                                required
                                {...register('email',
                                    {
                                        pattern: {
                                            value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                            message: "Invalid email type"
                                        }
                                    }
                                )}
                                className="w-full border border-[#E0E0E0] rounded-md px-4 py-2 text-sm"
                            />
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
                                required
                                {...register('password', {
                                    minLength: {
                                        value: 8,
                                        message: "Password must be at least 8 characters"
                                    },
                                    pattern: {
                                        value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/,
                                        message: "Password must include uppercase, lowercase, number, and special character"
                                    }
                                })}
                                className="w-full border border-[#E0E0E0] rounded-md px-4 py-2 text-sm"
                            />
                            {errors.password?.type === 'minLength' && (
                                <p className='text-red-500'>{errors.password.message}</p>
                            )}
                            {errors.password?.type === 'pattern' && (
                                <p className='text-red-500'>{errors.password.message}</p>
                            )}
                        </div>

                        <button
                            type="submit"
                            className="w-full bg-[#CAEB66] text-[#03373D] font-semibold cursor-pointer py-2 rounded-md hover:opacity-90 transition"
                        >
                            Register
                        </button>
                    </form>

                    <p className="text-sm text-[#606060]">
                        Already have an account?{" "}
                        <Link to="/auth/signin" className="text-[#CAEB66] font-bold hover:underline">
                            Sign In
                        </Link>
                    </p>

                    <p className='text-gray-500 text-sm my-0 pb-3 text-center'>Or</p>

                    <button className="w-full cursor-pointer flex items-center justify-center gap-2  bg-[#E9ECF1] py-2 rounded-md hover:bg-gray-100 transition">
                        <span>
                            <FcGoogle size={24} />
                        </span>
                        <span className="text-sm font-semibold text-[#03373D]">Register with Google</span>
                    </button>
                </div>

                {/* Right Lottie Animation */}
                <div className="w-full hidden lg:flex lg:w-[500px]">
                    <Lottie animationData={registerAnimation} loop={true} />
                </div>
            </section></div>
    );
};

export default Register;
