const mongoose = require('mongoose');
const messageSchema = require('./message').schema;

const mailboxSchema = new mongoose.Schema({
  userId: { type: String, unique: true },
  messages: [messageSchema]
});

module.exports = mongoose.model('mailbox', mailboxSchema);
