// import React, { useEffect, useState } from "react";
// import useAxiosSecure from "../../hooks/useAxiosSecure";
// import useAuth from "../../hooks/useAuth";
// import dayjs from "dayjs";
// import { FaCheckCircle, FaTimesCircle } from "react-icons/fa";

// const MyPayments = () => {
//   const axiosSecure = useAxiosSecure();
//   const { user } = useAuth();
//   const [payments, setPayments] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     if (!user?.email) return;

//     const fetchPayments = async () => {
//       try {
//         const res = await axiosSecure.get(`/parcels?email=${user.email}`);
//         setPayments(res.data); // Show all parcels
//       } catch (error) {
//         console.error("Failed to fetch payments:", error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchPayments();
//   }, [axiosSecure, user?.email]);

//   const renderStatus = (status) => {
//     if (status === "Paid") {
//       return (
//         <span className="text-green-600 font-semibold flex items-center gap-1">
//           <FaCheckCircle className="pt-1" size={22} /> Paid
//         </span>
//       );
//     } else {
//       return (
//         <span className="text-red-500 font-semibold flex items-center gap-1">
//           <FaTimesCircle className="pt-1" size={22} /> Unpaid
//         </span>
//       );
//     }
//   };

//   if (loading)
//     return (
//       <div className="flex justify-center items-center h-64">
//         <span className="loading loading-spinner text-[#CAEB66] loading-xl"></span>
//       </div>
//     );

//   if (!loading && payments.length === 0) {
//     return (
//       <div className="flex flex-col items-center justify-center h-64">
//         <p className="text-2xl font-bold text-[#CAEB66] items-center animate-bounce">
//           No Payments Found 💳
//         </p>
//       </div>
//     );
//   }

//   return (
//     <div className="p-4">
//       <h2 className="text-2xl font-bold text-[#03373D] mb-4">My Payments</h2>

//       {/* Large screens */}
//       <div className="hidden lg:block">
//         <table className="w-full border border-gray-300 rounded-lg overflow-hidden shadow-sm">
//           <thead className="bg-[#03373D] text-white">
//             <tr>
//               <th className="px-4 py-2 text-left">Tracking ID</th>
//               <th className="px-4 py-2 text-left">Amount Paid</th>
//               <th className="px-4 py-2 text-left">Paid At</th>
//               <th className="px-4 py-2 text-left">Status</th>
//               <th className="px-4 py-2 text-left">Action</th>
//             </tr>
//           </thead>
//           <tbody>
//             {payments.map((parcel) => (
//               <tr key={parcel._id} className="border-b border-gray-300 hover:bg-[#CAEB6620]">
//                 <td className="px-4 py-2">{parcel.trackingId}</td>
//                 <td className="px-4 py-2">
//                   {parcel.paymentInfo?.amount ? `${parcel.paymentInfo.amount} BDT` : "—"}
//                 </td>
//                 <td className="px-4 py-2">
//                   {parcel.paymentInfo?.paidAt
//                     ? dayjs(parcel.paymentInfo.paidAt).format("DD MMM YYYY")
//                     : "—"}
//                 </td>
//                 <td className="px-4 py-2">{renderStatus(parcel.paymentStatus)}</td>
//                 <td className="px-4 py-2">
//                   {parcel.paymentStatus !== "Paid" && (
//                     <button
//                       onClick={() =>
//                         (window.location.href = `/dashboard/payment/${parcel.trackingId}`)
//                       }
//                       className="bg-[#03373D] text-[#BAEC66] px-3 py-1 rounded-md text-sm hover:bg-[#04545D] transition"
//                     >
//                       Pay Now
//                     </button>
//                   )}
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>

//       {/* Small/medium screens */}
//       <div className="lg:hidden flex flex-col gap-4">
//         {payments.map((parcel) => (
//           <div
//             key={parcel._id}
//             className="p-4 border-l-8 rounded-xl border-[#CAEB66] shadow-sm bg-white"
//           >
//             <div className="flex justify-between mb-2">
//               <span className="font-bold text-[#03373D]">Tracking:</span>
//               <span>{parcel.trackingId}</span>
//             </div>
//             <div className="flex justify-between mb-2">
//               <span className="font-bold text-[#03373D]">Amount:</span>
//               <span>
//                 {parcel.paymentInfo?.amount ? `${parcel.paymentInfo.amount} BDT` : "—"}
//               </span>
//             </div>
//             <div className="flex justify-between mb-2">
//               <span className="font-bold text-[#03373D]">Paid At:</span>
//               <span>
//                 {parcel.paymentInfo?.paidAt
//                   ? dayjs(parcel.paymentInfo.paidAt).format("DD MMM YYYY")
//                   : "—"}
//               </span>
//             </div>
//             <div className="flex justify-between mb-2">
//               <span className="font-bold text-[#03373D]">Status:</span>
//               {renderStatus(parcel.paymentStatus)}
//             </div>

