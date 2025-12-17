import multer from 'multer'
import { v4 as uuidv4 } from 'uuid';

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, '/temp/profile')
    },
    filename: function (req, file, cb) {
        const uniqueName = uuidv4() + path.extname(file.originalname);
        cb(null, uniqueName)
    }
})

const fileFilter = (req, file, cb) => {
    const allowedTypes = /jpeg|jpg|png|gif/;
    const isValidType = allowedTypes.test(path.extname(file.originalname).toLowerCase()) &&
        allowedTypes.test(file.mimetype);

    if (isValidType) cb(null, true);
    else cb(new Error('Only images are allowed'), false);
};

const Upload = multer({
    storage,
    fileFilter,
    limits: {
        fileSize: 5 * 1024 * 1024
    }
})

export default Upload