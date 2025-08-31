import { ICredential } from "./ICredentials";

export interface IUser {
  id: number;
  name: string;
  email: string;
  birthdate: Date;
  nDni: number;
  credencialsId: ICredential;
}
