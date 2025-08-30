import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import React, { useState } from 'react';
import { FaCreditCard } from 'react-icons/fa';
import { motion } from 'framer-motion';
import { useParams, useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import paymentDoneANimation from "../../assets/json/Payment Successful.json";
import paymentVerifying from "../../assets/json/verifying.json";
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { Player } from '@lottiefiles/react-lottie-player';
import useAuth from '../../hooks/useAuth';

const MySwal = withReactContent(Swal);

const PaymentForm = () => {
    const stripe = useStripe();
    const elements = useElements();
    const { user } = useAuth();
    const { trackingId } = useParams();
    const [error, setError] = useState('');
    const axiosSecure = useAxiosSecure();
    const navigate = useNavigate();

    const { isPending, data: parcelInfo = {} } = useQuery({
        queryKey: ['parcels', trackingId],
        queryFn: async () => {
            const res = await axiosSecure.get(`/parcels/${trackingId}`);
            return res.data;
        }
    });

    if (isPending) {
        return (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#03373D] bg-opacity-80">
                <p className="text-2xl font-semibold text-[#CAEB66] animate-pulse">Loading...</p>
            </div>
        );
    }

    const amount = parcelInfo.fare;
    const amountInCents = amount * 100;

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!stripe || !elements) return;

        const card = elements.getElement(CardElement);
        if (!card) return;

        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card,
            billing_details: {
                name: user?.displayName,
                email: user?.email,
            }
        });

        if (error) {
            setError(error.message);
            return;
        } else {
            setError('');
            console.log('Payment Method: ', paymentMethod);
        }

        // Show verifying animation
        MySwal.fire({
            allowOutsideClick: false,
            showConfirmButton: false,
            background: 'transparent',
            html: (
                <Player
                    autoplay
                    loop
                    src={paymentVerifying}
                    style={{ height: '250px', width: '250px' }}
                />
            )
        });

        const res = await axiosSecure.post('/create-payment-intent', {
            amountInCents,
            trackingId
        });

        const clientSecret = res.data.clientSecret;

        const result = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: elements.getElement(CardElement),
                billing_details: {
                    name: `${user.displayName}`,
                    email: `${user.email}`,
                }
            }
        });

        if (result.error) {
            console.log(result.error.message);
        } else {
            if (result.paymentIntent.status === 'succeeded') {
                console.log("payment succeeded: ", result);
                Swal.close();

                await axiosSecure.patch(`/parcels/${trackingId}/payment`, {
                    paymentIntentId: result.paymentIntent.id,
                    amount,
                    payerEmail: user.email
                });

                await MySwal.fire({
                    allowOutsideClick: false,
                    showConfirmButton: false,
                    background: 'transparent',
                    html: (
                        <Player
                            autoplay
                            loop={false}
                            src={paymentDoneANimation}
                            style={{ height: '350px', width: '350px' }}
                        />
                    ),
                    timer: 2000,
                    timerProgressBar: false,
                    didClose: () => {
                        navigate('/dashboard/my-parcel');
                    }
                });
            }
        }
    };

    return (
        <div className='pt-20'>
            <form onSubmit={handleSubmit} className='space-y-4 bg-[#CAEB6640] border-x-8 border-[#CAEB66] p-6 rounded-xl shadow-md w-full max-w-md mx-auto'>
                <div className='flex items-center justify-center gap-2'>
                    <FaCreditCard className='text-[#03373D] text-xl' />
                    <h1 className='text-[#03373D] font-bold text-base text-center'>
                        Please Insert Your Card Details
                    </h1>
                </div>

                <CardElement
                    className='py-5 border-b-1 border-dashed border-gray-500'
                    options={{
                        style: {
                            base: {
                                fontSize: '13px',
                                color: '#03373D',
                                '::placeholder': {
                                    color: '#03373D',
                                },
                            },
                            invalid: {
                                color: '#FB2C36',
                                fontStyle: 'bold',
                            },
                        },
                    }}
                />

                <motion.button
                    type='submit'
                    disabled={!stripe}
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    className='bg-[#03373D] text-[#BAEC66] font-semibold py-2 rounded-lg text-sm md:text-base w-full cursor-pointer transition-all duration-300 hover:bg-[#04545D] disabled:opacity-50'
                >
                    Pay {amount}/-
                </motion.button>

                {error && <p className='text-red-500 font-bold'>{error}</p>}
            </form>
        </div>
    );
};

export default PaymentForm;
