import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        select: false
    },
    phoneNumber: {
        type: String,
        required: true,
        unique: true,
        match: [/^\+9779[78]\d{8}$/, 'Invalid Nepal phone number']
    },
    profileImage: {
        type: String,
        default: 'https://static.vecteezy.com/system/resources/previews/021/548/095/original/default-profile-picture-avatar-user-avatar-icon-person-icon-head-icon-profile-picture-icons-default-anonymous-user-male-and-female-businessman-photo-placeholder-social-network-avatar-portrait-free-vector.jpg'
    },
    role: {
        type: String,
        enum: ['user', 'admin', 'Kitchen'],
        default: 'user'
    },
    resetOtp: {
        type: String
    },
    resetOtpExpire: {
        type: Date
    }
}, { timestamps: true });

const User = mongoose.model('User', userSchema);
export default User;
