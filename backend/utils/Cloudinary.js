import { v2 as Cloudinary } from 'cloudinary'
import fs from 'fs'
Cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
})

const uploadCloudinary = async (localpath) => {
    try {
        if (!localpath) return null
        const res = await Cloudinary.uploader.upload(localpath, {
            resource_type: 'auto'
        })
        return res
    } catch (error) {
        console.log(error)
        fs.unlinkSync(localpath)

    }
}

export default uploadCloudinary;