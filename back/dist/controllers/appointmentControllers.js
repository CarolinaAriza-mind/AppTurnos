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
exports.ChangeStatusAppointmentController = exports.SchedulerAppointmentController = exports.getDetailAppointmentController = exports.getAppointmentsUserController = void 0;
const appointmentServices_1 = require("../services/appointmentServices");
const mailerServices_1 = require("../services/mailerServices");
const appointmentRepo_1 = require("../repositories/appointmentRepo");
const userServices_1 = require("../services/userServices");
const getAppointmentsUserController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        res.status(200).json({
            msagge: "Lista de todos los turnos",
            data: yield (0, appointmentServices_1.everyAppointmentService)(),
        });
    }
    catch (err) {
        const detailErr = err;
        res.status(400).json({
            msg: detailErr instanceof Error
                ? detailErr.detail
                    ? detailErr.detail
                    : detailErr.message
                : "Error desconocido",
        });
    }
});
exports.getAppointmentsUserController = getAppointmentsUserController;
const getDetailAppointmentController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = parseInt(req.params.id, 10);
        const app = yield (0, appointmentServices_1.getAppointmentByIdService)(id);
        if (!app)
            throw new Error("Este turno no existe");
        const formattedDate = new Date(app.date).toISOString().split("T")[0];
        res.status(200).json({
            msagge: "Detalle del turno",
            data: {
                id: app.id,
                name: app.user.name,
                email: app.user.email,
                date: formattedDate,
                time: app.time,
                appointmentStatus: app.appointmentStatus,
            },
        });
    }
    catch (err) {
        const detailErr = err;
        res.status(404).json({
            msg: detailErr instanceof Error
                ? detailErr.detail
                    ? detailErr.detail
                    : detailErr.message
                : "Error al obtener un turno",
        });
    }
});
exports.getDetailAppointmentController = getDetailAppointmentController;
const SchedulerAppointmentController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const newAppoint = yield (0, appointmentServices_1.createNewAppointment)(req.body);
        const user = yield (0, userServices_1.returnUserByIdServices)(req.body.userID);
        const formattedDate = new Date(newAppoint.date).toISOString().split("T")[0];
        yield (0, mailerServices_1.sendAppointmentConfirmationEmail)(user.email, user.name, formattedDate, newAppoint.time);
        res.status(201).json({
            msagge: "Nuevo turno agendado con exito",
            data: newAppoint,
        });
    }
    catch (err) {
        const detailErr = err;
        res.status(400).json({
            msg: detailErr instanceof Error
                ? detailErr.detail
                    ? detailErr.detail
                    : detailErr.message
                : "Error al agendar el turno",
        });
    }
});
exports.SchedulerAppointmentController = SchedulerAppointmentController;
const ChangeStatusAppointmentController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = parseInt(req.params.id, 10);
        const turno = yield appointmentRepo_1.appointmentModel.findOne({
            where: { id },
            relations: ["user"],
        });
        if (!turno)
            throw new Error("No se encontró el turno");
        yield (0, appointmentServices_1.statusAppointmentService)(id);
        const formattedDate = new Date(turno.date).toISOString().split("T")[0];
        yield (0, mailerServices_1.sendCancellationEmail)(turno.user.email, turno.user.name, formattedDate, turno.time);
        res.status(200).json({
            msagge: "Turno Cancelado con exito",
            data: {
                id: turno.id,
                name: turno.user.name,
                email: turno.user.email,
                date: formattedDate,
                time: turno.time,
                appointmentStatus: turno.appointmentStatus,
            },
        });
    }
    catch (err) {
        const detailErr = err;
        res.status(404).json({
            msg: detailErr instanceof Error
                ? detailErr.detail
                    ? detailErr.detail
                    : detailErr.message
                : "No se pudo cancelar el turno",
        });
    }
});
exports.ChangeStatusAppointmentController = ChangeStatusAppointmentController;
