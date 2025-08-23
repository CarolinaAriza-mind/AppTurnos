
export interface UserRegisterDTO {
    name: string,
    age: number,
    email: string,
    username:string,
    password: string,
    dni: number
}

export interface LoginUserDTO {
    email: string,
    password: string
}

