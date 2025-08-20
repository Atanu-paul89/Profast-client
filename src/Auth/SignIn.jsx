import React, { useState } from 'react';
import Lottie from "lottie-react";
import signInAnimation from "../../src/assets/json/login.json";
import { Link, Navigate, useNavigate } from 'react-router';
import { FcGoogle } from "react-icons/fc";
import { useForm } from 'react-hook-form';
import useAuth from '../hooks/useAuth';
import loadingAnimation from "../assets/json/verifying.json";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const SignIn = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const { signinUser, signinGoogle } = useAuth();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    const onSubmit = data => {
        setLoading(true);
        signinUser(data.email, data.password)
            .then(() => {
                setTimeout(() => {
                    navigate("/");
                    // setLoading(false); [if we use this then after animation the login page is showed before moving to "/"]
                }, 1000);
            })

            .catch(error => {
                setLoading(false);
                toast.error(getAuthErrorMessage(error), {
                    position: "top-right",
                    autoClose: 1500,
                    theme: "light"
                });
            })

    }

    function getAuthErrorMessage(error) {
        switch (error.code) {
            case "auth/invalid-credential":
            case "auth/wrong-password":
                return "Incorrect password. Please try again.";
            case "auth/user-not-found":
                return "No account found with this email.";
            case "auth/too-many-requests":
                return "Too many attempts. Please try again later.";
            case "auth/network-request-failed":
                return "Network error. Please check your connection.";
            default:
                return "Authentication failed. Please try again.";
        }
    }

    const handleGoogleSignin = () => {
        setLoading(true);
        signinGoogle()
            .then(() => {
                setTimeout(() => {
                    navigate("/");
                }, 1000);
            })
            .catch(error => {
                setLoading(false);
                toast.error(getAuthErrorMessage(error), {
                    position: "top-right",
                    autoClose: 1500,
                    theme: "light"
                });
            })

    }

    return (
        <div
            data-aos="zoom-out"
            data-aos-offset="100"
            data-aos-delay="40"
            data-aos-duration="700"
            data-aos-easing="ease-in-out"
        >
            {loading && (
                <div className="fixed inset-0 flex flex-col items-center justify-center bg-white  z-50">
                    <Lottie className='md:hidden' animationData={loadingAnimation} loop={true} style={{ width: 350, height: 350 }} />
                    <Lottie className='hidden lg:flex' animationData={loadingAnimation} loop={true} style={{ width: 500, height: 500 }} />
                    {/* <span className="text-[#03373D] font-bold mt-4 text-lg">Signing in...</span> */}
                </div>
            )}
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
            <ToastContainer />
        </div>

    );
};

export default SignIn;
