import "reflect-metadata";
import { DataSource } from "typeorm";
import { User } from "../Entities/UserEntity.js";
import { Credential } from "../Entities/CredentialEntity.js";
import { Appointment } from "../Entities/AppointmentEntitiy.js";
import { DATABASE_CONFIG } from "./envs.js";

export const appDataSource = new DataSource({
  type: "postgres",
  ...(process.env.NODE_ENV === "production"
    ? { url: DATABASE_CONFIG.url, ssl: DATABASE_CONFIG.ssl }
    : {
        host: DATABASE_CONFIG.host,
        port: DATABASE_CONFIG.port,
        username: DATABASE_CONFIG.username,
        password: DATABASE_CONFIG.password,
        database: DATABASE_CONFIG.database,
        ssl: false,
      }),
  synchronize: true, // ⚠️ cambiar a false en producción
  logging: false,
  entities: [User, Credential, Appointment],
});

// Inicializar repositorios
export async function initRepositories() {
  if (!appDataSource.isInitialized) {
    await appDataSource.initialize();
  }

  return {
    appDataSource,
    userModel: appDataSource.getRepository(User),
    credentialModel: appDataSource.getRepository(Credential),
    appointmentModel: appDataSource.getRepository(Appointment),
  };
}



