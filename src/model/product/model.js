import { Schema, model } from "mongoose";

const ProductsSchema = new Schema(
  {
    name: String,
    price: Number,
    description: String,
    size: {
      type: String,
      enum: ["Medium", "Large", "Small"],
    },
    calories: Number,
    review: { type: Number, min: 1, max: 5 }, // out of 5 stars
    paid_counter: Number,
  },
  {
    timestamps: true,
  }
);

const Product = model("Products", ProductsSchema);

export default Product;
