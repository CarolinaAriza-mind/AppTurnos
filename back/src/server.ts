import dotenv from "dotenv";
dotenv.config();

import express, { Application } from "express";
import router from "./routes/indexRouter.js";
import morgan from "morgan";
import cors from "cors";

const server: Application = express();

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

server.use(router);

export default server;