//             {parcel.paymentStatus !== "Paid" && (
//               <div className="flex justify-end mt-2">
//                 <button
//                   onClick={() =>
//                     (window.location.href = `/dashboard/payment/${parcel.trackingId}`)
//                   }
//                   className="bg-[#03373D] text-[#BAEC66] px-3 py-1 rounded-md text-sm hover:bg-[#04545D] transition"
//                 >
//                   Pay Now
//                 </button>
//               </div>
//             )}
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default MyPayments;

import React, { useEffect, useState } from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useAuth from "../../hooks/useAuth";
import dayjs from "dayjs";
import { FaCheckCircle, FaTimesCircle } from "react-icons/fa";

const MyPayments = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user?.email) return;

    const fetchPayments = async () => {
      try {
        const res = await axiosSecure.get(`/parcels?email=${user.email}`);
        setPayments(res.data);
      } catch (error) {
        console.error("Failed to fetch payments:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPayments();
  }, [axiosSecure, user?.email]);

  const hasUnpaid = payments.some(p => p.paymentStatus !== "Paid");

  const renderStatus = (status) => {
    return status === "Paid" ? (
      <span className="text-green-600 font-semibold flex items-center gap-1">
        <FaCheckCircle className="pt-1" size={22} /> Paid
      </span>
    ) : (
      <span className="text-red-500 font-semibold flex items-center gap-1">
        <FaTimesCircle className="pt-1" size={22} /> Unpaid
      </span>
    );
  };

  if (loading)
    return (
      <div className="flex justify-center items-center h-64">
        <span className="loading loading-spinner text-[#CAEB66] loading-xl"></span>
      </div>
    );

  if (!loading && payments.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-64">
        <p className="text-2xl font-bold text-[#CAEB66] items-center animate-bounce">
          No Payments Found 💳
        </p>
      </div>
    );
  }

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold text-[#03373D] mb-4">My Payments</h2>

      {/* Large screens */}
      <div className="hidden lg:block">
        <table className="w-full border border-gray-300 rounded-lg overflow-hidden shadow-sm">
          <thead className="bg-[#03373D] text-white">
            <tr>
              <th className="px-4 py-2 text-left">Tracking ID</th>
              <th className="px-4 py-2 text-left">Amount Paid</th>
              <th className="px-4 py-2 text-left">Paid At</th>
              <th className="px-4 py-2 text-left">Status</th>
              {hasUnpaid && <th className="px-4 py-2 text-left">Action</th>}
            </tr>
          </thead>
          <tbody>
            {payments.map((parcel) => (
              <tr key={parcel._id} className="border-b border-gray-300 hover:bg-[#CAEB6620]">
                <td className="px-4 py-2">{parcel.trackingId}</td>
                <td className="px-4 py-2">
                  {parcel.paymentInfo?.amount ? `${parcel.paymentInfo.amount} BDT` : "—"}
                </td>
                <td className="px-4 py-2">
                  {parcel.paymentInfo?.paidAt
                    ? dayjs(parcel.paymentInfo.paidAt).format("DD MMM YYYY")
                    : "—"}
                </td>
                <td className="px-4 py-2">{renderStatus(parcel.paymentStatus)}</td>
                {hasUnpaid && (
                  <td className="px-4 py-2">
                    {parcel.paymentStatus !== "Paid" && (
                      <button
                        onClick={() =>
                          (window.location.href = `/dashboard/payment/${parcel.trackingId}`)
                        }
                        className="bg-[#03373D] text-[#BAEC66] px-3 py-1 rounded-md text-sm cursor-pointer hover:bg-[#04545D] transition"
                      >
                        Pay Now
                      </button>
                    )}
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Small/medium screens */}
      <div className="lg:hidden flex flex-col gap-4">
        {payments.map((parcel) => (
          <div
            key={parcel._id}
            className="p-4 border-l-8 rounded-xl border-[#CAEB66] shadow-sm bg-white"
          >
            <div className="flex justify-between mb-2">
              <span className="font-bold text-[#03373D]">Tracking:</span>
              <span>{parcel.trackingId}</span>
            </div>
            <div className="flex justify-between mb-2">
              <span className="font-bold text-[#03373D]">Amount:</span>
              <span>
                {parcel.paymentInfo?.amount ? `${parcel.paymentInfo.amount} BDT` : "—"}
              </span>
            </div>
            <div className="flex justify-between mb-2">
              <span className="font-bold text-[#03373D]">Paid At:</span>
              <span>
                {parcel.paymentInfo?.paidAt
                  ? dayjs(parcel.paymentInfo.paidAt).format("DD MMM YYYY")
                  : "—"}
              </span>
            </div>
            <div className="flex justify-between mb-2">
              <span className="font-bold text-[#03373D]">Status:</span>
              {renderStatus(parcel.paymentStatus)}
            </div>

            {parcel.paymentStatus !== "Paid" && (
              <div className="flex justify-end mt-2">
                <button
                  onClick={() =>
                    (window.location.href = `/dashboard/payment/${parcel.trackingId}`)
                  }
                  className="bg-[#03373D] cursor-pointer text-[#BAEC66] px-3 py-1 rounded-md text-sm hover:bg-[#04545D] transition"
                >
                  Pay Now
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyPayments;
