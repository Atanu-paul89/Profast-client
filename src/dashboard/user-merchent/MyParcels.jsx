import React, { useEffect, useState } from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import dayjs from "dayjs";
import useAuth from "../../hooks/useAuth";
import Swal from "sweetalert2";
import { FaTrashAlt, FaBan } from "react-icons/fa";
import toast from "react-hot-toast";

const MyParcels = () => {
  const axiosSecure = useAxiosSecure();
  const [parcels, setParcels] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    if (!user?.email) return;

    const fetchParcels = async () => {
      try {
        const res = await axiosSecure.get(`/parcels?email=${user.email}`);
        setParcels(res.data);
      } catch (error) {
        console.error("Failed to fetch parcels:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchParcels();
  }, [axiosSecure, user?.email]);

  const statusColor = (status) => {
    switch (status) {
      case "Delivered":
        return "text-green-600";
      case "Pending":
        return "text-orange-600";
      case "Cancelled":
        return "text-red-600";
      default:
        return "text-gray-600";
    }
  };

  // ✅ Delete Parcel
  // const handleDelete = (parcel) => {
  //   if (parcel.status !== "Delivered" && parcel.status !== "Cancelled") {
  //     return toast.error("Pending parcel cannot be deleted!");
  //   }

  //   Swal.fire({
  //     title: "Delete Parcel?",
  //     text: "This action cannot be undone.",
  //     icon: "warning",
  //     showCancelButton: true,
  //     confirmButtonColor: "#03373D",
  //     cancelButtonColor: "#CAEB66",
  //     confirmButtonText: "Yes, delete!",
  //   }).then(async (result) => {
  //     if (result.isConfirmed) {
  //       try {
  //         await axiosSecure.delete(`/parcels/${parcel._id}`);
  //         setParcels(parcels.filter((p) => p._id !== parcel._id));
  //         Swal.fire("Deleted!", "Parcel has been deleted.", "success");
  //       } catch (error) {
  //         toast.error("Failed to delete parcel.");
  //       }
  //     }
  //   });
  // };
  const handleDelete = (parcel) => {
    if (parcel.status !== "Delivered" && parcel.status !== "Cancelled") {
      return Swal.fire({
        icon: "info",
        title: "Cannot Delete",
        text: "Pending parcels cannot be deleted until Delivered or Cancelled.",
        confirmButtonColor: "#03373D",
      });
    }

    Swal.fire({
      title: "Delete Parcel?",
      text: "This action cannot be undone.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#03373D",
      cancelButtonColor: "#CAEB66",
      confirmButtonText: "Yes, delete!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axiosSecure.delete(`/parcels/${parcel._id}`);
          setParcels(parcels.filter((p) => p._id !== parcel._id));
          Swal.fire("Deleted!", "Parcel has been deleted.", "success");
        } catch (error) {
          Swal.fire("Error", "Failed to delete parcel.", error);
        }
      }
    });
  };


  // ✅ Cancel Parcel
  // const handleCancel = (parcel) => {
  //   const createdAt = dayjs(parcel.createdAt);
  //   const hoursSinceCreated = dayjs().diff(createdAt, "hour");

  //   // Same region + Central Hub restriction
  //   if (
  //     parcel.senderRegion === parcel.receiverRegion &&
  //     parcel.senderWarehouse === "Central Hub" &&
  //     parcel.receiverWarehouse === "Central Hub"
  //   ) {
  //     return toast.error("Parcels within same region’s Central Hub cannot be cancelled.");
  //   }

  //   // Cancel within 24 hours
  //   if (hoursSinceCreated > 24) {
  //     return toast.error("Parcel can only be cancelled within 24 hours.");
  //   }

  //   // Same region but different hub → max 8 hours
  //   if (
  //     parcel.senderRegion === parcel.receiverRegion &&
  //     parcel.senderWarehouse !== parcel.receiverWarehouse &&
  //     hoursSinceCreated > 8
  //   ) {
  //     return toast.error("Same region different hub parcels can only be cancelled within 8 hours.");
  //   }

  //   Swal.fire({
  //     title: "Cancel Parcel?",
  //     text: "Do you really want to cancel this parcel?",
  //     icon: "warning",
  //     showCancelButton: true,
  //     confirmButtonColor: "#03373D",
  //     cancelButtonColor: "#CAEB66",
  //     confirmButtonText: "Yes, cancel!",
  //   }).then(async (result) => {
  //     if (result.isConfirmed) {
  //       try {
  //         await axiosSecure.patch(`/parcels/${parcel._id}`, { status: "cancelled" });
  //         setParcels(
  //           parcels.map((p) =>
  //             p._id === parcel._id ? { ...p, status: "cancelled" } : p
  //           )
  //         );
  //         Swal.fire("Cancelled!", "Parcel has been cancelled.", "success");
  //       } catch (error) {
  //         toast.error("Failed to cancel parcel.");
  //       }
  //     }
  //   });
  // };
  // ✅ Cancel Parcel
  const handleCancel = (parcel) => {
    Swal.fire({
      title: "Cancel Parcel?",
      text: "Do you really want to cancel this parcel?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#03373D",
      cancelButtonColor: "#CAEB66",
      confirmButtonText: "Yes, cancel!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          // ✅ call your backend cancel API
          const res = await axiosSecure.patch(`/parcels/${parcel._id}/cancel`);

          if (res.data.success) {
            setParcels(
              parcels.map((p) =>
                p._id === parcel._id ? { ...p, status: "Cancelled" } : p
              )
            );
            Swal.fire("Cancelled!", "Parcel has been cancelled.", "success");
          } else {
            Swal.fire("Error", res.data.message || "Failed to cancel parcel", "error");
          }
        } catch (error) {
          Swal.fire(
            "Error",
            error.response?.data?.message || "Failed to cancel parcel.",
            "error"
          );
        }
      }
    });
  };


  if (loading)
    return (
      <div className="flex justify-center items-center h-64">
        <span className="loading loading-spinner text-[#CAEB66] loading-xl"></span>
      </div>
    );

  if (!loading && parcels.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-64">
        <p className="text-2xl font-bold text-[#CAEB66] animate-bounce">
          Oops! No Parcel Added Yet 🚚
        </p>
      </div>
    );
  }

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold text-[#03373D] mb-4">My Parcels</h2>

      {/* Large screens: table view */}
      <div className="hidden lg:block">
        <table className="w-full border border-gray-300 rounded-lg overflow-hidden shadow-sm">
          <thead className="bg-[#03373D] text-white">
            <tr>
              <th className="px-4 py-2 text-left">Tracking ID</th>
              <th className="px-4 py-2 text-left">Parcel Name</th>
              <th className="px-4 py-2 text-left">Created Date</th>
              <th className="px-4 py-2 text-left">Cost (BDT)</th>
              <th className="px-4 py-2 text-left">Status</th>
              <th className="px-4 py-2 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {parcels.map((parcel) => (
              <tr
                key={parcel._id}
                className="border-b border-gray-300 hover:bg-[#CAEB6620] cursor-pointer"
              >
                <td className="px-4 py-2">{parcel.trackingId}</td>
                <td className="px-4 py-2">{parcel.parcelName}</td>
                <td className="px-4 py-2">
                  {dayjs(parcel.createdAt).format("DD MMM YYYY")}
                </td>
                <td className="px-4 py-2">{parcel.fare}/-</td>
                <td className={`px-4 py-2 font-semibold w-max ${statusColor(parcel.status)}`}>
                  {parcel.status}
                </td>
                {/* action buttons */}
                {/* <td className="px-4 py-2 flex gap-3">
                  <FaBan
                    onClick={() => handleCancel(parcel)}
                    className="text-orange-600 hover:text-orange-800 cursor-pointer text-lg"
                  />
                  <FaTrashAlt
                    onClick={() => handleDelete(parcel)}
                    className="text-red-600 hover:text-red-800 cursor-pointer text-lg"
                  />
                </td> */}

                <td className="px-4 py-2">
                  <div className="flex justify-center gap-3">
                    {/* Cancel button */}
                    <button
                      onClick={() => handleCancel(parcel)}
                      className="p-2 rounded-full border border-orange-500 text-orange-600 hover:bg-orange-100 transition"
                    >
                      <FaBan />
                    </button>

                    {/* Delete button */}
                    <button
                      onClick={() => handleDelete(parcel)}
                      className="p-2 rounded-full border border-red-500 text-red-600 hover:bg-red-100 transition"
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

      {/* Small/medium screens: card view */}
      <div className="lg:hidden flex flex-col gap-4">
        {parcels.map((parcel) => (
          <div
            key={parcel._id}
            className="p-4 border-l-8 rounded-xl border-[#CAEB66] shadow-sm bg-white"
          >
            <div className="flex items-center justify-between mb-2">
              <span className="font-bold text-[#03373D]">Tracking:</span>
              <span>{parcel.trackingId}</span>
            </div>
            <div className="flex items-center justify-between mb-2">
              <span className="font-bold text-[#03373D]">Parcel Name:</span>
              <span>{parcel.parcelName}</span>
            </div>
            <div className="flex items-center justify-between mb-2">
              <span className="font-bold text-[#03373D]">Created:</span>
              <span>{dayjs(parcel.createdAt).format("DD MMM YYYY")}</span>
            </div>
            <div className="flex items-center justify-between mb-2">
              <span className="font-bold text-[#03373D]">Cost:</span>
              <span>{parcel.fare} BDT</span>
            </div>
            <div className="flex items-center justify-between mb-2">
              <span className="font-bold text-[#03373D]">Status:</span>
              <span
                className={`font-semibold px-2 py-1 rounded-full ${statusColor(parcel.status)}`}
              >
                {parcel.status}
              </span>
            </div>

            {/* Actions for mobile */}
            <div className="flex justify-end gap-4 mt-2">
              <button
                onClick={() => handleCancel(parcel)}
                className="flex items-center gap-1 text-orange-600 hover:text-orange-800"
              >
                <FaBan /> Cancel
              </button>
              <button
                onClick={() => handleDelete(parcel)}
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

export default MyParcels;
