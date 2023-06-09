const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
    {
        username: { type: String, required: true, unique: true, },
        password: { type: String, required: true },
        role: { type: String, enum: ['Admin', 'Customer'], default: 'Customer' }
    },
    {
        versionKey: false,
        timestamps: true,
    }
);

module.exports = User = mongoose.model('user', userSchema);