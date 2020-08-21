import express from "express";
import routes from "../routes";
import {
  userDetail,
  changePassword,
  getMe,
  getEditProfile,
} from "../controllers/userController";
import { onlyPrivate } from "../middlewares";

const userRouter = express.Router();

userRouter.get(routes.editProfile, onlyPrivate, getEditProfile);
userRouter.get(routes.changePassword, onlyPrivate, changePassword);

userRouter.get(routes.me, getMe);
userRouter.get(routes.userDetail(), onlyPrivate, userDetail);

export default userRouter;
