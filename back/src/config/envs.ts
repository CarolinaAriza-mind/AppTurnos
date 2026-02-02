import dotenv from "dotenv";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

// 🔥 Obtener la ruta correcta del archivo .env
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const envPath = join(__dirname, "../../.env");

// Cargar variables de entorno
dotenv.config({ path: envPath });

// Detectar entorno
const isProduction = process.env.NODE_ENV === "production";

console.log("🔍 Variables de entorno cargadas desde:", envPath);
console.log("🌎 Entorno:", isProduction ? "Producción" : "Desarrollo");

// ------------------- CONFIGURACIÓN COMÚN -------------------
export const PORT: number = process.env.PORT
  ? parseInt(process.env.PORT)
  : 3003;

export const RESEND_API_KEY: string = process.env.RESEND_API_KEY || "";

export const SMTP_HOST: string = process.env.SMTP_HOST ?? "smtp.gmail.com";
export const SMTP_PORT: number = process.env.SMTP_PORT
  ? parseInt(process.env.SMTP_PORT, 10)
  : 587;
export const SMTP_USER: string = process.env.SMTP_USER ?? "";
export const SMTP_PASS: string = process.env.SMTP_PASS ?? "";

// ------------------- CONFIGURACIÓN DE DATABASE -------------------
if (isProduction) {
  console.log("✅ Usando DATABASE_URL para producción:", process.env.DATABASE_URL);
} else {
  console.log("✅ Usando DB local:", {
    host: process.env.DB_HOST ?? "localhost",
    port: process.env.DB_PORT ?? 5432,
    username: process.env.DB_USERNAME ?? "postgres",
    password: process.env.DB_PASSWORD ?? "postgres",
    database: process.env.DB_NAME ?? "app_turnos_renacer",
  });
}

// En desarrollo usamos host/usuario/pass, en prod DATABASE_URL
export const DATABASE_CONFIG = isProduction
  ? {
      url: process.env.DATABASE_URL ?? "",
      ssl: { rejectUnauthorized: false },
    }
  : {
      host: process.env.DB_HOST ?? "localhost",
      port: process.env.DB_PORT ? parseInt(process.env.DB_PORT, 10) : 5432,
      username: process.env.DB_USERNAME ?? "postgres",
      password: process.env.DB_PASSWORD ?? "postgres",
      database: process.env.DB_NAME ?? "app_turnos_renacer",
      ssl: false,
    };

