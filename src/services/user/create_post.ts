import { Request, Response } from "express";
import User from "../../models/User";
import Post from "../../models/Post";

export const create_post = async (req: Request, res: Response) => {
    const { user_id, content } = req.body;

    if (!user_id || !content) {
        res.status(400).json({ error: "Missing parameters" });
        return;
    }

    const user = await User.findById(user_id);
    if(!user) {
        res.status(404).json({ error: "User not found" });
        return;
    }

    const post = await Post.create({ user: user_id, content });
    if(!post) {
        res.status(500).json({ error: "Error creating post" });
        return;
    }

    user.posts.push(post._id);
    await user.save();

    res.status(201).json({
        post,
        message: "Post created successfully"
    });
};