const mongoose = require("mongoose");

const chatModel = mongoose.Schema(
  {
    participants: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    lastMessage: { type: mongoose.Schema.Types.ObjectId, ref: "Message" },
    unreadCount: { type: Map, of: Number, default: {} },
    isGroup: { type: Boolean, default: false },
    groupName: { type: String, trim: true },
    groupInfo: { type: String, trim: true },
  },
  {
    timestamps: true,
  }
);

module.exports = (conn) => {
  return conn.models.Chat || conn.model('Chat', chatModel);
};
