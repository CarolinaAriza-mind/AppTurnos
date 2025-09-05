import "dotenv/config";

export const PORT: number = process.env.PORT
  ? parseInt(process.env.PORT)
  : 3001;

export const DB_HOST: string | undefined = process.env.DB_HOST ?? "localhost";
export const DB_PORT: number = process.env.DB_PORT
  ? parseInt(process.env.DB_PORT, 10)
  : 3002;
export const DB_USERNAME: string | undefined = process.env.DB_USERNAME;
export const DB_PASSWORD: string | undefined = process.env.DB_PASSWORD;
export const DB_DATABASE: string | undefined = process.env.DB_DATABASE;



export const  SMTP_HOST: string = process.env.SMTP_HOST ?? 'smtp.gmail.com'
export const  SMTP_PORT: number = process.env.SMTP_PORT ? parseInt(process.env.SMTP_PORT, 10) : 587
export const  SMTP_USER: string | undefined = process.env.SMTP_USER 
export const  SMTP_PASS:string | undefined = process.env.SMTP_PASS

