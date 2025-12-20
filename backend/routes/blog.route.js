import express from 'express'
import { createBlogController } from '../controllers/blog.controller.js'
const blogRouter = express.Router()

blogRouter.post('/create', createBlogController)

export default blogRouter