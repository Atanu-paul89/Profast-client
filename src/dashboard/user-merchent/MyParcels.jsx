// import React from 'react';
// import useAxiosSecure from '../../hooks/useAxiosSecure';

// const MyParcels = () => {
//     const axiosSecure = useAxiosSecure(); 

//     return (
//         <div>
//             My Kola Parcel
//         </div>
//     );
// };

// export default MyParcels;


import React, { useEffect, useState } from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import dayjs from "dayjs";

const MyParcels = () => {
  const axiosSecure = useAxiosSecure();
  const [parcels, setParcels] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchParcels = async () => {
      try {
        const userEmail = "shatadru5689@gmail.com"; // replace with actual logged-in user
        const res = await axiosSecure.get(`/parcels?email=${userEmail}`);
        setParcels(res.data);
      } catch (error) {
        console.error("Failed to fetch parcels:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchParcels();
  }, [axiosSecure]);

  const statusColor = (status) => {
    switch (status) {
      case "delivered":
        return "text-green-600 ";
      case "Pending":
        return "text-orange-600";
      case "cancelled":
        return "text-red-600 ";
      default:
        return "text-gray-600";
    }
  };

  if (loading) return <div className="p-6 text-center">Loading parcels...</div>;

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold text-[#03373D] mb-4">My Parcels</h2>

      {/* Large screens: table view */}
      <div className="hidden lg:block">
        <table className="w-full border border-gray-300 rounded-lg overflow-hidden shadow-sm">
          <thead className="bg-[#03373D] text-white">
            <tr>
              <th className="px-4 py-2 text-left">Tracking ID</th>
              <th className="px-4 py-2 text-left">Parcel Name</th>
              <th className="px-4 py-2 text-left">Created Date</th>
              <th className="px-4 py-2 text-left">Cost (BDT)</th>
              <th className="px-4 py-2 text-left">Status</th>
            </tr>
          </thead>
          <tbody>
            {parcels.map((parcel) => (
              <tr
                key={parcel._id}
                className="border-b border-gray-300 hover:bg-[#CAEB6620] cursor-pointer "
              >
                <td className="px-4 py-2">{parcel.trackingId}</td>
                <td className="px-4 py-2">{parcel.parcelName}</td>
                <td className="px-4 py-2">{dayjs(parcel.createdAt).format("DD MMM YYYY")}</td>
                <td className="px-4 py-2">{parcel.fare}/-</td>
                <td className={`px-4 py-2 font-semibold  w-max ${statusColor(parcel.status)}`}>
                  {parcel.status}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Small/medium screens: card view */}
      <div className="lg:hidden flex  flex-col gap-4">
        {parcels.map((parcel) => (
          <div
            key={parcel._id}
            className="p-4 border-l-8 rounded-xl border-[#CAEB66] shadow-sm bg-white"
          >
            <div className="flex items-center justify-between mb-2">
              <span className="font-bold text-[#03373D]">Tracking:</span>
              <span>{parcel.trackingId}</span>
            </div>
            <div className="flex items-center justify-between mb-2">
              <span className="font-bold text-[#03373D]">Parcel Name:</span>
              <span>{parcel.parcelName}</span>
            </div>
            <div className="flex items-center justify-between mb-2">
              <span className="font-bold text-[#03373D]">Created:</span>
              <span>{dayjs(parcel.createdAt).format("DD MMM YYYY")}</span>
            </div>
            <div className="flex items-center justify-between mb-2">
              <span className="font-bold text-[#03373D]">Cost:</span>
              <span>{parcel.fare} BDT</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="font-bold text-[#03373D]">Status:</span>
              <span className={`font-semibold px-2 py-1 rounded-full ${statusColor(parcel.status)}`}>
                {parcel.status}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyParcels;
