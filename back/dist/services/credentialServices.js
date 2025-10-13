import bcrypt from "bcrypt";
import { Credential } from "../Entities/CredentialEntity.js";
import { credentialModel } from "../config/dataSource.js";
export const createNewCredentials = async (entityManager, username, password) => {
    const hashedPassword = await bcrypt.hash(password, 10);
    const newCredential = entityManager.create(Credential, {
        username: username,
        password: hashedPassword,
    });
    await entityManager.save(newCredential);
    return newCredential;
};
export const authNewCredentials = async (username, password) => {
    const credentialUse = await credentialModel.findOne({
        where: {
            username,
        },
    });
    if (!credentialUse) {
        throw new Error("Username no encontrado");
    }
    const isTrue = await bcrypt.compare(password, credentialUse?.password);
    if (!isTrue) {
        console.log("Contraseña inválida");
    }
    return credentialUse.id;
};
