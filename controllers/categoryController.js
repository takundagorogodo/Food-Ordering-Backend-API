import Category from "../models/categoryModel.js";

export const createCategoryController = async(req,res)=>{
     try {

        const { title , imageUrl } = req.body;

        if(!title){
            return res.status(400).json({
                success:false,
                message:"Please provide category title"
            });
        }
        
        const existingCategory = await Category.findOne({title});

        if(existingCategory){
            return res.status(409).json({
                success:false,
                message:"category with this title already exists"
            });
        }
        
        const category = await Category.create({
            title ,
            imageUrl : imageUrl || "https://via.placeholder.com/150"})
        
        res.status(201).json({
            success:true,
            message:"category created succesfully",
            category
        })

    } catch (error) {
        console.error(error);
        res.status(500).send({
            success:false,
            message:"Error in create CAT api",
            error: error.message
        })
     }
}

export const getAllCatController = async(req,res)=>{
    try {
        
        const categories = await  Category.find({});

        if(categories.length === 0){
            return res.status(404).json({
                success:false,
                message:"no categoty available"
            });
            
        }

        res.status(200).json({
            success:true,
            message:"category fetched succesfully",
            totalCount:categories.length,
            categories:categories
        })
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success:false,
            message:"failed to get All category"
        });
    }
}

export const deleteCatController = async(req,res)=>{
    try {

        const categoryId = req.params.id;

        if(!categoryId){
            return res.status(400).json({
                success:false,
                message:"provide category id"
            });
        }

        const category = await Category.findByIdAndDelete(
            categoryId,
            {isDeleted:true},
        {returnDocument:"after"}
    );
        
        if(!category){
            return res.status(404).json({
                success:false,
                message:"category for the provided category does not exist"
            });
        }

        res.status(200).json({
            success:true,
            message:"categoty deleted succesfully",
            deletedCategory:{
                id:category._id,
                title:category.title
            }
        });

    } catch (error) {
        console.error(error);

        if(error.name ==="CastError"){
            return res.status(400).json({
                success:false,
                message:"Invalid category id format"
            });
        }

        res.status(500).json({
            success:false,
            message:"failed  to delete category",
            error:error.message
        })
    }
}

export const updatecatController = async(req,res)=>{
    try {
        const categoryId = req.params.id;
        if(!categoryId){
            return res.status(400).json({
                success:false,
                message:"provide category id"
            });
        }

        const {title,imageUrl} = req.body;

        const category = await Category.findByIdAndUpdate(
            categoryId,
            {imageUrl,title},
             {
               returnDocument:"after",
               runValidators:true
             }
        ); 
        
        if(!category){
            return res.status(404).json({
                success:false,
                message:"category for the provided category does not exist"
            });
        }

        res.status(200).json({
            success:true,
            message:"categoty updated succesfully",
            category
        });

    } catch (error) {
        console.error(error);

        if(error.name ==="CastError"){
            return res.status(400).json({
                success:false,
                message:"Invalid category id format"
            });
        }

        res.status(500).json({
            success:false,
            message:"failed  to update category",
            error:error.message
        })
    }
}