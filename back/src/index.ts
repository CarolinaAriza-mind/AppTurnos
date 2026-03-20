import "reflect-metadata";
import "./config/envs.js";
import { appDataSource } from "./config/dataSource.js";
import server from "./server.js";
import { PORT } from "./config/envs.js";

appDataSource
  .initialize()
  .then(() => {
    console.log("✅ Base de datos conectada");
    server.listen(PORT, () => {
      console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    console.error("❌ Error conectando a la base de datos:", error);
  });


