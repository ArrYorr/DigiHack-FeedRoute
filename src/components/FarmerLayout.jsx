import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import FarmerBottomNavBar from './FarmerBottomNavBar';
import FarmerHeader from './FarmerHeader'; // Import the new header
import NotificationPanel from './NotificationPanel';

function FarmerLayout() {
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [notificationCount, setNotificationCount] = useState(2);
  
  // New state: The Layout keeps track of what title to show
  const [pageTitle, setPageTitle] = useState("Farmer Dashboard");

  const handleNotificationToggle = () => {
    setIsNotificationsOpen(!isNotificationsOpen);
  };

  return (
    <div className="relative h-screen flex flex-col bg-gray-50">
      <NotificationPanel isOpen={isNotificationsOpen} />
      
      {/* The Global Header */}
      <FarmerHeader 
        title={pageTitle} 
        isNotificationsOpen={isNotificationsOpen}
        handleNotificationToggle={handleNotificationToggle}
        notificationCount={notificationCount}
      />
      
      {/* The Page Content */}
      <div className="flex-1 overflow-y-auto pb-20">
        {/* We pass setPageTitle down so pages can change the header text */}
        <Outlet context={{ 
          isNotificationsOpen, 
          handleNotificationToggle, 
          notificationCount,
          setPageTitle 
        }} />
      </div>
      
      <FarmerBottomNavBar />
    </div>
  );
}

export default FarmerLayout;