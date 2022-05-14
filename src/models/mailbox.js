const mongoose = require("mongoose");

const mailboxSchema = new mongoose.Schema({
    userId: { type: String, unique: true },
    messages: [messageSchema]
});

const messageSchema = new mongoose.Schema({
    message: { type: String, default: null },
    readStatus: { type: Boolean, default: false },
    senderContact: { type: String },
    senderName: { type: String },
    subject: { type: String, default: null },
    timestamp: { type: Number },
    userId: { type: String }
});

module.exports = mongoose.model("mailbox", mailboxSchema);
