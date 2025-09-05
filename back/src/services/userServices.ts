import { appDataSource, userModel } from "../config/dataSource";
import { UserRegisterDTO } from "../DTO/UserDTO";
import { Credential } from "../Entities/CredentialEntity";
import { User } from "../Entities/UserEntity";
import { createNewCredentials } from "./credentialServices";

export const createNewUserService = async (
  user: UserRegisterDTO
): Promise<User> => {
  const resultTrans: Promise<User> = appDataSource.transaction(
    async (entityManager) => {
      const credential: Credential = await createNewCredentials(
        entityManager,
        user.username,
        user.password
      );
      const nuevoUsuario: User = entityManager.create(User, {
        name: user.name,
        email: user.email,
        birthdate: user.birthdate,
        nDni: user.nDni,
        credentials: credential,
      });

      return await entityManager.save(nuevoUsuario);
    }
  );

  return resultTrans;
};

export const AllUsersServices = async (): Promise<User[]> => {
  return await userModel.find();
};

export const returnUserByIdServices = async (id: number): Promise<User> => {
  const IdUser: User | null = await userModel.findOne({
    where: {
      id: id,
    },
  });
  if (!IdUser) throw new Error(`Usuario con id: ${id}, no encontrado`);
  return IdUser;
};
