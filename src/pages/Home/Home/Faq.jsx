import React, { useState } from 'react';
import { Link } from 'react-router';


const faqs = [
    {
        question: "How fast can Profast deliver my parcel?",
        answer:
            "Profast offers express delivery in Dhaka within 4–6 hours and standard delivery across major cities within 24–72 hours. Nationwide delivery is available in every district within 48–72 hours.",
    },
    {
        question: "Can I pay with Cash on Delivery?",
        answer:
            "Yes! Profast supports 100% cash on delivery across Bangladesh, ensuring secure and convenient payment for both senders and recipients.",
    },
    {
        question: "How do I track my parcel?",
        answer:
            "You can track your parcel in real time using our live tracking feature. From pickup to delivery, you'll receive instant updates for complete peace of mind.",
    },
    {
        question: "Does Profast support business and corporate logistics?",
        answer:
            "Absolutely. We offer tailored solutions for SMEs and corporate clients, including warehouse support, inventory management, and contract-based logistics.",
    },
    {
        question: "What if I need to return or exchange a parcel?",
        answer:
            "Profast provides reverse logistics for easy returns and exchanges. Just contact our support team or use the app to initiate a return request.",
    },
];


const Faq = () => {
    const [openIndex, setOpenIndex] = useState(0);

    const toggle = (index) => {
        setOpenIndex(index === openIndex ? null : index);
    };

    return (
        <div
            data-aos="fade-left"
            data-aos-offset="100"
            data-aos-delay="100"
            data-aos-duration="600"
            data-aos-easing="ease-in-out"

        >
            <section className="py-8 px-5 lg:px-20 ">
                <div className="text-center mb-10">
                    <h2 className="text-[#03373D] text-2xl lg:text-3xl font-bold mb-3">
                        Frequently Asked Question (FAQ)
                    </h2>
                    <p className="text-[#606060] max-w-2xl mx-auto text-sm lg:text-base">
                        Enhance posture, mobility, and well-being effortlessly with Posture Pro. Achieve proper alignment, reduce pain, and strengthen your body with ease!
                    </p>
                </div>

                <div className="space-y-4 max-w-3xl mx-auto">
                    {faqs.map((faq, index) => (
                        <div
                            key={index}
                            className="bg-white rounded-xl border border-[#E0E0E0] overflow-hidden"
                        >
                            <button
                                onClick={() => toggle(index)}
                                className="w-full text-left px-6 py-4 font-semibold text-[#03373D] flex justify-between items-center"
                            >
                                {faq.question}
                                <span className="text-xl">{openIndex === index ? "−" : "+"}</span>
                            </button>
                            {openIndex === index && faq.answer && (
                                <div className="px-6 pb-4 text-[#606060] text-sm">
                                    {faq.answer}
                                </div>
                            )}
                        </div>
                    ))}
                </div>

                <div className="text-center mt-10">
                    <Link
                        to="/faq"
                        className="inline-flex items-center gap-2 bg-[#CAEB66] text-[#03373D] font-semibold px-6 py-3 rounded-full hover:opacity-90 transition"
                    >
                        See More FAQ's
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-4 w-4"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="#03373D"
                            strokeWidth={2}
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                        </svg>
                    </Link>
                </div>
            </section>
        </div>
    );
};

export default Faq;
