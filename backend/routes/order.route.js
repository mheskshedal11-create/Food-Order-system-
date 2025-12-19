import express from 'express'

import { createOrderController } from '../controllers/order.controller.js'

const orderRoute = express.Router()
orderRoute.post('/create', createOrderController)

export default orderRoute