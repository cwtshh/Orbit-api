import { Request, Response } from 'express';
import User from '../../models/User';

export const get_user_posts = async(req: Request, res: Response) => {
    const { id } = req.params;

    const user = await User.findById(id).populate({
        path: 'posts',
        options: {
            sort: { createdAt: -1 },
        },
        populate: {
          path: 'user', 
          select: 'username name email', 
        },
    });
    
    if(!user) {
        res.status(404).json({message: 'User not found'});
        return;
    }

    res.status(200).json(user.posts);
}