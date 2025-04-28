const mongoose = require("mongoose");

const messageModel = mongoose.Schema(
  {
    from: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    to: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Chat",
    },
    content: { type: String, required: true },
    feed: { type: mongoose.Schema.Types.ObjectId, ref: "Feeds" },
    product: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
    status: {
      type: String,
      enum: ["sent", "delivered", "seen"],
      default: "sent",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = (conn) => {
  return conn.models.Message || conn.model('Message', messageModel);
};