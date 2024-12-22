import { Request, Response } from 'express';
import User from '../../models/User';

export const get_user_follow = async(req: Request, res: Response) => {
    const { id } = req.params;

    const user = await User.findById(id).populate('following').populate('followers');
}