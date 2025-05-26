import mongoose, { Schema, Document, Types } from "mongoose";

export interface Post extends Document {
  userId: Types.ObjectId;
  content: string;
  postType: "recommend" | "ask" | "update" | "event";
  location: {
    type: "Point";
    coordinates: [number]; // [LONGITUDE, LATITUDE]
  };
  likes: Types.ObjectId[];
  dislikes: Types.ObjectId[];
  likesCount: number;
  dislikesCount: number;
}

const postSchema = new Schema<Post>(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    content: { type: String, required: true, maxlength: 280 },
    postType: {
      type: String,
      enum: ["recommend", "ask", "update", "event"],
      required: true,
    },
    location: {
      type: {
        type: String,
        enum: ["Point"],
        default: "Point",
        required: true,
      },
      coordinates: { type: [Number], required: true },
    },
    likes: [{ type: Schema.Types.ObjectId, ref: "User" }],
    dislikes: [{ type: Schema.Types.ObjectId, ref: "User" }],
    likesCount: { type: Number, default: 0 },
    dislikesCount: { type: Number, default: 0 },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

postSchema.index({ location: "2dsphere" });
postSchema.index({ createdAt: -1 });

export const PostModel = mongoose.model<Post>("Post", postSchema);
