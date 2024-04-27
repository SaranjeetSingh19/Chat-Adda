import {
  ALERTS,
  NEW_MESSAGE,
  NEW_MESSAGE_ALERT,
  REFETCH_CHATS,
} from "../constants/events.js";
import { getOtherMember } from "../lib/helper.js";
import Chat from "../models/chat.models.js";
import Message from "../models/message.models.js";
import User from "../models/user.models.js";
import {
  deleteFilesFromCloudinary,
  emitEvent,
  uploadFilesToCloudinary,
} from "../utils/features.js";

const newGroupChat = async (req, res, next) => {
  try {
    const { name, members } = req.body;

    if (members.length < 2)
      return next(new Error("Group chat at least must have 3 members"));

    const allMembers = [...members, req.user];

    await Chat.create({
      name,
      groupChat: true,
      creator: req.user,
      members: allMembers,
    });

    emitEvent(req, ALERTS, allMembers, `Welcome to ${name} group!`);
    emitEvent(req, REFETCH_CHATS, members);

    return res.status(201).json({
      success: true,
      message: "Group created!",
    });
  } catch (error) {
    return res.status(404).json({
      success: false,
      message: error.message,
    });
  }
};

const getMyChats = async (req, res, next) => {
  try {
    const chats = await Chat.find({ members: req.user }).populate(
      "members",
      "name avatar"
    );

    const transformedChats = chats.map(({ _id, name, members, groupChat }) => {
      const otherMember = getOtherMember(members, req.user);

      return {
        _id,
        groupChat,
        avatar: groupChat
          ? members.slice(0, 3).map(({ avatar }) => avatar.url)
          : [otherMember.avatar.url],
        name: groupChat ? name : otherMember.name,
        members: members.reduce((prev, curr) => {
          if (curr._id.toString() !== req.user.toString()) {
            prev.push(curr._id);
          }
          return prev;
        }, []),
      };
    });

    return res.status(200).json({
      success: true,
      message: transformedChats,
    });
  } catch (error) {
    return res.status(404).json({
      success: false,
      message: error.message,
    });
  }
};

const getMyGroups = async (req, res, next) => {
  try {
    const chats = await Chat.find({
      members: req.user,
      groupChat: true,
      creator: req.user,
    }).populate("members", "name avatar");

    const groups = chats.map(({ members, _id, groupChat, name }) => ({
      _id,
      groupChat,
      name,
      avatar: members.slice(0, 3).map(({ avatar }) => avatar.url),
    }));

    return res.status(200).json({
      success: true,
      groups,
    });
  } catch (error) {
    return res.status(404).json({
      success: false,
      message: error.message,
    });
  }
};

const addMembers = async (req, res, next) => {
  try {
    const { chatId, members } = req.body;

    // if (!members || members.length < 1)
    //   return next(new Error("Please provide members 🙄"));

    const chat = await Chat.findById(chatId);

    if (!chat) return next(new Error("Chat not found"));

    if (!chat.groupChat) return next(new Error("This is not a group chat"));

    if (chat.creator.toString() !== req.user.toString())
      return next(new Error("You are not allowed to add members 🙅🏻‍♂️"));

    const allNewMembersPromise = members.map((i) => User.findById(i, "name"));

    const allNewMembers = await Promise.all(allNewMembersPromise);

    const uniqueMembers = allNewMembers
      .filter((i) => !chat.members.includes(i._id.toString()))
      .map((i) => i._id);

    chat.members.push(...uniqueMembers);

    if (chat.members.length > 100)
      return next(new Error("Group members limit reached ⛔"));

    await chat.save();

    const allUsersName = allNewMembers.map((i) => i?.name).join(",");

    emitEvent(
      req,
      ALERTS,
      chat.members,
      `${allUsersName} has been added in the group 🥳`
    );

    emitEvent(req, REFETCH_CHATS, chat.members);

    return res.status(200).json({
      success: true,
      message: "Members added successfully",
    });
  } catch (error) {
    return res.status(404).json({
      success: false,
      message: error.message,
    });
  }
};

