const mongoose = require('mongoose');
const { ROLES } = require('../constants');

const userSchema = mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    isActive: {
        type: Boolean,
        default: false
    },
    role: {
        type: String,
        enum: Object.values(ROLES),
        default: ROLES.USER
    }
});

const User = mongoose.model('user',userSchema);

module.exports = User;