const mongoose = require('mongoose');

const appMetadataSchema = new mongoose.Schema({
  appName: { type: String }
});

module.exports = mongoose.model('appMetadata', appMetadataSchema);
