import { compare } from "bcrypt";
import { NEW_REQUEST, REFETCH_CHATS } from "../constants/events.js";
import { getOtherMember } from "../lib/helper.js";
import Chat from "../models/chat.models.js";
import Request from "../models/request.models.js";
import User from "../models/user.models.js";
import {
  cookieOptions,
  emitEvent,
  sendToken,
  uploadFilesToCloudinary,
} from "../utils/features.js";

const newUsers = async (req, res, next) => {
  try {
    const { name, username, password, bio } = req.body;

    const file = req.file;

    if (!file) return next(new Error("Please Upload Avatar"));

    const result = await uploadFilesToCloudinary([file]);
    //File will get uploaded to cloudinary through above function

    const avatar = {
      public_id: result[0].public_id,
      url: result[0].url,
    };

    const user = await User.create({
      name,
      bio,
      username,
      password,
      avatar,
    });

    sendToken(res, user, 201, "User Created!");
  } catch (error) {
    return res.status(404).json({
      success: false,
      message: error.code === 11000 ? "User already exist" : error.message,
    });
  }
};

const login = async (req, res, next) => {
  try {
    const { username, password } = req.body;

    const user = await User.findOne({ username }).select("+password");

    if (!user) return next(new Error("Invalid Username or Password !"));

    const isMatch = await compare(password, user.password);

    if (!isMatch) return next(new Error("Invalid Username or Password !"));

    sendToken(res, user, 200, `Welcome Back, ${user.name}`);
  } catch (error) {
    return res.status(404).json({
      success: false,
      message: error.message,
    });
  }
};

const getMyProfile = async (req, res, next) => {
  const user = await User.findById(req.user);

  if (!user) return next(new Error("User not Found!"));

  res.status(201).json({
    success: true,
    user: user,
  });
};

const logout = async (req, res, next) => {
  res
    .status(201)
    .cookie("huddle-token", " ", {
      ...cookieOptions,
      maxAge: 0,
    })
    .json({
      success: true,
      message: "Logout successfully !",
    });
};

const searchUser = async (req, res, next) => {
  try {
    const { name = "" } = req.query;

    const myChats = await Chat.find({ groupChat: false, members: req.user });

    //All users from my chat means friends or people i have chatted with
    const allUsersFromMyChats = myChats.map((chat) => chat.members).flat();

    //Finding all users except me and my friends
    const allUsersExceptMeAndMyFriends = await User.find({
      _id: { $nin: allUsersFromMyChats },
      name: { $regex: name, $options: "i" },
    });

    //Modifying the response
    const users = allUsersExceptMeAndMyFriends.map(({ _id, name, avatar }) => ({
      _id,
      name,
      avatar: avatar.url,
    }));

    return res.status(200).json({
      success: true,
      users,
    });
  } catch (error) {
    return res.status(404).json({
      success: false,
      message: error.message,
    });
  }
};

const sendFriendRequest = async (req, res, next) => {
  try {
    const { userId } = req.body;

    const request = await Request.findOne({
      $or: [
        { sender: req.user, receiver: userId },
        { sender: userId, receiver: req.user },
      ],
    });

    if (request) return next(new Error("Request already sent"));

    await Request.create({
      sender: req.user,
      receiver: userId,
    });

    emitEvent(req, NEW_REQUEST, [userId], "request");

    res.status(201).json({
      success: true,
      message: "Friend Request Sent Successfully! 🫣",
    });
  } catch (error) {
    return res.status(404).json({
      success: false,
      message: error.message,
    });
  }
};

const acceptFriendRequest = async (req, res, next) => {
  try {
    const { requestId, accept } = req.body;

    const request = await Request.findById(requestId)
      .populate("sender", "name")
      .populate("receiver", "name");

    if (!request) return next(new Error("Request not found!"));

    if (request.receiver._id.toString() !== req.user.toString())
      return next(new Error("You are not authorized to accept this request!"));

    if (!accept) {
      await request.deleteOne();

      return res.status(200).json({
        success: true,
        message: "Friend request rejected! 😶",
      });
    }

    const members = [request.sender._id, request.receiver._id];

    await Promise.all([
      Chat.create({
        members,
        name: `${request.sender.name}-${request.receiver.name}`,
      }),
    ]);

    emitEvent(req, REFETCH_CHATS, members);

    return res.status(201).json({
      success: true,
      message: "FriendRrequest Accepted! 🥳",
      senderId: request.sender._id,
    });
  } catch (error) {
    return res.status(404).json({
      success: false,
      message: error.message,
    });
  }
};

const getMyNotifications = async (req, res, next) => {
  try {
    const requests = await Request.find({ receiver: req.user }).populate(
      "sender",
      "name avatar"
    );

    const allRequests = requests.map(({ _id, sender }) => ({
      _id,
      sender: {
        _id: sender._id,
        name: sender.name,
        avatar: sender.avatar.url,
      },
    }));

    return res.status(200).json({
      success: true,
      message: allRequests,
    });
  } catch (error) {
    return res.status(404).json({
      success: false,
      message: error.message,
    });
  }
};

const getMyFriends = async (req, res, next) => {
  try {
    const chatId = req.query.chatId;

    const chats = await Chat.find({
      members: req.user,
      groupChat: false,
    }).populate("members", "name avatar");

    const friends = chats.map(({ members }) => {
      const otherUser = getOtherMember(members, req.user);

      return {
        _id: otherUser._id,
        name: otherUser.name,
        avatar: otherUser.avatar.url,
      };
    });

    if (chatId) {
      const chat = await Chat.findById(chatId);

      const availableFriends = friends.filter(
        (friend) => !chat.members.includes(friend._id)
      );
      return res.status(200).json({
        success: true,
        friends: availableFriends,
      });
    } else {
      return res.status(200).json({
        success: true,
        friends,
      });
    }
  } catch (error) {
    return res.status(404).json({
      success: false,
      message: error.message,
    });
  }
};

export {
  acceptFriendRequest,
  getMyFriends,
  getMyNotifications,
  getMyProfile,
  login,
  logout,
  newUsers,
  searchUser,
  sendFriendRequest
};

