import MenuItem from "../models/menuItem.model.js";
import uploadCloudinary from "../utils/Cloudinary.js";

export const menuItemController = async (req, res) => {
    try {
        const { name, description, price, category, isVeg, isAvailable } = req.body;

        const newMenu = new MenuItem({
            name,
            description,
            price,
            category,
            isVeg,
            isAvailable,
            image: []
        });

        if (req.files && req.files.length > 0) {
            for (const file of req.files) {
                const imgUrl = await uploadCloudinary(file.path);
                newMenu.image.push(imgUrl);
            }
        }
        await newMenu.populate('category', 'categoryName -_id');

        await newMenu.save();

        res.status(200).json({
            success: true,
            message: 'MenuItem created successfully',
            data: newMenu
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: 'Server Error'
        });
    }
};

export const getMenuItemByIdController = async (req, res) => {
    try {
        const { id } = req.params
        const getMenu = await MenuItem.findById(id)
        if (!getMenu) {
            return res.status(400).json({
                success: false,
                message: 'item not foudn'
            })
        }
        return res.status(200).json({
            success: true,
            message: 'Menu Item',
            getMenu
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            success: false,
            message: "server error"
        })

    }
}

export const getAllMenuItemController = async (req, res) => {
    try {
        const getall = await MenuItem.find({}).populate('category', 'categoryName -_id')
        if (getall.length <= 0) {
            return res.status(400).json({
                success: false,
                message: 'item not availabel '
            })
        }
        res.status(200).json({
            success: true,
            message: 'Items are',
            getall
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            success: false,
            message: 'server error'
        })
    }
}