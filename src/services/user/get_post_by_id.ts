import { Request, Response } from 'express';
import Post from '../../models/Post';
// Removed incorrect import

export const get_post_by_id = async (req: Request, res: Response) => {
    const { post_id } = req.params;

    const post = await Post.findById(post_id).populate({
        path: 'user',
        select: 'name username email profile_photo_path',
    }).populate({
        path: 'comments',
        populate: {
            path: 'user',
            select: 'name username email profile_photo_path',
        }
    }).exec();
    if (!post) {
        res.status(404).json({ message: 'Post not found' });
        return; 
    }

    res.status(200).json(post);
    return; 
}