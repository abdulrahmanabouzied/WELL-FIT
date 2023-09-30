import { Schema, model } from "mongoose";

const cartSchema = new Schema(
  {
    client: {
      type: Schema.Types.ObjectId,
      ref: "Clients",
    },
    products: [
      {
        type: new Schema({
          product: {
            type: Schema.Types.ObjectId,
            ref: "Products",
          },
          quantity: Number,
        }),
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Cart = model("Carts", cartSchema);

export default Cart;
