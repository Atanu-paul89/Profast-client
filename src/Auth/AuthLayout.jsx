import React from 'react';
import { Outlet } from 'react-router';
import ProfastLogo from '../pages/Shared/ProfastLogo';

const AuthLayout = () => {
    return (

        <div className=' px-3 py-3 lg:py-8  max-w-screen-xl mx-auto'>
            <ProfastLogo></ProfastLogo>
            <Outlet>
            </Outlet>

        </div>
    );
};

export default AuthLayout;
