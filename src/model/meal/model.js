import { Schema, model } from "mongoose";

const mealSchema = new Schema(
  {
    name: String,
    meal_type: {
      type: String,
      enum: ["breakfast", "lunch", "dinner", "snack"],
      required: true,
    },
    protein: Number,
    carbs: Number,
    fiber: Number,
    calories: Number,
    fats: Number,
    weight: Number,
    ingredients: [String],
    video: Object,
  },
  {
    timestamps: true,
  }
);

const Meal = model("Meals", mealSchema);

export default Meal;
