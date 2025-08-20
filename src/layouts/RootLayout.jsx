import React, { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router';
import Navbar from '../pages/Shared/Navbar';
import Footer from '../pages/Shared/Footer';
import AOS from 'aos';
import 'aos/dist/aos.css';

const RootLayout = () => {
    const location = useLocation();

    useEffect(() => {
        AOS.init({
            offset: 120,
            duration: 600,
            easing: "ease-in-out",
            delay: 100,
            once: false,
            mirror: false,
            anchorPlacement: "top-bottom",
        });
    }, []);

    // Refresh AOS when the route changes (important for Router apps)
    useEffect(() => {
        AOS.refresh();
    }, [location.pathname]);

    return (
        <section className='bg-[#EAECED]'>
            <div className='lg:px-5 px-2 max-w-screen-xl mx-auto bg-[#EAECED]'>
                <Navbar></Navbar>
                <Outlet>
                </Outlet>
                <Footer></Footer>
            </div>
        </section>
    );
};

export default RootLayout; 