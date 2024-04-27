import { v2 as cloudinary } from "cloudinary";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import { v4 as uuid } from "uuid";
import { errorMiddleWare } from "./middlewares/error.js";
import adminRoute from "./routes/admin.routes.js";
import charRoute from "./routes/chat.routes.js";
import userRoute from "./routes/user.routes.js";

import {
  CHAT_EXITED,
  CHAT_JOINED,
  NEW_MESSAGE,
  NEW_MESSAGE_ALERT,
  ONLINE_USERS,
  START_TYPING,
  STOP_TYPING,
} from "./constants/events.js";
import { getSockets } from "./lib/helper.js";
import { socketAuthenticator } from "./middlewares/auth.js";
import Message from "./models/message.models.js";
import { connectDb } from "./utils/features.js";

dotenv.config({
  path: "./.env",
});

const mongoURI = process.env.MONGO_URI;
const port = process.env.PORT || 3000;
const envMode = process.env.NODE_ENV.trim() || "PRODUCTION";
const userSocketIDs = new Map();
const onlineUsers = new Set();

connectDb(mongoURI);

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// createUser(10)
// createSingleChats(10)
// createGroupChats(10)
// createMessagesInAChat("661784e36e10e96f86b5d69d", 50)
const app = express();
const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: [
      "http://localhost:5173",
      "http://localhost:4173",
      process.env.CLIENT_URL,
    ],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  },
});

app.set("io", io);

//Using middlewares
app.use(express.json());
app.use(express.urlencoded());
app.use(cookieParser());
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "http://localhost:4173",
      process.env.CLIENT_URL,
    ],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

app.use("/api/v1/user", userRoute);
app.use("/api/v1/chat", charRoute);
app.use("/api/v1/admin", adminRoute);

app.get("/", (req, res) => {
  res.send("From home route");
});

io.use((socket, next) => {
  cookieParser()(
    socket.request,
    socket.request.res,
    async (err) => await socketAuthenticator(err, socket, next)
  );
});

io.on("connection", (socket) => {
  const user = socket.user;

  userSocketIDs.set(user._id.toString(), socket.id); // By this we will get to know that which user id (USER) is connected with which socket id

  socket.on(NEW_MESSAGE, async ({ chatId, members, message }) => {
    // this is listening the request from client
    const messageForRealTime = {
      content: message,
      _id: uuid(),
      sender: {
        _id: user._id,
        name: user.name,
      },
      chat: chatId,
      createdAt: new Date().toISOString(),
    };

    const messageForDb = {
      //To save content in DB
      content: message,
      sender: user._id,
      chat: chatId,
    };

    const memberSockets = getSockets(members); // this will contain all the socket ids of the members

    //This is actually sending & receving
    io.to(memberSockets).emit(NEW_MESSAGE, {
      //it will send chatId and content(every details) to all the socket users whose ids will be in memberSockets
      chatId,
      message: messageForRealTime,
    });
    io.to(memberSockets).emit(NEW_MESSAGE_ALERT, { chatId }); // this will notify the new msgs

    try {
      await Message.create(messageForDb);
    } catch (error) {
      toast.error("Error while Saving Messages in Database");
    }
  });

  socket.on(START_TYPING, ({ chatId, members }) => {
    const memberSockets = getSockets(members);
    socket.to(memberSockets).emit(START_TYPING, { chatId });
  });

  socket.on(STOP_TYPING, ({ chatId, members }) => {
    const memberSockets = getSockets(members);
    socket.to(memberSockets).emit(STOP_TYPING, { chatId });
  });

  socket.on(CHAT_JOINED, ({ userId, members }) => {
    onlineUsers.add(userId?.toString());

    const membersSocket = getSockets(members);
    io.to(membersSocket).emit(ONLINE_USERS, Array.from(onlineUsers));
  });

  socket.on(CHAT_EXITED, ({ userId, members }) => {
    onlineUsers.delete(userId?.toString());

    const membersSocket = getSockets(members);
    io.to(membersSocket).emit(ONLINE_USERS, Array.from(onlineUsers));
  });

  socket.on("disconnect", () => {
    userSocketIDs.delete(user._id.toString());
    onlineUsers.delete(user._id?.toString());
    socket.broadcast.emit(ONLINE_USERS, Array.from(onlineUsers));
  });
});

app.use(errorMiddleWare);

server.listen(port, () => {
  console.log(`Server is running on port ${port} in ${envMode} mode`);
});

export { envMode, mongoURI, port, userSocketIDs };

