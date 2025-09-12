import React, { useEffect, useState } from 'react';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { FaUserTie, FaClock, FaGift, FaMedal } from 'react-icons/fa';

const RiderStats = () => {
  const axiosSecure = useAxiosSecure();
  const [stats, setStats] = useState(null);

  useEffect(() => {
    axiosSecure.get('/admin/rider-performance')
      .then(res => setStats(res.data));
  }, [axiosSecure]);



  if (!stats) return (
    <div className="flex justify-center items-center h-auto">
      <span className="loading loading-spinner text-[#CAEB66] loading-xl"></span>
    </div>
  );

  return (
    <div className="bg-white shadow-md rounded-lg p-6 mb-10">
      <h2 className="text-xl font-bold text-[#03373D] mb-4">🚴 Rider Performance</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard title="Active Riders" value={stats.totalActiveRiders} icon={<FaUserTie />} color="green" />
        <StatCard title="Top Rider" value={`${stats.topRiderEmail} (${stats.topRiderDeliveries})`} icon={<FaMedal />} color="blue" />
        <StatCard title="Avg Delivery Time" value={`${stats.avgDeliveryTime} min`} icon={<FaClock />} color="yellow" />
        <StatCard title="Same-Day Bonus" value={`৳ ${stats.totalSameDayBonus}`} icon={<FaGift />} color="purple" />
        <StatCard title="Daily Bonus" value={`৳ ${stats.totalDailyBonus}`} icon={<FaGift />} color="red" />
      </div>
    </div>
  );
};

const StatCard = ({ title, value, icon, color }) => (
  <div className={`border-l-4 border-${color}-500 bg-white shadow rounded-lg p-4`}>
    <h3 className="text-lg font-semibold text-[#03373D] flex items-center gap-2">
      {icon}
      {title}
    </h3>
    <p className="text-xl font-bold text-[#03373D] mt-2">{value}</p>
  </div>
);

export default RiderStats;
