import React from 'react';
import { MdArrowOutward } from 'react-icons/md';
import { NavLink } from 'react-router';
import ProfastLogo from './ProfastLogo';
import useAuth from '../../hooks/useAuth';
import { Slide, ToastContainer, toast } from 'react-toastify';
import { Link } from 'react-scroll';

const Navbar = () => {
    const { user, logOut } = useAuth();

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
        logOut()
            .then(() => logoutToast())
    }

    return (
        <div className="rounded-xl lg:px-4 lg:py-1  navbar bg-base-100 shadow-sm">
            {/* Left section */}
            <div className="navbar-start">
                {/* dropdown for mobile/small device */}
                <div className="dropdown">
                    <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /> </svg>
                    </div>
                    <ul
                        tabIndex={0}
                        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
                        <ul className="menu menu-vertical px-1 gap-5">
                            <NavLink className="text-[#03373D]" to="/services"><a>Services</a></NavLink>
                            <NavLink className="text-[#03373D]" to="/coverage"><a>Coverage</a></NavLink>
                            <NavLink className="text-[#03373D]" to="/aboutus"><a>About us</a></NavLink>
                            <NavLink className="text-[#03373D]" to="/pricing"><a>Pricing</a></NavLink>
                            <NavLink className="text-[#03373D]" to="/be-a-rider"><a>Be a Rider</a></NavLink>
                        </ul>
                    </ul>
                </div>
                <NavLink to="/" className="flex items-center text-[#03373D] gap-2 hover:opacity-80 transition-opacity">
                    <div className='flex items-center text-[#03373D]'>
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
                    <NavLink className={({ isActive }) => (isActive ? 'bg-[#D5EF85] rounded-md px-2 py-[3px] font-semibold text-sm' : 'font-semibold text-[#03373D] hover:border-2  hover:px-2 hover:rounded-2xl hover:border-[#D5EF85]')} to="/pricing"><a>Pricing</a></NavLink>
                    <NavLink className={({ isActive }) => (isActive ? 'bg-[#D5EF85] rounded-md px-2 py-[3px] font-semibold text-sm' : 'font-semibold text-[#03373D] hover:border-2  hover:px-2 hover:rounded-2xl hover:border-[#D5EF85]')} to="/be-a-rider"><a>Be a Rider</a></NavLink>
                </ul>
            </div>

            {/* Right section */}
            {
                user ?
                    (

                        <div className="navbar-end gap-1 md:gap-2">
                            <button onClick={handleLogout} className="btn bg-[#CAEB66] rounded-lg">Sign Out </button>

                            {/* avatar */}
                            <div className="dropdown dropdown-end">
                                <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                                    <div className="w-10 rounded-full">
                                        <img
                                            alt={user?.displayName || 'No Name'}
                                            src="https://uxwing.com/wp-content/themes/uxwing/download/peoples-avatars/man-user-circle-black-icon.png"
                                        // src={user?.photoURL || "https://uxwing.com/wp-content/themes/uxwing/download/peoples-avatars/man-user-circle-black-icon.png"} />
                                        // src={user?.photoURL && user.photoURL.trim() !== ""
                                        //     ? user.photoURL
                                        //     : "https://uxwing.com/wp-content/themes/uxwing/download/peoples-avatars/man-user-circle-black-icon.png"}

                                        />

                                    </div>
                                </div>
                                <ul
                                    tabIndex={0}
                                    className="menu menu-sm dropdown-content  bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
                                    <div className='font-semibold italic px-2 text-blue-600 space-y-1 mb-2 border-l-4 rounded-lg py-1 border-[#CAEB66]'>
                                        <li>{user?.displayName}</li>
                                        <li>{user?.email}</li>
                                    </div>
                                    <li className='hover:bg-[#CAEB66] text-[#03373D] font-semibold'><a >Profile</a></li>
                                    <li className='hover:bg-[#CAEB66] text-[#03373D] font-semibold'><a>Dashboard</a></li>
                                    <li className='hover:bg-[#CAEB66] text-[#03373D] font-semibold'><a>Your Order</a></li>
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