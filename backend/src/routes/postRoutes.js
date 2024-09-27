import express from 'express';
import { createPost, deletePost, getAllPosts, getPostDetails, searchPostByTitle, updatePost } from '../controllers/postController.js';
import authenticate from '../middleware/authenticateToken.js';

const router = express.Router();

router.get('/', getAllPosts);
router.post('/new-post', authenticate, createPost);
router.put('/update-post/:postID', authenticate, updatePost);
router.get('/search', searchPostByTitle);
router.get('/:postID', authenticate, getPostDetails);
router.delete('delete-post/:postID', authenticate, deletePost);


export default router;