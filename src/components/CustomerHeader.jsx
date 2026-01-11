import { useNavigate } from 'react-router-dom';
import { IoIosArrowBack } from 'react-icons/io';
import { FiBell, FiX } from 'react-icons/fi';

function CustomerHeader({ title, isNotificationsOpen, handleNotificationToggle, notificationCount }) {
  const navigate = useNavigate();

  return (
    <header className="sticky top-0 flex justify-between items-center p-4 bg-green-700 border-b border-green-800 z-10 shadow-sm">
      {/* Back Button */}
      <button onClick={() => navigate(-1)} className="text-white w-10">
        <IoIosArrowBack size={24} />
      </button>
      
      {/* Title */}
      <h1 className="font-bold text-lg text-white">{title}</h1>
      
      {/* Notification Bell */}
      <div className="w-10 flex justify-end">
        <button onClick={handleNotificationToggle} className="relative z-20">
          {isNotificationsOpen ? (
            <FiX size={24} className="text-white" />
          ) : (
            <FiBell size={24} className="text-white" />
          )}
          {notificationCount > 0 && (
            <span className="absolute top-0 right-0 block h-5 w-5 rounded-full bg-white text-red-600 font-bold text-xs flex items-center justify-center transform translate-x-1/4 -translate-y-1/4">
              {notificationCount}
            </span>
          )}
        </button>
      </div>
    </header>
  );
}

export default CustomerHeader;