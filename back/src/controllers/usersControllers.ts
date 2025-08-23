import { Request, Response } from "express";
import { LoginUserDTO, UserRegisterDTO } from "../DTO/UserDTO";

export const getUserController = (req:Request, res: Response) => {
  res
    .status(200)
    .json({ msge: "Obtener el listado de todos los usuarios", data: [] });
};

export const getUsserById  = (req: Request<{id :string}>, res: Response) => {
    req.params.id
  res
    .status(200)
    .json({ msge: "Obtener el detalle de un usuario específico", data: {} });
};

export const registerUserController  = (req: Request<unknown,unknown, UserRegisterDTO>, res: Response) => {
    req.body
  res
    .status(200)
    .json({ msge: "Registro de un nuevo usuario", data: req.body });
};

export const loginUserController  = (req: Request<unknown, unknown, LoginUserDTO>, res: Response) => {
    req.body
  res
    .status(200)
    .json({ msge: "Login del usuario a la aplicación", data: req.body });
};
