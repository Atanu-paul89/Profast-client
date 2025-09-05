// import React, { useState } from 'react';
// import useAxiosSecure from '../../hooks/useAxiosSecure';
// import Swal from 'sweetalert2';

// const MerchantMessageForm = () => {
//   const axiosSecure = useAxiosSecure();
//   const [title, setTitle] = useState('');
//   const [message, setMessage] = useState('');

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!title || !message) return;

//     try {
//       await axiosSecure.post('/notifications/message-to-admin', { title, message });
//       Swal.fire({
//         title: "Message Sent",
//         text: "Your message has been sent to the admin.",
//         icon: "success",
//         confirmButtonColor: "#03373D"
//       });
//       setTitle('');
//       setMessage('');
//     } catch (err) {
//       console.error("Error sending message:", err);
//       Swal.fire({
//         title: "Error",
//         text: "Failed to send message.",
//         icon: "error",
//         confirmButtonColor: "#03373D"
//       });
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit} className="space-y-4 p-4 bg-white rounded-lg shadow-md">
//       <h2 className="text-xl font-bold text-[#03373D]">📩 Send Message to Admin</h2>
//       <input
//         type="text"
//         placeholder="Title"
//         value={title}
//         onChange={(e) => setTitle(e.target.value)}
//         className="w-full px-3 py-2 border rounded-md"
//       />
//       <textarea
//         placeholder="Your message..."
//         value={message}
//         onChange={(e) => setMessage(e.target.value)}
//         className="w-full px-3 py-2 border rounded-md h-32"
//       />
//       <button
//         type="submit"
//         className="px-4 py-2 bg-[#CAEB66] text-[#03373D] font-bold rounded-md hover:opacity-90"
//       >
//         Send
//       </button>
//     </form>
//   );
// };

// export default MerchantMessageForm;
