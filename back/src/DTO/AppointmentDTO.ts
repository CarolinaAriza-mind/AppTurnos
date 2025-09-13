
export interface AppointmentDTO {
    id: number,
    date: Date,
    time: string,
    userID: number
    appointmentStatus: Status
}
export enum Status {
    active = "activo",
    cancel = "cancelado"
}