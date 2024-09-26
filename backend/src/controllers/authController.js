import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { createUser, findUserByUsername } from "../model/userModel.js";
import sendResponse from "../utils/reponseHelper.js";

// Sign up user
export const signUp = async (req, res) => {
    const { username, password, name, dob } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10)

    try {
        // find user exist
        const userExist = await findUserByUsername(username);
        if (userExist != null) {
            return sendResponse(res, 'error', "User already registered", null, { code: 400 })
        }

        const userData = ({
            username: username,
            password: hashedPassword,
            name: name,
            dob: dob
        });

        const user = await createUser(userData);
        if (user) {
            sendResponse(res, 'success', 'Register successfully', user)
        }

    } catch (error) {
        sendResponse(res, 'error', 'Registration failed', null, { code: 500, details: error.message });
    }
}

// Sign in user
export const signIn = async (req, res) => {
    const { username, password, rememberMe } = req.body;

    try {
        if (!username || !password) {
            return sendResponse(res, 'error', 'Username and password are required', null, { code: 400 });
        }

        const userExist = await findUserByUsername(username);

        // Check if user exists
        if (!userExist) {
            return sendResponse(res, 'error', 'Incorrect username or username does not exist', null, { code: 404 });
        }

        // Check if password and hashed password are valid strings
        if (typeof userExist.password !== 'string' || typeof password !== 'string') {
            console.error('Invalid password format');
            throw new Error('Invalid password format');
        }

        // Compare plaintext password with hashed password
        const isPasswordValid = await bcrypt.compare(password, userExist.password);
        if (!isPasswordValid) {
            return sendResponse(res, 'error', 'Password Incorrect', null, { code: 401 });
        }

        // Generate Access Token
        const accessToken = jwt.sign(
            { userID: userExist._id },
            process.env.ACCESS_TOKEN_SECRET,
            { expiresIn: '15m' }
        );

        // Generate Refresh Token (if "Remember Me" is selected)
        const refreshToken = jwt.sign(
            { userID: userExist.id },
            process.env.REFRESH_TOKEN_SECRET,
            { expiresIn: '7d' } // Refresh token lasts for 7 days
        );

        // Store Refresh Token in HTTP-only cookie
        res.cookie('refreshToken', refreshToken, {
            httpOnly: true,
            secure: true, // Secure cookie to ensure it is only sent over HTTPS
            sameSite: 'Strict', // Protect against CSRF attacks
            maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days in milliseconds
        });


        // Send response with Access Token (and Refresh Token if needed)
        return sendResponse(res, 'success', 'Login successful', {
            accessToken
        });

    } catch (error) {
        console.error('Error logging in:', error.message);
        return sendResponse(res, 'error', error.message, null, { code: 500 });
    }
};

export const refreshToken = async (req, res) => {
    const { refreshToken } = req.cookies; // Hoặc từ req.body nếu sử dụng POST

    if (!refreshToken) {
        return sendResponse(res, 'error', 'No refresh token provided', null, { code: 401 });
    }

    try {
        const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
        const user = await getUserByUserID(decoded.userID);
        const userID = user[0].id

        if (!user) {
            return sendResponse(res, 'error', 'Invalid refresh token', null, { code: 403 });
        }

        const newAccessToken = jwt.sign({ userID: userID }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '30m' });

        return sendResponse(res, 'success', 'Token refreshed', { accessToken: newAccessToken });

    } catch (error) {
        console.error('Error refreshing token:', error.message);
        return sendResponse(res, 'error', 'Error refreshing token', null, { code: 500 });
    }
};

// logout user
export const logoutUser = async (req, res) => {
    // delete cookies
    res.clearCookie('accessToken');
    res.clearCookie('refreshToken');
    return sendResponse(res, 'success', 'Logout Successfully');
}