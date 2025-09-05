import server from "./server";
import { PORT } from "./config/envs";
import "reflect-metadata";
import { appDataSource } from "./config/dataSource";

appDataSource.initialize()
.then(() => {
  console.log(`Conectado a la DB`);
  server.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${PORT}`);
  })
})
.catch(err => console.log(err));
