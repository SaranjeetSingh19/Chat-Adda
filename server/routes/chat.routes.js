import express from "express";
import { isAuthenticated } from "../middlewares/auth.js";
import { addMembers, getMyChats, getMyGroups, leaveGroup, newGroupChat, removeMembers } from "../controllers/chat.controllers.js";

const app = express.Router();
 

// After here user must be logged in
app.use(isAuthenticated); //Automatically all the routes which will declare after this have this middleware.
 
app.post("/new", newGroupChat)

app.get("/my", getMyChats)

app.get("/my/groups", getMyGroups)

app.put("/addmembers", addMembers)

app.put("/removemember", removeMembers)
app.put("/leave/:id", leaveGroup)

export default app;
