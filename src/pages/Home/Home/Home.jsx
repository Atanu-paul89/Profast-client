import React from 'react';
import Banner from './Banner';
import How_It_Works from './How_It_Works';
import OurServices from './OurServices';
import Brands from './Brands';
import Features from './Features';
import Merchant from './Merchant';
import CustomerReviews from './CustomerReviews';
import Faq from './Faq';

const Home = () => {
    return (
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
    );
};

export default Home;