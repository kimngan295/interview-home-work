import express from 'express';
import { createPost, deletePost, getAllPosts, getPostDetails, searchPostByTitle, updatePost } from '../controllers/postController.js';
import authenticate from '../middleware/authenticateToken.js';

const router = express.Router();

router.get('/', getAllPosts);
router.post('/new-post', authenticate, createPost);
router.post('/update-post/:postID', authenticate, updatePost);
router.post('/search', searchPostByTitle);
router.post('/:postID', authenticate, getPostDetails);
router.post('delete-post/:postID', authenticate, deletePost);

export default router;