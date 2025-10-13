import { DataSource, Repository } from "typeorm";
import {
  DB_DATABASE,
  DB_HOST,
  DB_PASSWORD,
  DB_PORT,
  DB_USERNAME,
} from "./envs.js";
import { User } from "../Entities/UserEntity.js";
import { Credential } from "../Entities/CredentialEntity.js";

export const appDataSource = new DataSource({
  type: "postgres",
  host: DB_HOST,
  port: DB_PORT,
  username: DB_USERNAME,
  password: DB_PASSWORD,
  database: DB_DATABASE,
  synchronize: true,
  dropSchema: true,
  logging: ["error"],
  entities: ["src/Entities/**/*.ts"],
});

export const userModel: Repository<User> = appDataSource.getRepository(User);
export const credentialModel: Repository<Credential> =
  appDataSource.getRepository(Credential);
