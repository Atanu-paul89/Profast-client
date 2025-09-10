// import React, { useEffect, useState } from 'react';
// import useAxiosSecure from '../../hooks/useAxiosSecure';
// import { FaMoneyBillWave, FaBoxOpen, FaGift } from 'react-icons/fa';
// import { MdDeliveryDining } from 'react-icons/md';

// const RiderEarnings = () => {
//   const axiosSecure = useAxiosSecure();
//   const [summary, setSummary] = useState(null);
//   const [earnings, setEarnings] = useState([]);

//   const fetchEarnings = async () => {
//     try {
//       const res = await axiosSecure.get('/rider/earnings-summary');
//       setSummary(res.data.summary);
//       setEarnings(res.data.earnings);
//     } catch (err) {
//       console.error("Error fetching rider earnings:", err);
//     }
//   };

//   useEffect(() => {
//     fetchEarnings();
//   }, []);

//   return (
//     <section className="space-y-6">
//       <h2 className="text-xl font-bold text-[#03373D]">💰 Rider Earnings Overview</h2>

//       {summary && (
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//           <div className="bg-white border-l-8 border-[#CAEB66] p-4 rounded-lg shadow-sm flex items-center gap-3">
//             <FaBoxOpen className="text-3xl text-[#03373D]" />
//             <div>
//               <p className="font-bold text-[#03373D]">Total Deliveries</p>
//               <p className="text-2xl font-extrabold">{summary.totalDeliveries}</p>
//             </div>
//           </div>
//           <div className="bg-white border-l-8 border-green-500 p-4 rounded-lg shadow-sm flex items-center gap-3">
//             <FaMoneyBillWave className="text-3xl text-green-600" />
//             <div>
//               <p className="font-bold text-[#03373D]">Total Earnings</p>
//               <p className="text-2xl font-extrabold">{summary.totalEarned}৳</p>
//             </div>
//           </div>
//           <div className="bg-white border-l-8 border-yellow-500 p-4 rounded-lg shadow-sm flex items-center gap-3">
//             <FaGift className="text-3xl text-yellow-600" />
//             <div>
//               <p className="font-bold text-[#03373D]">Total Bonuses</p>
//               <p className="text-2xl font-extrabold">{summary.totalBonus}৳</p>
//             </div>
//           </div>
//         </div>
//       )}

//       {earnings.length > 0 && (
//         <div className="space-y-4">
//           <h3 className="text-lg font-bold text-[#03373D]">📋 Delivery Earnings Breakdown</h3>
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
//             {earnings.map((entry, index) => (
//               <div key={index} className="bg-white border-l-8 border-[#CAEB66] p-4 rounded-lg shadow-sm">
//                 <p className="font-bold text-[#03373D] mb-1">
//                   <MdDeliveryDining className="inline-block text-xl mr-1" />
//                   {entry.trackingId}
//                 </p>
//                 <p>Base Fare: <span className="font-bold">{entry.baseFare}৳</span></p>
//                 <p>Same-Day Bonus: <span className="text-green-600 font-bold">{entry.sameDayBonus}৳</span></p>
//                 <p>Daily Bonus: <span className="text-yellow-600 font-bold">{entry.dailyBonus}৳</span></p>
//                 <p>Total: <span className="text-[#03373D] font-bold">{entry.amount}৳</span></p>
//                 <p className="text-sm text-gray-500 mt-1">Delivered on: {new Date(entry.deliveredAt).toLocaleDateString()}</p>
//               </div>
//             ))}
//           </div>
//         </div>
//       )}
//     </section>
//   );
// };

// export default RiderEarnings;


import React, { useEffect, useState } from 'react';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import { FaMoneyBillWave, FaBoxOpen, FaGift } from 'react-icons/fa';
import { MdDeliveryDining } from 'react-icons/md';

