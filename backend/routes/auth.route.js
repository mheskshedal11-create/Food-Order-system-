import express from 'express';
import { forgotPasswordController, getUseProfileController, loginController, logOutController, registerController, resetPasswordController } from '../controllers/auth.controller.js';
import { authLogin, authRegister, authResetPassword, validate } from '../validations/authValidator.js';
import Upload from '../middleware/multer.middleware.js';
import { authorizedRole, userAuthorization } from '../middleware/auth.middleware.js';

const authRouter = express.Router();



authRouter.post('/register', Upload.single('profileImage'), authRegister, validate, authorizedRole('user', 'admin'), registerController);
authRouter.post('/login', authLogin, validate, loginController);
authRouter.post('/logout', logOutController);
authRouter.post('/forgot-password', forgotPasswordController)
authRouter.post('/reset-password', authResetPassword, validate, resetPasswordController)
authRouter.get('/get-profile', userAuthorization, getUseProfileController)

export default authRouter;