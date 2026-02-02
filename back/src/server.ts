import dotenv from "dotenv";
dotenv.config();

import express, { Application, Request, Response } from "express";
import router from "./routes/indexRouter.js";
import morgan from "morgan";
import cors from "cors";

const server: Application = express();

// Middlewares
server.use(express.json());
server.use(morgan("dev"));

// CORS dinámico
const allowedOrigins = [
  "http://localhost:5173",
  "https://appreservasrenaser.netlify.app",
];

server.use(
  cors({
    origin: (origin, callback) => {
      // Permite solicitudes sin origin (Postman, curl)
      if (!origin) return callback(null, true);

      if (allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("CORS no permitido por el servidor"));
      }
    },
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"], // permite todos los métodos usados
    credentials: true, // permite cookies / auth headers
  })
);

// Para manejar preflight requests (OPTIONS)
server.options("*", cors());

// Rutas
server.use("/users", router);

// Root
server.get("/", (_, res: Response) => {
  res.send("Backend de AppTurnos funcionando ✅");
});

export default server;

