import { Request, Response } from 'express';
import User from '../../models/User';

export const follow_user = async(req: Request, res: Response) => {
    const { user_id, other_user_id } = req.body;

    const user = await User.findById(user_id);
    if(!user) {
        res.status(400).json({ message: 'Usuário não encontrado' });
        return;
    }

    const other_user = await User.findById(other_user_id);
    if(!other_user) {
        res.status(400).json({ message: 'Usuário não encontrado' });
        return;
    }

    if(user.following.includes(other_user_id)) {
        res.status(400).json({ message: 'Usuário já está seguindo' });
        return ;
    }
    if(other_user.followers.includes(user_id)) {
        res.status(400).json({ message: 'Usuário já está seguindo' });
        return ;
    }

    user.following.push(other_user_id);
    other_user.followers.push(user_id);

    await user.save();
    await other_user.save();

    res.status(200).json({ message: 'Usuário seguido com sucesso' });
    return; 
}