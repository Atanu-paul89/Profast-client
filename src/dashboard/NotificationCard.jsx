import dayjs from 'dayjs';

const NotificationCard = ({ title, message, time, type }) => (
  <div className="p-4 bg-white border-l-8 rounded-xl shadow-sm border-[#CAEB66]">
    <h3 className="text-lg font-bold text-[#03373D]">{title}</h3>
    <p className="text-sm text-[#03373D] mt-1 whitespace-pre-line">{message}</p>
    <div className="mt-2 text-xs text-gray-500">
      <span>{dayjs(time).format("D MMM YYYY h:mm A")}</span> • <span>{type}</span>
    </div>
  </div>
);

export default NotificationCard;
