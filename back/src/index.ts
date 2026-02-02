import "reflect-metadata";
// 🔥 IMPORTANTE: Importar envs.js PRIMERO para cargar variables
import "./config/envs.js";

import express from "express";
import cors from "cors";
import morgan from "morgan";
import { appDataSource } from "./config/dataSource.js";
// ... resto de imports

const app = express();
const PORT = process.env.PORT || 3003;

// Middlewares
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());

// Routes
// ... tus rutas

// Iniciar servidor
appDataSource
  .initialize()
  .then(() => {
    console.log("✅ Base de datos conectada");
    app.listen(PORT, () => {
      console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    console.error("❌ Error conectando a la base de datos:", error);
  });


