import User from "../models/User.js";
import Notification from "../models/Notification.js";

// Function to add a friend
export const addFriend = async (req, res) => {
  try {
    const { userId, friendId } = req.body;

    // Ensure the user and friend exist
    const user = await User.findById(userId);
    const friend = await User.findById(friendId);

    if (!user || !friend) {
      return res.status(404).json({ message: "User or Friend not found" });
    }

    // Prevent adding a user as their own friend
    if (userId === friendId) {
      return res.status(400).json({ message: "Cannot add yourself as a friend" });
    }

    // Add the friend to the user's friend list (if not already added)
    if (user.friends.includes(friendId)) {
      return res.status(400).json({ message: "Already friends" });
    }

    user.friends.push(friendId);
    await user.save();

    // Create a notification for the user
    const message = `${friend.firstName} added you as a friend!`;
    const notification = new Notification({
      userId,
      message,
      timestamp: new Date(),
    });
    await notification.save();

    res.status(200).json({ message: "Friend added successfully!" });
  } catch (err) {
    console.error("Error adding friend:", err);
    res.status(500).json({ message: "Error adding friend" });
  }
};

// Function to accept a friend request
export const acceptFriendRequest = async (req, res) => {
  try {
    const { userId, friendId } = req.body;

    // Ensure the user and friend exist
    const user = await User.findById(userId);
    const friend = await User.findById(friendId);

    if (!user || !friend) {
      return res.status(404).json({ message: "User or Friend not found" });
    }

    // Check if they are already friends
    if (user.friends.includes(friendId)) {
      return res.status(400).json({ message: "Already friends" });
    }

    // Add the friend to the user's friends list
    user.friends.push(friendId);
    await user.save();

    // Create a notification for the user
    const message = `${friend.firstName} accepted your friend request!`;
    const notification = new Notification({
      userId,
      message,
      timestamp: new Date(),
    });
    await notification.save();

    res.status(200).json({ message: "Friend request accepted successfully!" });
  } catch (err) {
    console.error("Error accepting friend request:", err);
    res.status(500).json({ message: "Error accepting friend request" });
  }
};