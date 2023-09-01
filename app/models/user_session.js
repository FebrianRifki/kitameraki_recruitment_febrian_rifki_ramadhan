const mongoose = require('mongoose');

const userSessionSchema = new mongoose.Schema({
    token: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
});

//create TTL to delete token value if expired
userSessionSchema.index({ createdAt: 1 }, { expireAfterSeconds: 3600 });
const UserSession = mongoose.model('UserSession', userSessionSchema);

module.exports = UserSession;