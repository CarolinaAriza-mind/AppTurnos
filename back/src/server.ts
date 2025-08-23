import express, { Application, Router } from "express";
import router from "./routes/indexRouter";

const server: Application = express();

server.use(express.json());
server.use(router);

export default server;
