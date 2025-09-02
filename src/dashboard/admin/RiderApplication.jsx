// import React, { useEffect, useState } from "react";
// import useAxiosSecure from "../../hooks/useAxiosSecure";
// import dayjs from "dayjs";

// const RiderApplication = () => {
//   const axiosSecure = useAxiosSecure();
//   const [applications, setApplications] = useState([]);
//   const [users, setUsers] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const [appRes, userRes] = await Promise.all([
//           axiosSecure.get("/admin/rider-applications"),
//           axiosSecure.get("/users")
//         ]);
//         setApplications(appRes.data);
//         setUsers(userRes.data);
//       } catch (err) {
//         console.error("Failed to fetch rider applications:", err);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchData();
//   }, [axiosSecure]);

//   const getUserPhoto = (email) => {
//     const user = users.find((u) => u.email === email);
//     return user?.photoURL ?? "https://via.placeholder.com/80";
//   };

//   if (loading) {
//     return (
//       <div className="flex justify-center items-center h-64">
//         <span className="loading loading-spinner text-[#CAEB66] loading-xl"></span>
//       </div>
//     );
//   }

//   if (!loading && applications.length === 0) {
//     return (
//       <div className="flex flex-col items-center justify-center h-64">
//         <p className="text-2xl font-bold text-[#CAEB66] animate-bounce">
//           No Rider Applications Found 🛵
//         </p>
//       </div>
//     );
//   }

//   return (
//     <div className="lg:p-4">
//       <h2 className="text-2xl font-bold text-[#03373D] mb-4">
//         Rider Applications <span className="text-xs">({applications.length})</span>
//       </h2>

//       {/* Large screens: scrollable table */}
//       <div className="hidden lg:block overflow-x-auto">
//         <table className="min-w-[1200px] w-full border border-gray-300 rounded-lg overflow-hidden shadow-sm">
//           <thead className="bg-[#03373D] text-white">
//             <tr>
//               <th className="px-4 py-2 text-left">Photo</th>
//               <th className="px-4 py-2 text-left">Name</th>
//               <th className="px-4 py-2 text-left">Email</th>
//               <th className="px-4 py-2 text-left">Contact</th>
//               <th className="px-4 py-2 text-left">Age</th>
//               <th className="px-4 py-2 text-left">Gender</th>
//               <th className="px-4 py-2 text-left">Region</th>
//               <th className="px-4 py-2 text-left">District</th>
//               <th className="px-4 py-2 text-left">NID</th>
//               <th className="px-4 py-2 text-left">License</th>
//               <th className="px-4 py-2 text-left">Vehicle</th>
//               <th className="px-4 py-2 text-left">Status</th>
//               <th className="px-4 py-2 text-left">Submitted</th>
//               <th className="px-4 py-2 text-left">Feedback</th>
//             </tr>
//           </thead>
//           <tbody>
//             {applications.map((app) => (
//               <tr key={app._id} className="border-b border-gray-300 hover:bg-[#CAEB6620]">
//                 <td className="px-4 py-2">
//                   <img src={getUserPhoto(app.email)} alt="Rider" className="w-10 h-10 rounded-full" />
//                 </td>
//                 <td className="px-4 py-2">{app.name ?? "N/A"}</td>
//                 <td className="px-4 py-2">{app.email ?? "N/A"}</td>
//                 <td className="px-4 py-2">{app.contact ?? "N/A"}</td>
//                 <td className="px-4 py-2">{app.age ?? "N/A"}</td>
//                 <td className="px-4 py-2">{app.gender ?? "N/A"}</td>
//                 <td className="px-4 py-2">{app.region ?? "N/A"}</td>
//                 <td className="px-4 py-2">{app.district ?? "N/A"}</td>
//                 <td className="px-4 py-2">{app.nid ?? "N/A"}</td>
//                 <td className="px-4 py-2">{app.hasLicense ?? "No"} ({app.licenseType ?? "N/A"})</td>
//                 <td className="px-4 py-2">{app.vehicleType ?? "N/A"}</td>
//                 <td className="px-4 py-2 font-semibold">{app.status ?? "Pending"}</td>
//                 <td className="px-4 py-2">{dayjs(app.submittedAt).format("DD MMM YYYY")}</td>
//                 <td className="px-4 py-2">{app.feedback ?? "No feedback yet"}</td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>

//       {/* Small screens: card view */}
//       <div className="lg:hidden flex flex-col gap-4">
//         {applications.map((app) => (
//           <div key={app._id} className="p-4 border-l-8 rounded-xl border-[#CAEB66] shadow-sm bg-white">
//             <div className="flex justify-center mb-4">
//               <img
//                 src={getUserPhoto(app.email)}
//                 alt="Rider"
//                 className="w-20 h-20 rounded-full border-2 border-[#CAEB66] object-cover"
//               />
//             </div>
//             {[
//               ["Name", app.name],
//               ["Email", app.email],
//               ["Contact", app.contact],
//               ["Age", app.age],
//               ["Gender", app.gender],
//               ["Region", app.region],
//               ["District", app.district],
//               ["NID", app.nid],
//               ["License", `${app.hasLicense ?? "No"} (${app.licenseType ?? "N/A"})`],
//               ["Vehicle", app.vehicleType],
//               ["Status", app.status],
//               ["Submitted", dayjs(app.submittedAt).format("DD MMM YYYY")],
//               ["Feedback", app.feedback ?? "No feedback yet"]
//             ].map(([label, value]) => (
//               <div key={label} className="mb-2">
//                 <p className="font-bold text-[#03373D]">{label}:</p>
//                 <p>{value ?? "N/A"}</p>
//               </div>
//             ))}
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default RiderApplication;


