import { Schema } from "mongoose";
import mongoose from "mongoose";

const PostSchema = new Schema({
    content: {
        type: String,
        required: true,
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    likes: {
        type: Number,
        default: 0,
    },
    comments_count: {
        type: Number,
        default: 0,
    },
    comments: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Comment',
        }
    ],
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

export default mongoose.model("Post", PostSchema);