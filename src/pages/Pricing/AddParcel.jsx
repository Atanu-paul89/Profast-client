import React, { useState } from 'react';
import { motion } from 'framer-motion';
import useAuth from '../../hooks/useAuth';
import { useForm } from 'react-hook-form';
import Swal from 'sweetalert2';
import Lottie from "lottie-react";
import parcelAnimation from "../../assets/json/addParcel.json"
import { Link } from 'react-router';
import { TfiHandPointLeft, TfiHandPointRight } from "react-icons/tfi";
import useAxiosSecure from '../../hooks/useAxiosSecure';

// divisions and distances
const divisions = [
  'Dhaka', 'Chattogram', 'Rajshahi', 'Khulna', 'Barishal', 'Rangpur', 'Mymensingh', 'Sylhet'
];

const warehouses = [
  'Central Hub', 'North Hub', 'South Hub', 'East Hub', 'West Hub'
];

const parcelTypes = {
  documents: {
    baseFare: 9,
    intraDivision: { perKg: 4, perKm: 0.15 },
    interDivision: { perKg: 7, perKm: 0.4 }
  },
  electronics: {
    baseFare: 14,
    intraDivision: { perKg: 7, perKm: 0.25 },
    interDivision: { perKg: 10, perKm: 0.7 }
  },
  fragile_items: {
    baseFare: 23,
    intraDivision: { perKg: 10, perKm: 0.35 },
    interDivision: { perKg: 14, perKm: 1.0 }
  },
  general_goods: {
    baseFare: 14,
    intraDivision: { perKg: 5, perKm: 0.2 },
    interDivision: { perKg: 7, perKm: 0.5 }
  }
};

const divisionDistances = {
  Dhaka: { Dhaka: 10, Chattogram: 245, Rajshahi: 245, Khulna: 260, Barishal: 120, Rangpur: 300, Mymensingh: 120, Sylhet: 240 },
  Chattogram: { Dhaka: 245, Chattogram: 10, Rajshahi: 480, Khulna: 400, Barishal: 320, Rangpur: 540, Mymensingh: 350, Sylhet: 320 },
  Rajshahi: { Dhaka: 245, Chattogram: 480, Rajshahi: 10, Khulna: 270, Barishal: 340, Rangpur: 160, Mymensingh: 260, Sylhet: 420 },
  Khulna: { Dhaka: 260, Chattogram: 400, Rajshahi: 270, Khulna: 10, Barishal: 180, Rangpur: 400, Mymensingh: 320, Sylhet: 480 },
  Barishal: { Dhaka: 120, Chattogram: 320, Rajshahi: 340, Khulna: 180, Barishal: 10, Rangpur: 420, Mymensingh: 220, Sylhet: 340 },
  Rangpur: { Dhaka: 300, Chattogram: 540, Rajshahi: 160, Khulna: 400, Barishal: 420, Rangpur: 10, Mymensingh: 220, Sylhet: 380 },
  Mymensingh: { Dhaka: 120, Chattogram: 350, Rajshahi: 260, Khulna: 320, Barishal: 220, Rangpur: 220, Mymensingh: 10, Sylhet: 220 },
  Sylhet: { Dhaka: 240, Chattogram: 320, Rajshahi: 420, Khulna: 480, Barishal: 340, Rangpur: 380, Mymensingh: 220, Sylhet: 10 },
};

const MIN_FARE_SAME_DIVISION = 45;
const MIN_FARE_DIFFERENT_DIVISION = 75;
const MIN_DISTANCE_SAME_DIVISION = 10;



const labelCls = 'block text-sm font-semibold text-[#03373D] mb-1';
const inputCls = 'w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm text-[#03373D] outline-none focus:border-[#CAEB66] focus:ring-1 focus:ring-[#CAEB66]';
const textareaCls = 'w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm text-[#03373D] outline-none focus:border-[#CAEB66] focus:ring-1 focus:ring-[#CAEB66] min-h-[96px]';

