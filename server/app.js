import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import express from "express";
import { errorMiddleWare } from "./middlewares/error.js";
import charRoute from "./routes/chat.routes.js";
import userRoute from "./routes/user.routes.js";
import adminRoute from "./routes/admin.routes.js";

import { connectDb } from "./utils/features.js";

dotenv.config({
  path: "./.env",
});

const mongoURI = process.env.MONGO_URI;
const port = process.env.PORT || 3000;
const envMode = process.env.NODE_ENV.trim() || "PRODUCTION";

connectDb(mongoURI);

// createUser(10)
// createSingleChats(10)
// createGroupChats(10)
// createMessagesInAChat("661784e36e10e96f86b5d69d", 50)

const app = express();

//Using middlewares
app.use(express.json());
app.use(express.urlencoded());
app.use(cookieParser());

app.use("/user", userRoute);
app.use("/chat", charRoute);
app.use("/admin", adminRoute);

app.get("/", (req, res) => {
  res.send("From home route");
});

app.use(errorMiddleWare);

app.listen(port, () => {
  console.log(`Server is running on port ${port} in ${envMode} mode`);
});

export { mongoURI, envMode, port };
