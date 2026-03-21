import express from "express";
import { protect } from "../middlewares/authMiddleware.js";
import { getFoodController ,getAllFoodController,updateFoodController,deleteFoodController,createFoodController} from "../controllers/foodContoller.js";
import {orderStatusController,cancelOrderController, placeOrderController} from "../controllers/orderController.js"
import { admin } from "../middlewares/adminMiddleware.js";

const router = express.Router();

router.post('/',protect ,createFoodController);
router.delete('/:id',protect,deleteFoodController);
router.put('/:id',protect,updateFoodController);
router.get('/',getAllFoodController);
router.get('/:id',protect,getFoodController);
router.post('/',protect,placeOrderController);
router.delete('/:id',protect,cancelOrderController);
router.put('/:id',admin,orderStatusController);

export default router;
