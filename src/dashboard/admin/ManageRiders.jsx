import React, { useEffect, useState } from 'react';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import RiderLotieAnimation from "../../assets/json/rider.json";
import Lottie from "lottie-react";
import { LuRefreshCw } from 'react-icons/lu';
import { FaBan, FaTrashAlt } from 'react-icons/fa';
import { MdAssignmentTurnedIn, MdModeEdit } from 'react-icons/md';
import { MdOutlineProductionQuantityLimits } from "react-icons/md";
import { RiMotorbikeFill } from "react-icons/ri";
import Swal from 'sweetalert2';
import { BsFillUnlockFill } from "react-icons/bs";
import withReactContent from "sweetalert2-react-content";
import { MdEdit } from "react-icons/md";
import { FaIdCard, FaBirthdayCake, FaPhone, FaMapMarkerAlt, FaCar } from "react-icons/fa";
import dayjs from 'dayjs';
import '../../index.css'

const ManageRiders = () => {
    const axiosSecure = useAxiosSecure();
    const [riders, setRiders] = useState([]);
    const [loading, setLoading] = useState(false);
    const [parcels, setParcels] = useState([]);
    const [selectedParcel, setSelectedParcel] = useState(null);
    const [assignToEmail, setAssignToEmail] = useState("");
    const [parcelStatusSummary, setParcelStatusSummary] = useState([]);
    const [selectedRiderEmail, setSelectedRiderEmail] = useState('');
    const [riderOverview, setRiderOverview] = useState(null);
    const [allRiderOverview, setAllRiderOverview] = useState([]);


    const fetchRiders = async () => {
        setLoading(true);
        try {
            const res = await axiosSecure.get("/admin/active-riders");
            setRiders(res.data);
        } catch (err) {
            console.error("Error fetching riders:", err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchRiders();
    }, []);

    const handleRefresh = () => {
        fetchRiders();
        window.location.reload();
    };

    const MySwal = withReactContent(Swal);

    const handleEditRider = (rider) => {
        // Create a copy of rider data for editing
        const tempData = { ...rider };

        MySwal.fire({
            title: <span>Edit Rider Details</span>,
            html: (
                <div className="grid gap-3 text-left">
                    {[
                        { label: 'Name', value: 'name' },
                        { label: 'Email', value: 'email', type: 'email' },
                        { label: 'Age', value: 'age', type: 'number' },
                        { label: 'Gender', value: 'gender' },
                        { label: 'DOB', value: 'dob', type: 'date' },
                        { label: 'NID', value: 'nid' },
                        { label: 'NID Link', value: 'nidLink' },
                        { label: 'Contact', value: 'contact' },
                        { label: 'Region', value: 'region' },
                        { label: 'District', value: 'district' },
                        { label: 'Has License', value: 'hasLicense' },
                        { label: 'License Type', value: 'licenseType' },
                        { label: 'License Expiry', value: 'licenseExpiry', type: 'date' },
                        { label: 'Vehicle Type', value: 'vehicleType' },
                        { label: 'Photo URL', value: 'photoURL' },
                        { label: 'Rider Status', value: 'riderStatus', type: 'select', options: ['Active', 'Restricted', 'Inactive', 'Resigned'] },
                        { label: 'Role', value: 'role', type: 'select', options: ['rider', 'merchant', 'admin'] },
                        { label: 'Rider Email', value: 'RiderEmail' },
                        { label: 'Submitted At', value: 'submittedAt', type: 'datetime-local' },
                        { label: 'First Submitted At', value: 'firstSubmittedAt', type: 'datetime-local' },
                        { label: 'Rider Application Approved At', value: 'RiderApplicationApproveAt', type: 'datetime-local' },
                        { label: 'Feedback', value: 'feedback' },
                        { label: 'Is Rider Restricted', value: 'isRiderRestricted', type: 'checkbox' },
                        { label: 'Assigned Parcels', value: 'assignedParcelsForDelivery', type: 'number' },
                        { label: 'Pending Parcels', value: 'pendingParcelsToDelivery', type: 'number' },
                        { label: 'Completed Parcels', value: 'completedParcelDelivery', type: 'number' },
                    ].map(field => (
                        <div key={field.value} className="flex flex-col">
                            <label className="text-[#03373D] font-semibold">{field.label}</label>
                            {field.type === 'select' ? (
                                <select
                                    className="border rounded p-1 w-full text-[#03373D]"
                                    defaultValue={tempData[field.value]}
                                    onChange={(e) => tempData[field.value] = e.target.value}
                                >
                                    {field.options.map(opt => <option key={opt} value={opt}>{opt}</option>)}
                                </select>
                            ) : field.type === 'checkbox' ? (
                                <input
                                    type="checkbox"
                                    checked={tempData[field.value]}
                                    onChange={(e) => tempData[field.value] = e.target.checked}
                                    className="w-5 h-5 accent-[#BAEC66]"
                                />
                            ) : (
                                <input
                                    type={field.type || 'text'}
                                    defaultValue={tempData[field.value]}
                                    onChange={(e) => tempData[field.value] = e.target.value}
                                    className="border rounded p-1 w-full text-[#03373D]"
                                />
                            )}
                        </div>
                    ))}
                </div>
            ),
            showCancelButton: true,
            confirmButtonText: 'Save Changes',
            confirmButtonColor: '#03373D',
            cancelButtonText: 'Cancel',
            cancelButtonColor: '#BAEC66',
            textColor: '#03373D',
            width: '600px',
            didOpen: () => {
                // Optional: focus on first input
            },
            preConfirm: async () => {
                try {

                    const res = await axiosSecure.patch(`/admin/active-riders/${rider.email}`, tempData);
                    return res.data;
                } catch (err) {
                    Swal.showValidationMessage(`Request failed: ${err}`);
                }
            }
        }).then((result) => {
            if (result.isConfirmed) {
                Swal.fire({
                    title: 'Success',
                    text: 'Rider details updated successfully!',
                    icon: 'success',
                    iconColor: '#CAEB66'
                });
                // Optional: refresh the list
                fetchRiders(); // assuming you have this function in your component
            }
        });
    };

    // fuunction for changing roles
    const handleRiderRoleChange = async (email, newRole) => {
        Swal.fire({
            title: "Change Rider Role?",
            text: `Do you want to change this rider's role to "${newRole}"?`,
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
                    const res = await axiosSecure.patch(`/active-riders/${email}/role`, { role: newRole });
                    setRiders(riders.map(r => r.email === email ? { ...r, role: newRole } : r));
                    Swal.fire("Updated!", res.data.message, "success");
                } catch (err) {
                    console.error("Error updating rider role:", err);
                    Swal.fire("Error", "Failed to update rider role.", "error");
                }
            }
        });
    };

    //function for restricting rider 
    const handleRiderRestriction = async (email, isRiderRestricted, role) => {
        if (role === "admin") {
            return Swal.fire("Blocked", "Admin users cannot be restricted.", "info");
        }

        const action = isRiderRestricted ? "unrestrict" : "restrict";
        const actionText = isRiderRestricted ? "Unrestrict" : "Restrict";

        Swal.fire({
            title: `${actionText} Rider?`,
            text: `Do you want to ${action} this rider?`,
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
                    const res = await axiosSecure.patch(`/admin/restrict-rider/${email}`, { action });

                    // ✅ Update local state
                    setRiders(riders.map(r =>
                        r.email === email
                            ? { ...r, isRiderRestricted: action === "restrict", riderStatus: action === "restrict" ? "Restricted" : "Active" }
                            : r
                    ));

                    Swal.fire("Updated!", res.data.message, "success");
                } catch (err) {
                    console.error("Restriction update error:", err);
                    Swal.fire("Error", "Failed to update rider restriction.", "error");
                }
            }
        });
    };

    //function for deleting the active_riders collection data (user wise)
    const handleRiderDelete = async (email, role) => {
        if (role === "admin") {
            return Swal.fire("Blocked", "Admin users cannot be deleted.", "info");
        }

        Swal.fire({
            title: "Delete Rider?",
            text: "This action will permanently remove the rider from active_riders. It cannot be undone.",
            icon: "warning",
            iconColor: "#CAEB66",
            showCancelButton: true,
            confirmButtonColor: "#03373D",
            cancelButtonColor: "#CAEB66",
            confirmButtonText: "Yes, delete!",
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    const res = await axiosSecure.delete(`/admin/active-riders/${email}`);

                    // ✅ Update local state (remove from riders list)
                    setRiders(riders.filter((r) => r.email !== email));

                    Swal.fire("Deleted!", res.data.message, "success");
                } catch (err) {
                    console.error("Error deleting rider:", err);
                    Swal.fire("Error", "Failed to delete rider.", "error");
                }
            }
        });
    };

    // ***** functions of assigned parcels section ***** // 
    const fetchAssignableParcels = async () => {
        try {
            const res = await axiosSecure.get("/admin/parcels-to-assign");
            setParcels(res.data);
        } catch (err) {
            console.error("Error fetching parcels:", err);
        }
    };

    useEffect(() => {
        fetchAssignableParcels();
    }, []);

    const openAssignModal = (parcel) => {
        const matchedRiders = riders.filter(r =>
            r.region?.toLowerCase() === parcel.receiverRegion?.toLowerCase()
        );

        if (matchedRiders.length === 0) {
            Swal.fire({
                icon: "warning",
                iconColor: '#CAEB66',
                title: "No Riders Available",
                text: `No riders found for region "${parcel.receiverRegion}". Please onboard riders in this region first.`,
                confirmButtonColor: '#03373D'
            });
            return;
        }
        setSelectedParcel(parcel);
        setAssignToEmail("");
    };

    const handleAssign = async () => {

        if (selectedParcel.status !== "In Transit") {
            Swal.fire({
                icon: "info",
                iconColor: '#CAEB66',
                title: "Parcel Not Ready",
                text: "This parcel has not arrived at the local hub yet. Please wait until its status is 'In Transit' before assigning a rider.",
                confirmButtonColor: '#03373D'
            });
            return;
        }

        try {
            await axiosSecure.patch(`/admin/assign-parcel/${selectedParcel._id}`, {
                riderEmail: assignToEmail,
                riderName: riders.find(r => r.email === assignToEmail)?.name || ""
            });
            Swal.fire("Assigned!", "Parcel successfully assigned to rider.", "success");
            setSelectedParcel(null);
            fetchAssignableParcels();
            fetchRiders(); // update rider stats
        } catch (err) {
            console.error("Error assigning parcel:", err);
            Swal.fire("Error", "Failed to assign parcel.", "error");
        }
    };

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
                fetchAssignableParcels();
                Swal.fire("Updated!", "Parcel status has been changed.", "success");
            } catch (err) {
                console.error("Error updating status:", err);
                Swal.fire("Error", "Failed to update status.", "error");
            }
        }
    };

    const fetchParcelStatusSummary = async () => {
        try {
            const res = await axiosSecure.get("/admin/parcel-status-summary");
            setParcelStatusSummary(res.data);
        } catch (err) {
            console.error("Error fetching parcel status summary:", err);
        }
    };

    useEffect(() => {
        fetchParcelStatusSummary();
    }, []);

    const fetchRiderOverview = async () => {
        if (!selectedRiderEmail) return;
        try {
            const res = await axiosSecure.get(`/admin/rider-parcel-overview?email=${selectedRiderEmail}`);
            setRiderOverview(res.data);
        } catch (err) {
            console.error("Error fetching rider overview:", err);
            if (err.response?.status === 404) {
                Swal.fire({
                    icon: 'error',
                    iconColor: '#CAEB66',
                    title: 'Rider Not Found',
                    text: `${selectedRiderEmail} is not registered. Please insert a valid email.`,
                });
            } else {
                Swal.fire({
                    icon: 'error',
                    iconColor: '#CAEB66',
                    title: 'Oops...',
                    text: 'Something went wrong. Please try again later.',
                });
            }
        }
    };

    const fetchAllRiderOverview = async () => {
        try {
            const res = await axiosSecure.get('/admin/all-rider-parcel-overview');
            setAllRiderOverview(res.data);
        } catch (err) {
            console.error("Error fetching all rider overview:", err);
        }
    };

    const handleClearRiderOverview = () => {
        setSelectedRiderEmail('');
        setRiderOverview(null);
        setAllRiderOverview([]);
    };


    if (loading) {
        return (
            <div className="flex gap-1 justify-center items-center h-64">
                <span className="loading loading-spinner text-[#CAEB66] loading-xl"></span><span className='font-bold text-lg text-[#03373D]'>Loading Riders Data... </span>
            </div>
        );
    }


    return (
        <>
            {/* Part 1: Page Heading Section */}
            <div className="flex flex-col md:flex-row items-center justify-between mb-6">
                <div className="flex items-center gap-0">
                    <h2 className="text-xl md:text-3xl font-bold text-[#03373D]">
                        Rider Management
                    </h2>
                    <div className="w-20 h-20 ">
                        <Lottie animationData={RiderLotieAnimation} loop={true} />
                    </div>
                </div>
                <div className='flex items-center gap-1'>
                    <button
                        onClick={() => {
                            const section = document.getElementById("assignParcels");
                            if (section) {
                                section.scrollIntoView({ behavior: "smooth" });
                            }
                        }}
                        className="px-3 py-2 bg-[#03373D] text-white hover:text-red-500 font-semibold rounded-lg hover:bg-[#1C4B50] cursor-pointer text-sm lg:text-base">
                        <MdAssignmentTurnedIn className="text-white text-sm hover:text-[#CAEB66] cursor-pointer" />
                    </button>
                    <button
                        onClick={() => {
                            const section = document.getElementById("parcelsOverview");
                            if (section) {
                                section.scrollIntoView({ behavior: "smooth" });
                            }
                        }}
                        className="px-3 py-2 bg-[#03373D] text-white hover:text-red-500 font-semibold rounded-lg hover:bg-[#1C4B50] cursor-pointer text-sm lg:text-base">
                        <MdOutlineProductionQuantityLimits className="text-white text-sm hover:text-[#CAEB66] cursor-pointer" />
                    </button>
                    <button
                        onClick={() => {
                            const section = document.getElementById("ridersOverview");
                            if (section) {
                                section.scrollIntoView({ behavior: "smooth" });
                            }
                        }}
                        className="px-3 py-2 bg-[#03373D] text-white hover:text-red-500 font-semibold rounded-lg hover:bg-[#1C4B50] cursor-pointer text-sm lg:text-base">
                        <RiMotorbikeFill className="text-white text-sm hover:text-[#CAEB66] cursor-pointer" />
                    </button>
                    <button
                        onClick={handleRefresh}
                        className="px-3 py-2 bg-[#03373D] text-white hover:text-red-500 font-semibold rounded-lg hover:bg-[#1C4B50] cursor-pointer text-sm lg:text-base">
                        <LuRefreshCw className="text-white text-sm hover:text-[#CAEB66] cursor-pointer" />
                    </button>
                </div>
            </div>


            {/* part 2:  Activer RIder List showed with all theree actions buttons  */}
            <section>
                {/* use proper heading for this section */}
                <h3 className="text-xl font-bold text-[#03373D] mb-4">👥 Active Riders <span className="text-sm font-medium">({riders.length})</span></h3>


                {/* for larger screen table deisgn  */}
                <div className="hidden lg:block border border-gray-300 rounded-lg overflow-x-auto">
                    <table className="min-w-[1200px] w-full border border-gray-300 rounded-lg overflow-hidden shadow-sm">
                        <thead className="bg-[#03373D] text-white">
                            <tr>
                                <th className="px-4 py-2 text-center">Photo</th>
                                <th className="px-4 py-2 text-center">Name</th>
                                <th className="px-4 py-2 text-center">Email</th>
                                <th className="px-4 py-2 text-center">Age</th>
                                <th className="px-4 py-2 text-center">Gender</th>
                                <th className="px-4 py-2 text-center">Region</th>
                                <th className="px-4 py-2 text-center">District</th>
                                <th className="px-4 py-2 text-center">License</th>
                                <th className="px-4 py-2 text-center">Vehicle</th>
                                <th className="px-4 py-2 text-center">Status</th>
                                <th className="px-4 py-2 text-center">Rider Email</th>
                                <th className="px-4 py-2 text-center">Assigned</th>
                                <th className="px-4 py-2 text-center">Pending</th>
                                <th className="px-4 py-2 text-center">Completed</th>
                                <th className="px-4 py-2 text-center">Role</th>
                                <th className="px-4 py-2 text-center">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {riders.map((rider) => (
                                <tr key={rider._id}
                                    className={`border-b border-gray-300 hover:bg-[#CAEB6620]
                                ${rider.isRiderRestricted ? 'text-red-500' : ''}
                                `}>
                                    <td className="px-4 py-2">
                                        <img src={rider.photoURL} alt="User" className="w-13 h-13 rounded-full" />
                                    </td>
                                    <td className="px-4 py-2 text-center whitespace-nowrap overflow-hidden text-ellipsis">{rider.name}</td>
                                    <td className="px-4 py-2 text-center">{rider.email}</td>
                                    <td className="px-4 py-2 text-center">{rider.age}</td>
                                    <td className="px-4 py-2 text-center">{rider.gender}</td>
                                    <td className="px-4 py-2 text-center">{rider.region}</td>
                                    <td className="px-4 py-2 text-center">{rider.district}</td>
                                    <td className="px-4 py-2 text-center whitespace-nowrap overflow-hidden text-ellipsis">{rider.licenseType}</td>
                                    <td className="px-4 py-2 text-center whitespace-nowrap overflow-hidden text-ellipsis">{rider.vehicleType}</td>
                                    <td className="px-4 py-2 text-center">{rider.riderStatus}</td>
                                    <td className="px-4 py-2 text-center whitespace-nowrap overflow-hidden text-ellipsis">{rider.RiderEmail}</td>
                                    <td className="px-4 py-2 text-center">{rider.assignedParcelsForDelivery ?? 0}</td>
                                    <td className="px-4 py-2 text-center">{rider.pendingParcelsToDelivery ?? 0}</td>
                                    <td className="px-4 py-2 text-center">{rider.completedParcelDelivery ?? 0}</td>
                                    <td className="px-4 py-2 text-center">
                                        <select
                                            value={rider.role}
                                            onChange={(e) => handleRiderRoleChange(rider.email, e.target.value)}
                                            className="bg-transparent font-bold cursor-pointer rounded px-2 py-1"
                                        >
                                            <option value="merchant">Merchant</option>
                                            <option value="rider">Rider</option>
                                        </select>
                                    </td>
                                    <td className="px-4 py-2 text-center">
                                        <div className="flex gap-2 justify-center">
                                            <button
                                                onClick={() => handleEditRider(rider)}
                                                className="px-2 cursor-pointer py-2 border-1 border-[#03373D] text-[#03373D] rounded-full hover:bg-blue-100">
                                                <MdModeEdit />
                                            </button>
                                            <button
                                                onClick={() => handleRiderRestriction(rider.email, rider.isRiderRestricted, rider.role)}
                                                className="p-2 cursor-pointer rounded-full border text-[#03373D] hover:bg-[#CAEB6650]"
                                            >
                                                {rider.isRiderRestricted ? <BsFillUnlockFill /> : <FaBan />}
                                            </button>
                                            <button
                                                onClick={() => handleRiderDelete(rider.email, rider.role)}
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


                {/* For smnaller screen card design */}
                <div className="lg:hidden flex flex-col gap-4">
                    {riders.map((rider) => (
                        <div key={rider._id}
                            className={`p-4 border-l-8 rounded-xl border-[#CAEB66] shadow-sm bg-white space-y-2
                        ${rider.isRiderRestricted ? "text-red-500 border-red-500" : ""}
                        `}>
                            <div className="flex justify-center mb-4">
                                <img
                                    src={rider.photoURL}
                                    alt="User"
                                    className="w-18 h-18 rounded-full border-2 border-[#CAEB66] object-cover"
                                />
                            </div>
                            <p className="font-bold text-[#03373D] mb-1">{rider.name} ({rider.email})</p>
                            <p><span className="font-semibold">Age:</span> {rider.age}</p>
                            <p><span className="font-semibold">Gender:</span> {rider.gender}</p>
                            <p><span className="font-semibold">Region:</span> {rider.region}</p>
                            <p><span className="font-semibold">District:</span> {rider.district}</p>
                            <p><span className="font-semibold">License:</span> {rider.licenseType}</p>
                            <p><span className="font-semibold">Vehicle:</span> {rider.vehicleType}</p>
                            <p><span className="font-semibold">Status:</span> {rider.riderStatus}</p>
                            <p><span className="font-semibold">Rider Email:</span> {rider.RiderEmail}</p>
                            <p><span className="font-semibold">Assigned:</span> {rider.assignedParcelsForDelivery ?? 0}</p>
                            <p><span className="font-semibold">Pending:</span> {rider.pendingParcelsToDelivery ?? 0}</p>
                            <p><span className="font-semibold">Completed:</span> {rider.completedParcelDelivery ?? 0}</p>

                            <div className="mb-2 flex justify-between items-center">
                                <p className="font-semibold text-[#03373D]">Role:</p>
                                <select
                                    value={rider.role}
                                    onChange={(e) => handleRiderRoleChange(rider.email, e.target.value)}
                                    className="bg-transparent font-bold rounded px-2 py-1"
                                >
                                    <option value="merchant">Merchant</option>
                                    <option value="rider">Rider</option>
                                </select>
                            </div>
                            <div className="flex justify-start gap-3 mt-7">
                                <button
                                    onClick={() => handleEditRider(rider)}
                                    className="px-2 cursor-pointer py-2 border-1 border-[#03373D] text-[#03373D] rounded-full hover:bg-blue-100">
                                    <MdModeEdit />
                                </button>
                                <button
                                    onClick={() => handleRiderRestriction(rider.email, rider.isRiderRestricted, rider.role)}
                                    className="p-2 cursor-pointer rounded-full border text-[#03373D] hover:bg-[#CAEB6650]"
                                >
                                    {rider.isRiderRestricted ? <BsFillUnlockFill /> : <FaBan />}
                                </button>
                                <button
                                    onClick={() => handleRiderDelete(rider.email, rider.role)}
                                    className="p-2 cursor-pointer rounded-full border border-red-500 text-red-600 hover:bg-red-100"
                                >
                                    <FaTrashAlt />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>

            </section>

            {/* part 3:  assigning parcels to Activer RIders  */}
            <section id='assignParcels' className='mt-10 border-t-1 border-gray-400 border-dashed pt-10'>
                {/*  heading for this section */}
                <h3 className="text-xl font-bold text-[#03373D] mb-4">📦 Assign Parcels to Riders</h3>

                {/* larger screen table deisgn: showed all parcel with statys   */}
                <div className="hidden lg:block border border-gray-300 rounded-lg overflow-x-auto">
                    <table className="min-w-[1200px] w-full">
                        <thead className="bg-[#03373D] text-white ">
                            <tr>
                                <th className="px-4 py-2 text-center">Tracking ID</th>
                                <th className="px-4 py-2 text-center whitespace-nowrap overflow-hidden text-ellipsis">Created Date</th>
                                <th className="px-4 py-2 text-center ">Created By</th>
                                <th className="px-4 py-2 text-center whitespace-nowrap overflow-hidden text-ellipsis">Receiver Region</th>
                                <th className="px-4 py-2 text-center whitespace-nowrap overflow-hidden text-ellipsis">Receiver Address</th>
                                <th className="px-4 py-2 text-center">Status</th>
                                <th className="px-4 py-2 text-center">Fare</th>
                                <th className="px-4 py-2 text-center">Assign</th>
                                <th className="px-4 py-2 text-center whitespace-nowrap overflow-hidden text-ellipsis">Assigned Rider</th>
                            </tr>
                        </thead>
                        <tbody>
                            {parcels.map((parcel) => (
                                <tr key={parcel._id} className="border-b border-gray-300 hover:bg-[#CAEB6620]">
                                    <td className="text-center px-4 py-2 whitespace-nowrap overflow-hidden text-ellipsis">{parcel.trackingId}</td>
                                    <td className="text-center px-4 py-2 whitespace-nowrap overflow-hidden text-ellipsis">{dayjs(parcel.createdAt).format("DD MMM YYYY")}</td>
                                    <td className="text-center px-4 py-2">{parcel.createdBy.name} <br /> {parcel.createdBy.email}</td>
                                    <td className="text-center px-4 py-2 whitespace-nowrap overflow-hidden text-ellipsis">{parcel.receiverRegion}</td>
                                    <td className=" px-4 py-2 whitespace-nowrap overflow-hidden text-ellipsis">{parcel.receiverAddress}. {parcel.receiverWarehouse}</td>
                                    <td className="text-center px-4 py-2  whitespace-nowrap overflow-hidden text-ellipsis">
                                        <select
                                            value={parcel.status}
                                            onChange={(e) => handleStatusChange(parcel._id, e.target.value)}
                                            className="px-2 py-1 cursor-pointer border rounded-md bg-white"
                                        >
                                            {["Pending", "Picked Up", "In Transit", "Out for Delivery", "Delivered"].map((status) => (
                                                <option key={status} value={status}>{status}</option>
                                            ))}
                                        </select>
                                    </td>

                                    <td className="text-center px-4 py-2 whitespace-nowrap overflow-hidden text-ellipsis">{parcel.fare} Tk. </td>
                                    <td className="px-4 py-2 text-center">
                                        <button
                                            disabled={parcel.isAssigned === true}
                                            onClick={() => openAssignModal(parcel)}
                                            className={`px-3 py-1 text-sm font-semibold border border-green-500  rounded-md 
                                        ${parcel.isAssigned ? 'cursor-not-allowed bg-[#BAEC66] text-[#03373D]' : 'cursor-pointer text-green-600 hover:bg-green-100'}
                                        `}
                                        >
                                            {parcel.isAssigned ? 'Assigned' : 'Assign'}
                                        </button>
                                    </td>

                                    <td className="px-4 py-2 text-center">
                                        {
                                            parcel.assignedTo ?
                                                <>
                                                    {parcel.assignedTo.name}
                                                </>
                                                :
                                                '-'
                                        }
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* For smnaller screen card design */}
                <div className="lg:hidden flex flex-col gap-4">
                    {parcels.map((parcel) => (
                        <div key={parcel._id} className="p-4 border-l-8 rounded-xl border-[#CAEB66] shadow-sm bg-white">
                            <p className="font-bold text-[#03373D] mb-1">Tracking ID: {parcel.trackingId}</p>
                            <p>Created: {dayjs(parcel.createdAt).format("DD MMM YYYY")}</p>
                            <p>Created By: {parcel.createdBy?.name} ({parcel.createdBy?.email})</p>
                            <p>Receiver Region: {parcel.receiverRegion}</p>
                            <p>Receiver Address: {parcel.receiverAddress}, {parcel.receiverWarehouse}</p>
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

                            <p>Fare: ৳{parcel.fare}</p>
                            <div className="flex justify-end mt-2">
                                <button
                                    disabled={parcel.isAssigned === true}
                                    onClick={() => openAssignModal(parcel)}
                                    className={`px-3 py-2 text-sm font-semibold   rounded-md 
                                        ${parcel.isAssigned ? 'cursor-not-allowed bg-[#BAEC66] text-[#03373D]' : 'cursor-pointer text-green-600 hover:bg-green-100 border border-green-500'}
                                        `}
                                >
                                    {parcel.isAssigned ? 'Assigned' : 'Assign'}
                                </button>
                            </div>
                            <p className='mt-2'>Assigned Rider:                                         {
                                parcel.assignedTo ?
                                    <span className='text-[#03373D] font-bold italic'>
                                        {parcel.assignedTo.name}
                                    </span>
                                    :
                                    '-'
                            }</p>
                        </div>
                    ))}
                </div>

                <div></div>
            </section>


            {/* part 4: Parcels overview section    */}
            <section id='parcelsOverview' className='mt-10 border-t-1 border-gray-400 border-dashed pt-10'>
                <h2 className="text-xl font-bold text-[#03373D] mb-6">📊 Parcels Summary</h2>
                {/* chart pie  */}
                <div className="grid lg:grid-cols-4 gap-6 mb-8">
                    {parcelStatusSummary.map((item) => (
                        <div key={item._id} className="p-4 bg-white rounded-lg shadow-md border-l-8 border-[#CAEB66]">
                            <h4 className="text-lg font-bold text-[#03373D]">{item._id}</h4>
                            <p className="text-2xl font-semibold">{item.count}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* part 5: rider overview  section */}
            <section id='ridersOverview' className='mt-10 border-t-1 border-gray-400 border-dashed pt-10 mb-10' >
                <div className=" space-y-6">
                    <h3 className="text-xl font-bold text-[#03373D] mb-4">🚴 Rider's Overview</h3>
                    <div className="flex flex-col md:flex-row items-center gap-4 mb-4">
                        <input
                            type="email"
                            placeholder="Enter rider email"
                            value={selectedRiderEmail}
                            onChange={(e) => setSelectedRiderEmail(e.target.value)}
                            className="px-4 py-2 border rounded-md w-full md:w-1/2"
                        />
                        <div className='flex flex-col md:flex-row items-center gap-2'>
                            <div className='flex items-center gap-2'>
                                <button onClick={fetchRiderOverview} className="px-4 py-2 bg-[#03373D] text-white font-semibold rounded-md hover:bg-[#1C4B50]">
                                    Show Overview
                                </button>
                                <button onClick={handleClearRiderOverview} className="px-4 py-2 bg-[#03373D] text-white font-semibold rounded-md hover:bg-[#1C4B50]">
                                    Clear All
                                </button>
                            </div>
                            <button onClick={fetchAllRiderOverview} className="px-4 py-2 bg-[#CAEB66] text-[#03373D] font-semibold rounded-md hover:bg-[#d9f27c]">
                                Show Overview of All Riders
                            </button>
                        </div>
                    </div>

                    {riderOverview && (
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div className="bg-white border-l-8 border-[#CAEB66] p-4 rounded-lg shadow-sm">
                                <p className="font-bold text-[#03373D]">Assigned Parcels</p>
                                <p className="text-2xl font-extrabold">{riderOverview.assigned}</p>
                            </div>
                            <div className="bg-white border-l-8 border-red-500 p-4 rounded-lg shadow-sm">
                                <p className="font-bold text-[#03373D]">Pending</p>
                                <p className="text-2xl font-extrabold">{riderOverview.pending}</p>
                            </div>
                            <div className="bg-white border-l-8 border-green-500 p-4 rounded-lg shadow-sm">
                                <p className="font-bold text-[#03373D]">Delivered</p>
                                <p className="text-2xl font-extrabold">{riderOverview.delivered}</p>
                            </div>
                        </div>
                    )}

                    {allRiderOverview.length > 0 && (
                        <div className="mt-6 space-y-4">
                            <h3 className="text-xl font-bold text-[#03373D]">📊 All Riders Overview</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                {allRiderOverview.map((rider) => (
                                    <div key={rider.email} className="bg-white border-l-8 border-[#CAEB66] p-4 rounded-lg shadow-sm">
                                        <p className="font-bold text-[#03373D] mb-1">{rider.name} ({rider.email})</p>
                                        <p>Region: <span className="font-bold">{rider.region || "—"}</span></p>
                                        <p>Assigned: <span className="font-bold">{rider.assigned}</span></p>
                                        <p>Pending: <span className="text-red-600 font-bold">{rider.pending}</span></p>
                                        <p>Delivered: <span className="text-green-600 font-bold">{rider.delivered}</span></p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>



            </section>

            {/* all be necessary modal can be done here bellow if needed  */}
            {/* modal for assigning parcels */}
            {selectedParcel && (
                <div className="fixed inset-0  backdrop-blur-xs bg-opacity-40 flex items-center justify-center z-50">
                    <div className="bg-[#03373D] p-6 rounded-xl text-white md:w-full max-w-md shadow-lg">
                        <h3 className="text-lg font-bold text-white mb-4">Assign Parcel</h3>
                        <p className="mb-2">Tracking ID: <strong>{selectedParcel.trackingId}</strong></p>
                        <label className="block mb-4">
                            <span className="text-sm font-semibold text-[#03373D]">Select Rider</span>

                            <select
                                value={assignToEmail}
                                onChange={(e) => setAssignToEmail(e.target.value)}
                                className="w-full px-3 py-2 border bg-[#03373D] text-[#CAEB66] cursor-pointer rounded-md mt-1"
                            >
                                <option value="" disabled>-- Select Rider --</option>
                                {riders
                                    .filter(r => r.region?.toLowerCase() === selectedParcel.receiverRegion?.toLowerCase())
                                    .map(r => (
                                        <option key={r.email} value={r.email} >
                                            {r.name} ({r.district}, {r.region})
                                        </option>
                                    ))}
                            </select>

                            {riders.filter(r => r.region?.toLowerCase() === selectedParcel.receiverRegion?.toLowerCase()).length === 0 && (
                                <p className="text-sm text-red-500 mt-2">No available riders in this region.</p>
                            )}

                        </label>

                        <div className="flex justify-end gap-3">
                            <button
                                onClick={() => setSelectedParcel(null)}
                                className="px-4 py-2 border-1 border-[#BAEC66] border-dashed bg-[#03373D] cursor-pointer text-white rounded-md hover:bg-[#CAEB66] hover:text-[#03373D] "
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleAssign}
                                disabled={!assignToEmail}
                                className="px-4 py-2 bg-[#CAEB66] cursor-pointer text-[#03373D] font-bold rounded-md hover:bg-[#d9f27c]"
                            >
                                Confirm Assign
                            </button>
                        </div>
                    </div>
                </div>
            )}

        </>
    );
};

export default ManageRiders;