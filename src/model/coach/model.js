import { Schema, model } from "mongoose";

const coachSchema = new Schema(
  {
    email: { type: String, required: true },
    password: { type: String, required: true },
    username: { type: String, required: true },
    role: {
      type: String,
      default: "coach",
    },
    birthdate: Date,
    photo: Object,
    socketId: String,
    first_name: { type: String, required: true },
    last_name: { type: String, required: true },
    clients: {
      type: [
        {
          type: Schema.Types.ObjectId,
          ref: "Clients",
        },
      ],
    },
    upComingMeetings: {
      type: [
        {
          type: Schema.Types.ObjectId,
          ref: "Meetings",
        },
      ],
    },
  },
  {
    timestamps: true,
  }
);

const Coach = model("Coaches", coachSchema);

export default Coach;
