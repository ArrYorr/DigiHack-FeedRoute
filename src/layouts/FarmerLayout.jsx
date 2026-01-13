import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import FarmerBottomNavBar from '../components/FarmerBottomNavBar';
import FarmerHeader from '../components/FarmerHeader';
import NotificationPanel from '../components/NotificationPanel';

function FarmerLayout() {
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [pageTitle, setPageTitle] = useState("Farmer Dashboard");

  // --- 1. SOURCE OF TRUTH: Define Notifications Here ---
  const [notifications, setNotifications] = useState([
    { id: 1, message: "New order received for 50kg Maize", time: "2 mins ago" },
    { id: 2, message: "Low stock warning: Tomatoes", time: "1 hour ago" },
    { id: 3, message: "Buyer 'John Doe' sent a message", time: "3 hours ago" },
    { id: 4, message: "Market price for Onions updated", time: "5 hours ago" },
  ]);

  const handleNotificationToggle = () => {
    setIsNotificationsOpen(!isNotificationsOpen);
  };

  return (
    <div className="relative h-screen flex flex-col bg-gray-50">
      
      {/* 2. Pass the list to the Panel */}
      <NotificationPanel 
        isOpen={isNotificationsOpen} 
        notifications={notifications} 
      />
      
      <FarmerHeader 
        title={pageTitle} 
        isNotificationsOpen={isNotificationsOpen}
        handleNotificationToggle={handleNotificationToggle}
        // 3. Calculate Count Dynamically
        notificationCount={notifications.length}
      />
      
      <div className="flex-1 overflow-y-auto pb-20">
        <Outlet context={{ 
          isNotificationsOpen, 
          handleNotificationToggle, 
          notificationCount: notifications.length, // Pass dynamic count
          setPageTitle 
        }} />
      </div>
      
      <FarmerBottomNavBar />
    </div>
  );
}

export default FarmerLayout;