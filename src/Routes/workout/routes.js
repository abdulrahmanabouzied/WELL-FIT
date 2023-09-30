import validator from "../../services/validator.service.js";
import uploader from "../../middlewares/uploader.js";
import { Router } from "express";
import authenticate from "../../services/auth.service.js";
import asyncHandler from "express-async-handler";
import workoutController from "../../controller/workout.js";
const upload = uploader("workouts");

const app = Router();

// Workout Routes
app
  .route("/")
  .all(authenticate)
  .post(
    upload.fields([
      {
        name: "video",
        maxCount: 1,
      },
      {
        name: "images",
        maxCount: 5,
      },
    ]),
    asyncHandler(workoutController.createWorkout)
  )
  .put(
    upload.fields([
      {
        name: "video",
        maxCount: 1,
      },
      {
        name: "images",
        maxCount: 5,
      },
    ]),
    asyncHandler(workoutController.updateWorkout)
  )
  .get(asyncHandler(workoutController.getAllWorkouts));

app
  .route("/:id")
  .all(authenticate)
  .get(asyncHandler(workoutController.getWorkoutById))
  .delete(asyncHandler(workoutController.deleteWorkout));

export default app;
