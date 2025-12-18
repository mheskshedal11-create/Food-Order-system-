import Category from "../models/category.model.js";
import uploadCloudinary from "../utils/Cloudinary.js";

export const categoryController = async (req, res) => {
    try {

        const { categoryName, description, isActice } = req.body
        console.log(req.body)
        const existingCategory = await Category.findOne({ categoryName })
        if (existingCategory) {
            return res.status(400).json({
                success: false,
                message: 'Category aready created '
            })
        }

        const newCategory = new Category({
            categoryName,
            description,
            isActice

        })
        if (req.file) {
            const image = await uploadCloudinary(req.file.path);
            newCategory.categoryImage = image;
        }
        await newCategory.save()
        res.status(200).json({
            success: true,
            message: 'Category create successfully',
            newCategory
        })

    } catch (error) {
        console.log(error)
        res.status(500).json({
            success: false,
            message: 'Server Error '
        })
    }
}

export const getCategoryByIdController = async (req, res) => {
    try {
        const { id } = req.params;

        const category = await Category.findOne({ _id: id });
        if (!category) {
            return res.status(404).json({
                success: false,
                message: "Category not found"
            });
        }

        res.status(200).json({
            success: true,
            data: category
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "Server error"
        });
    }
};

export const getAllCategoryController = async (req, res) => {
    try {
        const allCategory = await Category.find({})
        if (allCategory.length <= 0) {
            return res.status(400).json({
                success: false
            })
        }
        res.status(200).json({
            success: false,
            message: 'Category fetch Sucessfully',
            allCategory
        })
    } catch (error) {

    }
}