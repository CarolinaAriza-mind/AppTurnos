const num1: number = 24;
const palabra: string = "Alegre";

function saludar(num1:number , palabra:string):string {
const saludo = `Estoy muy ${palabra}, cumplo ${num1}`;
return saludo;
}

saludar(num1, palabra);


interface IUser {
    name: string,
    age: number,
    active: boolean
}

interface IAdminUser extends IUser {
cargo: string,
time: number
}

const carlos = {
    name: "Carlos",
    age: 34,
    active: true,
    cargo: "jefe",
    time: 20
}