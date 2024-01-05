import express from 'express';
import { addOrdersItems, getMyOrders, getOrders, getRecentOrders } from '../controller/orderController.js';


const router = express.Router()


router.route('/').get(getOrders).post(addOrdersItems)
router.route('/my-orders/:id').get(getMyOrders)
router.route('/recent-orders').get(getRecentOrders)

export default router