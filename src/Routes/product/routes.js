import validator from "../../services/validator.service.js";
import uploader from "../../middlewares/uploader.js";
import { Router } from "express";
import authenticate from "../../services/auth.service.js";
import asyncHandler from "express-async-handler";
import productController from "../../controller/product.js";

const app = Router();

// Product Routes
app
  .route("/")
  .all(authenticate)
  .post(asyncHandler(productController.createProduct))
  .put(asyncHandler(productController.updateProduct))
  .get(asyncHandler(productController.getAllProducts));

app
  .route("/:id")
  .all(authenticate)
  .get(asyncHandler(productController.getProductById))
  .delete(asyncHandler(productController.deleteProduct));

export default app;
