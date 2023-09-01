const mongoose = require('mongoose');

const userSessionSchema = new mongoose.Schema({
    token: { type: String, required: true },
    createdAt: { type: Date, default: Date.now }, // Tambahkan kolom createdAt
});
userSessionSchema.index({ createdAt: 1 }, { expireAfterSeconds: 360 });
const UserSession = mongoose.model('UserSession', userSessionSchema);

module.exports = UserSession;