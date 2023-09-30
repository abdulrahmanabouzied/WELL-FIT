import validator from "../../services/validator.service.js";
import uploader from "../../middlewares/uploader.js";
import { Router } from "express";
import authenticate from "../../services/auth.service.js";
import asyncHandler from "express-async-handler";
import meetingController from "../../controller/meeting.js";

const app = Router();

// Meeting Routes
app
  .route("/")
  .all(authenticate)
  .post(asyncHandler(meetingController.createMeeting))
  .put(asyncHandler(meetingController.updateMeeting))
  .get(asyncHandler(meetingController.getAllMeetings));

app
  .route("/:id")
  .all(authenticate)
  .get(asyncHandler(meetingController.getMeetingById))
  .delete(asyncHandler(meetingController.deleteMeeting));

export default app;
