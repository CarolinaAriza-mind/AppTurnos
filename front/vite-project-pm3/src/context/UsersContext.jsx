import { createContext, useState } from "react";
import axios from "axios";

const API = import.meta.env.VITE_API_URL;

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
    return await axios.post(`${API}/users/register`, userData);
  };

  const loginUser = async (userData) => {
    const respuesta = await axios.post(
      `${API}/users/login`,
      userData
    );
    if (respuesta.status === 200) {
      localStorage.setItem("user", JSON.stringify(respuesta.data.user));
      setIsLogged(respuesta.data.user);
    }
  };

  const logOutUser = () => {
    localStorage.removeItem("user");
    setIsLogged(false);
  };

  const getUsersAppointments = async () => {
    const respuesta = await axios.get(
      `${API}/users/${isLogged.id}`
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
      `${API}/appointments/schedule`,
      appInfo
    );
  };

  const cancelUserApp = async (id) => {
    try {
      await axios.put(`${API}/appointments/cancel/${id}`);
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
