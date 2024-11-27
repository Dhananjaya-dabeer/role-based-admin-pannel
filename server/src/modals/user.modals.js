import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        match: [/^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/, 'Please provide a valid email address']
    },
    password: {
        type: String,
        required: true,
    },
    role:{
        type: String,
        enum:["admin", "moderator", "doctor", "nurse", "lab_tech"],
        required: true
    }
}, {timestamps: true})

export const User = mongoose.model("User", UserSchema)