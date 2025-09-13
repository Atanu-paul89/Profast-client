import React, { useEffect, useState } from 'react';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import NotificationCard from '../NotificationCard';

const RiderNotifications = () => {
  const axiosSecure = useAxiosSecure();
  const [loading, setLoading] = useState(true); 
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    const fetchNotifications = async () => {
      const res = await axiosSecure.get('/notifications'); // assumes backend filters by rider email
      setNotifications(res.data);
      setLoading(false);
    };
    fetchNotifications();
  }, [axiosSecure]);

  useEffect(() => {
    const markAllAsRead = async () => {
      const unread = notifications.filter(n => !n.read);
      await Promise.all(
        unread.map(n =>
          axiosSecure.patch(`/notifications/${n._id}/read`)
        )
      );
    };

    if (notifications.length > 0) {
      markAllAsRead();
    }
  }, [notifications, axiosSecure]);

  if (loading) {
    return (
      <div className="flex gap-1 justify-center items-center h-64">
        <span className="loading loading-spinner text-[#CAEB66] loading-xl"></span><span className='font-bold text-lg text-[#03373D]'>Loading Notifications... </span>
      </div>
    );
  }

  return (
    <div className="px-4 py-6 space-y-4">
      <h2 className="text-2xl font-bold text-[#03373D]">🔔 Rider Notifications</h2>
      {notifications.length === 0 ? (
        <p className="text-[#03373D] font-medium">No notifications yet.</p>
      ) : (
        notifications.map((note) => (
          <NotificationCard key={note._id} {...note} />
        ))
      )}
    </div>
  );
};

export default RiderNotifications;
