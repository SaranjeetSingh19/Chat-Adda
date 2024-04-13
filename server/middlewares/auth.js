import jwt from "jsonwebtoken";

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

export { isAuthenticated , adminOnly};
