import dotenv from "dotenv";

// Carga el .env desde back/ (donde se corre npm run dev)
if (process.env.NODE_ENV !== "production") {
  dotenv.config();
}

dotenv.config();

// Detectar entorno
const isProduction = process.env.NODE_ENV === "production";

console.log("🌎 Entorno:", isProduction ? "Producción" : "Desarrollo");

// ------------------- CONFIGURACIÓN COMÚN -------------------
export const PORT: number = process.env.PORT
  ? parseInt(process.env.PORT)
  : 8080;

export const RESEND_API_KEY: string = process.env.RESEND_API_KEY || "";

export const SMTP_HOST: string = process.env.SMTP_HOST ?? "smtp.gmail.com";
export const SMTP_PORT: number = process.env.SMTP_PORT
  ? parseInt(process.env.SMTP_PORT, 10)
  : 587;
export const SMTP_USER: string = process.env.SMTP_USER ?? "";
export const SMTP_PASS: string = process.env.SMTP_PASS ?? "";

// ------------------- CONFIGURACIÓN DE DATABASE -------------------
if (isProduction) {
  console.log("✅ Usando DATABASE_URL para producción:", process.env.DATABASE_URL ? "cargada ✓" : "❌ undefined");
} else {
  console.log("✅ Usando DB local:", {
    host: process.env.DB_HOST ?? "localhost",
    port: process.env.DB_PORT ?? 5432,
    username: process.env.DB_USERNAME ?? "postgres",
    database: process.env.DB_NAME ?? "app_turnos_renacer",
  });
}

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