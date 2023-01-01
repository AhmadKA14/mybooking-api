import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import cors from "cors";
import path from "path"
import { fileURLToPath } from 'url';

import authRoute from "./routes/auth.js"
import usersRoute from "./routes/users.js"
import hotelsRoute from "./routes/hotels.js"
import roomsRoute from "./routes/rooms.js"


const app = express()
dotenv.config()

const connect = async () => {
    try {
        await mongoose.connect(process.env.MONGO)
        console.log("Connected to MongoDB.");
    } catch (error) {
        throw error
    }
}

app.get("/", (req, res) => {
    res.send("MyBooking API")
})

// middlewares
mongoose.set('strictQuery', true)

app.use(cors({
    origin: ["https://mybooking.onrender.com"]
}))
app.use(cookieParser())
app.use(express.json())

app.use("/api/auth", authRoute)
app.use("/api/users", usersRoute)
app.use("/api/hotels", hotelsRoute)
app.use("/api/rooms", roomsRoute)

const port = 5000
app.listen(port, () => {
    connect()
    console.log(`Listening on port ${port}`);
})