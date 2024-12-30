import { Schema } from "mongoose";
import mongoose from "mongoose";

const UserSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true,
    },
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
    profile_photo_path: {
        type: String,
        default: null,
    },
    posts: [{
        type: Schema.Types.ObjectId,
        ref: 'Post',
    }],
    likes: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Post',
        }
    ],
    following: [
        {
            type: Schema.Types.ObjectId,
            ref: 'User',
        }
    ],
    followers: [
        {
            type: Schema.Types.ObjectId,
            ref: 'User',
        }
    ]
});

export default mongoose.model("User", UserSchema);