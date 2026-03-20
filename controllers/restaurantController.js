import Restaurant from "../models/restaurantModel.js"

export const deleteRestaurantByIdControler = async (req, res) => {
  try {

    const userId = req.user?.id;

    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "User not authenticated"
      });
    }

    const restaurant = await Restaurant.findOne({ user: userId });

    if (!restaurant) {
      return res.status(404).json({
        success: false,
        message: "You don't own any restaurant"
      });
    }

    await Restaurant.findByIdAndUpdate(
      restaurant._id,
      { isDeleted: true },
      { returnDocument: "after" }
    );

    res.status(200).json({
      success: true,
      message: "Restaurant deleted successfully",
      deleteRestaurant: {
        id: restaurant._id,
        title: restaurant.title
      }
    });

  } catch (error) {

    console.error(error);

    res.status(500).json({
      success: false,
      message: "Delete restaurant API failed"
    });

  }
};   

export const getRestaurantByIdController = async(req,res)=>{
    try {
        
        const restaurantId = req.params.id;

        if(!restaurantId){
            return res.status(404).json({
                success:false,
                message:"please provide Restaurant Id"
            });
        }

        const restaurant = await Restaurant.findById(restaurantId);
        
        if(!restaurant){
            return res.status(404).json({
                success:false,
                message:"restaurant with profided id not found"
            });
        }

        res.status(200).json({
               success:true,
               message:"restaurant fetched succesfully",
               restaurant
        });

    } catch (error) {
        console.error(error);

         if (error.name === "CastError") {
            return res.status(400).json({
                success: false,
                message: "Invalid restaurant ID format"
            });
        }

        res.status(500).json({
            success:"false",
            message:"failed to get restaurant by id"
        });
    }
}

export const getAllRestaurantController = async(req,res)=>{
    try {

        const restaurants = await Restaurant.find({});

        if(!restaurants){
            return res.status(404).json({
                success:false,
                message:"restaurant not found"
            });
        }

        res.status(200).json({
            success:true,
            message:"get Restaurant succesfully",
            totalCount:restaurants.length,
            restaurants
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({
            success:false,
            message:"error in getAllRestaurant contoller"
        });
    }
}

export const createRestaurantController = async (req, res) => {
    try {
        const {
            title,
            imageUrl,
            foods,
            time,
            pickup,
            delivery,
            isOpen,
            logoUrl,
            rating,
            ratingCount,
            code,
            coords,
        } = req.body;

        
        if (!title || !coords) {
            return res.status(400).json({ 
                success: false,
                message: "Please provide title and address/coords"
            });
        }

        
        const restaurant = await Restaurant.create({ 
            title,
            imageUrl,
            foods,
            time,
            pickup,
            delivery,
            isOpen,
            logoUrl,
            rating,
            ratingCount,
            code,
            coords,
            //user: req.user.id // Add the user who created it (from protect middleware)
        });

        
        res.status(201).json({
            success: true,
            message: "New restaurant created successfully",
            restaurant: restaurant ,
        });

    } catch (error) {
        console.error("Error in create restaurant controller:", error);
        res.status(500).json({
            success: false,
            message: "Error in create restaurant controller",
            error: error.message
        });
    }
};