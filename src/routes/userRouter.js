import express from "express";

import {
  forgotPassword,
  getUserDetails,
  login,
  logout,
  register,
  resetPassword,
  verifyEmailRequest,
} from "../controllers/userController.js";
import {
  forgetPasswordEmailValidation,
  loginValidation,
  registerValidation,
  resetPasswordValidation,
} from "../middlewares/formValidation.js";
import { isAuthenticate } from "../middlewares/auth.js";
import { verifyEmail } from "../controllers/userController.js";
import { isVerified } from "../middlewares/auth.js";

const userRouter = express.Router();
// google authentication setup

// local authentication setup
userRouter.route("/register").post(registerValidation, register);
userRouter.route("/login").post(loginValidation, login);
userRouter.route("/logout").get(isAuthenticate, logout);
userRouter.route("/me").get(isAuthenticate, getUserDetails);
userRouter.route("/verify/email").get(isAuthenticate, verifyEmailRequest);
userRouter.route("/verify/email/:token").get(verifyEmail);
userRouter
  .route("/password/reset")
  .post(forgetPasswordEmailValidation, forgotPassword);
userRouter
  .route("/password/reset/:token")
  .post(resetPasswordValidation, resetPassword);

export default userRouter;
