import { Schema, model } from "mongoose";

const subscriptionSchema = new Schema(
  {
    plan_name: String,
    price_per_month: Number,
    features: [String],
  },
  {
    timestamps: true,
  }
);

const Subscription = model("Subscriptions", subscriptionSchema);

export default Subscription;
