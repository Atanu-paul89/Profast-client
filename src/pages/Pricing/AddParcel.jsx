import React, { useState } from 'react';
import { motion } from 'framer-motion';
import useAuth from '../../hooks/useAuth';

const regions = [
  'Dhaka', 'Chattogram', 'Rajshahi', 'Khulna', 'Barishal', 'Rangpur', 'Mymensingh', 'Sylhet'
];

const warehouses = [
  'Central Hub', 'North Hub', 'South Hub', 'East Hub', 'West Hub'
];

const labelCls = 'block text-sm font-semibold text-[#03373D] mb-1';
const inputCls = 'w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm text-[#03373D] outline-none focus:border-[#CAEB66] focus:ring-1 focus:ring-[#CAEB66]';
const textareaCls = 'w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm text-[#03373D] outline-none focus:border-[#CAEB66] focus:ring-1 focus:ring-[#CAEB66] min-h-[96px]';

const AddParcel = () => {
  const { user } = useAuth() || {};
  const [isDocument, setIsDocument] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const payload = Object.fromEntries(fd.entries());
    // You can replace this with your API call
    console.log('Add Parcel payload:', payload);
  };

  return (
    <section className="lg:min-h-screen px-4 md:px-8 lg:px-20 py-8 lg:py-12 bg-white rounded-3xl my-4 text-[#03373D]">
      {/* Header */}
      <div className="mb-6 lg:mb-8 pb-4 border-b border-gray-200">
        <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold">Add Parcel</h2>
        <p className="text-gray-500 text-sm md:text-base mt-1">
          Fill in the parcel details below. We’ll confirm pickup and keep you updated in real-time.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
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
                className={`px-4 cursor-pointer py-1.5 text-sm rounded-full transition ${
                  isDocument ? 'bg-[#CAEB66] text-[#03373D] font-semibold' : 'text-gray-600'
                }`}
              >
                Yes
              </button>
              <button
                type="button"
                onClick={() => setIsDocument(false)}
                className={`px-4 cursor-pointer py-1.5 text-sm rounded-full transition ${
                  !isDocument ? 'bg-[#CAEB66] text-[#03373D] font-semibold' : 'text-gray-600'
                }`}
              >
                No
              </button>
            </div>
            {/* Hidden field to submit value */}
            <input type="hidden" name="isDocument" value={isDocument ? 'yes' : 'no'} />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
            <div>
              <label className={labelCls}>Parcel name</label>
              <input name="parcelName" placeholder="e.g., Documents, Gift box, Electronics" className={inputCls} required />
            </div>
            <div>
              <label className={labelCls}>Weight</label>
              <div className="flex items-center">
                <input
                  name="weight"
                  type="number"
                  min="0"
                  step="0.1"
                  placeholder="e.g., 1.5"
                  className={`${inputCls} rounded-r-none`}
                  required
                />
                <span className="inline-flex items-center px-3 py-2 border border-l-0 border-gray-300 rounded-r-md text-sm bg-[#F7F9F9] text-gray-600">
                  kg
                </span>
              </div>
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
              <input name="senderName" defaultValue={user?.displayName || ''} placeholder="Your full name" className={inputCls} required />
            </div>
            <div>
              <label className={labelCls}>Sender contact number</label>
              <input name="senderPhone" defaultValue={user?.phoneNumber || ''} placeholder="e.g., 01XXXXXXXXX" className={inputCls} required />
            </div>
            <div>
              <label className={labelCls}>Sender address</label>
              <textarea name="senderAddress" placeholder="House, road, area, city" className={textareaCls} required />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label className={labelCls}>Region</label>
                <select name="senderRegion" className={inputCls} defaultValue="">
                  <option value="" disabled>Select region</option>
                  {regions.map(r => <option key={r} value={r}>{r}</option>)}
                </select>
              </div>
              <div>
                <label className={labelCls}>Warehouse</label>
                <select name="senderWarehouse" className={inputCls} defaultValue="">
                  <option value="" disabled>Select warehouse</option>
                  {warehouses.map(w => <option key={w} value={w}>{w}</option>)}
                </select>
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
              <input name="receiverName" placeholder="Receiver’s full name" className={inputCls} required />
            </div>
            <div>
              <label className={labelCls}>Receiver contact number</label>
              <input name="receiverPhone" placeholder="e.g., 01XXXXXXXXX" className={inputCls} required />
            </div>
            <div>
              <label className={labelCls}>Receiver address</label>
              <textarea name="receiverAddress" placeholder="House, road, area, city" className={textareaCls} required />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label className={labelCls}>Region</label>
                <select name="receiverRegion" className={inputCls} defaultValue="">
                  <option value="" disabled>Select region</option>
                  {regions.map(r => <option key={r} value={r}>{r}</option>)}
                </select>
              </div>
              <div>
                <label className={labelCls}>Warehouse</label>
                <select name="receiverWarehouse" className={inputCls} defaultValue="">
                  <option value="" disabled>Select warehouse</option>
                  {warehouses.map(w => <option key={w} value={w}>{w}</option>)}
                </select>
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
                name="pickupInstructions"
                placeholder="e.g., Call on arrival, gate code, pickup from reception"
                className={textareaCls}
              />
            </div>
            <div>
              <label className={labelCls}>Delivery instructions</label>
              <textarea
                name="deliveryInstructions"
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





