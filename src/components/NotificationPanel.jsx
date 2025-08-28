function NotificationPanel({ isOpen }) {
  // Mock notification data
  const notifications = [
    { id: 1, message: 'Your order of tomatoes has been shipped!' },
    { id: 2, message: 'New post from Green Farms.' },
    { id: 3, message: 'Welcome to FeedRoute! Enjoy a 10% discount on your first order.' },
  ];

  return (
    <div
      // MODIFIED: Added `z-30` to lift the panel to the top layer
      className={`absolute top-20 right-4 w-80 bg-white rounded-lg shadow-xl p-4 transition-all duration-300 ease-in-out z-30
        ${isOpen ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4 pointer-events-none'}`}
    >
      <h3 className="font-bold text-gray-800 mb-2">Notifications</h3>
      <div className="space-y-3">
        {notifications.map(notif => (
          <div key={notif.id} className="text-sm text-gray-600 border-b pb-2 last:border-b-0">
            {notif.message}
          </div>
        ))}
      </div>
    </div>
  );
}

export default NotificationPanel;