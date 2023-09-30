import { Router } from "express";
const app = Router();
import API_V1 from "./v1.api.routes.js";

// app.use();

app.use("/v1/api/", API_V1);

app.get("*", function (req, res) {
  res.format({
    html: function (req, res) {
      res.status(200).send("do Well && Fit; done;");
    },
    json: function (req, res) {
      res.json(200, {
        message: "do Well && Fit; done;",
      });
    },
  });
});

export default app;
