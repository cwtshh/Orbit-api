import { Request, Response } from 'express';
import User from '../../models/User';
import fs from 'fs';

export const get_profile_photo = async (req: Request, res: Response) => {
    const { user_id } = req.params;

    const user = await User.findById(user_id);
    if(!user){
        res.status(404).json({ message: 'User not found' });
        return;
    }

    const imagePath = user.profile_photo_path;

    if(fs.existsSync(imagePath)) {
        res.sendFile(imagePath);
    } else {
        res.status(404).json({ message: 'Image not found' });
    }
}