const AddParcel = () => {
  const { user } = useAuth() || {};
  const [isDocument, setIsDocument] = useState(false);
  const { register, handleSubmit, reset, formState: { errors } } = useForm();
  const axiosSecure = useAxiosSecure();


  const onSubmit = (data) => {
    data.isDocument = isDocument ? "yes" : "no";

    // map form input to our parcelTypes keys
    let parcelKey;
    if (isDocument) {
      parcelKey = "documents";
    } else {
      if (data.parcelType === "Electronics") parcelKey = "electronics";
      else if (data.parcelType === "Fragile Items") parcelKey = "fragile_items";
      else parcelKey = "general_goods";
    }

    // Calculate fare
    const weight = parseFloat(data.weight);
    const distance = divisionDistances[data.senderRegion][data.receiverRegion];
    const typeRates = parcelTypes[parcelKey];
    const sameDivision = data.senderRegion === data.receiverRegion;

    let baseFare = typeRates.baseFare;
    let perKg = sameDivision ? typeRates.intraDivision.perKg : typeRates.interDivision.perKg;
    let perKm = sameDivision ? typeRates.intraDivision.perKm : typeRates.interDivision.perKm;
    let distanceUsed = sameDivision ? Math.max(distance, MIN_DISTANCE_SAME_DIVISION) : distance;

    let totalFare = baseFare + weight * perKg + distanceUsed * perKm;
    totalFare = sameDivision
      ? Math.max(totalFare, MIN_FARE_SAME_DIVISION)
      : Math.max(totalFare, MIN_FARE_DIFFERENT_DIVISION);
    totalFare = Math.round(totalFare);

    // Generate unique Tracking ID
    const randomPart = Math.random().toString(36).substring(2, 7).toUpperCase();
    const datePart = new Date().toISOString().slice(0, 10).replace(/-/g, "");
    const trackingId = `PRF-${datePart}-${randomPart}`;

    // Metadata
    const createdAt = new Date().toISOString();
    const createdBy = {
      email: user?.email || "N/A",
      name: user?.displayName || "Anonymous",
    };

    // Build payload
    const parcelData = {
      ...data,
      parcelCategory: parcelKey,
      fare: totalFare,
      createdAt,
      createdBy,
      trackingId,
    };

    console.log("Add Parcel payload:", parcelData);

    // Axios to send data to Database ********//
    axiosSecure.post('/parcels', parcelData)
      .then(res => {
        console.log(res.data);
      })
      .catch(err => {
        console.error("Error saving parcel:", err);
        Swal.fire("Error", "Failed to save parcel. Please try again.", "error");
      })

    // sweet alert2 to show the details of parcels // 
    Swal.fire({
      title: "📦 Parcel Created Successfully",
      html: `
    <div style="text-align:left; font-size:14px; line-height:1.6;">
      <h3 style="margin:0; color:#03373D;">Tracking ID</h3>
      <p><b>${trackingId}</b></p>

      <hr/>
      <h3 style="margin:0; color:#03373D;">Cost Breakdown</h3>
      <p><b>Base Fare:</b> ${baseFare} BDT</p>
      <p><b>Weight Charge:</b> ${weight}kg × ${perKg} = ${weight * perKg} BDT</p>
      <p><b>Distance Charge:</b> ${distanceUsed}km × ${perKm} = ${(distanceUsed * perKm).toFixed(2)} BDT</p>
      <p style="margin-top:6px;"><b>Total Fare:</b> <span style="color:green; font-weight:bold;">${totalFare} BDT</span></p>

      <hr/>
      <h3 style="margin:0; color:#03373D;">Sender</h3>
      <p><b>Name:</b> ${data.senderName}</p>
      <p><b>Phone:</b> ${data.senderPhone}</p>
      <p><b>Address:</b> ${data.senderAddress}</p>

      <hr/>
      <h3 style="margin:0; color:#03373D;">Receiver</h3>
      <p><b>Name:</b> ${data.receiverName}</p>
      <p><b>Phone:</b> ${data.receiverPhone}</p>
      <p><b>Address:</b> ${data.receiverAddress}</p>

      <hr/>
      <h3 style="margin:0; color:#03373D;">Created By</h3>
      <p><b>User:</b> ${createdBy.name} (${createdBy.email})</p>
      <p><b>Created At:</b> ${new Date(createdAt).toLocaleString()}</p>
    </div>
  `,
      icon: "success",
      showCancelButton: true,
      confirmButtonText: "Proceed to Payment",
      cancelButtonText: "Cancel",
      confirmButtonColor: "#CAEB66",
      cancelButtonColor: "#d33",
      background: "#F7F9F9",
      color: "#03373D",
      customClass: {
        popup: "rounded-3xl",
        confirmButton: "font-bold",
        cancelButton: "font-bold",
        title: "font-bold",
      },
      width: 600
    }).then((result) => {
      if (result.isConfirmed) {
        // User chose to proceed to payment
        // TODO: call backend to save parcelData before redirect if/when backend is ready
        // Reset form and redirect to payment page (route example)
        reset();
        window.location.href = `dashboard/payment/${parcelData.trackingId}`;
      } else {
        // User cancelled: keep form as-is so they can edit
        console.log("User cancelled. Form preserved for edits.");
      }
    });


  };


  return (
    <section className="lg:min-h-screen px-4 md:px-8 lg:px-20 py-8 lg:py-12 bg-white rounded-3xl my-4 text-[#03373D]">
      {/* Header */}
      <div className="relative mb-6 lg:mb-8 pb-4 border-b border-gray-200">

        <Lottie className='absolute lg:hidden -top-12 left-25 h-[100px] w-[150px] lg:-top-14 lg:left-40' animationData={parcelAnimation} autoPlay={true} loop={true} />

        <Link to="/calculate-fare">
          <motion.p
            className="absolute md:flex items-center gap-1 right-5 -top-1 lg:-right-0 text-[#CAEB66] text-base lg:text-2xl hidden  font-bold"
            animate={{
              y: [0, -10, 0]
            }}
            transition={{
              duration: 1,
              repeat: Infinity,
              ease: 'easeInOut'
            }}
          >
            <TfiHandPointRight size={30} />Calculate your Fare <TfiHandPointLeft size={30} />
          </motion.p>
        </Link>


        <div className='flex items-center'>
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold ">Add Parcel</h2>
          <Lottie className='absolute hidden lg:flex lg:h-[120px] lg:w-[170px] lg:-top-14 lg:left-40' animationData={parcelAnimation} autoPlay={true} loop={true} />
        </div>
        <p className="text-gray-500 text-sm md:text-base mt-1">
          Fill in the parcel details below. We’ll confirm pickup and keep you updated in real-time.
        </p>
        <div className='place-items-center '>
          <p className='flex gap-1 md:hidden text-sm font-semibold '>Calculate fare <Link to="/calculate-fare"><span className='text-[#CAEB66] flex items-center gap-1 font-extrabold'> <TfiHandPointRight size={20} />Here</span></Link></p>
        </div>
      </div>


      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">

        {/* Parcel details */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="space-y-5"
        >
          <h3 className="text-lg md:text-xl font-bold">Parcel details</h3>

          {/* Document toggle */}
          <div className="flex flex-wrap items-center gap-3">
            <span className="text-sm font-semibold">Is it a document?</span>
            <div className="inline-flex rounded-full bg-[#F7F9F9] p-1 border border-gray-200">
              <button
                type="button"
                onClick={() => setIsDocument(true)}
                className={`px-4 cursor-pointer py-1.5 text-sm rounded-full transition ${isDocument ? 'bg-[#CAEB66] text-[#03373D] font-semibold' : 'text-gray-600'
                  }`}
              >
                Yes
              </button>
              <button
                type="button"
                onClick={() => setIsDocument(false)}
                className={`px-4 cursor-pointer py-1.5 text-sm rounded-full transition ${!isDocument ? 'bg-[#CAEB66] text-[#03373D] font-semibold' : 'text-gray-600'
                  }`}
              >
                No
              </button>
            </div>
          </div>
          {/* Parcel type (if not a document) */}
          {!isDocument && (
            <div className="w-full">
              <label className={labelCls}>Parcel Type</label>
              <select
                {...register("parcelType", { required: "Parcel type is required" })}
                className={inputCls}
                defaultValue=""
              >
                <option value="" disabled>Select Parcel Type</option>
                <option value="Electronics">Electronics</option>
                <option value="Fragile Items">Fragile Items</option>
                <option value="General Goods">General Goods</option>
              </select>
              {errors.parcelType && (
                <p className="text-red-500">{errors.parcelType.message}</p>
              )}
            </div>
          )}



          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
            <div>
              <label className={labelCls}>Parcel name</label>
              <input
                {...register("parcelName", { required: "Parcel name is required" })}
                placeholder="e.g., Documents, Gift box, Electronics"
                className={inputCls}
              />
              {errors.parcelName && <p className="text-red-500">{errors.parcelName.message}</p>}
            </div>
            <div>
              <label className={labelCls}>Weight</label>
              <div className="flex items-center">
                <input
                  {...register("weight", { required: "Weight is required", min: { value: 0, message: "Weight must be positive" } })}
                  type="number"
                  min="0"
                  step="0.1"
                  placeholder="e.g., 1.5"
                  className={`${inputCls} rounded-r-none`}
                />
                <span className="inline-flex items-center px-3 py-2 border border-l-0 border-gray-300 rounded-r-md text-sm bg-[#F7F9F9] text-gray-600">
                  kg
                </span>
              </div>
              {errors.weight && <p className="text-red-500">{errors.weight.message}</p>}
            </div>
          </div>
        </motion.div>

        {/* Sender details */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.05 }}
          className="space-y-5"
        >
          <h3 className="text-lg md:text-xl font-bold">Sender details</h3>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
            <div>
              <label className={labelCls}>Sender name</label>
              <input
                {...register("senderName", { required: "Sender name is required" })}
                defaultValue={user?.displayName || ''}
                placeholder="Your full name"
                className={inputCls}
              />
              {errors.senderName && <p className="text-red-500">{errors.senderName.message}</p>}
            </div>
            <div>
              <label className={labelCls}>Sender contact number</label>
              <input
                {...register("senderPhone", { required: "Sender contact number is required" })}
                defaultValue={user?.contactNo || ''}
                placeholder="e.g., 01XXXXXXXXX"
                className={inputCls}
              />
              {errors.senderPhone && <p className="text-red-500">{errors.senderPhone.message}</p>}
            </div>
            <div>
              <label className={labelCls}>Sender address</label>
              <textarea
                {...register("senderAddress", { required: "Sender address is required" })}
                placeholder="House, road, area, city"
                className={textareaCls}
              />
              {errors.senderAddress && <p className="text-red-500">{errors.senderAddress.message}</p>}
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label className={labelCls}>Region</label>
                <select
                  {...register("senderRegion", { required: "Region is required" })}
                  className={inputCls}
                  defaultValue=""
                >
                  <option value="" disabled>Select region</option>
                  {divisions.map(r => <option key={r} value={r}>{r}</option>)}
                </select>
                {errors.senderRegion && <p className="text-red-500">{errors.senderRegion.message}</p>}
              </div>
              <div>
                <label className={labelCls}>Warehouse</label>
                <select
                  {...register("senderWarehouse", { required: "Warehouse is required" })}
                  className={inputCls}
                  defaultValue=""
                >
                  <option value="" disabled>Select warehouse</option>
                  {warehouses.map(w => <option key={w} value={w}>{w}</option>)}
                </select>
                {errors.senderWarehouse && <p className="text-red-500">{errors.senderWarehouse.message}</p>}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Receiver details */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
          className="space-y-5"
        >
          <h3 className="text-lg md:text-xl font-bold">Receiver details</h3>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
            <div>
              <label className={labelCls}>Receiver name</label>
              <input
                {...register("receiverName", { required: "Receiver name is required" })}
                placeholder="Receiver’s full name"
                className={inputCls}
              />
              {errors.receiverName && <p className="text-red-500">{errors.receiverName.message}</p>}
            </div>
            <div>
              <label className={labelCls}>Receiver contact number</label>
              <input
                {...register("receiverPhone", { required: "Receiver contact number is required" })}
                placeholder="e.g., 01XXXXXXXXX"
                className={inputCls}
              />
              {errors.receiverPhone && <p className="text-red-500">{errors.receiverPhone.message}</p>}
            </div>
            <div>
              <label className={labelCls}>Receiver address</label>
              <textarea
                {...register("receiverAddress", { required: "Receiver address is required" })}
                placeholder="House, road, area, city"
                className={textareaCls}
              />
              {errors.receiverAddress && <p className="text-red-500">{errors.receiverAddress.message}</p>}
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label className={labelCls}>Region</label>
                <select
                  {...register("receiverRegion", { required: "Region is required" })}
                  className={inputCls}
                  defaultValue=""
                >
                  <option value="" disabled>Select region</option>
                  {divisions.map(r => <option key={r} value={r}>{r}</option>)}
                </select>
                {errors.receiverRegion && <p className="text-red-500">{errors.receiverRegion.message}</p>}
              </div>
              <div>
                <label className={labelCls}>Warehouse</label>
                <select
                  {...register("receiverWarehouse", { required: "Warehouse is required" })}
                  className={inputCls}
                  defaultValue=""
                >
                  <option value="" disabled>Select warehouse</option>
                  {warehouses.map(w => <option key={w} value={w}>{w}</option>)}
                </select>
                {errors.receiverWarehouse && <p className="text-red-500">{errors.receiverWarehouse.message}</p>}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Instructions */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.15 }}
          className="space-y-5"
        >
          <h3 className="text-lg md:text-xl font-bold">Instructions</h3>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
            <div>
              <label className={labelCls}>Pickup instructions</label>
              <textarea
                {...register("pickupInstructions")}
                placeholder="e.g., Call on arrival, gate code, pickup from reception"
                className={textareaCls}
              />
            </div>
            <div>
              <label className={labelCls}>Delivery instructions</label>
              <textarea
                {...register("deliveryInstructions")}
                placeholder="e.g., Hand over to guard, leave at front desk"
                className={textareaCls}
              />
            </div>
          </div>
        </motion.div>

        {/* Footer note + CTA */}
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 pt-4 border-t border-gray-200">
          <p className="text-gray-600 text-sm">
            Pickup time is approximately between 4:00 PM and 7:00 PM. We’ll notify you once it’s scheduled.
          </p>

          <button
            type="submit"
            className="inline-flex cursor-pointer items-center justify-center bg-[#CAEB66] text-[#03373D] font-bold px-6 py-3 rounded-md hover:opacity-90 transition w-full lg:w-auto"
          >
            Proceed to confirm booking
          </button>
        </div>
      </form>
    </section>
  );
};

export default AddParcel;
