import express from 'express';
import authenticate from '../middleware/authenticateToken.js';
import { createNewComment, deleteComment, updateComment } from '../controllers/commentController.js';

const router = express.Router();

router.post('/:postID/comment', authenticate, createNewComment);
router.post('/update-comment/:commentID', authenticate, updateComment);
router.post('/delete-comment/:commentID', authenticate, deleteComment)

export default router;
