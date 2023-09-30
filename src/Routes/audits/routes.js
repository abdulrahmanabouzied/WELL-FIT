import { Router } from "express";
import authenticate from "../../services/auth.service.js";
import validator from "../../services/validator.service.js";
import asyncHandler from "../../services/asyncHandler.service.js";
import uploader from "../../middlewares/uploader.js";
const app = Router();

export default app;
