import { sendMail } from "../config/mailer.js";

export const sendWelcomeEmail = async (email: string, name: string) => {
  try {
    await sendMail(
      email,
      "Bienvenida a Renacer Consciente 🌿",
      `<h2>Hola ${name},</h2>
       <p>Gracias por registrarte.</p>
       <p>Ahora estás habilitado para tomar turnos con nosotros.</p>`
    );
  } catch (error) {
    console.error("❌ Error al enviar el correo de bienvenida:", error);
    throw new Error("No se pudo enviar el correo de bienvenida");
  }
};


export const sendAppointmentConfirmationEmail = async (
  email: string,
  name: string,
  date: string,
  time: string
) => {
  try {
    await sendMail(
      email,
      "Confirmación de turno 🌿",
      `<h2>Hola ${name},</h2>
       <p>Tu turno ha sido confirmado para el <strong>${date}</strong> a las <strong>${time}</strong>.</p>
       <p>Te esperamos con gratitud y presencia.</p>`
    );
  } catch (error) {
    console.error("❌ Error al enviar correo de confirmación:", error);
    throw new Error("No se pudo enviar el correo de confirmación");
  }
};

export const sendCancellationEmail = async (
  email: string,
  name: string,
  date: string,
  time: string
) => {
  try {
    await sendMail(
      email,
      "Cancelación de turno ❌",
      `<h2>Hola ${name},</h2>
       <p>Tu turno del <strong>${date}</strong> a las <strong>${time}</strong> ha sido cancelado.</p>
       <p>Cuando sientas que es tiempo de volver, estaremos aquí para recibirte 💚</p>`
    );
  } catch (error) {
    console.error("❌ Error al enviar correo de cancelación:", error);
    throw new Error("No se pudo enviar el correo de cancelación");
  }
};