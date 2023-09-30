import validator from "../../services/validator.service.js";
import uploader from "../../middlewares/uploader.js";
import { Router } from "express";
import authenticate from "../../services/auth.service.js";
import asyncHandler from "express-async-handler";
import cartController from "../../controller/cart.js";

const app = Router();

// Cart Routes
app
  .route("/")
  .all(authenticate)
  .post(asyncHandler(cartController.createCart))
  .put(asyncHandler(cartController.updateCart))
  .get(asyncHandler(cartController.getAllCarts));

app
  .route("/:id")
  .all(authenticate)
  .get(asyncHandler(cartController.getCartById))
  .delete(asyncHandler(cartController.deleteCart));

export default app;
