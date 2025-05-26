import { Router } from "express";
import multer from "multer";
import {
  createPostController,
  dislikePostController,
  getFeedController,
  getUserPostsController,
  likePostController,
  undoDislikeController,
  undoLikeController
} from "../../controllers/post.controller";
import { LOGGED_IN_USER } from "../../middlewares/auth.middleware";
import {
  CREATE_NEW_POST_ENDPOINT,
  GET_FEED_ENDPOINT,
  GET_USER_POSTS_ENDPOINT,
  DISLIKE_POST_ENDPOINT,
  LIKE_POST_ENDPOINT,
  UNDO_DISLIKE_POST_ENDPOINT,
  UNDO_LIKE_POST_ENDPOINT,
} from "@repo/utils/endpoints";


const storage = multer.memoryStorage();
const upload = multer({ storage });

export default (router: Router) => {
  router.post(CREATE_NEW_POST_ENDPOINT, upload.single('image'), LOGGED_IN_USER, createPostController);
  router.post(GET_USER_POSTS_ENDPOINT, LOGGED_IN_USER, getUserPostsController)
  router.post(LIKE_POST_ENDPOINT, LOGGED_IN_USER, likePostController)
  router.post(DISLIKE_POST_ENDPOINT, LOGGED_IN_USER, dislikePostController)
  router.post(UNDO_LIKE_POST_ENDPOINT, LOGGED_IN_USER, undoLikeController)
  router.post(UNDO_DISLIKE_POST_ENDPOINT, LOGGED_IN_USER, undoDislikeController)
  router.post(GET_FEED_ENDPOINT, LOGGED_IN_USER, getFeedController)
};
