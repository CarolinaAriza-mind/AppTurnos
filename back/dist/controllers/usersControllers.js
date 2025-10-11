"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginUserController = exports.registerUserController = exports.getUserByIdController = exports.getUserController = void 0;
const userServices_1 = require("../services/userServices");
const credentialServices_1 = require("../services/credentialServices");
const dataSource_1 = require("../config/dataSource");
const mailerServices_1 = require("../services/mailerServices");
const getUserController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        res.status(200).json({
            msge: "Listado de todos los usuarios",
            data: yield (0, userServices_1.AllUsersServices)(),
        });
    }
    catch (err) {
        res.status(400).json({
            msg: err instanceof Error ? err.message : "No se pudo obtener usuarios",
        });
    }
});
exports.getUserController = getUserController;
const getUserByIdController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        res.status(200).json({
            msge: "Detalle de usuario por su ID",
            data: yield (0, userServices_1.returnUserByIdServices)(parseInt(req.params.id, 10)),
        });
    }
    catch (err) {
        res.status(400).json({
            msg: err instanceof Error ? err.message : "Usuario no encontrado",
        });
    }
});
exports.getUserByIdController = getUserByIdController;
const registerUserController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const newUser = yield (0, userServices_1.createNewUserService)(req.body);
        yield (0, mailerServices_1.sendWelcomeEmail)(newUser.email, newUser.name);
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
});
exports.registerUserController = registerUserController;
const loginUserController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const credentialID = yield (0, credentialServices_1.authNewCredentials)(req.body.username, req.body.password);
        const userFound = yield dataSource_1.userModel.findOne({
            where: {
                credentials: {
                    id: credentialID,
                },
            },
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
});
exports.loginUserController = loginUserController;
