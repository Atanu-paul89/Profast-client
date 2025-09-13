import React from 'react';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader

import ban1 from '../../../assets/banner/banner1.png';
import ban2 from '../../../assets/banner/banner2.png';
import ban3 from '../../../assets/banner/banner3.png';
import { Carousel } from 'react-responsive-carousel';
import { Link } from 'react-router';

const Banner = () => {
    return (
        <Link to="services">
            <Carousel className=' mt-2 lg:mt-6 mb-5' autoPlay={true} infiniteLoop={true} showThumbs={false} showStatus={false} interval={1500} >
                <div>
                    <img src={ban1} />
                </div>
                <div>
                    <img src={ban2} />
                </div>
                <div>
                    <img src={ban3} />
                </div>
            </Carousel>
        </Link>

    );
};

export default Banner;