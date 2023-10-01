import { Router } from "express";
import authenticate from "../../services/auth.service.js";
import validator from "../../services/validator.service.js";
import asyncHandler from "express-async-handler";
import clientController from "../../controller/client.js";
import authController from "../../controller/auth/client.js";
import uploader from "../../middlewares/uploader.js";
const app = Router();
const upload = uploader("clients");

app
  .route("/auth")
  .put(asyncHandler(authController.verifyEmail))
  .post(asyncHandler(authController.registerClient));

app.post("/auth/client", asyncHandler(authController.signIn));

app
  .route("/")
  .all(authenticate)
  .put(
    upload.fields([
      {
        name: "photo",
        maxCount: 1,
      },
      {
        name: "inbody",
        maxCount: 1,
      },
    ]),
    asyncHandler(clientController.updateClient)
  )
  .get(asyncHandler(clientController.getAllClients));

app
  .route("/:id")
  .all(authenticate)
  .get(asyncHandler(clientController.getClientById))
  .delete(asyncHandler(clientController.deleteClient));

console.log(process.env);

app.get("/:id/matrices", authenticate, clientController.getClientMats);

export default app;
