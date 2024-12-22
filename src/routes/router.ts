import { Router } from 'express';
import user_router from './user/user_router';

const router = Router();

router.get('/', (req, res) => {
    res.send('Hello World');
});
router.use('/user', user_router);

export default router;