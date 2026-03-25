import User from "../model/userModel.js";
import bcrypt from "bcrypt";
async function findUserRepository(paramUserData) {
  try {
    console.log("repository", paramUserData);
    const response = await User.findOne(paramUserData);
    console.log(response);
    return response;
  } catch (e) {
    console.log("user already exist ", e);
  }
}

async function createUserRepository(userData) {
  try {
    // const hashedPassword = await bcrypt.hash(userData.password, 10);
    // userData.password = hashedPassword;

    console.log("createUserRepo", userData);
    const response = await User.create(userData);
    return response;
  } catch (error) {
    console.log("user not created successfully exist ", error);
  }
}

export { findUserRepository, createUserRepository };
