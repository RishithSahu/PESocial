import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import multer from "multer";
import helmet from "helmet";
import morgan from "morgan";
import path from "path";
import { fileURLToPath } from "url";
import authRoutes from "./routes/auth.js";
import userRoutes from "./routes/users.js";
import postRoutes from "./routes/posts.js";
import friendRoutes from "./routes/friends.js"; // Import the new friend routes
import { register } from "./controllers/auth.js";
import { createPost } from "./controllers/posts.js"; // Import createPost function
import { verifyToken } from "./middleware/auth.js";
import User from "./models/User.js";
import Post from "./models/Post.js";
import Notification from "./models/Notification.js"; // Import the Notification model
import { users, posts } from "./data/index.js";

// CONFIGURATIONS
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config();

const app = express();

// Middleware
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());

// Static Files
app.use("/assets", express.static(path.join(__dirname, "public/assets")));

// FILE STORAGE CONFIGURATION
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/assets");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});
const upload = multer({ storage });

// ROUTES WITH FILES
app.post("/auth/register", upload.single("picture"), register);
app.post("/posts", verifyToken, upload.single("picture"), createPost); // Use the createPost function

// API ROUTES
app.use("/auth", authRoutes);
app.use("/users", userRoutes);
app.use("/posts", postRoutes);
app.use("/friends", friendRoutes); // Add the new routes for friends

app.use("/users", (req, res, next) => {
  console.log(`Request to /users: ${req.method} ${req.url}`);
  next();
}, userRoutes);

// FUNCTION TO CREATE NOTIFICATION
const createNotification = async (userId, message) => {
  try {
    const newNotification = new Notification({
      userId,
      message,
      timestamp: new Date(),
    });

    await newNotification.save();
    console.log("Notification created:", newNotification); // Log created notification
  } catch (error) {
    console.error("Error creating notification:", error);
  }
};

// EXAMPLE: ADD NOTIFICATIONS WHEN A FRIEND IS ADDED
app.post("/friends/add", verifyToken, async (req, res) => {
  try {
    const { userId, friendId } = req.body;

    const user = await User.findById(userId);
    const friend = await User.findById(friendId);

    if (!user || !friend) {
      return res.status(404).json({ message: "User or Friend not found" });
    }

    if (userId === friendId) {
      return res.status(400).json({ message: "Cannot add yourself as a friend" });
    }

    if (user.friends.includes(friendId)) {
      return res.status(400).json({ message: "Already friends" });
    }

    user.friends.push(friendId);
    await user.save();

    // Create a notification for the friend
    const message = `${user.firstName} ${user.lastName} added you as a friend!`;
    await createNotification(friendId, message); // Use the createNotification function

    res.status(200).json({ message: "Friend added successfully!" });
  } catch (err) {
    console.error("Error adding friend:", err);
    res.status(500).json({ message: "Error adding friend" });
  }
});

// DATABASE AND SERVER SETUP
const PORT = process.env.PORT || 6001;

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL); // Removed deprecated options
    console.log("Connected to MongoDB!");

    app.listen(PORT, () => console.log(`Server is running on Port: ${PORT}`));

    /* OPTIONAL: ADD DATA ONE TIME */
    // Uncomment the following lines if you want to seed initial data into the database
    // await User.deleteMany({});
    // await Post.deleteMany({});
    // await User.insertMany(users);
    // await Post.insertMany(posts);
    // console.log("Sample users and posts have been added.");
  } catch (error) {
    console.error("Database connection error:", error);
    process.exit(1); // Exit process on failure
  }
};

connectDB();