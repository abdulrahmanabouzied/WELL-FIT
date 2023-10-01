import validator from "../../services/validator.service.js";
import uploader from "../../middlewares/uploader.js";
import { Router } from "express";
import authenticate from "../../services/auth.service.js";
import asyncHandler from "express-async-handler";
import meetingController from "../../controller/meeting.js";
import createMeetingSchema from "./../../validation/Meeting/create.validation.js";
import updateMeetingSchema from "./../../validation/Meeting/update.validation.js";

const app = Router();

// Meeting Routes
app
  .route("/")
  .all(authenticate)
  .post(
    validator(createMeetingSchema),
    asyncHandler(meetingController.createMeeting)
  )
  .put(
    validator(updateMeetingSchema),
    asyncHandler(meetingController.updateMeeting)
  )
  .get(asyncHandler(meetingController.getAllMeetings));

app
  .route("/:id")
  .all(authenticate)
  .get(asyncHandler(meetingController.getMeetingById))
  .delete(asyncHandler(meetingController.deleteMeeting));

export default app;
