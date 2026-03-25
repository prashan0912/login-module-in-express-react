import mongoose from "mongoose";

import { serverConfig } from "./serverConfig.js";

async function connectDB() {
  try {
    await mongoose.connect(serverConfig.dbLink);
    console.log("db connected successfully");
  } catch (e) {
    console.log("something went wrong Error :", e);
  }
}

export default connectDB;



