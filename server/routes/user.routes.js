import express from "express";
import {
  getMyProfile,
  login, 
  logout,
  newUsers,
  searchUser,
} from "../controllers/user.controllers.js";
import { singleAvatar } from "../middlewares/multer.js";
import { isAuthenticated } from "../middlewares/auth.js";

const app = express.Router();

app.post("/new", singleAvatar, newUsers);
app.post("/login", login);

// After here user must be logged in
app.use(isAuthenticated); //Automatically all the routes which will declare after this have this middleware.

app.get("/me", getMyProfile);

app.get("/logout", logout)

app.get("/search", searchUser)

export default app;
