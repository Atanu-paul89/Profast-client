import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useAuth from "../../hooks/useAuth";
import Lottie from "lottie-react";
import Swal from "sweetalert2";
import riderStatusAnimation from "../../assets/json/rider.json";

const RiderResult = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const navigate = useNavigate();

  const [userData, setUserData] = useState(null);
  const [riderForm, setRiderForm] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user?.email) {
      axiosSecure.get(`/users/${user.email}`).then((res) => {
        setUserData(res.data);

        axiosSecure.get(`/rider-form/${user.email}`).then((formRes) => {
          setRiderForm(formRes.data);
          setLoading(false);
        }).catch((err) => {
          console.error("Error fetching rider form:", err);
          setLoading(false);
        });
      }).catch((err) => {
        console.error("Error fetching user:", err);
        setLoading(false);
      });
    }
  }, [user?.email, axiosSecure]);

  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString("en-GB", {
      day: "numeric",
      month: "short",
      year: "numeric"
    });
  };

  const handleCancel = () => {
    Swal.fire({
      title: "Cancel Application?",
      text: "This will withdraw your current rider request.",
      icon: "warning",
      iconColor: "#CAEB66",
      showCancelButton: true,
      confirmButtonColor: "#CAEB66",
      cancelButtonColor: "#03373D",
      confirmButtonText: "Yes, Cancel",
      cancelButtonText: "Keep It"
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.patch(`/rider-form/${user.email}/cancel`)
          .then(() => {
            Swal.fire("Cancelled", "Your application has been withdrawn.", "success");
            navigate(0); // reload page
          })
          .catch((err) => {
            console.error("Cancel failed:", err);
            Swal.fire("Error", "Failed to cancel application.", "error");
          });
      }
    });
  };

  if (loading) {
    return <p className="text-center text-2xl mt-10 text-[#CAEB66]">Loading...</p>;
  }

  return (
    <div className="flex flex-col items-center justify-center pb-6">
      <Lottie className=" hidden lg:flex" animationData={riderStatusAnimation} loop={true} style={{ width: 280, height: 280 }} />
      {/* this lottie for smaller screen */}
      <Lottie className=" md:hidden" animationData={riderStatusAnimation} loop={true} style={{ width: 230, height: 230 }} />

      {userData?.AppliedToBeRider >= 1 && userData?.IsRequestedToBeRider === "No" ? (
        // ✅ Canceled application
        <div className="text-center">
          <h2 className="lg:text-2xl font-bold text-[#03373D]">
            You Cancelled Your Last Application
          </h2>

          <p className="mt-2 font-semibold text-sm lg:text-lg">
            Status: <span className="font-bold text-red-400">Canceled</span>
          </p>

          <p className="mt-1 text-sm font-semibold text-[#03373D]">
            Last Applied on:{" "}
            <span className="font-normal">
              {formatDate(riderForm?.firstSubmittedAt || riderForm?.submittedAt)}
            </span>
          </p>

          <p className="mt-1 font-semibold text-sm text-[#03373D]">
            Total Applied: <span className="font-normal">{userData.AppliedToBeRider} times</span>
          </p>

          <button
            onClick={() => navigate("/be-a-rider")}
            className="mt-4 px-6 py-2 bg-[#CAEB66] text-[#03373D] font-bold rounded hover:opacity-90"
          >
            Re-Apply
          </button>
        </div>
      ) : userData?.IsRequestedToBeRider === "Yes" ? (
        // ✅ Active application
        <div className="text-center">
          <h2 className="lg:text-2xl font-bold text-[#03373D]">
            You Have Already Submitted The Form
          </h2>

          <p className="mt-2 font-semibold text-sm lg:text-lg">
            Status:{" "}
            <span className={`font-bold ${
              riderForm?.status === "Rejected" ? "text-red-500" :
              riderForm?.status === "Approved" ? "text-[#CAEB66]" :
              riderForm?.status === "Canceled" ? "text-gray-500" :
              "text-yellow-500"
            }`}>
              {riderForm?.status || "Pending"}
            </span>
          </p>

          <p className="mt-1 text-sm font-semibold text-[#03373D]">
            Applied on: <span className="font-normal">{formatDate(riderForm?.submittedAt)}</span>
          </p>

          <p className="mt-1 font-semibold text-sm text-[#03373D]">
            Last Applied on:{" "}
            <span className="font-normal">
              {formatDate(riderForm?.firstSubmittedAt || riderForm?.submittedAt)}
            </span>
          </p>

          <p className="mt-1 font-semibold text-sm text-[#03373D]">
            Total Applied: <span className="font-normal">{userData.AppliedToBeRider} times</span>
          </p>

          {riderForm?.status === "Rejected" || riderForm?.status === "Canceled" ? (
            <button
              onClick={() => navigate("/be-a-rider")}
              className="mt-4 px-6 py-2 bg-[#CAEB66] text-[#03373D] font-bold rounded hover:opacity-90"
            >
              Re-Apply
            </button>
          ) : riderForm?.status === "Pending" ? (
            <button
              onClick={handleCancel}
              className="mt-4 px-6 py-3 text-xs lg:text-sm cursor-pointer bg-[#03373D] text-white font-bold rounded-lg hover:opacity-90"
            >
              Cancel Application
            </button>
          ) : null}
        </div>
      ) : (
        // ✅ Never applied
        <div className="text-center">
          <h2 className="lg:text-2xl font-bold text-[#03373D]">
            You Have Not Yet Applied To Be A Rider
          </h2>
          <button
            onClick={() => navigate("/be-a-rider")}
            className="mt-4 px-6 py-2 bg-[#CAEB66] text-[#03373D] font-bold rounded hover:opacity-90"
          >
            Apply Today
          </button>
        </div>
      )}
    </div>
  );
};

export default RiderResult;
