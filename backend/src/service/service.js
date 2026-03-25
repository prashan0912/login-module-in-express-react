import {
  createUserRepository,
  findUserRepository,
} from "../repository/createUserRepository.js";

async function createUserService(userData) {
  //validation pahle se exist to nhi karta
  console.log("createUserService");
  console.log(userData);
  let user;
  try {
    user = await findUserRepository({
      // username: userData.username,
      email: userData.email,
      // password: userData.password,
      // role: userData.role,
    });
  } catch (error) {
    console.log("error in createUserService 2 ", error);
  }

  if (user) {
    throw {
      reason: "User with given Email and mobile Number already exist",
      statusCode: 400,
    };
  }

  let newUser;

  console.log(newUser);
  try {
    newUser = await createUserRepository({
      username: userData.username,
      email: userData.email,
      password: userData.password,
      role: userData.role,
    });
    console.log(newUser);
  } catch (error) {
    console.log("the error in createUserService", error);
  }

  if (!newUser) {
    throw {
      reason: "somthing went wrong cannot create user ",
      statusCode: 500,
    };
  }
  return newUser;
}

export default createUserService;
