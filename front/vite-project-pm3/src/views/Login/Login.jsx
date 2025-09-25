import { useFormik } from "formik";
import styles from "./Login.module.css";
import { validateLog } from "../../helpers/validateLog";
import Swal from "sweetalert2";
import { useContext } from "react";
import { UsersContext } from "../../context/UsersContext";
import { useNavigate, Link } from "react-router-dom";

const Login = () => {
  const { loginUser } = useContext(UsersContext);
  const navigate = useNavigate();

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
    onSubmit: async (values) => {
      try {
       await loginUser(values);

        Swal.fire({
          position: "top-end",
          icon: "success",
          iconColor: "#09ff00ff",
          title: "Bienvenido! Te has logueado correctamente",
          color: "#ffffffff",
          background: "#6e5f05ff",
          timer: 2000,
          showConfirmButton: false,
        });

        navigate("/"); 
      } catch (err) {
        const msg = err?.response?.data?.msg || "Error al iniciar sesión";
        Swal.fire({
          position: "top-end",
          icon: "error",
          iconColor: "#ff0303",
          title: msg,
          color: "#000000ff",
          background: "#f797daff",
        });
      }
    },
  });

  return (
    <div className={styles.formContainer}>
      <form className={styles.formGroup} onSubmit={formik.handleSubmit}>
        <h2 className={styles.title}>Ingresa a tu perfil aquí</h2>

        <div>
          <label>Nombre de Usuario</label>
          <input
            type="text"
            name="username"
            placeholder="Nombre de usuario"
            onChange={formik.handleChange}
          />
          {formik.errors.username && (
            <label className={styles.errorMessage}>
              {formik.errors.username}
            </label>
          )}
        </div>

        <div>
          <label>Contraseña</label>
          <input
            type="password"
            name="password"
            onChange={formik.handleChange}
            placeholder="*****"
          />
          {formik.errors.password && (
            <label className={styles.errorMessage}>
              {formik.errors.password}
            </label>
          )}
        </div>

        <button
          type="submit"
          disabled={formik.errors.username || formik.errors.password}
        >
          Login
        </button>
        <br />
        <label>
          ¿No tienes cuenta aún? <Link to="/Registro">¡Regístrate!</Link>
        </label>
      </form>
    </div>
  );
};

export default Login;
