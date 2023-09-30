import validator from "../../services/validator.service.js";
import uploader from "../../middlewares/uploader.js";
import { Router } from "express";
import authenticate from "../../services/auth.service.js";
import asyncHandler from "express-async-handler";
import orderController from "../../controller/order.js";

const app = Router();

// Order Routes
app
  .route("/")
  .all(authenticate)
  .post(asyncHandler(orderController.createOrder))
  .put(asyncHandler(orderController.updateOrder))
  .get(asyncHandler(orderController.getAllOrders));

app
  .route("/:id")
  .all(authenticate)
  .get(asyncHandler(orderController.getOrderById))
  .delete(asyncHandler(orderController.deleteOrder));

export default app;
