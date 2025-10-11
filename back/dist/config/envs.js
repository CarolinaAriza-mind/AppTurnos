"use strict";
var _a, _b;
Object.defineProperty(exports, "__esModule", { value: true });
exports.SMTP_PASS = exports.SMTP_USER = exports.SMTP_PORT = exports.SMTP_HOST = exports.DB_DATABASE = exports.DB_PASSWORD = exports.DB_USERNAME = exports.DB_PORT = exports.DB_HOST = exports.PORT = void 0;
require("dotenv/config");
exports.PORT = process.env.PORT
    ? parseInt(process.env.PORT)
    : 3001;
exports.DB_HOST = (_a = process.env.DB_HOST) !== null && _a !== void 0 ? _a : "localhost";
exports.DB_PORT = process.env.DB_PORT
    ? parseInt(process.env.DB_PORT, 10)
    : 3002;
exports.DB_USERNAME = process.env.DB_USERNAME;
exports.DB_PASSWORD = process.env.DB_PASSWORD;
exports.DB_DATABASE = process.env.DB_DATABASE;
exports.SMTP_HOST = (_b = process.env.SMTP_HOST) !== null && _b !== void 0 ? _b : 'smtp.gmail.com';
exports.SMTP_PORT = process.env.SMTP_PORT ? parseInt(process.env.SMTP_PORT, 10) : 587;
exports.SMTP_USER = process.env.SMTP_USER;
exports.SMTP_PASS = process.env.SMTP_PASS;
