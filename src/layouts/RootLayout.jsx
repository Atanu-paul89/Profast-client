import React from 'react';
import { Outlet } from 'react-router';
import Navbar from '../pages/Shared/Navbar';
import Footer from '../pages/Shared/Footer';

const RootLayout = () => {
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

export default RootLayout; <Outlet>
</Outlet>