import User from "../../model/userModel.js";
import jwt from "jsonwebtoken";
import { serverConfig } from "../../config/serverConfig.js";

const userLoginController = async (req, res) => {
  console.log("userloginController");

  const { email, password } = req.body;

  console.log(email + " " + password);

  const user = await User.findOne({ email: email });

  if (!user) {
    return res.status(400).json({
      message: "User not found",
    });
  }
  console.log(user);

  //comparePassword funtion is written in User model
  const isMatch = await user.comparePassword(password);
  if (!isMatch) {
    return res.status(400).json({
      message: "Invalid password",
    });
  }
  console.log("password match");

  const tokenid = jwt.sign(
    { id: user._id, email: user.email },
    serverConfig.JWT_SECRET,
    {
      expiresIn: "24h",
    },
  );
  // console.log(tokenid);

  res.cookie("authToken", tokenid, {
    httpOnly: false,
    secure: false, // dev
    sameSite: "lax",
  });

  res.json({
    status: true,
    message: "login successfully",
    data: user.username,
  });
};

export default userLoginController;
