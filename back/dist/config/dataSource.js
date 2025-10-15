import { DataSource } from "typeorm";
import { DATABASE_URL } from "./envs.js";
import { User } from "../Entities/UserEntity.js";
import { Credential } from "../Entities/CredentialEntity.js";
import { Appointment } from "../Entities/AppointmentEntitiy.js";
export const appDataSource = new DataSource({
    type: "postgres",
    url: DATABASE_URL,
    synchronize: true,
    logging: false,
    entities: [User, Credential, Appointment],
    ssl: { rejectUnauthorized: false },
});
export const userModel = appDataSource.getRepository(User);
export const credentialModel = appDataSource.getRepository(Credential);
