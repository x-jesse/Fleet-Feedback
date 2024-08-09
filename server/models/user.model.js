const mongoose = require('mongoose');

const UserSchema = mongoose.Schema(
    {
        username: {type: String, required: [true, "Please enter a username"]},
        password: {type: String, required: [true, "Password is required"]},
    },
    {
        timestamps: true
    }
)

const User = mongoose.model("User", UserSchema);
module.exports = User;
