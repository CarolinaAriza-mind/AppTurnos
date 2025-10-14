import server from "./server.js";
import { DB_PORT } from "./config/envs.js";
import "reflect-metadata";
import { appDataSource } from "./config/dataSource.js";
appDataSource.initialize()
    .then(() => {
    console.log(`Conectado a la DB`);
    server.listen(DB_PORT, () => {
        console.log(`Servidor escuchando en el puerto ${DB_PORT}`);
    });
})
    .catch(err => console.log(err));
