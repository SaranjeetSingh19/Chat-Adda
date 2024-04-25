import { envMode } from "../app.js";

const errorMiddleWare = (err, req, res, next) => {
  err.message ||= "Internal sever error";
  err.statuscode ||= 500;

  //     if (err.name === "CastError") {
  //     const errorPath = err.path;
  //     err.message = `Invalid Format of ${errorPath}`;
  //     err.statusCode = 400;
  //   }

  const response = {
    success: false,
    message: err.message,
  };

  if (envMode === "DEVELOPMENT") {
    response.error = err;
  }

  return res.status(err.statusCode).json(response);
};

export { errorMiddleWare };

// // if (err.code === 11000) {
// //   const error = Object.keys(err.keyPattern).join(",");

// //   err.message = `Duplicate field - ${error}`;
// //   err.statuscode = 400;
// // }
