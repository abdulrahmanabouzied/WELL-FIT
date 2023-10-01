import { Schema, model } from "mongoose";

const workoutsRef = new Schema({
  workout: {
    type: Schema.Types.ObjectId,
    ref: "Workouts",
  },
  is_done: { type: Boolean, default: false },
});

const nutritionRef = new Schema({
  meal: {
    type: Schema.Types.ObjectId,
    ref: "Meals",
  },
  is_done: { type: Boolean, default: false },
});

const dayRef = new Schema({
  order: { type: Number },
  day: Date,
  workout: [workoutsRef],
  nutrition: [nutritionRef],
});

const programSchema = new Schema(
  {
    name: String,
    made_by: {
      type: Schema.Types.ObjectId,
      ref: "Coaches",
    },
    length: { type: Number, required: true },
    target: {
      type: Schema.Types.String,
      enum: [
        "Loss Weight",
        "A Healthy Lifestyle",
        "Gain Weight",
        "Build Muscles",
      ],
    },
    days_detail: [dayRef],
    clients: [
      {
        type: Schema.Types.ObjectId,
        ref: "Clients",
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Program = model("Programs", programSchema);

export default Program;
