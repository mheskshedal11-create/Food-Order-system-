import Blog from '../models/blog.model.js'
import uploadCloudinary from '../utils/Cloudinary.js'

export const createBlogController = async (req, res) => {
    try {
        const { title, description, tag, status } = req.body
        const userId = req.user._id

        // Handle tag validation and conversion
        let arrTag = []
        if (tag) {
            arrTag = Array.isArray(tag)
                ? tag
                : tag.split(',').map(tg => tg.trim())
        }

        const newBlog = new Blog({
            title,
            description,
            tag: arrTag,
            user: userId,
            status: status || 'published'
        })

        if (req.file) {
            const imageUrl = await uploadCloudinary(req.file.path)
            newBlog.blogImage = imageUrl
        }

        await newBlog.save()
        await newBlog.populate('user', 'fullName email -_id')

        res.status(201).json({
            success: true,
            message: 'Blog created successfully',
            data: newBlog
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            success: false,
            message: 'Blog cannot be created',
            error: error.message
        })
    }
}

export const getAllBlogsController = async (req, res) => {
    try {
        const blogs = await Blog.find({ status: 'published' })
            .populate('user', 'fullName email profileImage')
            .sort({ createdAt: -1 })

        res.status(200).json({
            success: true,
            message: 'Blogs fetched successfully',
            count: blogs.length,
            data: blogs
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            success: false,
            message: 'Failed to fetch blogs',
            error: error.message
        })
    }
}

export const getBlogByIdController = async (req, res) => {
    try {
        const { id } = req.params
        const blog = await Blog.findById(id).populate('user', 'fullName email profileImage')

        if (!blog) {
            return res.status(404).json({
                success: false,
                message: 'Blog not found'
            })
        }

        res.status(200).json({
            success: true,
            message: 'Blog fetched successfully',
            data: blog
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            success: false,
            message: 'Failed to fetch blog',
            error: error.message
        })
    }
}

export const updateBlogController = async (req, res) => {
    try {
        const { id } = req.params
        const { title, description, tag, status } = req.body
        const userId = req.user._id

        const blog = await Blog.findById(id)

        if (!blog) {
            return res.status(404).json({
                success: false,
                message: 'Blog not found'
            })
        }

        if (blog.user.toString() !== userId.toString()) {
            return res.status(403).json({
                success: false,
                message: 'You are not authorized to update this blog'
            })
        }

        if (title) blog.title = title
        if (description) blog.description = description
        if (tag) {
            blog.tag = Array.isArray(tag) ? tag : tag.split(',').map(tg => tg.trim())
        }
        if (status) blog.status = status

        if (req.file) {
            const imageUrl = await uploadCloudinary(req.file.path)
            blog.blogImage = imageUrl
        }

        await blog.save()
        await blog.populate('user', 'fullName email')

        res.status(200).json({
            success: true,
            message: 'Blog updated successfully',
            data: blog
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            success: false,
            message: 'Failed to update blog',
            error: error.message
        })
    }
}

export const deleteBlogController = async (req, res) => {
    try {
        const { id } = req.params
        const userId = req.user._id

        const blog = await Blog.findById(id)

        if (!blog) {
            return res.status(404).json({
                success: false,
                message: 'Blog not found'
            })
        }

        if (blog.user.toString() !== userId.toString()) {
            return res.status(403).json({
                success: false,
                message: 'You are not authorized to delete this blog'
            })
        }

        await Blog.findByIdAndDelete(id)

        res.status(200).json({
            success: true,
            message: 'Blog deleted successfully'
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            success: false,
            message: 'Failed to delete blog',
            error: error.message
        })
    }
}

export const getMyBlogsController = async (req, res) => {
    try {
        const userId = req.user._id

        const blogs = await Blog.find({ user: userId })
            .populate('user', 'fullName email profileImage')
            .sort({ createdAt: -1 })

        res.status(200).json({
            success: true,
            message: 'Your blogs fetched successfully',
            count: blogs.length,
            data: blogs
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            success: false,
            message: 'Failed to fetch your blogs',
            error: error.message
        })
    }
}