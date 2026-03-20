import express from "express";
import categoryRoutes from "./categoryRoutes.js"
import restaurantRoutes from "./restaurantRoutes.js";
import  authRoutes from "./authRoutes.js";
import userRoutes from "./userRoutes.js";
import foodRoutes from "./foodRoutes.js"

const router = express.Router();


router.use('/auth/',authRoutes);
router.use('/user/',userRoutes);
router.use('/restaurant/',restaurantRoutes);
router.use('/category/',categoryRoutes);
router.use('/food/',foodRoutes);


export default router;