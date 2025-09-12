import React, { useEffect, useState } from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import dayjs from "dayjs";
import Swal from "sweetalert2";
import { FaTrashAlt, FaBan } from "react-icons/fa";
import { LuRefreshCw } from "react-icons/lu";
import { BsFillUnlockFill } from "react-icons/bs";

const ManageUsers = () => {
    const axiosSecure = useAxiosSecure();
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axiosSecure.get("/users")
            .then((res) => {
                setUsers(res.data);
                setLoading(false);
            })
            .catch((err) => {
                console.error("Failed to fetch users:", err);
                setLoading(false);
            });
    }, [axiosSecure]);


    const handleRoleChange = async (email, newRole) => {

        Swal.fire({
            title: "Change Role?",
            text: `Do you want to change this user's role to "${newRole}"?`,
            icon: "question",
            iconColor: "#CAEB66",
            showCancelButton: true,
            confirmButtonColor: "#03373D",
            cancelButtonColor: "#CAEB66",
            confirmButtonText: "Yes, change it",
            cancelButtonText: "Cancel"
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    const res = await axiosSecure.patch(`/users/${email}/role`, { role: newRole });
                    setUsers(users.map(u => u.email === email ? { ...u, role: newRole } : u));
                    Swal.fire("Updated!", res.data.message, "success");
                } catch (err) {
                    Swal.fire("Error", "Failed to update role.", err);
                }
            }
        });
    };

    const handleRestriction = async (email, currentStatus, role) => {
        if (role === "admin") {
            return Swal.fire("Blocked", "Admin users cannot be restricted.", "info");
        }

        const restricted = !currentStatus;
        const actionText = restricted ? "restrict" : "unblock";

        Swal.fire({
            title: `${restricted ? "Restrict" : "Unblock"} User?`,
            text: `Do you want to ${actionText} this user?`,
            icon: "warning",
            iconColor: "#CAEB66",
            showCancelButton: true,
            confirmButtonColor: "#03373D",
            cancelButtonColor: "#CAEB66",
            confirmButtonText: `Yes, ${actionText}`,
            cancelButtonText: "Cancel"
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    const res = await axiosSecure.patch(`/users/${email}/restrict`, { restricted });
                    setUsers(users.map(u => u.email === email ? { ...u, isRestricted: restricted } : u));
                    Swal.fire("Updated!", res.data.message, "success");
                } catch (err) {
                    Swal.fire("Error", "Failed to update restriction.", err);
                }
            }
        });
    };

    const handleDelete = async (email, role) => {
        if (role === "admin")
            return Swal.fire("Blocked", "Admin users cannot be Deleted.", "info");

        Swal.fire({
            title: "Delete User?",
            text: "This action cannot be undone.",
            icon: "warning",
            iconColor: "#CAEB66",
            showCancelButton: true,
            confirmButtonColor: "#03373D",
            cancelButtonColor: "#CAEB66",
            confirmButtonText: "Yes, delete!",
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    await axiosSecure.delete(`/users/${email}`);
                    setUsers(users.filter((u) => u.email !== email));
                    Swal.fire("Deleted!", "User has been deleted.", "success");
                } catch (err) {
                    Swal.fire("Error", "Failed to delete user.", err);
                }
            }
        });
    };

    // function for Refreshing the page
    const RefreshPage = () => {
        window.location.reload();
    };

    if (loading) {
        return (
            <div className="flex gap-1 justify-center items-center h-64">
                <span className="loading loading-spinner text-[#CAEB66] loading-xl"></span><span className='font-bold text-lg text-[#03373D]'>Loading Users Data... </span>
            </div>
        );
    }


    if (!loading && users.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center h-64">
                <p className="text-2xl font-bold text-[#CAEB66] animate-bounce">
                    No Users Found 👥
                </p>
            </div>
        );
    }

    return (
        <div className="lg:p-4">
            <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-[#03373D] mb-4">Manage Users<span className="text-xs"> ({users.length})</span></h2>

                {/* Refresh the page */}
                <button onClick={RefreshPage} className="px-3 py-2 bg-[#03373D] text-white hover:text-red-500 font-semibold rounded-lg hover:bg-[#1C4B50] cursor-pointer text-sm lg:text-base">
                    <LuRefreshCw className="text-white text-sm hover:text-[#CAEB66] cursor-pointer" />
                </button>

            </div>

            {/* Large screens: scrollable table */}
            <div className="hidden lg:block overflow-x-auto">
                <table className="min-w-[1000px] w-full border border-gray-300 rounded-lg overflow-hidden shadow-sm">
                    <thead className="bg-[#03373D] text-white">
                        <tr>
                            <th className="px-4 py-2 text-left">Photo</th>
                            <th className="px-4 py-2 text-left">Name</th>
                            <th className="px-4 py-2 text-left">Email</th>
                            <th className="px-4 py-2 text-left">Contact</th>
                            <th className="px-4 py-2 text-left">Role</th>
                            <th className="px-4 py-2 text-left">Joined</th>
                            <th className="px-4 py-2 text-left whitespace-nowrap overflow-hidden text-ellipsis">Requested Rider</th>
                            <th className="px-4 py-2 text-left whitespace-nowrap overflow-hidden text-ellipsis">Applied Count</th>
                            <th className="px-4 py-2 text-left">Restricted</th>
                            <th className="px-4 py-2 text-left">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((u) => (
                            <tr key={u.email} className={`border-b border-gray-300 hover:bg-[#CAEB6620] ${u.isRestricted ? ' text-red-500' : ''}`}>
                                <td className="px-4 py-2">
                                    <img src={u.photoURL} alt="User" className="w-10 h-10 rounded-full" />
                                </td>
                                <td className="px-4 py-2 whitespace-nowrap overflow-hidden text-ellipsis">{u.name}</td>
                                <td className="px-4 py-2">{u.email}</td>
                                <td className="px-4 py-2">{u.contactNo}</td>
                                <td className="px-4 py-2">
                                    <select
                                        value={u.role}
                                        onChange={(e) => handleRoleChange(u.email, e.target.value)}
                                        disabled={u.role === "admin"}
                                        className="bg-transparent font-bold cursor-pointer rounded px-2 py-1"
                                    >
                                        <option value="merchant">Merchant</option>
                                        <option value="rider">Rider</option>
                                        <option value="admin">Admin</option>
                                    </select>
                                </td>
                                <td className="px-4 py-2 whitespace-nowrap overflow-hidden text-ellipsis">{dayjs(u.createdAt).format("DD MMM YYYY")}</td>

                                <td className="px-4 py-2 text-center">
                                    {u.IsRequestedToBeRider === "Approved & Application Deleted" ||

                                        u.IsRequestedToBeRider === "Yes"
                                        ? "Yes"
                                        : "No"}
                                </td>
                                <td className="px-4 py-2 text-center">{u.AppliedToBeRider ?? 0}</td>
                                <td className="px-4 py-2 text-center">{u.isRestricted ? "Yes" : "No"}</td>
                                <td className="px-4 py-2">
                                    <div className="flex gap-3">
                                        <button
                                            onClick={() => handleRestriction(u.email, u.isRestricted, u.role)}
                                            className="p-2 cursor-pointer rounded-full border text-[#03373D] hover:bg-[#CAEB6650]"
                                        >
                                            {u.isRestricted ? <BsFillUnlockFill /> : <FaBan />}
                                        </button>
                                        <button
                                            onClick={() => handleDelete(u.email, u.role)}
                                            className="p-2 cursor-pointer rounded-full border border-red-500 text-red-600 hover:bg-red-100"
                                        >
                                            <FaTrashAlt />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Small screens: card view */}
            <div className="lg:hidden flex flex-col gap-4 ">
                {users.map((u) => (
                    <div key={u.email} className="p-4 border-l-8 rounded-xl border-[#CAEB66] shadow-sm bg-white">
                        {/* Profile Image */}
                        <div className="flex justify-center mb-4">
                            <img
                                src={u.photoURL}
                                alt="User"
                                className="w-20 h-20 rounded-full border-2 border-[#CAEB66] object-cover"
                            />
                        </div>

                        {/* User Info */}
                        <div className="mb-2">
                            <p className="font-bold text-[#03373D]">Name:</p>
                            <p>{u.name}</p>
                        </div>
                        <div className="mb-2 break-words">
                            <p className="font-bold text-[#03373D]">Email:</p>
                            <p>{u.email}</p>
                        </div>
                        <div className="mb-2">
                            <p className="font-bold text-[#03373D]">Contact:</p>
                            <p>{u.contactNo}</p>
                        </div>
                        <div className="mb-2 flex justify-between items-center">
                            <p className="font-bold text-[#03373D]">Role:</p>
                            <select
                                value={u.role}
                                onChange={(e) => handleRoleChange(u.email, e.target.value)}
                                disabled={u.role === "admin"}
                                className="bg-transparent font-bold rounded px-2 py-1"
                            >
                                <option value="merchant">Merchant</option>
                                <option value="rider">Rider</option>
                                <option value="admin">Admin</option>
                            </select>
                        </div>
                        <div className="mb-2">
                            <p className="font-bold text-[#03373D]">Joined:</p>
                            <p>{dayjs(u.createdAt).format("DD MMM YYYY")}</p>
                        </div>
                        <div className="mb-2">
                            <p className="font-bold text-[#03373D]">Requested Rider:</p>
                            <p>                                    {u.IsRequestedToBeRider === "Approved & Application Deleted" ||

                                u.IsRequestedToBeRider === "Yes"
                                ? "Yes"
                                : "No"}</p>
                        </div>
                        <div className="mb-2">
                            <p className="font-bold text-[#03373D]">Applied Count:</p>
                            <p>{u.AppliedToBeRider ?? 0}</p>
                        </div>

                        {/* Actions */}
                        <div className="flex justify-end gap-4 mt-4">
                            <button
                                onClick={() => handleRestriction(u.email, u.isRestricted, u.role)}
                                className="flex items-center gap-1 text-orange-600 hover:text-orange-800"
                            >
                                <FaBan /> {u.isRestricted ? "Unblock" : "Restrict"}
                            </button>
                            <button
                                onClick={() => handleDelete(u.email, u.role)}
                                className="flex items-center gap-1 text-red-600 hover:text-red-800"
                            >
                                <FaTrashAlt /> Delete
                            </button>
                        </div>
                    </div>
                ))}
            </div>

        </div>
    );
};
export default ManageUsers;

