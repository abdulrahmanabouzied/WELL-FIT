import { Router } from "express";
import authenticate from "../../services/auth.service.js";
import validator from "../../services/validator.service.js";
import uploader from "../../middlewares/uploader.js";
import asyncHandler from "express-async-handler";
import authController from "./../../controller/auth/coach.js";
import coachController from "../../controller/coach.js";
import coachSchema from "../../validation/Coach/create.validation.js";
import coachUpdateSchema, {
  signInSchema,
} from "../../validation/Coach/update.validation.js";
const app = Router();
// const upload = uploader("coaches");
const upload = uploader("data");

app
  .route("/auth")
  .post(asyncHandler(authController.registerCoach))
  .get(asyncHandler(authController.getPass));

app
  .route("/auth/coach")
  // password and email are sent in the body
  .post(validator(signInSchema), asyncHandler(authController.signIn))
  // email is sent in body
  .patch(
    validator(coachUpdateSchema),
    asyncHandler(authController.forgotPassword)
  );

// code is sent in the query
app.get("/auth/mail", asyncHandler(authController.verifyEmailCode));

app
  .route("/")
  .all(authenticate)
  // id in the query, data int the body
  .put(
    upload.fields([
      {
        name: "photo",
        maxCount: 1,
      },
    ]),
    validator(coachUpdateSchema),
    asyncHandler(coachController.updateCoach)
  )
  .get(asyncHandler(coachController.getAllCoaches));

app
  .route("/:id")
  .all(authenticate)
  .get(asyncHandler(coachController.getCoachById))
  .delete(asyncHandler(coachController.deleteCoach));

app.get(
  "/:id/clients",
  authenticate,
  asyncHandler(coachController.getCoachClients)
);

app.get(
  "/:id/meetings",
  authenticate,
  asyncHandler(coachController.getCoachMeetings)
);

export default app;
