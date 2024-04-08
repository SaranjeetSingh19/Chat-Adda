import { compare } from "bcrypt";
import User from "../models/user.models.js";
import { sendToken } from "../utils/features.js";

const newUsers = async (req, res) => {
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
};

const login = async (req, res) => {
  const { username, password } = req.body;

  const user = await User.findOne({ username }).select("+password");

  if (!user)
    return res.status(404).json({ message: "Invalid username" });

  const isMatch = await compare(password, user.password);

  if (!isMatch)
    return res.status(404).json({ message: "Invalid password" });

  sendToken(res, user, 200, `Welcome back ${user.name}`);
};

export { login, newUsers };
