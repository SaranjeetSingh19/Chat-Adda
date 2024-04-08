import express from "express";
import userRoute from "./routes/user.routes.js";
import charRoute from "./routes/chat.routes.js";
import { connectDb } from "./utils/features.js";
import dotenv from "dotenv";
import { errorMiddleWare } from "./middlewares/error.js";
import cookieParser from "cookie-parser";
import { createUser } from "./seeders/user.seeders.js";

dotenv.config({
  path: "./.env",
});

const mongoURI = process.env.MONGO_URI;
const port = process.env.PORT || 3000;

connectDb(mongoURI);

// createUser(10) 

const app = express();

//Using middlewares
app.use(express.json());
app.use(express.urlencoded());
app.use(cookieParser());

app.use("/user", userRoute);
app.use("/chat", charRoute);

app.get("/", (req, res) => {
  res.send("From home route");
});

app.use(errorMiddleWare);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
