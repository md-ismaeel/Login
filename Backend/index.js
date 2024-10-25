import express from "express";
import mongoose from "mongoose";
import "dotenv/config";
import cors from "cors";
import cookieParser from "cookie-parser"

import userRouter from "./Routes/userRoutes.js";

const corsOptions = {
    origin: [
        "http://localhost:5173",
        "https://login-gules-two.vercel.app",
        "https://kkdp-assignment.netlify.app"
    ],
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
};


const PORT = process?.env?.PORT || 10000;
const mongoUri = process?.env?.MONGODB_URI;
const app = express();
app.use(express.json());
app.use(cookieParser())
app.use(cors(corsOptions))

mongoose
    .connect(`${mongoUri}`)
    .then(() => console.log("mongoDb connection stablish successfully!!"))
    .catch((err) => console.log(`Error-Occurred ${err.message}`));

app.use("/api/v1/user", userRouter);

app.use("/*", (req, res) => {
    return res.status(404).json({
        success: false,
        message: "path not found!!",
    });
});

app.listen(PORT, (err) => {
    if (err) {
        console.log(err.message);
    }
    console.log(`Server is up and running on port ${PORT}`)
})
