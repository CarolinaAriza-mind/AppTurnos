import { Request, Response } from "express";
import { UserRegisterDTO } from "../DTO/UserDTO.js";
import {
  AllUsersServices,
  createNewUserService,
  returnUserByIdServices,
} from "../services/userServices.js";
import { PostgresError } from "../DTO/ErrorDTO.js";
import { authNewCredentials } from "../services/credentialServices.js";
import { CredentialDTO } from "../DTO/CredentialsDTO.js";
import { initRepositories } from "../config/dataSource.js";
import { User } from "../Entities/UserEntity.js";
import { sendWelcomeEmail } from "../services/mailerServices.js";

// GET ALL USERS
export const getUserController = async (req: Request, res: Response) => {
  try {
    res.status(200).json({
      msge: "Listado de todos los usuarios",
      data: await AllUsersServices(),
    });
  } catch (err) {
    res.status(400).json({
      msg: err instanceof Error ? err.message : "No se pudo obtener usuarios",
    });
  }
};

// GET USER BY ID
export const getUserByIdController = async (
  req: Request<{ id: string }>,
  res: Response
) => {
  try {
    res.status(200).json({
      msge: "Detalle de usuario por su ID",
      data: await returnUserByIdServices(parseInt(req.params.id, 10)),
    });
  } catch (err) {
    res.status(400).json({
      msg: err instanceof Error ? err.message : "Usuario no encontrado",
    });
  }
};

// REGISTER NEW USER
export const registerUserController = async (
  req: Request<unknown, unknown, UserRegisterDTO>,
  res: Response
) => {
  try {
    const newUser = await createNewUserService(req.body);
    await sendWelcomeEmail(newUser.email, newUser.name);
    res.status(201).json({
      msge: "Nuevo Usuario registrado",
      data: newUser,
    });
  } catch (err) {
    const detailErr = err as PostgresError;
    res.status(400).json({
      msg:
        detailErr instanceof Error
          ? detailErr.detail
            ? detailErr.detail
            : detailErr.message
          : "Error desconocido",
    });
  }
};

// LOGIN USER
export const loginUserController = async (
  req: Request<unknown, unknown, CredentialDTO>,
  res: Response
) => {
  try {
    const credentialID = await authNewCredentials(
      req.body.username,
      req.body.password
    );

    // ✅ Obtener userModel dinámicamente
    const { userModel } = await initRepositories();

    const userFound: User | null = await userModel.findOne({
      where: { credential: { id: credentialID } },
      relations: ["credentials"],
    });

    return res.status(200).json({
      login: true,
      message: "Usuario logueado con éxito",
      user: userFound,
    });
  } catch (err) {
    const detailErr = err as PostgresError;
    res.status(400).json({
      msg:
        detailErr instanceof Error
          ? detailErr.detail
            ? detailErr.detail
            : detailErr.message
          : "Error desconocido",
    });
  }
};
