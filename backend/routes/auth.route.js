import express from 'express';
import { loginController, logOutController, registerController } from '../controllers/auth.controller.js';
import { authLogin, authRegister, validate } from '../validations/authValidator.js';
import Upload from '../middleware/multer.middleware.js';

const authRouter = express.Router();



authRouter.post('/register', Upload.single('profileImage'), authRegister, validate, registerController);
authRouter.post('/login', authLogin, validate, loginController);
authRouter.post('/logout', logOutController);

export default authRouter;