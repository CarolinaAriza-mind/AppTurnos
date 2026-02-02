import { appDataSource, initRepositories } from "../config/dataSource.js";
import { UserRegisterDTO } from "../DTO/UserDTO.js";
import { User } from "../Entities/UserEntity.js";
import { Credential } from "../Entities/CredentialEntity.js";
import { createNewCredentials } from "./credentialServices.js";

export const createNewUserService = async (user: UserRegisterDTO): Promise<User> => {
  const { userModel } = await initRepositories();

  const resultTrans: Promise<User> = appDataSource.transaction(async (entityManager) => {
    const credential: Credential = await createNewCredentials(entityManager, user.username, user.password);

    const nuevoUsuario: User = entityManager.create(User, {
      name: user.name,
      email: user.email,
      birthdate: user.birthdate,
      nDni: user.nDni,
      credentials: credential,
    });

    return await entityManager.save(nuevoUsuario);
  });

  return resultTrans;
};

export const AllUsersServices = async (): Promise<User[]> => {
  const { userModel } = await initRepositories();
  return await userModel.find();
};

export const returnUserByIdServices = async (id: number): Promise<User> => {
  const { userModel } = await initRepositories();

  const IdUser: User | null = await userModel.findOne({
    where: { id },
    relations: ["appointments"],
  });

  if (!IdUser) throw new Error(`Usuario con id: ${id}, no encontrado`);
  return IdUser;
};

