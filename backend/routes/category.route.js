import express from 'express'
import { categoryController, getCategoryByIdController, getAllCategoryController } from "../controllers/category.controller.js";
import { categoryValidation } from '../validations/authValidator.js';
import Upload from '../middleware/multer.middleware.js';
import { authorizedRole, userAuthorization } from '../middleware/auth.middleware.js';

const categoryRouter = express.Router()

categoryRouter.post('/create', Upload.single('categoryImage'), categoryValidation, userAuthorization, authorizedRole('admin'), categoryController)
categoryRouter.get('/category/:id', getCategoryByIdController)
categoryRouter.get('/allcategory', getAllCategoryController)


export default categoryRouter