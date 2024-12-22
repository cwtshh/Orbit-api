import { Request, Response } from 'express';
import User from '../../models/User';

export const unfollow_user = async(req: Request, res: Response) => {
    const { user_id, following_id } = req.body;
    
    if(!user_id || !following_id) {
        res.status(400).json({ message: 'Missing parameters' });
        return;
    }
    
    const user = await User.findById(user_id);
    const following = await User.findById(following_id);

    if(!user || !following) {
        res.status(404).json({ message: 'User not found' });
        return;
    }

    user.following = user.following.filter(follow => follow.toString() !== following_id);
    following.followers = following.followers.filter(follower => follower.toString() !== user_id);

    await user.save();
    await following.save();

    res.status(200).json({ message: 'User unfollowed' });
};