const RiderEarnings = () => {
    const axiosSecure = useAxiosSecure();
    const [summary, setSummary] = useState(null);
    const [earnings, setEarnings] = useState([]);
    const [breakdownType, setBreakdownType] = useState(null);


    const fetchEarnings = async () => {
        try {
            const res = await axiosSecure.get('/rider/earnings-summary');
            setSummary(res.data.summary);
            setEarnings(res.data.earnings);
        } catch (err) {
            console.error("Error fetching rider earnings:", err);
        }
    };

    useEffect(() => {
        fetchEarnings();
    }, []);

    return (
        <section className="space-y-8">
            <h2 className="text-xl font-bold text-[#03373D]">💰 Rider Earnings Overview</h2>

            {/* 🔹 Today’s Earnings */}
            {summary && (
                <div>
                    <h3 className="text-lg font-bold text-[#03373D] mb-2">🟢 Today’s Earnings</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="bg-white border-l-8 border-[#CAEB66] p-4 rounded-lg shadow-sm flex items-center gap-3">
                            <FaBoxOpen className="text-3xl text-[#03373D]" />
                            <div>
                                <p className="font-bold text-[#03373D]">Deliveries Today</p>
                                <p className="text-2xl font-extrabold">{summary.todayDeliveries}</p>
                            </div>
                        </div>
                        <div className="bg-white border-l-8 border-green-500 p-4 rounded-lg shadow-sm flex items-center gap-3">
                            <FaMoneyBillWave className="text-3xl text-green-600" />
                            <div>
                                <p className="font-bold text-[#03373D]">Earnings Today</p>
                                <p className="text-2xl font-extrabold">{summary.today}৳</p>
                            </div>
                        </div>
                        <div className="bg-white border-l-8 border-yellow-500 p-4 rounded-lg shadow-sm flex items-center gap-3">
                            <FaGift className="text-3xl text-yellow-600" />
                            <div>
                                <p className="font-bold text-[#03373D]">Bonuses Today</p>
                                <p className="text-2xl font-extrabold">{summary.todayBonus}৳</p>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* 🔹 Monthly, Yearly, Total Breakdown */}
            {/* 🔹 Interactive Earnings Breakdown */}
            {summary && (
                <div>
                    <h3 className="text-lg font-bold text-[#03373D] mb-4">📊 Earnings Breakdown</h3>

                    {/* Toggle Buttons */}
                    <div className="flex flex-wrap gap-3 mb-6">
                        <button
                            onClick={() => setBreakdownType("month")}
                            className="px-4 py-2 bg-[#CAEB66] text-[#03373D] font-semibold rounded-md hover:bg-[#d9f27c]"
                        >
                            This Month
                        </button>
                        <button
                            onClick={() => setBreakdownType("year")}
                            className="px-4 py-2 bg-[#CAEB66] text-[#03373D] font-semibold rounded-md hover:bg-[#d9f27c]"
                        >
                            This Year
                        </button>
                        <button
                            onClick={() => setBreakdownType("total")}
                            className="px-4 py-2 bg-[#CAEB66] text-[#03373D] font-semibold rounded-md hover:bg-[#d9f27c]"
                        >
                            All-Time
                        </button>
                        <button
                            onClick={() => setBreakdownType(null)}
                            className="px-4 py-2 bg-[#03373D] text-white font-semibold rounded-md hover:bg-[#1C4B50]"
                        >
                            Clear
                        </button>
                    </div>

                    {/* Breakdown Cards */}
                    {breakdownType === "month" && (
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div className="bg-white border-l-8 border-[#CAEB66] p-4 rounded-lg shadow-sm flex items-center gap-3">
                                <FaBoxOpen className="text-3xl text-[#03373D]" />
                                <div>
                                    <p className="font-bold text-[#03373D]">Deliveries This Month</p>
                                    <p className="text-2xl font-extrabold">{summary.monthDeliveries}</p>
                                </div>
                            </div>
                            <div className="bg-white border-l-8 border-green-500 p-4 rounded-lg shadow-sm flex items-center gap-3">
                                <FaMoneyBillWave className="text-3xl text-green-600" />
                                <div>
                                    <p className="font-bold text-[#03373D]">Earnings This Month</p>
                                    <p className="text-2xl font-extrabold">{summary.month}৳</p>
                                </div>
                            </div>
                            <div className="bg-white border-l-8 border-yellow-500 p-4 rounded-lg shadow-sm flex items-center gap-3">
                                <FaGift className="text-3xl text-yellow-600" />
                                <div>
                                    <p className="font-bold text-[#03373D]">Bonuses This Month</p>
                                    <p className="text-2xl font-extrabold">{summary.monthBonus}৳</p>
                                </div>
                            </div>
                        </div>
                    )}

                    {breakdownType === "year" && (
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div className="bg-white border-l-8 border-[#CAEB66] p-4 rounded-lg shadow-sm flex items-center gap-3">
                                <FaBoxOpen className="text-3xl text-[#03373D]" />
                                <div>
                                    <p className="font-bold text-[#03373D]">Deliveries This Year</p>
                                    <p className="text-2xl font-extrabold">{summary.yearDeliveries}</p>
                                </div>
                            </div>
                            <div className="bg-white border-l-8 border-green-500 p-4 rounded-lg shadow-sm flex items-center gap-3">
                                <FaMoneyBillWave className="text-3xl text-green-600" />
                                <div>
                                    <p className="font-bold text-[#03373D]">Earnings This Year</p>
                                    <p className="text-2xl font-extrabold">{summary.year}৳</p>
                                </div>
                            </div>
                            <div className="bg-white border-l-8 border-yellow-500 p-4 rounded-lg shadow-sm flex items-center gap-3">
                                <FaGift className="text-3xl text-yellow-600" />
                                <div>
                                    <p className="font-bold text-[#03373D]">Bonuses This Year</p>
                                    <p className="text-2xl font-extrabold">{summary.yearBonus}৳</p>
                                </div>
                            </div>
                        </div>
                    )}

                    {breakdownType === "total" && (
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div className="bg-white border-l-8 border-[#CAEB66] p-4 rounded-lg shadow-sm flex items-center gap-3">
                                <FaBoxOpen className="text-3xl text-[#03373D]" />
                                <div>
                                    <p className="font-bold text-[#03373D]">Total Deliveries</p>
                                    <p className="text-2xl font-extrabold">{summary.totalDeliveries}</p>
                                </div>
                            </div>
                            <div className="bg-white border-l-8 border-green-500 p-4 rounded-lg shadow-sm flex items-center gap-3">
                                <FaMoneyBillWave className="text-3xl text-green-600" />
                                <div>
                                    <p className="font-bold text-[#03373D]">Total Earnings</p>
                                    <p className="text-2xl font-extrabold">{summary.total}৳</p>
                                </div>
                            </div>
                            <div className="bg-white border-l-8 border-yellow-500 p-4 rounded-lg shadow-sm flex items-center gap-3">
                                <FaGift className="text-3xl text-yellow-600" />
                                <div>
                                    <p className="font-bold text-[#03373D]">Total Bonuses</p>
                                    <p className="text-2xl font-extrabold">{summary.totalBonus}৳</p>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            )}


            {/* 🔹 Delivery Earnings Breakdown */}
            {earnings.length > 0 && (
                <div className="space-y-4">
                    <h3 className="text-lg font-bold text-[#03373D]">📋 Delivery Earnings Breakdown</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {earnings.map((entry, index) => (
                            <div key={index} className="bg-white border-l-8 border-[#CAEB66] p-4 rounded-lg shadow-sm">
                                <p className="font-bold text-[#03373D] mb-1">
                                    <MdDeliveryDining className="inline-block text-xl mr-1" />
                                    {entry.trackingId}
                                </p>
                                <p>Base Fare: <span className="font-bold">{entry.baseFare}৳</span></p>
                                <p>Same-Day Bonus: <span className="text-green-600 font-bold">{entry.sameDayBonus}৳</span></p>
                                <p>Daily Bonus: <span className="text-yellow-600 font-bold">{entry.dailyBonus}৳</span></p>
                                <p>Total: <span className="text-[#03373D] font-bold">{entry.amount}৳</span></p>
                                <p className="text-sm text-gray-500 mt-1">Delivered on: {new Date(entry.deliveredAt).toLocaleDateString()}</p>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </section>
    );
};

export default RiderEarnings;
