import Chat from "../models/chat.models.js";
import { emitEvent } from "../utils/features.js";
import { ALERTS, REFETCH_CHATS } from "../constants/events.js";

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

    const chats = await Chat.find({members : req.user}).populate(
      "members",
      "name avatar"
    )

  

    return res.status(201).json({
      success: true,
      message: chats,
    });
  } catch (error) {
    return res.status(404).json({
      success: false,
      message: error.message,
    });
  }
};

export { newGroupChat, getMyChats };
