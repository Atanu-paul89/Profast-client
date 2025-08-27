import React from 'react';
import logo from "../../assets/logo.png";
import { Link } from 'react-router';
import Typewriter from 'typewriter-effect';
const ProfastLogo = () => {
    return (
        <Link to="/">
            <div className='flex items-end '>
                <img className='mb-2' src={logo} alt="" />
                <p className='text-2xl text-[#03373D] font-extrabold -ml-2'>
                    <Typewriter
                        options={{
                            strings: ['Profast'],
                            autoStart: true,
                            loop: true,
                            delay: 85,
                            deleteSpeed: 60,
                            pauseFor: 1500,
                            cursor: '',
                        }}
                    />

                </p>
            </div>
        </Link>
    );
};
export default ProfastLogo;

