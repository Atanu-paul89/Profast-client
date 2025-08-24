import React from 'react';
import CalculateFare from './CalculateFare';
import AddParcel from './AddParcel';
import clickAnimation from "../../assets/json/Click.json";
import { motion } from 'framer-motion';


const Pricing = () => {
    return (
        <div
            data-aos="fade-right"
            data-aos-offset="100"
            data-aos-delay="100"
            data-aos-duration="600"
            data-aos-easing="ease-in-out"
        >
            <section>

                <div
                    data-aos="fade-in"
                    data-aos-offset="100"
                    data-aos-delay="100"
                    data-aos-duration="800"
                    data-aos-easing="ease-in-out"
                >
                    <AddParcel ></AddParcel>
                </div>

            </section>
        </div>
    );
};

export default Pricing;

