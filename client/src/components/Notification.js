import React, { useState } from "react";
import { useNotificationContext } from "../context/NotificationContext";

const Notification = () => {
  const { notifications, loading, error } = useNotificationContext();  // Get notifications and loading state
  const [isOpen, setIsOpen] = useState(false);  // State for toggling notification visibility

  // Toggle the visibility of notifications
  const toggleNotifications = () => {
    setIsOpen(!isOpen);
  };

  // Show loading message when fetching notifications
  if (loading) return <div>Loading notifications...</div>;

  // Show error message if there's an issue
  if (error) return <div>{error}</div>;

  return (
    <div>
      <button onClick={toggleNotifications}>
        <i className="bell-icon">🔔</i> 
      </button>

      {/* Display notification list when open */}
      {isOpen && (
        <div className="notification-box">
          {notifications.length === 0 ? (
            <p>No new notifications</p>  // Message when there are no notifications
          ) : (
            notifications.map((notification) => (
              <div key={notification._id} className="notification-item">
                <p>{notification.message}</p>
                <span>{new Date(notification.timestamp).toLocaleString()}</span>  {/* Format timestamp */}
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default Notification;