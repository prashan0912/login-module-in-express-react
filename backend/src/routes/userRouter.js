import express from "express";

import {
  // getAllUsersController,
  createUserController,
  // updateUserController,
  // deleteUserController,
  // getUserByIdController,
  userProfileController,
  // userLogoutController,
} from "../controller/usersController/userController.js";

import userLoginController from "../controller/usersController/userLoginController.js";
import { authValidation } from "../validation/validation.js";
import authMiddleware from "../validation/validation2.js";
const userRouter = express.Router();

// Admin only
// userRouter.get(
//   "/",
//   // checkRole("admin")
//   getAllUsersController,
// );

// // Admin only
// userRouter.put(
//   "/",
//   //  checkRole("admin"),
//   updateUserController,
// );

// // // Admin only
// userRouter.delete(
//   "/",
//   //  checkRole("admin"),
//   deleteUserController,
// );

// // // User + Admin
// userRouter.get(
//   "/id/",
//   //  checkRole("user", "admin"),
//   getUserByIdController,
// );

// // User + Admin
// userRouter.get(
//   "/users/:id/addresses",
//   checkRole("user", "admin"),
//   getUserAddresses,
// );

// Public / Signup
console.log(" reach router");
userRouter.post("/", createUserController);

userRouter.post(
  "/login",
  // authMiddleware,
  userLoginController,
);

userRouter.post("/profile", userProfileController);

// userRouter.post("/logout", userLogoutController);

export { userRouter };
