import { Router } from "express";
import {
    googleLogin,
    googleCallback,
    redirectToProfile,
    profilePage,
} from "../controllers/authGoogleController.js";

const router = Router();

// Route để đăng nhập bằng Google
router.get("/google", googleLogin);

// Route để xử lý callback sau khi xác thực với Google
router.get("/google/callback", googleCallback, redirectToProfile);

// Route cho trang profile của người dùng
router.get("/profile", profilePage);

export default router;
