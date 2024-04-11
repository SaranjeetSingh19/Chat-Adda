import express from "express";
import { isAuthenticated } from "../middlewares/auth.js";
import {
  addMembers,
  deleteChat,
  getChatDetails,
  getMessages,
  getMyChats,
  getMyGroups,
  leaveGroup,
  newGroupChat,
  removeMembers,
  renameGroup,
  sendAttachments,
} from "../controllers/chat.controllers.js";
import { attachmentMulter } from "../middlewares/multer.js";

const app = express.Router();

// After here user must be logged in
app.use(isAuthenticated); //Automatically all the routes which will declare after this have this middleware.

app.post("/new", newGroupChat);

app.get("/my", getMyChats);

app.get("/my/groups", getMyGroups);

app.put("/addmembers", addMembers);

app.put("/removemember", removeMembers);

app.delete("/leave/:id", leaveGroup);

app.post("/message", attachmentMulter, sendAttachments);

app.get("/message/:id", getMessages )

app.route("/:id", ).get(getChatDetails).put(renameGroup).delete(deleteChat)

export default app;
