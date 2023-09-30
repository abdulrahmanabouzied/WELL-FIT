import { Schema, model } from "mongoose";

const OrdersSchema = new Schema(
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
    total_price: Number,
    shipping: {
      type: Schema.Types.ObjectId,
      ref: "Shippings",
    },
    status: { type: String, enum: ["pending", "shipping", "delivered"] },
    done_date: Date,
    payment_method: { tpye: String },
  },
  {
    timestamps: true,
  }
);

const Order = model("Orders", OrdersSchema);

export default Order;
