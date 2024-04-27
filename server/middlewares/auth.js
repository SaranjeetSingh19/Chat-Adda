import jwt from "jsonwebtoken";
import User from "../models/user.models.js";

const isAuthenticated = (req, res, next) => {
  const token = req.cookies["huddle-token"];
  if (!token) return next(new Error("Please login to access this route"));

  const decodedData = jwt.verify(token, process.env.JWT_SECRET);

  req.user = decodedData._id;

  next();
};

const adminOnly = (req, res, next) => {
  const token = req.cookies["huddle-admin-token"];
  if (!token) return next(new Error("You are not Logged In as Admin"));

  const secretKey = jwt.verify(token, process.env.JWT_SECRET);

  const adminSecretKey =
    process.env.ADMIN_SECRET_KEY ||
    "fkljsdierdjkfhkjgsefvwrygtufnvxfjkvuiwerfhreugfjksdhfeuiwgfbh";

  const isMatched = secretKey === adminSecretKey;

  if (!isMatched) return next(new Error("Only Admin can access this route!!!"));

  next();
  // req.user = decodedData._id;
};

const socketAuthenticator = async (err, socket, next) => {
  try {
    if (err) return next(err);
    const authToken = socket.request.cookies["huddle-token"];

    if (!authToken) return next(new Error("Please login to access this route"));

    const decodedData = jwt.verify(authToken, process.env.JWT_SECRET);

    const user = await User.findById(decodedData._id);

    if (!user) return next(new Error("Please login to access this route"));

    socket.user = user;

    return next();
  } catch (error) {
    return next(new Error("Please login to access this page"));
  }
};

export { adminOnly, isAuthenticated, socketAuthenticator };
