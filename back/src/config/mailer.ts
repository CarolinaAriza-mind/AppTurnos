import { Resend } from "resend";
import { RESEND_API_KEY } from "./envs.js";

// Validar solo en producción
if (!RESEND_API_KEY && process.env.NODE_ENV === "production") {
  throw new Error("RESEND_API_KEY no definida en el entorno de producción");
}

// En desarrollo, usar key dummy si no existe
const apiKey = RESEND_API_KEY || "re_dummy_key_for_development";

export const resend = new Resend(apiKey);

export const sendMail = async (to: string, subject: string, html: string) => {
  // Si no hay API key real en desarrollo, solo loguear
  if (!RESEND_API_KEY) {
    console.log("📧 [DEV MODE] Email simulado:");
    console.log("   Para:", to);
    console.log("   Asunto:", subject);
    console.log("   HTML:", html.substring(0, 100) + "...");
    return { id: "dev_email_id" };
  }

  try {
    const response = await resend.emails.send({
      from: "Renaser@turnos.com",
      to,
      subject,
      html,
    });

    console.log("✅ Correo enviado correctamente:", response);
    return response;
  } catch (error) {
    console.error("❌ Error al enviar el correo:", error);
    throw error;
  }
};

