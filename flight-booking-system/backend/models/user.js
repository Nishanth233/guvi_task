const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

// Use createIndexes to replace ensureIndex
userSchema.index({ email: 1 }, { unique: true });

const User = mongoose.model('User', userSchema);

User.createIndexes(); // Ensure indexes are created

module.exports = User;
