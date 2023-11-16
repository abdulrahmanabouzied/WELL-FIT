import mongoose from "mongoose";
import genHash from "../../utils/genHash.js";

const subscriptionsSchema = new mongoose.Schema({
  current: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Subscriptions",
  },
  prev: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Subscriptions",
    },
  ],
});

const programsSchema = new mongoose.Schema({
  current: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "ClientProgram",
  },
  prev: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Program",
    },
  ],
});

const clientSchema = new mongoose.Schema(
  {
    first_name: {
      type: String,
      required: true,
    },
    last_name: {
      type: String,
      required: true,
    },
    photo: {
      type: Object,
      default: {
        public_id: "data/defaults/jzy34esu9kochueiqtqs",
        format: "png",
        resource_type: "image",
        type: "upload",
        url: "https://res.cloudinary.com/dmhdwn3pq/image/upload/v1697317225/data/defaults/jzy34esu9kochueiqtqs.png",
        secure_url:
          "https://res.cloudinary.com/dmhdwn3pq/image/upload/f_auto,q_auto/v1/data/defaults/jzy34esu9kochueiqtqs",
        folder: "data/defaults",
      },
    },
    gender: {
      type: String,
      enum: ["male", "female"],
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    mobile_number: {
      type: Number,
    },
    coach: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Coach",
    },
    allow_notifications: {
      type: Boolean,
      default: true,
    },
    inbody: {
      type: Object,
    },
    birthdate: {
      type: Date,
    },
    subscriptions: subscriptionsSchema,
    program: programsSchema,
    activity_level: {
      type: String,
      enum: ["Inactive", "Lightly Active", "Very Active", "Moderately Active"],
    },
    fitness_level: {
      type: String,
      enum: ["Beginner", "Mid-level", "Professional"],
    },
    workout_days: {
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
    upComingMeeting: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Meeting",
    },
    matrices: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Matrices",
    },
    chat: mongoose.Schema.Types.ObjectId,
    active: { type: Boolean, default: false },
    socketId: String,
    role: {
      type: String,
      default: "coach",
    },
  },
  {
    timestamps: true,
  }
);

clientSchema.pre("save", async function (next) {
  try {
    this.password = await genHash(this.password);
    next();
  } catch (error) {
    console.log(error.message);
  }
});

const Client = mongoose.model("Clients", clientSchema);
export default Client;
