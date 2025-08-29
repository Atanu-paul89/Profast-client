import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import React, { useState } from 'react';
import { FaCreditCard } from 'react-icons/fa'
import { motion } from 'framer-motion'
import { useParams } from 'react-router';

const PaymentForm = () => {
    const stripe = useStripe();
    const elements = useElements();
    const {trackingId} = useParams();
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!stripe || !elements) {
            return;
        }

        const card = elements.getElement(CardElement);
        if (card == null) {
            return;
        }

        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card,
        });

        if (error) {
            setError(error.message);
        }
        else {
            setError('');
            console.log('Payment Method: ', paymentMethod);
        }
    }


    return (
        <div className=' pt-20'>
            <form onSubmit={handleSubmit} className='space-y-4 bg-[#CAEB6640] border-x-8 border-[#CAEB66] p-6 rounded-xl shadow-md w-full max-w-md mx-auto '>
                
                <div className='flex items-center justify-center gap-2'>
                    <FaCreditCard className='text-[#03373D] text-xl' />
                    <h1 className='text-[#03373D] font-bold text-base  text-center'>
                        Please Insert Your Card Details
                    </h1>
                </div>

                <CardElement className=' py-5 border-b-1 border-dashed'>

                </CardElement>

                <motion.button
                    type='submit'
                    disabled={!stripe}
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    className='bg-[#03373D] text-[#BAEC66] font-semibold py-2 rounded-lg text-sm md:text-base w-full  cursor-pointer transition-all duration-300 hover:bg-[#04545D] disabled:opacity-50'
                >
                    Pay The Delivery Charge
                </motion.button>
                {
                    error && <p className='text-red-500 font-bold'>{error}</p>
                }
            </form>

        </div>
    );
};

export default PaymentForm;