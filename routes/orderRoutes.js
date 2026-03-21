import express from "express";
import { protect } from "../middlewares/authMiddleware.js";
import {orderStatusController,cancelOrderController, placeOrderController} from "../controllers/orderController.js"
import { admin } from "../middlewares/adminMiddleware.js";

const router = express.Router();


router.post('/',protect,placeOrderController);
router.delete('/:id',protect,cancelOrderController);
router.put('/:id',admin,orderStatusController);

export default router;