import { Request, Response } from 'express';
import User from '../../models/User';

export const get_user_posts = async(req: Request, res: Response) => {
    const { id } = req.params;

    const user = await User.findById(id).populate({
        path: 'posts',
        populate: {
          path: 'user', // Popula o campo 'user' dentro de cada post
          select: 'username name email', // Retorna apenas os campos necessários
        },
    });
    
    if(!user) {
        res.status(404).json({message: 'User not found'});
        return;
    }

    console.log(user);

    res.status(200).json(user.posts);
}