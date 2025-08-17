const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
        }, 
        password: {
            type: String,
            required: true,
        },
        profileImageUrl: {
            type: String,
            default: "https://tinyurl.com/defaultUserImageTaskManagerApp",
        },
        role: {
            type: String,
            enum: ["member", "admin"],
            default: "member",
        }, //Role based access
    },
    { timestamps: true }
);

module.exports = mongoose.model("User", UserSchema);