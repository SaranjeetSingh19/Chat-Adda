import { v2 as cloudinary } from "cloudinary";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";
import { v4 as uuid } from "uuid";
import { getBase64, getSockets } from "../lib/helper.js";

const cookieOptions = {
  maxAge: 15 * 24 * 60 * 60 * 1000,
  sameSite: "none",
  httpOnly: true,
  secure: true,
};

const connectDb = (uri) => {
  mongoose
    .connect(uri, { dbName: "Huddle" })
    .then((data) =>
      console.log(
        `Connected to ${data.connection.name} with Host: ${data.connection.host}`
      )
    )
    .catch((err) => {
      throw err;
    });
};

const sendToken = (res, user, code, message) => {
  const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);

  return res.status(code).cookie("huddle-token", token, cookieOptions).json({
    success: true,
    user,
    message,
  });
};

const emitEvent = (req, event, users, data) => {
  const io = req.app.get("io");
  const userSockets = getSockets(users);
  io.to(userSockets).emit(event, data);
};

const uploadFilesToCloudinary = async (files = []) => {
  const uploadPromises = files.map((file) => {
    return new Promise((resolve, reject) => {
      cloudinary.uploader.upload(
        // Cloudinary method
        getBase64(file),
        {
          resouce_type: "auto",
          public_id: uuid(),
        },
        (error, result) => {
          if (error) return reject(error);
          resolve(result);
        }
      );
    });
  });
  try {
    const results = await Promise.all(uploadPromises);

    const formattedResults = results.map((result) => ({
      public_id: result.public_id,
      url: result.secure_url,
    }));
    return formattedResults;
  } catch (error) {
    throw new Error("Error in uploading files to cloudinary:", error);
  }
};

const deleteFilesFromCloudinary = async (public_ids) => {
  // Delete files from cloudinary
};

export {
  connectDb, cookieOptions, deleteFilesFromCloudinary, emitEvent, sendToken, uploadFilesToCloudinary
};

