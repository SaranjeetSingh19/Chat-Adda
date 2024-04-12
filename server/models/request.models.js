import mongoose ,{ Schema, Types, model,   } from "mongoose";

const schema = new mongoose.Schema(
  {
    status: {
      type: String,
      default: "pending",
      enum: ["pending", "accepted", "rejected"],
    },
    sender: {
      type: Types.ObjectId,
      ref: "User",
      required: true,
    },
    receiver: {
      type: Types.ObjectId, 
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

const Request = mongoose.model("Request", schema)

export default Request

// export const Request = mongoose.models.Request || model(Request, schema);
