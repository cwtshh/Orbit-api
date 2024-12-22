import { Request, Response } from 'express';
import Comment from '../../models/Comment';
import Post from '../../models/Post';

export const comment_post = async(req: Request, res: Response) => {
    const { user_id, post_id, content } = req.body;
    if(!user_id || !post_id || !content) {
        res.status(400).json({ message: 'Missing parameters' });
        return;
    }
    const post = await Post.findById(post_id);
    if(!post) {
        res.status(404).json({ message: 'Post not found' });
        return;
    }

    const comment = await Comment.create({
        content,
        user: user_id,
        post: post_id,
    });

    if(!comment) {
        res.status(500).json({ message: 'Error creating comment' });
        return;
    }
    
    post.comments.push(comment._id);
    post.comments_count = post.comments_count + 1;

    await post.save();

    res.status(201).json({
        message: 'Comment created',
        comment,
    });
}