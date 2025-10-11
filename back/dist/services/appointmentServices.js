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
exports.statusAppointmentService = exports.createNewAppointment = exports.getAppointmentByIdService = exports.everyAppointmentService = void 0;
const AppointmentDTO_1 = require("../DTO/AppointmentDTO");
const appointmentRepo_1 = require("../repositories/appointmentRepo");
const userServices_1 = require("./userServices");
const everyAppointmentService = () => __awaiter(void 0, void 0, void 0, function* () {
    const apponitmentFound = appointmentRepo_1.appointmentModel.find();
    if ((yield apponitmentFound).length > 0)
        return apponitmentFound;
    throw new Error("Lista de Turnos no encontrada");
});
exports.everyAppointmentService = everyAppointmentService;
const getAppointmentByIdService = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const shift = appointmentRepo_1.appointmentModel.findOne({
        where: {
            id: id,
        },
        relations: ["user"],
    });
    if (!shift) {
        throw new Error("Este turno no existe");
    }
    return shift;
});
exports.getAppointmentByIdService = getAppointmentByIdService;
const createNewAppointment = (appoint) => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, userServices_1.returnUserByIdServices)(appoint.userID);
    const turnoExistente = yield appointmentRepo_1.appointmentModel.findOne({
        where: {
            user: { id: appoint.userID },
            date: appoint.date,
            time: appoint.time,
            appointmentStatus: AppointmentDTO_1.Status.active,
        },
    });
    if (turnoExistente) {
        throw new Error("Este turno ya esta ocupado");
    }
    appointmentRepo_1.appointmentModel.validadAppointment(appoint.date, appoint.time);
    const newAppoint = appointmentRepo_1.appointmentModel.create({
        date: appoint.date,
        time: appoint.time,
        appointmentStatus: AppointmentDTO_1.Status.active,
        user: { id: appoint.userID },
    });
    return yield appointmentRepo_1.appointmentModel.save(newAppoint);
});
exports.createNewAppointment = createNewAppointment;
const statusAppointmentService = (id) => __awaiter(void 0, void 0, void 0, function* () {
    if (!Number.isInteger(id) || id <= 0)
        throw new Error("ID inválido");
    const turno = yield appointmentRepo_1.appointmentModel.findOne({
        where: { id },
        relations: ["user"],
    });
    if (!turno)
        throw new Error("No se encontró turno para cancelar");
    if (turno.appointmentStatus !== AppointmentDTO_1.Status.active) {
        throw new Error("Este turno se encuentra cancelado ");
    }
    turno.appointmentStatus = AppointmentDTO_1.Status.cancel;
    yield appointmentRepo_1.appointmentModel.save(turno);
});
exports.statusAppointmentService = statusAppointmentService;
