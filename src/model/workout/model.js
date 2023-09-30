import { Schema, model } from "mongoose";

const workoutSchema = new Schema(
  {
    workout_name: String,
    video: Object,
    images: [Object],
    description: String,
    needed_tool: { name: String, image: Object },
    target_muscle: String,
    weight: Number,
    workout_details: {
      sets: Number,
      reps: Number,
      duration: Number,
    },
    calories_burned: Number,
    rest: Number,
  },
  {
    timestamps: true,
  }
);

const Workout = model("Workouts", workoutSchema);

export default Workout;
