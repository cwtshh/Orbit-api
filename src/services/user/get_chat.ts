import { Request, Response } from 'express';
import Chat from '../../models/Chat';

export const get_chat = async(req: Request, res: Response) => {
    const { chat_id } = req.params;
    
    if(!chat_id) {
        res.status(400).json({ message: 'Missing chat id' });
        return;
    }

    const chat = await Chat.findById(chat_id).populate({
        path: 'users',
        select: '_id name email username profile_photo_path',
    }).populate('messages');
    if(!chat) {
        res.status(404).json({ message: 'Chat not found' });
        return;
    }

    res.status(200).json({ chat });
};