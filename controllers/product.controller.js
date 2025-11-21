import ProductModel from "../models/product.model.js";
import uploadImageCloudinary from "../utils/uploadImageCloudinary.js";

// export const createProductController = async (req, res) => {
//   try {
//     const {
//       name,
//       category,
//       subCategory,
//       unit,
//       stock,
//       price,
//       discount,
//       description,
//       more_detail
//     } = req.body;

//      const files = req.files || (req.file ? [req.file] : []);

//     if(!name || !category || !subCategory || !unit || !stock || !price || !description ){
//         return res.status(400).json({
//             message:"All fields required",
//             success:false,
//             error:true
//         })
//     }
//     console.log("fileData",files)
//     if (files.length == 0) {
//       return res.status(400).json({
//         success: false,
//         message: "atleast one image required",
       
//       });
//     }

   
//     const imageUrls = [];

//     for (const file of files) {
//       // uploadImageCloudinary(file) should return something like { url, public_id } or { secure_url, public_id }
//       const result = await uploadImageCloudinary(file);

//       if (!result) {
//         // if upload fails (null/undefined) abort and return error
//         return res.status(500).json({
//           success: false,
//           message: "Image upload failed for one of the files"
//         });
//       }

//       // accept either result.url or result.secure_url
//       const url = result.url || result.secure_url || result.secureUrl || result.secure_URL;
//       if (!url) {
//         return res.status(500).json({
//           success: false,
//           message: "Upload succeeded but no url returned from uploadImageCloudinary"
//         });
//       }

//       imageUrls.push(url);
//     }

//      const payload = {
//       name,
//       image: imageUrls,                   // array of strings (urls)
//       category,
//       subCategory,
//       unit,
//       stock,
//       price,
//       discount,
//       description,
//       more_detail,
//     };

//     const product = await ProductModel.create(payload)

//     return res.status(201).json({
//       success: true,
//       message: "Product created successfully",
//       data:product
//     });


//   } catch (error) {
//     console.error("Controller Error:", error);
//     return res.status(500).json({
//       message: error.message || "Internal Server Error",
//       error: true,
//       success: false,
//     });
//   }
// };


export const createProductController = async (req, res) => {
  try {
    const {
      name,
      category,
      subCategory,
      unit,
      stock,
      price,
      discount,
      description,
      more_detail
    } = req.body;

    // ---------- parse JSON-string fields (if frontend sent JSON.stringify)
    let categoryParsed = category;
    let subCategoryParsed = subCategory;
    let moreDetailParsed = more_detail;

    if (typeof category === "string") {
      try {
        categoryParsed = JSON.parse(category);
      } catch (e) {
        // keep original string if parse fails
        categoryParsed = category;
      }
    }

    if (typeof subCategory === "string") {
      try {
        subCategoryParsed = JSON.parse(subCategory);
      } catch (e) {
        subCategoryParsed = subCategory;
      }
    }

    if (typeof more_detail === "string") {
      try {
        moreDetailParsed = JSON.parse(more_detail);
      } catch (e) {
        moreDetailParsed = more_detail;
      }
    }
    // ---------- end parse

     const files = req.files || (req.file ? [req.file] : []);

    if(!name || !category || !subCategory || !unit || !stock || !price || !description ){
        return res.status(400).json({
            message:"All fields required",
            success:false,
            error:true
        })
    }
    console.log("fileData",files)
    if (files.length == 0) {
      return res.status(400).json({
        success: false,
        message: "atleast one image required",
       
      });
    }

   
    const imageUrls = [];

    for (const file of files) {
      const result = await uploadImageCloudinary(file);

      if (!result) {
        return res.status(500).json({
          success: false,
          message: "Image upload failed for one of the files"
        });
      }

      const url = result.url || result.secure_url || result.secureUrl || result.secure_URL;
      if (!url) {
        return res.status(500).json({
          success: false,
          message: "Upload succeeded but no url returned from uploadImageCloudinary"
        });
      }

      imageUrls.push(url);
    }

     const payload = {
      name,
      image: imageUrls,
      category: categoryParsed,     // <-- use parsed value
      subCategory: subCategoryParsed, // <-- use parsed value
      unit,
      stock,
      price,
      discount,
      description,
      more_detail: moreDetailParsed, // <-- use parsed value
    };

    const product = await ProductModel.create(payload)

    return res.status(201).json({
      success: true,
      message: "Product created successfully",
      data:product
    });


  } catch (error) {
    console.error("Controller Error:", error);
    return res.status(500).json({
      message: error.message || "Internal Server Error",
      error: true,
      success: false,
    });
  }
};
