var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Column, CreateDateColumn, Entity, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { User } from "./UserEntity.js";
let Credential = class Credential {
    id;
    username;
    password;
    user;
    creatAt;
    upDate;
};
__decorate([
    PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], Credential.prototype, "id", void 0);
__decorate([
    Column({ type: "varchar", length: 15, nullable: false, unique: true }),
    __metadata("design:type", String)
], Credential.prototype, "username", void 0);
__decorate([
    Column({ type: "varchar", length: 100, nullable: false }),
    __metadata("design:type", String)
], Credential.prototype, "password", void 0);
__decorate([
    OneToOne(() => User),
    __metadata("design:type", User)
], Credential.prototype, "user", void 0);
__decorate([
    CreateDateColumn(),
    __metadata("design:type", Date)
], Credential.prototype, "creatAt", void 0);
__decorate([
    UpdateDateColumn(),
    __metadata("design:type", Date)
], Credential.prototype, "upDate", void 0);
Credential = __decorate([
    Entity()
], Credential);
export { Credential };
