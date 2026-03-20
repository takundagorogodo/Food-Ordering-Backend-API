import express from "express";
import { protect } from "../middlewares/authMiddleware.js";
import { createRestaurantController ,deleteRestaurantByIdControler , getAllRestaurantController ,getRestaurantByIdController } from "../controllers/restaurantController.js";

const router = express.Router();

router.post('/createRestaurant',protect, createRestaurantController);
router.get('/getAllRestaurant',getAllRestaurantController);
router.get('/getRestaurant/:id',getRestaurantByIdController);
router.delete('/deleteRestaurant',protect,deleteRestaurantByIdControler);

export default router;
