import { Request, Response } from 'express';
import User from '../../models/User';

export const get_user_following = async(req: Request, res: Response) => {
    const { user_id } = req.params;

    const user = await User.findById(user_id).populate('following', 'username name id profile_photo_path');
    if(!user) {
        res.status(404).json({ message: 'User not found' });
        return;
    }

    res.status(200).json(user.following);
}