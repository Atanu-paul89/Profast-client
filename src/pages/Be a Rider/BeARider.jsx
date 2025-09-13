import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import rightrider from "../../../src/assets/agent-pending.png";
import locationData from "../../assets/data/profast_offices_full.json";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { Link, useNavigate } from "react-router";
import riderAnimation from "../../assets/json/rider.json"
import Lottie from "lottie-react";
import { motion } from "framer-motion";
import pauseAnimation from "../../../src/assets/json/Warning Sign.json";

const BeARider = () => {
    const {
        register,
        handleSubmit,
        watch,
        setValue,
        reset,
        formState: { errors },
    } = useForm();
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();
    const navigate = useNavigate();

    const [districts, setDistricts] = useState([]);
    const watchRegion = watch("region");
    const watchDob = watch("dob");
    const watchHasLicense = watch("hasLicense");
    const [riderApplicationStatus, setRiderApplicationStatus] = useState();
    const [loading, setLoading] = useState(true);
    const [submissionPaused, setSubmissionPaused] = useState(false);
    const [userData, setUserData] = useState(null);


    // Calculate age when DOB changes
    React.useEffect(() => {
        if (watchDob) {
            const today = new Date();
            const birthDate = new Date(watchDob);
            let age = today.getFullYear() - birthDate.getFullYear();
            const m = today.getMonth() - birthDate.getMonth();
            if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
                age--;
            }
            setValue("age", age);
        }
    }, [watchDob, setValue]);

    // Update districts based on region selection
    React.useEffect(() => {
        if (watchRegion && locationData[watchRegion.toLowerCase()]) {
            setDistricts(Object.keys(locationData[watchRegion.toLowerCase()]));
        } else {
            setDistricts([]);
        }
    }, [watchRegion]);

    //  fetching submission control api to renderui when no longer accepting application
    useEffect(() => {
        const checkSubmissionStatus = async () => {
            try {
                const res = await axiosSecure.get("/admin/rider-submission-control");
                setSubmissionPaused(res.data.paused);
            } catch (err) {
                console.error("Failed to fetch submission control:", err);
            }
        };

        checkSubmissionStatus();
    }, [axiosSecure]);


    // this will handle the form submission : including save data to db rider_form
    const onSubmit = async (data) => {
        try {
            // Set default license info if user selected "No"
            if (data.hasLicense === "No") {
                data.licenseType = "";
                data.vehicleType = "";
                data.licenseExpiry = "";
            }

            const res = await axiosSecure.post("/apply-rider", data);

            Swal.fire({
                icon: "success",
                iconColor: '#CAEB66',
                title: "Application Submitted!",
                text: res.data.message || "Thank you for applying to be a rider. Our team will review your info.",
                confirmButtonColor: "#03373D",
            }).then((result) => {
                if (result.isConfirmed) {
                    navigate("/dashboard/rider-result");
                }
            });

            reset();
        } catch (err) {
            console.error("Error submitting form:", err);
            Swal.fire({
                icon: "error",
                iconColor: '#CAEB66',
                title: "Submission Failed",
                text: err.response?.data?.message || "Something went wrong. Please try again.",
                confirmButtonColor: "#03373D",
            });
        }
    };

    // Fetch user data from backend
    useEffect(() => {
        const fetchUserDataAndApplication = async () => {
            if (!user?.email) {
                setLoading(false);
                return;
            }

            try {
                const userRes = await axiosSecure.get(`/users/${user.email}`);
                setUserData(userRes.data);
                const userData = userRes.data;
                console.log(userData);
                // const status = userData.IsRequestedToBeRider;

                if (userData?.IsRequestedToBeRider === "Approved & Application Deleted") {
                    setRiderApplicationStatus({ status: "Approved" });
                }


                if (userData?.IsRequestedToBeRider === "Yes") {
                    const riderFormRes = await axiosSecure.get(`/rider-form/${user.email}`);
                    setRiderApplicationStatus(riderFormRes.data);
                }
            }
            catch (err) {
                console.error("Error fetching data:", err);
            }
            finally {
                setLoading(false);
            }
        };

        fetchUserDataAndApplication();
    }, [user?.email, axiosSecure]);

    if (loading) {
        return <p className="text-center mt-10 h-64 text-[#CAEB66]"><span className="loading loading-spinner  text-[#CAEB66] loading-xl"></span></p>;
    }

    // This ui will be rendered if user already submitted a form and it is pending // 
    if (riderApplicationStatus?.status === "Pending") {
        return (
            <div className=" my-3  rounded-2xl bg-white">
                <div className=" flex flex-col items-center justify-center pb-5 ">
                    <Lottie animationData={riderAnimation} loop={true} style={{ width: 300, height: 300 }} />
                    <h2 className="lg:text-2xl px-4 lg:px-0 font-bold text-[#03373D] text-center">You have already applied to be a rider</h2>
                    <p className="mt-2 text-sm lg:text-lg font-semibold">
                        Status:{" "}
                        <span className="font-bold text-yellow-500">
                            {riderApplicationStatus?.status}
                        </span>
                    </p>
                </div>
                <div className="flex pb-5 justify-center">
                    <Link to="/dashboard/rider-result">
                        <button className=" bg-[#03373D] text-[#CAEB66] text-sm font-semibold cursor-pointer px-4 rounded-md py-2 ">Check Update</button>
                    </Link>
                </div>
            </div>
        );
    }

    // This Ui will be rendered when user have rider approval
    if (riderApplicationStatus?.status === "Approved") {
        return (
            <div className=" my-3  rounded-2xl bg-white">
                <div className=" flex flex-col items-center justify-center pb-5 ">
                    <Lottie animationData={riderAnimation} loop={true} style={{ width: 300, height: 300 }} />
                    <h2 className="lg:text-2xl px-4 lg:px-0 font-bold text-[#03373D] text-center">You Are Already Selected As a rider</h2>
                    <p className="mt-2 text-sm lg:text-lg font-semibold">
                        Status:{" "}
                        <span className="font-bold text-green-500">
                            Approved
                        </span>
                    </p>
                </div>
                <div className="flex pb-5 justify-center">
                    <Link to="/dashboard/rider-result">
                        <button className=" bg-[#03373D] text-[#CAEB66] text-sm font-semibold cursor-pointer px-4 rounded-md py-2 ">Check here</button>
                    </Link>
                </div>
            </div>
        );
    }

    // this will be rendered when system is no longer accepting any application 
    if (submissionPaused) {
        return (
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="flex flex-col items-center justify-center px-4 py-10 text-center bg-white my-4 rounded-3xl shadow-md"
            >
                <div className="w-[100px] md:w-[150px] lg:w-[200px] mb-6">
                    <Lottie animationData={pauseAnimation} loop={true} />
                </div>

                <h2 className="text-xl md:text-2xl font-bold text-red-500">
                    🚫 Rider Applications Are Temporarily Paused
                </h2>

                <p className="mt-3 text-sm md:text-base text-[#03373D] font-medium max-w-xl">
                    We're currently not accepting new rider applications. <br /> We sincerely apologize <span className="">for the inconvenience. <br /> This pause helps us ensure quality and <br /> fairness in our onboarding process.</span>

                </p>

                <p className="mt-2 text-sm md:text-base text-[#03373D] font-medium">
                    Please check back soon or contact support for updates.
                </p>

                <button
                    onClick={() => navigate("/contact-us")}
                    className="mt-6 px-6 py-2 bg-[#CAEB66] cursor-pointer text-[#03373D] font-bold rounded-lg hover:opacity-90 transition"
                >
                    Contact Support
                </button>
            </motion.div>
        );

    };

    // this will be rendered when a particular user is restricted to submit the rider application
    if (userData?.riderFormRestricted === true) {
        return (
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="flex flex-col items-center justify-center px-4 py-10 text-center bg-white my-4 rounded-3xl shadow-md"
            >
                <div className="w-[100px] md:w-[150px] lg:w-[200px] mb-6">
                    <Lottie animationData={pauseAnimation} loop={true} />
                </div>

                <h2 className="text-xl md:text-2xl font-bold text-red-500">🚫 You Are Restricted From Applying</h2>

                <p className="mt-3 text-sm md:text-base text-[#03373D] font-medium max-w-xl">
                    An admin has restricted your access to the rider application form. If you believe this is a mistake, please contact support.
                </p>

                <button
                    onClick={() => navigate("/contact-us")}
                    className="mt-6 px-6 py-2 bg-[#CAEB66] cursor-pointer text-[#03373D] font-bold rounded-lg hover:opacity-90 transition"
                >
                    Contact Support
                </button>
            </motion.div>
        );
    }


    // Default rendered UI , contains the form  // 
    return (

        <div
            data-aos="fade-left"
            data-aos-offset="100"
            data-aos-delay="100"
            data-aos-duration="600"
            data-aos-easing="ease-in-out"
        >
            <section className="bg-white rounded-3xl my-3 lg:my-5 py-5 lg:py-10 px-1 lg:px-20">
                <div className="text-center lg:text-left mb-10 max-w-3xl">
                    <div className="w-full lg:w-1/3 lg:hidden place-items-center">
                        <img
                            src={rightrider}
                            alt="Rider Illustration"
                            className="w-1/3 h-1/3 object-contain"
                        />
                    </div>
                    <h2 className="text-[#03373D] text-3xl font-bold mb-3">Be a Rider </h2>
                    <p className="text-[#606060] text-sm lg:text-base">
                        Enjoy fast, reliable parcel delivery with real-time tracking and
                        zero hassle. From personal packages to business shipments — we
                        deliver on time, every time.
                    </p>
                </div>

                <div className="lg:border-t-2 lg:border-gray-200 flex flex-col lg:flex-row items-center gap-10">

                    {/* Form Section */}
                    <form
                        onSubmit={handleSubmit(onSubmit)}
                        className="w-full lg:w-2/3 grid grid-cols-1 md:grid-cols-2 gap-6 p-6"
                    >
                        {/* Name */}
                        <div>
                            <label className="block text-sm font-medium text-[#03373D] mb-1">
                                Your Name
                            </label>
                            <input
                                type="text"
                                value={user?.displayName || ""}
                                readOnly
                                {...register("name", { required: true })}
                                className="w-full border border-[#E0E0E0] rounded-md px-4 py-2 text-sm bg-gray-100 cursor-not-allowed"
                            />
                            {errors.name && (
                                <p className="text-red-500 text-xs">Name is required</p>
                            )}
                        </div>

                        {/* Age */}
                        <div>
                            <label className="block text-sm font-medium text-[#03373D] mb-1">
                                Your Age
                            </label>
                            <input
                                type="number"
                                {...register("age")}
                                readOnly
                                placeholder="Age"
                                className="w-full border border-[#E0E0E0] rounded-md px-4 cursor-not-allowed py-2 text-sm bg-gray-100"
                            />
                        </div>

                        {/* Email */}
                        <div>
                            <label className="block text-sm font-medium text-[#03373D] mb-1">
                                Your Email
                            </label>
                            <input
                                type="email"
                                defaultValue={user?.email || ""}
                                readOnly
                                {...register("email", { required: true })}
                                className="w-full border border-[#E0E0E0] rounded-md px-4 py-2 text-sm bg-gray-100 cursor-not-allowed"
                            />
                            {errors.email && (
                                <p className="text-red-500 text-xs">Valid email is required</p>
                            )}
                        </div>

                        {/* Region */}
                        <div>
                            <label className="block text-sm font-medium text-[#03373D] mb-1">
                                Your Region
                            </label>
                            <select
                                {...register("region", { required: true })}
                                className="w-full border border-[#E0E0E0] rounded-md px-4 py-2 text-sm"
                            >
                                <option value="">Select your region</option>
                                {Object.keys(locationData).map((region) => (
                                    <option key={region} value={region}>
                                        {region.charAt(0).toUpperCase() + region.slice(1)}
                                    </option>
                                ))}
                            </select>
                            {errors.region && (
                                <p className="text-red-500 text-xs">Region is required</p>
                            )}
                        </div>

                        {/* NID */}
                        <div>
                            <label className="block text-sm font-medium text-[#03373D] mb-1">
                                NID No
                            </label>
                            <input
                                type="text"
                                {...register("nid", {
                                    required: true,
                                    pattern: /^[0-9]{10}$/,
                                })}
                                placeholder="National ID No"
                                className="w-full border border-[#E0E0E0] rounded-md px-4 py-2 text-sm"
                            />
                            {errors.nid && (
                                <p className="text-red-500 text-xs">
                                    NID must be exactly 10 digits
                                </p>
                            )}
                        </div>

                        {/* Contact */}
                        <div>
                            <label className="block text-sm font-medium text-[#03373D] mb-1">
                                Contact
                            </label>
                            <input
                                type="text"
                                {...register("contact", {
                                    required: true,
                                    pattern: /^\+8801[0-9]{9}$/,
                                })}
                                placeholder="+8801XXXXXXXXX"
                                className="w-full border border-[#E0E0E0] rounded-md px-4 py-2 text-sm"
                            />
                            {errors.contact && (
                                <p className="text-red-500 text-xs">
                                    Must be a valid Bangladeshi number that start with +88
                                </p>
                            )}
                        </div>

                        {/* Gender */}
                        <div>
                            <label className="block text-sm font-medium text-[#03373D] mb-1">
                                Gender
                            </label>
                            <select
                                {...register("gender", { required: true })}
                                className="w-full border border-[#E0E0E0] rounded-md px-4 py-2 text-sm"
                            >
                                <option value="">Select gender</option>
                                <option>Male</option>
                                <option>Female</option>
                                <option>Transgender</option>
                            </select>
                            {errors.gender && (
                                <p className="text-red-500 text-xs">Gender is required</p>
                            )}
                        </div>

                        {/* Date of Birth */}
                        <div>
                            <label className="block text-sm font-medium text-[#03373D] mb-1">
                                Date of Birth (as per NID)
                            </label>
                            <input
                                type="date"
                                {...register("dob", { required: true })}
                                className="w-full border border-[#E0E0E0] rounded-md px-4 py-2 text-sm"
                            />
                            {errors.dob && (
                                <p className="text-red-500 text-xs">Date of birth required</p>
                            )}
                        </div>

                        {/* NID Link */}
                        <div className="md:col-span-2">
                            <label className="block text-sm font-medium text-[#03373D] mb-1">
                                NID Photo/PDF Link
                            </label>
                            <input
                                type="url"
                                {...register("nidLink", { required: true })}
                                placeholder="https://example.com/nid"
                                className="w-full border border-[#E0E0E0] rounded-md px-4 py-2 text-sm"
                            />
                            {errors.nidLink && (
                                <p className="text-red-500 text-xs">Valid URL required</p>
                            )}
                        </div>

                        {/* District */}
                        <div className="md:col-span-2">
                            <label className="block text-sm font-medium text-[#03373D] mb-1">
                                Which District you want to work?
                            </label>
                            <select
                                {...register("district", { required: true })}
                                className="w-full border border-[#E0E0E0] rounded-md px-4 py-2 text-sm"
                            >
                                <option value="">Select warehouse</option>
                                {districts.map((d) => (
                                    <option key={d} value={d}>
                                        {d.charAt(0).toUpperCase() + d.slice(1)}
                                    </option>
                                ))}
                            </select>
                            {errors.district && (
                                <p className="text-red-500 text-xs">District is required</p>
                            )}
                        </div>

                        {/* Driving License Section */}
                        <div className="md:col-span-2">
                            <label className="block text-sm font-medium text-[#03373D] mb-1">
                                Do you have a Driving License?
                            </label>
                            <div className="flex gap-4">
                                <label className="flex items-center gap-1">
                                    <input
                                        type="radio"
                                        value="Yes"
                                        {...register("hasLicense", { required: true })}
                                    />
                                    Yes
                                </label>
                                <label className="flex items-center gap-1">
                                    <input
                                        type="radio"
                                        value="No"
                                        {...register("hasLicense", { required: true })}
                                    />
                                    No
                                </label>
                            </div>
                            {errors.hasLicense && (
                                <p className="text-red-500 text-xs">Please select an option</p>
                            )}
                        </div>

                        {/* Conditional License Fields */}
                        {watchHasLicense === "Yes" && (
                            <>
                                {/* License Type */}
                                <div>
                                    <label className="block text-sm font-medium text-[#03373D] mb-1">
                                        License Type
                                    </label>
                                    <select
                                        {...register("licenseType", { required: true })}
                                        className="w-full border border-[#E0E0E0] rounded-md px-4 py-2 text-sm"
                                    >
                                        <option value="">Select type</option>
                                        <option>Professional</option>
                                        <option>Non Professional</option>
                                    </select>
                                    {errors.licenseType && (
                                        <p className="text-red-500 text-xs">License type required</p>
                                    )}
                                </div>

                                {/* Vehicle Type */}
                                <div>
                                    <label className="block text-sm font-medium text-[#03373D] mb-1">
                                        Vehicle Type
                                    </label>
                                    <select
                                        {...register("vehicleType", { required: true })}
                                        className="w-full border border-[#E0E0E0] rounded-md px-4 py-2 text-sm"
                                    >
                                        <option value="">Select vehicle</option>
                                        <option>Light (Both Car & Bike)</option>
                                        <option>Light (Bike)</option>
                                        <option>Light (Car)</option>
                                        <option>Heavy (14 wheels)</option>
                                        <option>Heavy (18 wheels)</option>
                                        <option>Heavy (22 wheels)</option>
                                        <option>Heavy (8 wheels)</option>
                                    </select>
                                    {errors.vehicleType && (
                                        <p className="text-red-500 text-xs">Vehicle type required</p>
                                    )}
                                </div>

                                {/* License Expiry */}
                                <div>
                                    <label className="block text-sm font-medium text-[#03373D] mb-1">
                                        License Expiry Date
                                    </label>
                                    <input
                                        type="date"
                                        {...register("licenseExpiry", { required: true })}
                                        className="w-full border border-[#E0E0E0] rounded-md px-4 py-2 text-sm"
                                    />
                                    {errors.licenseExpiry && (
                                        <p className="text-red-500 text-xs">Expiry date required</p>
                                    )}
                                </div>
                            </>
                        )}

                        {/* Submit */}
                        <div className="md:col-span-2">
                            <button
                                type="submit"
                                className="w-full cursor-pointer bg-[#CAEB66] text-[#03373D] font-semibold py-2 rounded-md hover:opacity-90 transition"
                            >
                                Submit
                            </button>
                        </div>
                    </form>

                    {/* Right Image */}
                    <div className="w-full lg:w-3/5 hidden lg:flex">
                        <img
                            src={rightrider}
                            alt="Rider Illustration"
                            className="w-full h-auto object-contain"
                        />
                    </div>
                </div>
            </section>

        </div>
    );
};

export default BeARider;


