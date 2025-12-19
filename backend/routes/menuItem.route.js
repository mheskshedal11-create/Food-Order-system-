import express from 'express'
import { getAllMenuItemController, getMenuItemByIdController, menuItemController } from '../controllers/menuItem.controller.js'
import { ErrorValidate, validateMenuItem } from '../validations/menuValidation.js'
import Upload from '../middleware/multer.middleware.js'
import { authorizedRole, userAuthorization } from '../middleware/auth.middleware.js'


const menuItemRouter = express.Router()
menuItemRouter.post('/create', Upload.array('image', 5), validateMenuItem, ErrorValidate, userAuthorization, authorizedRole('admin'), menuItemController)
menuItemRouter.get('/menuItem/:id', getMenuItemByIdController)
menuItemRouter.get('/menuitem', getAllMenuItemController)

export default menuItemRouter