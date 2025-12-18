import { body, validationResult } from 'express-validator';

export const validateMenuItem = [
    body('name')
        .notEmpty().withMessage('Item Name is required')
        .bail()
        .trim()
        .isLength({ min: 1, max: 20 }).withMessage('Item Name should be 1 to 20 characters'),

    body('description')
        .notEmpty().withMessage('Description is required')
        .bail()
        .trim()
        .isLength({ max: 200 }).withMessage('Description should not exceed 200 characters'),

    body('price')
        .notEmpty().withMessage('Price is required')
        .bail()
        .isNumeric().withMessage('Price must be a number')
        .bail()
        .custom((value) => value > 0).withMessage('Price must be greater than 0'),

    body('category')
        .notEmpty().withMessage('Category is required')
        .bail()
        .isMongoId().withMessage('Category must be a valid MongoDB ID'),

    body('isVeg')
        .optional()
        .isBoolean().withMessage('isVeg must be a boolean'),

    body('isAvailable')
        .optional()
        .isBoolean().withMessage('isAvailable must be a boolean'),

    (req, res, next) => {
        if (!req.files || req.files.length === 0) {
            return res.status(400).json({
                success: false,
                errors: ['At least one image is required']
            });
        }
        next();
    }
];

export const ErrorValidate = (req, res, next) => {
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
