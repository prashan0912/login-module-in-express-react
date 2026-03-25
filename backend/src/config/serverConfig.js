import dotenv from "dotenv";
dotenv.config();
// console.log(dotenv.config());
export const serverConfig = {
  Port: process.env.PORT || 3000,
  dbLink: process.env.DB_URL,
  JWT_SECRET: process.env.JWT_SECRET,
  JWT_EXP : process.env.JWT_EXP
};
