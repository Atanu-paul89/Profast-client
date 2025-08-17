// import React from 'react';
// import erroImg from "../../assets/Error 404.png";
// import { FaHome } from 'react-icons/fa';
// import { Link } from 'react-router';

// const ErrorPage = () => {
//   return (
//     <section className="min-h-screen flex flex-col items-center justify-center px-5 lg:py-10  bg-white text-center">
//       <img src={erroImg} alt="Error 404" className="w-[290px] lg:w-[250px] mb-4" />


//       <Link
//         to="/"
//         className="inline-flex items-center gap-2 bg-[#CAEB66] text-[#03373D] font-bold text-xl lg:text-sm px-6 py-2 rounded-md hover:opacity-90 transition"
//       >
//         <FaHome />
//         Go Home
//       </Link>
//     </section>
//   );
// };

// export default ErrorPage;



import React from 'react';
import erroImg from "../../assets/Error 404.png";
import { FaHome } from 'react-icons/fa';
import { Link } from 'react-router';
import { motion } from 'framer-motion';

const ErrorPage = () => {
  return (
    <section className="min-h-screen flex flex-col items-center justify-center px-5 lg:py-10 bg-white text-center">
      {/* Floating character animation */}
      <motion.img
        src={erroImg}
        alt="Error 404"
        className="w-[290px] lg:w-[250px] mb-4"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: [0, -10, 0] }}
        transition={{
          duration: 0.5,
          ease: 'easeOut',
          repeat: Infinity,
          repeatType: 'loop',
          repeatDelay: 2,
        }}
      />

      {/* Button with entrance and hover bounce */}
      <motion.div
        animate={{ scale: [1, 1.05, 1] }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      >
        <Link
          to="/"
          className="inline-flex items-center gap-2 bg-[#CAEB66] text-[#03373D] font-bold text-xl lg:text-sm px-6 py-2 rounded-md hover:opacity-90 transition"
        >
          <FaHome />
          Go Home
        </Link>
      </motion.div>
    </section>
  );
};

export default ErrorPage;

