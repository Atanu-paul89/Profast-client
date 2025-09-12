import React, { useEffect, useState } from 'react';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import { Player } from '@lottiefiles/react-lottie-player';
import logAnimation from "../../assets/json/Activy-Log.json";
import { MdAccessTime, MdCalendarToday, MdDelete, MdCheckCircle, MdBlock, MdError } from 'react-icons/md';
import dayjs from 'dayjs';

const ActivityLog = () => {
  const axiosSecure = useAxiosSecure();
  const [loading, setLoading] = useState(true);
  const [logs, setLogs] = useState([]);
  const [currentTime, setCurrentTime] = useState(dayjs());

  useEffect(() => {
    const fetchLogs = async () => {
      try {
        setLoading(true);
        const res = await axiosSecure.get('/admin/logs');
        setLogs(res.data);
      } catch (err) {
        console.error("Error fetching logs:", err);
      }finally {
        setLoading(false);
      }
    };

    fetchLogs();
    setCurrentTime(dayjs()); // capture time when admin opens the page
  }, [axiosSecure]);

  useEffect(() => {
    const markLogsAsSeen = async () => {
      try {
        await axiosSecure.patch('/admin/logs/mark-seen');
      } catch (err) {
        console.error("Error marking logs as seen:", err);
      }
    };

    markLogsAsSeen();
  }, [axiosSecure]);


  const formatDateTime = (timestamp) => {
    return dayjs(timestamp).format("D MMMM YYYY h:mm A");
  };

  const getIcon = (type) => {
    if (type.includes("Approved")) return <MdCheckCircle className="text-green-600 text-xl" />;
    if (type.includes("Deleted")) return <MdDelete className="text-red-600 text-xl" />;
    if (type.includes("Restricted")) return <MdBlock className="text-orange-600 text-xl" />;
    if (type.includes("Rejected")) return <MdError className="text-yellow-600 text-xl" />;
    return <MdAccessTime className="text-[#03373D] text-xl" />;
  };

    if (loading) {
        return (
            <div className="flex gap-1 justify-center items-center h-64">
                <span className="loading loading-spinner text-[#CAEB66] loading-xl"></span><span className='font-bold text-lg text-[#03373D]'>Loading Activity Logs... </span>
            </div>
        );
    }


  return (
    <div className="lg:px-4  space-y-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row justify-between items-center gap-4">
        <div className="flex lg:flex-row flex-col items-center gap-1">
          <Player
            autoplay
            loop
            src={logAnimation}
            className='h-[100px] w-[100px] lg:h-[80px] lg:w-[80px]'
          // style={{ height: '80px', width: '80px' }}
          />
          <h2 className="lg:text-2xl text-xl font-bold text-[#03373D]">Admin Activity Log</h2>
        </div>
        <div className="flex flex-row lg:text-base text-sm items-center gap-4 text-[#03373D] font-semibold">
          <MdCalendarToday className="text-xl text-[#03373D] font-bold " />
          <span>{currentTime.format("D MMMM YYYY")}</span>
          <MdAccessTime className="text-xl text-[#03373D] font-bold " />
          <span>{currentTime.format("h:mm A")}</span>
        </div>
      </div>

      {/* Logs */}
      <div className="flex flex-col gap-4">
        {logs.map((log) => (
          <div key={log._id} className="p-4 bg-white border-l-8 rounded-xl shadow-sm border-[#CAEB66]">
            <div className="flex items-center gap-3 mb-2">
              {getIcon(log.actionType)}
              <h3 className="text-lg font-bold text-[#03373D]">{log.actionType}</h3>
            </div>
            <p className="text-sm text-[#03373D] font-medium whitespace-pre-line">{log.details}</p>
            <div className="mt-2 text-xs text-gray-400 italic font-semibold">
              <span>Target: {log.targetEmail}</span> • <span>{formatDateTime(log.timestamp)}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ActivityLog;
