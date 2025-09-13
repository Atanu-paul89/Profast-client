import React, { useEffect } from 'react';
import Lottie from 'lottie-react';
import welcomeAnim from '../assets/json/HelloAnimation.json'; 

const WelcomeScreen = ({ onFinish }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onFinish();
    }, 3000); // 3 seconds

    return () => clearTimeout(timer);
  }, [onFinish]);

  return (
    <div className="fixed inset-0 z-[999] bg-white flex flex-col items-center justify-center">
      <Lottie animationData={welcomeAnim} loop={false} className="w-[250px] md:w-[400px]" />
    </div>
  );
};

export default WelcomeScreen;
