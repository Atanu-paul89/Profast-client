import React, { useEffect, useState } from 'react';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import Swal from 'sweetalert2';
import { MdOutlineLocalShipping } from 'react-icons/md';
import useAuth from '../../hooks/useAuth';
import { FaBan } from "react-icons/fa";
import { motion } from "framer-motion";

const AssignedParcels = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();
    const [assignedParcels, setAssignedParcels] = useState([]);
    const [rider, setRider] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchAssignedParcels = async () => {
        try {
            const res = await axiosSecure.get('/rider/assigned-parcels');
            setAssignedParcels(res.data);
        } catch (err) {
            console.error("Error fetching assigned parcels:", err);
        }
    };

    const fetchRider = async () => {
        if (!user?.email) return;
        try {
            const res = await axiosSecure.get(`/admin/active-riders/${user.email}`);
            setRider(res.data);
        } catch (err) {
            console.error("Error fetching rider:", err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchRider();
    }, [user]);

    useEffect(() => {
        if (rider && !rider?.isRiderRestricted) {
            fetchAssignedParcels();
        }
    }, [rider]);

    const handleStatusChange = async (parcelId, newStatus) => {
        const confirm = await Swal.fire({
            title: `Change status to ${newStatus}?`,
            icon: 'question',
            iconColor: '#CAEB66',
            showCancelButton: true,
            confirmButtonText: 'Yes',
            cancelButtonText: 'Cancel',
            confirmButtonColor: '#CAEB66',
            cancelButtonColor: '#03373D'
        });

        if (confirm.isConfirmed) {
            try {
                await axiosSecure.patch(`/rider/update-status/${parcelId}`, { newStatus });
                Swal.fire({
                    icon: 'success',
                    iconColor: '#CAEB66',
                    title: 'Status Updated Successfully!',
                    html: `<strong>Parcel status changed to:</strong> <span style="color:#03373D">${newStatus}</span>`,
                    confirmButtonText: 'Okay',
                    confirmButtonColor: '#03373D',
                });

                fetchAssignedParcels(); // Refresh list
            } catch (err) {
                console.error("Error updating status:", err);
                Swal.fire({
                    icon: 'error',
                    iconColor: '#CAEB66',
                    title: 'Update Failed',
                    html: `<strong>We couldn't update the parcel status.</strong><br><br>
         Please try again or contact support if the issue persists.`,
                    confirmButtonText: 'Close',
                    confirmButtonColor: '#03373D',
                    background: '#FFF5F5',
                    color: '#03373D'
                });

            }
        }
    };

    if (loading) {
        return (
            <div className="flex gap-1 justify-center items-center h-64">
                <span className="loading loading-spinner text-[#CAEB66] loading-xl"></span><span className='font-bold text-lg text-[#03373D]'>Loading Assigned Parcels... </span>
            </div>
        );
    }


    if (rider?.isRiderRestricted) {
        return (
            <motion.div
                className="flex flex-col items-center justify-center min-h-[60vh] text-center"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
            >
                {/* 🚫 Animated Icon */}
                <motion.div
                    animate={{ rotate: [0, -10, 10, -10, 0] }}
                    transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut" }}
                    className="text-red-600 text-7xl mb-4"
                >
                    <FaBan />
                </motion.div>

                {/* Title */}
                <motion.h2
                    className="text-2xl font-bold text-[#03373D] mb-2"
                    initial={{ y: -20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.3, duration: 0.6 }}
                >
                    Access Restricted
                </motion.h2>

                {/* Description */}
                <motion.p
                    className="text-gray-600 max-w-md"
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.5, duration: 0.6 }}
                >
                    🚫 The admin has temporarily restricted your activity.
                    Please contact support if you think this is a mistake.
                </motion.p>
            </motion.div>
        );
    }

    return (

        <section>
            <h2 className="text-xl font-bold text-[#03373D] mb-6">📦 Assigned Parcels</h2>
            {assignedParcels.length === 0 ? (
                // ✅ Empty state UI
                <div className="flex flex-col items-center justify-center text-center mt-16 text-gray-500">
                    <MdOutlineLocalShipping className="text-6xl text-[#03373D] mb-4" />
                    <p className="text-lg font-semibold">No parcels have been assigned yet.</p>
                    <p className="text-sm">You’ll see assigned deliveries here once they are allocated to you.</p>
                </div>
            ) : (
                <>
                    {/* Table View for Large Screens */}
                    <div className="hidden lg:block overflow-x-auto border border-gray-300 rounded-lg">
                        <table className="min-w-[1000px] w-full">
                            <thead className="bg-[#03373D] text-white">
                                <tr>
                                    <th className="px-4 py-2 text-left">Tracking ID</th>
                                    <th className="px-4 py-2 text-left">Parcel Name</th>
                                    <th className="px-4 py-2 text-left">Receiver Details</th>
                                    <th className="px-4 py-2 text-left">Status</th>
                                    <th className="px-4 py-2 text-center">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {assignedParcels.map(parcel => (
                                    <tr key={parcel._id} className="border-b border-gray-300 hover:bg-[#CAEB6620]">
                                        <td className="px-4 py-2">{parcel.trackingId}</td>
                                        <td className="px-4 py-2">{parcel.parcelName}</td>
                                        <td className="px-4 py-2"> {parcel.receiverName} <br /> +88{parcel.receiverPhone} <br /> {parcel.receiverAddress} <br />
                                            {parcel.receiverWarehouse}, {parcel.receiverRegion}</td>
                                        <td className="px-4 py-2">{parcel.status}</td>
                                        <td className="px-4 py-2 text-center space-x-2">
                                            {parcel.status === "In Transit" && (
                                                <button
                                                    onClick={() => handleStatusChange(parcel._id, "Out for Delivery")}
                                                    className="px-3 py-2 cursor-pointer text-sm font-semibold bg-[#03373D] text-white rounded-md "
                                                >
                                                    Out for Delivery
                                                </button>
                                            )}
                                            {parcel.status === "Out for Delivery" && (
                                                <button
                                                    onClick={() => handleStatusChange(parcel._id, "Delivered")}
                                                    className="px-3 py-1 text-sm font-semibold border border-green-500 text-green-600 rounded-md hover:bg-green-100"
                                                >
                                                    Mark as Delivered
                                                </button>
                                            )}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {/* Card View for Small Screens */}
                    <div className="lg:hidden flex flex-col gap-4">
                        {assignedParcels.map(parcel => (
                            <div key={parcel._id} className="p-4 bg-white border-l-8 border-[#CAEB66] rounded-lg shadow-sm">
                                <p className="font-bold text-[#03373D] mb-1">Tracking ID: {parcel.trackingId}</p>
                                <p>Parcel Name: {parcel.parcelName}</p>
                                <p>Receiver Details: <br /> {parcel.receiverName} <br /> +88{parcel.receiverPhone} <br /> {parcel.receiverAddress} <br />
                                    {parcel.receiverWarehouse}, {parcel.receiverRegion}</p>
                                <p>Status: <span className="font-semibold">{parcel.status}</span></p>
                                <div className="mt-3 flex gap-2">
                                    {parcel.status === "In Transit" && (
                                        <button
                                            onClick={() => handleStatusChange(parcel._id, "Out for Delivery")}
                                            className="px-3 py-1 text-sm font-semibold border border-blue-500 text-blue-600 rounded-md hover:bg-blue-100"
                                        >
                                            Out for Delivery
                                        </button>
                                    )}
                                    {parcel.status === "Out for Delivery" && (
                                        <button
                                            onClick={() => handleStatusChange(parcel._id, "Delivered")}
                                            className="px-3 py-1 text-sm font-semibold border border-green-500 text-green-600 rounded-md hover:bg-green-100"
                                        >
                                            Mark as Delivered
                                        </button>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                </>
            )}

        </section>
    );
};

export default AssignedParcels;
