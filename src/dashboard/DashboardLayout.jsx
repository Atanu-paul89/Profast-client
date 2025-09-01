import React, { useEffect, useState } from "react";
import { NavLink, Outlet } from "react-router-dom";
import { FaBox, FaHome, FaUser } from "react-icons/fa";
import useAuth from "../hooks/useAuth";
import useAxiosSecure from "../hooks/useAxiosSecure";

const DashboardLayout = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [userRole, setUserRole] = useState(null);

  // ✅ Fetch user role from backend
  useEffect(() => {
    if (user?.email) {
      axiosSecure
        .get(`/users/${user.email}`)
        .then((res) => {
          setUserRole(res.data.role);
        })
        .catch((err) => {
          console.error("Error fetching user role:", err);
        });
    }
  }, [user?.email, axiosSecure]);

  return (
    <div className="drawer lg:drawer-open min-h-screen bg-[#F7F9F9]">
      {/* Drawer toggle for small screens */}
      <input id="dashboard-drawer" type="checkbox" className="drawer-toggle" />

      {/* Main content */}
      <div className="drawer-content flex flex-col">
        {/* Top bar for mobile */}
        <div className="flex items-center justify-between p-4 shadow-md lg:hidden bg-[#03373D] text-white">
          <h2 className="font-bold text-lg">📦 Dashboard</h2>
          <label htmlFor="dashboard-drawer" className="btn btn-sm bg-[#CAEB66] border-none text-[#03373D] font-bold">
            Menu
          </label>
        </div>

        {/* Outlet for nested routes */}
        <div className="p-6 flex-1">
          <Outlet />
        </div>
      </div>

      {/* Sidebar */}
      <div className="drawer-side">
        <label htmlFor="dashboard-drawer" aria-label="close sidebar" className="drawer-overlay"></label>
        <ul className="menu p-4 w-72 min-h-full bg-[#03373D] text-white font-medium space-y-2">
          {/* Dashboard header */}
          <h2 className="text-2xl font-bold text-center mb-6 text-[#CAEB66]">Dashboard</h2>

          {/* Sidebar Links */}
          <li>
            <NavLink
              to="/"
              className={({ isActive }) =>
                `flex items-center gap-2 rounded-lg px-3 py-2 ${isActive ? "bg-[#CAEB66] text-[#03373D]" : "hover:bg-[#0F4C55]"
                }`
              }
            >
              <FaHome /> Home
            </NavLink>
          </li>

          <li>
            <NavLink
              to="/dashboard/profile"
              className={({ isActive }) =>
                `flex items-center gap-2 rounded-lg px-3 py-2 ${isActive ? "bg-[#CAEB66] text-[#03373D]" : "hover:bg-[#0F4C55]"
                }`
              }
            >
              <FaUser /> Profile
            </NavLink>
          </li>

          <li>
            <NavLink
              to="/dashboard/my-parcel"
              className={({ isActive }) =>
                `flex items-center gap-2 rounded-lg px-3 py-2 ${isActive ? "bg-[#CAEB66] text-[#03373D]" : "hover:bg-[#0F4C55]"
                }`
              }
            >
              <FaBox /> My Parcels
            </NavLink>
          </li>

          <li>
            <NavLink
              to="/dashboard/tracking-parcel"
              className={({ isActive }) =>
                `flex items-center gap-2 rounded-lg px-3 py-2 ${isActive ? "bg-[#CAEB66] text-[#03373D]" : "hover:bg-[#0F4C55]"
                }`
              }
            >
              <FaBox /> Track Parcel
            </NavLink>
          </li>

          <li>
            <NavLink
              to="/dashboard/payment-history"
              className={({ isActive }) =>
                `flex items-center gap-2 rounded-lg px-3 py-2 ${isActive ? "bg-[#CAEB66] text-[#03373D]" : "hover:bg-[#0F4C55]"
                }`
              }
            >
              <FaBox /> Payments
            </NavLink>
          </li>

          {userRole === "merchant" && (
            <li>
              <NavLink
                to="/dashboard/rider-result"
                className={({ isActive }) =>
                  `flex items-center gap-2 rounded-lg px-3 py-2 ${isActive
                    ? "bg-[#CAEB66] text-[#03373D]"
                    : "hover:bg-[#0F4C55]"
                  }`
                }
              >
                <FaBox /> Be a Rider
              </NavLink>
            </li>
          )}

        </ul>
      </div>
    </div>
  );
};

export default DashboardLayout;
