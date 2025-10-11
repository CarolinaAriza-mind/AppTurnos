"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendCancellationEmail = exports.sendAppointmentConfirmationEmail = exports.sendWelcomeEmail = void 0;
const mailer_1 = require("../config/mailer");
const sendWelcomeEmail = (email, name) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield mailer_1.transporter.sendMail({
            from: `"Renacer Consciente 🌿" <${process.env.SMTP_USER}>`,
            to: email,
            subject: "Bienvenida a Renacer Consciente",
            html: `<h2>Hola ${name},</h2><p>Gracias por registrarte.</p>
      <p>Ahora estas habilitado para tomar turnos con nosotros</p>`,
        });
    }
    catch (error) {
        console.error("Error al enviar el correo:", error);
        throw new Error("No se pudo enviar el correo de bienvenida");
    }
});
exports.sendWelcomeEmail = sendWelcomeEmail;
const sendAppointmentConfirmationEmail = (email, name, date, time) => __awaiter(void 0, void 0, void 0, function* () {
    yield mailer_1.transporter.sendMail({
        from: `"Renacer Consciente 🌿" <${process.env.SMTP_USER}>`,
        to: email,
        subject: "Confirmación de turno",
        html: `
      <h2>Hola ${name},</h2>
      <p>Tu turno ha sido confirmado para el <strong>${date}</strong> a las <strong>${time}</strong>.</p>
      <p>Te esperamos con gratitud y presencia.</p>
    `,
    });
});
exports.sendAppointmentConfirmationEmail = sendAppointmentConfirmationEmail;
const sendCancellationEmail = (email, name, date, time) => __awaiter(void 0, void 0, void 0, function* () {
    yield mailer_1.transporter.sendMail({
        from: `"Renacer Consciente 🌿" <${process.env.SMTP_USER}>`,
        to: email,
        subject: "Cancelación de turno",
        html: `
      <h2>Hola ${name},</h2>
      <p>Tu turno del <strong>${date}</strong> a las <strong>${time}</strong> ha sido cancelado.</p>
      <p>Cuando sientas que es tiempo de volver, estaremos aquí para recibirte.</p>
    `,
    });
});
exports.sendCancellationEmail = sendCancellationEmail;
