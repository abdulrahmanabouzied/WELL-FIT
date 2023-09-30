import { Schema, model } from "mongoose";

const workoutsRef = new Schema({
  workout: {
    type: Schema.Types.ObjectId,
    ref: "Workouts",
  },
  is_done: { type: Boolean, default: false },
});

const nutritionRef = new Schema({
  meal: [
    {
      type: Schema.Types.ObjectId,
      ref: "Meals",
    },
  ],
  is_done: { type: Boolean, default: false },
});

const dayRef = new Schema({
  day: Date,
  workout: [workoutsRef],
  nutrition: [nutritionRef],
});

const program = new Schema({
  template: {
    type: Schema.Types.ObjectId,
    ref: "Programs",
    required: true,
  },
  start_date: {
    type: Schema.Types.Date,
    required: true,
  },
  end_date: {
    type: Schema.Types.Date,
  },
  length: { required: true, type: Schema.Types.Number },
  day_details: {
    type: [dayRef],
  },
});

const actionProgramSchema = new Schema(
  {
    program: {
      type: program,
    },
    is_done: Boolean,
  },
  {
    timestamps: true,
  }
);

const ActionProgram = model("ActionPrograms", actionProgramSchema);

export default ActionProgram;
