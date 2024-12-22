import { Request, Response } from 'express';
import User from '../../models/User';
import bcrypt from 'bcryptjs';

export const register_user = async(req: Request, res: Response) => {
    const { username, name, email, password } = req.body;
    if(!username || !name || !email || !password) {
        res.status(400).json({ message: "Missing required fields" });
        return;
    }
    if(await User.findOne({ username })) {
        res.status(400).json({ message: "Username already exists" });
        return;
    }
    if(await User.findOne({ email })) {
        res.status(400).json({ message: "Email already exists" });
        return;
    }

    const salt = await bcrypt.genSalt();
    const pass_hash = await bcrypt.hash(password, salt);

    const new_user = await User.create({
        username: username,
        name: name,
        email: email,
        password: pass_hash,
    });

    if(!new_user) {
        res.status(500).json({ message: "Internal server error" });
        return;
    }

    res.status(201).json({ message: "User created successfully" });
};