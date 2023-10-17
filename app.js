import express from "express"
import dotenv from 'dotenv'
import errorMiddleware from "./src/middlewares/errorMiddleware.js";
import cookieParser from "cookie-parser";
import userRouter from "./src/routes/userRouter.js";
dotenv.config()
const app = express()

app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({extended:true}))

app.use(`/api/v1`, userRouter);


app.use(errorMiddleware);


export default app