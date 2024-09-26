import mongoose from 'mongoose';

// create schema for User
const commentSchema = new mongoose.Schema({
    owner: { type: mongoose.Schema.Types.ObjectId, required: true },
    post: { type: mongoose.Schema.Types.ObjectId, required: true }, 
    content: { type: String, required: true }, 
    created_at: { type: Date, default: Date.now },
}, { collection: 'comments' });  

export default mongoose.model('Comment', commentSchema);
