import express from "express";
import router from "./routes/indexRouter.js";
import morgan from "morgan";
import dotenv from "dotenv";
import cors from "cors";
const server = express();
server.use(express.json());
const allowedOrigins = [
    'http://localhost:5173',
    'https://appreservasrenaser.netlify.app'
];
server.use(cors({
    origin: allowedOrigins,
    credentials: true
}));
server.use(morgan("dev"));
dotenv.config();
server.use(router);
export default server;
