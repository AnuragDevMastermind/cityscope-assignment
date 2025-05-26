import { Router } from "express";

import {
  getLoggedInUser,
  getProfileController,
  updateUserBioController,
} from "../../controllers/user.controller";
import { LOGGED_IN_USER } from "../../middlewares/auth.middleware";
import {
  ALL_USERS_ENDPOINT,
  GET_PROFILE_ENDPOINT,
  LOGGED_IN_USER_ENDPOINT,
  UPDATE_BIO_ENDPOINT,
} from "@repo/utils/endpoints";

export default (router: Router) => {
  router.post(LOGGED_IN_USER_ENDPOINT, getLoggedInUser);
  router.get(GET_PROFILE_ENDPOINT, LOGGED_IN_USER, getProfileController)
  router.post(UPDATE_BIO_ENDPOINT, LOGGED_IN_USER, updateUserBioController)
};
