import { AllUsersServices, createNewUserService, returnUserByIdServices, } from "../services/userServices.js";
import { authNewCredentials } from "../services/credentialServices.js";
import { initRepositories } from "../config/dataSource.js";
import { sendWelcomeEmail } from "../services/mailerServices.js";
// GET ALL USERS
export const getUserController = async (req, res) => {
    try {
        res.status(200).json({
            msge: "Listado de todos los usuarios",
            data: await AllUsersServices(),
        });
    }
    catch (err) {
        res.status(400).json({
            msg: err instanceof Error ? err.message : "No se pudo obtener usuarios",
        });
    }
};
// GET USER BY ID
export const getUserByIdController = async (req, res) => {
    try {
        res.status(200).json({
            msge: "Detalle de usuario por su ID",
            data: await returnUserByIdServices(parseInt(req.params.id, 10)),
        });
    }
    catch (err) {
        res.status(400).json({
            msg: err instanceof Error ? err.message : "Usuario no encontrado",
        });
    }
};
// REGISTER NEW USER
export const registerUserController = async (req, res) => {
    try {
        const newUser = await createNewUserService(req.body);
        await sendWelcomeEmail(newUser.email, newUser.name);
        res.status(201).json({
            msge: "Nuevo Usuario registrado",
            data: newUser,
        });
    }
    catch (err) {
        const detailErr = err;
        res.status(400).json({
            msg: detailErr instanceof Error
                ? detailErr.detail
                    ? detailErr.detail
                    : detailErr.message
                : "Error desconocido",
        });
    }
};
// LOGIN USER
export const loginUserController = async (req, res) => {
    try {
        const credentialID = await authNewCredentials(req.body.username, req.body.password);
        // ✅ Obtener userModel dinámicamente
        const { userModel } = await initRepositories();
        const userFound = await userModel.findOne({
            where: { credential: { id: credentialID } },
            relations: ["credentials"],
        });
        return res.status(200).json({
            login: true,
            message: "Usuario logueado con éxito",
            user: userFound,
        });
    }
    catch (err) {
        const detailErr = err;
        res.status(400).json({
            msg: detailErr instanceof Error
                ? detailErr.detail
                    ? detailErr.detail
                    : detailErr.message
                : "Error desconocido",
        });
    }
};
