import { createContext, useContext, useState, useEffect, useCallback } from "react";  // Added useCallback
import axios from "axios";  // Import axios to make API requests

// Create the context
const NotificationContext = createContext();

// Custom hook to use the Notification context
export const useNotificationContext = () => {
  return useContext(NotificationContext);
};

// Notification context provider
export const NotificationContextProvider = ({ children }) => {
  const [notifications, setNotifications] = useState([]); // Default: Empty array
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Retrieve token from localStorage (you may use another method like context if preferred)
  const token = localStorage.getItem("token"); // Assuming token is saved in localStorage

  // Fetch notifications from the backend (update the URL accordingly)
  const fetchNotifications = useCallback(async () => {
    try {
      if (!token) {
        setError("No token found");
        setLoading(false);
        return;
      }
  
      const response = await axios.get('/api/notifications', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
  
      console.log("Notifications:", response.data);  // Log to see the response
      setNotifications(response.data);  // Set notifications state
      setLoading(false);
    } catch (err) {
      console.error("Error fetching notifications:", err);  // Log error to console
      setError("Failed to load notifications");
      setLoading(false);
    }
  }, [token]);  

  // Call fetchNotifications when the component mounts
  useEffect(() => {
    fetchNotifications();
  }, [fetchNotifications]); // Now `fetchNotifications` is properly included in the dependency array

  // Add notification - call this function when the event happens (friend added, post liked)
  const addNotification = (message) => {
    setNotifications((prevNotifications) => [
      ...prevNotifications,
      {
        _id: new Date().toISOString(), // Use a timestamp or unique ID for each notification
        message: message,
        timestamp: new Date(),
      },
    ]);
  };

  // Function to handle event when a post is liked
  const onPostLiked = () => {
    addNotification("Someone liked your post!");
  };

  // Function to handle event when a friend request is accepted
  const onFriendAdded = (friendName) => {
    addNotification(`${friendName} added you as a friend!`);
  };

  // Function to handle event when a new friend request is sent
  const onFriendRequestSent = (friendName) => {
    addNotification(`You sent a friend request to ${friendName}`);
  };

  // Function to handle event when a friend request is received
  const onFriendRequestReceived = (friendName) => {
    addNotification(`${friendName} sent you a friend request!`);
  };

  return (
    <NotificationContext.Provider
      value={{
        notifications,
        loading,
        error,
        addNotification,
        onPostLiked,
        onFriendAdded,
        onFriendRequestSent,
        onFriendRequestReceived,  // Export event handlers so they can be used in other components
      }}
    >
      {children}
    </NotificationContext.Provider>
  );
};