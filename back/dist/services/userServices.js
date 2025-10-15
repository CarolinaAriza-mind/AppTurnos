import { appDataSource, userModel } from "../config/dataSource.js";
import { User } from "../Entities/UserEntity.js";
import { createNewCredentials } from "./credentialServices.js";
export const createNewUserService = async (user) => {
    const resultTrans = appDataSource.transaction(async (entityManager) => {
        const credential = await createNewCredentials(entityManager, user.username, user.password);
        const nuevoUsuario = entityManager.create(User, {
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
export const AllUsersServices = async () => {
    return await userModel.find();
};
export const returnUserByIdServices = async (id) => {
    const IdUser = await userModel.findOne({
        where: {
            id: id,
        },
        relations: ["appointments"]
    });
    if (!IdUser)
        throw new Error(`Usuario con id: ${id}, no encontrado`);
    return IdUser;
};
