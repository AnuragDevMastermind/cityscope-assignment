import { UserResponse } from "@repo/datamodel/response";
import { createComment, getCommentsByPostId } from "../db/repositories/comment.repository";
import { Request, Response } from "express";

export const createCommentController = async (req: Request, res: Response) => {
  const userResponse = req.userResponse as UserResponse;
  const { postId, content } = req.body;

  if (
    !postId ||
    !content
  ) {
    return res.status(400).json({ message: "Missing or invalid fields" });
  }

  try {
    const comment = await createComment({ postId, userId: userResponse._id, content })
    return res.status(201).json({
      ...comment,
      userName: userResponse.name
    })
  } catch (error) {
    console.error("Create Comment Failed:", error);
    return res.status(500).json({ message: "Internal server error" })
  }
}

export const getCommentsController = async (req: Request, res: Response) => {
  const { postId } = req.body;

  if (!postId) {
    return res.status(400).json({ message: "Missing or invalid fields" });
  }

  try {
    const comments = await getCommentsByPostId(postId)
    return res.status(201).json(comments)
  } catch (error) {
    console.error("Get Comment Failed:", error);
    return res.status(500).json({ message: "Internal server error" })
  }
}