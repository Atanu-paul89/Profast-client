import React, { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router';
import ProfastLogo from '../pages/Shared/ProfastLogo';
import AOS from 'aos';
import 'aos/dist/aos.css';

const AuthLayout = () => {
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

    // Refresh AOS when the route changes 
    useEffect(() => {
        AOS.refresh();
    }, [location.pathname]);

    
    return (

        <div className=' px-3 py-3 lg:py-8  max-w-screen-xl mx-auto'>
            <ProfastLogo></ProfastLogo>
            <Outlet>
            </Outlet>

        </div>
    );
};

export default AuthLayout;
