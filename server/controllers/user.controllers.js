import { compare } from "bcrypt";
import User from "../models/user.models.js";
import { cookieOptions, sendToken } from "../utils/features.js";

const newUsers = async (req, res, next) => {
  try {
    const { name, username, password, bio } = req.body;

    console.log(req.body);

    const avatar = {
      public_id: "randomPublicId",
      url: "randomUrl",
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
    next(error);
  }
};

const login = async (req, res, next) => {
  try {
    const { username, password } = req.body;

    const user = await User.findOne({ username }).select("+password");

    if (!user) return next(new Error("Invalid Username"));

    const isMatch = await compare(password, user.password);

    if (!isMatch) return next(new Error("Invalid Password"));

    sendToken(res, user, 200, `Welcome back ${user.name}`);
  } catch (error) {
    next(error);
  }
};

const getMyProfile = async (req, res) => {
  const user = await User.findById(req.user);

  res.status(201).json({
    success: true,
    message: user,
  });
};

const logout = async (req, res) => {
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

const searchUser = async (req, res) => {
  const naam = req.query.name;

  return res.status(200).json({
    success: true,
    message: naam,
  });
};

export { login, newUsers, getMyProfile, logout, searchUser };
