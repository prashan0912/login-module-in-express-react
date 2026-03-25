import express from "express";
import { serverConfig } from "./src/config/serverConfig.js";
import connectDB from "./src/config/dbConfig.js";
import { userRouter } from "./src/routes/userRouter.js";
import cookieParser from "cookie-parser";

import cors from "cors";
const app = express();

// app.use(cors());
app.use(cookieParser());

app.use(express.json());

app.use(
  cors({
    origin: "http://localhost:5173", // your frontend URL
    credentials: true,
    sameSite: "lax",
    httpOnly: true,
  }),
);
app.listen(serverConfig.Port, async () => {
  try {
    await connectDB();
    console.log("hello");
    console.log("server running in port");
    console.log(`server is running on ${serverConfig.Port}`);

  } catch (error) {
    console.log(`server is running on error in port`);
  }
});

app.use("/users", userRouter); //ok


