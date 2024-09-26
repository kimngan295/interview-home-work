import express from 'express';
import { logoutUser, signIn, signUp } from '../controllers/authController.js';

const router = express.Router();

router.post('/sign-up', signUp);
router.post('/sign-in', signIn);
router.get('/logout', logoutUser)

export default router;