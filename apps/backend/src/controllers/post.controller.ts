import { UserResponse } from "@repo/datamodel/response";
import { Request, Response } from "express";
import {
  createPost,
  dislikePost,
  getFeed,
  getPostReactions,
  getUserPosts,
  likePost,
  undoDislike,
  undoLike
} from "../db/repositories/post.repository";
import { generateSignedUrl, uploadImage } from "../helpers/post.helpers";

export const createPostController = async (req: Request, res: Response) => {
  const userResponse = req.userResponse as UserResponse;
  const { content, postType, coordinates } = req.body;

  if (
    !content ||
    !postType ||
    !Array.isArray(coordinates) ||
    coordinates.length !== 2
  ) {
    return res.status(400).json({ message: "Missing or invalid fields" });
  }

  try {
    const post = await createPost({
      userId: userResponse._id,
      content,
      postType,
      location: {
        type: "Point",
        coordinates: coordinates.map(coordinate => parseFloat(coordinate)),
      },
    });

    if (req.file && post) {
      await uploadImage(
        post._id.toString(),
        req.file.buffer,
        req.file.mimetype
      );
    }

    return res.status(201).json(post);
  } catch (error) {
    console.error("Create post error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const likePostController = async (req: Request, res: Response) => {
  const userResponse = req.userResponse as UserResponse;
  const { postId } = req.body;

  if (!postId) {
    return res.status(400).json({ message: "Post ID and User ID are required." });
  }

  try {
    await Promise.allSettled([
      likePost(postId, userResponse._id),
      undoDislike(postId, userResponse._id),
    ]);

    const postReactions = await getPostReactions(postId,userResponse._id)
    return res.status(200).json(postReactions);
  } catch (err) {
    console.error(`Unexpected error in likePostController:`, err);
    return res.status(500).json({ message: "An unexpected error occurred." });
  }
};

export const dislikePostController = async (req: Request, res: Response) => {
  const userResponse = req.userResponse as UserResponse;
  const { postId } = req.body;

  if (!postId) {
    return res.status(400).json({ message: "Post ID and User ID are required." });
  }

  try {
    await Promise.allSettled([
      dislikePost(postId, userResponse._id),
      undoLike(postId, userResponse._id),
    ]);

    const postReactions = await getPostReactions(postId,userResponse._id)
    return res.status(200).json(postReactions);
  } catch (err) {
    console.error(`Unexpected error in dislikePostController:`, err);
    return res.status(500).json({ message: "An unexpected error occurred." });
  }
};


export const undoLikeController = async (req: Request, res: Response) => {
  const userResponse = req.userResponse as UserResponse;
  const { postId } = req.body;

  if (!postId) {
    return res.status(400).json({ message: "Missing or invalid fields" });
  }

  try {

    await undoLike(postId, userResponse._id);

    const postReactions = await getPostReactions(postId,userResponse._id)

    return res.status(200).json(postReactions);
  } catch (err) {
    console.error("Undo like error:", err);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const undoDislikeController = async (req: Request, res: Response) => {
  const userResponse = req.userResponse as UserResponse;
  const { postId } = req.body;

  if (!postId) {
    return res.status(400).json({ message: "Missing or invalid fields" });
  }

  try {
    await undoDislike(postId, userResponse._id);

    const postReactions = await getPostReactions(postId,userResponse._id)

    return res.status(200).json(postReactions);
  } catch (err) {
    console.error("Undo dislike error:", err);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getUserPostsController = async (req: Request, res: Response) => {
  const userResponse = req.userResponse as UserResponse;

  try {
    let posts = await getUserPosts(userResponse._id);

    posts = await Promise.all(
      posts.map(async (post) => ({
        ...post,
        imageUrl: await generateSignedUrl(post._id.toString()),
      }))
    );

    return res.status(200).json(posts);
  } catch (error) {
    console.error("User Post error:", error)
    res.status(500).json({ message: "Internal server error" })
  }
}

export const getFeedController = async (req: Request, res: Response) => {
  const { filters } = req.body;
  const userResponse = req.userResponse as UserResponse;

  try {
    let feeds = await getFeed(userResponse._id, filters);
    feeds = await Promise.all(
      feeds.map(async (feed) => ({
        ...feed,
        imageUrl: await generateSignedUrl(feed._id.toString()),
      }))
    );
    return res.status(200).json(feeds);
  } catch (error) {
    console.error("Feed error:", error)
    res.status(500).json({ message: "Internal server error" })
  }
}

