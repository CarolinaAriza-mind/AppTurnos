import { DataSource, type Repository } from "typeorm"
import { DB_DATABASE, DATABASE_URL, DB_PASSWORD, DB_PORT, DB_USERNAME, DB_HOST } from "./envs.js"
import { User } from "../Entities/UserEntity.js"
import { Credential } from "../Entities/CredentialEntity.js"
import { Appointment } from "../Entities/AppointmentEntitiy.js"

export const appDataSource = new DataSource({
  type: "postgres",
  host: DB_HOST,
  url: process.env.DATABASE_URL,
  synchronize: true,
  logging: false,
  entities: [User, Credential, Appointment],
  ssl: { rejectUnauthorized: false },
})

export const userModel: Repository<User> = appDataSource.getRepository(User)
export const credentialModel: Repository<Credential> = appDataSource.getRepository(Credential)
