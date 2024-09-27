import express from 'express';
import { getUserDetails, logoutUser, refreshToken, signIn, signUp } from '../controllers/authController.js';
import authenticate from '../middleware/authenticateToken.js';

const router = express.Router();

router.post('/sign-up', signUp);
router.post('/sign-in', signIn);
router.post('/logout', logoutUser);
router.post('/refresh-token', authenticate, refreshToken);
router.get('/details/:userID', authenticate, getUserDetails);

export default router;