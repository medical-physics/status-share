const mongoose = require('mongoose');

const credentialSchema = new mongoose.Schema({
  admin: { type: Boolean, default: false },
  email: { type: String, unique: true },
  password: { type: String },
  token: { type: String },
  viewOnly: { type: Boolean, default: false }
});

module.exports = mongoose.model('credential', credentialSchema);
