import { Request, Response } from 'express';
import User from '../../models/User';

export const get_user_likes = async(req: Request, res: Response) => {
    const { user_id } = req.params;

    const user = await User.findById(user_id).populate({
        path: 'likes',
        populate: {
            path: 'user',
            select: 'username name email'
        }
    });
    if(!user) {
        res.status(404).json({ message: 'User not found' });
        return;
    }

    res.status(200).json(user.likes);
};