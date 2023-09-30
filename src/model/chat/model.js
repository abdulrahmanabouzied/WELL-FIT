import { Schema, model } from "mongoose";

const ChatsSchema = new Schema(
  {
    coach: {
      type: Schema.Types.ObjectId,
      ref: "Coaches",
    },
    client: {
      type: Schema.Types.ObjectId,
      ref: "Clients",
    },
    messages: [
      {
        type: new Schema({
          text: String,
          file: Object,
          createdAt: {
            type: Date,
            default: Date.now,
          },
        }),
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Chat = model("Chats", ChatsSchema);

export default Chat;
