import mongoose, { model } from "mongoose";
import { iUser } from "../Utils/interfaces";

interface iUserData extends iUser, mongoose.Document {}

export const userSchema = new mongoose.Schema<iUserData>({
  userName: {
    type: String,
  },
  email: {
    type: String,
  },
  password: {
    type: String,
  },
  bio: {
    type: String,
  },
  avatar: {
    type: String,
  },
  avatarID: {
    type: String,
  },
});

export const userModel = model<iUserData>("users" , userSchema)