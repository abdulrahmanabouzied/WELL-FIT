import { Router } from "express";
import validator from "../../services/validator.service.js";
import authenticate from "../../services/auth.service.js";
import asyncHandler from "express-async-handler";
import actionProgramController from "../../controller/action.program.js";
import uploader from "../../middlewares/uploader.js";

const app = Router();

// ActionProgram Routes
app
  .route("/")
  .all(authenticate)
  .post(asyncHandler(actionProgramController.createActionProgram))
  .put(asyncHandler(actionProgramController.updateActionProgram))
  .get(asyncHandler(actionProgramController.getAllActionPrograms));

app
  .route("/:id")
  .all(authenticate)
  .get(asyncHandler(actionProgramController.getActionProgramById))
  .delete(asyncHandler(actionProgramController.deleteActionProgram));

export default app;
