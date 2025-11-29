import CartProductModel from "../models/cartProduct.model.js"
import UserModel from "../models/user.model.js"

export const addToCartItemController = async (req, res) => {
  try {
    const userId = req.userId;
    const { productId } = req.body;
   
    if(!userId){
        return res.status(400).json({
            message:"User not Found",
            success:false,
            error:true,         
        })
    }
    if(!productId){
        return res.status(400).json({
            message:"productId not Found",
            success:false,
            error:true,         
        })
    }

    const  cartItem = await CartProductModel.create({
         productId:productId,
         userId:userId
    })
      
    const updateCartUser = await  UserModel.updateOne({_id:userId},{
        $push:{
            shopping_cart:productId
        }
    })

    return res.status(201).json({
        message:"Item added successfully",
        error:false,
        success:true,
    })

  } catch (error) {
    console.log("Controller Error:", error);
    return res.status(500).json({
      message: error.message || "Internal Server Error",
      error: true,
      success: false,
    });
  }
};

export const getCartItemController = async(req,res)=>{
  try {
      const  userId = req.userId;

      if(!userId){
        return res.status(400).json({
          message:"provide UserID",
          error:true,
          success:false,
        })
      }

      const cartData = await CartProductModel.find({
        userId:userId
      }).populate('productId')

     if(!cartData){
        return res.status(400).json({
          message:"Data not found",
          error:true,
          success:false,
        })
      }

      return res.status(200).json({
         message:"Get cartData successfully",
         error:false,
         success:true,
         Data:cartData
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
