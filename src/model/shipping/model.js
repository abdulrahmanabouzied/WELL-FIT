import { Schema, model } from "mongoose";

const ShippingsSchema = new Schema(
  {
    client: {
      type: Schema.Types.ObjectId,
      ref: "Clients",
    },
    mobile_number: String /* RegExp("/^(\+\d{1,3}[- ]?)?\d{10}$/") */,
    address: String,
    street: String,
    additional_details: String,
    zip_code: Number,
  },
  {
    timestamps: true,
  }
);

const Shipping = model("Shippings", ShippingsSchema);

export default Shipping;
