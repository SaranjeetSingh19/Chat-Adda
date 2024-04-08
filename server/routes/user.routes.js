import express from "express"
import { login, newUsers } from "../controllers/user.controllers.js";
import { singleAvatar } from "../middlewares/multer.js";

const app = express.Router();

app.post("/new",singleAvatar, newUsers);

app.post("/login", login);


export default app;

