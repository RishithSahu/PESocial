import Notification from "../models/Notification.js";
import User from "../models/User.js";  // To get user info when creating a notification

// Function to create a new notification
export const createNotification = async (userId, message) => {
  try {
    // Create a new notification document
    const newNotification = new Notification({
      userId,
      message,
      timestamp: new Date(),
    });
    
    // Save the notification in the database
    await newNotification.save();
  } catch (err) {
    console.error("Error creating notification:", err);
  }
};

// Function to get notifications for a specific user
export const getNotifications = async (req, res) => {
    try {
      const { userId } = req.user;  // This should be coming from the verified JWT
      console.log('Fetching notifications for userId:', userId); // Log userId

      const notifications = await Notification.find({ userId })
        .sort({ timestamp: -1 })
        .limit(20);

      console.log('Fetched notifications:', notifications);  // Log notifications

      res.status(200).json(notifications);
    } catch (err) {
      console.error("Error fetching notifications:", err);
      res.status(500).json({ message: "Error fetching notifications" });
    }
};

// Function to notify when a friend is added
export const notifyFriendAdded = async (userId, friendName) => {
  try {
    const message = `${friendName} added you as a friend!`;
    await createNotification(userId, message);  // Reusing the createNotification function
  } catch (err) {
    console.error("Error notifying friend added:", err);
  }
};

// Function to notify when a post is liked
export const notifyPostLiked = async (userId) => {
  try {
    const message = "Someone liked your post!";
    await createNotification(userId, message);  // Reusing the createNotification function
  } catch (err) {
    console.error("Error notifying post liked:", err);
  }
};

// Function to notify when a post is commented on
export const notifyPostCommented = async (userId, commentAuthor) => {
  try {
    const message = `${commentAuthor} commented on your post!`;
    await createNotification(userId, message);  // Reusing the createNotification function
  } catch (err) {
    console.error("Error notifying post commented:", err);
  }
};

// Function to notify when someone follows a user
export const notifyUserFollowed = async (userId, followerName) => {
  try {
    const message = `${followerName} started following you!`;
    await createNotification(userId, message);  // Reusing the createNotification function
  } catch (err) {
    console.error("Error notifying user followed:", err);
  }
};

// Example of how to use these notification functions
export const notifyUserActions = async (userId, actionType, additionalInfo) => {
  try {
    if (actionType === "friendAdded") {
      await notifyFriendAdded(userId, additionalInfo);
    } else if (actionType === "postLiked") {
      await notifyPostLiked(userId);
    } else if (actionType === "postCommented") {
      await notifyPostCommented(userId, additionalInfo.commentAuthor);
    } else if (actionType === "userFollowed") {
      await notifyUserFollowed(userId, additionalInfo.followerName);
    } else {
      console.error("Unknown action type:", actionType);
    }
  } catch (err) {
    console.error("Error in user action notification:", err);
  }
};