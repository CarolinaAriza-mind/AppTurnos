// src/config/dataSource.ts
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
    ssl: process.env.NODE_ENV === "production"
        ? { rejectUnauthorized: false }
        : false,
});
// Esta función inicializa la DB y devuelve los repositorios
export async function initRepositories() {
    await appDataSource.initialize();
    return {
        appDataSource, // <-- ahora lo incluimos
        userModel: appDataSource.getRepository(User),
        credentialModel: appDataSource.getRepository(Credential),
        appointmentModel: appDataSource.getRepository(Appointment),
    };
}
