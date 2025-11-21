import { Router } from "express";
import auth from "../middleware/auth.js";
import upload from "../middleware/multer.js";
import { createProductController } from "../controllers/product.controller.js";

const productRouter = Router()

productRouter.post("/add-product",auth,upload.array("image",10),createProductController)

export default productRouter