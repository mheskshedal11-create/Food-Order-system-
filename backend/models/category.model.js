import mongoose from 'mongoose';

const categorySchema = new mongoose.Schema({
    categoryName: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    isActice: {
        type: Boolean,
        default: true
    },
    categoryImage: {
        type: String,
        default: 'Category.png'
    }
});

const Category = mongoose.model('Category', categorySchema);

export default Category;
