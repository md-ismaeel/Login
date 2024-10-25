import express from "express";
import { forgetPassword, userLogOut, userLogin, userRegistration } from "../Controller/userController.js";
import authentication from "../Middleware/userAuthentication.js";
import confirmationEmail from "../Middleware/emailConfirmation.js";
import resetPassword from "../Middleware/resetPassword.js";
const userRouter = express.Router()

userRouter.post("/register", userRegistration);
userRouter.get("/confirmEmail/:token", confirmationEmail);
userRouter.post("/login", userLogin);
userRouter.get("/logout", authentication, userLogOut)
userRouter.post("/resetPassword", forgetPassword)
userRouter.post("/resetPassword/:token", resetPassword)

export default userRouter;