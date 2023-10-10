import express from "express";
import cors from "cors";
import morgan from "morgan";
import helmet from "helmet";
import routes from "../Routes/index.routes.js";
import { config } from "dotenv";
import compression from "compression";
import errorHandler from "../middlewares/errorHandle.js";
import dbConnection from "./database.js";
import session from "../middlewares/session.js";
import cookieParser from "cookie-parser";
import { Server } from "socket.io";
import handleSocket from "../services/socket.service.js";
import { createServer } from "http";
const app = express();
const server = createServer(app);
config();

const io = new Server(server, {
  cors: {
    origin: "*",
  },
});
const chat = io.of("/chat");

await dbConnection();
app.use(session);
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: false }));
app.use(cookieParser(process.env.SESSION_SECRET));
app.use(
  cors({
    origin: "*",
    allowedHeaders: "*",
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
  })
);
app.use(morgan("dev"));
app.use(helmet());
app.use(
  compression({
    level: 6,
    threshold: 100 * 1024, // 100 kb
    filter: (req, res) => {
      if (req.headers["x-no-compression"]) return false;
      return compression.filter(req, res);
    },
  })
); // gzipped

// must be http://localhost:3000/src/public
app.use("/src/public", express.static("src/public"));
handleSocket(chat);

app.use(routes);
app.use(errorHandler);

export default server;
