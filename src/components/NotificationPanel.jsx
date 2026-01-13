// Now accepts 'notifications' as a prop
function NotificationPanel({ isOpen, notifications = [] }) {
  
  return (
    <div
      className={`absolute top-20 right-4 w-80 bg-white rounded-lg shadow-xl p-4 transition-all duration-300 ease-in-out z-50
        ${isOpen ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4 pointer-events-none'}`}
    >
      <div className="flex justify-between items-center mb-2">
        <h3 className="font-bold text-gray-800">Notifications</h3>
        <span className="text-xs bg-red-100 text-red-600 px-2 py-0.5 rounded-full font-bold">
          {notifications.length} New
        </span>
      </div>

      <div className="space-y-3 max-h-64 overflow-y-auto">
        {notifications.length === 0 ? (
          <p className="text-sm text-gray-500 text-center py-4">No new notifications</p>
        ) : (
          notifications.map(notif => (
            <div key={notif.id} className="text-sm text-gray-600 border-b pb-2 last:border-b-0">
              <p>{notif.message}</p>
              {notif.time && <span className="text-xs text-gray-400 mt-1 block">{notif.time}</span>}
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default NotificationPanel;