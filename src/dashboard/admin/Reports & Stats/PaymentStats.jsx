import React, { useEffect, useState } from 'react';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { FaMoneyBillWave, FaReceipt } from 'react-icons/fa';

const PaymentStats = () => {
    const axiosSecure = useAxiosSecure();
    const [revenue, setRevenue] = useState(0);
    const [riderPayout, setRiderPayout] = useState(0);

    useEffect(() => {
        axiosSecure.get('/admin/summary-stats')
            .then(res => {
                setRevenue(res.data.revenue || 0);
                setRiderPayout(res.data.riderPayout || 0);
            });
    }, [axiosSecure]);

    if (!revenue && !riderPayout) return (
        <div className="flex justify-center items-center h-auto">
            <span className="loading loading-spinner text-[#CAEB66] loading-xl"></span>
        </div>
    );


    return (
        <div className="bg-white shadow-md rounded-lg p-6 mb-10">
            <h2 className="text-xl font-bold text-[#03373D] mb-4">💰 Payment Overview</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <StatCard title="Total Revenue" value={`৳ ${revenue}`} icon={<FaMoneyBillWave />} color="green" />
                <StatCard
                    title="Paid to Riders"
                    value={`৳ ${riderPayout}`}
                    icon={<FaReceipt />}
                    color="blue"
                />
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

export default PaymentStats;
