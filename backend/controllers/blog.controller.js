import Blog from '../models/blog.model.js'
import uploadCloudinary from '../utils/Cloudinary.js'

export const createBlogController = async (req, res) => {
    try {
        const { title, description, tag, user, status } = req.body

        const arrTag = Array.isArray(tag)
            ? tag
            : tag.split(',').map(tg => tg.trim())

        const newBlog = await Blog.create({
            title,
            description,
            tag: arrTag,
            user,
            status
        })

        if (req.file) {
            const imageUrl = await uploadCloudinary(req.file.filename)
            newBlog.blogImage = imageUrl
            await newBlog.save()
        }

        await newBlog.populate('user', 'fullName -_id')


        res.status(201).json({
            success: true,
            message: 'Blog created successfully',
            data: newBlog
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            success: false,
            message: 'Blog cannot be created'
        })
    }
}
