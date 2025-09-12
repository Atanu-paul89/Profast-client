import React, { useEffect, useState } from 'react';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { FaBoxOpen, FaCheckCircle, FaClock, FaTimesCircle } from 'react-icons/fa';

const ParcelStats = () => {
    const axiosSecure = useAxiosSecure();
    const [stats, setStats] = useState(null);

    useEffect(() => {
        axiosSecure.get('/admin/summary-stats')
            .then(res => {
                const parcelData = res.data.parcels;
                setStats(parcelData);
            });
    }, [axiosSecure]);


    if (!stats) return (
        <div className="flex justify-center items-center h-auto">
            <span className="loading loading-spinner text-[#CAEB66] loading-xl"></span>
        </div>
    );

    return (
        <div className="bg-white shadow-md rounded-lg p-6 mb-10">
            <h2 className="text-xl font-bold text-[#03373D] mb-4">📦 Parcel Overview</h2>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <StatCard title="Total Parcels" value={stats.totalParcels} icon={<FaBoxOpen />} color="green" />
                <StatCard title="Delivered" value={stats.delivered} icon={<FaCheckCircle />} color="blue" />
                <StatCard title="Pending" value={stats.pending} icon={<FaClock />} color="yellow" />
                <StatCard title="Cancelled" value={stats.cancelled} icon={<FaTimesCircle />} color="red" />
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

export default ParcelStats;
