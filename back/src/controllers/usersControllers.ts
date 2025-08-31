import { Request, Response } from "express";
import { UserRegisterDTO } from "../DTO/UserDTO";
import {
  AllUsersServices,
  createUserWithCredentialService,
  returnUserByIdServices,
} from "../services/userServices";
import { authNewCredentials } from "../services/credentialServices";
import { CredentialDTO } from "../DTO/CredentialsDTO";

export const getUserController = (req: Request, res: Response) => {
  try {
    const users = AllUsersServices();
    res.status(200).json({ msge: "Listado de todos los usuarios", users });
    console.log(req.body);
  } catch (err) {
    console.error("Error en getUserController:", err);
    res.status(400).json({ message: "No se pudo obtener usuarios" });
  }
};

export const getUserByIdController = (
  req: Request<{ id: string }>,
  res: Response
) => {
  try {
    const id: number = parseInt(req.params.id);
    const user = returnUserByIdServices(id);

    if (!user) return res.status(404).json("Usuario no encontrado");
    res.status(200).json({ msge: "Detalle de usuario por su ID", data: user });
  } catch (err) {
    console.error("Error en getUsserByIdController", err);
    res.status(400).json("Error al encontrar usuario por ID");
  }
};

export const registerUserController = async (
  req: Request<unknown, unknown, UserRegisterDTO>,
  res: Response
) => {
  try {
    const { name, email, birthdate, nDni, credentials } = req.body;
    const { username, password } = credentials;
    const newUser = await createUserWithCredentialService(
      name,
      email,
      new Date(birthdate),
      nDni,
      username,
      password
    );

    res.status(200).json({ msge: "Nuevo Usuario registrado", data: newUser });
    console.log(newUser);
  } catch (err) {
    console.error("Error registerUserController", err);
    res.status(400).json("No se pudo realizar el registro del Usuario");
  }
};

export const loginUserController = async (
  req: Request<unknown, unknown, CredentialDTO>,
  res: Response
) => {
  try {
    const { username, password } = req.body;
    const credentialsId = await authNewCredentials(username, password);

    if (typeof username !== "string" || typeof password !== "string") {
      return res.status(400).json({ msge: "Formato inválido de credenciales" });
    }
    res
      .status(200)
      .json({ msge: "Inicio de sesion exitosa", data: credentialsId });
  } catch (err) {
    console.error("Error loginUserController", err);
    res.status(400).json("Sesion caducada");
  }
};
