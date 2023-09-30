import authenticate from "../../services/auth.service.js";
import validator from "../../services/validator.service.js";
import uploader from "../../middlewares/uploader.js";
import { Router } from "express";
import asyncHandler from "express-async-handler";
import FeedbackController from "../../controller/feedback.js";
const app = Router();

app
  .route("/")
  .all(authenticate)
  .post(asyncHandler(FeedbackController.createFeedback))
  .put(asyncHandler(FeedbackController.updateFeedback))
  .get(asyncHandler(FeedbackController.getAllFeedbacks));

app
  .route("/:id")
  .all(authenticate)
  .get(asyncHandler(FeedbackController.getFeedbackById))
  .delete(asyncHandler(FeedbackController.deleteFeedback));

export default app;
