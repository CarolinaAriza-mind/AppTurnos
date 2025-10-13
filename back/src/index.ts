import server from "./server.js";
import { PORT } from "./config/envs.js";
import "reflect-metadata";
import { appDataSource } from "./config/dataSource.js";

appDataSource.initialize()
.then(() => {
  console.log(`Conectado a la DB`);
  server.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${PORT}`);
  })
})
.catch(err => console.log(err));
