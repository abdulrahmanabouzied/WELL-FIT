import { Schema, model } from "mongoose";

const coachSchema = new Schema(
  {
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    username: { type: String, required: true },
    role: {
      type: String,
      default: "coach",
    },
    birthdate: Date,
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
    verifyCode: Number,
  },
  {
    timestamps: true,
  }
);

const Coach = model("Coaches", coachSchema);

export default Coach;
