
export interface UserDTO {
    id: number,
    name: string,
    email: string,
    birthdate: Date,
    nDni: number
    credentials: number
}

export interface UserRegisterDTO {
    name: string,
    email: string,
    birthdate: Date,
    nDni: number,
    username: string,
    password:string
}

