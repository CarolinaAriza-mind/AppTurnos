import { AllUsersServices, createNewUserService, returnUserByIdServices, } from "../services/userServices.js";
import { authNewCredentials } from "../services/credentialServices.js";
import { userModel } from "../config/dataSource.js";
import { sendWelcomeEmail } from "../services/mailerServices.js";
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
export const registerUserController = async (req, res) => {
    try {
        const newUser = await createNewUserService(req.body);
        await sendWelcomeEmail(newUser.email, newUser.name);
        res.status(201).json({
            msge: "Nuevo Usuario registrado",
            data: newUser,
        });
        console.log(req.body);
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
export const loginUserController = async (req, res) => {
    try {
        const credentialID = await authNewCredentials(req.body.username, req.body.password);
        const userFound = await userModel.findOne({
            where: {
                credential: {
                    id: credentialID,
                },
            },
            relations: ["credential"],
        });
        return res.status(200).json({
            login: true,
            message: "Usuario logueado con exito",
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
