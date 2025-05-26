import { LOGGED_IN_USER } from "../../middlewares/auth.middleware";
import { createCommentController, getCommentsController } from "../../controllers/comment.controller"
import { Router } from "express"
import { CREATE_COMMENT_ENDPOINT, GET_COMMENTS_ENDPOINT } from "@repo/utils/endpoints";

export default (router: Router) => {
  router.post(CREATE_COMMENT_ENDPOINT,LOGGED_IN_USER, createCommentController)
  router.post(GET_COMMENTS_ENDPOINT,LOGGED_IN_USER, getCommentsController)
}