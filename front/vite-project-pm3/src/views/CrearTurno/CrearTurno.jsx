import { useFormik } from "formik";
import style from "./CrearTurno.module.css";
import Swal from "sweetalert2";
import { validateCreateTurno } from "../../helpers/validateCreateApp";
import { useContext } from "react";
import { UsersContext } from "../../context/UsersContext";

const CrearTurno = () => {
  const { createUserApp } = useContext(UsersContext);

  const formik = useFormik({
    initialValues: {
      date: "",
      time: "",
    },
    initialErrors: {
      date: "Se requiere Fecha",
      time: "Se requiere hora",
    },
    validate: validateCreateTurno,
    onSubmit: async (values) => {
      try {
        await createUserApp(values);
        Swal.fire({
          position: "top-end",
          icon: "success",
          iconColor: "#09ff00ff",
          title: "El turno ha sido creado con exito",
          color: "#ffffffff",
          background: "#6e5f05ff",
        });
      } catch (err) {
        Swal.fire({
          position: "top-end",
          icon: "error",
          iconColor: "#ff0303",
          title: `${err.response.data.msg}`,
          color: "#000000ff",
          background: "#f797daff",
        });
      } finally {
        formik.resetForm();
      }
    },
  });
  
  return (
    <div className={style.formContainer}>
      <form className={style.formGroup} onSubmit={formik.handleSubmit}>
        <h2 className={style.title}>Peticion de Turno</h2>
        <span>
          Aqui puedes tomar el turno que se ajuste a tus tiempos y
          disponibilidad
        </span>
        <div>
          <label>Fecha</label>
          <input
            id="date"
            type="date"
            name="date"
            min={new Date().toISOString().split("T")[0]}
            onChange={formik.handleChange}
            value={formik.values.date}
          />
          {formik.errors.date && formik.errors.date ? (
            <label className={style.errorMessage}>{formik.errors.date}</label>
          ) : null}
        </div>
        <div>
          <label htmlFor="">Hora</label>
          <input
            id="time"
            type="time"
            name="time"
            onChange={formik.handleChange}
            value={formik.values.time}
          />
          {formik.errors.time && formik.errors.time ? (
            <label className={style.errorMessage}>{formik.errors.time}</label>
          ) : null}
        </div>

        <button type="submit" disabled={Object.keys(formik.errors).length > 0}>
          Crear
        </button>
      </form>
    </div>
  );
};

export default CrearTurno;
