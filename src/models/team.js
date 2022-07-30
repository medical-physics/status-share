const mongoose = require('mongoose');

const teamSchema = new mongoose.Schema({
  col1: { type: String, default: 'Name' },
  col2: { type: String, default: 'Present' },
  col3: { type: String, default: 'Status' },
  color: { type: String },
  hyperlink: { type: String },
  priority: { type: Number },
  team: { type: String }
});

module.exports = mongoose.model('team', teamSchema);
