import { Request, Response } from 'express';
import Post from '../../models/Post';
import User from '../../models/User';

export const create_post_w_photo = async (req: Request, res: Response) => {
    const { user_id, content } = req.body;
    if(!user_id || !content) {
        res.status(400).json({ message: 'Missing parameters' });
        return;
    }

    if(!req.file) {
        res.status(400).json({ message: 'Missing file' });
        return;
    }

    const user = await User.findById(user_id);
    if(!user) {
        res.status(404).json({ message: 'User not found' });
        return;
    }

    const post = await Post.create({
        user: user_id,
        content: content,
        photo: req.file.path
    });
    if(!post) {
        res.status(500).json({ message: 'Error creating post' });
        return;
    }

    user.posts.push(post._id);
    await user.save();

    res.status(201).json(post);
}