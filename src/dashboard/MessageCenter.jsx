import React, { useEffect, useState } from 'react';
import useAxiosSecure from '../hooks/useAxiosSecure';
import useAuth from '../hooks/useAuth';
import dayjs from 'dayjs';
import Swal from 'sweetalert2';

const MessageCenter = () => {
    const axiosSecure = useAxiosSecure();
    const { user } = useAuth(); // contains email and role
    const [messages, setMessages] = useState([]);
    const [replyMap, setReplyMap] = useState({});
    const [form, setForm] = useState({
        title: '',
        message: '',
        toUser: '',
        toRole: '',
        system: false
    });
    const [userRole, setUserRole] = useState(null);

    useEffect(() => {
        const fetchUserRole = async () => {
            try {
                const res = await axiosSecure.get(`/users/${user.email}`);
                setUserRole(res.data?.role || null);
            } catch (err) {
                console.error("Failed to fetch user role:", err);
            }
        };

        if (user?.email) {
            fetchUserRole();
        }
    }, [user.email, axiosSecure]);

    useEffect(() => {
        const markMessagesAsRead = async () => {
            try {
                const res = await axiosSecure.get('/notifications');
                const unread = res.data.filter(n => !n.read && (n.type === 'Message' || n.type === 'Reply'));

                await Promise.all(
                    unread.map(n =>
                        axiosSecure.patch(`/notifications/${n._id}/read`)
                    )
                );
            } catch (err) {
                console.error("Error marking messages as read:", err);
            }
        };

        markMessagesAsRead();
    }, [axiosSecure]);


    // 🔄 Fetch messages relevant to the user
    useEffect(() => {
        const fetchMessages = async () => {
            let res;
            if (userRole === 'admin') {
                res = await axiosSecure.get('/admin/notifications');
            } else {
                res = await axiosSecure.get('/notifications');
            }
            const filtered = res.data.filter(n => ['Message', 'Reply'].includes(n.type));
            setMessages(filtered);
        };
        fetchMessages();
    }, [axiosSecure, user.role]);

    // 📨 User sends message to admin
    const handleUserMessageSubmit = async (e) => {
        e.preventDefault();
        if (!form.title || !form.message) return;

        try {
            await axiosSecure.post('/notifications/message-to-admin', {
                title: form.title,
                message: form.message
            });

            Swal.fire({
                title: "Message Sent",
                text: "Your message has been sent to the admin.",
                icon: "success",
                confirmButtonColor: "#03373D"
            });

            setForm({ title: '', message: '', toUser: '', toRole: '', system: false });
        } catch (err) {
            console.error("Error sending message:", err);
            Swal.fire({
                title: "Error",
                text: "Failed to send message.",
                icon: "error",
                confirmButtonColor: "#03373D"
            });
        }
    };

    // 🧑‍💼 Admin sends message to users
    const handleAdminMessageSubmit = async (e) => {
        e.preventDefault();
        if (!form.title || !form.message) return;

        try {
            await axiosSecure.post('/admin/notifications', {
                title: form.title,
                message: form.message,
                type: "Message",
                toUser: form.system ? null : form.toUser || null,
                toRole: form.system ? null : form.toRole || null,
                system: form.system
            });

            Swal.fire({
                title: "Message Sent",
                text: "Your message has been sent.",
                icon: "success",
                confirmButtonColor: "#03373D"
            });

            setForm({ title: '', message: '', toUser: '', toRole: '', system: false });
        } catch (err) {
            console.error("Error sending admin message:", err);
            Swal.fire({
                title: "Error",
                text: "Failed to send message.",
                icon: "error",
                confirmButtonColor: "#03373D"
            });
        }
    };

    // 🔁 Admin replies to user message
    const handleReply = async (originalId, replyText) => {
        if (!replyText) return;

        try {
            await axiosSecure.post(`/admin/reply/${originalId}`, {
                title: "Reply from Admin",
                message: replyText
            });

            Swal.fire({
                title: "Reply Sent",
                text: "Your reply has been sent.",
                icon: "success",
                confirmButtonColor: "#03373D"
            });

            setReplyMap(prev => ({ ...prev, [originalId]: '' }));
        } catch (err) {
            console.error("Error sending reply:", err);
            Swal.fire({
                title: "Error",
                text: "Failed to send reply.",
                icon: "error",
                confirmButtonColor: "#03373D"
            });
        }
    };

    return (
        <div className="px-4 py-6 space-y-6">
            <h2 className="text-2xl font-bold text-[#03373D]">📨 Message Center</h2>

            {/* 🔧 Message Form */}
            <form
                onSubmit={userRole === 'admin' ? handleAdminMessageSubmit : handleUserMessageSubmit}
                className="space-y-4 p-4 bg-white rounded-lg shadow-md"
            >
                <h3 className="text-lg font-bold text-[#03373D]">
                    {userRole === 'admin' ? 'Send Message to Users' : 'Send Message to Admin'}
                </h3>

                <input
                    type="text"
                    placeholder="Title"
                    value={form.title}
                    onChange={(e) => setForm({ ...form, title: e.target.value })}
                    className="w-full px-3 py-2 border rounded-md"
                />
                <textarea
                    placeholder="Your message..."
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    className="w-full px-3 py-2 border rounded-md h-24"
                />

                {userRole === 'admin' && (
                    <div className="space-y-2">
                        <label className="block font-medium text-[#03373D]">Target Audience:</label>
                        <div className="flex gap-4 items-center">
                            <input
                                type="checkbox"
                                checked={form.system}
                                onChange={(e) => setForm({ ...form, system: e.target.checked })}
                            />
                            <span>Send to all users</span>
                        </div>
                        {!form.system && (
                            <>
                                <input
                                    type="email"
                                    placeholder="Target Email (optional)"
                                    value={form.toUser}
                                    onChange={(e) => setForm({ ...form, toUser: e.target.value })}
                                    className="w-full px-3 py-2 border rounded-md"
                                />
                                <select
                                    value={form.toRole}
                                    onChange={(e) => setForm({ ...form, toRole: e.target.value })}
                                    className="w-full px-3 py-2 border rounded-md"
                                >
                                    <option value="">Select Role (optional)</option>
                                    <option value="merchant">Merchant</option>
                                    <option value="rider">Rider</option>
                                </select>
                            </>
                        )}
                    </div>
                )}

                <button
                    type="submit"
                    className="px-4 py-2 bg-[#CAEB66] text-[#03373D] font-bold rounded-md hover:opacity-90"
                >
                    Send Message
                </button>
            </form>

            {/* 📬 Message List */}
            {messages.length === 0 ? (
                <p className="text-[#03373D] font-medium">No messages yet.</p>
            ) : (
                messages.map((msg) => (
                    <div key={msg._id} className="p-4 bg-white rounded-lg shadow-md border-l-8 border-[#CAEB66] space-y-2">
                        <h3 className="text-lg font-bold text-[#03373D]">{msg.title}</h3>
                        <p className="text-sm text-[#03373D] whitespace-pre-line">{msg.message}</p>
                        <div className="text-xs text-gray-500">
                            <span>{dayjs(msg.time).format("D MMM YYYY h:mm A")}</span> • <span>{msg.type}</span>
                            {msg.senderEmail && <span> • From: {msg.senderEmail}</span>}
                            {msg.toUser && <span> • To: {msg.toUser}</span>}
                        </div>

                        {/* Admin reply box */}
                        {userRole === 'admin' && msg.type === 'Message' && (
                            <div className="pt-2">
                                <textarea
                                    placeholder="Reply to this message..."
                                    value={replyMap[msg._id] || ''}
                                    onChange={(e) =>
                                        setReplyMap(prev => ({ ...prev, [msg._id]: e.target.value }))
                                    }
                                    className="w-full px-3 py-2 border rounded-md mb-2"
                                />
                                <button
                                    onClick={() => handleReply(msg._id, replyMap[msg._id])}
                                    className="px-4 py-2 bg-[#CAEB66] text-[#03373D] font-bold rounded-md hover:opacity-90"
                                >
                                    Send Reply
                                </button>
                            </div>
                        )}
                    </div>
                ))
            )}
        </div>
    );
};

export default MessageCenter;


