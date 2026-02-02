import { appDataSource, initRepositories } from "../config/dataSource.js";
import { User } from "../Entities/UserEntity.js";
import { createNewCredentials } from "./credentialServices.js";
export const createNewUserService = async (user) => {
    const { userModel } = await initRepositories();
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
    const { userModel } = await initRepositories();
    return await userModel.find();
};
export const returnUserByIdServices = async (id) => {
    const { userModel } = await initRepositories();
    const IdUser = await userModel.findOne({
        where: { id },
        relations: ["appointments"],
    });
    if (!IdUser)
        throw new Error(`Usuario con id: ${id}, no encontrado`);
    return IdUser;
};
