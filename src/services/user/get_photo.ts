import { Request, Response } from 'express';
import User from '../../models/User';
import Post from '../../models/Post';
import fs from 'fs';

export const get_photo = async (req: Request, res: Response) => {
    const { user_id, post_id } = req.params;

    if(!user_id || !post_id) {
        res.status(400).json({ message: 'Missing user_id or post_id' });
        return;
    }

    if(!await User.findById(user_id)) {
        res.status(404).json({ message: 'User not found' });
        return;
    }

    const post = await Post.findById(post_id);
    if(!post) {
        res.status(404).json({ message: 'Post not found' });
        return;
    }

    const imagepath = post.photo;
    console.log(imagepath);

    if(fs.existsSync(imagepath)) {
        res.sendFile(imagepath);
    } else {
        res.status(404).json({ message: 'Image not found' });
    }

    console.log('get_photo');
}