import React, { useEffect, useState } from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import dayjs from "dayjs";
import Swal from "sweetalert2";
import { RxCheck, RxCross2 } from "react-icons/rx";

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

    const restrictUser = async () => {
        if (!restrictEmail) return;
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
                const res = await axiosSecure.patch(`/admin/restrict-user/${restrictEmail}`, {
                    restricted: true
                });
                Swal.fire("Updated!", res.data.message, "success");
                setRestrictEmail("");
            } catch (err) {
                Swal.fire("Error", "Failed to restrict user", err);
            }
        }
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
            <h2 className="text-2xl font-bold text-[#03373D] mb-4">
                Rider Applications <span className="text-xs">({applications.length})</span>
            </h2>

            {/* Large screens: scrollable table */}
            <div className="hidden lg:block overflow-x-auto">
                <table className="min-w-[1400px] w-full border border-gray-300 rounded-lg overflow-hidden shadow-sm">
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
                            <th className="px-4 py-2 text-left">NID</th>
                            <th className="px-4 py-2 text-left">NID Link</th>
                            <th className="px-4 py-2 text-left">License</th>
                            <th className="px-4 py-2 text-left">Vehicle</th>
                            <th className="px-4 py-2 text-left">Status</th>
                            <th className="px-4 py-2 text-left">Submitted</th>
                            <th className="px-4 py-2 text-left">Feedback</th>
                            <th className="px-4 py-2 text-left">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {applications.map((app) => (
                            <tr key={app._id} className="border-b border-gray-300 hover:bg-[#CAEB6620]">
                                <td className="px-4 py-2"><img src={getUserPhoto(app.email)} alt="Rider" className="w-10 h-10 rounded-full" /></td>
                                <td className="px-4 py-2">{app.name ?? "N/A"}</td>
                                <td className="px-4 py-2">{app.email ?? "N/A"}</td>
                                <td className="px-4 py-2">{app.contact ?? "N/A"}</td>
                                <td className="px-4 py-2">{app.age ?? "N/A"}</td>
                                <td className="px-4 py-2">{app.gender ?? "N/A"}</td>
                                <td className="px-4 py-2">{app.region ?? "N/A"}</td>
                                <td className="px-4 py-2">{app.district ?? "N/A"}</td>
                                <td className="px-4 py-2">{app.nid ?? "N/A"}</td>
                                <td className="px-4 py-2">
                                    <a href={app.nidLink ?? "#"} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">View</a>
                                </td>
                                <td className="px-4 py-2">{app.hasLicense ?? "No"} ({app.licenseType ?? "N/A"})</td>
                                <td className="px-4 py-2">{app.vehicleType ?? "N/A"}</td>
                                <td className="px-4 py-2 font-semibold">{app.status ?? "Pending"}</td>
                                <td className="px-4 py-2">{dayjs(app.submittedAt).format("DD MMM YYYY")}</td>
                                <td className="px-4 py-2">{app.feedback ?? "No feedback yet"}</td>
                                <td className="px-4 py-2">
                                    <div className="flex gap-2">
                                        <button onClick={() => handleStatusChange(app.email, "Approved")} className="px-2 py-1 bg-[#CAEB66] text-[#03373D50] hover:font-bold text-xl cursor-pointer  rounded hover:bg-[#A4C953]"><RxCheck /></button>
                                        <button onClick={() => handleStatusChange(app.email, "Rejected")} className="px-2 py-1 bg-[#03373D] text-[#CAEB66] cursor-pointer text-xl rounded hover:bg-red-700"><RxCross2 /></button>
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
                        <div className="flex justify-end gap-2 mt-2">
                            <button onClick={() => handleStatusChange(app.email, "Approved")} className="px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700">Approve</button>
                            <button onClick={() => handleStatusChange(app.email, "Rejected")} className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700">Reject</button>
                        </div>
                    </div>
                ))}
            </div>

            {/* global  */}
            <div className="mt-8 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                <div className="flex items-center gap-4">
                    <button onClick={togglePause} className="px-4 py-2 bg-[#03373D] text-white rounded hover:bg-[#022C2F]">
                        {paused ? "Resume Submissions" : "Pause Submissions"}
                    </button>
                </div>
                <div className="flex items-center gap-2">
                    <input
                        type="email"
                        value={restrictEmail}
                        onChange={(e) => setRestrictEmail(e.target.value)}
                        placeholder="Enter email to restrict"
                        className="px-3 py-2 border rounded w-64"
                    />
                    <button onClick={restrictUser} className="px-4 py-2 bg-orange-600 text-white rounded hover:bg-orange-700">
                        Restrict User
                    </button>
                </div>
            </div>



        </div>
    );
};

export default RiderApplication;