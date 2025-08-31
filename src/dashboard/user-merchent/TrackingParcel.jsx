import React, { useState } from 'react';
import Swal from 'sweetalert2';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import useAuth from '../../hooks/useAuth';
import {
  FaSearch,
  FaBoxOpen,
  FaTimesCircle,
  FaTruckMoving,
  FaExclamationCircle,
} from 'react-icons/fa';

const STATUS_STEPS = [
  'Pending',
  'Picked Up',
  'In Transit',
  'Out for Delivery',
  'Delivered',
];

const getProgress = (logs) => {
  const lastStatus = logs[logs.length - 1]?.status || 'Pending';
  const index = STATUS_STEPS.indexOf(lastStatus);
  return ((index + 1) / STATUS_STEPS.length) * 100;
};

const TrackingParcel = () => {
  const [trackingId, setTrackingId] = useState('');
  const [parcel, setParcel] = useState(null);
  const [logs, setLogs] = useState([]);
  const [allParcels, setAllParcels] = useState([]);
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const isValidTrackingId = (id) => /^PRF-\d{8}-[A-Z0-9]{5}$/.test(id);

  
   const handleSearch = async () => {
    if (!isValidTrackingId(trackingId)) {
      return Swal.fire({
        icon: 'error',
        iconColor: '#CAEB66',
        title: 'Invalid Tracking ID Format',
        text: 'Please enter a valid ID like PRF-20250830-BF1CO',
        confirmButtonColor: '#03373D',
      });
    }

    try {
      const parcelRes = await axiosSecure.get(`/parcels/${trackingId}`);
      const parcelData = parcelRes.data;

      if (!parcelData) {
        return Swal.fire({
          icon: 'error',
          iconColor: '#CAEB66',
          title: 'Parcel Not Found',
          text: 'No parcel found with this tracking ID.',
          confirmButtonColor: '#03373D',
        });
      }

      const logsRes = await axiosSecure.get(`/tracking/${parcelData._id}`);
      const trackingLogs = logsRes.data;

      // ✅ If delivered → alert only, don't set state
      if (parcelData.status === 'Delivered') {
        const deliveredLog = trackingLogs.find((log) => log.status === 'Delivered');
        const deliveredAt = deliveredLog
          ? new Date(deliveredLog.time).toLocaleString()
          : 'Unknown time';
        const riderName = deliveredLog?.updated_by || 'Unknown Rider';

        return Swal.fire({
          icon: 'info',
          iconColor: '#CAEB66',
          title: 'Parcel Already Delivered',
          html: `Delivered on <b>${deliveredAt}</b> by <b>${riderName}</b>`,
          confirmButtonColor: '#03373D',
        });
      }

      // ✅ Only set state for undelivered parcels
      setParcel(parcelData);
      setLogs(trackingLogs);
      setAllParcels([]);
    } catch (error) {
      console.error('Error fetching tracking data:', error);
      Swal.fire({
        icon: 'error',
        iconColor: '#CAEB66',
        title: 'Server Error',
        text: 'Something went wrong while fetching parcel data.',
        confirmButtonColor: '#03373D',
      });
    }
  };
 
  const handleTrackAll = async () => {
    try {
      const res = await axiosSecure.get(`/parcels?email=${user.email}`);
      const allUserParcels = res.data;

      if (!allUserParcels || allUserParcels.length === 0) {
        return Swal.fire({
          icon: 'info',
          iconColor: '#CAEB66',
          title: 'No Parcels Found',
          text: 'You have not added any parcels yet.',
          confirmButtonColor: '#03373D',
        });
      }

      const undeliveredParcels = allUserParcels.filter(p => p.status !== 'Delivered');

      if (undeliveredParcels.length === 0) {
        return Swal.fire({
          icon: 'info',
          iconColor: '#CAEB66',
          title: 'All Parcels Delivered',
          text: 'You have no undelivered parcels at the moment.',
          confirmButtonColor: '#03373D',
        });
      }

      const parcelWithLogs = await Promise.all(
        undeliveredParcels.map(async (parcel) => {
          const logsRes = await axiosSecure.get(`/tracking/${parcel._id}`);
          return { ...parcel, logs: logsRes.data };
        })
      );

      setAllParcels(parcelWithLogs);
      setParcel(null);
      setLogs([]);
    } catch (error) {
      console.error('Error fetching undelivered parcels:', error);
      Swal.fire({
        icon: 'error',
        iconColor: '#CAEB66',
        title: 'Server Error',
        text: 'Something went wrong while fetching your parcels.',
        confirmButtonColor: '#03373D',
      });
    }
  };


  const handleClearSearch = () => {
    setParcel(null);
    setLogs([]);
    setTrackingId('');
  };
  const currentStatus = logs[logs.length - 1]?.status || "Pending";
  const currentMessage = logs[logs.length - 1]?.message || "No updates yet";

  return (
    <div className="p-4 max-w-6xl mx-auto">
      {/* Heading */}
      <h2 className="text-2xl font-bold text-[#03373D] mb-4 flex items-center gap-2">
        <FaSearch /> Track Your Parcel
      </h2>

      {/* Header Controls */}
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <input
          type="text"
          placeholder="Enter Tracking ID"
          value={trackingId}
          onChange={(e) => setTrackingId(e.target.value)}
          className="flex-1 px-4 py-2 border border-[#CAEB66] rounded-md focus:outline-none focus:ring-2 focus:ring-[#CAEB66] bg-white text-[#03373D] placeholder:text-[#03373D]"
        />
        <button
          onClick={handleSearch}
          className="flex items-center gap-2 bg-[#CAEB66] text-[#03373D] font-semibold px-6 py-2 rounded-md hover:bg-[#b6d85a] transition"
        >
          <FaSearch /> Track Parcel
        </button>
        <button
          onClick={handleTrackAll}
          className="flex items-center gap-2 bg-[#03373D] text-white font-semibold px-6 py-2 rounded-md hover:bg-[#022c30] transition"
        >
          <FaTruckMoving /> Track All Undelivered Parcels
        </button>
      </div>

      {/* Individual Parcel Result */}
      {parcel && (
        <div className="relative bg-white border-l-8 border-[#CAEB66] text-[#03373D] rounded-xl shadow-lg p-6 mb-6">
          <button
            onClick={handleClearSearch}
            className="absolute top-3 right-3 text-white hover:text-red-400 text-xl"
          >
            <FaTimesCircle />
          </button>
          <h2 className="text-2xl font-bold text-[#03373D] flex items-center gap-2">
            <FaBoxOpen /> {parcel.parcelName}
          </h2>

          {/* for md and large device texts [small hidden] */}
          <div className='hidden md:flex flex-col'>
            <p className="mt-2"><span className='font-bold'>From &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;:</span>&nbsp; {parcel.senderAddress} ,  {parcel.senderRegion}</p>
            <p><span className='font-bold'>To &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;:&nbsp;</span> {parcel.receiverAddress} , {parcel.receiverRegion}</p>
            <p><span className='font-bold'>Fare &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;:&nbsp;</span> {parcel.fare}/-</p>
            <p className='my-3'><span className='font-bold'>Status &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;:&nbsp;</span> <span className='py-1 px-3 font-semibold rounded-lg bg-[#CAEB6670]'>{currentStatus}</span></p>
            <p><span className='font-bold'>Message &nbsp;&nbsp;&nbsp;:&nbsp;</span> <span className='py-1 px-3 font-semibold rounded-lg bg-[#CAEB6670]'>{currentMessage}</span></p>
          </div>

          {/* for md and large device texts [md & lg hidden] */}
          <div className='md:hidden'>
            <p className="mt-2"><span className='font-bold'>From :</span> {parcel.senderAddress} ,  {parcel.senderRegion}</p>
            <p><span className='font-bold'>To :</span> {parcel.receiverAddress} , {parcel.receiverRegion}</p>
            <p><span className='font-bold'>Fare :</span> {parcel.fare}/-</p>
            <p className='my-3'><span className='font-bold '>Status :</span> <span className='py-1 px-2 font-semibold text-sm rounded-lg bg-[#CAEB6670]'>{currentStatus}</span></p>
            <p><span className='font-bold'>Message :</span> <span className='py-1 px-2 font-semibold text-sm rounded-lg bg-[#CAEB6670]'>{currentMessage}</span></p>
          </div>

          {/* Progress Bar */}
          <div className="mt-4 mb-6">
            <div className="w-full bg-gray-300 rounded-full h-4">
              <div
                className="h-4 rounded-full bg-[#CAEB66]"
                style={{ width: `${getProgress(logs)}%` }}
              ></div>
            </div>
          </div>

        </div>
      )}


      {/* All Undelivered Parcels */}
      {allParcels.length > 0 && (
        <>
          <h2 className="text-xl font-bold text-[#03373D] mb-4 flex items-center gap-2">
            <FaTruckMoving /> Undelivered Parcels Overview
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {allParcels.map((parcel) => (
              <div key={parcel._id} className="bg-white border-l-7 border-[#CAEB66] text-[#03373D] rounded-xl shadow-lg p-6">
                {/* for md and large device texts [small hidden]*/}
                <h2 className="md:text-xl text-lg font-bold text-[#03373D] flex items-center gap-2">
                  <FaBoxOpen /> {parcel.parcelName}
                </h2>
                <div className='hidden md:flex flex-col'>
                  <p className="mt-2"><span className='font-bold'>From &nbsp;:</span>&nbsp; {parcel.senderAddress} ,  {parcel.senderRegion} </p>
                  <p> <span className='font-bold'>To &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;:&nbsp;</span> {parcel.receiverAddress} , {parcel.receiverRegion}</p>
                  <p> <span className='font-bold'>Fare &nbsp;&nbsp;&nbsp;:&nbsp;</span> {parcel.fare}/-</p>
                  {(() => {
                    const latestLog = parcel.logs?.[parcel.logs.length - 1];
                    const status = latestLog?.status || "Pending";
                    const message = latestLog?.message || "No updates yet";
                    return (
                      <>
                        <p className='my-3'>
                          <span className='font-bold'>Status &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;:&nbsp;</span>
                          <span className='py-1 px-3 font-semibold rounded-lg bg-[#CAEB6670]'>{status}</span>
                        </p>
                        <p>
                          <span className='font-bold'>Message &nbsp;&nbsp;&nbsp;:&nbsp;</span>
                          <span className='py-1 px-3 font-semibold rounded-lg bg-[#CAEB6670]'>{message}</span>
                        </p>
                      </>
                    );
                  })()}
                </div>

                {/* for md and large device texts [md & lg hidden]*/}
                <div className='md:hidden'>
                  <p className="mt-2"><span className='font-bold'>From :</span> {parcel.senderAddress} ,  {parcel.senderRegion} </p>
                  <p> <span className='font-bold'>To :</span> {parcel.receiverAddress} , {parcel.receiverRegion}</p>
                  <p> <span className='font-bold'>Fare :</span> {parcel.fare}/-</p>
                  {(() => {
                    const latestLog = parcel.logs?.[parcel.logs.length - 1];
                    const status = latestLog?.status || "Pending";
                    const message = latestLog?.message || "No updates yet";
                    return (
                      <>
                        <p className='my-3'>
                          <span className='font-bold'>Status &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;:&nbsp;</span>
                          <span className='py-1 px-3 font-semibold rounded-lg bg-[#CAEB6670]'>{status}</span>
                        </p>
                        <p>
                          <span className='font-bold'>Message &nbsp;&nbsp;&nbsp;:&nbsp;</span>
                          <span className='py-1 px-3 font-semibold rounded-lg bg-[#CAEB6670]'>{message}</span>
                        </p>
                      </>
                    );
                  })()}
                </div>
                <div className="mt-4">
                  <div className="w-full bg-gray-300 rounded-full h-4">
                    <div
                      className="h-4 rounded-full bg-[#CAEB66]"
                      style={{ width: `${getProgress(parcel.logs)}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default TrackingParcel;




