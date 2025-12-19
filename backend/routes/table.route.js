import express from 'express'
import { createTableController, updateTableController, deleteTableController } from '../controllers/table.controller.js'
import { authorizedRole, userAuthorization } from '../middleware/auth.middleware.js'

const tableRoute = express.Router()
tableRoute.post('/create', userAuthorization, authorizedRole('admin'), createTableController)
tableRoute.put('/table/:id', userAuthorization, authorizedRole('admin'), updateTableController)
tableRoute.delete('/table/:id', userAuthorization, authorizedRole('admin'), deleteTableController)

export default tableRoute