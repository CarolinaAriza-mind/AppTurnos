import dotenv from "dotenv";
import { fileURLToPath } from "url";
import { dirname, join } from "path";
// 🔥 Obtener la ruta correcta del archivo .env
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const envPath = join(__dirname, "../../.env");
// Cargar variables de entorno
dotenv.config({ path: envPath });
// Verificar que se cargaron
console.log("🔍 Variables de entorno cargadas desde:", envPath);
console.log("✅ RESEND_API_KEY existe:", !!process.env.RESEND_API_KEY);
export const PORT = process.env.PORT
    ? parseInt(process.env.PORT)
    : 3003;
export const DATABASE_URL = process.env.DATABASE_URL ?? "postgresql://postgres:password@localhost:5432/app_turnos_postgres";
export const DB_PORT = process.env.DB_PORT
    ? parseInt(process.env.DB_PORT, 10)
    : 5432;
export const DB_HOST = process.env.DB_HOST ?? "localhost";
export const DB_USERNAME = process.env.DB_USERNAME ?? "postgres";
export const DB_PASSWORD = process.env.DB_PASSWORD ?? "";
export const DB_DATABASE = process.env.DB_DATABASE ?? "app_turnos_postgres";
export const SMTP_HOST = process.env.SMTP_HOST ?? "smtp.gmail.com";
export const SMTP_PORT = process.env.SMTP_PORT
    ? parseInt(process.env.SMTP_PORT, 10)
    : 587;
export const SMTP_USER = process.env.SMTP_USER ?? "";
export const SMTP_PASS = process.env.SMTP_PASS ?? "";
export const RESEND_API_KEY = process.env.RESEND_API_KEY ?? "";
