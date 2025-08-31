import bcrypt from "bcrypt";
import { CredentialDTO } from "../DTO/CredentialsDTO";

const credencialesDB: CredentialDTO[] = [];
let nextId: number = 0;

export const createNewCredentials: (username: string, password: string) => Promise<number> = async (
  username: string,
  password: string
): Promise<number> => {
  
  const existingUser = credencialesDB.find((c) => c.username === username);
  if (existingUser) {
    throw new Error(
      `El usuario con el ${username} ya está registrado. Elegí otro para autenticar`
    );
  }
  const hashedPassword = await bcrypt.hash(password, 10);
  const newCredentials: CredentialDTO = {
    id: nextId,
    username: username,
    password: hashedPassword,
  };

  credencialesDB.push(newCredentials);
  return nextId++;
};

export const authNewCredentials = async (
  username: string,
  password: string
): Promise<number | null> => {
  const credential = credencialesDB.find((c) => c.username === username);

  if (!credential) return null;

  const isEqual = await bcrypt.compare(password, credential?.password);
  if (!isEqual) return null;

  return credential?.id;
};

// Implementar una función que reciba username y password y cree un nuevo par de credenciales con estos datos. Debe retornar el ID del par de credenciales creado.

// Implementar una función que recibirá username y password, y deberá chequear si el nombre de usuario existe entre los datos disponibles y, si es así, si el password es correcto. En caso de que la validación sea exitosa, deberá retornar el ID de las credenciales.
