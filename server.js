import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import connectToDatabase from "./config/db.js";
import { movieRouter } from "./routes/movieRoute.js";
import { userRouter } from "./routes/userRoute.js";

const app = express();

app.use(cors());
app.use(express.json());

dotenv.config()

const port = process.env.PORT || 4000;
connectToDatabase()

app.use('/api/v1/movies', movieRouter);
app.use('/api/v1/auth', userRouter);

app.get("/", (req, res) => {
    res.send('API is running....')
})

app.listen(port, (req, res) => {
    console.log("Server listening on port " + port)
})