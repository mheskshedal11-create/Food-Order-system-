import express from 'express'
import { createTableController } from '../controllers/table.controller.js'
import { authorizedRole, userAuthorization } from '../middleware/auth.middleware.js'

const tableRoute = express.Router()
tableRoute.post('/create', userAuthorization, authorizedRole('admin'), createTableController)

export default tableRoute