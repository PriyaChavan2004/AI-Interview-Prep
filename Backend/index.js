import { configDotenv } from "dotenv";
import express from "express";
import { connectDB } from "./config/DB.js";
import cookieParser from "cookie-parser";
import userRouter from "./Routes/user.routes.js";
import sessionRouter from "./Routes/session.routes.js";
import questionRoute from "./Routes/question.route.js";
import cors from "cors";
import path from 'path';

const _dirname = path.resolve()


configDotenv({});

const app = express();

app.use(
  cors({
    origin: 
      
      "http://localhost:5173" ,                           // local dev frontend
    
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
);

app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

app.use("/api/v1/user", userRouter);
app.use("/api/v1/session", sessionRouter);
app.use("/api/v1/question", questionRoute);

app.use(express.static(path.join(_dirname,"/Frontend/dist")));
app.use((req, res) => {
  res.sendFile(path.resolve(_dirname, "Frontend", "dist", "index.html"));
});
const port = process.env.PORT || 5000;
app.listen(port, () => {
  connectDB();
  console.log(`server started on port->${port}`);
});