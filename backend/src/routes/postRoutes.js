import express from 'express';
import { createPost, getAllPosts, updatePost } from '../controllers/postController.js';
import authenticate from '../middleware/authenticateToken.js';

const router = express.Router();

router.get('/posts', getAllPosts);
router.post('/new-post', authenticate, createPost)
router.post('/update-post/:postID',authenticate, updatePost)

export default router;