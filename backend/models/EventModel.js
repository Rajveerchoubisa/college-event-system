import mongoose, { mongo } from "mongoose";

const eventSchema = new mongoose.Schema(
  {
    title: String,
    description: String,
    date: {
      type: Date,
      required: true,
    },
    venue: String,
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    checkIns: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    registered: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
  },
  { timestamps: true }
);

export default mongoose.model("Event", eventSchema);
