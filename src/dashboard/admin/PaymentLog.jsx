import React, { useEffect, useState } from 'react';
import { LuRefreshCw } from 'react-icons/lu';

import dayjs from 'dayjs';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import Swal from 'sweetalert2';
import { MdRemoveRedEye } from 'react-icons/md';
import { FaTrashAlt } from 'react-icons/fa';

const PaymentLog = () => {
    const axiosSecure = useAxiosSecure();
    const [selectedEmail, setSelectedEmail] = useState('');
    const [users, setUsers] = useState([]);
    const [payments, setPayments] = useState([]);
    const [loading, setLoading] = useState(false);
    const [hasFetched, setHasFetched] = useState(false);
    const [lastFetchedEmail, setLastFetchedEmail] = useState('');




    const RefreshPage = () => window.location.reload();



    useEffect(() => {
        const fetchUsers = async () => {
            const res = await axiosSecure.get('/users');
            setUsers(res.data);
        };
        fetchUsers();
    }, [axiosSecure]);


    // const fetchPayments = async () => {
    //     setHasFetched(true);
    //     if (!selectedEmail || selectedEmail === "Select User Email") {
    //         return Swal.fire({
    //             title: "No Email Selected",
    //             text: "Please select a valid user email before fetching payment logs.",
    //             icon: "info",
    //             confirmButtonColor: "#03373D"
    //         });
    //     }

    //     if (selectedEmail.includes("admin")) {
    //         return Swal.fire({
    //             title: "Action Blocked",
    //             text: "Admin accounts cannot be queried for payment logs.",
    //             icon: "error",
    //             confirmButtonColor: "#03373D"
    //         });
    //     }

    //     setLoading(true);
    //     try {
    //         const res = await axiosSecure.get(`/admin/payments/${selectedEmail}`);
    //         const payments = res.data.payments || [];

    //         if (payments.length === 0) {
    //             setPayments([]); // clear previous data
    //             return Swal.fire({
    //                 title: "No Payments Found",
    //                 text: "This user has not paid for any parcel yet.",
    //                 icon: "info",
    //                 confirmButtonColor: "#03373D"
    //             });
    //         }

    //         setPayments(payments);
    //     } catch (err) {
    //         console.error("Error fetching payments:", err);
    //         Swal.fire({
    //             title: "Error",
    //             text: "Failed to fetch payment data.",
    //             icon: "error",
    //             confirmButtonColor: "#03373D"
    //         });
    //     } finally {
    //         setLoading(false);
    //     }
    // };
    const fetchPayments = async () => {
        if (!selectedEmail || selectedEmail === "Select User Email") {
            setPayments([]);
            return Swal.fire({
                title: "No Email Selected",
                text: "Please select a valid user email before fetching payment logs.",
                icon: "info",
                iconColor: '#CAEB66',
                confirmButtonColor: "#03373D"
            });
        }

        if (selectedEmail.includes("admin")) {
            setPayments([]);
            return Swal.fire({
                title: "Action Blocked",
                text: "Admin accounts cannot be queried for payment logs.",
                icon: "error",
                iconColor: '#CAEB66',
                confirmButtonColor: "#03373D"
            });
        }

        if (selectedEmail === lastFetchedEmail && payments.length > 0) {
            return Swal.fire({
                title: "Already Displayed",
                text: "You’re already viewing this user’s payment logs.",
                icon: "info",
                iconColor: '#CAEB66',
                confirmButtonColor: "#03373D"
            });
        }

        setHasFetched(true);
        setLoading(true);

        try {
            const res = await axiosSecure.get(`/admin/payments/${selectedEmail}`);
            const fetchedPayments = res.data.payments || [];

            if (fetchedPayments.length === 0) {
                setPayments([]);
                setLastFetchedEmail(''); // reset since no data
                return Swal.fire({
                    title: "No Payments Found",
                    text: "This user has not paid for any parcel yet.",
                    icon: "info",
                    iconColor: '#CAEB66',
                    confirmButtonColor: "#03373D",
                    showConfirmButton: false,
                    timer: 1500, // closes after 2 seconds
                });
            }

            setPayments(fetchedPayments);
            setLastFetchedEmail(selectedEmail); // update tracker
        } catch (err) {
            console.error("Error fetching payments:", err);
            Swal.fire({
                title: "Error",
                text: "Failed to fetch payment data.",
                icon: "error",
                iconColor: '#CAEB66',
                confirmButtonColor: "#03373D"
            });
        } finally {
            setLoading(false);
        }
    };

    const handleDeletePayment = async (id) => {
        const confirm = await Swal.fire({
            title: "Delete Payment?",
            text: "Are you sure you want to delete this payment record?",
            icon: "warning",
            iconColor: '#CAEB66',
            showCancelButton: true,
            confirmButtonText: "Yes, delete",
            cancelButtonText: "Cancel",
            confirmButtonColor: "#03373D",
            cancelButtonColor: "#CAEB66"
        });

        if (!confirm.isConfirmed) return;

        try {
            await axiosSecure.delete(`/admin/payments/${id}`);
            await fetchPayments(); // refresh after delete
            Swal.fire({
                title: "Deleted",
                text: "Payment record deleted successfully.",
                icon: "success",
                iconColor: '#CAEB66',
                confirmButtonColor: "#03373D"
            });
        } catch (err) {
            console.error("Error deleting payment:", err);
            Swal.fire({
                title: "Error",
                text: "Failed to delete payment record.",
                icon: "error",
                iconColor: '#CAEB66',
                confirmButtonColor: "#03373D"
            });
        }
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center h-64">
                <span className="loading loading-spinner text-[#CAEB66] loading-xl"></span>
            </div>
        );
    }

    return (
        <div className="px-1 lg:px-4 py-6">
            {/* Heading */}
            <div className="flex items-center justify-between mb-4">
                <h2 className="text-2xl font-bold text-[#03373D]">
                    Payment Logs <span className="text-xs">({payments.length})</span>
                </h2>
                <button onClick={RefreshPage} className="p-1 cursor-pointer lg:px-3 lg:py-2 bg-[#03373D] text-white hover:text-red-500 font-semibold rounded-lg hover:bg-[#1C4B50]  lg:text-base">
                    <LuRefreshCw className="text-white text-sm hover:text-[#CAEB66]" />
                </button>
            </div>

            {/* Email selector */}
            <div className="flex flex-col lg:flex-row items-center gap-3  mb-6">
                <select
                    value={selectedEmail}
                    onChange={(e) => setSelectedEmail(e.target.value)}
                    className="px-3 py-2 border-b-4 border-[#CAEB66] rounded-lg text-[#03373D] font-semibold w-60 cursor-pointer"
                >
                    <option value="">Select User Email</option>
                    {users.map((user) => (
                        <option key={user.email} value={user.email}>
                            {user.email}
                        </option>
                    ))}
                </select>
                <button
                    onClick={fetchPayments}
                    className="flex items-center gap-1 px-4 py-2 cursor-pointer bg-[#CAEB66] text-[#03373D] text-base font-bold rounded-lg hover:opacity-90"
                >
                    <MdRemoveRedEye size={25} className='pt-1' />  Show
                </button>
            </div>

            {/* Table view for larger screen */}
            <div className="hidden lg:block border border-gray-300 rounded-lg overflow-x-auto">
                <table className="min-w-[1000px] w-full border border-gray-300 rounded-lg shadow-sm">
                    <thead className="bg-[#03373D] text-white">
                        <tr>
                            <th className="px-4 py-2 text-center">Payer Name</th>
                            <th className="px-4 py-2 text-center">Email</th>
                            <th className="px-4 py-2 text-center">Amount</th>
                            <th className="px-4 py-2 text-center">Tracking ID</th>
                            <th className="px-4 py-2 text-center">Paid At</th>
                            <th className="px-4 py-2 text-center">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {hasFetched && payments.length === 0 ? (
                            <tr>
                                <td colSpan="6" className="px-4 py-4 text-center text-[#03373D] font-medium">
                                    This user has not paid for any parcel yet.
                                </td>
                            </tr>
                        ) : (
                            payments.map((pay) => (
                                <tr key={pay._id} className="border-b border-gray-300 hover:bg-[#CAEB6620]">
                                    <td className="px-4 py-2 text-center">{pay.payerName}</td>
                                    <td className="px-4 py-2 text-center">{pay.payerEmail}</td>
                                    <td className="px-4 py-2 text-center">Tk. {pay.amount}</td>
                                    <td className="px-4 py-2 text-center">{pay.trackingId}</td>
                                    <td className="px-4 py-2 text-center">{dayjs(pay.paidAt).format("DD MMM YYYY")}</td>
                                    <td className="px-4 py-2 text-center">
                                        <button
                                            onClick={() => handleDeletePayment(pay._id)}
                                            className="p-2 cursor-pointer rounded-full border border-red-500  text-red-600 hover:bg-red-100"
                                        >
                                            <FaTrashAlt />
                                        </button>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>

            {/* Card view */}
            <div className="lg:hidden flex flex-col gap-4 mt-6">
                {hasFetched && payments.length === 0 ? (
                    <p className="text-center text-[#03373D] font-medium">This user has not paid for any parcel yet.</p>
                ) : (
                    payments.map((pay) => (
                        <div key={pay._id} className="p-3 border-l-8 rounded-xl border-[#CAEB66] shadow-sm bg-white">
                            {[
                                ["Payer Name", pay.payerName],
                                ["Email", pay.payerEmail],
                                ["Amount", `$${pay.amount}`],
                                ["Tracking ID", pay.trackingId],
                                ["Paid At", dayjs(pay.paidAt).format("DD MMM YYYY")]
                            ].map(([label, value]) => (
                                <div key={label} className="mb-2">
                                    <p className="font-bold text-[#03373D]">{label}:</p>
                                    <p>{value}</p>
                                </div>
                            ))}
                            <div className="flex justify-end mt-2">
                                <button
                                    onClick={() => handleDeletePayment(pay._id)}
                                    className="p-2 cursor-pointer rounded-full border border-red-500  text-red-600 hover:bg-red-100"
                                >
                                    <FaTrashAlt />
                                </button>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default PaymentLog;

