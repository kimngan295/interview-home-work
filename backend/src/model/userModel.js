import mongoose from 'mongoose';

// Create schema for User
const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true }, 
    name: { type: String, required: true },
    dob: { type: String },
    created_at: { 
        type: Date, 
        default: Date.now 
    }
}, { collection: 'users', versionKey: false });

export const User = mongoose.model('User', userSchema);

// Function create new user
export async function createUser(data){
    try {
        const user = await User.create(data);
        return user;
    } catch (error) {
        throw new Error(error.message);
    }
}

// Function find user by username
export async function findUserByUsername(username){
    try {
        const user = await User.findOne({
            username: username
        });
        return user;
    } catch (error) {
        throw new Error(error.message)
    }
}