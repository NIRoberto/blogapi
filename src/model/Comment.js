import mongoose from "mongoose";
import validator from "validator";

const commentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Name field is required"],
  },
  user: {
    type: String,
  },
  email: {
    type: String,
    required: [true, "Title field is required"],
    validator: [validator.isEmail, "Please provide a valid email"],
  },
  comment: {
    type: String,
    required: [true, "comments field is required"],
  },
});
const commentModel = mongoose.model("Comment", commentSchema);

export default commentModel;
