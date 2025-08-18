"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const num1 = 24;
const palabra = "Alegre";
function saludar(num1, palabra) {
    const saludo = `Estoy muy ${palabra}, cumplo ${num1}`;
    return saludo;
}
saludar(num1, palabra);
const persona = {
    name: "Carlos",
    age: 34,
    active: true,
    cargo: "jefe",
    time: 20,
};
function mostrarPersona(persona) {
    console.log("Datos del administrador:", persona);
}
mostrarPersona(persona);
