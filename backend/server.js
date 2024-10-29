import express from 'express';
import cookieParser from 'cookie-parser';
import connectDB from './src/config/connectedDB.js';
import cors from 'cors';
import dotenv from 'dotenv';
import postRoutes from './src/routes/postRoutes.js';
import authRoutes from './src/routes/authRoutes.js';
import commentRoutes from './src/routes/commentRoutes.js';
import session from 'express-session';
import passport from 'passport';
import './src/config/passportConfig.js';
import authGoogleRoutes from './src/routes/authGoogleRoutes.js';

dotenv.config();

const app = express();

// set up session to login with google
app.use(session({
    secret: '94b0a936dc9b2e980e73c0f8fdd11930045488eb2efa31ac52d1e688bb28a092',
    resave: false,
    saveUninitialized: true,
}));

// Khởi tạo Passport
app.use(passport.initialize());
app.use(passport.session());

// Kết nối MongoDB
connectDB();

// Middleware
app.use(cors());
app.use(express.json());
app.use(cookieParser());


// Routes
// app.use('/api/auth', authRoutes); 

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.use('/posts', postRoutes);
app.use('/users', authRoutes);
app.use('/comments', commentRoutes);
app.use('/auth', authGoogleRoutes);

// Khởi động server
const PORT = process.env.PORT || 5000;
const HOST_NAME = process.env.HOST_NAME || 'localhost';

app.listen(PORT, () => {
    console.log(`Server running at http://${HOST_NAME}:${PORT}/`);
});
