import { Request, Response } from 'express';
import User from '../../models/User';

export const edit_profile = async(req: Request, res: Response) => {
    const { user_id, name, email } = req.body; 

    const user = await User.findById(user_id);
    if(!user) {
        res.status(404).json({message: 'User not found'});
        return;
    }

    if(name || name !== '') {
        user.name = name;
    }

    if(email || email !== '') {
        user.email = email;
    }

    if(req.file && req.file.path) {
        user.profile_photo_path = req.file.path;
    }

    await user.save();

    res.status(200).json({
        message: 'User updated successfully',
        user: {
            id: user._id,
            username: user.username,
            name: user.name,
            email: user.email,
            profile_photo_path: user.profile_photo_path
        } 
    });

}