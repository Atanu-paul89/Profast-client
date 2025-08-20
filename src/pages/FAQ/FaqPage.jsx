import React, { useEffect } from 'react';

const extendedFaqs = [
    {
        question: "What is Profast?",
        answer: "Profast is a parcel delivery service offering fast, reliable logistics across Bangladesh with features like express delivery, cash on delivery, and live tracking.",
    },
    {
        question: "How do I place a delivery order?",
        answer: "You can schedule a pickup and drop-off through our website or mobile app. Just enter your parcel details, pickup location, and delivery address.",
    },
    {
        question: "What cities does Profast serve?",
        answer: "We operate in Dhaka, Chattogram, Sylhet, Khulna, Rajshahi, and offer nationwide delivery to every district.",
    },
    {
        question: "What is the delivery time for express service?",
        answer: "Express delivery in Dhaka takes 4–6 hours from pickup to drop-off.",
    },
    {
        question: "Can I send parcels outside Bangladesh?",
        answer: "Currently, Profast only supports domestic delivery within Bangladesh.",
    },
    {
        question: "Is there a weight limit for parcels?",
        answer: "Yes, the standard weight limit is 10kg per parcel. For heavier shipments, please contact our support team.",
    },
    {
        question: "How do I track my parcel?",
        answer: "Use our live tracking feature on the website or app to monitor your parcel in real time.",
    },
    {
        question: "What happens if my parcel is delayed?",
        answer: "We’ll notify you immediately and provide an updated delivery estimate. You can also contact support for assistance.",
    },
    {
        question: "Can I cancel a delivery after booking?",
        answer: "Yes, cancellations are allowed before the parcel is picked up. After pickup, cancellation may incur a fee.",
    },
    {
        question: "Does Profast offer cash on delivery?",
        answer: "Yes, we offer 100% cash on delivery across Bangladesh for secure transactions.",
    },
    {
        question: "Is my parcel insured?",
        answer: "Basic insurance is included for all parcels. For high-value items, additional coverage is available upon request.",
    },
    {
        question: "Can I schedule recurring deliveries?",
        answer: "Yes, recurring deliveries are available for business accounts and corporate clients.",
    },
    {
        question: "Does Profast support returns?",
        answer: "Yes, we offer reverse logistics for parcel returns and exchanges with online merchants.",
    },
    {
        question: "How do I contact customer support?",
        answer: "Our 24/7 call center is available via phone, email, or live chat on the website.",
    },
    {
        question: "Can I use Profast for business deliveries?",
        answer: "Absolutely. We offer tailored logistics for SMEs and corporate clients, including inventory and warehouse support.",
    },
    {
        question: "What are the delivery charges?",
        answer: "Charges vary based on parcel size, weight, and destination. You can view pricing during checkout or on our pricing page.",
    },
    {
        question: "Is there a mobile app for Profast?",
        answer: "Yes, our mobile app is available for Android and iOS with full booking and tracking features.",
    },
    {
        question: "Do you offer packaging services?",
        answer: "Yes, we provide packaging support for business clients and fulfillment partners.",
    },
    {
        question: "How do I become a Profast delivery partner?",
        answer: "You can apply through our website under the 'Join as Rider' section. We’ll guide you through onboarding.",
    },
    {
        question: "Can I schedule a pickup for today?",
        answer: "Yes, same-day pickups are available in select cities. Check availability during booking.",
    },
    {
        question: "How do I update my delivery address?",
        answer: "You can update your address before pickup via your account dashboard or by contacting support.",
    },
];

const FaqPage = () => {

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, []);

    return (
        <div
            data-aos="fade-in"
            data-aos-offset="100"
            data-aos-delay="100"
            data-aos-duration="700"
            data-aos-easing="ease-in-out"

        >
            <section className="py-16 px-5 lg:px-20 ">
                <div className="text-center mb-10">
                    <h2 className="text-3xl font-bold text-[#03373D]">More Frequently Asked Questions</h2>
                    <p className="text-[#606060] mt-2 max-w-2xl mx-auto">
                        Find answers to common questions about Profast’s delivery services, logistics, and support.
                    </p>
                </div>

                <div className="max-w-4xl mx-auto space-y-6">
                    {extendedFaqs.map((faq, index) => (
                        <div key={index} className="border-l-10 border-[#CAEB66] rounded-xl p-6 bg-[#F9FAFB]">
                            <h3 className="text-lg font-semibold text-[#03373D] mb-2">{faq.question}</h3>
                            <p className="text-sm text-[#606060]">{faq.answer}</p>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
};

export default FaqPage;
