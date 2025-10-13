import "dotenv/config";
export const PORT = process.env.PORT
    ? parseInt(process.env.PORT)
    : 3001;
export const DB_HOST = process.env.DB_HOST ?? "localhost";
export const DB_PORT = process.env.DB_PORT
    ? parseInt(process.env.DB_PORT, 10)
    : 3002;
export const DB_USERNAME = process.env.DB_USERNAME;
export const DB_PASSWORD = process.env.DB_PASSWORD;
export const DB_DATABASE = process.env.DB_DATABASE;
export const SMTP_HOST = process.env.SMTP_HOST ?? 'smtp.gmail.com';
export const SMTP_PORT = process.env.SMTP_PORT ? parseInt(process.env.SMTP_PORT, 10) : 587;
export const SMTP_USER = process.env.SMTP_USER;
export const SMTP_PASS = process.env.SMTP_PASS;
