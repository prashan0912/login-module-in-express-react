import createUserService from "../../service/service.js";
import User from "../../model/userModel.js";
import jwt from "jsonwebtoken"
import { serverConfig } from "../../config/serverConfig.js";

const createUserController = async (req, res) => {
  try {
    console.log("reach createUserController");
    console.log(req.body);
    const response = await createUserService(req.body);
    return res.status(201).json({
      message: "successfully registered the user",
      success: true,
      data: response,
      error: {},
    });
  } catch (error) {
    console.log("error in reach createUserController", error);
    return res.status(202).json({
      success: false,
      message: error,
      data: {},
      error: error,
    });
  }
};

// const deleteUserController = async (req, res) => {
//   try {
//     const userId = req.query.id;

//     const deletedUser = await User.findByIdAndDelete(userId);

//     if (!deletedUser) {
//       return res.status(404).json({
//         success: false,
//         message: "User not found",
//       });
//     }

//     res.status(200).json({
//       success: true,
//       message: "User deleted successfully",
//       data: deletedUser,
//     });
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

// const getAllUsersController = async (req, res) => {
//   try {
//     console.log("reach createUserController");
//     console.log(req.body);
//     // const response = await getAllUserService(req.body);
//     const response = await User.find({});
//     return res.status(201).json({
//       message: "successfully fetch the all user",
//       success: true,
//       data: response,
//       error: {},
//     });
//   } catch (error) {
//     console.log("error in reach fetch all user", error);
//     return res.status(202).json({
//       success: false,
//       message: error,
//       data: {},
//       error: error,
//     });
//   }
// };

// const getUserByIdController = async (req, res) => {
//   try {
//     console.log("reach getUserByController");
//     const userid = req.query.id;
//     console.log(req.query.id);
//     const response = await User.findById(userid);
//     return res.status(201).json({
//       message: "successfully fetch the user",
//       success: true,
//       data: response,
//       error: {},
//     });
//   } catch (error) {
//     console.log("error in reach fetch user", error);
//     return res.status(202).json({
//       success: false,
//       message: error,
//       data: {},
//       error: error,
//     });
//   }
// };

// const userLoginController = async (req, res) => {
//   console.log("userloginController");

//   const { email, password } = req.body;

//   console.log(email + " " + password);

//   const user = await User.findOne({ email: email });

//   if (!user) {
//     return res.status(400).json({
//       message: "User not found",
//     });
//   }
//   console.log(user);

//   //comparePassword funtion is written in User model
//   const isMatch = await user.comparePassword(password);
//   if (!isMatch) {
//     return res.status(400).json({
//       message: "Invalid password",
//     });
//   }
//   console.log("password match");

//   const tokenid = jwt.sign(
//     { id: user._id, email: user.email },
//     serverConfig.JWT_SECRET,
//     {
//       expiresIn: "24h",
//     },
//   );
//   // console.log(tokenid);

//   res.cookie("authToken", tokenid, {
//     httpOnly: true,
//     secure: false,
//     sameSite: "none",
//   });

//   res.json({
//     message: "login successfully",
//     data: user.username,
//     token: tokenid,
//   });
// };

// const updateUserController = async (req, res) => {
//   try {
//     const userId = req.query.id;

//     const updatedUser = await User.findByIdAndUpdate(userId, req.body, {
//       new: true,
//     });

//     res.status(200).json({
//       success: true,
//       data: updatedUser,
//     });
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

// const userLogoutController = async (req, res) => {
//   try {
//     res.clearCookie("authToken", {
//       httpOnly: true,
//       sameSite: "lax",
//       secure: false,
//     });

//     return res.status(200).json({
//       success: true,
//       message: "Logged out successfully",
//     });
//   } catch (error) {
//     return res.status(500).json({
//       success: false,
//       message: "Logout failed",
//       error,
//     });
//   }
// };

const userProfileController = async (req, res) => {
  try {
    // Get Authorization header
    console.log(req.body)
    console.log("userProfileController");
    // const authHeader = req.headers.authorization;
    const authHeader = req.headers.authorization;;

    console.log("authHeader", authHeader);

    // Check if token exists
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({
        success: false,
        message: "No token provided",
      });
    }

    // Extract token
    const token = authHeader.split(" ")[1];

    // Verify token
    const decoded = jwt.verify(token, serverConfig.JWT_SECRET);

    console.log(decoded)
    // Fetch user (exclude password)
    const user = await User.findById(decoded.id).select("password");

    console.log("user",user)
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    //  Send response
    return res.status(200).json({
      success: true,
      message: "User profile fetched successfully",
      data: user,
    });
  } catch (error) {
    console.log("Profile error:", error);

    return res.status(401).json({
      success: false,
      message: "Invalid or expired token",
    });
  }
};

export {
  createUserController,
  // deleteUserController,
  // getAllUsersController,
  // getUserByIdController,
  // userLoginController,
  // updateUserController,
  // userLogoutController,
  userProfileController,
};
