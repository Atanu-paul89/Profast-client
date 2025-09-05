import React, { useEffect, useState } from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import dayjs from "dayjs";
import Swal from "sweetalert2";
import { RxCheck, RxCross2 } from "react-icons/rx";
import { FaBan, FaRegCheckCircle, FaTrashAlt } from "react-icons/fa";
import { MdBlock } from "react-icons/md";
import { MdLockOpen } from "react-icons/md";
import { IoMdEye } from "react-icons/io";
import { LuRefreshCw } from "react-icons/lu";


const RiderApplication = () => {
    const axiosSecure = useAxiosSecure();
    const [applications, setApplications] = useState([]);
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [paused, setPaused] = useState(false);
    const [restrictEmail, setRestrictEmail] = useState("");

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [appRes, userRes, configRes] = await Promise.all([
                    axiosSecure.get("/admin/rider-applications"),
                    axiosSecure.get("/users"),
                    axiosSecure.get("/admin/rider-submission-control")
                ]);
                setApplications(appRes.data);
                setUsers(userRes.data);
                setPaused(configRes.data.paused);
            } catch (err) {
                console.error("Failed to fetch data:", err);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [axiosSecure]);

    const getUserPhoto = (email) => {
        const user = users.find((u) => u.email === email);
        return user?.photoURL ?? "https://via.placeholder.com/80";
    };

    const handleStatusChange = async (email, status) => {
        const { value: feedback } = await Swal.fire({
            title: `${status} Application`,
            input: "textarea",
            inputLabel: "Feedback (optional)",
            inputPlaceholder: "Enter feedback for the applicant...",
            showCancelButton: true,
            confirmButtonText: `Confirm ${status}`,
            cancelButtonText: "Cancel",
            icon: "question",
            iconColor: "#CAEB66",
            confirmButtonColor: "#03373D",
            cancelButtonColor: "#CAEB66"
        });

        if (feedback !== undefined) {
            try {
                const res = await axiosSecure.patch(`/admin/rider-applications/${email}/status`, {
                    status,
                    feedback
                });
                Swal.fire("Updated!", res.data.message, "success");
                const updated = await axiosSecure.get("/admin/rider-applications");
                setApplications(updated.data);
            } catch (err) {
                Swal.fire("Error", "Failed to update status", err);
            }
        }
    };

    const togglePause = async () => {
        try {
            const res = await axiosSecure.patch("/admin/rider-submission-control", {
                paused: !paused
            });
            setPaused(!paused);
            Swal.fire("Updated!", res.data.message, "success");
        } catch (err) {
            Swal.fire("Error", "Failed to update submission control", err);
        }
    };

    // const restrictUser = async () => {
    //     if (!restrictEmail) return;
    //     const confirm = await Swal.fire({
    //         title: "Restrict User?",
    //         text: `Do you want to block ${restrictEmail} from submitting rider applications?`,
    //         showCancelButton: true,
    //         confirmButtonText: "Yes, restrict",
    //         cancelButtonText: "Cancel",
    //         icon: "warning",
    //         iconColor: "#CAEB66",
    //         confirmButtonColor: "#03373D",
    //         cancelButtonColor: "#CAEB66"
    //     });

    //     if (confirm.isConfirmed) {
    //         try {
    //             const res = await axiosSecure.patch(`/admin/restrict-user/${restrictEmail}`, {
    //                 restricted: true
    //             });
    //             Swal.fire("Updated!", res.data.message, "success");
    //             setRestrictEmail("");
    //         } catch (err) {
    //             Swal.fire("Error", "Failed to restrict user", err);
    //         }
    //     }
    // };
    const restrictUser = async () => {
        if (!restrictEmail || restrictEmail === "Restrict User From Applying") {
            return Swal.fire({
                title: "No Email Selected",
                text: "Please select a valid user email to restrict.",
                icon: "info",
                iconColor: "#CAEB66",
                confirmButtonColor: "#03373D"
            });
        }

        if (restrictEmail.includes("admin")) {
            return Swal.fire({
                title: "Action Blocked",
                text: "Admin users cannot be restricted from submitting rider applications.",
                icon: "error",
                iconColor: "#CAEB66",
                confirmButtonColor: "#03373D"
            });
        }

        const confirm = await Swal.fire({
            title: "Restrict User?",
            text: `Do you want to block ${restrictEmail} from submitting rider applications?`,
            showCancelButton: true,
            confirmButtonText: "Yes, restrict",
            cancelButtonText: "Cancel",
            icon: "warning",
            iconColor: "#CAEB66",
            confirmButtonColor: "#03373D",
            cancelButtonColor: "#CAEB66"
        });

        if (confirm.isConfirmed) {
            try {
                await axiosSecure.patch(`/admin/restrict-user/${restrictEmail}`, {
                    restricted: true
                });
                Swal.fire("Updated!", `${restrictEmail} has been restricted from applying.`, "success");
                setRestrictEmail("");
            } catch (err) {
                Swal.fire("Error", "Failed to restrict user.", err);
            }
        }
    };

    // const unrestrictUser = async () => {
    //     if (!restrictEmail) return;
    //     const confirm = await Swal.fire({
    //         title: "Unrestrict User?",
    //         text: `Do you want to allow ${restrictEmail} to submit rider applications again?`,
    //         showCancelButton: true,
    //         confirmButtonText: "Yes, unrestrict",
    //         cancelButtonText: "Cancel",
    //         icon: "question",
    //         iconColor: "#CAEB66",
    //         confirmButtonColor: "#03373D",
    //         cancelButtonColor: "#CAEB66"
    //     });

    //     if (confirm.isConfirmed) {
    //         try {
    //             const res = await axiosSecure.patch(`/admin/restrict-user/${restrictEmail}`, {
    //                 restricted: false
    //             });
    //             Swal.fire("Updated!", res.data.message, "success");
    //             setRestrictEmail("");
    //         } catch (err) {
    //             Swal.fire("Error", "Failed to unrestrict user", err);
    //         }
    //     }
    // };
    const unrestrictUser = async () => {
        if (!restrictEmail || restrictEmail === "Restrict User From Applying") {
            return Swal.fire({
                title: "No Email Selected",
                text: "Please select a valid user email to unrestrict.",
                icon: "info",
                iconColor: "#CAEB66",
                confirmButtonColor: "#03373D"
            });
        }

        if (restrictEmail.includes("admin")) {
            return Swal.fire({
                title: "Action Blocked",
                text: "Admin users cannot be unrestricted — they are always allowed to apply.",
                icon: "error",
                iconColor: "#CAEB66",
                confirmButtonColor: "#03373D"
            });
        }

        const confirm = await Swal.fire({
            title: "Unrestrict User?",
            text: `Do you want to allow ${restrictEmail} to submit rider applications again?`,
            showCancelButton: true,
            confirmButtonText: "Yes, unrestrict",
            cancelButtonText: "Cancel",
            icon: "question",
            iconColor: "#CAEB66",
            confirmButtonColor: "#03373D",
            cancelButtonColor: "#CAEB66"
        });

        if (confirm.isConfirmed) {
            try {
                await axiosSecure.patch(`/admin/restrict-user/${restrictEmail}`, {
                    restricted: false
                });
                Swal.fire("Updated!", `${restrictEmail} has been unrestricted and can now apply.`, "success");
                setRestrictEmail("");
            } catch (err) {
                Swal.fire("Error", "Failed to unrestrict user.", err);
            }
        }
    };

    // function to view Restricted user from applying to be a rider
    const ViewRestrictUser = async () => {
        try {
            const res = await axiosSecure.get("/users"); // Assuming this returns all users
            const allUsers = res.data;

            const restrictedUsers = allUsers.filter((user) => user.riderFormRestricted);

            if (restrictedUsers.length === 0) {
                return Swal.fire({
                    title: "No Restricted Users",
                    text: "There are currently no users restricted from submitting rider applications.",
                    icon: "info",
                    iconColor: "#CAEB66",
                    confirmButtonColor: "#03373D"
                });
            }

            const emailList = restrictedUsers.map((user, i) => `${i + 1}. ${user.email}`).join("\n");

            Swal.fire({
                title: "Restricted Users",
                html: `<pre style="text-align:left; font-size:14px; color:#03373D;">${emailList}</pre>`,
                icon: "warning",
                iconColor: "#CAEB66",
                confirmButtonColor: "#03373D",
                background: "#F9FFF3"
            });
        } catch (err) {
            Swal.fire("Error", "Failed to fetch restricted users.", err);
        }
    };

    // function for Refreshing the page
    const RefreshPage = () => {
        window.location.reload();
    };


    //  it will delete the rider application data // 
    const handleDeleteApplication = async (email) => {
        // ✅ Find the latest application for this user
        const latestApp = [...applications]
            .filter((a) => a.email === email)
            .sort((a, b) => new Date(b.submittedAt) - new Date(a.submittedAt))[0];

        if (!latestApp) {
            return Swal.fire("Error", "Application not found.", "error");
        }

        if (latestApp.status !== "Rejected" && latestApp.status !== "Approved" && latestApp.status !== "Canceled") {
            return Swal.fire({
                title: "Blocked",
                text: "You must Approve or Reject the application before deleting it.",
                icon: "info",
                iconColor: "#CAEB66",
                confirmButtonColor: "#03373D",
                background: "#F9FFF3",
                color: "#03373D",
                confirmButtonText: "Okay"
            });
        }

        Swal.fire({
            title: "Delete Rider Application?",
            text: "This action will permanently remove the latest rider form for this user.",
            icon: "warning",
            iconColor: "#CAEB66",
            showCancelButton: true,
            confirmButtonColor: "#03373D",
            cancelButtonColor: "#CAEB66",
            confirmButtonText: "Yes, delete!",
            cancelButtonText: "Cancel"
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    await axiosSecure.delete(`/admin/rider-applications/${email}`);
                    const updated = await axiosSecure.get("/admin/rider-applications");
                    setApplications(updated.data);
                    Swal.fire({
                        title: "Deleted!",
                        text: "Rider application has been removed.",
                        icon: "success",
                        iconColor: "#CAEB66",
                        showConfirmButton: false,
                        confirmButtonColor: "#03373D",
                        background: "#F9FFF3",
                        color: "#03373D",
                        confirmButtonText: "Okay"
                    });
                } catch (err) {
                    Swal.fire("Error", "Failed to delete rider application.", err);
                }
            }
        });
    };


    if (loading) {
        return (
            <div className="flex justify-center items-center h-64">
                <span className="loading loading-spinner text-[#CAEB66] loading-xl"></span>
            </div>
        );
    }

    if (!loading && applications.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center h-64">
                <p className="text-2xl font-bold text-[#CAEB66] animate-bounce">
                    No Rider Applications Found 🛵
                </p>
            </div>
        );
    }

    return (
        <div className="lg:p-4">
            {/* heading section */}
            <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-[#03373D] mb-4">
                    Rider Applications <span className="text-xs">({applications.length})</span>
                </h2>

                {/* Refresh the page */}
                <button onClick={RefreshPage} className="px-3 py-2 bg-[#03373D] text-white hover:text-red-500 font-semibold rounded-lg hover:bg-[#1C4B50] cursor-pointer text-sm lg:text-base">
                    <LuRefreshCw className="text-white text-sm hover:text-[#CAEB66] cursor-pointer" />
                </button>
            </div>

            {/* Large screens: scrollable table */}
            <div className="hidden border border-gray-300 rounded-lg lg:block overflow-x-auto">
                <table className="min-w-[1450px] w-full border border-gray-300 rounded-lg overflow-hidden shadow-sm">
                    <thead className="bg-[#03373D] text-white">
                        <tr>
                            <th className="px-4 py-2 text-left">Photo</th>
                            <th className="px-4 py-2 text-left">Name</th>
                            <th className="px-4 py-2 text-left">Email</th>
                            <th className="px-4 py-2 text-left">Contact</th>
                            <th className="px-4 py-2 text-left">Age</th>
                            <th className="px-4 py-2 text-left">Gender</th>
                            <th className="px-4 py-2 text-left">Region</th>
                            <th className="px-4 py-2 text-left">District</th>
                            <th className="px-4 py-2 text-left">NID No</th>
                            <th className="px-4 py-2 text-left whitespace-nowrap overflow-hidden text-ellipsis">NID Link</th>
                            <th className="px-4 py-2 text-center">License</th>
                            <th className="px-4 py-2 text-center">Permitted Vehicle</th>
                            <th className="px-4 py-2 text-left whitespace-nowrap overflow-hidden text-ellipsis">License Expiry</th>
                            <th className="px-4 py-2 text-center">Status</th>
                            <th className="px-4 py-2 text-left">Submitted</th>
                            <th className="px-4 py-2 text-center">Feedback</th>
                            <th className="px-4 py-2 text-center">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {applications.map((app) => (
                            <tr key={app._id} className="border-b border-gray-300 hover:bg-[#CAEB6620]">
                                <td className="px-4 py-2"><img src={getUserPhoto(app.email)} alt="Rider" className="w-10 h-10 rounded-full" /></td>
                                <td className="px-2 py-2 whitespace-nowrap overflow-hidden text-ellipsis">{app.name ?? "N/A"}</td>
                                <td className="px-4 py-2">{app.email ?? "N/A"}</td>
                                <td className="px-4 py-2">{app.contact ?? "N/A"}</td>
                                <td className="px-4 py-2">{app.age ?? "N/A"}</td>
                                <td className="px-4 py-2">{app.gender ?? "N/A"}</td>
                                <td className="px-4 py-2">{app.region ?? "N/A"}</td>
                                <td className="px-4 py-2">{app.district ?? "N/A"}</td>
                                <td className="px-4 py-2">{app.nid ?? "N/A"}</td>
                                <td className="px-4 py-2 text-center">
                                    <a href={app.nidLink ?? "#"} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline ">View</a>
                                </td>
                                <td className="px-4 py-2 whitespace-nowrap overflow-hidden text-ellipsis">{app.hasLicense ?? "No"} {app.licenseType ? `(${app.licenseType})` : ''}</td>

                                <td className="px-4 py-2 whitespace-nowrap overflow-hidden text-ellipsis">{app.vehicleType ? `${app.vehicleType}` : `N/A`}</td>
                                <td className="px-4 py-2 whitespace-nowrap overflow-hidden text-ellipsis">
                                    {app.licenseExpiry ? dayjs(app.licenseExpiry).format("DD MMM YYYY") : 'N/A'}
                                </td>
                                <td className="px-4 py-2 font-semibold">{app.status ?? "Pending"}</td>
                                <td className="px-4 py-2 whitespace-nowrap overflow-hidden text-ellipsis">{dayjs(app.submittedAt).format("DD MMM YYYY")}</td>
                                <td className="px-4 py-2 whitespace-nowrap overflow-hidden text-ellipsis">{app.feedback ?? "No feedback yet"}</td>
                                <td className="px-4 py-2">
                                    <div className="flex gap-2">
                                        <button
                                            onClick={() => handleStatusChange(app.email, "Approved")}
                                            className="p-2 cursor-pointer rounded-full border border-green-500 text-green-500 hover:bg-[#CAEB6620]">
                                            <RxCheck size={18} />
                                        </button>
                                        <button
                                            onClick={() => handleStatusChange(app.email, "Rejected")}
                                            className="p-2 cursor-pointer rounded-full border border-red-500 text-red-600 hover:bg-red-100">
                                            <RxCross2 />
                                        </button>
                                        <button
                                            onClick={() => handleDeleteApplication(app.email)}
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
            <div className="lg:hidden flex flex-col gap-4">
                {applications.map((app) => (
                    <div key={app._id} className="p-4 border-l-8 rounded-xl border-[#CAEB66] shadow-sm bg-white">
                        <div className="flex justify-center mb-4">
                            <img src={getUserPhoto(app.email)} alt="Rider" className="w-20 h-20 rounded-full border-2 border-[#CAEB66] object-cover" />
                        </div>
                        {[
                            ["Name", app.name],
                            ["Email", app.email],
                            ["Contact", app.contact],
                            ["Age", app.age],
                            ["Gender", app.gender],
                            ["Region", app.region],
                            ["District", app.district],
                            ["NID", app.nid],
                            ["NID Link", <a href={app.nidLink ?? "#"} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">View</a>],
                            ["License", `${app.hasLicense ?? "No"} (${app.licenseType ?? "N/A"})`],
                            ["Vehicle", app.vehicleType],
                            ["Status", app.status],
                            ["Submitted", dayjs(app.submittedAt).format("DD MMM YYYY")],
                            ["Feedback", app.feedback ?? "No feedback yet"]
                        ].map(([label, value]) => (
                            <div key={label} className="mb-2">
                                <p className="font-bold text-[#03373D]">{label}:</p>
                                <p>{value ?? "N/A"}</p>
                            </div>
                        ))}
                        <div className="flex justify-end gap-3 mt-2">


                            <button
                                onClick={() => handleStatusChange(app.email, "Approved")}
                                className="flex text-sm font-semibold gap-1 items-center  text-green-600 hover:text-green-800"
                            >
                                <FaRegCheckCircle /> Approve
                            </button>

                            <button
                                onClick={() => handleStatusChange(app.email, "Rejected")}
                                className="flex text-sm font-semibold items-center gap-1 text-orange-600 hover:text-orange-800"
                            >
                                <FaBan /> Reject
                            </button>

                            <button
                                onClick={() => handleDeleteApplication(app.email)}
                                className="flex text-sm font-semibold items-center gap-1 text-red-600 hover:text-red-800"
                            >
                                <FaTrashAlt /> Delete
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {/* global */}
            <div className="mt-8 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                <div className="flex items-center gap-4">
                    <button onClick={togglePause} className={`px-4 py-2 bg-[#03373D] text-white rounded-lg cursor-pointer hover:bg-[#1C4B50] ${paused ? 'text-red-500' : ''}`}>
                        {paused ? "Resume Submissions" : "Pause Submissions"}
                    </button>
                    <p className={`px-1 md:hidden text-sm md:text-base mt-1 italic font-semibold ${paused ? "text-red-600" : "text-[#03373D]"}`}> Update: {paused ? 'Submission Closed' : 'Submission Open'}</p>
                </div>

                {/* Restrict Specific user from appling to be a rider */}
                <div className="flex flex-col md:flex-row items-center gap-2">
                    <div>
                        <select
                            value={restrictEmail}
                            onChange={(e) => setRestrictEmail(e.target.value)}
                            className="text-[#03373D] font-semibold px-3 py-2 border-b-4 rounded-lg border-[#CAEB66] cursor-pointer w-65 "
                        >
                            <option className="">Restrict User From Applying</option>
                            {users.map((user, index) => (
                                <option key={index} value={user.email} className="">
                                    {user.email}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="space-x-2">
                        {/* button to restrict user */}
                        <button onClick={restrictUser} className="px-3 py-2 bg-[#03373D] text-white hover:text-red-500 font-semibold rounded-lg hover:bg-[#1C4B50] cursor-pointer text-sm lg:text-base">
                            <MdBlock className="text-red-500 text-xl hover:text-red-600 cursor-pointer" />
                        </button>
                        {/* button to un-restrict user */}
                        <button
                            onClick={unrestrictUser}
                            className="px-3 py-2 bg-[#CAEB66] text-[#03373D] font-semibold rounded-lg hover:bg-[#E0F58A] cursor-pointer text-sm lg:text-base"
                        >
                            <MdLockOpen className="text-[#03373D] text-xl hover:text-[#1C4B50] cursor-pointer" />
                        </button>
                        {/* button to view restricted user */}
                        <button onClick={ViewRestrictUser} className="px-3 py-2 bg-[#03373D] text-white hover:text-red-500 font-semibold rounded-lg hover:bg-[#1C4B50] cursor-pointer text-sm lg:text-base">
                            <IoMdEye className="text-red-500 text-xl hover:text-red-600 cursor-pointer" />
                        </button>
                    </div>
                </div>
            </div>
            <p className={`px-1 hidden md:flex text-sm md:text-base mt-1 italic font-semibold ${paused ? "text-red-600" : "text-[#03373D]"}`}> Update: {paused ? 'Submission Closed' : 'Submission Open'}</p>



        </div>
    );
};

export default RiderApplication;