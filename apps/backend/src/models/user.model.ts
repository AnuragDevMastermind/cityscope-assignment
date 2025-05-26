import bcrypt from "bcryptjs";
import mongoose, { Document, Schema } from "mongoose";

interface UserDocument extends Document {
  number: string;
  name: string;
  password: string;
  bio: string;
}

const userSchema: Schema<UserDocument> = new Schema<UserDocument>(
  {
    number: { type: String, required: true },
    name: { type: String, required: true },
    password: { type: String, required: true, select: false },
    bio: { type: String },
  },
  { versionKey: false }
);

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  try {
    const saltRounds = 12;
    const salt = await bcrypt.genSalt(saltRounds);
    const hashedPassword = await bcrypt.hash(this.password, salt);
    this.password = hashedPassword;
    next();
  } catch (error) {
    next(error);
  }
});

export const UserModel = mongoose.model("User", userSchema);
