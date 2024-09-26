import mongoose from 'mongoose';

// Create schema for Post
const postSchema = new mongoose.Schema({
    owner: { type: mongoose.Schema.Types.ObjectId, required: true },  
    title: { type: String, required: true }, 
    content: { type: String, required: true }, 
    created_at: { type: Date, default: Date.now }, 
    tags: { type: [String] }, 
}, { collection: 'posts' }); 

export const Post = mongoose.model('Post', postSchema);


export async function getAllPostsDB(){
    try {
        const posts = await Post.find({});
        return posts;
    } catch (error) {
        console.error('Error getting posts from DB:', error);
        throw error;
    }
}