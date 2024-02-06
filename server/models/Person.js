import mongoose from "mongoose";

const PersonScheme = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    about: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const PersonModel = mongoose.model("Person", PersonScheme);

export default PersonModel;
