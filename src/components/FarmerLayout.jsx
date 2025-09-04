import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import FarmerBottomNavBar from './FarmerBottomNavBar';
import NotificationPanel from './NotificationPanel';

function FarmerLayout() {
  // 1. State for the notification panel is now managed here
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [notificationCount, setNotificationCount] = useState(2); // Example count for farmers

  // 2. The handler to open/close the panel also lives here
  const handleNotificationToggle = () => {
    setIsNotificationsOpen(!isNotificationsOpen);
  };

  return (
    <div className="relative h-screen flex flex-col">
      <NotificationPanel isOpen={isNotificationsOpen} />
      
      {/* 3. The Outlet renders the current farmer page (e.g., FarmerLandingPage) 
         and provides the notification logic to it */}
      <div className="flex-1 overflow-y-auto">
        <Outlet context={{ isNotificationsOpen, handleNotificationToggle, notificationCount }} />
      </div>
      
      <FarmerBottomNavBar />
    </div>
  );
}

export default FarmerLayout;