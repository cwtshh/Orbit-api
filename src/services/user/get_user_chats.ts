import { Request, Response } from 'express';
import User from '../../models/User';
import Chat from '../../models/Chat';

export const get_user_chats = async(req: Request, res: Response) => {
    const { user_id } = req.params;

    if(!user_id) {
        res.status(400).json({ message: 'Missing user id' });
        return;
    }

    const user = await User.findById(user_id);
    if(!user) {
        res.status(404).json({ message: 'User not found' });
        return;
    }

    const chats = await Chat.find({ users: user_id }).populate({
        path: 'users',
        select: 'id username name email',
    });
    if(!chats) {
        res.status(404).json({ message: 'Chats not found' });
        return;
    }

    res.status(200).json(chats);
};