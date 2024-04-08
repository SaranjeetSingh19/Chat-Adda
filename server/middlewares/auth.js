import jwt from "jsonwebtoken";

const isAuthenticated = (req, res, next) => {
    
    // console.log("cookies 1:=", req.cookies);
    // console.log("cookies 2:=", req.cookies["huddle-token"]);
    
      const token = req.cookies["huddle-token"];
  if (!token) return next(new Error("Please login to access this route"));

  const decodedData = jwt.verify(token, process.env.JWT_SECRET);

  req.user = decodedData._id;

  next();
};

export { isAuthenticated };
