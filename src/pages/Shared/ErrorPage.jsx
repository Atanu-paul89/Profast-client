import React from 'react';
import { FaHome } from 'react-icons/fa';

const ErrorPage = () => {
    return (
 <div className="min-h-screen flex flex-col items-center justify-center bg-white text-center px-4">
      {/* Cartoon Character */}
      <div className="mb-6">
        <div className="relative w-40 h-40 mx-auto">
          {/* Pink rectangle */}
          <div className="bg-pink-400 w-full h-full rounded-md relative">
            {/* Arms & Legs */}
            <div className="absolute top-1/2 left-[-20px] w-5 h-1 bg-pink-400 rotate-45"></div>
            <div className="absolute top-1/2 right-[-20px] w-5 h-1 bg-pink-400 -rotate-45"></div>
            <div className="absolute bottom-[-20px] left-6 w-2 h-5 bg-pink-400"></div>
            <div className="absolute bottom-[-20px] right-6 w-2 h-5 bg-pink-400"></div>

            {/* Helmet */}
            <div className="absolute top-[-20px] left-1/2 transform -translate-x-1/2 w-24 h-10 bg-yellow-400 rounded-t-full border border-yellow-600"></div>

            {/* Wrench */}
            <div className="absolute right-[-30px] top-10 w-6 h-6 bg-gray-600 rounded-full flex items-center justify-center text-white text-xs">
              🔧
            </div>
          </div>
        </div>
      </div>

      {/* Error Text */}
      <h1 className="text-4xl font-bold text-gray-800 mb-2">Error 404</h1>
      <p className="text-gray-600 mb-6">Oops! The page you're looking for doesn't exist.</p>

      {/* Go Home Button */}
      <a
        href="/"
        className="inline-flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white font-semibold px-6 py-3 rounded transition"
      >
        <FaHome />
        Go Home
      </a>
    </div>
    );
};

export default ErrorPage;