// import React from 'react';

// import Swal from 'sweetalert2';
// import useAxiosSecure from '../hooks/useAxiosSecure';

// const MigratePayments = () => {
//     const axiosSecure = useAxiosSecure();
//   const handleMigration = async () => {
//     try {
//       const res = await axiosSecure.post('/admin/migrate-payments');
//       Swal.fire({
//         title: "Migration Complete",
//         text: res.data.message,
//         icon: "success",
//         confirmButtonColor: "#03373D"
//       });
//     } catch (err) {
//       Swal.fire({
//         title: "Migration Failed",
//         text: err.response?.data?.message || "Something went wrong.",
//         icon: "error",
//         confirmButtonColor: "#03373D"
//       });
//     }
//   };

//   return (
//     <div className="pt-20 text-center">
//       <h2 className="text-xl font-bold text-[#03373D] mb-4">🛠️ Migrate Old Payments</h2>
//       <p className="text-[#03373D] mb-6">Click the button below to sync previously paid parcels into the payments collection.</p>
//       <button
//         onClick={handleMigration}
//         className="px-6 py-2 bg-[#03373D] text-white font-bold rounded hover:bg-[#1C4B50] transition"
//       >
//         Run Migration
//       </button>
//     </div>
//   );
// };

// export default MigratePayments;
