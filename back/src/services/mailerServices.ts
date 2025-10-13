import { transporter } from "../config/mailer.js";

export const sendWelcomeEmail = async (email: string, name: string) => {
try {
    await transporter.sendMail({
      from: `"Renacer Consciente 🌿" <${process.env.SMTP_USER}>`,
      to: email,
      subject: "Bienvenida a Renacer Consciente",
      html: `<h2>Hola ${name},</h2><p>Gracias por registrarte.</p>
      <p>Ahora estas habilitado para tomar turnos con nosotros</p>`,
    });
  } catch (error) {
    
    console.error("Error al enviar el correo:", error);
    throw new Error("No se pudo enviar el correo de bienvenida");
  }
};

export const sendAppointmentConfirmationEmail = async (
  email: string,
  name: string,
  date: string,
  time: string
) => {
  await transporter.sendMail({
    from: `"Renacer Consciente 🌿" <${process.env.SMTP_USER}>`,
    to: email,
    subject: "Confirmación de turno",
    html: `
      <h2>Hola ${name},</h2>
      <p>Tu turno ha sido confirmado para el <strong>${date}</strong> a las <strong>${time}</strong>.</p>
      <p>Te esperamos con gratitud y presencia.</p>
    `,
  });
};

export const sendCancellationEmail = async (
  email: string,
  name: string,
  date: string,
  time: string
) => {
  await transporter.sendMail({
    from: `"Renacer Consciente 🌿" <${process.env.SMTP_USER}>`,
    to: email,
    subject: "Cancelación de turno",
    html: `
      <h2>Hola ${name},</h2>
      <p>Tu turno del <strong>${date}</strong> a las <strong>${time}</strong> ha sido cancelado.</p>
      <p>Cuando sientas que es tiempo de volver, estaremos aquí para recibirte.</p>
    `,
  });
};