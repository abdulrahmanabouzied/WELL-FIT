import validator from "../../services/validator.service.js";
import uploader from "../../middlewares/uploader.js";
import { Router } from "express";
import authenticate from "../../services/auth.service.js";
import asyncHandler from "express-async-handler";
import programController from "../../controller/program.js";
import programSchema from "./../../validation/Program/update.validation.js";
import programUpdateSchema from "./../../validation/Program/update.validation.js";

const app = Router();

// Program Routes
app
  .route("/")
  .all(authenticate)
  .post(validator(programSchema), asyncHandler(programController.createProgram))
  .put(
    validator(programUpdateSchema),
    asyncHandler(programController.updateProgram)
  )
  .patch(asyncHandler(programController.addData))
  .get(asyncHandler(programController.getAllPrograms));

app
  .route("/:id")
  .all(authenticate)
  .get(asyncHandler(programController.getProgramById))
  .delete(asyncHandler(programController.deleteProgram));

export default app;
