import React from "react";
import { useState, useEffect, useMemo, useRef } from "react";
import { ArrowLeft, ArrowRight, ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import customertop from "../../../assets/customer-top.png"
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

const SAMPLE_TESTIMONIALS = [
  {
    id: 1,
    quote:
      "Express delivery was a lifesaver for my business in Dhaka — parcels reached within just a few hours. Reliable and fast!",
    name: "Rasel Ahamed",
    title: "CTO",
    avatar: "https://i.pravatar.cc/100?img=12",
  },
  {
    id: 2,
    quote:
      "Nationwide delivery ensured my products reached customers in remote districts on time. Very dependable service!",
    name: "Nazia Sultana",
    title: "Senior Product Designer",
    avatar: "https://i.pravatar.cc/100?img=32",
  },
  {
    id: 3,
    quote:
      "The fulfillment solution made my life easier — from inventory to packaging, everything was handled smoothly.",
    name: "Nasir Uddin",
    title: "CEO",
    avatar: "https://i.pravatar.cc/100?img=4",
  },
  {
    id: 4,
    quote:
      "Cash on delivery gave my customers confidence. Payments were secure and the service was trustworthy.",
    name: "Maria K.",
    title: "Software Engineer",
    avatar: "https://i.pravatar.cc/100?img=15",
  },
  {
    id: 5,
    quote:
      "Parcel return service is a big plus! It helped me build trust with my online customers knowing returns were hassle‑free.",
    name: "Kevin Tran",
    title: "Video Editor",
    avatar: "https://i.pravatar.cc/100?img=55",
  },
];

function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
}

function Dot({ active, onClick, label }) {
    return (
        <button
            aria-label={label}
            onClick={onClick}
            className={classNames(
                "h-2 w-2 rounded-full transition-all",
                active ? "w-3 h-3" : "opacity-50"
            )}
        />
    );
}

function Card({ t, active }) {
    return (
        <motion.div
            layout
            initial={{ opacity: active ? 0 : 0.6, scale: active ? 0.98 : 0.95 }}
            animate={{ opacity: active ? 1 : 0.5, scale: active ? 1 : 0.98 }}
            transition={{ type: "spring", stiffness: 200, damping: 24 }}
            className={classNames(
                "relative rounded-2xl bg-white p-8 md:p-10 shadow-sm",
                "ring-1 ring-black/5",
                active ? "shadow-xl" : "blur-[0.1px]"
            )}
        >
            <Quote className="absolute -top-4 -left-4 h-10 w-10 opacity-20" />
            <p className="text-gray-700 leading-relaxed">{t.quote}</p>
            <div className="my-6 border-t border-dashed border-gray-200" />
            <div className="flex items-center gap-4">
                <div className="h-12 w-12 rounded-full overflow-hidden bg-gradient-to-tr from-emerald-100 to-teal-200 ring-1 ring-black/5">
                    {t.avatar ? (
                        <img src={t.avatar} alt="" className="h-full w-full object-cover" />
                    ) : null}
                </div>
                <div>
                    <div className="font-semibold text-gray-900">{t.name}</div>
                    <div className="text-sm text-gray-500">{t.title}</div>
                </div>
            </div>
        </motion.div>
    );
}

export default function CustomerReviews({
    heroImageSrc = { customertop },
    heading = "What our customers are saying",
    subheading =
    "Enhance posture, mobility, and well‑being effortlessly with Posture Pro. Achieve proper alignment, reduce pain, and strengthen your body with ease!",
    testimonials = SAMPLE_TESTIMONIALS,
    autoPlay = false,
    autoPlayMs = 5000,
}) {
    const [index, setIndex] = useState(1);
    const count = testimonials.length;
    const prevIndex = (index - 1 + count) % count;
    const nextIndex = (index + 1) % count;

    const timerRef = useRef(null);

    useEffect(() => {
        if (!autoPlay) return;
        timerRef.current && clearInterval(timerRef.current);
        timerRef.current = setInterval(() => {
            setIndex((i) => (i + 1) % count);
        }, autoPlayMs);
        return () => timerRef.current && clearInterval(timerRef.current);
    }, [autoPlay, autoPlayMs, count]);

    const select = (i) => setIndex(((i % count) + count) % count);

    const visible = useMemo(() => [prevIndex, index, nextIndex], [prevIndex, index, nextIndex]);

    return (
        <div
            data-aos="zoom-out"
            data-aos-offset="200"
            data-aos-delay="50"
            data-aos-duration="600"
            data-aos-easing="ease-in-out"
            data-aos-mirror="true"
            data-aos-once="false"
            data-aos-anchor-placement="top-center"
        >
            <section
                className="relative isolate  py-16 md:py-15"
                aria-roledescription="carousel"
            >
                <div className="mx-auto max-w-6xl px-4 md:px-8">
                    {heroImageSrc ? (
                        <img
                            src={customertop}
                            alt=""
                            className="mx-auto mb-6 h-24 w-auto select-none"
                            draggable={false}
                        />
                    ) : null}

                    <h2 className="text-center text-3xl md:text-4xl font-bold tracking-tight text-[#03373D]">
                        {heading}
                    </h2>
                    <p className="mx-auto mt-3 max-w-3xl text-center text-[#606060]">
                        {subheading}
                    </p>

                    {/* Cards */}
                    <div className="mx-auto mt-12 grid max-w-6xl grid-cols-1 gap-6 md:grid-cols-3">
                        {/* Prev (hidden on small) */}
                        <div className="hidden md:block opacity-70">
                            <Card t={testimonials[prevIndex]} active={false} />
                        </div>

                        {/* Active */}
                        <div>
                            <Card t={testimonials[index]} active={true} />
                        </div>

                        {/* Next (hidden on small) */}
                        <div className="hidden md:block opacity-70">
                            <Card t={testimonials[nextIndex]} active={false} />
                        </div>
                    </div>

                    {/* Controls */}
                    <div className="mt-6 flex items-center justify-center gap-4">
                        <button
                            onClick={() => select(index - 1)}
                            aria-label="Previous testimonial"
                            className="group inline-flex h-10 w-10 items-center justify-center rounded-full bg-white hover:bg-[#CAEB66] shadow ring-1 ring-black/5 transition hover:shadow-md cursor-pointer"
                        >
                            <ArrowLeft className="h-5 w-5"/>
                        </button>

                        <div className="flex items-center gap-2">
                            {testimonials.map((t, i) => (
                                <Dot
                                    key={t.id ?? i}
                                    active={i === index}
                                    onClick={() => select(i)}
                                    label={`Go to slide ${i + 1}`}
                                />
                            ))}
                        </div>

                        <button
                            onClick={() => select(index + 1)}
                            aria-label="Next testimonial"
                            className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-[#CAEB66] text-black shadow ring-1 ring-emerald-300/50 transition hover:bg-white cursor-pointer hover:shadow-md"
                        >
                            <ArrowRight className="h-5 w-5"  />
                        </button>
                    </div>
                </div>
            </section>
        </div>
    );
}
