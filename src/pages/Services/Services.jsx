import React from 'react';
import { MdOutlinePhoneCallback } from "react-icons/md";


const Services = () => {

    return (
        <div className='bg-white my-10 max-w-3xl py-15 mx-auto'>
            <button 
             className="cursor-pointer w-1/2 mx-auto flex items-center justify-center gap-2  bg-[#E9ECF1] py-2 rounded-md hover:bg-gray-100 transition">
                <span>
                    <MdOutlinePhoneCallback size={24} />
                </span>
                <span className="text-sm font-semibold text-[#03373D]">Login with Phone</span>
            </button>

        </div>
    );
};

export default Services;