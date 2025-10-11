export const validateFormRegister = (input) => {
  const errors = {};
  if (!input.name.trim()) {
    errors.name = "Se requiere tu nombre completo";
  } else if (!/^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$/.test(input.name)) {
    errors.name = "El nombre solo puede contener letras y espacios";
  }

  if (!input.email.trim()) {
    errors.email = "Es necesario que ingreses tu email";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input.email)) {
    errors.email = "El formato de email no es correcto";
  }

  if (!input.birthdate.trim()) {
    errors.birthdate = "Se requiere tu fecha de nacimiento";
  } else {
    const birthDate = new Date(input.birthdate);
    const today = new Date();
    if (birthDate > today) {
      errors.birthdate = "La fecha de nacimiento no puede ser futura";
    }
  }

  if (!input.nDni) {
  errors.nDni = "Se requiere tu número de documento";
} else if (String(input.nDni).length > 8) {
  errors.nDni = "El número de identidad debe contener hasta 8 caracteres";
}

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
