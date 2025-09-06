import React, { useEffect, useState } from 'react';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import { LuRefreshCw } from 'react-icons/lu';
import Swal from 'sweetalert2';
import dayjs from 'dayjs';
import { MdModeEdit } from 'react-icons/md';
import { RiDeleteBin6Line } from "react-icons/ri";

const ManageParcels = () => {
    const axiosSecure = useAxiosSecure();
    const [parcels, setParcels] = useState([]);
    const [filter, setFilter] = useState('Pending');
    const [statusCounts, setStatusCounts] = useState({});
    const [selectedEmail, setSelectedEmail] = useState('');
    const [userOverview, setUserOverview] = useState(null);
    const [allUserOverview, setAllUserOverview] = useState([]);
    const [editingParcel, setEditingParcel] = useState(null);
    const [editForm, setEditForm] = useState({});
    // const [userList, setUserList] = useState([]); // state for select user email 


    const fetchParcels = async () => {
        try {
            const res = await axiosSecure.get(`/admin/parcels-by-status?status=${filter}`);
            setParcels(res.data);
        } catch (err) {
            console.error("Error fetching parcels:", err);
        }
    };

    useEffect(() => {
        fetchParcels();
    }, [axiosSecure, filter]);

    const RefreshPage = () => {
        window.location.reload();
        fetchParcels();
    }

    const handleStatusChange = async (parcelId, newStatus) => {
        const confirm = await Swal.fire({
            title: "Change Status?",
            text: `Are you sure you want to mark this parcel as "${newStatus}"?`,
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#03373D",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, change it"
        });

        if (confirm.isConfirmed) {
            try {
                await axiosSecure.patch(`/admin/parcels/${parcelId}/status`, {
                    newStatus,
                    updatedBy: "Admin Panel"
                });
                fetchParcels();
                Swal.fire("Updated!", "Parcel status has been changed.", "success");
            } catch (err) {
                console.error("Error updating status:", err);
                Swal.fire("Error", "Failed to update status.", "error");
            }
        }
    };

    const handleDeleteParcel = async (parcelId) => {
        const confirm = await Swal.fire({
            title: "Delete Parcel?",
            text: "This action cannot be undone.",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#03373D",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it"
        });

        if (confirm.isConfirmed) {
            try {
                await axiosSecure.delete(`/admin/parcels/${parcelId}`);
                fetchParcels();
                Swal.fire("Deleted!", "Parcel has been removed.", "success");
            } catch (err) {
                console.error("Error deleting parcel:", err);
                Swal.fire("Error", "Failed to delete parcel.", "error");
            }
        }
    };

    // over view section -2 functions //
    const fetchStatusCounts = async () => {
        try {
            const res = await axiosSecure.get('/admin/parcel-status-counts');
            setStatusCounts(res.data);
        } catch (err) {
            console.error("Error fetching status counts:", err);
        }
    };

    const fetchUserOverview = async () => {
        if (!selectedEmail) return;
        try {
            const res = await axiosSecure.get(`/admin/user-parcel-overview?email=${selectedEmail}`);
            setUserOverview(res.data);
        } catch (err) {
            console.error("Error fetching user overview:", err);
            if (err.response && err.response.status === 404) {
                Swal.fire({
                    icon: 'error',
                    iconColor: '#CAEB66',
                    title: 'Email Not Found',
                    text: `${selectedEmail} is not registered. Please insert a valid email.`,
                });
            } else {
                // Handle other types of errors
                Swal.fire({
                    icon: 'error',
                    iconColor: '#CAEB66',
                    title: 'Oops...',
                    text: 'Something went wrong. Please try again later.',
                });
            }
        }
    };

    // function to show selectable , showing user email instead of search 
    // const fetchUserList = async () => {
    //     try {
    //         const res = await axiosSecure.get('/admin/users');
    //         setUserList(res.data);
    //     } catch (err) {
    //         console.error("Error fetching user list:", err);
    //     }
    // };

    const fetchAllUserOverview = async () => {
        try {
            const res = await axiosSecure.get('/admin/all-user-parcel-overview');
            setAllUserOverview(res.data);
        } catch (err) {
            console.error("Error fetching all user overview:", err);
        }
    };

    // function for Clear all button
    const handleClearOverview = () => {
        setSelectedEmail('');
        setUserOverview(null);
        setAllUserOverview([]);
    };


    useEffect(() => {
        fetchStatusCounts();
        // fetchUserList();
    }, []);

    return (
        <div className='lg:px-5 lg:mt-5' >
            {/* Heading Section */}
            <div className="flex items-center justify-between mb-4">
                <h2 className="text-2xl font-bold text-[#03373D]">
                    Parcel Oversight <span className="text-xs">({parcels.length})</span>
                </h2>
                <button
                    onClick={RefreshPage}
                    className="px-3 py-2 bg-[#03373D]  text-white hover:text-red-500 font-semibold rounded-lg hover:bg-[#1C4B50] cursor-pointer text-sm lg:text-base"
                >
                    <LuRefreshCw className="text-white text-sm hover:text-[#CAEB66]" />
                </button>
            </div>

            {/* Filter Buttons */}
            <div className="flex  gap-4 mb-4 ">
                {["Pending", "Delivered"].map((status) => (
                    <button
                        key={status}
                        onClick={() => setFilter(status)}
                        className={`px-4 py-2 rounded-lg font-semibold ${filter === status
                            ? "bg-[#CAEB66] border-b-5 cursor-pointer text-[#03373D]"
                            : "bg-gray-200 cursor-pointer text-gray-700 hover:bg-gray-300"
                            }`}
                    >
                        {status}
                    </button>
                ))}

                <button
                    onClick={() => {
                        const section = document.getElementById("overview");
                        if (section) {
                            section.scrollIntoView({ behavior: "smooth" });
                        }
                    }}
                    className='px-4 cursor-pointer hover:bg-[#1C4B50] py-2 rounded-lg font-semibold bg-[#03373D] text-[#BAEC66]'>
                    OverView
                </button>

            </div>

            {/* section-1 */}

            {/* larrger device: Table View */}
            <div className="hidden border border-gray-300 rounded-lg lg:block overflow-x-auto">
                <table className="min-w-[1450px] w-full border border-gray-300 rounded-lg overflow-hidden shadow-sm">
                    <thead className="bg-[#03373D] text-white">
                        <tr>
                            <th className="px-4 py-2 text-left">Tracking ID</th>
                            <th className="px-4 py-2 text-left">Parcel Name</th>
                            <th className="px-4 py-2 text-left whitespace-nowrap overflow-hidden text-ellipsis">Created At</th>
                            <th className="px-4 py-2 text-left whitespace-nowrap overflow-hidden text-ellipsis">Created By</th>
                            <th className="px-4 py-2 text-left whitespace-nowrap overflow-hidden text-ellipsis  overflow-x-auto">Sender Details</th>
                            <th className="px-4 py-2 text-left">Receiver Details</th>
                            <th className="px-4 py-2 text-left">Fare</th>
                            <th className="px-4 py-2 text-left">Status</th>
                            <th className="px-4 py-2 text-left">Delivered At</th>
                            <th className="px-4 py-2 text-left">Delivered By</th>
                            <th className="px-4 py-2 text-center">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {parcels.map((parcel) => (
                            <tr key={parcel._id} className="border-b border-gray-300 hover:bg-[#CAEB6620]">
                                <td className="px-4 py-2 whitespace-nowrap overflow-hidden text-ellipsis">{parcel.trackingId}</td>
                                <td className="px-4 py-2 whitespace-nowrap overflow-hidden text-ellipsis">{parcel.parcelName}</td>
                                <td className="px-4 py-2 whitespace-nowrap overflow-hidden text-ellipsis">{dayjs(parcel.createdAt).format("DD MMM YYYY")}</td>
                                <td className="px-4 py-2 whitespace-nowrap overflow-hidden text-ellipsis">{parcel.createdBy.email}</td>
                                <td className="px-4 py-2 ">{parcel.senderName}, <br /> {parcel.senderAddress}, <br /> {parcel.senderWarehouse}, {parcel.senderRegion} </td>
                                <td className="px-4 py-2 whitespace-nowrap overflow-hidden text-ellipsis">{parcel.receiverName}</td>
                                <td className="px-4 py-2 whitespace-nowrap overflow-hidden text-ellipsis">৳{parcel.fare}</td>
                                <td className="px-4 py-2 whitespace-nowrap overflow-hidden text-ellipsis">
                                    <select
                                        value={parcel.status}
                                        onChange={(e) => handleStatusChange(parcel._id, e.target.value)}
                                        className="px-2 py-1 border rounded-md bg-white"
                                    >
                                        {["Pending", "Picked Up", "In Transit", "Out for Delivery", "Delivered"].map((status) => (
                                            <option key={status} value={status}>{status}</option>
                                        ))}
                                    </select>
                                </td>
                                <td className="px-4 py-2 whitespace-nowrap overflow-hidden text-ellipsis">
                                    {parcel.deliveredAt ? dayjs(parcel.deliveredAt).format("DD MMM YYYY h:mm A") : "Not Delivered yet"}
                                </td>
                                <td className="px-4 py-2 whitespace-nowrap overflow-hidden text-ellipsis">
                                    {parcel.updated_by && parcel.updated_by !== "System"
                                        ? `${parcel.updated_by.name} (${parcel.updated_by.email})`
                                        : "Not out for delivery yet"}
                                </td>
                                <td className="px-4 py-2 text-center">
                                    <div className="flex gap-2 justify-center">
                                        {/* edit parcel  */}
                                        <button
                                            onClick={() => {
                                                setEditingParcel(parcel);
                                                setEditForm({
                                                    parcelType: parcel.parcelType,
                                                    parcelName: parcel.parcelName,
                                                    weight: parcel.weight,
                                                    senderName: parcel.senderName,
                                                    senderPhone: parcel.senderPhone,
                                                    senderAddress: parcel.senderAddress,
                                                    senderRegion: parcel.senderRegion,
                                                    senderWarehouse: parcel.senderWarehouse,
                                                    receiverName: parcel.receiverName,
                                                    receiverPhone: parcel.receiverPhone,
                                                    receiverAddress: parcel.receiverAddress,
                                                    receiverRegion: parcel.receiverRegion,
                                                    receiverWarehouse: parcel.receiverWarehouse,
                                                    pickupInstructions: parcel.pickupInstructions,
                                                    deliveryInstructions: parcel.deliveryInstructions,
                                                    isDocument: parcel.isDocument,
                                                    parcelCategory: parcel.parcelCategory,
                                                    fare: parcel.fare,
                                                    paymentStatus: parcel.paymentStatus,
                                                    trackingId: parcel.trackingId,
                                                    createdBy: parcel.createdBy ?? { email: '', name: '' },
                                                    paymentInfo: parcel.paymentInfo ?? { paymentIntentId: '', amount: '', payerEmail: '' }
                                                });
                                            }}

                                            className="px-2 cursor-pointer py-2 border-1 border-[#03373D] text-[#03373D] rounded-full hover:bg-blue-100">
                                            <MdModeEdit />
                                        </button>

                                        {/* delete parcel */}
                                        <button
                                            onClick={() => handleDeleteParcel(parcel._id)}
                                            className="px-2 py-2 cursor-pointer border border-red-500 text-red-500 rounded-full hover:bg-red-100"
                                        >
                                            <RiDeleteBin6Line />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Small screens: card view */}
            <div className="lg:hidden flex flex-col gap-4">
                {parcels.map((parcel) => (
                    <div key={parcel._id} className="p-4 border-l-8 rounded-xl border-[#CAEB66] shadow-sm bg-white">
                        <div className="mb-2">
                            <p className="font-bold text-[#03373D]">Tracking ID:</p>
                            <p>{parcel.trackingId}</p>
                        </div>
                        <div className="mb-2">
                            <p className="font-bold text-[#03373D]">Parcel Name:</p>
                            <p>{parcel.parcelName}</p>
                        </div>
                        <div className="mb-2">
                            <p className="font-bold text-[#03373D]">Created At:</p>
                            <p>{dayjs(parcel.createdAt).format("DD MMM YYYY")}</p>
                        </div>
                        <div className="mb-2">
                            <p className="font-bold text-[#03373D]">Created By:</p>
                            <p>{parcel.createdBy.email}</p>
                        </div>
                        <div className="mb-2">
                            <p className="font-bold text-[#03373D]">Sender Details:</p>
                            <p>{parcel.senderName}</p>
                            <p>{parcel.senderAddress}, {parcel.senderWarehouse}, {parcel.senderRegion}</p>
                        </div>
                        <div className="mb-2">
                            <p className="font-bold text-[#03373D]">Receiver Details:</p>
                            <p>{parcel.receiverName}</p>
                            <p>{parcel.receiverAddress}, {parcel.receiverWarehouse}, {parcel.receiverRegion}</p>
                        </div>
                        <div className="mb-2">
                            <p className="font-bold text-[#03373D]">Fare:</p>
                            <p>৳{parcel.fare}</p>
                        </div>
                        <div className="mb-2">
                            <p className="font-bold text-[#03373D]">Status:</p>
                            <select
                                value={parcel.status}
                                onChange={(e) => handleStatusChange(parcel._id, e.target.value)}
                                className="px-2 py-1 border rounded-md bg-white"
                            >
                                {["Pending", "Picked Up", "In Transit", "Out for Delivery", "Delivered"].map((status) => (
                                    <option key={status} value={status}>{status}</option>
                                ))}
                            </select>
                        </div>
                        <div className="mb-2">
                            <p className="font-bold text-[#03373D]">Delivered At:</p>
                            <p>{parcel.deliveredAt ? dayjs(parcel.deliveredAt).format("DD MMM YYYY h:mm A") : "Not Delivered yet"}</p>
                        </div>
                        <div className="mb-2">
                            <p className="font-bold text-[#03373D]">Delivered By:</p>
                            <p>
                                {parcel.updated_by && parcel.updated_by !== "System"
                                    ? `${parcel.updated_by.name} (${parcel.updated_by.email})`
                                    : "Not out for delivery yet"}
                            </p>
                        </div>
                        <div className="flex justify-end gap-3 mt-2">
                            <button className="px-3 py-1 text-sm font-semibold border border-blue-500 text-blue-500 rounded-md hover:bg-blue-100">
                                Edit
                            </button>
                            <button
                                onClick={() => handleDeleteParcel(parcel._id)}
                                className="px-3 py-1 text-sm font-semibold border border-red-500 text-red-500 rounded-md hover:bg-red-100"
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {/* section-1 ended */}


            {/* Section 2: Parcel Analytics & User Overview */}
            <section className="mt-10 space-y-6">
                {/* Parcel Status Overview */}
                <div id='overview' className='py-7'>
                    <h3 className="text-xl lg:text-2xl  font-bold text-[#03373D] mb-4">📦 Parcel Status Overview</h3>
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                        {["Pending", "PickedUp", "InTransit", "OutForDelivery", "Delivered"].map((status) => (
                            <div key={status} className="bg-[#CAEB66] text-[#03373D] p-4 rounded-lg shadow-sm text-center">
                                <p className="font-bold text-lg">{status.replace(/([A-Z])/g, ' $1')}</p>
                                <p className="text-2xl font-extrabold">{statusCounts[status] ?? 0}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* User Parcel Overview */}
                <div className='pb-7'>
                    <h3 className="text-xl font-bold text-[#03373D] mb-4">👤 User Parcel Overview</h3>
                    <div className="flex flex-col md:flex-row items-center gap-4 mb-4">
                        <input
                            type="email"
                            placeholder="Enter user email"
                            value={selectedEmail}
                            onChange={(e) => setSelectedEmail(e.target.value)}
                            className="px-4 py-2 border rounded-md w-full md:w-1/2"
                        />
                        {/* <select
                            value={selectedEmail}
                            onChange={(e) => setSelectedEmail(e.target.value)}
                            className="px-4 py-2 border rounded-md w-full md:w-1/2"
                        >
                            <option value="">Select a user</option>
                            {userList.map((user) => (
                                <option key={user.email} value={user.email}>
                                    {user.name ?? "Unnamed"} ({user.email})
                                </option>
                            ))}
                        </select> */}

                        <button
                            onClick={fetchUserOverview}

                            className="px-4 py-2 bg-[#03373D] cursor-pointer text-white font-semibold rounded-md hover:bg-[#1C4B50]"
                        >
                            Show Overview
                        </button>
                        <button
                            onClick={handleClearOverview}
                            className="px-4 py-2 bg-[#03373D] cursor-pointer text-white font-semibold rounded-md hover:bg-[#1C4B50]"
                        >
                            Clear All
                        </button>
                        <button
                            onClick={fetchAllUserOverview}
                            className="px-4 py-2 bg-[#CAEB66] cursor-pointer text-[#03373D] font-semibold rounded-md hover:bg-[#d9f27c]"
                        >
                            Show Overview of All Users
                        </button>
                    </div>
                    {userOverview && (
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div className="bg-white border-l-8 border-[#CAEB66] p-4 rounded-lg shadow-sm">
                                <p className="font-bold text-[#03373D]">Total Parcels</p>
                                <p className="text-2xl font-extrabold">{userOverview.total}</p>
                            </div>
                            <div className="bg-white border-l-8 border-green-500 p-4 rounded-lg shadow-sm">
                                <p className="font-bold text-[#03373D]">Delivered</p>
                                <p className="text-2xl font-extrabold">{userOverview.delivered}</p>
                            </div>
                            <div className="bg-white border-l-8 border-red-500 p-4 rounded-lg shadow-sm">
                                <p className="font-bold text-[#03373D]">Pending</p>
                                <p className="text-2xl font-extrabold">{userOverview.pending}</p>
                            </div>
                        </div>
                    )}

                    {allUserOverview.length > 0 && (
                        <div className="mt-6 space-y-4">
                            <h3 className="text-xl font-bold text-[#03373D]">📊 All Users Overview</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                {allUserOverview.map((user) => (
                                    <div key={user.email} className="bg-white border-l-8 border-[#CAEB66] p-4 rounded-lg shadow-sm">
                                        <p className="font-bold text-[#03373D] mb-1">{user.name} ({user.email})</p>
                                        <p>Total Parcels: <span className="font-bold">{user.total}</span></p>
                                        <p>Delivered: <span className="text-green-600 font-bold">{user.delivered}</span></p>
                                        <p>Pending: <span className="text-red-600 font-bold">{user.pending}</span></p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                </div>
            </section>

            {/* Modal for editing parcels  */}
            {editingParcel && (
                <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
                    <div className="bg-white p-6 rounded-lg w-full max-w-3xl max-h-[90vh] overflow-y-auto shadow-lg">
                        <h3 className="text-xl font-bold text-[#03373D] mb-4">✏️ Edit Parcel</h3>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {[
                                ["Parcel Type", "parcelType"],
                                ["Parcel Name", "parcelName"],
                                ["Weight", "weight"],
                                ["Parcel Category", "parcelCategory"],
                                ["Fare", "fare"],
                                ["Payment Status", "paymentStatus"],
                                ["Tracking ID", "trackingId"],
                                ["Is Document", "isDocument"],
                                ["Pickup Instructions", "pickupInstructions"],
                                ["Delivery Instructions", "deliveryInstructions"],
                                ["Sender Name", "senderName"],
                                ["Sender Phone", "senderPhone"],
                                ["Sender Address", "senderAddress"],
                                ["Sender Region", "senderRegion"],
                                ["Sender Warehouse", "senderWarehouse"],
                                ["Receiver Name", "receiverName"],
                                ["Receiver Phone", "receiverPhone"],
                                ["Receiver Address", "receiverAddress"],
                                ["Receiver Region", "receiverRegion"],
                                ["Receiver Warehouse", "receiverWarehouse"]
                            ].map(([label, key]) => (
                                <label key={key} className="block">
                                    <span className="text-sm font-semibold text-[#03373D]">{label}</span>
                                    <input
                                        type="text"
                                        value={editForm[key]}
                                        onChange={(e) => setEditForm({ ...editForm, [key]: e.target.value })}
                                        className="w-full px-3 py-2 border rounded-md mt-1"
                                    />
                                </label>
                            ))}

                            {/* Nested: createdBy */}
                            <label className="block">
                                <span className="text-sm font-semibold text-[#03373D]">Created By Name</span>
                                <input
                                    type="text"
                                    value={editForm.createdBy.name}
                                    onChange={(e) =>
                                        setEditForm({ ...editForm, createdBy: { ...editForm.createdBy, name: e.target.value } })
                                    }
                                    className="w-full px-3 py-2 border rounded-md mt-1"
                                />
                            </label>
                            <label className="block">
                                <span className="text-sm font-semibold text-[#03373D]">Created By Email</span>
                                <input
                                    type="email"
                                    value={editForm.createdBy.email}
                                    onChange={(e) =>
                                        setEditForm({ ...editForm, createdBy: { ...editForm.createdBy, email: e.target.value } })
                                    }
                                    className="w-full px-3 py-2 border rounded-md mt-1"
                                />
                            </label>

                            {/* Nested: paymentInfo */}
                            <label className="block">
                                <span className="text-sm font-semibold text-[#03373D]">Payment Intent ID</span>
                                <input
                                    type="text"
                                    value={editForm.paymentInfo.paymentIntentId}
                                    onChange={(e) =>
                                        setEditForm({ ...editForm, paymentInfo: { ...editForm.paymentInfo, paymentIntentId: e.target.value } })
                                    }
                                    className="w-full px-3 py-2 border rounded-md mt-1"
                                />
                            </label>
                            <label className="block">
                                <span className="text-sm font-semibold text-[#03373D]">Payment Amount</span>
                                <input
                                    type="number"
                                    value={editForm.paymentInfo.amount}
                                    onChange={(e) =>
                                        setEditForm({ ...editForm, paymentInfo: { ...editForm.paymentInfo, amount: parseFloat(e.target.value) } })
                                    }
                                    className="w-full px-3 py-2 border rounded-md mt-1"
                                />
                            </label>
                            <label className="block">
                                <span className="text-sm font-semibold text-[#03373D]">Payer Email</span>
                                <input
                                    type="email"
                                    value={editForm.paymentInfo.payerEmail}
                                    onChange={(e) =>
                                        setEditForm({ ...editForm, paymentInfo: { ...editForm.paymentInfo, payerEmail: e.target.value } })
                                    }
                                    className="w-full px-3 py-2 border rounded-md mt-1"
                                />
                            </label>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex justify-end gap-3 mt-6">
                            <button
                                onClick={() => setEditingParcel(null)}
                                className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={async () => {
                                    try {
                                        await axiosSecure.patch(`/admin/parcels/${editingParcel._id}/edit`, editForm);
                                        setEditingParcel(null);
                                        fetchParcels();
                                        Swal.fire("Updated!", "Parcel details updated successfully.", "success");
                                    } catch (err) {
                                        console.error("Error editing parcel:", err);
                                        Swal.fire("Error", "Failed to update parcel.", "error");
                                    }
                                }}
                                className="px-4 py-2 bg-[#CAEB66] text-[#03373D] font-bold rounded-md hover:bg-[#d9f27c]"
                            >
                                Save Changes
                            </button>
                        </div>
                    </div>
                </div>
            )}



        </div>
    );
};

export default ManageParcels;
