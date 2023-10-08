const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            required: true,
            unique: true
        },
        emailId: {type: String,unique: true},

        password: { type: String, required: true }
    }
);


module.exports = {User: mongoose.model('User', userSchema)};