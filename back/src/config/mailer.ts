import "dotenv/config";
import { Resend } from "resend";
import "dotenv/config";

export const resend = new Resend(process.env.RESEND_API_KEY);

export const sendMail = async (to: string, subject: string, html: string) => {
  try {
    const response = await resend.emails.send({
      from: "Renaser@turnos.com", 
      to,
      subject,
      html,
    });

    console.log("Correo enviado correctamente:", response);
    return response;
  } catch (error) {
    console.error("Error al enviar el correo:", error);
    throw error;
  }
};

