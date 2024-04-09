import Chat from "../models/chat.models.js";
import { emitEvent } from "../utils/features.js";
import { ALERTS, REFETCH_CHATS } from "../constants/events.js";
import { getOtherMember } from "../lib/helper.js";
import User from "../models/user.models.js";

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

    if (!members || members.length < 1)
      return next(new Error("Please provide members 🙄"));

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
    console.log("ERROR:=", error);
    return res.status(404).json({
      success: false,
      message: error.message,
    });
  }
};

const removeMembers = async (req, res, next) => {
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

  chat.members = chat.members.filter(
    (member) => member.toString() !== userId.toString()
  );

  await chat.save();

  emitEvent(
    req,
    ALERTS,
    chat.members,
    `${userThatWillBeRemoved.name} has been removed from the group 😕 `
  );

  emitEvent(req, REFETCH_CHATS, chat.members);

  return res.status(200).json({
    success: true,
    message: "Member removed succesfully",
  });
};

const leaveGroup = async (req, ress, next) => {
  const chatId = req.params.id;

  const chat = await Chat.findById(chatId);

  if (!chat) return next(new Error("Chat not found!!!"));

  if (!chat.groupChat) return next(new Error("This is not a group chat"));

  chat.members = chat.members.filter(
    (member) => member.toString() !== req.user.toString()
  );
};

export {
  newGroupChat,
  getMyChats,
  getMyGroups,
  addMembers,
  removeMembers,
  leaveGroup,
};
