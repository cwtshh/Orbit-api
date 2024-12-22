import { Request, Response } from "express";
import Post from "../../models/Post";

export const get_posts = async(req: Request, res: Response) =>  {
    const posts = await Post.find().populate('user');
    
    res.status(200).json({
        posts
    });
}