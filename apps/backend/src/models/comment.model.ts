import mongoose, { Schema, Document, Types } from "mongoose";

export interface Comment extends Document {
  postId: Types.ObjectId;
  userId: Types.ObjectId;
  content: string;
}

const commentSchema = new Schema<Comment>(
  {
    postId: { type: Schema.Types.ObjectId, ref: "Post", required: true },
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    content: { type: String, required: true, maxlength: 280 },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

commentSchema.index({ createdAt: -1 });

export const CommentModel = mongoose.model<Comment>("Comment", commentSchema);
