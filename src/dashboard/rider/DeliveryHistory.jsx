// import React, { useEffect, useState } from 'react';
// import useAxiosSecure from '../../hooks/useAxiosSecure';
// import { MdDeliveryDining } from 'react-icons/md';
// import { format } from 'date-fns';

// const DeliveryHistory = () => {
//   const axiosSecure = useAxiosSecure();
//   const [deliveries, setDeliveries] = useState([]);
//   const [filteredDeliveries, setFilteredDeliveries] = useState([]);
//   const [activeRange, setActiveRange] = useState(null);

//   useEffect(() => {
//     axiosSecure.get('/rider/delivery-history')
//       .then(res => {
//         setDeliveries(res.data);
//         setFilteredDeliveries(res.data);
//       });
//   }, [axiosSecure]);

//   const handleFilter = (range) => {
//     const now = new Date();
//     let filtered = [];

//     if (range === 'today') {
//       filtered = deliveries.filter(d =>
//         new Date(d.deliveredAt).toDateString() === now.toDateString()
//       );
//     } else if (range === 'week') {
//       const weekAgo = new Date();
//       weekAgo.setDate(now.getDate() - 7);
//       filtered = deliveries.filter(d =>
//         new Date(d.deliveredAt) >= weekAgo
//       );
//     } else if (range === 'month') {
//       const monthAgo = new Date();
//       monthAgo.setMonth(now.getMonth() - 1);
//       filtered = deliveries.filter(d =>
//         new Date(d.deliveredAt) >= monthAgo
//       );
//     } else if (range === 'year') {
//       const yearAgo = new Date();
//       yearAgo.setFullYear(now.getFullYear() - 1);
//       filtered = deliveries.filter(d =>
//         new Date(d.deliveredAt) >= yearAgo
//       );
//     } else {
//       filtered = deliveries;
//     }

//     setFilteredDeliveries(filtered);
//     setActiveRange(range);
//   };

//   return (
//     <div className="px-4 py-6">
//       {/* Heading */}
//       <div className="flex items-center justify-between mb-6">
//         <h2 className="text-2xl font-bold text-[#03373D] flex items-center gap-2">
//           <MdDeliveryDining className="text-green-500 text-3xl" />
//           Delivery History
//           {activeRange && (
//             <span className="text-sm text-gray-500 ml-2">
//               ({filteredDeliveries.length} deliveries)
//             </span>
//           )}
//         </h2>
//       </div>

//       {/* Filter Buttons */}
//       <div className="flex flex-wrap gap-3 mb-6">
//         {['today', 'week', 'month', 'year'].map(range => (
//           <button
//             key={range}
//             onClick={() => handleFilter(range)}
//             className={`px-4 py-2 rounded-xl font-medium ${
//               activeRange === range
//                 ? 'bg-[#BAEC66] text-[#03373D] border-b-4'
//                 : 'bg-gray-100 text-gray-700'
//             }`}
//           >
//             {range.charAt(0).toUpperCase() + range.slice(1)}
//           </button>
//         ))}
//         <button
//           onClick={() => {
//             setFilteredDeliveries(deliveries);
//             setActiveRange(null);
//           }}
//           className="px-4 py-2 rounded-lg bg-[#03373D] cursor-pointer text-white font-medium"
//         >
//           Clear
//         </button>
//       </div>

//       {/* Responsive Grid */}
//       {filteredDeliveries.length === 0 ? (
//         <p className="text-center text-gray-500 mt-10">No deliveries found for this range.</p>
//       ) : (
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//           {filteredDeliveries.map(parcel => (
//             <div key={parcel._id} className="border-l-4 border-green-500 bg-white shadow-md rounded-lg p-4">
//               <h3 className="font-bold text-[#03373D] mb-2">
//                 Tracking ID: {parcel.trackingId}
//               </h3>
//               <p className="text-sm text-gray-700 mb-1">
//                 <strong>Created By:</strong> {parcel.createdBy?.name}
//               </p>
//               <p className="text-sm text-gray-700 mb-1">
//                 <strong>Receiver:</strong><br />
//                 {parcel.receiverName}<br />
//                 {parcel.receiverPhone}<br />
//                 {parcel.receiverAddress}<br />
//                 {parcel.receiverWarehouse}, {parcel.receiverRegion}
//               </p>
//               <p className="text-sm text-gray-500 mt-2">
//                 Delivered At: {format(new Date(parcel.deliveredAt), 'PPp')}
//               </p>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

// export default DeliveryHistory;


import React, { useEffect, useState } from 'react';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import { MdDeliveryDining, MdOutlineLocalShipping } from 'react-icons/md';
import { format } from 'date-fns';

