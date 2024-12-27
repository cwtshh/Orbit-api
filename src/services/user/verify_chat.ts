import { Request, Response } from 'express';
import Chat from '../../models/Chat';

export const verify_chat = async(req: Request, res: Response) => {
    const { user1, user2 } = req.body;
    
    if(!user1 || !user2) {
        res.status(400).json({ message: 'Missing users' });
        return;
    }

    const chat = await Chat.findOne({ users: { $all: [user1, user2] } });
    if(!chat) {
        res.status(200).json({ message: 'Chat not found', code: 'not found' });
        return;
    }

    res.status(200).json({ chat, code: 'found' });
};