import express from 'express';
import authenticate from '../middleware/authenticateToken.js';
import { createNewComment, updateComment } from '../controllers/commentController.js';

const router = express.Router();

router.post('/:postID/comment', authenticate, createNewComment);
router.post('/update-comment/:commentID', authenticate, updateComment)

export default router;
