import { body, check, param, validationResult } from "express-validator";

const validateHandler = (req, res, next) => {
  const errors = validationResult(req);

  const errorMessages = errors
    .array()
    .map((error) => error.msg)
    .join(",");

  

  if (errors.isEmpty()) return next();
  else next(new Error(errorMessages));
};

const registerValidator = () => [
  body("name", "Please enter Name").notEmpty(),
  body("username", "Please enter Username").notEmpty(),
  body("bio", "Please enter Bio").notEmpty(),
  body("password", "Please enter Password").notEmpty(),
];

// const loginValidator = () => [
//   body("username", "Invalid Usernamey or Password").notEmpty(),
//   body("password", "Invalid Username or Password").notEmpty(),
// ];

const loginValidator = () => [
  body("username", "Please Enter Username").notEmpty(),
  body("password", "Please Enter Password").notEmpty(),
];

const newGroupValidator = () => [
  body("name", "Please enter Name").notEmpty(),
  body("members")
    .notEmpty()
    .withMessage("Please include memebers")
    .isArray({ min: 2, max: 100 })
    .withMessage("Members must be 2-100"),
];

const addMemberValidator = () => [
  body("chatId", "Please provide Chat ID").notEmpty(),
  body("members")
    .notEmpty()
    .withMessage("Please include memebers")
    .isArray({ min: 1, max: 30 })
    .withMessage("Members must be 1-30"),
];

const removeMemberValidator = () => [
  body("chatId", "Please enter Chat ID").notEmpty(),
  body("userId", "Please enter User ID").notEmpty(),
];

const leaveGroupValidator = () => [
  param("id", "Please enter Chat ID").notEmpty(),
];

const sendAttachmentValidator = () => [
  body("chatId", "Please enter Chat ID").notEmpty(),
];

const getMessageValidator = () => [
  param("id", "Please enter Chat ID").notEmpty(),
];

const chatIdValidator = () => [param("id", "Please enter Chat ID").notEmpty()];

const renameValidator = () => [
  param("id", "Please enter Chat ID").notEmpty(),
  body("name", "Please enter New Name").notEmpty(),
];

const sendRequestValidator = () => [
  body("userId", "Please enter User ID").notEmpty(),
];

const acceptRequestValidator = () => [
  body("requestId", "Please enter Request ID").notEmpty(),
  body("accept")
    .notEmpty()
    .withMessage("Please Add Accept")
    .isBoolean()
    .withMessage("Accept must be a boolean"),
];

const adminLoginValidator = (req, res, next) => [
  body("secretKey", "Please enter Secret Key").notEmpty(),
];

export {
  registerValidator,
  validateHandler,
  loginValidator,
  newGroupValidator,
  addMemberValidator,
  removeMemberValidator,
  leaveGroupValidator,
  sendAttachmentValidator,
  getMessageValidator,
  chatIdValidator,
  renameValidator,
  sendRequestValidator,
  acceptRequestValidator,
  adminLoginValidator,
};
