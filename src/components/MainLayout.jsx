import { useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import BottomNavBar from './BottomNavBar';
import NotificationPanel from './NotificationPanel';
import CustomerHeader from './CustomerHeader';

function MainLayout() {
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [notificationCount, setNotificationCount] = useState(3);
  const [currentPageTitle, setCurrentPageTitle] = useState("Home");
  const location = useLocation();

  const handleNotificationToggle = () => {
    setIsNotificationsOpen(!isNotificationsOpen);
  };

  const showHeader = location.pathname !== '/customer-landing';

  return (
    <div className="relative h-screen flex flex-col">
      <NotificationPanel isOpen={isNotificationsOpen} />
      
      {/* 1. Header for sub-pages (Works fine) */}
      {showHeader && (
        <CustomerHeader 
          title={currentPageTitle} 
          isNotificationsOpen={isNotificationsOpen}
          handleNotificationToggle={handleNotificationToggle}
          notificationCount={notificationCount}
        />
      )}

      <div className="flex-1 overflow-y-auto">
        {/* 2. FIX: Pass notification props to the Landing Page via Context */}
        <Outlet context={{ 
          setCurrentPageTitle,
          isNotificationsOpen, 
          handleNotificationToggle, 
          notificationCount 
        }} />
      </div>
      
      <BottomNavBar />
    </div>
  );
}

export default MainLayout;