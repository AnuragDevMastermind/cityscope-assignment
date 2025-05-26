import { Request, Response } from "express";

import { getProfile, getUsers, updateUserBio } from "../db/repositories/user.respository";
import { getUserFromToken, verifyToken } from "../helpers/auth.helper";
import { UserResponse } from "@repo/datamodel/response";

export const getLoggedInUser = async (req: Request, res: Response) => {
  const authorization = req.cookies.Authorization;

  if (!authorization) {
    return res.status(200).json({ user: null });
  }

  const accessToken = authorization.split(" ")[1];

  if (!accessToken) {
    return res.status(200).json({ user: null });
  }

  const isValidToken = verifyToken(accessToken);
  if (!isValidToken) {
    return res.status(200).json({ user: null });
  }

  const userResponse = getUserFromToken(accessToken);

  return res.status(200).json({
    user: userResponse,
  });
};

export const getProfileController = async (req: Request, res: Response) => {
  const userResponse = req.userResponse as UserResponse;
  
  try {
    const profileArr = await getProfile(userResponse._id)
    return res.status(200).json(profileArr?.[0])
  } catch (error) {
    console.error("Get Profile failed:", error)
    return res.status(500).json({ message: "Internal Server Error" })
  }
}

export const updateUserBioController = async (req: Request, res: Response) => {
  const userResponse = req.userResponse as UserResponse;
  const {newBio } = req.body

  if (!newBio) {
    res.status(400).json({ message: "Missing or invalid fields" })
  }
  
  try {
    const user = await updateUserBio(userResponse._id, newBio)
    return res.status(200).json(user)
  } catch (error) {
    console.error("Get Profile failed:", error)
    return res.status(500).json({ message: "Internal Server Error" })
  }

}