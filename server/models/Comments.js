import mongoose from "mongoose";

const CommentsScheme = mongoose.Schema(
  {
    comment: {
      type: String,
      required: true,
    },
    personId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Person",
    },
    upVotes: {
      type: Number,
      default: 0,
    },
    downVotes: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

const CommentsModel = mongoose.model("Comments", CommentsScheme);

export default CommentsModel;
