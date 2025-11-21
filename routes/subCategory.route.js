import {Router} from "express"
import auth from "../middleware/auth.js";
import upload from "../middleware/multer.js";

const subCategoryRouter = Router();
import { AddSubCategoryController, deleteSubCategoryController, fetchAllSubCategoryController, updateSubCategoryController } from "../controllers/subCategory.controller.js";

subCategoryRouter.post("/add-subCategory",auth,upload.single("image"),AddSubCategoryController)
subCategoryRouter.get("/fetch-subCategory",auth,fetchAllSubCategoryController)
subCategoryRouter.put("/update-subCategory/:id",auth,upload.single("image"),updateSubCategoryController)
subCategoryRouter.delete("/delete-subCategory/:id",auth,deleteSubCategoryController)

export default subCategoryRouter