
export interface UserDTO {
    id: number,
    name: string,
    email: string,
    birthdate: Date,
    nDni: number
    credentialsId: number
}

export interface UserRegisterDTO {
    name: string,
    email: string,
    birthdate: Date,
    nDni: number,
    credentials: {
    username: string,
    password:string
}
}

