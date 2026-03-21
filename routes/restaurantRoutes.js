import express from "express";
import { protect } from "../middlewares/authMiddleware.js";
import { createRestaurantController ,deleteRestaurantByIdControler , getAllRestaurantController ,getRestaurantByIdController } from "../controllers/restaurantController.js";

const router = express.Router();

router.post('/',protect, createRestaurantController);
router.get('/',getAllRestaurantController);
router.get('/:id',getRestaurantByIdController);
router.delete('/:id',protect,deleteRestaurantByIdControler);

export default router;
