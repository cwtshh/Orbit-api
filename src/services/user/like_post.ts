import { Request, Response } from 'express';
import User from '../../models/User';
import Post from '../../models/Post';

export const like_post = async (req: Request, res: Response) => {
    const { user_id, post_id } = req.body;

    const user = await User.findById(user_id);
    if(!user) {
        res.status(404).json({ message: 'User not found' });
        return; 
    }

    const post = await Post.findById(post_id);
    if(!post) {
        res.status(404).json({ message: 'Post not found' });
        return;
    }

    if(user.likes.includes(post_id)) {
        res.status(400).json({ message: 'Post already liked' });
        return;
    }

    user.likes.push(post_id);
    post.likes = post.likes + 1;

    await user.save();
    await post.save();

    res.status(200).json({ message: 'Post liked' });
    return;
};