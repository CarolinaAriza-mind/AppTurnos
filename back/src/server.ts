import express, { Application } from "express";
import router from "./routes/indexRouter";
import morgan from "morgan";
import dotenv from "dotenv";
const server: Application = express();

server.use(express.json());
server.use(morgan("dev"));
dotenv.config();


server.use(router);

export default server;
