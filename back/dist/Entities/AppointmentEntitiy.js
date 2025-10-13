var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Status } from "../DTO/AppointmentDTO.js";
let Appointment = class Appointment {
};
__decorate([
    PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], Appointment.prototype, "id", void 0);
__decorate([
    Column({ type: "date", nullable: false }),
    __metadata("design:type", Date)
], Appointment.prototype, "date", void 0);
__decorate([
    Column({ type: "varchar", length: 5, nullable: false }),
    __metadata("design:type", String)
], Appointment.prototype, "time", void 0);
__decorate([
    ManyToOne("User", "appointments", { nullable: true }),
    __metadata("design:type", Object)
], Appointment.prototype, "user", void 0);
__decorate([
    Column({ type: "varchar", length: 10, nullable: false, default: Status.active }),
    __metadata("design:type", String)
], Appointment.prototype, "appointmentStatus", void 0);
__decorate([
    CreateDateColumn(),
    __metadata("design:type", Date)
], Appointment.prototype, "creatAt", void 0);
__decorate([
    UpdateDateColumn(),
    __metadata("design:type", Date)
], Appointment.prototype, "upDate", void 0);
Appointment = __decorate([
    Entity("appointment")
], Appointment);
export { Appointment };
