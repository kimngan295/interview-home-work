import express from 'express';
import cookieParser from 'cookie-parser';
import connectDB from './src/config/connectedDB.js';
import cors from 'cors';
import dotenv from 'dotenv';
import postRoutes from './src/routes/postRoutes.js';
import authRoutes from './src/routes/authRoutes.js';
import commentRoutes from './src/routes/commentRoutes.js';

dotenv.config();

const app = express();

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

// Khởi động server
const PORT = process.env.PORT || 5000;
const HOST_NAME = process.env.HOST_NAME || 'localhost';

app.listen(PORT, () => {
    console.log(`Server running at http://${HOST_NAME}:${PORT}/`);
});
