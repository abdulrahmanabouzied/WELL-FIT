import { Schema, model } from "mongoose";

const MeetingsSchema = new Schema(
  {
    coach: {
      type: Schema.Types.ObjectId,
      ref: "Coaches",
    },
    client: {
      type: Schema.Types.ObjectId,
      ref: "Clients",
    },
    date: Date,
    status: {
      type: Schema.Types.String,
      default: "pending",
      enum: ["pending", "approved", "cancelled", "done"],
    },
    url: String,
  },
  {
    timestamps: true,
  }
);

const Meeting = model("Meetings", MeetingsSchema);

export default Meeting;
