import { body, validationResult } from 'express-validator';

const validateFullName = body('fullName')
    .trim()
    .notEmpty().withMessage('FullName is required')
    .bail()
    .isLength({ min: 3, max: 20 }).withMessage('FullName should be 3-20 characters');

const validateEmail = body('email')
    .notEmpty().withMessage('Email is required')
    .bail()
    .isEmail().withMessage('Please enter a valid email')
    .normalizeEmail();

const validatePassword = body('password')
    .notEmpty().withMessage('Password is required')
    .bail()
    .isLength({ min: 6 }).withMessage('Password should be minimum 6 characters')
    .bail()
    .matches(/[A-Z]/).withMessage('Password must contain at least one uppercase letter')
    .bail()
    .matches(/[a-z]/).withMessage('Password must contain at least one lowercase letter')
    .bail()
    .matches(/[0-9]/).withMessage('Password must contain at least one number')
    .bail()
    .matches(/[@$!%*?&#]/).withMessage('Password must contain at least one symbol (@$!%*?&#)');
const validatenewPassword = body('newPassword')
    .notEmpty().withMessage('Password is required')
    .bail()
    .isLength({ min: 6 }).withMessage('Password should be minimum 6 characters')
    .bail()
    .matches(/[A-Z]/).withMessage('Password must contain at least one uppercase letter')
    .bail()
    .matches(/[a-z]/).withMessage('Password must contain at least one lowercase letter')
    .bail()
    .matches(/[0-9]/).withMessage('Password must contain at least one number')
    .bail()
    .matches(/[@$!%*?&#]/).withMessage('Password must contain at least one symbol (@$!%*?&#)');
const validatePhoneNumber = body('phoneNumber')
    .notEmpty().withMessage('Phone number is required')
    .bail()
    .matches(/^\+9779[78]\d{8}$/)
    .withMessage('Phone number must be a valid Nepal number starting with +977');


export const authRegister = [validateFullName, validateEmail, validatePhoneNumber, validatePassword];
export const authLogin = [validateEmail, validatePassword]
export const authResetPassword = [validatenewPassword]

export const validate = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const messages = errors.array().map(err => err.msg);
        return res.status(400).json({
            success: false,
            errors: messages
        });
    }
    next();
};