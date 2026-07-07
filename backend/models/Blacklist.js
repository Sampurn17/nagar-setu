const mongoose = require("mongoose");

const tokenBlacklistSchema = new mongoose.Schema({
    token: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now,
        expires: 86400 // auto-delete after 24 hours
    }
});

module.exports = mongoose.model("TokenBlacklist", tokenBlacklistSchema);
