import validator from "../../services/validator.service.js";
import uploader from "../../middlewares/uploader.js";
import { Router } from "express";
import authenticate from "../../services/auth.service.js";
import asyncHandler from "express-async-handler";
import subscriptionController from "../../controller/subscription.js";

const app = Router();

// Subscription Routes
app
  .route("/")
  .all(authenticate)
  .post(asyncHandler(subscriptionController.createSubscription))
  .put(asyncHandler(subscriptionController.updateSubscription))
  .get(asyncHandler(subscriptionController.getAllSubscriptions));

app
  .route("/:id")
  .all(authenticate)
  .get(asyncHandler(subscriptionController.getSubscriptionById))
  .delete(asyncHandler(subscriptionController.deleteSubscription));

export default app;
