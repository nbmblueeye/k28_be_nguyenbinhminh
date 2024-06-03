import mongoose from "mongoose";

const UserSchema = mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
    },

    password: {
        type: String,
        required: true,
    },

    role: {
        type: String,
        required: true,
        default: 'user',
    }
}, { timeStame: true })

const User = mongoose.model('users', UserSchema);
export default User;