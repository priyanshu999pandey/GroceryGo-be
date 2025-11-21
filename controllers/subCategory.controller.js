import SubCategoryModel from "../models/subCategory.model.js";
import uploadImageCloudinary from "../utils/uploadImageCloudinary.js";

export const AddSubCategoryController = async (req, res) => {
  try {
    const { name, category } = req.body;
    const file = req.file;

    if (!name || !category || !file) {
      return res.status(400).json({
        message: "All fields shoul be filled",
        success: false,
        error: true,
      });
    }

    const uploadedImage = await uploadImageCloudinary(file);
    if (!uploadedImage || !uploadedImage.secure_url) {
      return res.status(500).json({
        message: "Image upload failed",
        error: true,
        success: false,
      });
    }

    const addSubCategory = await SubCategoryModel.create({
      name,
      image: uploadedImage.secure_url,
      category,
    });

    return res.status(201).json({
      message: "sub category Added successfuly",
      success: true,
      error: false,
      data: addSubCategory,
    });
  } catch (error) {
    console.log("Controller Error:", error);
    return res.status(500).json({
      message: error.message || "Internal Server Error",
      error: true,
      success: false,
    });
  }
};

export const fetchAllSubCategoryController = async (req, res) => {
  try {
    const fetchedData = await SubCategoryModel.find().populate('category');
    if (!fetchedData) {
      return res.status(400).json({
        message: "Failed to fetch sub categories",
        error: true,
        success: false,
      });
    }

    return res.status(200).json({
      message: "sub categories fetched Successsfully",
      error: false,
      success: true,
      data: fetchedData,
    });
  } catch (error) {
    console.log("Controller Error:", error);
    return res.status(500).json({
      message: error.message || "Internal Server Error",
      error: true,
      success: false,
    });
  }
};

export const updateSubCategoryController = async (req, res) => {
  try {
    const subcategoryId = req.params.id;

    const { name, category,image } = req.body;
    const file = req.file;
    console.log(req.body)
    console.log(req.file)

    if (!name || !category) {
      return res.status(400).json({
        message: "Name and category required",
        success: false,
        error: true,
      });
    }

    let imageUrl = image || "";

    if (file) {
      const upload = await uploadImageCloudinary(file);

      if (!upload) {
        return res.status(500).json({
          message: "image upload failed",
          success: false,
          error: true,
        });
      }
      imageUrl = upload.secure_url;
    }

    const upadateSubCategory = await SubCategoryModel.findByIdAndUpdate(
      subcategoryId,
      {
        name,
        image: imageUrl,
        category,
      },
      { new: true }
    );

    return res.status(200).json({
      message: "updated subCategory successfull",
      success: true,
      error: false,
      data:upadateSubCategory
    });
  } catch (error) {
      console.log("Controller Error:", error);
      return res.status(500).json({
        message: error.message || "Internal Server Error",
        error: true,
        success: false,
      });
   }
};

export const deleteSubCategoryController = async(req,res)=>{
  try {

    const subcategoryId = req.params.id

    const deleteSubCategory = await SubCategoryModel.findByIdAndDelete({_id:subcategoryId})

    if(!deleteSubCategory){
      return res.status(400).json({
        message:"failed to delete",
        success:false,
        error:true,
      })
    }

    return res.status(200).json({
      message:"deleted successfully",
      success:true,
      error:false,
      data:deleteSubCategory
    })
    
  } catch (error) {
     console.log("Controller Error:", error);
      return res.status(500).json({
        message: error.message || "Internal Server Error",
        error: true,
        success: false,
      });
  }
}
