export const validateLog = (input) => {
  const errors = {};
 if (!input.username.trim()) {
    errors.username = "Se requiere nombre de usuario";
  } else if (!/^[a-zA-Z0-9]+$/.test(input.username)) {
    errors.username =
      "El nombre de Usuario solo puede contener letras y numeros";
  }


  if (!input.password.trim()) {
    errors.password = "Debes crear una contraseña";
  } else if (input.password.length < 8) {
    errors.password = "La contraseña debe contener al menos 8 caracteres";
  } else if (!/[A-Z]/.test(input.password)) {
    errors.password =
      "La contraseña debe contener por lo menos 1 letra mayuscula";
  } else if (!/[0-9]/.test(input.password)) {
    errors.password = "La contraseña debe contener por lo menos 1 numero";
  } else if (!/[^A-Za-z0-9]/.test(input.password)) {
    errors.password =
      "La contraseña debe contener por lo menos 1 caracter especial";
  }
  
  return errors;
};
