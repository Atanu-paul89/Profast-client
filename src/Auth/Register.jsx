import React, { useState } from 'react';
import Lottie from "lottie-react";
import registerAnimation from "../../src/assets/json/register.json";
import { Link, useNavigate } from 'react-router';
import { FcGoogle } from "react-icons/fc";
import { useForm } from 'react-hook-form';
import useAuth from '../hooks/useAuth';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import accountCreatedAnimation from "../assets/json/accountedCreated.json";
import useAxiosSecure from '../hooks/useAxiosSecure';
import Swal from 'sweetalert2';

const Register = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const { createUser, signinGoogle, updateUserProfile, saveUserToDB } = useAuth();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const axiosSecure = useAxiosSecure();


    const uploadImageToCloudinary = async (file) => {
        if (!file) throw new Error("No file provided");

        const formData = new FormData();
        formData.append("photo", file);

        const res = await fetch(import.meta.env.VITE_BACKEND_URL, {
            method: "POST",
            body: formData
        });

        if (!res.ok) {
            const errorText = await res.text();
            console.error("Cloudinary error response:", errorText);
            throw new Error("Cloudinary upload failed");
        }

        const data = await res.json();
        // return data.secure_url;
        return data.url;
    };

    const onSubmit = data => {
        setLoading(true);

        createUser(data.email, data.password)
            .then(() => {
                // Get the file from input
                const file = data.file?.[0];

                // Upload to Cloudinary if file exists
                if (file) {
                    return uploadImageToCloudinary(file);
                }
                return null; // no photo
            })
            .then(photoURL => {
                // ✅ Update Firebase profile
                return updateUserProfile({
                    displayName: data.name,
                    photoURL
                }).then(() => photoURL); // pass photoURL to next .then()
            })
            .then(photoURL => {
                // ✅ Save user to DB
                const userData = {
                    name: data.name,
                    email: data.email,
                    contactNo: data.contactNo,
                    photoURL,
                    role: "merchant", // default role
                    createdAt: new Date()
                };
                console.log(userData);

                // Axios to send data to Database ********//
                axiosSecure.post('/users', userData)
                    .then(res => {
                        console.log(res.data);

                        // Request JWT token after registration
                        axiosSecure.post("/jwt", { email: data.email })
                            .then(res => {
                                localStorage.setItem("access-token", res.data.token); // Store token
                            });
                        // jwt logic ended // 
                    })
                    .catch(err => {
                        console.error("Error saving data:", err);
                        Swal.fire("Error", "Failed to save User Data. Please try again.", "error");
                    })

                // navigate("/");


            })


            .catch(error => {
                // Handle errors from any step
                console.error("Registration error:", error);
                toast.error(getAuthErrorMessage(error), {
                    position: "top-right",
                    autoClose: 2000,
                    theme: "light"
                });
                setLoading(false);
            });
    };

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
            case "auth/email-already-in-use":
                return "This email is already registered. Please use another email or sign in.";
            case "auth/invalid-email":
                return "Invalid email address. Please check and try again.";
            case "auth/weak-password":
                return "Password is too weak. Please use a stronger password.";
            default:
                return error.message || "Authentication failed. Please try again.";
        }
    }


    const handleGoogleRegister = async () => {
        try {
            const result = await signinGoogle();
            const googleUser = result.user;

            // Save Google user to DB
            const userData = {
                name: googleUser.displayName,
                email: googleUser.email,
                contactNo: "",
                photoURL: googleUser.photoURL,
                role: "merchant",
                createdAt: new Date()
            };
            await saveUserToDB(userData);

            // Request JWT token after saving user
            const jwtRes = await axiosSecure.post("/jwt", { email: googleUser.email });
            localStorage.setItem("access-token", jwtRes.data.token);

            // ✅ Now show animation
            setLoading(true);

        } catch (error) {
            setLoading(false);
            toast.error(getAuthErrorMessage(error), { autoClose: 2000 });
        }
    };

    return (

        <div
            data-aos="zoom-out"
            data-aos-offset="100"
            data-aos-delay="40"
            data-aos-duration="700"
            data-aos-easing="ease-in-out"
        >

            {loading && (
                <div className="fixed inset-0 flex flex-col items-center justify-center bg-white z-50">
                    {window.innerWidth < 768 ? (
                        <Lottie animationData={accountCreatedAnimation} loop={false} style={{ width: 350, height: 350 }}
                            onComplete={() => {
                                navigate("/");
                            }} />
                    ) : (
                        <Lottie animationData={accountCreatedAnimation} loop={false} style={{ width: 600, height: 600 }}
                            onComplete={() => {
                                navigate("/");
                            }}
                        />
                    )}
                </div>
            )}

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
                            {/* Contact Number Bangladeshi */}
                            <label className="text-sm">Contact No</label>
                            <input
                                type="tel"
                                placeholder="+8801XXXXXXXXX"
                                required
                                {...register('contactNo', {
                                    pattern: {
                                        value: /^\+8801[3-9]\d{8}$/,
                                        message: "Invalid Bangladeshi phone number"
                                    }
                                })}
                                className="w-full border border-[#E0E0E0] rounded-md px-4 py-2 text-sm"
                            />
                            {
                                errors.contactNo?.type === 'pattern' &&
                                <p className='text-red-500'>Invalid Bangladeshi phone number</p>
                            }
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

                    <button onClick={handleGoogleRegister} className="w-full cursor-pointer flex items-center justify-center gap-2  bg-[#E9ECF1] py-2 rounded-md hover:bg-gray-100 transition">
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
            </section>
            <ToastContainer></ToastContainer>
        </div>
    );
};

export default Register;

