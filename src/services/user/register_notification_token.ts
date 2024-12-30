import { Request, Response } from 'express';
import User from '../../models/User';

export const register_notification_token = async (req: Request, res: Response) => {
    // const { token, user_id } = req.body;

    // if (!token || !user_id) {
    //     res.status(400).json({ error: 'Invalid data.' });
    //     return;
    // }

    // const user = await User.findById(user_id);
    // if (!user) {
    //     res.status(404).json({ error: 'User not found.' });
    //     return;
    // }

    // user.notification_token = token;
    // await user.save();

    // res.status(200).json({ message: 'Token saved.' });
    // return;
}