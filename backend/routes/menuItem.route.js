import express from 'express'
import { menuItemController } from '../controllers/menuItem.controller.js'
import { ErrorValidate, validateMenuItem } from '../validations/menuValidation.js'
import Upload from '../middleware/multer.middleware.js'


const menuItemRouter = express.Router()
menuItemRouter.post('/create', Upload.array('image', 5), validateMenuItem, ErrorValidate, menuItemController)

export default menuItemRouter