import { Router } from "express";
const app = Router();
import client from "./client/routes.js";
import cart from "./cart/routes.js";
import chat from "./chat/routes.js";
import coach from "./coach/routes.js";
import audits from "./audits/routes.js";
import action_program from "./action_program/routes.js";
import matrices from "./matrices/routes.js";
import meeting from "./meeting/routes.js";
import meal from "./meal/routes.js";
import order from "./order/routes.js";
import program from "./program/routes.js";
import subscription from "./subscription/routes.js";
import workout from "./workout/routes.js";
import shipping from "./shipping/routes.js";
import product from "./product/routes.js";
import feedback from "./feedback/routes.js";

app.use("/clients/", client);
app.use("/coaches/", coach);
app.use("/carts/", cart);
app.use("/chats/", chat);
app.use("/audits/", audits);
app.use("/action/programs/", action_program);
app.use("/matrices/", matrices);
app.use("/meetings/", meeting);
app.use("/meals/", meal);
app.use("/orders/", order);
app.use("/programs/", program);
app.use("/subscriptions/", subscription);
app.use("/workouts/", workout);
app.use("/shippings/", shipping);
app.use("/products/", product);
app.use("/feedbacks/", feedback);

app.get("*", async (req, res) => {
  console.log(req.path);
  res.format({
    html: function () {
      res.status(200).send("Welcome to Well&Fit.");
    },
    json: function () {
      res.json({
        message: "Welcome to Well&Fit",
      });
    },
  });
});

export default app;
