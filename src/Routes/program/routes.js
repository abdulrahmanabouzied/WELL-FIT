import validator from "../../services/validator.service.js";
import uploader from "../../middlewares/uploader.js";
import { Router } from "express";
import authenticate from "../../services/auth.service.js";
import asyncHandler from "express-async-handler";
import programController from "../../controller/program.js";

const app = Router();

// Program Routes
app
  .route("/")
  .all(authenticate)
  .post(asyncHandler(programController.createProgram))
  .put(asyncHandler(programController.updateProgram))
  .get(asyncHandler(programController.getAllPrograms));

app
  .route("/:id")
  .all(authenticate)
  .get(asyncHandler(programController.getProgramById))
  .delete(asyncHandler(programController.deleteProgram));

export default app;
