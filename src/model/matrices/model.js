import mongoose from "mongoose";

const weightSchema = new mongoose.Schema(
  {
    target: Number,
    current: Number,
    reminder: {
      type: [
        {
          type: String,
          enum: [
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday",
            "Saturday",
            "Sunday",
          ],
        },
      ],
    },
    prev: {
      type: new mongoose.Schema({
        weight: { type: Number, required: true },
        date: {
          type: Date,
          required: true,
          default: Date.now,
        },
      }),
      required: false,
    },
  },
  {
    timestamps: true,
  }
);

const matricesSchema = new mongoose.Schema(
  {
    weight: weightSchema,
    height: {
      type: Number,
    },
    BMI: Number,
    steps: Number,
    water: Number,
    calories: Number,
  },
  {
    timestamps: true,
  }
);

const Matrices = mongoose.model("Matrices", matricesSchema);
export default Matrices;
