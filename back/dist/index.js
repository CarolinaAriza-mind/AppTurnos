import server from "./server.js";
import { PORT } from "./config/envs.js";
server.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${PORT}`);
});
