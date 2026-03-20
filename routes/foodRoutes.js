import express from "express";
import { protect } from "../middlewares/authMiddleware.js";
import { getFoodController ,getAllFoodController,updateFoodController,deleteFoodController,createFoodController} from "../controllers/foodContoller.js";
import {orderStatusController,cancelOrderController, placeOrderController} from "../controllers/orderController.js"
import { admin } from "../middlewares/adminMiddleware.js";

const router = express.Router();

router.post('/create',protect ,createFoodController);
router.delete('/delete/:id',protect,deleteFoodController);
router.put('/update/:id',protect,updateFoodController);
router.get('/all',getAllFoodController);
router.get('/one/:id',protect,getFoodController);
router.post('/placeorder',protect,placeOrderController);
router.delete('/cancel/:id',protect,cancelOrderController);
router.put('/orderStatus/:id',admin,orderStatusController);

export default router;