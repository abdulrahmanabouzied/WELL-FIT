import validator from "../../services/validator.service.js";
import uploader from "../../middlewares/uploader.js";
import { Router } from "express";
import authenticate from "../../services/auth.service.js";
import asyncHandler from "express-async-handler";
import chatController from "../../controller/chat.js";

const app = Router();

// Chat Routes
app
  .route("/")
  .all(authenticate)
  .post(asyncHandler(chatController.createChat))
  .put(asyncHandler(chatController.updateChat))
  .get(asyncHandler(chatController.getAllChats));

app
  .route("/:id")
  .all(authenticate)
  .get(asyncHandler(chatController.getChatById))
  .delete(asyncHandler(chatController.deleteChat));

export default app;
