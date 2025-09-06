import React from 'react';
import useAuth from '../../hooks/useAuth';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import RiderAnimation from "../../assets/json/rider.json"

const ManageRiders = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();

    return (
        <>
            {/* Page Heading section: Rider Managemnet alongwith refresh button and lottie animation (will be showed just beside the heading typo)   */}
            <div>

            </div>

            {/* Content Section 1: Activer RIder List showed  */}
            <section>
                {/* for larger screen table deisgn  */}
                <div></div>

                {/* For smnaller screen card design */}
                <div></div>
            </section>

            {/* Content Section 2: assigning parcels to Activer RIders  */}
            <section>
                {/* drop down of merchant's email and beside show button   */}
                <div></div>

                {/* larger screen table deisgn: showed all parcel with statys   */}
                <div></div>

                {/* For smnaller screen card design */}
                <div></div>
            </section>

        </>
    );
};

export default ManageRiders;