import express from 'express'
import {
    createBlogController,
    getAllBlogsController,
    getBlogByIdController,
    updateBlogController,
    deleteBlogController,
    getMyBlogsController
} from '../controllers/blog.controller.js'
import { authorizedRole, userAuthorization } from '../middleware/auth.middleware.js'
import Upload from '../middleware/multer.middleware.js'

const blogRouter = express.Router()

blogRouter.post('/create', Upload.single('blogImage'), userAuthorization, authorizedRole('Kitchen'), createBlogController)
blogRouter.get('/all', getAllBlogsController)
blogRouter.get('/my-blogs', userAuthorization, authorizedRole('Kitchen'), getMyBlogsController)
blogRouter.get('/:id', getBlogByIdController)
blogRouter.put('/:id', Upload.single('blogImage'), userAuthorization, authorizedRole('Kitchen'), updateBlogController)
blogRouter.delete('/:id', userAuthorization, authorizedRole('Kitchen'), deleteBlogController)

export default blogRouter