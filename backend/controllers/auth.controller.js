import User from "../models/auth.model.js";
import uploadCloudinary from "../utils/Cloudinary.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken'
import crypto from 'crypto'

export const registerController = async (req, res) => {
    try {
        const { fullName, email, password, phoneNumber, role } = req.body;

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({
                success: false,
                message: 'Email already exists'
            });
        }

        const hashPassword = await bcrypt.hash(password, 10);

        const newUser = new User({
            fullName,
            email,
            password: hashPassword,
            phoneNumber,
            role: role || 'user',
        });

        if (req.file) {
            const profileImage = await uploadCloudinary(req.file.path);
            newUser.profileImage = profileImage;
        }

        await newUser.save();

        const user = newUser.toObject();
        delete user.password;

        res.status(201).json({
            success: true,
            message: 'User registered successfully',
            user
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: 'Internal Server Error'
        });
    }
};

export const loginController = async (req, res) => {
    try {
        const { email, password } = req.body;

        const existingUser = await User.findOne({ email }).select("+password");
        if (!existingUser) {
            return res.status(400).json({
                success: false,
                message: 'Invalid email or password'
            });
        }

        const comparePassword = await bcrypt.compare(password, existingUser.password);
        if (!comparePassword) {
            return res.status(400).json({
                success: false,
                message: 'Invalid email or password'
            });
        }

        const token = jwt.sign(
            { userId: existingUser._id, role: existingUser.role },
            process.env.JWT_SECRET,
            { expiresIn: '7d' }
        );

        res.cookie('token', token, {
            maxAge: 7 * 24 * 60 * 60 * 1000,
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict'
        });

        const user = existingUser.toObject();
        delete user.password;

        res.status(200).json({
            success: true,
            message: 'Login successfully',
            user,
            token
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: 'Internal Server Error'
        });
    }
};

export const logOutController = async (req, res) => {
    try {
        await res.clearCookie('token')
        res.status(200).json({
            success: true,
            message: "Logout Successfully"
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            success: false,
            message: 'Internal Server Error'
        });
    }
}

export const forgotPasswordController = async (req, res) => {
    try {
        const { email } = req.body
        const user = await User.findOne({ email })
        if (!user) {
            return res.status(400).json({
                success: false,
                message: "Please provide Correct Email"
            })
        }

        const otp = (Math.floor(Math.random() * 9000) + 1000).toString()
        const hashOtp = crypto.createHash('sha256').update(otp).digest('hex')
        user.resetOtp = hashOtp
        user.resetOtpExpire = Date.now() + 10 * 60 * 1000
        await user.save()
        console.log('OTP IS', otp)
        res.status(200).json({
            success: true,
            message: 'OTP send successfully',
            otp
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Server error"
        });
    }
}

export const resetPasswordController = async (req, res) => {
    try {
        const { email, otp, newPassword } = req.body
        const hashOtp = crypto.createHash('sha256').update(otp).digest('hex')

        const user = await User.findOne({
            email,
            resetOtp: hashOtp,
            resetOtpExpire: { $gt: Date.now() }
        }).select('+password')

        if (!user) {
            return res.status(400).json({
                success: false,
                message: "Invalid or expired OTP"
            });
        }

        user.password = await bcrypt.hash(newPassword, 10);
        user.resetOtp = undefined;
        user.resetOtpExpire = undefined;

        await user.save();

        res.status(200).json({
            success: true,
            message: "Password reset successfully"
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Server error"
        });
    }
}

export const getUseProfileController = async (req, res) => {
    try {
        const userId = req.user._id

        const user = await User.findById(userId)
        if (!user) {
            return res.status(400).json({
                success: false,
                message: "User not found"
            })
        }
        res.status(200).json({
            success: true,
            message: 'profile fetch successfully',
            user
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Internal Server Error'
        });
    }
}

export const createKitchenController = async (req, res) => {
    try {
        const { fullName, email, password, phoneNumber } = req.body;

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({
                success: false,
                message: 'Email already exists'
            });
        }

        const hashPassword = await bcrypt.hash(password, 10);

        const newUser = new User({
            fullName,
            email,
            password: hashPassword,
            phoneNumber,
            role: 'Kitchen'
        });

        if (req.file) {
            const profileImage = await uploadCloudinary(req.file.path);
            newUser.profileImage = profileImage;
        }

        await newUser.save();

        const user = newUser.toObject();
        delete user.password;

        res.status(201).json({
            success: true,
            message: 'Kitchen user created successfully',
            user
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: 'Internal Server Error'
        });
    }
};