// import React, { useEffect, useState } from 'react';
// import useAuth from '../hooks/useAuth';
// import { Navigate, useNavigate } from 'react-router';
// import Swal from 'sweetalert2';

// const PrivateRoute = ({ children }) => {
//   const { user, loading } = useAuth();
//   const navigate = useNavigate();
//   const [showPrompt, setShowPrompt] = useState(false);

//   useEffect(() => {
//     if (!loading && !user) {
//       setShowPrompt(true);
//     }
//   }, [loading, user]);

//   useEffect(() => {
//     if (showPrompt) {
//       Swal.fire({
//         title: 'Restricted Access',
//         text: 'You need to sign in to view this page.',
//         icon: 'info',
//         showCancelButton: true,
//         confirmButtonText: 'Sign In',
//         cancelButtonText: 'Skip Now',
//         confirmButtonColor: '#CAEB66', // your light green
//         cancelButtonColor: '#03373D', // your deep green
//         background: '#ffffff', // light theme
//         color: '#03373D', // text color
//         width: 360, // smaller modal
//         padding: '1.2em',
//         customClass: {
//           popup: 'rounded-lg shadow-md',
//           title: 'text-lg font-semibold',
//           confirmButton: 'px-4 py-2',
//           cancelButton: 'px-4 py-2',
//         },
//       }).then((result) => {
//         if (result.isConfirmed) {
//           navigate('/auth/signin');
//         } else {
//           navigate('/');
//         }
//       });
//     }
//   }, [showPrompt, navigate]);

//   if (loading) {
//     return <span className="text-green-200 loading loading-dots loading-lg"></span>;
//   }

//   if (!user) {
//     return null;
//   }

//   return children;
// };

// export default PrivateRoute;


import React, { useEffect, useState } from 'react';
import useAuth from '../hooks/useAuth';
import { useNavigate } from 'react-router';
import Swal from 'sweetalert2';
import lockerAnimation from "../../src/assets/json/Locker.json"

const PrivateRoute = ({ children }) => {
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const [showPrompt, setShowPrompt] = useState(false);

  useEffect(() => {
    if (!loading && !user) {
      setShowPrompt(true);
    }
  }, [loading, user]);

  useEffect(() => {
    if (showPrompt) {
      Swal.fire({
        html: `
          <div style="display: flex; flex-direction: column; align-items: center;">
            <!-- Lottie Placeholder -->
            <div style="width: 80px; height: 80px; margin-bottom: 12px;">
              <!-- Replace this with your Lottie embed -->
              <div id="lottie-container"></div>
            </div>
            <h2 style="font-size: 1.25rem; color: #03373D; margin-bottom: 8px;">Restricted Access</h2>
            <p style="color: #03373D; font-size: 0.95rem;">You need to sign in to view this page.</p>
          </div>
        `,
        showCancelButton: true,
        confirmButtonText: 'Sign In',
        cancelButtonText: 'Skip Now',
        background: '#ffffff',
        width: 360,
        padding: '1.2em',
        customClass: {
          popup: 'rounded-lg shadow-md',
          actions: 'flex justify-center gap-4 mt-4',
          confirmButton: 'w-28 py-2 rounded-md bg-[#CAEB66] text-[#03373D] font-semibold',
          cancelButton: 'w-28 py-2 rounded-md bg-[#03373D] text-[#CAEB66] font-semibold',
        },
        buttonsStyling: false,
        didOpen: () => {
          // Inject your Lottie animation here
          const container = document.getElementById('lottie-container');
          if (container) {
            // Example using Lottie Web
            import('lottie-web').then((Lottie) => {
              Lottie.loadAnimation({
                container,
                renderer: 'svg',
                loop: true,
                autoplay: true,
                path: '../../src/assets/json/Locker.json', 
              });
            });
          }
        },
      }).then((result) => {
        if (result.isConfirmed) {
          navigate('/auth/signin');
        } else {
          navigate('/');
        }
      });
    }
  }, [showPrompt, navigate]);

  if (loading) {
    return <span className="text-green-200 loading loading-dots loading-lg"></span>;
  }

  if (!user) {
    return null;
  }

  return children;
};

export default PrivateRoute;
