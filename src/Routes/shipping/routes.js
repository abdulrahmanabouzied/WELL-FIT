import validator from "../../services/validator.service.js";
import uploader from "../../middlewares/uploader.js";
import { Router } from "express";
import authenticate from "../../services/auth.service.js";
import asyncHandler from "express-async-handler";
import shippingController from "../../controller/shipping.js";

const app = Router();

// Shipping Routes
app
  .route("/")
  .all(authenticate)
  .post(asyncHandler(shippingController.createShipping))
  .put(asyncHandler(shippingController.updateShipping))
  .get(asyncHandler(shippingController.getAllShippings));

app
  .route("/:id")
  .all(authenticate)
  .get(asyncHandler(shippingController.getShippingById))
  .delete(asyncHandler(shippingController.deleteShipping));

export default app;
