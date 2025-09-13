import React, { useEffect, useState } from 'react';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import { FaChartLine, FaClock, FaCalendarDay } from 'react-icons/fa';
import { MdDeliveryDining } from 'react-icons/md';
import { format } from 'date-fns';
import {
    BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid,
} from 'recharts';

const PerformanceStats = () => {
    const axiosSecure = useAxiosSecure();
    const [loading, setloading] = useState(true);
    const [deliveries, setDeliveries] = useState([]);
    const [monthlyData, setMonthlyData] = useState([]);
    const [totalDeliveries, setTotalDeliveries] = useState(0);
    const [averageTime, setAverageTime] = useState(0);
    const [peakDay, setPeakDay] = useState('');
    const [earningsData, setEarningsData] = useState([]);
    const [totalEarnings, setTotalEarnings] = useState(0);
    const [earningsPerDelivery, setEarningsPerDelivery] = useState(0);

    useEffect(() => {
        axiosSecure.get('/rider/performance-earnings')
            .then(res => {
                const data = res.data;
                setEarningsData(data);

                const total = data.reduce((sum, entry) => sum + (entry.amount || 0), 0);
                setTotalEarnings(total);
                setEarningsPerDelivery((total / data.length).toFixed(2));
                setloading(false);
            });
    }, [axiosSecure]);

    useEffect(() => {
        axiosSecure.get('/rider/delivery-history')
            .then(res => {
                const data = res.data;
                setDeliveries(data);
                setTotalDeliveries(data.length);
                calculateStats(data);
            });
    }, [axiosSecure]);

    const calculateStats = (data) => {
        let totalMinutes = 0;
        const dayCount = {};
        const monthMap = {};

        data.forEach(parcel => {
            const assigned = new Date(parcel.assignedAt);
            const delivered = new Date(parcel.deliveredAt);
            const duration = (delivered - assigned) / (1000 * 60); // in minutes
            totalMinutes += duration;

            const day = format(delivered, 'EEEE');
            dayCount[day] = (dayCount[day] || 0) + 1;

            const month = format(delivered, 'MMM yyyy');
            monthMap[month] = (monthMap[month] || 0) + 1;
        });

        setAverageTime(Math.round(totalMinutes / data.length));

        const peak = Object.entries(dayCount).sort((a, b) => b[1] - a[1])[0];
        setPeakDay(peak ? peak[0] : 'N/A');

        const monthlyArray = Object.entries(monthMap).map(([month, count]) => ({
            month,
            deliveries: count,
        })).sort((a, b) => new Date(a.month) - new Date(b.month));

        setMonthlyData(monthlyArray);
    };

    if (loading) {
        return (
            <div className="flex gap-1 justify-center items-center h-64">
                <span className="loading loading-spinner text-[#CAEB66] loading-xl"></span><span className='font-bold text-lg text-[#03373D]'>Loading Performance Data... </span>
            </div>
        );
    }

    return (
        <div className="px-4 py-6">
            {/* Heading */}
            <h2 className="text-2xl font-bold text-[#03373D] flex items-center gap-3 mb-6">
                <FaChartLine className="text-[#03373D] text-3xl" />
                Performance Stats
            </h2>

            {/* Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
                <div className="bg-white shadow-md rounded-lg p-4 border-l-4 border-green-500">
                    <h3 className="text-lg font-semibold text-[#03373D] flex items-center gap-2">
                        <MdDeliveryDining className="text-xl text-green-500" />
                        Total Deliveries
                    </h3>
                    <p className="text-2xl font-bold text-[#03373D] mt-2">{totalDeliveries}</p>
                </div>

                <div className="bg-white shadow-md rounded-lg p-4 border-l-4 border-yellow-500">
                    <h3 className="text-lg font-semibold text-[#03373D] flex items-center gap-2">
                        <FaClock className="text-xl text-yellow-500" />
                        Avg Delivery Time
                    </h3>
                    <p className="text-2xl font-bold text-[#03373D] mt-2">{averageTime} min</p>
                </div>

                <div className="bg-white shadow-md rounded-lg p-4 border-l-4 border-blue-500">
                    <h3 className="text-lg font-semibold text-[#03373D] flex items-center gap-2">
                        <FaCalendarDay className="text-xl text-blue-500" />
                        Peak Delivery Day
                    </h3>
                    <p className="text-2xl font-bold text-[#03373D] mt-2">{peakDay}</p>
                </div>

                <div className="bg-white shadow-md rounded-lg p-4 border-l-4 border-purple-500">
                    <h3 className="text-lg font-semibold text-[#03373D] flex items-center gap-2">
                        💰 Total Earnings
                    </h3>
                    <p className="text-2xl font-bold text-[#03373D] mt-2">৳ {totalEarnings}</p>
                </div>

                <div className="bg-white shadow-md rounded-lg p-4 border-l-4 border-indigo-500">
                    <h3 className="text-lg font-semibold text-[#03373D] flex items-center gap-2">
                        📦 Earnings/Delivery
                    </h3>
                    <p className="text-2xl font-bold text-[#03373D] mt-2">৳ {earningsPerDelivery}</p>
                </div>
            </div>

            {/* Monthly Chart */}
            <div className="bg-white shadow-md rounded-lg p-6">
                <h3 className="text-lg font-semibold text-[#03373D] mb-4">Monthly Delivery Breakdown</h3>
                {monthlyData.length === 0 ? (
                    <p className="text-gray-500 text-center">No delivery data available.</p>
                ) : (
                    <ResponsiveContainer width="100%" height={300}>
                        <BarChart data={monthlyData}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="month" />
                            <YAxis />
                            <Tooltip />
                            <Bar dataKey="deliveries" fill="#03373D" />
                        </BarChart>
                    </ResponsiveContainer>
                )}
            </div>
        </div>
    );
};

export default PerformanceStats;
