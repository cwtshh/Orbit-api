import { Schema } from "mongoose";
import mongoose from "mongoose";

const ChatSchema = new Schema({
    users: [
        {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
    ],
    messages: [
        {
            content: {
                type: String,
                required: true,
            },
            user: {
                type: Schema.Types.ObjectId,
                ref: 'User',
                required: true,
            },
            createdAt: {
                type: Date,
                default: Date.now,
            },
        }
    ],
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

export default mongoose.model("Chat", ChatSchema);
