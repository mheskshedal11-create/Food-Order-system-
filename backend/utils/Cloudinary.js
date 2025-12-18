import { v2 as cloudinary } from 'cloudinary'
import fs from 'fs'

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
})

const uploadCloudinary = async (localFilePath) => {
    try {

        const result = await cloudinary.uploader.upload(localFilePath, {
            resource_type: 'auto',
            folder: 'profile',
        });

        fs.unlinkSync(localFilePath);

        return result.secure_url;

    } catch (error) {
        console.error('Cloudinary upload error:', error);
        if (fs.existsSync(localFilePath)) {
            fs.unlinkSync(localFilePath);
        }
        throw error;
    }
};

export default uploadCloudinary;