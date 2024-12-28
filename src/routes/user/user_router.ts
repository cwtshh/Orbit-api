import { Router } from 'express';
import { register_user } from '../../services/user/register_user';
import { login_user } from '../../services/user/login_user';
import { create_post } from '../../services/user/create_post';
import { get_posts } from '../../services/user/get_posts';
import { like_post } from '../../services/user/like_post';
import { get_user_posts } from '../../services/user/get_user_posts';
import { search_user } from '../../services/user/search_user';
import { get_user_by_id } from '../../services/user/get_user_by_id';
import { follow_user } from '../../services/user/follow_user';
import { get_follower_posts } from '../../services/user/get_followers_posts';
import { get_post_by_id } from '../../services/user/get_post_by_id';
import { comment_post } from '../../services/user/comment_post';
import { get_user_likes } from '../../services/user/get_user_likes';
import { get_user_following } from '../../services/user/get_user_following';
import { unfollow_user } from '../../services/user/unfollow_user';
import { verify_chat } from '../../services/user/verify_chat';
import { create_chat } from '../../services/user/create_user';
import { get_chat } from '../../services/user/get_chat';
import { get_user_chats } from '../../services/user/get_user_chats';
import { register_notification_token } from '../../services/user/register_notification_token';

const user_router = Router();

user_router.post('/register', register_user);
user_router.post('/login', login_user);
user_router.get('/search/:search_text', search_user);
user_router.get('/:id', get_user_by_id);
user_router.patch('/follow', follow_user);
user_router.get('/following/:user_id', get_user_following);
user_router.post('/unfollow', unfollow_user);


//posts
user_router.post('/post', create_post)
user_router.get('/posts/all', get_posts);
// user_router.get('/posts', get_posts); // rota temporaria
user_router.patch('/post/like', like_post);
user_router.get('/posts/user/:id', get_user_posts);
user_router.get('/posts/followers/:user_id', get_follower_posts);
user_router.get('/post/:post_id', get_post_by_id);


// comments
user_router.post('/post/comment', comment_post);

// likes
user_router.get('/likes/:user_id', get_user_likes);


// chats
user_router.post('/chat/verify', verify_chat);
user_router.post('/chat/create', create_chat);
user_router.get('/chat/:chat_id', get_chat);
user_router.get('/chats/:user_id', get_user_chats);

// notifications
// user_router.post('/notification/register', register_notification_token);


export default user_router;