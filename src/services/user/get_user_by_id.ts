import { Request, Response } from 'express';
import User from '../../models/User';

export const get_user_by_id = async (req: Request, res: Response) => {
    const { id } = req.params;

    const user = await User.findById(id).select('-password');
    if(!user) {
        res.status(404).json({ error: 'User not found' });
        return; 
    }

    res.json(user);
    return; 
}