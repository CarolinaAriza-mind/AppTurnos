"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const server_1 = __importDefault(require("./server"));
const envs_1 = require("./config/envs");
require("reflect-metadata");
const dataSource_1 = require("./config/dataSource");
dataSource_1.appDataSource.initialize()
    .then(() => {
    console.log(`Conectado a la DB`);
    server_1.default.listen(envs_1.PORT, () => {
        console.log(`Servidor escuchando en el puerto ${envs_1.PORT}`);
    });
})
    .catch(err => console.log(err));
