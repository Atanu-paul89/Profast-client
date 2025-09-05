// import React, { useEffect, useState } from 'react';
// import useAxiosSecure from '../../hooks/useAxiosSecure';
// import NotificationCard from '../NotificationCard';

// const AdminMessageInbox = () => {
//   const axiosSecure = useAxiosSecure();
//   const [messages, setMessages] = useState([]);

//   useEffect(() => {
//     const fetchMessages = async () => {
//       const res = await axiosSecure.get('/admin/notifications');
//       const userMessages = res.data.filter(n => n.type === "Message");
//       setMessages(userMessages);
//     };
//     fetchMessages();
//   }, [axiosSecure]);

//   return (
//     <div className="px-4 py-6 space-y-4">
//       <h2 className="text-2xl font-bold text-[#03373D]">📥 Messages from Users</h2>
//       {messages.length === 0 ? (
//         <p className="text-[#03373D] font-medium">No messages received.</p>
//       ) : (
//         messages.map((note) => (
//           <NotificationCard key={note._id} {...note} />
//         ))
//       )}
//     </div>
//   );
// };

// export default AdminMessageInbox;