const DeliveryHistory = () => {
    const axiosSecure = useAxiosSecure();
    const [loading, setLoading] = useState(true); 
    const [deliveries, setDeliveries] = useState([]);
    const [filteredDeliveries, setFilteredDeliveries] = useState([]);
    const [activeRange, setActiveRange] = useState('today'); // ✅ default "today"

    useEffect(() => {
        axiosSecure.get('/rider/delivery-history').then((res) => {
            setDeliveries(res.data);
            // ✅ apply default filter = today
            applyFilter('today', res.data);
            setLoading(false);
        });
    }, [axiosSecure]);

    const applyFilter = (range, source = deliveries) => {
        const now = new Date();
        let filtered = [];

        if (range === 'today') {
            filtered = source.filter(
                (d) => new Date(d.deliveredAt).toDateString() === now.toDateString()
            );
        } else if (range === 'week') {
            const weekAgo = new Date();
            weekAgo.setDate(now.getDate() - 7);
            filtered = source.filter((d) => new Date(d.deliveredAt) >= weekAgo);
        } else if (range === 'month') {
            const monthAgo = new Date();
            monthAgo.setMonth(now.getMonth() - 1);
            filtered = source.filter((d) => new Date(d.deliveredAt) >= monthAgo);
        } else if (range === 'year') {
            const yearAgo = new Date();
            yearAgo.setFullYear(now.getFullYear() - 1);
            filtered = source.filter((d) => new Date(d.deliveredAt) >= yearAgo);
        } else {
            filtered = source;
        }

        setFilteredDeliveries(filtered);
        setActiveRange(range);
    };

    if (loading) {
        return (
            <div className="flex gap-1 justify-center items-center h-64">
                <span className="loading loading-spinner text-[#CAEB66] loading-xl"></span><span className='font-bold text-lg text-[#03373D]'>Loading Delivery History... </span>
            </div>
        );
    }

    return (
        <div className="px-4 py-6">
            {/* Heading */}
            <div className="flex items-center justify-between mb-6 flex-wrap">
                <h2 className="text-2xl font-bold text-[#03373D] flex items-center gap-2">
                    <MdDeliveryDining className="text-[#03373D] text-3xl" />
                    Delivery History
                    {activeRange && (
                        <span className="text-sm text-gray-500">
                            ({filteredDeliveries.length})
                        </span>
                    )}
                </h2>
            </div>

            {/* Filter Buttons */}
            <div className="flex flex-wrap gap-3 mb-6">
                {['today', 'week', 'month', 'year'].map((range) => (
                    <button
                        key={range}
                        onClick={() => applyFilter(range)}
                        className={`px-4 py-2 rounded-xl font-medium cursor-pointer transition ${activeRange === range
                            ? 'bg-[#BAEC66] text-[#03373D] border-b-4'
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                            }`}
                    >
                        {range.charAt(0).toUpperCase() + range.slice(1)}
                    </button>
                ))}
                <button
                    onClick={() => {
                        setFilteredDeliveries(deliveries);
                        setActiveRange(null);
                    }}
                    className="px-4 py-2 rounded-lg bg-[#03373D] cursor-pointer text-white font-medium"
                >
                    Clear
                </button>
            </div>

            {/* Responsive Grid */}
            {filteredDeliveries.length === 0 ? (
                <div className="flex flex-col items-center justify-center mt-20 text-center">
                    <MdOutlineLocalShipping className="text-6xl text-[#03373D] mb-3" />
                    <p className="text-lg font-medium text-[#03373D]">
                        {activeRange === 'today'
                            ? 'No Parcels Delivered Today'
                            : 'No Deliveries Found For This Range.'}
                    </p>
                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredDeliveries.map((parcel) => (
                        <div
                            key={parcel._id}
                            className="border-l-7 border-[#CAEB66] bg-white shadow-md rounded-xl p-4 flex flex-col"
                        >
                            <h3 className="font-bold text-[#03373D] mb-2 break-words">
                                Tracking ID: {parcel.trackingId}
                            </h3>
                            <p className="text-sm text-gray-700 mb-1">
                                <strong>Created By:</strong> {parcel.createdBy?.name}
                            </p>
                            <p className="text-sm text-gray-700 mb-1 break-words">
                                <strong>Receiver:</strong>
                                <br />
                                {parcel.receiverName}
                                <br />
                                {parcel.receiverPhone}
                                <br />
                                {parcel.receiverAddress}
                                <br />
                                {parcel.receiverWarehouse}, {parcel.receiverRegion}
                            </p>
                            <p className="text-sm italic mt-2">
                                Delivered At: {format(new Date(parcel.deliveredAt), 'PPp')}
                            </p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default DeliveryHistory;
