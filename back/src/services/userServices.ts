import { UserDTO } from "../DTO/UserDTO";
import { createNewCredentials } from "./credentialServices";

const users: UserDTO[] = [];
let newId: number = 1;

export const createNewUserService = (
  name: string,
  email: string,
  birthdate: Date,
  nDni: number,
  credentialsId: number
): UserDTO => {
  const errores: string[] = [];

  if (users.some((u) => u.name === name)) {
    errores.push("Ya existe un usuario con este nombre.");
  }

  if (users.some((u) => u.email === email)) {
    errores.push("Ya existe un usuario con este correo electrónico.");
  }

  if (users.some((u) => u.nDni === nDni)) {
    errores.push("Ya existe un usuario con este número de documento.");
  }

  const user: UserDTO = {
    id: newId++,
    name,
    email,
    birthdate,
    nDni,
    credentialsId,
  };
  users.push(user);
  return user;
};

export const AllUsersServices = () => {
  return users;
};
console.log(users);

export const returnUserByIdServices = (id: number): UserDTO | undefined => {
  return users.find((u) => u.id === id);
};

export const createUserWithCredentialService = async (
  name: string,
  email: string,
  birthdate: Date,
  nDni: number,
  username: string,
  password: string
):Promise<UserDTO> => {
  const credentials = await createNewCredentials(username, password);

  const newCred = createNewUserService(name, email, birthdate, nDni, credentials);
  return newCred;
};
