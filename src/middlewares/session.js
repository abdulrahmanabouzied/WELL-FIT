import session from "express-session";
import mSessionStore from "connect-mongodb-session";
import getTime from "./../utils/getDate.js";

const sessionStore = mSessionStore(session);
const store = new sessionStore({
  uri: process.env.DB_URI,
  collection: "session",
});
const MAX_AGE = getTime("15m");

store.on("error", (err) => {
  console.log(`session store error: ${err}`);
});

export default session({
  store,
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: false,
    sameSite: "strict",
    maxAge: MAX_AGE,
  },
});
