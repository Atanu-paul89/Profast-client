import React, { useEffect, useState } from 'react';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { FaUserShield, FaUserTie, FaUserAlt, FaUserLock, FaMoneyCheckAlt, FaBox } from 'react-icons/fa';

const UserStats = () => {
  const axiosSecure = useAxiosSecure();
  const [stats, setStats] = useState(null);

  useEffect(() => {
    axiosSecure.get('/admin/user-stats')
      .then(res => setStats(res.data));
  }, [axiosSecure]);



  if (!stats) return (
    <div className="flex justify-center items-center h-auto">
      <span className="loading loading-spinner text-[#CAEB66] loading-xl"></span>
    </div>
  );

  return (
    <div className="bg-white shadow-md rounded-lg p-6 mb-10">
      <h2 className="text-xl font-bold text-[#03373D] mb-4">👥 User Overview</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard title="Total Users" value={stats.totalUsers} icon={<FaUserShield />} color="green" />
        <StatCard title="Merchants" value={stats.totalMerchants} icon={<FaUserTie />} color="blue" />
        <StatCard title="Riders" value={stats.totalRiders} icon={<FaUserAlt />} color="yellow" />
        <StatCard title="Restricted Users" value={stats.restrictedUsers} icon={<FaUserLock />} color="red" />
        <StatCard title="Top Merchant" value={`${stats.topMerchant.email} (${stats.topMerchant.parcels})`} icon={<FaBox />} color="purple" />
        <StatCard title="Top Payer" value={`${stats.topPayer.email} (৳${stats.topPayer.amount})`} icon={<FaMoneyCheckAlt />} color="indigo" />
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

export default UserStats;
