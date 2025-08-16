import React, { useState } from 'react';
import { Link } from 'react-router';
import AOS from 'aos';
import 'aos/dist/aos.css'; // You can also use <link> for styles
// ..
AOS.init();

//got this from npm aos website (copy paste) 
AOS.init({
    // Global settings:
    disable: false, // accepts following values: 'phone', 'tablet', 'mobile', boolean, expression or function
    startEvent: 'DOMContentLoaded', // name of the event dispatched on the document, that AOS should initialize on
    initClassName: 'aos-init', // class applied after initialization
    animatedClassName: 'aos-animate', // class applied on animation
    useClassNames: false, // if true, will add content of `data-aos` as classes on scroll
    disableMutationObserver: false, // disables automatic mutations' detections (advanced)
    debounceDelay: 50, // the delay on debounce used while resizing window (advanced)
    throttleDelay: 99, // the delay on throttle used while scrolling the page (advanced)


    // Settings that can be overridden on per-element basis, by `data-aos-*` attributes:
    offset: 120, // offset (in px) from the original trigger point
    delay: 0, // values from 0 to 3000, with step 50ms
    duration: 400, // values from 0 to 3000, with step 50ms
    easing: 'ease', // default easing for AOS animations
    once: false, // whether animation should happen only once - while scrolling down
    mirror: false, // whether elements should animate out while scrolling past them
    anchorPlacement: 'top-bottom', // defines which position of the element regarding to window should trigger the animation

});

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
            data-aos-offset="200"
            data-aos-delay="15"
            data-aos-duration="600"
            data-aos-easing="ease-in-out"
            data-aos-mirror="true"
            data-aos-once="false"
            data-aos-anchor-placement="top-center"
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