const removeMembers = async (req, res, next) => {
  try {
    const { userId, chatId } = req.body;

    const [chat, userThatWillBeRemoved] = await Promise.all([
      Chat.findById(chatId),
      User.findById(userId, "name"),
    ]);

    if (!chat) return next(new Error("Chat not found"));

    if (!chat.groupChat) return next(new Error("This is not a group chat"));

    if (chat.creator.toString() !== req.user.toString())
      return next(new Error("You are not allowed to add members 🙅🏻‍♂️"));

    if (chat.members.length <= 3)
      return next(
        new Error("Don't you have minimum 3 friends to create a group? 😏")
      );

    const allChatMembers = chat.members.map((i) => i.toString());

    chat.members = chat.members.filter(
      (member) => member?.toString() !== userId.toString()
    );

    await chat.save();

    emitEvent(req, ALERTS, chat.members, {
      message: `${userThatWillBeRemoved.name} has been removed from the group 😕`,
      chatId,
    });

    emitEvent(req, REFETCH_CHATS, allChatMembers);

    return res.status(200).json({
      success: true,
      message: "Member removed succesfully",
    });
  } catch (error) {
    return res.status(404).json({
      success: false,
      message: error.message,
    });
  }
};

const leaveGroup = async (req, res, next) => {
  try {
    const chatId = req.params.id;

    const chat = await Chat.findById(chatId);

    if (!chat) return next(new Error("Chat not found!!!"));

    if (!chat.groupChat) return next(new Error("This is not a group chat"));

    const remainingMembers = chat.members.filter(
      (members) => members.toString() !== req.user.toString()
    );

    if (remainingMembers.length < 3)
      return next(new Error("Group must have at least 3 members"));

    if (chat.creator.toString() === req.user.toString()) {
      const randomElement = Math.floor(Math.random() * remainingMembers.length);
      const newCreator = remainingMembers[randomElement];
      chat.creator = newCreator;
    }

    chat.members = remainingMembers;

    const [user] = await Promise.all([
      User.findById(req.user, "name"),
      chat.save(),
    ]);

    emitEvent(req, ALERTS, chat.members, {
      message: `User ${user.name} has left the group`,
      chatId,
    });

    return res.status(200).json({
      success: true,
      message: "Group left successfully 😣",
    });
  } catch (error) {
    return res.status(404).json({
      success: false,
      message: error.message,
    });
  }
};

const sendAttachments = async (req, res, next) => {
  try {
    const { chatId } = req.body;

    const files = req.files || [];

    if (files.length < 1) return next(new Error("Please Upload Attachments"));

    if (files.length > 5) return next(new Error("Files can't be more than 5"));

    const [chat, me] = await Promise.all([
      Chat.findById(chatId),
      User.findById(req.user, "name"),
    ]);

    if (!chat) return next(new Error("Chat not found!!!"));

    if (files.length < 1) return next(new Error("Please provide attachments"));

    // Upload files here
    const attachments = await uploadFilesToCloudinary(files);

    const messageForDb = {
      content: "",
      attachments,
      sender: me._id,
      chat: chatId,
    };

    const messageForRealTime = {
      ...messageForDb,
      sender: {
        _id: me._id,
        name: me.name,
      },
    };

    const message = await Message.create(messageForDb);

    emitEvent(req, NEW_MESSAGE, chat.members, {
      message: messageForRealTime,
      chatId,
    });

    emitEvent(req, NEW_MESSAGE_ALERT, chat.members, { chatId });

    return res.status(200).json({
      success: true,
      message,
    });
  } catch (error) {
    return res.status(404).json({
      success: false,
      message: error.message,
    });
  }
};

