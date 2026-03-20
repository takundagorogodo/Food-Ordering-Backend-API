import Food from "../models/foodModel.js";


// ✅ CREATE FOOD
export const createFoodController = async (req, res) => {
    try {
        const { title, description, price, category } = req.body;

        if (!title || !description || !price || !category) {
            return res.status(400).json({
                success: false,
                message: "Please provide all required fields",
                data: null
            });
        }

        const food = await Food.create({
            title,
            description,
            price,
            category
        });

        res.status(201).json({
            success: true,
            message: "Food item created successfully",
            data: food
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "Failed to create food item",
            data: error.message
        });
    }
};


// ✅ UPDATE FOOD
export const updateFoodController = async (req, res) => {
    try {
        const foodId = req.params.id;

        if (!foodId) {
            return res.status(400).json({
                success: false,
                message: "Food ID is required",
                data: null
            });
        }

        const updatedFood = await Food.findByIdAndUpdate(
            foodId,
            { ...req.body },
            { new: true, runValidators: true }
        );

        if (!updatedFood) {
            return res.status(404).json({
                success: false,
                message: "Food item not found",
                data: null
            });
        }

        res.status(200).json({
            success: true,
            message: "Food item updated successfully",
            data: updatedFood
        });

    } catch (error) {
        console.error(error);

        if (error.name === "CastError") {
            return res.status(400).json({
                success: false,
                message: "Invalid food ID",
                data: null
            });
        }

        res.status(500).json({
            success: false,
            message: "Failed to update food item",
            data: error.message
        });
    }
};


// ✅ DELETE FOOD
export const deleteFoodController = async (req, res) => {
    try {
        const foodId = req.params.id;

        if (!foodId) {
            return res.status(400).json({
                success: false,
                message: "Food ID is required",
                data: null
            });
        }

        const deletedFood = await Food.findByIdAndDelete(foodId);

        if (!deletedFood) {
            return res.status(404).json({
                success: false,
                message: "Food item not found",
                data: null
            });
        }

        res.status(200).json({
            success: true,
            message: "Food item deleted successfully",
            data: deletedFood
        });

    } catch (error) {
        console.error(error);

        if (error.name === "CastError") {
            return res.status(400).json({
                success: false,
                message: "Invalid food ID",
                data: null
            });
        }

        res.status(500).json({
            success: false,
            message: "Failed to delete food item",
            data: error.message
        });
    }
};


// ✅ GET ALL FOOD
export const getAllFoodController = async (req, res) => {
    try {
        const foodItems = await Food.find({});

        if (foodItems.length === 0) {
            return res.status(404).json({
                success: false,
                message: "No food items found",
                data: []
            });
        }

        res.status(200).json({
            success: true,
            message: "Food items fetched successfully",
            data: {
                totalCount: foodItems.length,
                foods: foodItems
            }
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "Failed to fetch food items",
            data: error.message
        });
    }
};


// ✅ GET SINGLE FOOD
export const getFoodController = async (req, res) => {
    try {
        const foodId = req.params.id;

        if (!foodId) {
            return res.status(400).json({
                success: false,
                message: "Food ID is required",
                data: null
            });
        }

        const food = await Food.findById(foodId);

        if (!food) {
            return res.status(404).json({
                success: false,
                message: "Food item not found",
                data: null
            });
        }

        res.status(200).json({
            success: true,
            message: "Food item fetched successfully",
            data: food
        });

    } catch (error) {
        console.error(error);

        if (error.name === "CastError") {
            return res.status(400).json({
                success: false,
                message: "Invalid food ID",
                data: null
            });
        }

        res.status(500).json({
            success: false,
            message: "Failed to fetch food item",
            data: error.message
        });
    }
};