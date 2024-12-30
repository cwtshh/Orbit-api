import { Request, Response } from 'express';
import User from '../../models/User';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export const login_user = async(req: Request, res: Response) => {
    const { username, password } = req.body;

    if(!username || !password) {
        res.status(400).json({ message: 'Preencha todos os campos! 🚨' });
        return 
    }

    const user = await User.findOne({ username });

    if(!user) {
        res.status(400).json({ message: 'Usuário não encontrado! 🚨' });
        return;
    }

    const compare_pass = await bcrypt.compare(password, user.password);

    if(!compare_pass) {
        res.status(400).json({ message: 'Senha incorreta! 🚨' });
        return;
    }
    

    const token = jwt.sign({ id: user._id }, process.env.SECRET as string, {
        expiresIn: '1d'
    });

    res.status(200).json({ message: 'Usuário logado com sucesso! 🚀', token: token, user: {
        id: user._id,
        username: user.username,
        name: user.name,
        email: user.email,
        profile_photo_path: user.profile_photo_path
    } });

}