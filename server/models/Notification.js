import mongoose from "mongoose";

const notificationSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
    timestamp: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

// Add an index on userId to optimize notification retrieval queries
notificationSchema.index({ userId: 1, timestamp: -1 });

const Notification = mongoose.model("Notification", notificationSchema);

export default Notification;