import mongoose from 'mongoose'

const blogSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        required: true
    },
    tag: {
        type: [String],
        required: true
    },
    blogImage: {
        type: String,
        default: 'https://via.placeholder.com/800x400?text=Blog+Image'
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    status: {
        type: String,
        enum: ['draft', 'published'],
        default: 'published'
    },
}, { timestamps: true })

const Blog = mongoose.model('Blog', blogSchema)

export default Blog