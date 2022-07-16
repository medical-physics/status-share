const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
  message: { type: String, default: null },
  readStatus: { type: Boolean, default: false },
  senderContact: { type: String },
  senderName: { type: String },
  subject: { type: String, default: null },
  timestamp: { type: Number }
});

module.exports = mongoose.model('message', messageSchema);
