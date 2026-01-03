import mongoose, { model, Schema } from "mongoose";
import { userRoles } from "../../middleware/auth.middleware.js";

const userSchema = new Schema({
  username: {
    type: String,
    minlength: 2,
    maxlength: 25,
    trim: true,
    required: [true, 'userName is required']
  },
  email: {
    type: String,
    unique: true,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  gender: {
    type: String,
    enum: ['male', 'female'],
    defaule: 'male'
  },
  DOB: Date,
  address: String,
  phone: String,
  image: String,
  confirmEmail: {
    type: Boolean,
    default: false
  },
  role: {
    type: String,
    default: userRoles.user,
    enum: Object.values(userRoles)
  },
  changePasswordTime: Date,
  isDeleted: { type: Boolean, default: false }
}, {timestamps: true})

const userModel = mongoose.models.User || model("User", userSchema)

export default userModel