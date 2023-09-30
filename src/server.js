import app from "./config/app.js";
import { config } from "dotenv";
config();

app.listen(process.env.PORT || 8080, () => {
  console.log(`Server listening on ${process.env.PORT || 8080}`);
});
