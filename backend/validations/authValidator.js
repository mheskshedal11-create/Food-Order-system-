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

const validateNewPassword = body('newPassword')
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

const validateOtp = body('otp')
    .notEmpty().withMessage('OTP is required')
    .bail()
    .isLength({ min: 4, max: 4 }).withMessage('OTP must be 4 digits')
    .bail()
    .isNumeric().withMessage('OTP must contain only numbers');

const validationCategoryName = body('categoryName')
    .notEmpty().withMessage('Category is required')
    .bail()
    .isLength({ min: 3, max: 20 }).withMessage('Category name must be between 3 and 20 characters');

const validationDescription = body('description')
    .notEmpty().withMessage('Description is required')
    .bail()
    .isLength({ min: 3, max: 150 }).withMessage('Description must be between 3 and 150 characters');

export const validate = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            success: false,
            message: 'Validation failed',
            errors: errors.array().map(err => ({
                field: err.path,
                message: err.msg
            }))
        });
    }
    next();
};

export const authRegister = [validateFullName, validateEmail, validatePhoneNumber, validatePassword];
export const authLogin = [validateEmail, validatePassword];
export const authResetPassword = [validateEmail, validateOtp, validateNewPassword];
export const authForgotPassword = [validateEmail];
export const categoryValidation = [validationCategoryName, validationDescription];

