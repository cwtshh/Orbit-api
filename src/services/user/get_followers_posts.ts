import { Request, Response } from 'express';
import User from '../../models/User';
import Post from '../../models/Post';

export const get_follower_posts = async(req: Request, res: Response) => {
    const { user_id } = req.params;

    const user = await User.findById(user_id);
    if(!user) {
        res.status(400).json({ message: 'Usuário não encontrado' });
        return;
    }

    const followers = user.following;

    const other_user = await User.find({ _id: { $in: followers } });
    const posts = await Post.find({ user: { $in: followers } }).populate({
        path: 'user',
        select: 'username name email profile_photo_path',
    }).sort({ createdAt: -1 });

    res.status(200).json(posts);
}