import React, { useEffect, useState } from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { FaBell, FaBox, FaHome, FaMapMarkedAlt, FaMoneyCheckAlt, FaPowerOff, FaUser } from "react-icons/fa";
import useAuth from "../hooks/useAuth";
import useAxiosSecure from "../hooks/useAxiosSecure";
import { MdAttachMoney, MdDirectionsBike } from "react-icons/md";
import Swal from "sweetalert2";
import { toast } from "react-toastify";
import { FaMessage } from "react-icons/fa6";


const DashboardLayout = () => {
  const { user, logOut } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [loading, setLoading] = useState(true);
  const [userRole, setUserRole] = useState(null);
  const [hasUnseenLogs, setHasUnseenLogs] = useState(false);
  const [hasUnread, setHasUnread] = useState(false);
  const [messageUnread, setMessageUnread] = useState(false);
  const navigate = useNavigate();

  // logic to show unseen dot for activity log to admin // 
  useEffect(() => {
    const checkUnseenLogs = async () => {
      try {
        const res = await axiosSecure.get('/admin/logs/unseen');
        setHasUnseenLogs(res.data.length > 0);
      } catch (err) {
        console.error("Error checking unseen logs:", err);
      }
    };

    checkUnseenLogs();
    const interval = setInterval(checkUnseenLogs, 200);
    return () => clearInterval(interval);
  }, [axiosSecure]);

  //importing notificatioan seen/unseen to set notification alert //
  useEffect(() => {
    const checkUnread = async () => {
      try {
        const res = await axiosSecure.get('/notifications');
        const unread = res.data.some(n => !n.read);
        setHasUnread(unread);
      } catch (err) {
        console.error("Error checking unseen logs:", err);
      }
    };

    checkUnread();
    const interval = setInterval(checkUnread, 200);
    return () => clearInterval(interval);
  }, [axiosSecure]);

  // setting unread dot for messages too //
  useEffect(() => {
    const checkUnreadMessages = async () => {
      try {
        const res = await axiosSecure.get('/notifications');
        const unreadMessages = res.data.some(n => !n.read && (n.type === 'Message' || n.type === 'Reply'));
        setMessageUnread(unreadMessages);
      } catch (err) {
        console.error("Error checking unread messages:", err);
      }
    };

    checkUnreadMessages();
    const interval = setInterval(checkUnreadMessages, 200);
    return () => clearInterval(interval);
  }, [axiosSecure]);


  // const logoutToast = () =>
  //   toast.success('Successfully Signed Out!', {
  //     position: "top-right",
  //     autoClose: 1000,
  //     hideProgressBar: false,
  //     closeOnClick: true,
  //     pauseOnHover: true,
  //     draggable: true,
  //     progress: undefined,
  //     theme: "light",
  //     // transition: Slide,
  //   });

  const handleLogout = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You will be signed out of your account.",
      icon: "warning",
      iconColor: "#CAEB66",
      showCancelButton: true,
      confirmButtonColor: "#CAEB66",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Sign Out",
      cancelButtonText: "Cancel",
      customClass: {
        popup: "custom-swal-popup",
        confirmButton: "custom-confirm-btn"
      }
    }).then((result) => {
      if (result.isConfirmed) {
        logOut()
          .then(() => {
            navigate("/");
            // logoutToast();
          })
          .catch((err) => {
            console.error("Logout failed:", err);
            Swal.fire("Error", "Something went wrong. Please try again.", "error");
          });
      }
    });
  };

  // Fetch user role from backend
  useEffect(() => {
    if (user?.email) {
      setLoading(true);
      axiosSecure.get(`/users/${user.email}`)
        .then((res) => {
          setUserRole(res.data.role);
          setLoading(false);
        })
        .catch((err) => {
          console.error("Error fetching user role:", err);
        });
    }
  }, [user?.email, axiosSecure]);

  const navClass = ({ isActive }) =>
    `flex items-center gap-2 rounded-lg px-3 py-2 ${isActive ? "bg-[#CAEB66] text-[#03373D]" : "hover:bg-[#0F4C55]"
    }`;

  const merNavchClass = ({ isActive }) =>
    `flex items-center gap-3 ounded-lg px-3 py-2 ${isActive
      ? "bg-[#CAEB66] text-[#03373D]"
      : "hover:bg-[#0F4C55]"
    }`;


  const formattedRole = userRole?.charAt(0).toUpperCase() + userRole?.slice(1);

  if (loading ) {
    return (
      <div className="flex  justify-center bg-[#03373D] items-center min-h-screen">
        <p className=" flex items-center gap-2"><span className="text-[#CAEB66] text-xl lg:text-2xl"> Loading Dashboard </span><span className="loading loading-dots mt-3  text-[#CAEB66] loading-sm"></span></p>
      </div>
    );
  }

  return (
    <div className="drawer lg:drawer-open min-h-screen bg-[#F7F9F9]">
      {/* Drawer toggle for small screens */}
      <input id="dashboard-drawer" type="checkbox" className="drawer-toggle" />

      {/* Main content */}
      <div className="drawer-content flex flex-col">
        {/* Top bar for mobile */}

        <div className="flex sticky top-0 items-center justify-between p-4 shadow-md lg:hidden bg-[#03373D] text-white">
          <h2 className="font-bold text-lg">📦 Dashboard</h2>
          <label htmlFor="dashboard-drawer" className="btn  btn-sm bg-[#CAEB66] border-none text-[#03373D] font-bold">
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
        <ul className="menu p-4 w-72 min-h-full bg-[#03373D]  font-medium space-y-1 text-white">
          {/* Dashboard header */}
          <h2 className="text-2xl font-bold text-center text-[#CAEB66]">Dashboard</h2>
          <p className="mb-4 text-[#CAEB66] text-center">Role: {formattedRole}</p>

          {/* Sidebar Links */}

          {/* Home */}
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

          {/* Profile */}
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
          {/* links dedicated to marchant only */}
          {userRole === "merchant" && (
            <>
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
                  <FaMapMarkedAlt /> Track Parcel
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
                  <FaMoneyCheckAlt /> Payments
                </NavLink>
              </li>
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
                  <MdDirectionsBike /> Be a Rider
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/dashboard/merc-notifications"
                  className={merNavchClass}>
                  <div className="flex items-center gap-2">
                    <FaBell /> Notifications
                  </div>
                  {hasUnread && (
                    <span class="relative flex size-3">
                      <span class="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-500 opacity-75"></span>
                      <span class="relative inline-flex size-3 rounded-full bg-red-500"></span>
                    </span>

                  )}
                </NavLink>
              </li>
            </>
          )}

          {/* links dedicated to admin only */}
          {userRole === "admin" && (
            <>
              <li>
                <NavLink to="/dashboard/manage-users" className={navClass}>
                  👥 Manage Users
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/rider-applications" className={navClass}>
                  📝 Rider Applications
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/manage-riders" className={navClass}>
                  🚴 Manage Riders
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/all-parcels" className={navClass}>
                  📦 Parcel Oversight
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/payment-logs" className={navClass}>
                  💳 Payment Logs
                </NavLink>
              </li>
              {/* can enable Notification  bellow by uncommenting */}
              {/* <li>
                <NavLink to="/dashboard/admn-notifications" className={navClass}>
                  <div className="flex gap-27  ">
                    <p>🔔 Notifications</p>
                    {hasUnread && (
                      <span class="relative flex size-3">
                        <span class="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-500 opacity-75"></span>
                        <span class="relative inline-flex size-3 rounded-full bg-red-500"></span>
                      </span>

                    )}
                  </div>
                </NavLink>
              </li> */}

              <li>
                <NavLink to="/dashboard/activity-log" className={navClass}>
                  <div className="flex gap-29  ">
                    <p>📜 Activity Log</p>
                    {hasUnseenLogs && (
                      <span class="relative flex size-3">
                        <span class="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-500 opacity-75"></span>
                        <span class="relative inline-flex size-3 rounded-full bg-red-500"></span>
                      </span>

                    )}
                  </div>
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/reports" className={navClass}>
                  📊 Reports & Analytics
                </NavLink>
              </li>
            </>
          )}

          {/* links dedicated to rider only */}
          {userRole === "rider" && (
            <>
              <li>
                <NavLink to="/dashboard/assigned-parcels" className={navClass}>
                  📦 Assigned Parcels
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/delivery-history" className={navClass}>
                  📜 Delivery History
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/earnings" className={navClass}>
                  💰 Earnings
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/performance" className={navClass}>
                  📊 Performance Stats
                </NavLink>
              </li>

              <li>
                <NavLink to="/dashboard/rider-notifications" className={navClass}>
                  <div className="flex gap-27  ">
                    <p>🔔 Notifications</p>
                    {hasUnread && (
                      <span class="relative flex size-3">
                        <span class="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-500 opacity-75"></span>
                        <span class="relative inline-flex size-3 rounded-full bg-red-500"></span>
                      </span>

                    )}
                  </div>
                </NavLink>
              </li>
            </>
          )}

          <li>
            <NavLink
              to="/dashboard/Message-center"
              className={merNavchClass}>
              <div className="flex items-center gap-2">
                <FaMessage /> Messages
              </div>
              {messageUnread && (
                <span class="relative flex size-3">
                  <span class="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-500 opacity-75"></span>
                  <span class="relative inline-flex size-3 rounded-full bg-red-500"></span>
                </span>

              )}
            </NavLink>
          </li>

          {/* SIgn Out */}
          <li>
            <button
              onClick={handleLogout}
              className={({ isActive }) =>
                `flex items-center gap-2 rounded-lg px-3 py-2 ${isActive ? "bg-[#CAEB66] text-[#03373D]" : "hover:bg-[#0F4C55]"
                }`
              }
            >
              <FaPowerOff className="pt-1" size={20} />  Sign Out
            </button>
          </li>



        </ul>
      </div>
    </div>
  );
};

export default DashboardLayout;
