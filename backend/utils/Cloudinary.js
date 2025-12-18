import { v2 as cloudinary } from "cloudinary";
import fs from "fs/promises";

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploadCloudinary = async (localFilePath, folder) => {
    const filePath = localFilePath.replace(/\\/g, "/");

    try {
        const result = await cloudinary.uploader.upload(filePath, {
            resource_type: "image",
            folder,
        });
        await fs.unlink(filePath);
        return result.secure_url;
    } catch (error) {
        try { await fs.unlink(filePath); } catch { }
        throw error;
    }
};

export default uploadCloudinary;
