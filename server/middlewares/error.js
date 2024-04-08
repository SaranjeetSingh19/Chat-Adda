const errorMiddleWare = (err, req, res, next) => {
  err.message ||= "Internal sever error";
  err.statuscode ||= 500;

  return res.status(err.statuscode).json({
    success: false,
    message: err.message,
  });
};

export { errorMiddleWare };
