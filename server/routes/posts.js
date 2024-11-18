import express from "express";
import { getFeedPosts, getUserPosts, likePost, deletePost } from "../controllers/posts.js"; // Import deletePost
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

// READ
router.get("/", verifyToken, getFeedPosts); // Get all feed posts
router.get("/:userId/posts", verifyToken, getUserPosts); // Get posts by a specific user

// UPDATE
router.patch("/:id/like", verifyToken, likePost); // Like/unlike a post

// DELETE
router.delete("/:id/delete", verifyToken, deletePost); // Delete a specific post

export default router;