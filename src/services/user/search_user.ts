import { Request, Response } from 'express';
import User from '../../models/User';

export const search_user = async(req: Request, res: Response) => {
    const { search_text } = req.params;

    if(!search_text) {
        res.status(400).json({ error: 'Missing parameters' });
        return;
    }

    const user = await User.find({
        $or: [
            { name: { $regex: search_text, $options: 'i' } },
            { username: { $regex: search_text, $options: 'i' } }
        ]
    }).select('name username email profile_photo_path');

    if (!user) {
        res.status(404).json({ error: 'User not found' });
        return;
    }

    res.status(200).json(user);
}