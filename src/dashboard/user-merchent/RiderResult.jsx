import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useAuth from "../../hooks/useAuth";
import Lottie from "lottie-react";
import riderStatusAnimation from "../../assets/json/rider.json"; // ✅ Your animation file

const RiderResult = () => {
    const axiosSecure = useAxiosSecure();
    const { user } = useAuth();
    const navigate = useNavigate();

    const [userData, setUserData] = useState(null);
    const [riderForm, setRiderForm] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (user?.email) {
            // ✅ Fetch user data
            axiosSecure
                .get(`/users/${user.email}`)
                .then((res) => {
                    setUserData(res.data);

                    // If user has applied, fetch rider form data
                    if (res.data.IsRequestedToBeRider === "Yes") {
                        axiosSecure
                            .get(`/rider-form/${user.email}`)
                            .then((formRes) => {
                                setRiderForm(formRes.data);
                                setLoading(false);
                            })
                            .catch((err) => {
                                console.error("Error fetching rider form:", err);
                                setLoading(false);
                            });
                    } else {
                        setLoading(false);
                    }
                })
                .catch((err) => {
                    console.error("Error fetching user:", err);
                    setLoading(false);
                });
        }
    }, [user?.email, axiosSecure]);

    if (loading) {
        return <p className="text-center mt-10">Loading...</p>;
    }

    return (
        <div className="flex flex-col items-center justify-center p-6">
            {userData?.IsRequestedToBeRider === "Yes" ? (
                <div className="text-center">
                    <Lottie
                        animationData={riderStatusAnimation}
                        loop={true}
                        style={{ width: 300, height: 300 }}
                    />
                    <h2 className="text-2xl font-bold text-[#03373D]">
                        You have already submitted the form
                    </h2>
                    <p className="mt-2 text-lg">
                        Status:{" "}
                        <span
                            className={`font-bold ${riderForm?.status === "Rejected"
                                    ? "text-red-500"
                                    : riderForm?.status === "Approved"
                                        ? "text-[#CAEB66]"
                                        : "text-yellow-500"
                                }`}
                        >
                            {riderForm?.status || "Pending"}
                        </span>
                    </p>

                    {riderForm?.status === "Rejected" && (
                        <button
                            onClick={() => navigate("/be-a-rider")}
                            className="mt-4 px-6 py-2 bg-[#CAEB66] cursor-pointer text-[#03373D] font-bold rounded hover:opacity-90"
                        >
                            Reapply
                        </button>
                    )}
                </div>
            ) : (

                <div className="text-center">
                    <Lottie
                        animationData={riderStatusAnimation}
                        loop={true}
                        style={{ width: 300, height: 300 }}
                    />
                    <h2 className="text-2xl font-bold text-[#03373D]">
                        You have not yet applied to be a rider
                    </h2>
                    <button
                        onClick={() => navigate("/be-a-rider")}
                        className="mt-4 px-6 cursor-pointer py-2 bg-[#CAEB66] text-[#03373D] font-bold rounded hover:opacity-90"
                    >
                        Apply Today
                    </button>
                </div>
            )}
        </div>
    );
};

export default RiderResult;
