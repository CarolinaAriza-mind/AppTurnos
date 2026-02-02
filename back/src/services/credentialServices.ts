import bcrypt from "bcrypt";
import { Credential } from "../Entities/CredentialEntity.js";
import { EntityManager } from "typeorm";
import { initRepositories } from "../config/dataSource.js";

export const createNewCredentials = async (entityManager: EntityManager, username: string, password: string) => {
  const hashedPassword = await bcrypt.hash(password, 10);
  const newCredential = entityManager.create(Credential, { username, password: hashedPassword });
  await entityManager.save(newCredential);
  return newCredential;
};

export const authNewCredentials = async (username: string, password: string): Promise<number> => {
  const { credentialModel } = await initRepositories();

  const credentialUse = await credentialModel.findOne({ where: { username } });
  if (!credentialUse) throw new Error("Username no encontrado");

  const isTrue = await bcrypt.compare(password, credentialUse.password);
  if (!isTrue) throw new Error("Contraseña inválida");

  return credentialUse.id;
};
