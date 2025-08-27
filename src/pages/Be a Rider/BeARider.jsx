import React, { useState } from "react";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import rightrider from "../../../src/assets/agent-pending.png";
import locationData from "../../assets/data/profast_offices_full.json";

const BeARider = () => {
    const {
        register,
        handleSubmit,
        watch,
        setValue,
        reset,
        formState: { errors },
    } = useForm();

    const [districts, setDistricts] = useState([]);
    const watchRegion = watch("region");
    const watchDob = watch("dob");

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

    const onSubmit = (data) => {
        Swal.fire({
            title: "🛵 Rider Application",
            html: `
      <div style="text-align:left; font-size:14px; line-height:1.6;">
        <h3 style="margin:0; color:#03373D;">Personal Info</h3>
        <p><b>Name:</b> ${data.name}</p>
        <p><b>Email:</b> ${data.email}</p>
        <p><b>Gender:</b> ${data.gender}</p>
        <p><b>Date of Birth:</b> ${data.dob}</p>
        <p><b>Age:</b> ${data.age} years</p>

        <hr/>
        <h3 style="margin:0; color:#03373D;">Work Preference</h3>
        <p><b>Region:</b> ${data.region}</p>
        <p><b>District:</b> ${data.district}</p>

        <hr/>
        <h3 style="margin:0; color:#03373D;">Identification</h3>
        <p><b>NID No:</b> ${data.nid}</p>
        <p><b>NID Link:</b> <a href="${data.nidLink}" target="_blank" style="color:blue;">View NID</a></p>

        <hr/>
        <h3 style="margin:0; color:#03373D;">Contact</h3>
        <p><b>Phone:</b> ${data.contact}</p>
      </div>
    `,
            icon: "info",
            showCancelButton: true,
            confirmButtonColor: "#CAEB66",
            cancelButtonColor: "#d33",
            confirmButtonText: "Submit",
            cancelButtonText: "Cancel",
            background: "#F7F9F9",
            color: "#03373D",
            customClass: {
                popup: "rounded-3xl",
                confirmButton: "font-bold",
                cancelButton: "font-bold",
                title: "font-bold",
            },
            width: 600,
        }).then((result) => {
            if (result.isConfirmed) {
                console.log("Form submitted:", data); // 👈 you’ll see all form data here
                reset(); // 👈 clears the form after confirm
                Swal.fire({
                    icon: "success",
                    title: "Application Submitted!",
                    text: "Thank you for applying to be a rider. Our team will review your info.",
                    confirmButtonColor: "#CAEB66",
                });
            }
        });
    };

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
                    <h2 className="text-[#03373D] text-3xl font-bold mb-3">Be a Rider</h2>
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
                                {...register("name", { required: true })}
                                placeholder="Full Name"
                                className="w-full border border-[#E0E0E0] rounded-md px-4 py-2 text-sm"
                            />
                            {errors.name && (
                                <p className="text-red-500 text-xs">Name is required</p>
                            )}
                        </div>

                        {/* Age (auto-calculated) */}
                        <div>
                            <label className="block text-sm font-medium text-[#03373D] mb-1">
                                Your Age
                            </label>
                            <input
                                type="number"
                                {...register("age")}
                                readOnly
                                placeholder="Age"
                                className="w-full border border-[#E0E0E0] rounded-md px-4 py-2 text-sm bg-gray-100"
                            />
                        </div>

                        {/* Email */}
                        <div>
                            <label className="block text-sm font-medium text-[#03373D] mb-1">
                                Your Email
                            </label>
                            <input
                                type="email"
                                {...register("email", { required: true })}
                                placeholder="name@gmail.com"
                                className="w-full border border-[#E0E0E0] rounded-md px-4 py-2 text-sm"
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

                        {/* District (dependent on region) */}
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
