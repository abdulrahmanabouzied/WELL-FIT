import { Router } from "express";
import authenticate from "../../services/auth.service.js";
import asyncHandler from "express-async-handler";
import mealController from "../../controller/meal.js";
import uploader from "../../middlewares/uploader.js";
const upload = uploader("meals");

const app = Router();

// Meal Routes
app
  .route("/")
  .all(authenticate)
  .post(upload.single("video"), asyncHandler(mealController.createMeal))
  .put(upload.single("video"), asyncHandler(mealController.updateMeal))
  .get(asyncHandler(mealController.getAllMeals));

app
  .route("/:id")
  .all(authenticate)
  .get(asyncHandler(mealController.getMealById))
  .delete(asyncHandler(mealController.deleteMeal));

export default app;
