import React from 'react';
import logo from "../../assets/logo.png";
const ProfastLogo = () => {
    return (
        <div className='flex items-end '>
            <img className='mb-2' src={logo} alt="" />
            <p className='text-2xl text-[#03373D] font-extrabold -ml-2'>Profast</p>
        </div>
    );
};
export default ProfastLogo;