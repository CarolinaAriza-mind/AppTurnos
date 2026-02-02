import { createContext, useState } from "react";
import axios from "axios";

export const UsersContext = createContext({
  isLogged: {},
  userAppointments: [],
  registerUser: async () => {},
  loginUser: async () => {},
  logOutUser: () => {},
  getUsersAppointments: async () => {},
  createUserApp: async () => {},
  cancelUserApp: async () => {},
});

export const UsersProvider = ({ children }) => {
  const [isLogged, setIsLogged] = useState(
    JSON.parse(localStorage.getItem("user"))
  );
  const [userAppointments, setUserAppointments] = useState([]);

  const registerUser = async (userData) => {
  return await axios.post(
    "https://appturnos-tsic.onrender.com/users/register",
    userData,
    { withCredentials: true }
  );
};

const loginUser = async (userData) => {
  const respuesta = await axios.post(
    "https://appturnos-tsic.onrender.com/users/login",
    userData,
    { withCredentials: true }
  );
  if (respuesta.status === 200) {
    localStorage.setItem("user", JSON.stringify(respuesta.data.user));
    setIsLogged(respuesta.data.user);
  }
}
  const logOutUser = () => {
    localStorage.removeItem("user");
    setIsLogged(false);
  };

  const getUsersAppointments = async () => {
    const respuesta = await axios.get(
      `https://appturnos-tsic.onrender.com/users/${isLogged.id}`
    );

    setUserAppointments(respuesta.data.data.appointment);
  };

  const createUserApp = async (dateTime) => {
    const appInfo = {
      ...dateTime,
      userID: isLogged.id,
    };

    console.log(appInfo);
    return await axios.post(
      `https://appturnos-tsic.onrender.com/appointments/schedule`,
      appInfo
    );
  };

  const cancelUserApp = async (id) => {
    try {
      await axios.put(`https://appturnos-tsic.onrender.com/appointments/cancel/${id}`);
      const nuevoArrayApp = userAppointments.map((app) => {
        if (app.id === id) {
          return { ...app, appointmentStatus: "cancelado" };
        } else return app;
      });
      setUserAppointments(nuevoArrayApp);
    } catch (error) {
      console.error("Error al cancelar el turno:", error);
    }
  };

  const value = {
    isLogged,
    userAppointments,
    registerUser,
    loginUser,
    logOutUser,
    getUsersAppointments,
    createUserApp,
    cancelUserApp,
  };
  return (
    <UsersContext.Provider value={value}>{children}</UsersContext.Provider>
  );
};
