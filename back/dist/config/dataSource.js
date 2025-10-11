"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.credentialModel = exports.userModel = exports.appDataSource = void 0;
const typeorm_1 = require("typeorm");
const envs_1 = require("./envs");
const UserEntity_1 = require("../Entities/UserEntity");
const CredentialEntity_1 = require("../Entities/CredentialEntity");
exports.appDataSource = new typeorm_1.DataSource({
    type: "postgres",
    host: envs_1.DB_HOST,
    port: envs_1.DB_PORT,
    username: envs_1.DB_USERNAME,
    password: envs_1.DB_PASSWORD,
    database: envs_1.DB_DATABASE,
    synchronize: true,
    dropSchema: true,
    logging: ["error"],
    entities: ["src/Entities/**/*.ts"],
});
exports.userModel = exports.appDataSource.getRepository(UserEntity_1.User);
exports.credentialModel = exports.appDataSource.getRepository(CredentialEntity_1.Credential);
