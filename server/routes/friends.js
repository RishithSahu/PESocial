import express from "express";
import { addFriend, acceptFriendRequest } from "../controllers/friendController.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

// Add a friend
// Expecting a body with { userId, friendId } (or whatever keys you use for users)
router.post("/add", verifyToken, addFriend);

// Accept a friend request
// Expecting a body with { userId, friendId }
router.post("/accept", verifyToken, acceptFriendRequest);

export default router;