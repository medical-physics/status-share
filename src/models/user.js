const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  checkIn: { type: Number, default: 0 },
  email: { type: String, default: null },
  memo: { type: String, default: null },
  name: { type: String },
  phone: { type: String, default: null },
  present: { type: Boolean, default: false },
  priority: { type: Number },
  status: { type: String, default: null },
  statusTime: { type: String },
  team: { type: String },
  teamId: { type: String },
  unreadMessages: { type: Number, default: 0 }
});

module.exports = mongoose.model('user', userSchema);
