import mongoose from "mongoose";
import validator from "validator";

const letterSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, "Email field is required"],
    validator: [validator.isEmail, "Please provide a valid email"],
  },
});
const letterModel = mongoose.model("Letter", letterSchema);

export default letterModel;
