import React, { useEffect, useState } from 'react';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import NotificationCard from '../NotificationCard';

const RiderNotifications = () => {
  const axiosSecure = useAxiosSecure();
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    const fetchNotifications = async () => {
      const res = await axiosSecure.get('/notifications'); // assumes backend filters by rider email
      setNotifications(res.data);
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