const getChatDetails = async (req, res, next) => {
  try {
    if (req.query.populate === "true") {
      const chat = await Chat.findById(req.params.id)
        .populate("members", "name avatar")
        .lean();
      // Before it was MongoDb object but now it is Javascript object with the help of lean() , now without saving anything we can make changes in this.

      if (!chat) return next(new Error("Chat not found!!"));

      chat.members = chat.members.map(({ _id, name, avatar }) => ({
        _id,
        name,
        avatar: avatar.url,
      }));

      return res.status(200).json({
        success: true,
        chat,
      });
    } else {
      const chat = await Chat.findById(req.params.id);
      if (!chat) return next(new Error("Chat not found!!"));

      return res.status(200).json({
        success: true,
        chat,
      });
    }
  } catch (error) {
    return res.status(404).json({
      success: false,
      message:
        process.env.NODE_ENV.trim() === "DEVELOPMENT"
          ? error.message
          : "Invalid Path ID",
      // message: error.path
    });
  }
};

const renameGroup = async (req, res, next) => {
  try {
    const chatId = req.params.id;

    const { name } = req.body;

    const chat = await Chat.findById(chatId);

    if (!chat) return next(new Error("Chat not found"));

    if (!chat.groupChat) return next(new Error("This is not a group chat!"));

    if (chat.creator.toString() !== req.user.toString())
      next(new Error("You are not allowed to rename the group"));

    chat.name = name;

    await chat.save();

    emitEvent(req, REFETCH_CHATS, chat.members);

    return res.status(200).json({
      success: true,
      message: "Group renamed successfully!",
    });
  } catch (error) {
    return res.status(404).json({
      success: false,
      message: error.message,
    });
  }
};

const deleteChat = async (req, res, next) => {
  try {
    const chatId = req.params.id;

    const chat = await Chat.findById(chatId);

    if (!chat) return next(new Error("Chat not found"));

    const members = chat.members;

    if (chat.groupChat && chat.creator.toString() !== req.user.toString())
      return next(new Error("You are not allowed to delete this group!"));

    if (!chat.groupChat && !chat.members.includes(req.user.toString()))
      return next(new Error("You are not allowed to delete this chat"));

    //Here we have to delete all the msgs as well as attachments or files
    // from cloudinary

    const messageWithAttachments = await Message.find({
      chat: chatId,
      attachments: { $exists: true, $ne: [] },
    });

    const public_ids = [];

    messageWithAttachments.forEach(({ attachments }) =>
      attachments.forEach(({ public_id }) => public_ids.push(public_id))
    );

    await Promise.all([
      deleteFilesFromCloudinary(public_ids),
      chat.deleteOne(),
      Message.deleteMany({ chat: chatId }),
    ]);

    emitEvent(req, REFETCH_CHATS, members);

    return res.status(200).json({
      success: true,
      message: "Chat Deleted Successfully 😣",
    });
  } catch (error) {
    return res.status(404).json({
      success: false,
      message: error.message,
    });
  }
};

const getMessages = async (req, res, next) => {
  try {
    const chatId = req.params.id;
    const { page = 1 } = req.query;

    const resultPerPage = 20;
    const skip = (page - 1) * resultPerPage;

    const chat = await Chat.findById(chatId);

    if (!chat) return next(new Error("Chat not found"));

    if (!chat.members.includes(req.user.toString()))
      return next(new Error("You are not allowed to access this chat"));

    const [messages, totalMessageCount] = await Promise.all([
      Message.find({ chat: chatId })
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(resultPerPage)
        .populate("sender", "name")
        .lean(),

      Message.countDocuments({ chat: chatId }),
    ]);

    const totalPages = Math.ceil(totalMessageCount / resultPerPage);

    return res.status(200).json({
      success: true,
      messages: messages.reverse(),
      totalPages,
    });
  } catch (error) {
    return res.status(404).json({
      success: false,
      message: error.message,
    });
  }
};

export {
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
  sendAttachments
};

