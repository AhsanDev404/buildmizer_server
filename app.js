import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import errorMiddleware from "./src/middlewares/errorMiddleware.js";
import cookieParser from "cookie-parser";
import userRouter from "./src/routes/userRouter.js";
import productRouter from "./src/routes/productRouter.js";
dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

app.use(`/api/v1`, userRouter);
app.use(`/api/v1`, productRouter);

app.use(errorMiddleware);

export default app;
