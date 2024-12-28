import { Request, Response } from "express"
import User from "../../models/User";
import Chat from "../../models/Chat";

export const create_chat = async(req: Request, res: Response) => {
    const { users } = req.body;
    if(!users) {
        res.status(400).json({ message: 'Missing users' });
        return;
    }

    const user1 = await User.findById(users[0]);
    const user2 = await User.findById(users[1]);
    if(!user1 || !user2) {
        res.status(400).json({ message: 'Users not found' });
        return;
    }

    const new_chat = await Chat.create({
        users: users,
    });
    if(!new_chat) {
        res.status(500).json({ message: 'Failed to create chat' });
        return;
    }

    res.status(201).json({ chat: new_chat, message: 'Chat created' });
};