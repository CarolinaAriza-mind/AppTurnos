import axios from "axios";
import { validateFormRegister } from "../../helpers/validateReg";
import style from "./Register.module.css";
import { useFormik } from "formik";
import Swal from "sweetalert2";

const Register = () => {
  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      birthdate: "",
      nDni: "",
      username: "",
      password: "",
    },
    validate: validateFormRegister,
    initialErrors: {
      name: "Se requiere tu nombre personal aqui",
      email: "Se requiere tu email de usuario",
      birthdate: "Se requiere tu fecha de nacimiento",
      nDni: "Se requiere tu N° de Documento de Identidad",
      username: "Se requiere el nombre de usuario que elijas",
      password: "Se requiere Contraseña",
    },
    onSubmit: (values) => {
      axios
        .post("http://localhost:3001/users/register", values)
        .then((res) => {
          if (res.status === 201) {
            Swal.fire({
              position: "top-end",
              icon: "success",
              iconColor: "#08b402ff",
              title: "Usuario Registrado Correctamente",
              showConfirmButton: false,
              timer: 2000,
              color: "#000000ff",
              background: "#ffd70066",
            });
          }
          localStorage.setItem("user", JSON.stringify(res.data.use))
          console.log(res);
        })

        .catch((err) => {
          if (err.response.data.msg.includes("username")) {
            Swal.fire({
              position: "top-end",
              icon: "error",
              iconColor: "#ff0303",
              title: `El username ya existe = ${formik.values.username} , Intenta con otro Nombre de Usuario`,
              showConfirmButton: false,
              timer: 2500,
              color: "#000000ff",
              background: "#f797daff",
            })
             console.log(err);
          }

          else if (err.response.data.msg.includes("email")) {
            Swal.fire({
              position: "top-end",
              icon: "error",
              iconColor: "#ff0303",
              title: `Email ya registrado = ${formik.values.email}, Intenta con otro email`,
              showConfirmButton: false,
              timer: 2500,
              color: "#000000ff",
              background: "#f797daff",
            })
          }

         else if (err.response.data.msg.includes("nDni")) {
            Swal.fire({
              position: "top-end",
              icon: "error",
              iconColor: "#ff0303",
              title: `El numero de DNI ya esta registrado = ${formik.values.nDni}, Intenta con otro numero de Documento`,
              text: "Intentelo de nuevo",
              showConfirmButton: false,
              timer: 2500,
              color: "#000000ff",
              background: "#f797daff",
            })

          }
        });
    },
  });

  return (
    <div className={style.formContainer}>
      <form onSubmit={formik.handleSubmit}>
        <h2 className={style.title}>Registrate aqui</h2>
        <div >
          <label>Nombre </label>
          <input
            type="text"
            name="name"
            placeholder="Nombre"
            onChange={formik.handleChange}
          />
          {formik.errors.name && formik.errors.name ? (
            <label className={style.errorMessage}>{formik.errors.name}</label>
          ) : null}
        </div>
        <div >
          <label>Email </label>
          <input
            type="text"
            name="email"
            placeholder="usuario@email.com"
            onChange={formik.handleChange}
          />
          {formik.errors.email && formik.errors.email ? (
            <label className={style.errorMessage}>{formik.errors.email}</label>
          ) : null}
        </div>
        <div >
          <label>Fecha de nacimiento </label>
          <input
            type="date"
            name="birthdate"
            placeholder="99-99-9999"
            onChange={formik.handleChange}
          />
          {formik.errors.birthdate && formik.errors.birthdate ? (
            <label className={style.errorMessage}>
              {formik.errors.birthdate}
            </label>
          ) : null}
        </div>
        <div >
          <label>DNI </label>
          <input
            type="number"
            name="nDni"
            placeholder="Numero de documento"
            onChange={formik.handleChange}
          />
          {formik.errors.nDni && formik.errors.nDni ? (
            <label className={style.errorMessage}>{formik.errors.nDni}</label>
          ) : null}
        </div>
        <div>
          <label>Nombre de Usuario </label>
          <input
            type="text"
            name="username"
            placeholder="Nombre de usuario"
            onChange={formik.handleChange}
          />
          {formik.errors.username && formik.errors.username ? (
            <label className={style.errorMessage}>
              {formik.errors.username}
            </label>
          ) : null}
        </div>
        <div>
          <label>Contraseña </label>
          <input
            type="password"
            name="password"
            placeholder="****"
            onChange={formik.handleChange}
          />
          {formik.errors.password && formik.errors.password ? (
            <label className={style.errorMessage}>
              {formik.errors.password}
            </label>
          ) : null}
        </div>
        <button
          type="submit"
          disabled={
            formik.errors.name ||
            formik.errors.email ||
            formik.errors.birthdate ||
            formik.errors.nDni ||
            formik.errors.username ||
            formik.errors.password
          }
        >
          Registrarme
        </button>
      </form>
    </div>
  );
};
export default Register;
