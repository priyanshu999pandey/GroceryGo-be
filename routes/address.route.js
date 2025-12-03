import { Router } from "express";
import auth from "../middleware/auth.js";
import { addAddressController, deleteAddressController, fetchAddress, UpdateAddressController } from "../controllers/address.controller.js";
const addressRouter = Router();

addressRouter.post("/create",auth,addAddressController)
addressRouter.get("/get",auth,fetchAddress)
addressRouter.put("/update-address",auth,UpdateAddressController)
addressRouter.delete("/delete-address",auth,deleteAddressController)


export default addressRouter;