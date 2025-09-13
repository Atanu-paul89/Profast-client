import React, { useEffect, useState } from 'react';
import Banner from './Banner';
import How_It_Works from './How_It_Works';
import OurServices from './OurServices';
import Brands from './Brands';
import Features from './Features';
import Merchant from './Merchant';
import CustomerReviews from './CustomerReviews';
import Faq from './Faq';
import Lottie from 'lottie-react';
import welcomeAnim from '../../../assets/json/HelloAnimation.json';

const Home = () => {
    const [showWelcome, setShowWelcome] = useState(() => {
        const hasVisited = sessionStorage.getItem('hasVisited');
        return !hasVisited;
    });

    useEffect(() => {
        if (showWelcome) {
            const timer = setTimeout(() => {
                sessionStorage.setItem('hasVisited', 'true');
                setShowWelcome(false);
            }, 3000); // 3 seconds
            return () => clearTimeout(timer);
        }
    }, [showWelcome]);


    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, []);

    if (showWelcome) {
        return (
            <div className="fixed inset-0 z-[999] bg-white flex flex-col items-center justify-center">
                <Lottie animationData={welcomeAnim} loop={false} className="w-[300px] md:w-[450px]" />
                <h1 className="text-xl md:text-3xl font-bold text-[#03373D] -mt-16 lg:-mt-22">Welcome to Profast</h1>
            </div>
        );
    }

    return (
        <div
            data-aos="fade-right"
            data-aos-offset="100"
            data-aos-delay="100"
            data-aos-duration="800"
            data-aos-easing="ease-in-out"
        >
            <div>
                <Banner />
                <How_It_Works />
                <OurServices></OurServices>
                <Brands></Brands>
                <Features></Features>
                <Merchant></Merchant>
                <CustomerReviews></CustomerReviews>
                <Faq></Faq>
            </div>
        </div>
    );
};

export default Home;