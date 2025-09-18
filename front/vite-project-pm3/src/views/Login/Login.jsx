import { useFormik } from "formik";
import styles from "./Login.module.css";
import { validateLog } from "../../helpers/validateLog";
import axios from "axios";
import Swal from "sweetalert2";

const Login = () => {
  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    validate: validateLog,
    initialErrors: {
      username: "El Usuario es requerido",
      password: "La contraseña es requerida",
    },
    onSubmit: (values) => {
      axios
        .post("http://localhost:3001/users/login", values)
        .then((res) => {
          if (res.status === 200) {
            Swal.fire({
              position: "top-end",
              icon: "success",
              iconColor: "#09ff00ff",
              title: "Bienvenido! Te has logueado correctamente  ",
              showConfirmButton: false,
              timer: 2000,
              color: "#000000ff",
               background: "#ffd900bb",
            });
          }
          localStorage.setItem("user", JSON.stringify(res.data.user))
          console.log(res);
        })
        .catch((err) => {
          if (err.status === 400) {
            Swal.fire({
              position: "top-end",
              icon: "error",
              iconColor: "#ff0303",
              title: err.response.data.msg,
              showConfirmButton: false,
              timer: 2500,
              color: "#000000ff",
              background: "#f797daff",
            });
          }
          console.log(err);
        });
    },
  });

  return (
    <>
      <div className={styles.formContainer}>
        <form className={styles.formGroup} onSubmit={formik.handleSubmit}>
          <h2 className={styles.title}>Ingresa a tu perfil aqui</h2>
          <div >
            <label >Nombre de Usuario </label>
            <input
              type="text"
              name="username"
              placeholder="Nombre de usuario"
              onChange={formik.handleChange}
            />
            {formik.errors.username && formik.errors.username ? (
              <label className={styles.errorMessage}>
                {formik.errors.username}
              </label>
            ) : null}
          </div>
          <div>
            <label>Contraseña </label>
            <input
              type="password"
              name="password"
              onChange={formik.handleChange}
              placeholder="*****"
            />
            {formik.errors.password && formik.errors.password ? (
              <label className={styles.errorMessage}>
                {formik.errors.password}
              </label>
            ) : null}
          </div>
          <button
            type="submit"
            disabled={formik.errors.password || formik.errors.password}
          >
            Login
          </button>
        </form>
      </div>
    </>
  );
};

export default Login;
