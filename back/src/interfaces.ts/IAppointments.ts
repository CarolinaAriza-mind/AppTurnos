import { IUser } from "./IUser";


export interface IAppointment {
    id: number,
    date: Date,
    time: number,
    userID: IUser,
    appointmentStatus: Status;
}

export enum Status {
    active = "Active",
    cancel = "Cancelled"
}