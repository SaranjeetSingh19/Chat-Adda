const errorMiddleWare = (err, req, res, next) => {
  err.message ||= "Internal sever error";
  err.statuscode ||= 500;

  //     if (err.name === "CastError") {
  //     const errorPath = err.path;
  //     err.message = `Invalid Format of ${errorPath}`;
  //     err.statusCode = 400;
  //   }

  return res.status(err.statuscode).json({
    success: false,
 
    message: err.message,
  });
};

export { errorMiddleWare };

// // if (err.code === 11000) {
// //   const error = Object.keys(err.keyPattern).join(",");

// //   err.message = `Duplicate field - ${error}`;
// //   err.statuscode = 400;
// // }
