import { useNavigate } from 'react-router-dom';
import { IoIosArrowBack } from 'react-icons/io';
import { FiBell, FiX } from 'react-icons/fi';

// MODIFIED: It now receives its data as props
function CustomerHeader({ title, isNotificationsOpen, handleNotificationToggle, notificationCount }) {
  const navigate = useNavigate();

  // The useOutletContext hook has been removed from this file.

  return (
    <header className="sticky top-0 flex justify-between items-center p-4 bg-white border-b z-10">
      <button onClick={() => navigate(-1)} className="text-gray-600 w-10">
        <IoIosArrowBack size={24} />
      </button>
      <h1 className="font-bold text-lg">{title}</h1>
      <div className="w-10 flex justify-end">
        <button onClick={handleNotificationToggle} className="relative z-20">
          {isNotificationsOpen ? <FiX size={24} className="text-gray-600" /> : <FiBell size={24} className="text-gray-600" />}
          {notificationCount > 0 && (
            <span className="absolute top-0 right-0 block h-5 w-5 rounded-full bg-red-500 text-white text-xs flex items-center justify-center transform translate-x-1/4 -translate-y-1/4">
              {notificationCount}
            </span>
          )}
        </button>
      </div>
    </header>
  );
}

export default CustomerHeader;