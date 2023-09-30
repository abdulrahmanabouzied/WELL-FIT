import { Schema, model } from "mongoose";

const feedbackSchema = new Schema({
  overall_experience: {
    type: String,
    required: true,
  },
  areas_to_improve: {
    type: [
      {
        type: String,
        enum: [
          "Customer Service",
          "Slow loading",
          "Security issue",
          "Not functional",
          "Not responsive",
          "Navigation",
          "App crash",
        ],
      },
    ],
    required: true,
  },
});

const Feedback = model("Feedbacks", feedbackSchema);

export default Feedback;
