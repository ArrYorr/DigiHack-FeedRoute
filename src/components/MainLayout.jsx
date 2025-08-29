import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import BottomNavBar from './BottomNavBar';
import NotificationPanel from './NotificationPanel';

function MainLayout() {
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [notificationCount, setNotificationCount] = useState(3); 

  const handleNotificationToggle = () => {
    setIsNotificationsOpen(!isNotificationsOpen);
  };

  return (
    <div className="relative h-screen flex flex-col">
      <NotificationPanel isOpen={isNotificationsOpen} />
      
      {/* The Outlet renders the current page (e.g., Landing Page or Product Page) */}
      <div className="flex-1 overflow-y-auto">
        <Outlet context={{ isNotificationsOpen, handleNotificationToggle, notificationCount }} />
      </div>
      
      {/* MODIFIED: The BottomNavBar is now correctly rendered here */}
      <BottomNavBar />
    </div>
  );
}

export default MainLayout;