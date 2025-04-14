import express from "express";
import { getNotifications } from "../controllers/notifications.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

// Get notifications for the logged-in user
router.get("/", verifyToken, getNotifications);

export default router;
