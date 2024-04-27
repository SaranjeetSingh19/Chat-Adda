import jwt from "jsonwebtoken";
import Chat from "../models/chat.models.js";
import Message from "../models/message.models.js";
import User from "../models/user.models.js";
import { cookieOptions } from "../utils/features.js";

const adminLogin = async (req, res, next) => {
  try {
    const { secretKey } = req.body;

    const adminSecretKey =
      process.env.ADMIN_SECRET_KEY ||
      "fkljsdierdjkfhkjgsefvwrygtufnvxfjkvuiwerfhreugfjksdhfeuiwgfbh";

    const isMatched = secretKey === adminSecretKey;

    if (!isMatched) return next(new Error("Invalid Admin Key!"));

    const token = jwt.sign(secretKey, process.env.JWT_SECRET);

    return res
      .status(200)
      .cookie("huddle-admin-token", token, {
        ...cookieOptions,
        maxAge: 1000 * 60 * 10,
      })
      .json({
        success: true,
        message: "Authenticated Successfully! Welcome Pazi",
      });
  } catch (error) {
    return res.status(404).json({
      success: false,
      message: error.message,
    });
  }
};

const allUsers = async (req, res, next) => {
  try {
    const users = await User.find({});

    const transformedUsers = await Promise.all(
      users.map(async ({ _id, name, username, avatar }) => {
        const [groups, friends] = await Promise.all([
          Chat.countDocuments({ groupChat: true, members: _id }),
          Chat.countDocuments({ groupChat: false, members: _id }),
        ]);

        return {
          name,
          username,
          avatar: avatar.url,
          _id,
          groups,
          friends,
        };
      })
    );

    return res.status(200).json({
      status: "success",
      users: transformedUsers,
    });
  } catch (error) {
    return res.status(404).json({
      success: false,
      message: error.message,
    });
  }
};

const allChats = async (req, res, next) => {
  try {
    const chats = await Chat.find({})
      .populate("members", "name avatar")
      .populate("creator", "name avatar");

    const transformedChats = await Promise.all(
      chats.map(async ({ members, _id, groupChat, name, creator }) => {
        const totalMessages = await Message.countDocuments({ chat: _id });

        return {
          _id,
          groupChat,
          name,
          avatar: members.slice(0, 3).map((member) => member.avatar.url),
          members: members.map(({ _id, name, avatar }) => ({
            _id,
            name,
            avatar: avatar.url,
          })),
          creator: {
            name: creator?.name || "None",
            avatar: creator?.avatar.url || "",
          },
          totalMembers: members.length,
          totalMessages,
        };
      })
    );

    return res.status(200).json({
      status: "success",
      chats: transformedChats,
    });
  } catch (error) {
    return res.status(404).json({
      success: false,
      message: error.message,
    });
  }
};

const allMessages = async (req, res, next) => {
  try {
    const messages = await Message.find({})
      .populate("sender", "name avatar")
      .populate("chat", "groupChat");

    const transformedMessages = messages.map(
      ({ content, attachments, _id, sender, createdAt, chat }) => ({
        _id,
        attachments,
        content,
        createdAt,
        chat: chat?._id,
        groupChat: chat?.groupChat,
        sender: {
          _id: sender?._id,
          name: sender?.name,
          avatar: sender?.avatar?.url,
        },
      })
    );

    return res.status(200).json({
      success: true,
      messages: transformedMessages,
    });
  } catch (error) {
    return res.status(404).json({
      successysdd: false,
      message: error.message,
    });
  }
};

const getDashboardStats = async (req, res, next) => {
  try {
    const [groupsCount, usersCount, messagesCount, totalChatsCount] =
      await Promise.all([
        Chat.countDocuments({ groupChat: true }),
        User.countDocuments(),
        Message.countDocuments(),
        Chat.countDocuments(),
      ]);

    const today = new Date();

    const last7Days = new Date();

    last7Days.setDate(last7Days.getDate() - 7);

    const last7DaysMessages = await Message.find({
      createdAt: {
        $gte: last7Days,
        $lte: today,
      },
    }).select("createdAt");

    const messages = new Array(7).fill(0);
    const dayInMilliSeconds = 1000 * 60 * 60 * 24;

    last7DaysMessages.forEach((message) => {
      const indexApprox =
        (today.getTime() - message.createdAt.getTime()) / dayInMilliSeconds;
      const index = Math.floor(indexApprox);
      messages[6 - index]++;
    });

    const stats = {
      groupsCount,
      usersCount,
      messagesCount,
      totalChatsCount,
      messagesChart: messages,
    };

    return res.status(200).json({
      status: "success",
      stats,
    });
  } catch (error) {
    return res.status(404).json({
      success: false,
      message: error.message,
    });
  }
};

const adminLogout = async (req, res, next) => {
  try {
    return res
      .status(200)
      .cookie("huddle-admin-token", "", {
        ...cookieOptions,
        maxAge: 0,
      })
      .json({
        success: true,
        message: "Logged out Successfully!",
      });
  } catch (error) {
    return res.status(404).json({
      success: false,
      message: error.message,
    });
  }
};

const getAdminData = async (req, res, next) => {
  res.status(200).json({
    admin: true,
  });
};

export {
  adminLogin,
  adminLogout,
  allChats,
  allMessages,
  allUsers,
  getAdminData,
  getDashboardStats,
};
