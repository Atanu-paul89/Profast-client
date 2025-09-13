import React, { useEffect, useState } from 'react';
import { MdArrowOutward } from 'react-icons/md';
import { NavLink } from 'react-router';
import ProfastLogo from './ProfastLogo';
import useAuth from '../../hooks/useAuth';
import { Slide, ToastContainer, toast } from 'react-toastify';
import { Link } from 'react-scroll';
import { FaPowerOff } from "react-icons/fa6";
import Swal from "sweetalert2";
import useAxiosSecure from '../../hooks/useAxiosSecure';

const Navbar = () => {
    const { user, logOut } = useAuth();
    const axiosSecure = useAxiosSecure();
    const [userRole, setUserRole] = useState(null);

    const logoutToast = () =>
        toast.success('Successfully Signed Out!', {
            position: "top-right",
            autoClose: 1000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            transition: Slide,
        });

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
                        logoutToast(); // your existing toast
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

    const formattedRole = userRole?.charAt(0).toUpperCase() + userRole?.slice(1);


    return (
        <div className="rounded-xl  lg:px-4 lg:py-1  navbar bg-base-100 shadow-sm">
            {/* Left section */}
            <div className="navbar-start">
                
                <NavLink to="/" className="flex items-center text-[#03373D] gap-2 hover:opacity-80 transition-opacity">
                    <div className='flex ml-2 items-center text-[#03373D]'>
                        <ProfastLogo></ProfastLogo>
                    </div>
                </NavLink>

            </div>

            {/* Mid Section */}
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1 gap-5 ">
                    <NavLink className={({ isActive }) => (isActive ? 'bg-[#D5EF85] rounded-md px-2 py-[3px] font-semibold text-sm' : 'font-semibold text-[#03373D] hover:border-2  hover:px-2 hover:rounded-2xl hover:border-[#D5EF85]')} to="/services"><a>Services</a></NavLink>
                    <NavLink className={({ isActive }) => (isActive ? 'bg-[#D5EF85] rounded-md px-2 py-[3px] font-semibold text-sm' : 'font-semibold text-[#03373D] hover:border-2  hover:px-2 hover:rounded-2xl hover:border-[#D5EF85]')} to="/coverage"><a>Coverage</a></NavLink>
                    <NavLink className={({ isActive }) => (isActive ? 'bg-[#D5EF85] rounded-md px-2 py-[3px] font-semibold text-sm' : 'font-semibold text-[#03373D] hover:border-2  hover:px-2 hover:rounded-2xl hover:border-[#D5EF85]')} to="/aboutus"><a>About us</a></NavLink>
                    <NavLink className={({ isActive }) => (isActive ? 'bg-[#D5EF85] rounded-md px-2 py-[3px] font-semibold text-sm' : 'font-semibold text-[#03373D] hover:border-2  hover:px-2 hover:rounded-2xl hover:border-[#D5EF85]')} to="/send-parcel"><a>Send Parcels</a></NavLink>

                    {/* show be a rider to all visitor and user except rider */}
                    {(!user || ["merchant", "admin"].includes(userRole)) && (
                        <NavLink
                            to="/be-a-rider"
                            className={({ isActive }) =>
                                isActive
                                    ? "bg-[#D5EF85] rounded-md px-2 py-[3px] font-semibold text-sm"
                                    : "font-semibold text-[#03373D] hover:border-2 hover:px-2 hover:rounded-2xl hover:border-[#D5EF85]"
                            }
                        >
                            Be a Rider
                        </NavLink>
                    )}
                    {/* show to only logged in users */}
                    {user ? (
                        <NavLink className='  font-bold hover:border-2  hover:px-2 hover:rounded-2xl hover:border-[#D5EF85]' to="/dashboard/profile"><a>Dashboard</a></NavLink>
                    ) : ''}



                </ul>
            </div>

            {/* Right section */}
            {
                user ?
                    (

                        <div className="navbar-end gap-2 items-center  md:gap-3">
                            <button onClick={handleLogout} className=" text-[#CAEB66] hover:text-[#B6D95C] rounded-lg cursor-pointer"><FaPowerOff size={28} /> </button>

                            {/* avatar */}
                            <div className="dropdown dropdown-end">
                                {/* larger screen */}
                                <NavLink to="/dashboard/profile">
                                    <div tabIndex={0} role="button" className="btn hidden md:flex btn-ghost btn-circle avatar">
                                        <div className="w-10 rounded-full ">
                                            <img
                                                alt={user?.displayName || 'No Name'}

                                                src={user?.photoURL || "https://uxwing.com/wp-content/themes/uxwing/download/peoples-avatars/man-user-circle-black-icon.png"} />


                                        </div>
                                    </div>
                                </NavLink>

                                {/* smaller screen */}
                                <div tabIndex={0} role="button" className="btn md:hidden btn-ghost btn-circle avatar">
                                    <div className="w-10 rounded-full ">
                                        <img
                                            alt={user?.displayName || 'No Name'}

                                            src={user?.photoURL || "https://uxwing.com/wp-content/themes/uxwing/download/peoples-avatars/man-user-circle-black-icon.png"} />


                                    </div>
                                </div>

                                <ul
                                    tabIndex={0}
                                    className="menu  lg:hidden menu-sm dropdown-content  bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
                                    <div className='font-semibold italic px-2 text-blue-600 space-y-1 mb-2 border-l-4 rounded-lg py-1 border-[#CAEB66]'>
                                        <li>{user?.displayName}</li>
                                        <li>{user?.email}</li>
                                        <li>Role: {formattedRole}</li>
                                    </div>

                                    <NavLink to="/">
                                        <li className='hover:bg-[#CAEB6615] text-[#03373D] font-semibold border-b-1 mt-[4px] border-[#CAEB6670] rounded-md'><a>🏠 Home</a></li>
                                    </NavLink>

                                    <NavLink to="/services">
                                        <li className='hover:bg-[#CAEB6615] text-[#03373D] font-semibold border-b-1 mt-[4px] border-[#CAEB6670] rounded-md'><a>🛠️ Services</a></li>
                                    </NavLink>

                                    <NavLink to="/coverage">
                                        <li className='hover:bg-[#CAEB6615] text-[#03373D] font-semibold border-b-1 mt-[4px] border-[#CAEB6670] rounded-md'><a>🌍 Coverage</a></li>
                                    </NavLink>

                                    <NavLink to="/aboutus">
                                        <li className='hover:bg-[#CAEB6615] text-[#03373D] font-semibold border-b-1 mt-[4px] border-[#CAEB6670] rounded-md'><a>👥 About us</a></li>
                                    </NavLink>

                                    <NavLink to="/send-parcel">
                                        <li className='hover:bg-[#CAEB6615] text-[#03373D] font-semibold border-b-1 mt-[4px] border-[#CAEB6670] rounded-md'><a>📦 Send Parcel</a></li>
                                    </NavLink>

                                    <NavLink to="/be-a-rider">
                                        <li className='hover:bg-[#CAEB6615] text-[#03373D] font-semibold border-b-1 mt-[4px] border-[#CAEB6670] rounded-md'><a>🚴 Be a Rider</a></li>
                                    </NavLink>

                                    <NavLink to="/dashboard/profile">
                                        <li className='hover:bg-[#CAEB6615] text-[#03373D] font-semibold border-b-1 mt-[4px] border-[#CAEB6670] rounded-md'><a>📊 Dashboard</a></li>
                                    </NavLink>

                                </ul>
                            </div>
                        </div>


                    )
                    :
                    (<div className="navbar-end gap-1">
                        <NavLink to="/auth/signin" className="btn rounded-lg">Sign in </NavLink>
                        <NavLink to="/auth/register" className="btn hidden lg:flex bg-[#CAEB66] rounded-lg font-bold">Register</NavLink>
                        <NavLink to="/be-a-rider" className="hidden md:flex btn p-2 rounded-full bg-black"><MdArrowOutward color='#CAEB66' size={25} /></NavLink>
                    </div>)
            }
            <ToastContainer />
        </div>

    );
};

export default Navbar;